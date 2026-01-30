const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export interface AnalystSSEEvent {
  type: 'status' | 'thinking' | 'complete' | 'error';
  status?: 'thinking' | 'tool_call';
  message?: string;
  content?: string;
  session_id?: string;
}

export type AnalystEventCallback = (event: AnalystSSEEvent) => void;

export interface QueryAnalystOptions {
  sessionId?: string;
  extendedThinking?: boolean;
}

/**
 * Query the recruiter analyst with natural language.
 * Returns a streaming response via SSE.
 */
export async function queryAnalyst(
  question: string,
  onEvent: AnalystEventCallback,
  options: QueryAnalystOptions = {}
): Promise<{ message: string; sessionId: string }> {
  const { sessionId, extendedThinking } = options;
  
  const response = await fetch(`${BACKEND_URL}/data-query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question,
      session_id: sessionId,
      extended_thinking: extendedThinking,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to query analyst');
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  let finalMessage = '';
  let finalSessionId = options.sessionId || '';

  if (!reader) throw new Error('No response body');

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;

        try {
          const event: AnalystSSEEvent = JSON.parse(data);
          onEvent(event);

          if (event.type === 'complete') {
            finalMessage = event.message || '';
            finalSessionId = event.session_id || finalSessionId;
          }
        } catch (e) {
          console.error('Failed to parse SSE event:', e);
        }
      }
    }
  }

  return { message: finalMessage, sessionId: finalSessionId };
}

/**
 * Get the current session state.
 */
export async function getAnalystSession(sessionId: string): Promise<{
  session_id: string;
  state: Record<string, unknown>;
}> {
  const response = await fetch(`${BACKEND_URL}/data-query/session/${sessionId}`);
  
  if (!response.ok) {
    throw new Error('Session not found');
  }
  
  return response.json();
}

/**
 * Delete an analyst session to start fresh.
 */
export async function deleteAnalystSession(sessionId: string): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/data-query/session/${sessionId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete session');
  }
}
