---
title: Série 1 — partie 2 : équations, inéquations et applications
kind: serie
summary: Équations et inéquations avec log, plus petit exposant vérifiant une condition, nombre de chiffres d’une puissance, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Équations
Résoudre :

1. $\log(x + 2) = 1$
2. $\log(2x - 1) = \log(x + 3)$
3. $\log x + \log(x - 3) = 1$
4. $(\log x)^2 - 3\log x + 2 = 0$

:::corrige
1. Domaine $x > -2$ ; $x + 2 = 10$, $x = 8$.
2. Domaine $x > \frac{1}{2}$ ; $x = 4$.
3. Domaine $x > 3$ ; $x^2 - 3x - 10 = 0$, $x = 5$ ($-2$ est refusé).
4. Domaine $x > 0$ ; avec $X = \log x$ : $X^2 - 3X + 2 = 0$, $X = 1$ ou $X = 2$, donc $x = 10$ ou $x = 100$.
:::
:::

:::exercice Inéquations
Résoudre :

1. $\log(x - 1) \leq 1$
2. $\log(3 - x) > \log(x + 1)$
3. $\log x \geq -2$

:::corrige
1. Domaine $x > 1$ ; $x - 1 \leq 10$ : $S = ]1 ; 11]$.
2. Domaine $-1 < x < 3$ ; $3 - x > x + 1 \iff x < 1$ : $S = ]-1 ; 1[$.
3. $\log x \geq \log 0{,}01 \iff x \geq 0{,}01$ : $S = [0{,}01 ; +\infty[$.
:::
:::

:::exercice Trouver un exposant
Déterminer le plus petit entier $n$ tel que :

1. $2^n \geq 1\,000$
2. $0{,}9^n \leq 0{,}5$
3. $1{,}08^n \geq 2$

:::corrige
1. $n \geq \frac{3}{\log 2} \approx 9{,}97$ : $n = 10$.
2. $\log 0{,}9 < 0$, donc $n \geq \frac{\log 0{,}5}{\log 0{,}9} \approx 6{,}58$ : $n = 7$.
3. $n \geq \frac{\log 2}{\log 1{,}08} \approx 9{,}01$ : $n = 10$. En effet $1{,}08^9 \approx 1{,}999$ et $1{,}08^{10} \approx 2{,}159$.
:::
:::

:::exercice Nombre de chiffres
Combien de chiffres ont $2^{100}$, $5^{20}$ et $3^{50}$ ? On prendra $\log 2 \approx 0{,}30103$, $\log 3 \approx 0{,}47712$ et $\log 5 \approx 0{,}69897$.

:::corrige
- $100\log 2 \approx 30{,}10$ : $31$ chiffres.
- $20\log 5 \approx 13{,}98$ : $14$ chiffres.
- $50\log 3 \approx 23{,}86$ : $24$ chiffres.
:::
:::
