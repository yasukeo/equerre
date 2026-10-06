---
title: Série 1 — partie 2 : équations de droites
kind: serie
summary: Représentation paramétrique et équation cartésienne, droite passant par deux points, parallèle et perpendiculaire, intersection et positions relatives, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours. Le repère est orthonormé.

:::exercice Paramétrique et cartésienne
Soit $(D)$ la droite passant par $A(2 ; -1)$ et de vecteur directeur $\vec{u}(1 ; 3)$.

1. Donner une représentation paramétrique de $(D)$.
2. Donner une équation cartésienne de $(D)$.
3. Le point $B(4 ; 5)$ est-il sur $(D)$ ?

:::corrige
1. $x = 2 + t$, $y = -1 + 3t$, $t \in \mathbb{R}$.
2. $\det\left(\overrightarrow{AM}, \vec{u}\right) = 3(x - 2) - (y + 1) = 3x - y - 7$ : $3x - y - 7 = 0$.
3. $12 - 5 - 7 = 0$ : oui (c’est le point obtenu pour $t = 2$).
:::
:::

:::exercice Par deux points, parallèle, perpendiculaire
On donne $A(-1 ; 3)$, $B(2 ; -3)$ et $C(1 ; 4)$.

1. Donner l’équation réduite de $(AB)$.
2. Donner l’équation réduite de la parallèle à $(AB)$ passant par $C$.
3. Donner l’équation réduite de la perpendiculaire à $(AB)$ passant par $C$.

:::corrige
1. $m = \frac{-3 - 3}{2 + 1} = -2$, et $3 = 2 + p$ donne $p = 1$ : $y = -2x + 1$.
2. Pente $-2$, et $4 = -2 + p$ : $y = -2x + 6$.
3. Pente $\frac{1}{2}$ car $-2 \times \frac{1}{2} = -1$, et $4 = \frac{1}{2} + p$ : $y = \frac{1}{2}x + \frac{7}{2}$.
:::
:::

:::exercice Intersection
Déterminer le point d’intersection des droites $(D_1) : 2x + y - 1 = 0$ et $(D_2) : x - y - 5 = 0$.

:::corrige
En additionnant les deux équations : $3x - 6 = 0$, donc $x = 2$, puis $y = 1 - 4 = -3$. Le point est $(2 ; -3)$.
:::
:::

:::exercice Positions relatives
Préciser la position relative des droites :

1. $(D) : 3x - 6y + 2 = 0$ et $(D') : -x + 2y + 5 = 0$
2. $(D) : y = 2x - 1$ et $(D') : x + 2y - 3 = 0$

:::corrige
1. $3 \times 2 - (-1) \times (-6) = 0$ : parallèles. Leurs équations réduites $y = \frac{1}{2}x + \frac{1}{3}$ et $y = \frac{1}{2}x - \frac{5}{2}$ sont différentes : elles sont strictement parallèles.
2. Pentes $2$ et $-\frac{1}{2}$, de produit $-1$ : perpendiculaires. En remplaçant $y$ : $x + 4x - 2 - 3 = 0$, donc $x = 1$, $y = 1$ ; elles se coupent en $(1 ; 1)$.
:::
:::
