---
title: Devoir surveillé : fonctions exponentielles
kind: devoir
summary: Un devoir d’une heure sur 20 points : règles de calcul, équations, étude de (x + 1)eˣ, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (5 points) : calculs
Simplifier $A = e^3 \times e^{-5}$, $B = \dfrac{e^{2x + 1}}{e^{x}}$ et $C = e^{\ln 3} \times e^{-\ln 3}$.

:::corrige
$A = e^{-2}$, $B = e^{x + 1}$, $C = 3 \times \frac{1}{3} = 1$.
:::
:::

:::exercice Exercice 2 (6 points) : équations et inéquations
Résoudre :

1. $e^{4x - 2} = 1$ (2 pts)
2. $e^x = 6$ (1 pt)
3. $e^{x + 1} \leq e^{3 - x}$ (3 pts)

:::corrige
1. $4x - 2 = 0 \iff x = \frac{1}{2}$.
2. $x = \ln 6$.
3. $x + 1 \leq 3 - x \iff x \leq 1$.
:::
:::

:::exercice Exercice 3 (9 points) : étude d’une fonction
Soit $f(x) = (x + 1)e^x$ sur $\mathbb{R}$.

1. Calculer $\lim_{x \to +\infty} f(x)$ et $\lim_{x \to -\infty} f(x)$. (3 pts)
2. Montrer que $f'(x) = (x + 2)e^x$. (2 pts)
3. Dresser le tableau de variations de $f$. (3 pts)
4. Résoudre $f(x) = 0$. (1 pt)

:::corrige
1. En $+\infty$ : $+\infty$. En $-\infty$ : $f(x) = xe^x + e^x \to 0$.
2. $f'(x) = e^x + (x + 1)e^x = (x + 2)e^x$.
3. $f$ décroît sur $]-\infty ; -2]$ et croît sur $[-2 ; +\infty[$ ; minimum $f(-2) = -e^{-2}$.
4. $e^x > 0$, donc $f(x) = 0 \iff x = -1$.
:::
:::
