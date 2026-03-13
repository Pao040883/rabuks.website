import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = signal({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  submitted = signal(false);
  loading = signal(false);

  onSubmit() {
    this.loading.set(true);
    
    // Simulate API call
    setTimeout(() => {
      this.loading.set(false);
      this.submitted.set(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.submitted.set(false);
        this.formData.set({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        });
      }, 3000);
    }, 1000);
  }
}
