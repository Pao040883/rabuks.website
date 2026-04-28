import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-impressum',
  imports: [HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <app-header />
      
      <main class="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto w-full">
        <!-- Back Link -->
        <a href="/" class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Zurück zur Startseite
        </a>

        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Impressum</h1>

        <div class="prose dark:prose-invert max-w-none">
          <style>
            .prose h2, .prose h3, .prose h4, .prose p, .prose li {
              word-wrap: break-word;
              overflow-wrap: break-word;
              hyphens: auto;
            }
          </style>
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Angaben gemäß § 5 TMG</h2>
            <p class="text-gray-700 dark:text-gray-300">
              Patrick Offermanns<br/>
              Ohechaussee 52b<br/>
              22848 Norderstedt
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Kontakt</h2>
            <p class="text-gray-700 dark:text-gray-300">
              E-Mail: <a href="mailto:info@rabuks.online" class="text-primary-600 dark:text-primary-400 hover:underline">info&#64;rabuks.online</a><br/>
              Telefon: +49 (0) 1523 3646614
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Konzeption & Entwicklung</h2>
            <p class="text-gray-700 dark:text-gray-300">
              Rabuks ist ein Produkt von Patrick Offermanns.<br/>
              Weitere Projekte: <a href="https://offermanns.dev" target="_blank" rel="noopener" class="text-primary-600 dark:text-primary-400 hover:underline">offermanns.dev</a>
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p class="text-gray-700 dark:text-gray-300">
              Patrick Offermanns<br/>
              Ohechaussee 52b<br/>
              22848 Norderstedt
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">EU-Streitschlichtung</h2>
            <p class="text-gray-700 dark:text-gray-300">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">
                https://ec.europa.eu/consumers/odr/
              </a>.<br/>
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p class="text-gray-700 dark:text-gray-300">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Haftung für Inhalte</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen 
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
              Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt 
              der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Haftung für Links</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche 
              Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht 
              zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Urheberrecht</h2>
            <p class="text-gray-700 dark:text-gray-300">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. 
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
          </section>
        </div>
      </div>
    </main>
    
    <app-footer />
    </div>
  `,
  styles: ``
})
export class ImpressumComponent {
}
