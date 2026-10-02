---
title: Devoir surveillé : arithmétique dans ℤ
kind: devoir
summary: Un devoir d’une heure sur 20 points : congruences et restes, algorithme d’Euclide et Bézout, une équation ax + by = c, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice non autorisée.

:::exercice Exercice 1 (6 points) : congruences
1. Déterminer le reste de la division de $3^{2026}$ par $5$. (2 pts)
2. Montrer que pour tout entier naturel $n$, $5^{2n} - 3^n$ est divisible par $11$. (2 pts)
3. Déterminer les entiers $n$ tels que $n^2 + n + 1 \equiv 0 \ [3]$. (2 pts)

:::corrige
1. $3^4 = 81 \equiv 1 \ [5]$ ; $2026 = 4 \times 506 + 2$, donc $3^{2026} \equiv 9 \equiv 4 \ [5]$.
2. $5^{2n} = 25^n$ et $25 \equiv 3 \ [11]$, donc $25^n - 3^n \equiv 0 \ [11]$.
3. Modulo $3$ : $n \equiv 0$ donne $1$ ; $n \equiv 1$ donne $3 \equiv 0$ ; $n \equiv 2$ donne $7 \equiv 1$. Les solutions sont les $n \equiv 1 \ [3]$.
:::
:::

:::exercice Exercice 2 (6 points) : Euclide et Bézout
1. Calculer $126 \wedge 35$ par l’algorithme d’Euclide. (2 pts)
2. En déduire des entiers $u$ et $v$ tels que $126u + 35v = 126 \wedge 35$. (2 pts)
3. Calculer $126 \vee 35$. (2 pts)

:::corrige
1. $126 = 35 \times 3 + 21$ ; $35 = 21 \times 1 + 14$ ; $21 = 14 \times 1 + 7$ ; $14 = 7 \times 2$. Donc $126 \wedge 35 = 7$.
2. $7 = 21 - 14 = 21 - (35 - 21) = 2 \times 21 - 35 = 2(126 - 3 \times 35) - 35 = 2 \times 126 - 7 \times 35$ : $u = 2$, $v = -7$.
3. $\frac{126 \times 35}{7} = 630$.
:::
:::

:::exercice Exercice 3 (8 points) : une équation
On considère $(E) : 9x + 4y = 2$.

1. Justifier que $(E)$ a des solutions entières. (1 pt)
2. Vérifier que $(2 ; -4)$ est une solution. (1 pt)
3. Résoudre $(E)$ dans $\mathbb{Z}^2$. (4 pts)
4. Déterminer la solution telle que $x$ soit compris entre $10$ et $15$. (2 pts)

:::corrige
1. $9 \wedge 4 = 1$ divise $2$.
2. $18 - 16 = 2$.
3. $9(x - 2) = -4(y + 4)$ ; $9 \wedge 4 = 1$, donc $4 \mid x - 2$ : $x = 2 + 4k$, et $9 \times 4k = -4(y + 4)$ donne $y = -4 - 9k$, $k \in \mathbb{Z}$.
4. $10 \leq 2 + 4k \leq 15 \iff 2 \leq k \leq \frac{13}{4}$, donc $k = 2$ ou $k = 3$ : $(10 ; -22)$ et $(14 ; -31)$.
:::
:::
