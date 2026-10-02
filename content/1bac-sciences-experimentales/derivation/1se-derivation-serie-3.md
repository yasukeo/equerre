---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets : dérivabilité d’une fonction définie par morceaux avec ses demi-tangentes, puis variations, tangente et nombre de solutions d’une équation, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : une fonction définie par morceaux
Soit $f$ définie sur $\mathbb{R}$ par $f(x) = x^2 + x$ si $x \leq 0$ et $f(x) = x - \sqrt{x}$ si $x > 0$.

1. Montrer que $f$ est continue en $0$.
2. Étudier la dérivabilité de $f$ à gauche et à droite en $0$, et interpréter graphiquement.
3. Calculer $f'(x)$ sur $]-\infty ; 0[$ et sur $]0 ; +\infty[$.

:::corrige
1. $f(0) = 0$, et $\lim_{x \to 0^+} (x - \sqrt{x}) = 0$.
2. À gauche : $\frac{x^2 + x}{x} = x + 1 \to 1$, donc $f'_g(0) = 1$. À droite : $\frac{x - \sqrt{x}}{x} = 1 - \frac{1}{\sqrt{x}} \to -\infty$ : non dérivable à droite, demi-tangente verticale. À gauche, demi-tangente de coefficient directeur $1$.
3. Sur $]-\infty ; 0[$ : $f'(x) = 2x + 1$. Sur $]0 ; +\infty[$ : $f'(x) = 1 - \frac{1}{2\sqrt{x}}$.
:::
:::

:::exercice Problème 2 : variations et équation
Soit $f(x) = x^3 - 6x^2 + 9x - 2$.

1. Calculer $f'(x)$ et dresser le tableau de variations de $f$.
2. Donner l’équation de la tangente au point d’abscisse $2$.
3. Combien de solutions l’équation $f(x) = 0$ a-t-elle ? (On donne $f(0) = -2$ et $f(4) = 2$.)

:::corrige
1. $f'(x) = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$ : croissante jusqu’à $f(1) = 2$, décroissante jusqu’à $f(3) = -2$, puis croissante.
2. $f(2) = 0$, $f'(2) = -3$ : $y = -3(x - 2) = -3x + 6$.
3. Sur $]-\infty ; 1]$, $f$ croît de $-\infty$ à $2$ : une solution (dans $]0 ; 1[$). Sur $[1 ; 3]$, elle décroît de $2$ à $-2$ : une solution, qui est $2$. Sur $[3 ; +\infty[$, elle croît de $-2$ à $+\infty$ : une solution (dans $]3 ; 4[$). Trois solutions.
:::
:::
