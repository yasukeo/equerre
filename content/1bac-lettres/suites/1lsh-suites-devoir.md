---
title: Devoir surveillé : suites numériques
kind: devoir
summary: Un devoir d’une heure sur 20 points : suite arithmétique, suite géométrique et suite auxiliaire, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice autorisée pour les arrondis.

:::exercice Exercice 1 (6 points) : suite arithmétique
$(u_n)$ est arithmétique de premier terme $u_0 = -3$ et de raison $5$.

1. Exprimer $u_n$ en fonction de $n$ et calculer $u_{12}$. (2 pts)
2. Pour quel $n$ a-t-on $u_n = 97$ ? (2 pts)
3. Calculer $u_0 + u_1 + \cdots + u_{12}$. (2 pts)

:::corrige
1. $u_n = -3 + 5n$ et $u_{12} = 57$.
2. $-3 + 5n = 97 \iff n = 20$.
3. $13$ termes : $13 \times \frac{-3 + 57}{2} = 351$.
:::
:::

:::exercice Exercice 2 (6 points) : suite géométrique
$(v_n)$ est géométrique de premier terme $v_0 = 2$ et de raison $3$.

1. Exprimer $v_n$ et calculer $v_4$. (2 pts)
2. La suite est-elle croissante ? (2 pts)
3. Calculer $v_0 + v_1 + \cdots + v_5$. (2 pts)

:::corrige
1. $v_n = 2 \times 3^n$ et $v_4 = 162$.
2. $v_0 > 0$ et $3 > 1$ : elle est croissante.
3. $2 \times \frac{1 - 3^6}{1 - 3} = 3^6 - 1 = 728$.
:::
:::

:::exercice Exercice 3 (8 points) : suite auxiliaire
Soit $u_0 = 3$ et $u_{n + 1} = 2u_n - 1$. On pose $w_n = u_n - 1$.

1. Calculer $u_1$, $u_2$, $u_3$. (2 pts)
2. Montrer que $(w_n)$ est géométrique ; préciser sa raison et son premier terme. (3 pts)
3. Exprimer $u_n$ en fonction de $n$ et calculer $u_{10}$. (3 pts)

:::corrige
1. $u_1 = 5$, $u_2 = 9$, $u_3 = 17$.
2. $w_{n + 1} = u_{n + 1} - 1 = 2u_n - 2 = 2(u_n - 1) = 2w_n$ : raison $2$, $w_0 = 2$.
3. $w_n = 2 \times 2^n = 2^{n + 1}$, donc $u_n = 1 + 2^{n + 1}$, et $u_{10} = 1 + 2^{11} = 2\,049$.
:::
:::
