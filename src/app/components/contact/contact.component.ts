import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type ContactField = 'name' | 'email' | 'company' | 'phone' | 'message' | 'website';

interface ContactApiResponse {
  success?: boolean;
  error?: string;
  message?: string;
  fields?: Partial<Record<ContactField, string>>;
}

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly contactForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    phone: [''],
    website: [''],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });
  readonly status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  readonly submitAttempted = signal(false);
  readonly errorMessage = signal('');
  readonly backendFieldErrors = signal<Partial<Record<ContactField, string>>>({});
  readonly isLoading = computed(() => this.status() === 'loading');

  fieldInvalid(fieldName: 'name' | 'email' | 'company' | 'phone' | 'message'): boolean {
    const control = this.contactForm.controls[fieldName];
    return (
      (control.invalid && (control.touched || this.submitAttempted())) ||
      Boolean(this.backendFieldErrors()[fieldName])
    );
  }

  fieldErrorMessage(fieldName: 'name' | 'email' | 'company' | 'phone' | 'message'): string {
    const backendError = this.backendFieldErrors()[fieldName];
    if (backendError) {
      return this.translateFieldError(fieldName, backendError);
    }

    if (fieldName === 'name') {
      return 'Bitte geben Sie Ihren Namen ein.';
    }

    if (fieldName === 'email') {
      return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }

    if (fieldName === 'message') {
      return 'Bitte geben Sie eine Nachricht mit mindestens 10 Zeichen ein.';
    }

    return 'Bitte prüfen Sie dieses Feld.';
  }

  async onSubmit(): Promise<void> {
    this.submitAttempted.set(true);
    this.status.set('idle');
    this.errorMessage.set('');
    this.backendFieldErrors.set({});

    if (this.contactForm.invalid || this.isLoading()) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.status.set('loading');

    try {
      const formValue = this.contactForm.getRawValue();
      const requestBody = new URLSearchParams({
        name: formValue.name,
        email: formValue.email,
        company: formValue.company,
        phone: formValue.phone,
        website: formValue.website,
        message: formValue.message
      });

      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Accept: 'application/json'
        },
        body: requestBody.toString()
      });

      const result = (await response.json()) as ContactApiResponse;

      if (!response.ok || !result.success) {
        this.handleBackendError(result, response.status);
        return;
      }

      this.status.set('success');
      this.contactForm.reset();
      this.submitAttempted.set(false);
      this.backendFieldErrors.set({});
    } catch {
      this.status.set('error');
      this.errorMessage.set('Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.');
    }
  }

  private handleBackendError(result: ContactApiResponse, httpStatus: number): void {
    this.status.set('error');

    if (result.fields) {
      this.backendFieldErrors.set(result.fields);
    }

    if (result.error === 'validation_failed' || httpStatus === 422) {
      this.errorMessage.set('Bitte prüfen Sie die markierten Felder und versuchen Sie es erneut.');
      return;
    }

    if (result.error === 'rate_limited' || httpStatus === 429) {
      this.errorMessage.set('Sie haben kürzlich bereits eine Nachricht gesendet. Bitte warten Sie kurz und versuchen Sie es erneut.');
      return;
    }

    if (result.error === 'mail_failed') {
      this.errorMessage.set('Ihre Nachricht konnte derzeit nicht zugestellt werden. Bitte versuchen Sie es in Kürze erneut.');
      return;
    }

    this.errorMessage.set('Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.');
  }

  private translateFieldError(fieldName: ContactField, backendError: string): string {
    const normalizedError = backendError.trim().toLowerCase();

    if (fieldName === 'website') {
      return 'Ungültige Anfrage.';
    }

    if (normalizedError.includes('required')) {
      if (fieldName === 'name') {
        return 'Bitte geben Sie Ihren Namen ein.';
      }
      if (fieldName === 'email') {
        return 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
      }
      if (fieldName === 'message') {
        return 'Bitte geben Sie eine Nachricht ein.';
      }
    }

    if (normalizedError.includes('invalid') && fieldName === 'email') {
      return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }

    if (normalizedError.includes('too long')) {
      return 'Der eingegebene Wert ist zu lang.';
    }

    return 'Bitte prüfen Sie dieses Feld.';
  }
}
