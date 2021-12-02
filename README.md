# React Jobs

## Run DB

Run docker mongo
`$ docker run -d --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD=mongo mongo`

## Most Important Things

- fix feedback thingy R
- Stripe Check wie kostenlos machen R

- clear prod DB für Newsletter P
- max width auf Job-Listing Abschnitten (Tags, Bild, Age) P
- Text an Companies (Englisch) P

**Ziel: Unternehmen anschreiben ab 6.12.** (ca. 5 pro Woche, ansonsten Form etc. für Launch vorbereiten)

## Schritte bis Validierung

EPIC: Form überarbeiten R

- beim submitten des jobs rechts bezahlmethoden und vielleicht testimonials anzeigen
- preis auf button
- button sticky (desktop - wie mobile?)
- Preview auf Mobile oben, weil sonst von Tastatur verdeckt

- Google Search Console integrieren P+R
- Lighthouse P+R

- angucken: tags generator (default tag react)
- next-SEO (siehe Repo)
- Deployment 3: Scraper-Job
- S3 requests nur wenn image

## Schritte bis Launch 🚀

- Automatisierte Tests
- Alte jobs löschen
- stripe webhook für payment succeded
- Job Offer bearbeiten können?
- Create Header Component

## After Launch
- Suche
- Kategorieseiten?
- Aufklappen eines Listings mit mehr Infos (bedeutet auch Anpassungen beim Erstellen eines Listings)
- automatisches tweeten, newsletter und das beim kauf eines Listings deutlich machen