import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import FeedbackWidget from "../components/FeedbackWidget";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Imprint() {
  return (
    <>
      <NextSeo noindex={true} />
      <FeedbackWidget></FeedbackWidget>
      <Header>
        <div className="flex flex-col items-center border-b pb-4">
          <h1 className="text-primary text-5xl font-bold text-center font-poppins mt-8">
            <Link href="/">
              <a>React Jobs</a>
            </Link>
          </h1>
          <h2 className="flex justify-center text-3xl font-bold text-gray-700 mt-4">
            The React{" "}
            <div className="inline-block mx-2">
              <Image
                src="/react-jobs-logo.png"
                alt="React-Jobs Logo"
                height="40"
                width="40"
              />{" "}
            </div>
            <span></span>
            Job Board
          </h2>
          <p className=" text-xl text-gray-500 text-center mt-3">
            Connecting the{" "}
            <span className="text-gray-700 font-bold">best jobs </span>
            with top{" "}
            <span className="text-primary font-bold">React Developers</span>
          </p>
        </div>
      </Header>

      <div className="flex flex-col pt-12 max-w-full items-center">
        <div className="max-w-4xl flex flex-col text-justify mx-8">
          <h1 className="font-bold leading-7 text-gray-900 sm:text-3xl mt-4">
            Impressum
          </h1>
          <h3 className="font-bold leading-7 sm:text-lg mt-4">
            Angaben gemäß §5 TMG{" "}
          </h3>
          <span className="mt-4">Philip Gutbrodt</span>
          <span>Perthesweg 20</span>
          <span>20535 Hamburg</span>

          <h3 className="font-bold leading-7 sm:text-lg mt-4">Kontakt</h3>
          <span>
            {" "}
            Email:{" "}
            <a
              href="mailto:jobboard.react@gmail.com"
              className="hover:text-primary"
            >
              {"jobboard.react@gmail.com"}
            </a>
          </span>

          <h3 className="font-bold leading-7 sm:text-lg mt-4">
            Haftung für Inhalte{" "}
          </h3>
          <span className="mt-4">
            Alle Inhalte unseres Internetauftritts wurden mit größter Sorgfalt
            und nach bestem Gewissen erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte können wir jedoch keine
            Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG
            für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
            verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
            jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf
            eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur
            Entfernung oder Sperrung der Nutzung von Informationen nach den
            allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche
            Haftung ist jedoch erst ab dem Zeitpunkt der Kenntniserlangung einer
            konkreten Rechtsverletzung möglich. Bei Bekanntwerden von den o.g.
            Rechtsverletzungen werden wir diese Inhalte unverzüglich entfernen.
          </span>

          <h3 className="font-bold leading-7 sm:text-lg mt-4">
            Haftungsbeschränkung für externe Links
          </h3>
          <span className="mt-4">
            Unsere Webseite enthält Links auf externe Webseiten Dritter. Auf die
            Inhalte dieser direkt oder indirekt verlinkten Webseiten haben wir
            keinen Einfluss. Daher können wir für die „externen Links“ auch
            keine Gewähr auf Richtigkeit der Inhalte übernehmen. Für die Inhalte
            der externen Links sind die jeweilige Anbieter oder Betreiber
            (Urheber) der Seiten verantwortlich. Die externen Links wurden zum
            Zeitpunkt der Linksetzung auf eventuelle Rechtsverstöße überprüft
            und waren im Zeitpunkt der Linksetzung frei von rechtswidrigen
            Inhalten. Eine ständige inhaltliche Überprüfung der externen Links
            ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
            möglich. Bei direkten oder indirekten Verlinkungen auf die Webseiten
            Dritter, die außerhalb unseres Verantwortungsbereichs liegen, würde
            eine Haftungsverpflichtung ausschließlich in dem Fall nur bestehen,
            wenn wir von den Inhalten Kenntnis erlangen und es uns technisch
            möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger
            Inhalte zu verhindern. Diese Haftungsausschlusserklärung gilt auch
            innerhalb des eigenen Internetauftrittes „Name Ihrer Domain“
            gesetzten Links und Verweise von Fragestellern, Blogeinträgern,
            Gästen des Diskussionsforums. Für illegale, fehlerhafte oder
            unvollständige Inhalte und insbesondere für Schäden, die aus der
            Nutzung oder Nichtnutzung solcherart dargestellten Informationen
            entstehen, haftet allein der Diensteanbieter der Seite, auf welche
            verwiesen wurde, nicht derjenige, der über Links auf die jeweilige
            Veröffentlichung lediglich verweist. Werden uns Rechtsverletzungen
            bekannt, werden die externen Links durch uns unverzüglich entfernt.
          </span>

          <h3 className="font-bold leading-7 sm:text-lg mt-4 ">Urheberrecht</h3>
          <span className="mt-4">
            Die auf unserer Webseite veröffentlichen Inhalte und Werke
            unterliegen dem deutschen Urheberrecht (
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href="http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Gesetz über Urheberrecht und verwandte Schutzrechte
            </a>
            ). Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung des geistigen Eigentums in ideeller und materieller Sicht
            des Urhebers außerhalb der Grenzen des Urheberrechtes bedürfen der
            vorherigen schriftlichen Zustimmung des jeweiligen Urhebers i.S.d.
            Urhebergesetzes (
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href="http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Gesetz über Urheberrecht und verwandte Schutzrechte
            </a>
            ). Downloads und Kopien dieser Seite sind nur für den privaten und
            nicht kommerziellen Gebrauch erlaubt. Sind die Inhalte auf unserer
            Webseite nicht von uns erstellt wurden, sind die Urheberrechte
            Dritter zu beachten. Die Inhalte Dritter werden als solche kenntlich
            gemacht. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
            aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
            Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
            unverzüglich entfernen.
          </span>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
