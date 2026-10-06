---
title: La droite dans le plan — partie 1 : repère, coordonnées, déterminant
kind: cours
summary: Repère du plan, coordonnées d’un point et d’un vecteur, coordonnées du milieu, distance dans un repère orthonormé, déterminant de deux vecteurs, colinéarité et alignement.
position: 10
visibility: public
---

## Repère et coordonnées

:::definition
Un **repère** du plan est un triplet $(O, \vec{i}, \vec{j})$ formé d’un point $O$ et de deux vecteurs non colinéaires. Tout point $M$ s’écrit de façon unique $\overrightarrow{OM} = x\vec{i} + y\vec{j}$ : $(x ; y)$ sont les **coordonnées** de $M$. Tout vecteur $\vec{u} = a\vec{i} + b\vec{j}$ a pour coordonnées $(a ; b)$.
:::

:::propriete
Pour $A(x_A ; y_A)$ et $B(x_B ; y_B)$ :

- $\overrightarrow{AB}(x_B - x_A ; y_B - y_A)$ ;
- le milieu de $[AB]$ a pour coordonnées $\left(\frac{x_A + x_B}{2} ; \frac{y_A + y_B}{2}\right)$ ;
- $\vec{u} + \vec{v}$ et $k\vec{u}$ s’obtiennent en additionnant les coordonnées et en les multipliant par $k$.
:::

:::propriete
Dans un repère **orthonormé** (vecteurs $\vec{i}$ et $\vec{j}$ perpendiculaires et de longueur $1$) :

$$
AB = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2} \qquad \|\vec{u}\| = \sqrt{a^2 + b^2}
$$
:::

:::exemple
$A(1 ; 2)$ et $B(4 ; -1)$ : $\overrightarrow{AB}(3 ; -3)$, le milieu de $[AB]$ est $\left(\frac{5}{2} ; \frac{1}{2}\right)$, et $AB = \sqrt{9 + 9} = 3\sqrt{2}$ dans un repère orthonormé.
:::

## Déterminant et colinéarité

:::definition
Le **déterminant** des vecteurs $\vec{u}(a ; b)$ et $\vec{v}(a' ; b')$ est le réel :

$$
\det(\vec{u}, \vec{v}) = \begin{vmatrix} a & a' \\ b & b' \end{vmatrix} = ab' - a'b
$$
:::

:::theoreme
$\vec{u}$ et $\vec{v}$ sont colinéaires si et seulement si $\det(\vec{u}, \vec{v}) = 0$.
:::

:::exemple
- $\vec{u}(2 ; -3)$ et $\vec{v}(-4 ; 6)$ : $2 \times 6 - (-4) \times (-3) = 12 - 12 = 0$ : colinéaires (en effet $\vec{v} = -2\vec{u}$).
- $A(1 ; 1)$, $B(3 ; 5)$, $C(4 ; 7)$ : $\overrightarrow{AB}(2 ; 4)$ et $\overrightarrow{AC}(3 ; 6)$, de déterminant $2 \times 6 - 3 \times 4 = 0$. Les points sont alignés.
:::

:::attention
Les formules de distance et de norme ne valent que dans un repère **orthonormé** ; le déterminant, lui, sert dans tout repère.
:::
