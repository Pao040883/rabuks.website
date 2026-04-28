<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

function respond(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function startsWith(string $haystack, string $needle): bool
{
    return $needle === '' || strpos($haystack, $needle) === 0;
}

function parseAuthority(string $authority): array
{
    $authority = trim($authority);
    if ($authority === '') {
        return ['host' => '', 'port' => null];
    }

    $parts = parse_url('//' . $authority);
    if (!is_array($parts)) {
        return ['host' => '', 'port' => null];
    }

    $host = strtolower((string) ($parts['host'] ?? ''));
    $port = isset($parts['port']) ? (int) $parts['port'] : null;

    return ['host' => $host, 'port' => $port];
}

function defaultPortForScheme(string $scheme): ?int
{
    if ($scheme === 'https') {
        return 443;
    }

    if ($scheme === 'http') {
        return 80;
    }

    return null;
}

function requestScheme(): string
{
    $forwardedProtoRaw = trim((string) ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? ''));
    if ($forwardedProtoRaw !== '') {
        $forwardedProto = strtolower(trim(explode(',', $forwardedProtoRaw)[0]));
        if ($forwardedProto === 'https' || $forwardedProto === 'http') {
            return $forwardedProto;
        }
    }

    $https = strtolower((string) ($_SERVER['HTTPS'] ?? ''));
    if ($https !== '' && $https !== 'off') {
        return 'https';
    }

    return 'http';
}

function requestHostCandidates(): array
{
    $candidates = [];
    $seen = [];

    $addCandidate = static function (array $candidate) use (&$candidates, &$seen): void {
        $host = strtolower((string) ($candidate['host'] ?? ''));
        if ($host === '') {
            return;
        }

        $port = isset($candidate['port']) ? (int) $candidate['port'] : null;
        $key = $host . ':' . ($port !== null ? (string) $port : '');
        if (isset($seen[$key])) {
            return;
        }

        $seen[$key] = true;
        $candidates[] = ['host' => $host, 'port' => $port];
    };

    $httpHost = parseAuthority((string) ($_SERVER['HTTP_HOST'] ?? ''));
    $addCandidate($httpHost);

    $forwardedHostRaw = trim((string) ($_SERVER['HTTP_X_FORWARDED_HOST'] ?? ''));
    if ($forwardedHostRaw !== '') {
        // Forwarded host headers can be deployment hints behind proxies/CDNs.
        // Treat them only as supplemental candidates for same-origin checks.
        foreach (explode(',', $forwardedHostRaw) as $forwardedHostPart) {
            $parsedForwarded = parseAuthority($forwardedHostPart);
            $addCandidate($parsedForwarded);
        }
    }

    $serverName = trim((string) ($_SERVER['SERVER_NAME'] ?? ''));
    if ($serverName !== '') {
        $parsedServerName = parseAuthority($serverName);
        if ($parsedServerName['host'] !== '') {
            $serverPort = isset($_SERVER['SERVER_PORT']) ? (int) $_SERVER['SERVER_PORT'] : null;
            if ($parsedServerName['port'] === null && $serverPort !== null) {
                $parsedServerName['port'] = $serverPort;
            }

            $addCandidate($parsedServerName);
        }
    }

    return $candidates;
}

function sameOriginAllowed(string $origin, array $candidates, string $requestScheme): bool
{
    $originParts = parse_url($origin);
    if (!is_array($originParts)) {
        return false;
    }

    $originHost = strtolower((string) ($originParts['host'] ?? ''));
    if ($originHost === '') {
        return false;
    }

    $originScheme = strtolower((string) ($originParts['scheme'] ?? ''));
    $originPort = isset($originParts['port'])
        ? (int) $originParts['port']
        : defaultPortForScheme($originScheme);

    foreach ($candidates as $candidate) {
        $candidateHost = strtolower((string) ($candidate['host'] ?? ''));
        if ($candidateHost === '' || strcasecmp($originHost, $candidateHost) !== 0) {
            continue;
        }

        $candidatePort = isset($candidate['port'])
            ? (int) $candidate['port']
            : defaultPortForScheme($requestScheme);

        if ($originPort === null || $candidatePort === null || $originPort === $candidatePort) {
            return true;
        }
    }

    return false;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, [
        'success' => false,
        'error' => 'method_not_allowed',
        'message' => 'Only POST is supported.'
    ]);
}

$origin = trim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));
if ($origin !== '') {
    $scheme = requestScheme();
    $hostCandidates = requestHostCandidates();
    if ($hostCandidates !== [] && !sameOriginAllowed($origin, $hostCandidates, $scheme)) {
        respond(403, [
            'success' => false,
            'error' => 'origin_forbidden',
            'message' => 'Cross-origin requests are not allowed.'
        ]);
    }
}

