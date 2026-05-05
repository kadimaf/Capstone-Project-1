import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactForm: FormGroup;
  isSending = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSending = true;
      // Simulate send delay
      setTimeout(() => {
        console.log(this.contactForm.value);
        this.snackBar.open('Message sent successfully!', 'Close', {
          duration: 4000,
          panelClass: ['snackbar-success']
        });
        this.contactForm.reset();
        this.isSending = false;
      }, 800);
    }
  }

}
