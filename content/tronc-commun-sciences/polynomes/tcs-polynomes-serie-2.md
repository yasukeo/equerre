---
title: Série 1 — partie 2 : division par x − a et factorisation
kind: serie
summary: Factoriser un polynôme de degré 3 à partir de ses racines, division posée, reste de la division, signe d’un polynôme et inéquation, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Factoriser
Soit $P(x) = x^3 - 3x^2 + 4$.

1. Vérifier que $2$ est racine de $P$ et déterminer $Q$ tel que $P(x) = (x - 2)Q(x)$.
2. Factoriser complètement $P(x)$.

:::corrige
1. $P(2) = 0$. Par identification, $P(x) = (x - 2)(x^2 + bx + c)$ avec $b - 2 = -3$ et $-2c = 4$ : $b = -1$, $c = -2$, et on vérifie le coefficient de $x$ : $c - 2b = 0$. Donc $Q(x) = x^2 - x - 2$.
2. $x^2 - x - 2 = (x - 2)(x + 1)$, donc $P(x) = (x - 2)^2(x + 1)$.
:::
:::

:::exercice Division posée
Soit $P(x) = 2x^3 + x^2 - 13x + 6$.

1. Vérifier que $P(2) = 0$.
2. Effectuer la division de $P(x)$ par $x - 2$.
3. En déduire les racines de $P$.

:::corrige
1. $16 + 4 - 26 + 6 = 0$.
2. On obtient $2x^2$, puis $5x$, puis $-3$, avec un reste nul : $P(x) = (x - 2)(2x^2 + 5x - 3)$.
3. $2x^2 + 5x - 3 = (2x - 1)(x + 3)$ : les racines sont $2$, $\frac{1}{2}$ et $-3$.
:::
:::

:::exercice Reste et paramètre
1. Quel est le reste de la division de $x^4 - 3x + 5$ par $x + 1$ ?
2. Déterminer $m$ pour que $x^3 + mx - 2$ soit divisible par $x + 2$.

:::corrige
1. Le reste vaut $P(-1) = 1 + 3 + 5 = 9$.
2. Il faut $P(-2) = 0$ : $-8 - 2m - 2 = 0$, donc $m = -5$.
:::
:::

:::exercice Signe et inéquation
Soit $P(x) = x^3 - 2x^2 - 5x + 6$.

1. Montrer que $P(x) = (x - 1)(x - 3)(x + 2)$.
2. Résoudre $P(x) \geq 0$, puis $P(x) < 0$.

:::corrige
1. $(x - 1)(x - 3) = x^2 - 4x + 3$, puis $(x^2 - 4x + 3)(x + 2) = x^3 - 2x^2 - 5x + 6$.
2. Les racines sont $-2$, $1$, $3$ ; $P$ est négatif avant $-2$, positif entre $-2$ et $1$, négatif entre $1$ et $3$, positif après $3$. $P(x) \geq 0 \iff x \in [-2 ; 1] \cup [3 ; +\infty[$, et $P(x) < 0 \iff x \in ]-\infty ; -2[ \cup ]1 ; 3[$.
:::
:::
