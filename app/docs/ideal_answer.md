# Ideal Answer Field - Frontend Integration

## Overview

Qualification questions now include an `ideal_answer` field that guides the AI when scoring candidate responses.

---

## Data Structure

```typescript
interface QualificationQuestion {
  id: string;           // "qual_1", "qual_2", etc.
  question: string;     // Question shown to candidate
  ideal_answer: string; // Internal scoring guidance (NOT shown to candidates)
  is_modified?: boolean;
}
```

**Example response:**
```json
{
  "qualification_questions": [
    {
      "id": "qual_1",
      "question": "Heb je ervaring met kassawerk en het afrekenen van klanten?",
      "ideal_answer": "We zoeken iemand met concrete kassaervaring in retail of horeca. Bonus als ze fouten kunnen afhandelen.",
      "is_modified": true
    },
    {
      "id": "qual_2",
      "question": "Hoe ga je om met moeilijke klanten?",
      "ideal_answer": "We willen concrete voorbeelden horen. Belangrijk: kalm blijven, empathie tonen, oplossingsgerichte aanpak.",
      "is_modified": false
    }
  ]
}
```

---

## Updating via Chat

Recruiters can update the `ideal_answer` through natural language in the feedback chat:

```typescript
await fetch('/interview/feedback', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    session_id: sessionId,
    message: "Voor vraag 2 wil ik dat we focussen op teamwerk"
  })
});
```

**Example prompts:**
| User says | Result |
|-----------|--------|
| "Voor vraag 2 wil ik dat we focussen op teamwerk" | Updates `ideal_answer` for qual_2 |
| "Bij de klantenservice vraag zoeken we vooral empathie" | Updates relevant question's `ideal_answer` |
| "Pas de ideal answer aan voor vraag 3: minstens 5 jaar ervaring" | Explicit update |

---

## UI Suggestions

### Display
- Show as collapsible/expandable hint below each qualification question
- Use subtle styling (light gray, smaller font)
- Icon with tooltip on hover is also an option

### Example UI mockup
```
┌─────────────────────────────────────────────────────────┐
│ Heb je ervaring met kassawerk?                          │
│                                                         │
│ 💡 We zoeken concrete ervaring in retail/horeca...      │  ← ideal_answer
└─────────────────────────────────────────────────────────┘
```

### Editing
Two options:
1. **Chat-based**: Recruiter types feedback in chat (already implemented)
2. **Inline edit**: Add edit icon next to `ideal_answer` that opens a text field

---

## Important Notes

- `ideal_answer` is **never shown to candidates** - it's internal scoring guidance
- The AI generates an `ideal_answer` automatically when creating questions
- Recruiters can refine it via chat feedback
- When `is_modified: true`, the question (or its ideal_answer) was just changed
