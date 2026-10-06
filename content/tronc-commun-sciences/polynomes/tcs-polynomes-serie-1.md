---
title: Série 1 — partie 1 : définitions et opérations
kind: serie
summary: Degré d’un polynôme après développement, identification de coefficients, somme et produit, recherche de racines et racine imposée, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Degré
Développer et donner le degré de :

1. $P(x) = (x^2 + 1)(2x - 3) - 2x^3$
2. $Q(x) = (x + 1)^3 - x^3$
3. $R(x) = (x^2 + x)(x^3 - 1) - x^5$

:::corrige
1. $2x^3 - 3x^2 + 2x - 3 - 2x^3 = -3x^2 + 2x - 3$ : degré $2$.
2. $x^3 + 3x^2 + 3x + 1 - x^3 = 3x^2 + 3x + 1$ : degré $2$.
3. $x^5 + x^4 - x^2 - x - x^5 = x^4 - x^2 - x$ : degré $4$.
:::
:::

:::exercice Identification
Déterminer les réels $a$, $b$, $c$ tels que, pour tout réel $x$ :

$$
(x - 2)(ax^2 + bx + c) = 2x^3 - 5x^2 + x + 2
$$

:::corrige
Le membre de gauche vaut $ax^3 + (b - 2a)x^2 + (c - 2b)x - 2c$. On identifie : $a = 2$ ; $b - 4 = -5$, donc $b = -1$ ; $c + 2 = 1$, donc $c = -1$ ; et on vérifie $-2c = 2$.
:::
:::

:::exercice Somme et produit
Soit $P(x) = x^2 - 3x + 1$ et $Q(x) = 2x + 4$.

1. Calculer $P(x) + Q(x)$ et $P(x) - Q(x)$.
2. Calculer $P(x)Q(x)$ et vérifier son degré.

:::corrige
1. $x^2 - x + 5$ et $x^2 - 5x - 3$.
2. $2x^3 - 2x^2 - 10x + 4$ : degré $3 = 2 + 1$.
:::
:::

:::exercice Racines
1. Les nombres $2$ et $-1$ sont-ils racines de $P(x) = x^3 - 3x^2 + 4$ ? Et $1$ ?
2. Déterminer $m$ pour que $1$ soit racine de $Q(x) = x^3 + mx^2 - 4x + 1$.

:::corrige
1. $P(2) = 8 - 12 + 4 = 0$ et $P(-1) = -1 - 3 + 4 = 0$ : oui. $P(1) = 1 - 3 + 4 = 2 \neq 0$ : non.
2. $Q(1) = 1 + m - 4 + 1 = m - 2 = 0$ : $m = 2$.
:::
:::
