# React Jobs

## Run DB

Run docker mongo
`$ docker run -d --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD=mongo mongo`

## Schritte bis Go Live (Website Online)

- Example Logo for Preview
- Logo Favicon
- Email Newsletter Signup Text + kontraste
- email border fixen
- Stripe Checkout Example

- bei logo upload irgendwie anders dinge anzeigen R
- spinner anzeigen bis stripe checkout R
- hart 99 dollar in se button drinne rein

## Schritte bis Validierung

- Google Search Console integrieren
- Lighthouse
- angucken: tags generator (default tag react)
- next-SEO (siehe Repo)
- Plausible Targets anlegen (Post-a-Job button, Checkout)
- Stripe auf Prod umstellen
- Deployment 3: Scraper-Job

EPIC: Form überarbeiten

- beim submitten des jobs rechts bezahlmethoden und vielleicht testimonials anzeigen
- preis auf button
- button sticky (desktop - wie mobile?)

## Schritte bis Launch 🚀

- Automatisierte Tests
- Alte jobs löschen
- stripe webhook für payment succeded
- Job Offer bearbeiten können?

## Done

- Target=blank?
- Location Capitalized
- Image bei keiner Company fixen (buchstaben von jobtitel)
- rechteckige Images ermöglichen
- getStaticProps mit revalidation
- Deployment 2: Datenbank
- Deployment 1: Vercel
- file validation
- images storen
- domain kaufen
- joblisting abstand x
- split indeed after "-"
- richtigen JobFilter (keine email, keine stripe session, age < 30d, sorting)
- activation und publicationDate gleich setzen
- Connect user to job
- email feedback
- Plausible einbinden
- Stripe Produkte + Pricing
- Email Adresse anlegen
- https validation
- Post-a-Job Form verarbeiten
- STRIPE API
- Feedback dingens Homepage
- 2 weitere Job Boards anbinden
- Email Validation
- Vorschau
- Contact-Link with mailto:reactjobs@gmail.com
- Impressum
