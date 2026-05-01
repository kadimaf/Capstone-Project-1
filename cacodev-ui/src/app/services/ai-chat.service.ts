import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Injectable({ providedIn: 'root' })
export class AiChatService {
  private baseUrl = 'http://localhost:8080/cacodev/ai';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /** Non-streaming chat */
  chat(message: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/chat`, { message }, { responseType: 'text' });
  }

  /** Streaming chat using fetch + ReadableStream */
  chatStream(message: string, onChunk: (text: string) => void, onDone: () => void, onError: (err: any) => void): void {
    if (!this.isBrowser) return;

    const token = this.authService.getAccessToken();
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    fetch(`${this.baseUrl}/v2/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message })
    }).then(async response => {
      if (!response.ok) {
        onError(new Error(`HTTP ${response.status}`));
        return;
      }
      const reader = response.body?.getReader();
      if (!reader) { onDone(); return; }

      const decoder = new TextDecoder();
      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (line.startsWith('data:')) {
            onChunk(line.slice(5));
          }
        }
      }
      if (buffer.startsWith('data:')) {
        onChunk(buffer.slice(5));
      }
      onDone();
    }).catch(onError);
  }
}
