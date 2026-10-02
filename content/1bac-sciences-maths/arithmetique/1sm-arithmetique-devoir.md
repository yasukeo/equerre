---
title: Devoir surveillé : arithmétique dans ℤ
kind: devoir
summary: Un devoir d’une heure sur 20 points : division euclidienne et congruences, nombres premiers et diviseurs, PGCD et PPCM, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (7 points) : congruences
1. Effectuer la division euclidienne de $-38$ par $6$. (1 pt)
2. Déterminer le reste de la division de $2^{100}$ par $5$. (3 pts)
3. Montrer que pour tout entier $n$, $n^3 - n$ est divisible par $6$. (3 pts)

:::corrige
1. $-38 = 6 \times (-7) + 4$.
2. $2^4 = 16 \equiv 1 \ [5]$ et $100 = 4 \times 25$ : $2^{100} \equiv 1 \ [5]$.
3. $n^3 - n = (n - 1)n(n + 1)$ : produit de trois entiers consécutifs, divisible par $2$ et par $3$, donc par $6$.
:::
:::

:::exercice Exercice 2 (5 points) : nombres premiers
1. $221$ est-il premier ? (2 pts)
2. Décomposer $504$ et donner son nombre de diviseurs. (3 pts)

:::corrige
1. $221 = 13 \times 17$ : non.
2. $504 = 2^3 \times 3^2 \times 7$ : $4 \times 3 \times 2 = 24$ diviseurs.
:::
:::

:::exercice Exercice 3 (8 points) : PGCD et PPCM
1. Calculer $504 \wedge 360$ et $504 \vee 360$. (4 pts)
2. Simplifier $\frac{360}{504}$. (2 pts)
3. Deux bus partent ensemble ; l’un repasse toutes les $12$ minutes, l’autre toutes les $15$. Dans combien de temps repartiront-ils ensemble ? (2 pts)

:::corrige
1. $360 = 2^3 \times 3^2 \times 5$ : $504 \wedge 360 = 2^3 \times 3^2 = 72$, $504 \vee 360 = 2^3 \times 3^2 \times 5 \times 7 = 2\,520$.
2. $\frac{360}{504} = \frac{5}{7}$.
3. $12 \vee 15 = 60$ minutes.
:::
:::
