import { TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent]
    }).compileComponents();
  });

  it('sends data to /contact.php and sets success state', async () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;

    component.contactForm.setValue({
      name: 'Max Mustermann',
      email: 'max@example.com',
      company: 'Rabuks GmbH',
      phone: '+49 152 33646614',
      website: '',
      message: 'Dies ist eine ausreichend lange Nachricht.'
    });

    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));

    await component.onSubmit();

    expect(fetchSpy).toHaveBeenCalledOnce();
    expect(fetchSpy).toHaveBeenCalledWith(
      '/contact.php',
      expect.objectContaining({
        method: 'POST'
      })
    );

    const requestOptions = fetchSpy.mock.calls[0]?.[1] as RequestInit;
    const body = new URLSearchParams(String(requestOptions.body));
    expect(body.get('phone')).toBe('+49 152 33646614');
    expect(body.get('website')).toBe('');

    expect(component.status()).toBe('success');

    fetchSpy.mockRestore();
  });

  it('maps backend validation errors to form and message', async () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;

    component.contactForm.setValue({
      name: 'Max Mustermann',
      email: 'max@example.com',
      company: '',
      phone: '',
      website: '',
      message: 'Dies ist eine ausreichend lange Nachricht.'
    });

    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        new Response(
          JSON.stringify({
            success: false,
            error: 'validation_failed',
            fields: {
              email: 'Email is invalid.'
            }
          }),
          { status: 422 }
        )
      );

    await component.onSubmit();

    expect(component.status()).toBe('error');
    expect(component.errorMessage()).toContain('markierten Felder');
    expect(component.fieldInvalid('email')).toBe(true);
    expect(component.fieldErrorMessage('email')).toContain('gültige E-Mail-Adresse');

    fetchSpy.mockRestore();
  });

  it('shows a specific message when rate limited', async () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;

    component.contactForm.setValue({
      name: 'Max Mustermann',
      email: 'max@example.com',
      company: '',
      phone: '',
      website: '',
      message: 'Dies ist eine ausreichend lange Nachricht.'
    });

    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        new Response(
          JSON.stringify({ success: false, error: 'rate_limited' }),
          { status: 429 }
        )
      );

    await component.onSubmit();

    expect(component.status()).toBe('error');
    expect(component.errorMessage()).toContain('Bitte warten Sie kurz');

    fetchSpy.mockRestore();
  });
});
