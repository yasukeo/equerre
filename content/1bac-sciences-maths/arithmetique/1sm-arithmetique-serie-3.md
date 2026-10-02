---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes d’arithmétique : restes et congruences d’une puissance, puis PGCD de deux expressions dépendant de n, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : puissances de 3
1. Déterminer les restes de la division de $3^n$ par $7$ pour $n = 0, 1, \ldots, 6$.
2. En déduire le reste de la division de $3^{2026}$ par $7$.
3. Déterminer les entiers naturels $n$ tels que $3^n + 1$ soit divisible par $7$.

:::corrige
1. $1, 3, 2, 6, 4, 5, 1$ : le cycle a une longueur $6$ ($3^6 \equiv 1 \ [7]$).
2. $2026 = 6 \times 337 + 4$, donc $3^{2026} \equiv 3^4 \equiv 4 \ [7]$.
3. Il faut $3^n \equiv -1 \equiv 6 \ [7]$ : d’après le cycle, $n \equiv 3 \ [6]$, soit $n = 6k + 3$.
:::
:::

:::exercice Problème 2 : un PGCD qui dépend de n
Pour tout entier naturel $n$, on pose $a = 3n + 4$ et $b = 2n + 1$.

1. Montrer que $a \wedge b$ divise $5$.
2. En déduire les valeurs possibles de $a \wedge b$.
3. Déterminer les $n$ pour lesquels $a \wedge b = 5$.

:::corrige
1. Un diviseur commun divise $2a - 3b = 6n + 8 - 6n - 3 = 5$.
2. $a \wedge b \in \{1 ; 5\}$.
3. $5 \mid 2n + 1 \iff 2n \equiv -1 \equiv 4 \ [5] \iff n \equiv 2 \ [5]$ ; alors $3n + 4 \equiv 10 \equiv 0 \ [5]$ aussi. Donc $a \wedge b = 5 \iff n \equiv 2 \ [5]$.
:::
:::
