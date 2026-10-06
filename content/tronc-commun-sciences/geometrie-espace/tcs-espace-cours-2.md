---
title: Géométrie dans l’espace — partie 2 : parallélisme, orthogonalité et volumes
kind: cours
summary: Droite parallèle à un plan, plans parallèles, théorème du toit, droite orthogonale à un plan, et les formules d’aires et de volumes des solides usuels.
position: 20
visibility: public
---

## Parallélisme

:::theoreme
- Une droite est parallèle à un plan si elle est parallèle à une droite de ce plan.
- Deux plans sont parallèles si l’un contient deux droites sécantes parallèles à l’autre.
- Si deux plans sont parallèles, tout plan qui coupe l’un coupe l’autre, et les deux droites d’intersection sont parallèles.
:::

:::theoreme
**Théorème du toit.** Si deux plans sécants contiennent deux droites parallèles, alors leur droite d’intersection est parallèle à ces deux droites.
:::

:::exemple
Soit $SABC$ un tétraèdre, $I$ et $J$ les milieux de $[SA]$ et $[SB]$. Dans le triangle $SAB$, $(IJ) \parallel (AB)$, donc $(IJ)$ est parallèle au plan $(ABC)$. Les plans $(CIJ)$ et $(ABC)$ ont le point $C$ en commun et contiennent les droites parallèles $(IJ)$ et $(AB)$ : leur intersection est la parallèle à $(AB)$ passant par $C$.
:::

## Orthogonalité

:::definition
Deux droites de l’espace sont **orthogonales** si leurs parallèles menées par un même point sont perpendiculaires. Une droite est **orthogonale à un plan** si elle est orthogonale à toutes les droites de ce plan.
:::

:::theoreme
Une droite est orthogonale à un plan si et seulement si elle est orthogonale à **deux droites sécantes** de ce plan.
:::

:::exemple
Dans le cube, $(AE)$ est orthogonale à $(AB)$ et à $(AD)$, sécantes dans le plan $(ABC)$ : $(AE)$ est orthogonale au plan $(ABC)$, donc à $(AC)$. Le triangle $AEC$ est rectangle en $A$, et pour un cube d’arête $a$ : $EC^2 = a^2 + 2a^2 = 3a^2$, soit $EC = a\sqrt{3}$.
:::

## Aires et volumes

:::propriete
- Pavé droit de dimensions $a$, $b$, $c$ : $V = abc$ ; cube d’arête $a$ : $V = a^3$.
- Prisme droit et cylindre : $V = \mathcal{B} \times h$ (aire de la base fois hauteur) ; cylindre : $V = \pi r^2 h$.
- Pyramide et cône : $V = \frac{1}{3}\mathcal{B} \times h$ ; cône : $V = \frac{1}{3}\pi r^2 h$.
- Sphère de rayon $r$ : aire $4\pi r^2$, volume de la boule $\frac{4}{3}\pi r^3$.
:::

:::exemple
Une pyramide à base carrée de côté $6$ et de hauteur $4$ a pour volume $\frac{1}{3} \times 36 \times 4 = 48$. Un cône de rayon $3$ et de hauteur $4$ a pour volume $\frac{1}{3}\pi \times 9 \times 4 = 12\pi$, et sa génératrice mesure $\sqrt{9 + 16} = 5$.
:::
