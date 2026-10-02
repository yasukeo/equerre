---
title: Devoir surveillé : les suites numériques
kind: devoir
summary: Un devoir d’une heure sur 20 points : sens de variation, suite arithmétique et somme, suite auxiliaire géométrique, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (5 points) : sens de variation
Étudier le sens de variation de $u_n = \dfrac{2n + 3}{n + 1}$ et de $v_n = \dfrac{4^n}{3^n}$.

:::corrige
$u_n = 2 + \frac{1}{n + 1}$ : décroissante. $v_n = \left(\frac{4}{3}\right)^n > 0$ et $\frac{v_{n + 1}}{v_n} = \frac{4}{3} > 1$ : croissante.
:::
:::

:::exercice Exercice 2 (6 points) : suite arithmétique
$(u_n)$ est arithmétique de raison $-2$ et $u_4 = 10$.

1. Calculer $u_0$ et exprimer $u_n$. (2 pts)
2. Pour quel $n$ a-t-on $u_n = -30$ ? (2 pts)
3. Calculer $u_0 + u_1 + \cdots + u_{20}$. (2 pts)

:::corrige
1. $u_0 = 10 + 8 = 18$, $u_n = 18 - 2n$.
2. $18 - 2n = -30 \iff n = 24$.
3. $21$ termes, $u_{20} = -22$ : $21 \times \frac{18 - 22}{2} = -42$.
:::
:::

:::exercice Exercice 3 (9 points) : suite auxiliaire
Soit $u_0 = 1$ et $u_{n + 1} = 2u_n + 3$.

1. Calculer $u_1$, $u_2$, $u_3$. (1,5 pt)
2. On pose $v_n = u_n + 3$. Montrer que $(v_n)$ est géométrique. (3 pts)
3. Exprimer $u_n$ en fonction de $n$. (2 pts)
4. Calculer $u_0 + u_1 + \cdots + u_n$. (2,5 pts)

:::corrige
1. $u_1 = 5$, $u_2 = 13$, $u_3 = 29$.
2. $v_{n + 1} = 2u_n + 6 = 2(u_n + 3) = 2v_n$ : raison $2$, $v_0 = 4$.
3. $v_n = 4 \times 2^n = 2^{n + 2}$, donc $u_n = 2^{n + 2} - 3$.
4. $\sum v_k = 4(2^{n + 1} - 1)$, donc $\sum u_k = 4(2^{n + 1} - 1) - 3(n + 1) = 2^{n + 3} - 3n - 7$.
:::
:::
