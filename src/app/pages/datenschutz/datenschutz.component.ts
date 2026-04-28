import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-datenschutz',
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

        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Datenschutzerklärung</h1>

        <div class="prose dark:prose-invert max-w-none">
          <style>
            .prose h2, .prose h3, .prose h4, .prose p, .prose li {
              word-wrap: break-word;
              overflow-wrap: break-word;
              hyphens: auto;
            }
          </style>
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Datenschutz auf einen Blick</h2>
            
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Allgemeine Hinweise</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
              passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
              persönlich identifiziert werden können.
            </p>

            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Datenerfassung auf dieser Website</h3>
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-4">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
              können Sie dem Impressum dieser Website entnehmen.
            </p>

            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-4">Wie erfassen wir Ihre Daten?</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um 
              Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer 
              Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten 
              (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>

            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-4">Wofür nutzen wir Ihre Daten?</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
              Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>

            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-4">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
              gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung 
              oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt 
              haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Hosting</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            </p>
            
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Externes Hosting</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, 
              werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen, 
              Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe 
              und sonstige Daten, die über eine Website generiert werden, handeln.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und 
              bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und 
              effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Datenschutz</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
              personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie 
              dieser Datenschutzerklärung.
            </p>

            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Hinweis zur verantwortlichen Stelle</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Patrick Offermanns<br/>
              Ohechaussee 52b<br/>
              22848 Norderstedt<br/>
              E-Mail: info&#64;rabuks.online
            </p>

            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können 
              eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf 
              erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Datenerfassung auf dieser Website</h2>
            
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Cookies</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten auf 
              Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung 
              (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Die Speicherung von Cookies kann von Ihnen verhindert werden, indem Sie in Ihren Browser-Einstellungen 
              „keine Cookies akzeptieren" wählen. Dies kann aber eine Funktionseinschränkung unserer Angebote zur 
              Folge haben.
            </p>

            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Kontaktformular</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular 
              inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall 
              von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage 
              mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen 
              erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse 
              an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Analyse-Tools und Werbung</h2>
            
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">Google Analytics</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland 
              Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Google Analytics verwendet so genannte „Cookies". Das sind Textdateien, die auf Ihrem Computer gespeichert 
              werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten 
              Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA 
              übertragen und dort gespeichert.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Die Speicherung von Google-Analytics-Cookies und die Nutzung dieses Analyse-Tools erfolgen auf Grundlage 
              von Art. 6 Abs. 1 lit. a DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des 
              Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren. Sofern eine entsprechende 
              Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a 
              DSGVO; die Einwilligung ist jederzeit widerrufbar.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Ihre Rechte</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Sie haben das Recht:
            </p>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu verlangen (Art. 15 DSGVO)</li>
              <li>Die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
              <li>Die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
              <li>Die Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
              <li>Der Verarbeitung zu widersprechen (Art. 21 DSGVO)</li>
              <li>Auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Sich bei einer Aufsichtsbehörde zu beschweren (Art. 77 DSGVO)</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Kontaktformular und E-Mail-Versand</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir die von Ihnen eingegebenen Angaben 
              (Name, E-Mail-Adresse, optional Firma und Telefon sowie Ihre Nachricht) zur Bearbeitung Ihrer Anfrage 
              und für mögliche Rückfragen.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Die Übermittlung erfolgt an unser Kontakt-Endpunkt-Skript (PHP). Die Anfrage wird per E-Mail an 
              info&#64;rabuks.online weitergeleitet. Zur technischen Absicherung gegen Missbrauch verarbeiten wir dabei 
              außerdem die IP-Adresse und einen kurzen zeitbasierten Sperrvermerk (Cooldown pro IP).
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Welche konkreten Hosting- und E-Mail-Infrastrukturanbieter dabei eingesetzt werden, hängt von der 
              jeweiligen Deployment-Umgebung ab.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der 
              Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. 
              In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven 
              Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung 
              auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt 
              (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere 
              Aufbewahrungsfristen – bleiben unberührt.
            </p>
          </section>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-12">
            Stand: Januar 2026
          </p>
        </div>
      </div>
    </main>
    
    <app-footer />
    </div>
  `,
  styles: ``
})
export class DatenschutzComponent {
}
