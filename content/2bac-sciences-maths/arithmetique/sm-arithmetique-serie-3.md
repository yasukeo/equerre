---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux exercices d’arithmétique comme à l’examen national de Sciences mathématiques : une équation diophantienne et ses solutions bornées, puis Fermat et les carrés des nombres premiers, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : une équation diophantienne
On considère l’équation $(E) : 143x - 195y = 52$, d’inconnues entières $x$ et $y$.

1. Décomposer $143$ et $195$ en facteurs premiers, et en déduire $143 \wedge 195$.
2. Justifier que $(E)$ a des solutions, et montrer qu’elle équivaut à $11x - 15y = 4$.
3. Vérifier que $(-1 ; -1)$ est une solution, puis résoudre $(E)$.
4. Déterminer les solutions de $(E)$ telles que $0 < x < 50$.

:::corrige
1. $143 = 11 \times 13$ et $195 = 3 \times 5 \times 13$ : $143 \wedge 195 = 13$.
2. $13$ divise $52 = 4 \times 13$ : il y a des solutions. En divisant par $13$ : $11x - 15y = 4$.
3. $11 \times (-1) - 15 \times (-1) = 4$. Par soustraction, $11(x + 1) = 15(y + 1)$ ; $11 \wedge 15 = 1$, donc par Gauss $15 \mid x + 1$ : $x = -1 + 15k$, puis $11 \times 15k = 15(y + 1)$, donc $y = -1 + 11k$, $k \in \mathbb{Z}$. Réciproquement, ces couples conviennent.
4. $0 < -1 + 15k < 50 \iff \frac{1}{15} < k < \frac{51}{15}$, soit $k \in \{1 ; 2 ; 3\}$ : $(14 ; 10)$, $(29 ; 21)$ et $(44 ; 32)$.
:::
:::

:::exercice Problème 2 : Fermat et carrés de nombres premiers
1. Montrer que le carré de tout entier impair est congru à $1$ modulo $8$.
2. Soit $p$ un nombre premier, $p \geq 5$. Montrer que $p^2 \equiv 1 \ [3]$ et que $p^2 \equiv 1 \ [8]$.
3. En déduire que $24$ divise $p^2 - 1$.
4. En utilisant le petit théorème de Fermat, montrer que pour tout entier $n$, $n^7 - n$ est divisible par $7$.
5. Déterminer le chiffre des unités de $7^{2026}$.

:::corrige
1. Un impair s’écrit $2k + 1$ : $(2k + 1)^2 = 4k(k + 1) + 1$, et $k(k + 1)$ est pair, donc $4k(k + 1)$ est divisible par $8$.
2. $p$ n’est pas divisible par $3$, donc $p \equiv 1$ ou $2 \ [3]$, et $p^2 \equiv 1 \ [3]$ dans les deux cas. $p$ est impair, donc $p^2 \equiv 1 \ [8]$ d’après la question 1.
3. $3 \mid p^2 - 1$, $8 \mid p^2 - 1$ et $3 \wedge 8 = 1$, donc $24 \mid p^2 - 1$.
4. $7$ est premier : pour tout entier $n$, $n^7 \equiv n \ [7]$.
5. $7^2 = 49 \equiv -1 \ [10]$, donc $7^4 \equiv 1 \ [10]$. $2026 = 4 \times 506 + 2$, donc $7^{2026} \equiv 49 \equiv 9 \ [10]$ : le chiffre des unités est $9$.
:::
:::
