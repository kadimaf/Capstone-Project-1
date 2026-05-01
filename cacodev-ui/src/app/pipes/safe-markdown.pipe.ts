import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
  name: 'safeMarkdown',
  standalone: false
})
export class SafeMarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';
    const html = marked(value) as string;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
