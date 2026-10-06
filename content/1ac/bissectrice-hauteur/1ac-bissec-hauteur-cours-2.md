---
title: Bissectrice et hauteur — partie 2 : les hauteurs
kind: cours
summary: La hauteur d’un triangle issue d’un sommet, sa construction à l’équerre, l’orthocentre où se coupent les trois hauteurs, et sa position selon que le triangle est aigu, rectangle ou obtus.
position: 20
visibility: public
---

## Hauteur d’un triangle

:::definition
Dans un triangle $ABC$, la **hauteur issue de $A$** est la droite qui passe par $A$ et qui est **perpendiculaire** au côté opposé $(BC)$. Son point d’intersection $H$ avec $(BC)$ est le **pied** de la hauteur.
:::

:::exemple
Pour tracer la hauteur issue de $A$ : on pose un côté de l’équerre le long de $(BC)$, on la fait glisser jusqu’à ce que l’autre côté passe par $A$, et on trace.
:::

:::attention
Si l’angle en $B$ ou en $C$ est obtus, le pied de la hauteur issue de $A$ est en dehors du segment $[BC]$ : il faut prolonger le côté.
:::

## Aire et hauteur

:::propriete
L’aire d’un triangle est égale à la moitié du produit d’un côté par la hauteur relative à ce côté :

$$\text{Aire} = \frac{BC \times AH}{2}$$
:::

:::exemple
Avec $BC = 8$ cm et $AH = 5$ cm, l’aire est $\frac{8 \times 5}{2} = 20$ cm².
:::

## L’orthocentre

:::propriete
Les trois hauteurs d’un triangle sont **concourantes**. Leur point commun s’appelle l’**orthocentre** du triangle.
:::

:::propriete
- Si le triangle a trois angles aigus, l’orthocentre est **à l’intérieur**.
- Si le triangle est **rectangle**, l’orthocentre est le **sommet de l’angle droit**, car deux côtés sont déjà des hauteurs.
- Si le triangle a un angle obtus, l’orthocentre est **à l’extérieur**.
:::

:::attention
Ne pas confondre : la **médiatrice** d’un côté est perpendiculaire à ce côté en son **milieu** ; la **hauteur** est perpendiculaire au côté et passe par le **sommet opposé**. Elles ne sont confondues que dans certains triangles, par exemple pour la base d’un triangle isocèle.
:::
