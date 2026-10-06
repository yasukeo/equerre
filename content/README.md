# Les documents du cours, en fichiers

Chaque fichier est un document d’un chapitre : un cours, un résumé, une série d’exercices ou un devoir. Il est importé en brouillon (DECISIONS.md, D-098), puis publié directement (D-101) ; la professeure peut toujours le corriger ou le retirer du site depuis l’éditeur.

```
content/<programme>/<chapitre>/<slug>.md
```

- `<programme>` et `<chapitre>` sont les slugs de `supabase/curriculum/maths.json` : `2bac-sciences-experimentales/limites-et-continuite`.
- `<slug>` est l’adresse du document, unique dans tout le site : `continuite-cours`, `limites-serie-1`.

## En-tête

```
---
title: Limites et continuité
kind: cours
summary: Une phrase, 300 caractères au plus.
position: 10
visibility: public
---
```

- `kind` : `cours`, `resume`, `serie` ou `devoir`.
- `position` : l’ordre dans le chapitre, parmi les documents du même type.
- `visibility` : `public` (tout le monde) ou `enrolled` (les élèves inscrits du programme).

## Corps

| Écrire                                 | Pour obtenir                                                               |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `## Titre`, `### Sous-titre`           | les titres (le titre du document est l’en-tête)                            |
| `$x^2$`                                | une formule dans le texte                                                  |
| `$$ … $$`, sur une ou plusieurs lignes | une formule centrée                                                        |
| `**gras**`, `*italique*`, `\$`         | le gras, l’italique, un dollar                                             |
| `- puce`, `1. numéro`                  | des listes, imbriquées par deux espaces                                    |
| `:::definition` … `:::`                | un encadré : `definition`, `theoreme`, `propriete`, `exemple`, `attention` |
| `:::exercice Titre` … `:::`            | un exercice (titre facultatif)                                             |
| `:::corrige` … `:::`, dans un exercice | son corrigé, à la fin de l’exercice                                        |

Une formule centrée ne va pas dans une liste : écrivez-la en ligne avec `$…$`.

## Importer

```
pnpm content:import                    # vérifie tout et dit ce qui serait fait
pnpm content:import --write            # importe les nouveaux documents en brouillon
pnpm content:import --write --update   # réécrit aussi les brouillons depuis leur fichier
```

Un document publié n’est jamais modifié par l’import : une fois publié, il appartient à la professeure.

## Corrigés des examens nationaux

Les sujets nationaux dont le ministère n’a pas publié d’éléments de réponse ont un corrigé rédigé par Équerre (D-103), en français même quand le sujet est en arabe. Chaque corrigé est un fichier :

```
content/corriges/<programme>/<sujet>.md
```

- `<programme>` est le slug du programme : `2bac-sciences-maths`.
- `<sujet>` est l’adresse du sujet : l’année et la session, puis les filières qui l’ont passé s’il y a lieu : `2021-normale`, `2019-normale-pc-svt-et-sciences-agronomiques`. C’est aussi l’adresse de la page : `/examens/2bac-sciences-maths/2021-normale`.

L’en-tête n’a qu’un champ, `summary` (300 caractères au plus) : ce que couvre le sujet, en une phrase. Le corps suit la même syntaxe que les cours : un titre `##` par exercice, `###` pour ses parties, et chaque question en gras (`**2. a)**`).

```
pnpm corrections:import            # vérifie tout et dit ce qui serait fait
pnpm corrections:import --write    # publie les nouveaux corrigés, réécrit ceux qui ont changé
```

Un corrigé n’est accepté que pour un sujet qui n’a pas déjà un corrigé en PDF. Un corrigé retiré du site garde ce statut : seul son texte suit le fichier. Les pages publiques montrent les changements au déploiement suivant.
