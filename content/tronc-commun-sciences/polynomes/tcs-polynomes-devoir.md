---
title: Devoir surveillé : les polynômes
kind: devoir
summary: Un devoir d’une heure sur 20 points : racine et division, identification et factorisation, signe et inéquation, reste et paramètre, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : division
Soit $P(x) = 2x^3 - 3x^2 - 11x + 6$.

1. Vérifier que $3$ est racine de $P$. (2 pts)
2. Déterminer le polynôme $Q$ tel que $P(x) = (x - 3)Q(x)$. (2 pts)
3. Donner toutes les racines de $P$. (2 pts)

:::corrige
1. $P(3) = 54 - 27 - 33 + 6 = 0$.
2. $Q(x) = 2x^2 + 3x - 2$ ; vérification : $(x - 3)(2x^2 + 3x - 2) = 2x^3 - 3x^2 - 11x + 6$.
3. $2x^2 + 3x - 2 = (2x - 1)(x + 2)$ : les racines sont $3$, $\frac{1}{2}$ et $-2$.
:::
:::

:::exercice Exercice 2 (8 points) : factorisation et signe
Soit $P(x) = x^3 - 7x + 6$.

1. Déterminer $a$, $b$, $c$ tels que $P(x) = (x - 1)(ax^2 + bx + c)$. (3 pts)
2. Factoriser complètement $P(x)$. (2 pts)
3. Résoudre $P(x) \leq 0$. (3 pts)

:::corrige
1. $(x - 1)(ax^2 + bx + c) = ax^3 + (b - a)x^2 + (c - b)x - c$ : $a = 1$, $b - a = 0$ donc $b = 1$, $-c = 6$ donc $c = -6$ (et $c - b = -7$).
2. $x^2 + x - 6 = (x - 2)(x + 3)$, donc $P(x) = (x - 1)(x - 2)(x + 3)$.
3. Racines $-3$, $1$, $2$ ; $P$ est négatif avant $-3$, positif entre $-3$ et $1$, négatif entre $1$ et $2$, positif après $2$. $S = ]-\infty ; -3] \cup [1 ; 2]$.
:::
:::

:::exercice Exercice 3 (6 points) : reste et degré
1. Quel est le reste de la division de $x^5 - 2x + 3$ par $x - 1$ ? (2 pts)
2. Déterminer $m$ pour que $x^3 + mx^2 + 4$ soit divisible par $x + 1$. (2 pts)
3. Quel est le degré de $(x^3 + 2x)(x^2 - 1) - x^5$ ? (2 pts)

:::corrige
1. $1 - 2 + 3 = 2$.
2. $-1 + m + 4 = 0$, donc $m = -3$.
3. $x^5 - x^3 + 2x^3 - 2x - x^5 = x^3 - 2x$ : degré $3$.
:::
:::
