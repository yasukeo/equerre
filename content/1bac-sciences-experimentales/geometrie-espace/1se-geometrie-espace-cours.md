---
title: Géométrie analytique de l’espace — partie 1 : coordonnées et déterminant
kind: cours
summary: Repère de l’espace, coordonnées d’un point et d’un vecteur, milieu, condition de colinéarité, déterminant de trois vecteurs et condition de coplanarité.
position: 10
visibility: public
---

L’espace est muni d’un repère $(O, \vec{i}, \vec{j}, \vec{k})$.

## Coordonnées

:::propriete
- Le point $M$ a pour coordonnées $(x ; y ; z)$ si $\overrightarrow{OM} = x\vec{i} + y\vec{j} + z\vec{k}$.
- $\overrightarrow{AB}$ a pour coordonnées $(x_B - x_A ; y_B - y_A ; z_B - z_A)$.
- Le milieu de $[AB]$ a pour coordonnées $\left(\frac{x_A + x_B}{2} ; \frac{y_A + y_B}{2} ; \frac{z_A + z_B}{2}\right)$.
- Les coordonnées de $\vec{u} + \vec{v}$ et de $k\vec{u}$ s’obtiennent coordonnée par coordonnée.
:::

## Colinéarité

:::propriete
$\vec{u}(x ; y ; z)$ et $\vec{v}(x' ; y' ; z')$ sont colinéaires si et seulement si leurs coordonnées sont proportionnelles, c’est-à-dire si les trois déterminants

$$
\begin{vmatrix} x & x' \\ y & y' \end{vmatrix} \qquad \begin{vmatrix} x & x' \\ z & z' \end{vmatrix} \qquad \begin{vmatrix} y & y' \\ z & z' \end{vmatrix}
$$

sont nuls (avec $\begin{vmatrix} a & c \\ b & d \end{vmatrix} = ad - bc$).
:::

:::exemple
$\vec{u}(2 ; -1 ; 3)$ et $\vec{v}(-4 ; 2 ; -6)$ : $\vec{v} = -2\vec{u}$, ils sont colinéaires. $A(1 ; 0 ; 2)$, $B(2 ; 1 ; 0)$, $C(4 ; 3 ; -4)$ : $\overrightarrow{AB}(1 ; 1 ; -2)$ et $\overrightarrow{AC}(3 ; 3 ; -6) = 3\overrightarrow{AB}$ : les points sont alignés.
:::

## Déterminant de trois vecteurs

:::definition
Le **déterminant** de $\vec{u}(x ; y ; z)$, $\vec{v}(x' ; y' ; z')$, $\vec{w}(x'' ; y'' ; z'')$ est :

$$
\det(\vec{u}, \vec{v}, \vec{w}) = \begin{vmatrix} x & x' & x'' \\ y & y' & y'' \\ z & z' & z'' \end{vmatrix} = x\begin{vmatrix} y' & y'' \\ z' & z'' \end{vmatrix} - x'\begin{vmatrix} y & y'' \\ z & z'' \end{vmatrix} + x''\begin{vmatrix} y & y' \\ z & z' \end{vmatrix}
$$
:::

:::theoreme
$\vec{u}$, $\vec{v}$, $\vec{w}$ sont **coplanaires** si et seulement si $\det(\vec{u}, \vec{v}, \vec{w}) = 0$. Sinon, ils forment une base de l’espace.
:::

:::exemple
$\vec{u}(1 ; 0 ; 2)$, $\vec{v}(0 ; 1 ; 1)$, $\vec{w}(1 ; 1 ; 3)$ : $\det = 1 \times (3 - 1) - 0 + 1 \times (0 \times 1 - 1 \times 2) = 2 - 2 = 0$. Ils sont coplanaires (en effet $\vec{w} = \vec{u} + \vec{v}$).
:::

:::propriete
Quatre points $A$, $B$, $C$, $D$ sont coplanaires si et seulement si $\det\left(\overrightarrow{AB}, \overrightarrow{AC}, \overrightarrow{AD}\right) = 0$.
:::