$contentType = strtolower(trim((string) ($_SERVER['CONTENT_TYPE'] ?? '')));
$request = [];

if (startsWith($contentType, 'application/json')) {
    $rawBody = file_get_contents('php://input');
    if ($rawBody === false || trim($rawBody) === '') {
        respond(400, [
            'success' => false,
            'error' => 'empty_body',
            'message' => 'Request body is required.'
        ]);
    }

    $decoded = json_decode($rawBody, true);
    if (!is_array($decoded)) {
        respond(400, [
            'success' => false,
            'error' => 'invalid_json',
            'message' => 'Malformed JSON body.'
        ]);
    }

    $request = $decoded;
} elseif (
    $contentType === '' ||
    startsWith($contentType, 'application/x-www-form-urlencoded') ||
    startsWith($contentType, 'multipart/form-data')
) {
    $request = $_POST;
} else {
    respond(415, [
        'success' => false,
        'error' => 'unsupported_media_type',
        'message' => 'Use application/json or form-encoded data.'
    ]);
}

$honeypot = trim((string) ($request['website'] ?? ''));
if ($honeypot !== '') {
    respond(422, [
        'success' => false,
        'error' => 'validation_failed',
        'message' => 'Invalid request payload.',
        'fields' => ['website' => 'Must be empty.']
    ]);
}

$ip = trim((string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
$rateLimitPath = sys_get_temp_dir() . '/rabuks_contact_rate_' . md5($ip);
$now = time();
$cooldownSeconds = 15;

$lastRequest = 0;
if (is_file($rateLimitPath)) {
    $lastRequest = (int) @file_get_contents($rateLimitPath);
}

if ($lastRequest > 0 && ($now - $lastRequest) < $cooldownSeconds) {
    respond(429, [
        'success' => false,
        'error' => 'rate_limited',
        'message' => 'Please wait a short moment before sending another message.'
    ]);
}

$name = trim((string) ($request['name'] ?? ''));
$email = trim((string) ($request['email'] ?? ''));
$company = trim((string) ($request['company'] ?? ''));
$phone = trim((string) ($request['phone'] ?? ''));
$message = trim((string) ($request['message'] ?? ''));

$errors = [];
if ($name === '') {
    $errors['name'] = 'Name is required.';
} elseif (mb_strlen($name) > 120) {
    $errors['name'] = 'Name is too long.';
}

if ($email === '') {
    $errors['email'] = 'Email is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Email is invalid.';
} elseif (mb_strlen($email) > 254) {
    $errors['email'] = 'Email is too long.';
}

if ($message === '') {
    $errors['message'] = 'Message is required.';
} elseif (mb_strlen($message) > 5000) {
    $errors['message'] = 'Message is too long.';
}

if ($company !== '' && mb_strlen($company) > 160) {
    $errors['company'] = 'Company is too long.';
}

if ($phone !== '' && mb_strlen($phone) > 80) {
    $errors['phone'] = 'Phone is too long.';
}

if ($errors !== []) {
    respond(422, [
        'success' => false,
        'error' => 'validation_failed',
        'message' => 'Please correct the highlighted fields.',
        'fields' => $errors
    ]);
}

$safeName = preg_replace('/[\r\n]+/', ' ', $name) ?? $name;
$safeEmail = preg_replace('/[\r\n]+/', '', $email) ?? $email;
$safeCompany = preg_replace('/[\r\n]+/', ' ', $company) ?? $company;
$safePhone = preg_replace('/[\r\n]+/', ' ', $phone) ?? $phone;

$to = 'info@rabuks.online';
$subject = 'Neue Kontaktanfrage von ' . $safeName;

$bodyLines = [
    'Name: ' . $safeName,
    'E-Mail: ' . $safeEmail,
    'Firma: ' . ($safeCompany !== '' ? $safeCompany : '-'),
    'Telefon: ' . ($safePhone !== '' ? $safePhone : '-'),
    '',
    'Nachricht:',
    $message,
    '',
    'IP: ' . $ip,
    'Zeit: ' . date(DATE_ATOM)
];
$body = implode("\n", $bodyLines);

$headers = [
    'From: Rabuks Website <no-reply@rabuks.online>',
    'Reply-To: ' . $safeEmail,
    'Content-Type: text/plain; charset=UTF-8'
];

$mailSent = mail($to, $subject, $body, implode("\r\n", $headers));

if (!$mailSent) {
    respond(500, [
        'success' => false,
        'error' => 'mail_failed',
        'message' => 'Message could not be sent at the moment.'
    ]);
}

@file_put_contents($rateLimitPath, (string) $now, LOCK_EX);

respond(200, [
    'success' => true,
    'message' => 'Message sent successfully.'
]);
