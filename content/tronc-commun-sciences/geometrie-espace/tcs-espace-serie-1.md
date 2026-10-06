---
title: Série 1 — partie 1 : règles d’incidence et positions relatives
kind: serie
summary: Positions relatives de droites, de droites et de plans, de plans dans un cube, puis intersection de deux plans dans un tétraèdre, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours. $ABCDEFGH$ est un cube : $ABCD$ en bas, $EFGH$ en haut, $E$ au-dessus de $A$, $F$ de $B$, $G$ de $C$, $H$ de $D$.

:::exercice Deux droites
Préciser la position relative de :

1. $(AB)$ et $(HG)$
2. $(AE)$ et $(BC)$
3. $(AC)$ et $(EG)$
4. $(AG)$ et $(EC)$

:::corrige
1. Parallèles : toutes deux parallèles à $(DC)$.
2. Non coplanaires : elles ne se coupent pas et n’ont pas la même direction.
3. Parallèles : $ACGE$ est un rectangle.
4. Sécantes : ce sont les diagonales du rectangle $ACGE$, qui se coupent en son centre.
:::
:::

:::exercice Droite et plan
Préciser la position relative de :

1. $(EG)$ et le plan $(ABC)$
2. $(AG)$ et le plan $(ABC)$
3. $(EF)$ et le plan $(DCG)$

:::corrige
1. Parallèles : $(EG) \parallel (AC)$, et $(AC)$ est dans $(ABC)$.
2. Sécants en $A$.
3. Parallèles : $(EF) \parallel (DC)$, droite du plan $(DCG)$, et $E$ n’est pas dans ce plan.
:::
:::

:::exercice Deux plans
1. Les plans $(ABC)$ et $(EFG)$ sont-ils sécants ?
2. Déterminer l’intersection des plans $(ABG)$ et $(DCH)$.
3. Déterminer l’intersection des plans $(ACG)$ et $(BDF)$.

:::corrige
1. Non : ce sont les plans de deux faces opposées, ils sont parallèles.
2. $(AB) \parallel (HG)$, donc le plan $(ABG)$ contient $H$. Les points $G$ et $H$ sont communs : l’intersection est $(GH)$.
3. Soit $O$ le centre de $ABCD$ et $O'$ celui de $EFGH$. $O$ et $O'$ sont dans les deux plans : l’intersection est $(OO')$, parallèle à $(AE)$.
:::
:::

:::exercice Dans un tétraèdre
Soit $SABC$ un tétraèdre, $I$ le milieu de $[SA]$ et $J$ le milieu de $[SB]$.

1. Montrer que $(IJ)$ est parallèle au plan $(ABC)$.
2. Déterminer l’intersection des plans $(CIJ)$ et $(ABC)$.

:::corrige
1. Dans le triangle $SAB$, la droite des milieux $(IJ)$ est parallèle à $(AB)$, droite du plan $(ABC)$.
2. Les deux plans ont $C$ en commun et contiennent les droites parallèles $(IJ)$ et $(AB)$ : par le théorème du toit, l’intersection est la parallèle à $(AB)$ passant par $C$.
:::
:::
