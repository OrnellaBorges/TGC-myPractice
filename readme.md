## Keskona:

- [frontend] main.tsx: router

- [frontend] App.tsx: layout

- [frontend] pages/RecentAds.tsx: liste d'annonces récentes
  - fetch depuis une api
  - utilisation de useState+useEffect
- [frontend] src/pages/AdCreaForm.tsx: formulaire

- [frontend] src/components/Header.tsx:

  - fetch depuis une api
  - utilisation de useState+useEffect
  - Lien "Publier une annonce" vers "AdCreaForm"

- [backend] Routes Category (BREAD)
  - browse
- [backend] Routes Ad (BREAD)
  - browse
  - read
  - add
  - delete

## KESKONFOUT:

- [frontend] src/pages/AdCreaForm.tsx:

  - envoyer données backend
  - ajouter des champs pour matcher la data du backend (Ad)
  - ajouter des champs pour Category > select composant
  - ajouter des champs pour Tag

    > > > [backend] Entité Tag + routes (a faire avant pour pouvoir fetcher tags)
    > > > fetcher la liste des tags dans le composant

- [backend] Entité Tag

- [backend] Routes Tag (BREAD)

  - browse
  - add ajouter des tag (post)

  - [backend] Routes Category (BREAD)
    - read
    - edit
    - add
    - delete

## Keskifofaire:

- [frontend] src/components/AdCard.tsx:
  - ajout de la photo
  - css
- [frontend] src/pages/AdDetail.tsx:
  - ... tout ?
- [frontend] src/pages/CategoryDetail.tsx:

  - ... tout ?

- [backend] index.ts:
- splitter les routes ! REFACTO
- [backend] Routes Category (BREAD)
  - read
  - edit
  - add
  - delete
- [backend] Routes Ad (BREAD)
  - edit
- [backend] Routes Tag (BREAD)
  - read
  - edit
  - delete
