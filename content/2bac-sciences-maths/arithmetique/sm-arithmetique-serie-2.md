---
title: Série 1 — partie 2 : PGCD, Bézout, Gauss, Fermat
kind: serie
summary: Algorithme d’Euclide et coefficients de Bézout, nombres premiers entre eux, Gauss, équations ax + by = c, petit théorème de Fermat et congruences linéaires, avec les corrigés.
position: 20
visibility: enrolled
---

Six exercices sur la deuxième partie du cours.

:::exercice Euclide et Bézout
1. Calculer $1071 \wedge 462$ par l’algorithme d’Euclide.
2. En déduire des entiers $u$ et $v$ tels que $1071u + 462v = 1071 \wedge 462$.
3. Calculer $1071 \vee 462$.

:::corrige
1. $1071 = 462 \times 2 + 147$ ; $462 = 147 \times 3 + 21$ ; $147 = 21 \times 7 + 0$. Donc $1071 \wedge 462 = 21$.
2. $21 = 462 - 3 \times 147 = 462 - 3(1071 - 2 \times 462) = 7 \times 462 - 3 \times 1071$ : $u = -3$, $v = 7$.
3. $\frac{1071 \times 462}{21} = 1071 \times 22 = 23\,562$.
:::
:::

:::exercice Premiers entre eux
1. Montrer que pour tout entier $n$, $(2n + 1) \wedge (3n + 2) = 1$.
2. Montrer que deux entiers consécutifs sont premiers entre eux.

:::corrige
1. $3(2n + 1) - 2(3n + 2) = -1$, soit $(2n + 1) \times 3 + (3n + 2) \times (-2) = -1$, donc $(2n + 1)(-3) + (3n + 2)(2) = 1$ : par Bézout, ils sont premiers entre eux.
2. $(n + 1) \times 1 + n \times (-1) = 1$.
:::
:::

:::exercice Théorème de Gauss
1. Déterminer les entiers $x$ tels que $15 \mid 4x$.
2. Résoudre dans $\mathbb{Z}^2$ l’équation $7x = 12y$.

:::corrige
1. $15 \mid 4x$ et $15 \wedge 4 = 1$, donc $15 \mid x$ : $x = 15k$, $k \in \mathbb{Z}$.
2. $7 \mid 12y$ et $7 \wedge 12 = 1$, donc $7 \mid y$ : $y = 7k$, et alors $x = 12k$. Les solutions sont $(12k ; 7k)$, $k \in \mathbb{Z}$.
:::
:::

:::exercice Équations ax + by = c
1. Résoudre dans $\mathbb{Z}^2$ l’équation $11x - 7y = 1$.
2. L’équation $6x + 15y = 4$ a-t-elle des solutions entières ?
3. Résoudre $6x + 15y = 9$.

:::corrige
1. Solution particulière : $(2 ; 3)$, car $22 - 21 = 1$. Alors $11(x - 2) = 7(y - 3)$ ; $11 \wedge 7 = 1$, donc $7 \mid x - 2$ : $x = 2 + 7k$ et $y = 3 + 11k$, $k \in \mathbb{Z}$.
2. $6 \wedge 15 = 3$ ne divise pas $4$ : aucune solution.
3. On divise par $3$ : $2x + 5y = 3$. Solution particulière $(-1 ; 1)$. Alors $2(x + 1) = -5(y - 1)$, donc $5 \mid x + 1$ : $x = -1 + 5k$, $y = 1 - 2k$, $k \in \mathbb{Z}$.
:::
:::

:::exercice Petit théorème de Fermat
1. Déterminer le reste de la division de $2^{2026}$ par $11$.
2. Montrer que pour tout entier $n$, $n^5 - n$ est divisible par $5$, puis par $30$.

:::corrige
1. $11$ est premier et ne divise pas $2$ : $2^{10} \equiv 1 \ [11]$. $2026 = 10 \times 202 + 6$, donc $2^{2026} \equiv 2^6 = 64 \equiv 9 \ [11]$.
2. Fermat : $n^5 \equiv n \ [5]$. De plus $n^5 - n = n(n - 1)(n + 1)(n^2 + 1)$ contient trois entiers consécutifs, donc est divisible par $2$ et par $3$. $2$, $3$ et $5$ étant premiers entre eux deux à deux, $30 \mid n^5 - n$.
:::
:::

:::exercice Congruences linéaires
1. Résoudre $5x \equiv 3 \ [8]$.
2. Résoudre le système $x \equiv 2 \ [3]$ et $x \equiv 3 \ [5]$.

:::corrige
1. $5 \times 5 = 25 \equiv 1 \ [8]$ : $5$ est son propre inverse modulo $8$. $x \equiv 5 \times 3 = 15 \equiv 7 \ [8]$.
2. $x = 3 + 5k$ ; il faut $3 + 5k \equiv 2 \ [3]$, soit $2k \equiv -1 \equiv 2 \ [3]$, donc $k \equiv 1 \ [3]$ : $k = 1 + 3m$ et $x = 8 + 15m$. Les solutions sont les $x \equiv 8 \ [15]$.
:::
:::
