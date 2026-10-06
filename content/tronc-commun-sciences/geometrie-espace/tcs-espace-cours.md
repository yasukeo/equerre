---
title: Géométrie dans l’espace — partie 1 : règles d’incidence et positions relatives
kind: cours
summary: Les règles de base de la géométrie dans l’espace, comment déterminer un plan, positions relatives de deux droites, d’une droite et d’un plan, de deux plans, avec le cube comme exemple.
position: 10
visibility: public
---

## Les règles de base

:::propriete
- Par trois points non alignés passe un **unique plan**.
- Si deux points distincts d’une droite sont dans un plan, toute la droite est dans ce plan.
- Si deux plans distincts ont un point commun, leur intersection est une **droite** qui passe par ce point.
- Dans chaque plan de l’espace, tous les résultats de la géométrie plane s’appliquent.
:::

:::propriete
Un plan est déterminé par : trois points non alignés ; ou une droite et un point extérieur à cette droite ; ou deux droites sécantes ; ou deux droites strictement parallèles.
:::

## Le cube de référence

Dans toute la suite, $ABCDEFGH$ est un cube : $ABCD$ est la face du bas, $EFGH$ la face du haut, et $E$, $F$, $G$, $H$ sont respectivement au-dessus de $A$, $B$, $C$, $D$.

## Positions relatives de deux droites

:::propriete
Deux droites de l’espace sont soit **coplanaires** (dans un même plan) — elles sont alors sécantes ou parallèles —, soit **non coplanaires** : elles ne se coupent pas et ne sont pas parallèles.
:::

:::exemple
- $(AB)$ et $(HG)$ sont parallèles : toutes deux sont parallèles à $(DC)$.
- $(AG)$ et $(EC)$ sont sécantes : ce sont les diagonales du rectangle $ACGE$.
- $(AB)$ et $(CG)$ sont non coplanaires.
:::

:::attention
Deux droites qui ne se coupent pas ne sont pas forcément parallèles dans l’espace.
:::

## Positions relatives d’une droite et d’un plan

:::propriete
Une droite $(D)$ et un plan $(P)$ sont dans l’une de ces trois situations : $(D)$ est **incluse** dans $(P)$ ; $(D)$ et $(P)$ sont **sécants** en un point ; $(D)$ est **parallèle** à $(P)$ sans le couper.
:::

:::exemple
$(EG)$ est parallèle au plan $(ABC)$ ; $(AG)$ coupe ce plan en $A$ ; $(AC)$ y est incluse.
:::

## Positions relatives de deux plans

:::propriete
Deux plans distincts sont soit **sécants** suivant une droite, soit **parallèles**.
:::

:::exemple
- Les plans $(ABC)$ et $(EFG)$ sont parallèles.
- Les plans $(ABG)$ et $(DCH)$ ont en commun les points $G$ et $H$ : ils se coupent suivant la droite $(GH)$.
:::
