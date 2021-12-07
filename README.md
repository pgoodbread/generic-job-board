# React Jobs

## Run DB

Run docker mongo
`$ docker run -d --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD=mongo mongo`

## Unternehmen angeschrieben

- [Tudock](https://www.tudock.de/) P

**Ziel: Unternehmen anschreiben ab 6.12.** (ca. 5 pro Woche, ansonsten Form etc. für Launch vorbereiten)

## Schritte bis Validierung

- Logo als Stripe Checkout
- Bilder kaputt Remoteok
- Example Text in Form input

EPIC: Form überarbeiten R

- Mobile Checkout Button
- beim submitten des jobs rechts bezahlmethoden und vielleicht testimonials anzeigen
- preis auf button
- button sticky (desktop - wie mobile?)
- Preview auf Mobile oben, weil sonst von Tastatur verdeckt

- Google Search Console integrieren P+R
- Lighthouse P+R
- next-SEO (siehe Repo)

## Schritte bis Launch 🚀

- Deployment 3: Scraper-Job
- Job Offer bearbeiten können?
- Create Header Component
- Google fonts sind slow
- newsletter input zu wenig width
- feedback component in post a job

## After Launch

- S3 requests nur wenn image
- stripe webhook für payment succeded
- Automatisierte Tests
- Suche
- Kategorieseiten?
- Aufklappen eines Listings mit mehr Infos (bedeutet auch Anpassungen beim Erstellen eines Listings)
- automatisches tweeten, newsletter und das beim kauf eines Listings deutlich machen
- tag komponente
- Alte jobs löschen
