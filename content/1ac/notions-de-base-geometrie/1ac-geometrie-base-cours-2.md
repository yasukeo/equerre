---
title: Notions de base de la géométrie — partie 2 : positions relatives de droites
kind: cours
summary: Droites sécantes, perpendiculaires et parallèles, les propriétés qui les relient, et la distance d’un point à une droite.
position: 20
visibility: public
---

## Positions de deux droites

:::definition
- Deux droites **sécantes** ont un seul point commun.
- Deux droites **perpendiculaires** sont sécantes en formant un angle droit. On note $(d) \perp (d')$.
- Deux droites **parallèles** n’ont aucun point commun, ou sont confondues. On note $(d) \parallel (d')$.
:::

## Propriétés

:::propriete
1. Si deux droites sont parallèles à une même troisième, elles sont parallèles entre elles.
2. Si deux droites sont perpendiculaires à une même troisième, elles sont parallèles entre elles.
3. Si deux droites sont parallèles, toute droite perpendiculaire à l’une est perpendiculaire à l’autre.
:::

:::exemple
On sait que $(d_1) \perp (\Delta)$ et $(d_2) \perp (\Delta)$. D’après la propriété 2, $(d_1) \parallel (d_2)$.
:::

:::exemple
On sait que $(d_1) \parallel (d_2)$ et $(d_3) \perp (d_1)$. D’après la propriété 3, $(d_3) \perp (d_2)$.
:::

## Distance d’un point à une droite

:::definition
La **distance** d’un point $M$ à une droite $(d)$ est la longueur $MH$, où $H$ est le point de $(d)$ tel que $(MH) \perp (d)$. C’est la plus courte distance entre $M$ et un point de $(d)$.
:::

:::attention
Pour démontrer, on cite toujours la propriété utilisée : on ne se contente pas de « voir » sur la figure que deux droites sont parallèles.
:::
