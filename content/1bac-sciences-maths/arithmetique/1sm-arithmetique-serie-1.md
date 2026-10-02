---
title: Série 1 — partie 1 : divisibilité, congruences, nombres premiers
kind: serie
summary: Divisibilité et division euclidienne, restes de puissances, tableaux de congruences, critères de divisibilité, nombres premiers et nombre de diviseurs, avec les corrigés.
position: 10
visibility: public
---

Six exercices sur la première partie du cours.

:::exercice Divisibilité
1. Déterminer les entiers naturels $n$ tels que $n + 1$ divise $3n + 8$.
2. Montrer que pour tout entier $n$, $n(n + 1)(n + 2)$ est divisible par $6$.

:::corrige
1. $n + 1 \mid 3(n + 1)$, donc $n + 1 \mid (3n + 8) - 3(n + 1) = 5$. Ainsi $n + 1 \in \{1 ; 5\}$, soit $n = 0$ ou $n = 4$ ; les deux conviennent ($8$ et $20$ sont divisibles par $1$ et $5$).
2. Parmi deux entiers consécutifs, l’un est pair : le produit est divisible par $2$. Parmi trois consécutifs, l’un est multiple de $3$ : le produit est divisible par $3$. Comme $2 \wedge 3 = 1$, il est divisible par $6$.
:::
:::

:::exercice Division euclidienne
1. Effectuer la division euclidienne de $-45$ par $7$.
2. Le reste de la division de $a$ par $11$ est $7$. Quel est le reste de la division de $3a + 5$ par $11$ ?

:::corrige
1. $-45 = 7 \times (-7) + 4$ : quotient $-7$, reste $4$.
2. $a \equiv 7 \ [11]$, donc $3a + 5 \equiv 26 \equiv 4 \ [11]$ : le reste est $4$.
:::
:::

:::exercice Restes de puissances
1. Déterminer le reste de la division de $5^{2026}$ par $13$.
2. Montrer que pour tout entier naturel $n$, $3^{2n} - 2^n$ est divisible par $7$.

:::corrige
1. $5^2 = 25 \equiv -1 \ [13]$, donc $5^4 \equiv 1 \ [13]$. $2026 = 4 \times 506 + 2$, donc $5^{2026} \equiv 5^2 \equiv 25 \equiv 12 \ [13]$ : le reste est $12$.
2. $3^{2n} = 9^n$ et $9 \equiv 2 \ [7]$, donc $9^n \equiv 2^n \ [7]$ et $3^{2n} - 2^n \equiv 0 \ [7]$.
:::
:::

:::exercice Tableau de congruences
1. Quels sont les restes possibles de $n^2$ modulo $5$ ?
2. En déduire que l’équation $x^2 = 5y + 3$ n’a pas de solution entière.

:::corrige
1. Pour $n \equiv 0, 1, 2, 3, 4 \ [5]$, $n^2 \equiv 0, 1, 4, 9 \equiv 4, 16 \equiv 1 \ [5]$ : les restes possibles sont $0$, $1$ et $4$.
2. On aurait $x^2 \equiv 3 \ [5]$, ce qui est impossible.
:::
:::

:::exercice Critères de divisibilité
1. Sans poser la division, dire si $123\,456\,789$ est divisible par $9$.
2. Montrer que l’entier $\overline{abcabc}$ (écrit avec les chiffres $a$, $b$, $c$ répétés) est divisible par $7$, $11$ et $13$.

:::corrige
1. La somme des chiffres vaut $45$, divisible par $9$ : oui.
2. $\overline{abcabc} = \overline{abc} \times 1000 + \overline{abc} = 1001 \times \overline{abc}$, et $1001 = 7 \times 11 \times 13$.
:::
:::

:::exercice Nombres premiers et diviseurs
1. Les nombres $221$ et $223$ sont-ils premiers ?
2. Décomposer $1260$ en facteurs premiers et donner le nombre de ses diviseurs positifs.

:::corrige
1. $\sqrt{221} \approx 14{,}9$ : $221 = 13 \times 17$, il n’est pas premier. $\sqrt{223} \approx 14{,}9$ : ni $2$, $3$, $5$, $7$, $11$ ni $13$ ne divisent $223$, il est premier.
2. $1260 = 2^2 \times 3^2 \times 5 \times 7$ : $(2 + 1)(2 + 1)(1 + 1)(1 + 1) = 36$ diviseurs.
:::
:::
