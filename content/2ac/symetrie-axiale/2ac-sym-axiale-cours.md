---
title: Symétrie axiale — partie 1 : symétrique d’un point et axes de symétrie
kind: cours
summary: Symétrique d’un point par rapport à une droite, construction à l’équerre ou au compas, symétrique dans un repère par rapport aux axes, et axes de symétrie des figures usuelles.
position: 10
visibility: public
---

## Symétrique d’un point

:::definition
Soit $(d)$ une droite. Le **symétrique** d’un point $M$ par rapport à $(d)$ est :

- le point $M$ lui-même, si $M$ est sur $(d)$ ;
- sinon, le point $M'$ tel que $(d)$ soit la **médiatrice** du segment $[MM']$.
:::

:::propriete
**Construction au compas.** On choisit deux points $A$ et $B$ de $(d)$. On trace le cercle de centre $A$ passant par $M$, puis le cercle de centre $B$ passant par $M$. Ils se recoupent en $M'$.
:::

## Dans un repère

:::propriete
Dans un repère orthonormé :

- le symétrique de $M(x ; y)$ par rapport à l’**axe des ordonnées** est $M'(-x ; y)$ ;
- le symétrique de $M(x ; y)$ par rapport à l’**axe des abscisses** est $M'(x ; -y)$.
:::

:::exemple
Pour $A(2 ; 5)$ : par rapport à l’axe des ordonnées, $(-2 ; 5)$ ; par rapport à l’axe des abscisses, $(2 ; -5)$.
:::

## Axes de symétrie d’une figure

:::definition
Une droite $(d)$ est un **axe de symétrie** d’une figure si le symétrique de la figure par rapport à $(d)$ est la figure elle-même.
:::

:::exemple
- Triangle isocèle : $1$ axe (la médiatrice de la base). Triangle équilatéral : $3$ axes.
- Rectangle : $2$ axes. Losange : $2$ axes (ses diagonales). Carré : $4$ axes.
- Hexagone régulier : $6$ axes. Cercle : une infinité d’axes (tous ses diamètres).
- Un parallélogramme quelconque n’a pas d’axe de symétrie.
:::

:::attention
Le symétrique de $M$ n’est pas obtenu en « reportant » $M$ au hasard de l’autre côté : il faut que $(d)$ soit perpendiculaire à $(MM')$ et passe par son milieu.
:::
