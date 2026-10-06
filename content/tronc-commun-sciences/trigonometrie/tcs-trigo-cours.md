---
title: Trigonométrie — partie 1 : le radian et le cercle trigonométrique
kind: cours
summary: Le radian et la conversion des degrés, le cercle trigonométrique orienté, abscisses curvilignes d’un point et abscisse curviligne principale.
position: 10
visibility: public
---

## Le radian

:::definition
Sur un cercle de rayon $1$, un angle au centre mesure $1$ **radian** quand il intercepte un arc de longueur $1$. Un tour complet mesure $2\pi$ radians.
:::

:::propriete
$\pi$ radians $= 180°$. Pour convertir : $x$ radians $= \frac{180x}{\pi}$ degrés, et $d$ degrés $= \frac{\pi d}{180}$ radians.
:::

:::exemple
- $60° = \frac{\pi}{3}$ rad ; $45° = \frac{\pi}{4}$ rad ; $30° = \frac{\pi}{6}$ rad ; $90° = \frac{\pi}{2}$ rad.
- $\frac{3\pi}{4}$ rad $= 135°$ et $\frac{5\pi}{6}$ rad $= 150°$.
:::

## Le cercle trigonométrique

:::definition
Dans un repère orthonormé $(O, \vec{i}, \vec{j})$, le **cercle trigonométrique** est le cercle de centre $O$ et de rayon $1$, orienté dans le **sens direct** : le sens inverse des aiguilles d’une montre. On note $I(1 ; 0)$ et $J(0 ; 1)$.
:::

## Abscisses curvilignes

:::definition
On enroule la droite réelle sur le cercle à partir de $I$ : à chaque réel $x$ correspond un point $M$ du cercle, obtenu en parcourant à partir de $I$ un arc de longueur $|x|$, dans le sens direct si $x > 0$ et dans le sens indirect si $x < 0$. On dit que $x$ est **une abscisse curviligne** de $M$.
:::

:::propriete
- Si $x$ est une abscisse curviligne de $M$, les autres sont les réels $x + 2k\pi$, avec $k \in \mathbb{Z}$ : un tour de plus ou de moins ramène au même point.
- Chaque point $M$ a une unique abscisse curviligne dans $]-\pi ; \pi]$ : son **abscisse curviligne principale**.
:::

:::exemple
- $\frac{\pi}{2}$ est une abscisse curviligne de $J$ ; $\pi$ est celle du point $I'(-1 ; 0)$.
- $\frac{17\pi}{3} = 6\pi - \frac{\pi}{3}$ : l’abscisse principale du point associé est $-\frac{\pi}{3}$.
- $\frac{25\pi}{4} = 6\pi + \frac{\pi}{4}$ : l’abscisse principale est $\frac{\pi}{4}$.
:::

:::attention
Pour trouver l’abscisse principale de $\frac{p\pi}{q}$, on retire le bon multiple de $2\pi$ pour arriver dans $]-\pi ; \pi]$ : par exemple $\frac{11\pi}{6} = 2\pi - \frac{\pi}{6}$ donne $-\frac{\pi}{6}$.
:::
