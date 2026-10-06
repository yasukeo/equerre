---
title: Le repère dans le plan — partie 1 : coordonnées, milieu, distance
kind: cours
summary: Repère et repère orthonormé, coordonnées d’un point, coordonnées du milieu d’un segment, distance entre deux points, nature d’un triangle et points d’un cercle.
position: 10
visibility: public
---

## Repère et coordonnées

:::definition
Un **repère** du plan est formé d’une origine $O$ et de deux axes gradués sécants. Chaque point $M$ est repéré par deux nombres : son **abscisse** $x$ (lue sur l’axe horizontal) et son **ordonnée** $y$ (lue sur l’axe vertical). On écrit $M(x ; y)$.

Le repère est **orthonormé** si les axes sont perpendiculaires et ont la même unité.
:::

## Milieu d’un segment

:::propriete
Le milieu $I$ du segment $[AB]$ a pour coordonnées :

$$
x_I = \frac{x_A + x_B}{2} \qquad y_I = \frac{y_A + y_B}{2}
$$
:::

:::exemple
$A(2 ; 3)$ et $B(6 ; 1)$ : $I\left(\frac{2 + 6}{2} ; \frac{3 + 1}{2}\right) = (4 ; 2)$.
:::

## Distance entre deux points

:::propriete
Dans un repère **orthonormé** :

$$
AB = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}
$$
:::

:::exemple
$A(2 ; 3)$ et $B(6 ; 1)$ : $AB = \sqrt{4^2 + (-2)^2} = \sqrt{20} = 2\sqrt{5}$.
:::

## Applications

:::exemple
**Nature d’un triangle.** $A(1 ; 1)$, $B(4 ; 5)$, $C(5 ; -2)$ : $AB^2 = 9 + 16 = 25$, $AC^2 = 16 + 9 = 25$, $BC^2 = 1 + 49 = 50$. Donc $AB = AC = 5$ et $AB^2 + AC^2 = BC^2$ : le triangle est rectangle et isocèle en $A$ (réciproque de Pythagore).
:::

:::exemple
**Point d’un cercle.** Le point $M(3 ; 4)$ est sur le cercle de centre $O$ et de rayon $5$, car $OM = \sqrt{9 + 16} = 5$.
:::

:::attention
Dans la formule de distance, on élève au carré des différences : $(-2)^2 = 4$, jamais $-4$.
:::
