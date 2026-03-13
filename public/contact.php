<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Formular-Daten empfangen
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
$email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
$company = isset($_POST['company']) ? htmlspecialchars($_POST['company']) : '';
$message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';

// E-Mail-Konfiguration
$to = 'info@rabuks.online';
$subject = 'Neue Kontaktanfrage von ' . $name;

// E-Mail-Body
$body = "Name: $name\n";
$body .= "E-Mail: $email\n";
$body .= "Firma: $company\n\n";
$body .= "Nachricht:\n$message\n";

// E-Mail-Header
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// E-Mail senden
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Nachricht wurde erfolgreich gesendet']);
} else {
    echo json_encode(['success' => false, 'message' => 'Fehler beim Senden der Nachricht']);
}
?>
