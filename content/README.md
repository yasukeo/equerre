# Les documents du cours, en fichiers

Chaque fichier est un document d’un chapitre : un cours, un résumé, une série d’exercices ou un devoir. Il est importé en **brouillon** : la professeure le relit dans l’éditeur, le corrige si besoin, puis le publie elle-même (DECISIONS.md, D-098).

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
