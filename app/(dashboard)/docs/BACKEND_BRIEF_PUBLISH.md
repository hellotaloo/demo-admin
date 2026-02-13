# Backend Brief: Pre-Screening Publish Endpoints

## Overview

We need 2 new endpoints to publish pre-screenings and toggle their online/offline status.

---

## 1. Publish Pre-Screening

**`POST /vacancies/{vacancy_id}/pre-screening/publish`**

Creates AI agents (ElevenLabs for voice, WhatsApp for chat) with the configured questions.

### Request

```json
{
  "enable_voice": true,
  "enable_whatsapp": true
}
```

### Response

```json
{
  "status": "success",
  "published_at": "2026-01-31T14:30:00Z",
  "elevenlabs_agent_id": "agent_abc123",
  "whatsapp_agent_id": "vacancy-uuid",
  "is_online": true,
  "message": "Pre-screening published and is now online"
}
```

### Logic

1. Validate vacancy exists and has a pre-screening
2. Create/update ElevenLabs agent (if `enable_voice`)
3. Create/update WhatsApp agent (if `enable_whatsapp`)
4. Set `published_at = NOW()`, `is_online = true`
5. Store agent IDs in database
6. Return response

### Errors

| Status | Condition |
|--------|-----------|
| 400 | Invalid vacancy ID |
| 404 | No pre-screening found |
| 500 | Failed to create agent |

---

## 2. Update Status (Online/Offline)

**`PATCH /vacancies/{vacancy_id}/pre-screening/status`**

Toggle agents on/off without republishing.

### Request

```json
{
  "is_online": false
}
```

### Response

```json
{
  "status": "success",
  "is_online": false,
  "message": "Pre-screening is now offline",
  "elevenlabs_agent_id": "agent_abc123",
  "whatsapp_agent_id": "vacancy-uuid"
}
```

### Logic

1. Validate pre-screening exists AND is published (`published_at IS NOT NULL`)
2. Update `is_online` in database
3. Pause/resume agents via their APIs (if applicable)
4. Return response

### Errors

| Status | Condition |
|--------|-----------|
| 400 | Pre-screening not published yet |
| 404 | No pre-screening found |

---

## 3. Update GET Endpoint

**`GET /vacancies/{vacancy_id}/pre-screening`**

Add these fields to the existing response:

```json
{
  "published_at": "2026-01-31T14:30:00Z",
  "is_online": true,
  "elevenlabs_agent_id": "agent_abc123",
  "whatsapp_agent_id": "vacancy-uuid"
}
```

---

## Database Migration

```sql
ALTER TABLE pre_screenings ADD COLUMN IF NOT EXISTS published_at TIMESTAMP;
ALTER TABLE pre_screenings ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT FALSE;
ALTER TABLE pre_screenings ADD COLUMN IF NOT EXISTS elevenlabs_agent_id TEXT;
ALTER TABLE pre_screenings ADD COLUMN IF NOT EXISTS whatsapp_agent_id TEXT;
```

---

## CORS

Make sure these new endpoints are covered by CORS middleware (allow `http://localhost:3000` or your frontend origin).

---

## Notes

- Publishing automatically sets `is_online = true`
- The toggle is for temporarily pausing, not for initial activation
- Frontend already handles the UI - just needs working endpoints
