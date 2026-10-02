---
title: Série 1 — partie 2 : variations et étude d’une fonction
kind: serie
summary: Sens de variation par le signe de la dérivée, extremums, limites et asymptotes, étude complète d’un polynôme et d’une fonction rationnelle, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Variations
Étudier le sens de variation de chaque fonction et donner ses extremums.

1. $f(x) = -x^2 + 6x - 4$ sur $\mathbb{R}$
2. $g(x) = x^3 - 12x$ sur $\mathbb{R}$

:::corrige
1. $f'(x) = -2x + 6$ : $f$ croît sur $]-\infty ; 3]$ et décroît ensuite ; maximum $f(3) = 5$.
2. $g'(x) = 3x^2 - 12 = 3(x - 2)(x + 2)$ : $g$ croît sur $]-\infty ; -2]$, décroît sur $[-2 ; 2]$, croît sur $[2 ; +\infty[$ ; maximum local $g(-2) = 16$, minimum local $g(2) = -16$.
:::
:::

:::exercice Limites et asymptotes
Soit $f(x) = \dfrac{x + 3}{x - 1}$ sur $]1 ; +\infty[$.

1. Calculer $\lim_{x \to +\infty} f(x)$ et $\lim_{x \to 1^+} f(x)$.
2. En déduire les asymptotes de la courbe.

:::corrige
1. En $+\infty$ : $\frac{x}{x} = 1$, donc la limite vaut $1$. Quand $x \to 1^+$ : le numérateur tend vers $4$ et le dénominateur vers $0^+$, donc $f(x) \to +\infty$.
2. Asymptote horizontale $y = 1$ et asymptote verticale $x = 1$.
:::
:::

:::exercice Étude d’un polynôme
Soit $f(x) = x^3 - 3x + 1$ sur $\mathbb{R}$.

1. Calculer les limites de $f$ en $-\infty$ et en $+\infty$.
2. Calculer $f'(x)$ et dresser le tableau de variations.
3. Donner l’équation de la tangente au point d’abscisse $0$.

:::corrige
1. $-\infty$ en $-\infty$ et $+\infty$ en $+\infty$.
2. $f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$ : $f$ croît jusqu’à $f(-1) = 3$, décroît jusqu’à $f(1) = -1$, puis croît.
3. $f(0) = 1$, $f'(0) = -3$ : $y = -3x + 1$.
:::
:::

:::exercice Étude d’une fonction rationnelle
Soit $g(x) = \dfrac{2x}{x + 1}$ sur $]-1 ; +\infty[$.

1. Calculer les limites de $g$ en $-1^+$ et en $+\infty$.
2. Montrer que $g'(x) = \dfrac{2}{(x + 1)^2}$ et en déduire le sens de variation de $g$.
3. Résoudre $g(x) = 1$.

:::corrige
1. En $-1^+$ : le numérateur tend vers $-2$, le dénominateur vers $0^+$, donc $g(x) \to -\infty$. En $+\infty$ : $\frac{2x}{x} = 2$.
2. $g'(x) = \frac{2(x + 1) - 2x}{(x + 1)^2} = \frac{2}{(x + 1)^2} > 0$ : $g$ est strictement croissante.
3. $2x = x + 1 \iff x = 1$.
:::
:::
