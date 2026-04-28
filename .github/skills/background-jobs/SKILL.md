# Skill: Background Jobs

## When to use
- When implementing async work (emails, reports, imports, webhooks)
- When scheduling periodic tasks
- When dealing with retries/timeouts

## What to do
1) Inspect the existing queue, worker, scheduler, and retry model first.
2) Design tasks idempotent; retries with backoff.
3) Separate slow and latency-sensitive work where the platform supports it.
4) For greenfield or explicitly selected Python web stacks, Celery plus Redis is a reasonable preference profile.
5) Document queues, ownership, failure handling, and operational patterns in `docs/ai/BACKGROUND_JOBS.md`.

## References (repo)
- `docs/ai/BACKGROUND_JOBS.md`
