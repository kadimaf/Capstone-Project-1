import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AiChatService, ChatMessage } from '../../services/ai-chat.service';

@Component({
  selector: 'app-ai-chat',
  standalone: false,
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.scss']
})
export class AiChatComponent implements AfterViewChecked {
  messages: ChatMessage[] = [];
  userInput = '';
  isLoading = false;
  useStreaming = true;

  @ViewChild('chatBody') private chatBody!: ElementRef;
  private shouldScroll = false;

  constructor(private aiChatService: AiChatService) {}

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  send(): void {
    const text = this.userInput.trim();
    if (!text || this.isLoading) return;

    this.messages.push({ role: 'user', content: text, timestamp: new Date() });
    this.userInput = '';
    this.isLoading = true;
    this.shouldScroll = true;

    if (this.useStreaming) {
      this.sendStreaming(text);
    } else {
      this.sendNonStreaming(text);
    }
  }

  private sendNonStreaming(text: string): void {
    this.aiChatService.chat(text).subscribe({
      next: (response) => {
        this.messages.push({ role: 'assistant', content: response, timestamp: new Date() });
        this.isLoading = false;
        this.shouldScroll = true;
      },
      error: (err) => {
        this.messages.push({
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
          timestamp: new Date()
        });
        this.isLoading = false;
        this.shouldScroll = true;
      }
    });
  }

  private sendStreaming(text: string): void {
    const assistantMsg: ChatMessage = { role: 'assistant', content: '', timestamp: new Date() };
    this.messages.push(assistantMsg);

    this.aiChatService.chatStream(
      text,
      (chunk) => {
        assistantMsg.content += chunk;
        this.shouldScroll = true;
      },
      () => {
        this.isLoading = false;
        this.shouldScroll = true;
      },
      (err) => {
        assistantMsg.content = assistantMsg.content || 'Sorry, something went wrong. Please try again.';
        this.isLoading = false;
        this.shouldScroll = true;
      }
    );
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  clearChat(): void {
    this.messages = [];
  }

  private scrollToBottom(): void {
    try {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    } catch (e) {}
  }
}
