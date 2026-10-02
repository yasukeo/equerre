---
title: Série 1 — partie 2 : suites arithmétiques et géométriques
kind: serie
summary: Reconnaître une suite arithmétique ou géométrique, termes et sommes, trois termes consécutifs, suites auxiliaires arithmétique et géométrique, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Reconnaître
Les suites suivantes sont-elles arithmétiques ou géométriques ?

1. $u_n = 5 - 3n$
2. $v_n = 2^{n + 1}$
3. $w_n = n^2 + 1$

:::corrige
1. $u_{n + 1} - u_n = -3$ : arithmétique de raison $-3$.
2. $\frac{v_{n + 1}}{v_n} = 2$ : géométrique de raison $2$.
3. $w_1 - w_0 = 1$, $w_2 - w_1 = 3$ ; $\frac{w_1}{w_0} = 2$, $\frac{w_2}{w_1} = \frac{5}{2}$ : ni l’une, ni l’autre.
:::
:::

:::exercice Termes et sommes
1. $(u_n)$ est arithmétique, $u_5 = 7$ et $u_{12} = 28$. Calculer $u_0$ et $u_5 + u_6 + \cdots + u_{12}$.
2. $(v_n)$ est géométrique de raison positive, $v_2 = 12$ et $v_4 = 48$. Calculer $v_0$ et $v_0 + v_1 + \cdots + v_6$.

:::corrige
1. $7r = 21$, $r = 3$, $u_0 = 7 - 15 = -8$. Somme de $8$ termes : $8 \times \frac{7 + 28}{2} = 140$.
2. $q^2 = 4$ et $q > 0$ : $q = 2$, $v_0 = 3$. $v_0 + \cdots + v_6 = 3 \times \frac{1 - 2^7}{1 - 2} = 381$.
:::
:::

:::exercice Trois termes consécutifs
1. Trouver $x$ pour que $x - 1$, $2x$ et $4x - 3$ soient trois termes consécutifs d’une suite arithmétique.
2. Trouver $x > 0$ pour que $2$, $x$ et $18$ soient trois termes consécutifs d’une suite géométrique.

:::corrige
1. $2 \times 2x = (x - 1) + (4x - 3)$, soit $4x = 5x - 4$ et $x = 4$ (termes $3$, $8$, $13$).
2. $x^2 = 36$ et $x > 0$ : $x = 6$.
:::
:::

:::exercice Suites auxiliaires
1. Soit $u_0 = 4$ et $u_{n + 1} = 3u_n - 2$. Montrer que $v_n = u_n - 1$ est géométrique et exprimer $u_n$.
2. Soit $a_0 = 1$ et $a_{n + 1} = \dfrac{a_n}{2a_n + 1}$. Montrer que $b_n = \dfrac{1}{a_n}$ est arithmétique et exprimer $a_n$.

:::corrige
1. $v_{n + 1} = 3u_n - 3 = 3v_n$, $v_0 = 3$, donc $v_n = 3^{n + 1}$ et $u_n = 3^{n + 1} + 1$.
2. $b_{n + 1} = \frac{2a_n + 1}{a_n} = 2 + b_n$ : arithmétique de raison $2$, $b_0 = 1$, $b_n = 2n + 1$ et $a_n = \frac{1}{2n + 1}$.
:::
:::
