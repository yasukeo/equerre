---
title: Série 1 — partie 2 : familles libres, bases, dimension
kind: serie
summary: Familles libres et liées, bases de ℝ³ et de sous-espaces, coordonnées dans une base, critère du déterminant, bases de ℂ et des matrices symétriques, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Libre ou liée ?
Dire si chaque famille de $\mathbb{R}^3$ est libre ou liée.

1. $\big((1 ; 2 ; 3), (2 ; 4 ; 6)\big)$
2. $\big((1 ; 0 ; 0), (1 ; 1 ; 0), (1 ; 1 ; 1)\big)$
3. $\big((1 ; 1 ; 0), (0 ; 1 ; 1), (1 ; 2 ; 1)\big)$

:::corrige
1. Liée : le second vecteur est le double du premier.
2. $\alpha(1 ; 0 ; 0) + \beta(1 ; 1 ; 0) + \gamma(1 ; 1 ; 1) = \vec{0}$ donne $\gamma = 0$, puis $\beta = 0$, puis $\alpha = 0$ : libre.
3. Liée : $(1 ; 2 ; 1) = (1 ; 1 ; 0) + (0 ; 1 ; 1)$.
:::
:::

:::exercice Une base de ℝ³ et des coordonnées
Soit $\vec{e}_1 = (1 ; 1 ; 1)$, $\vec{e}_2 = (1 ; 1 ; 0)$, $\vec{e}_3 = (1 ; 0 ; 0)$.

1. Montrer que $(\vec{e}_1, \vec{e}_2, \vec{e}_3)$ est une base de $\mathbb{R}^3$.
2. Déterminer les coordonnées de $\vec{x} = (3 ; 5 ; 2)$ dans cette base.

:::corrige
1. La famille est libre (même calcul que dans l’exercice précédent, question 2) et a trois vecteurs dans un espace de dimension $3$ : c’est une base.
2. $a\vec{e}_1 + b\vec{e}_2 + c\vec{e}_3 = (a + b + c ; a + b ; a) = (3 ; 5 ; 2)$ donne $a = 2$, $b = 3$, $c = -2$. Les coordonnées sont $(2 ; 3 ; -2)$.
:::
:::

:::exercice Critère du déterminant
1. Pour quelles valeurs du réel $m$ la famille $\big((1 ; m), (m ; 4)\big)$ est-elle une base de $\mathbb{R}^2$ ?
2. Pour quelles valeurs de $m$ les vecteurs $(1 ; 0 ; m)$, $(0 ; 1 ; 1)$ et $(m ; 1 ; 0)$ forment-ils une base de $\mathbb{R}^3$ ?

:::corrige
1. $\det = 1 \times 4 - m \times m = 4 - m^2 \neq 0 \iff m \neq 2$ et $m \neq -2$.
2. $(1 ; 0 ; m) \wedge (0 ; 1 ; 1) = (0 \times 1 - m \times 1 ; -(1 \times 1 - m \times 0) ; 1 \times 1 - 0) = (-m ; -1 ; 1)$, et le produit scalaire avec $(m ; 1 ; 0)$ vaut $-m^2 - 1 < 0$ : jamais nul. C’est une base pour tout $m$.
:::
:::

:::exercice Bases et dimensions
1. Donner une base et la dimension de l’espace $S$ des matrices symétriques d’ordre $2$.
2. Donner une base et la dimension de $F = \{(x ; y ; z) \in \mathbb{R}^3 : 2x + y - z = 0\}$.
3. Montrer que $(1 + i, 1 - i)$ est une base de $\mathbb{C}$ vu comme espace vectoriel réel, et donner les coordonnées de $3 + 5i$.

:::corrige
1. $\begin{pmatrix} a & b \\ b & c \end{pmatrix} = a\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} + b\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} + c\begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$ ; ces trois matrices sont libres (une combinaison nulle donne $a = b = c = 0$) : base de $S$, de dimension $3$.
2. $z = 2x + y$ : $(x ; y ; z) = x(1 ; 0 ; 2) + y(0 ; 1 ; 1)$ ; deux vecteurs non colinéaires : base, dimension $2$.
3. $\alpha(1 + i) + \beta(1 - i) = 0$ donne $\alpha + \beta = 0$ et $\alpha - \beta = 0$, donc $\alpha = \beta = 0$ : famille libre de $2$ vecteurs dans un espace de dimension $2$, c’est une base. $\alpha + \beta = 3$ et $\alpha - \beta = 5$ : $\alpha = 4$, $\beta = -1$.
:::
:::
