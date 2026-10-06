---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : l’étude complète d’un trinôme par sa forme canonique, puis une fonction homographique, ses asymptotes et ses intersections avec deux droites, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un trinôme
Soit $f(x) = -2x^2 + 4x + 6$.

1. Écrire $f(x)$ sous forme canonique, et en déduire le sommet de la parabole.
2. Étudier les variations de $f$ à l’aide du taux de variation.
3. Factoriser $f(x)$ et donner les points d’intersection de la parabole avec l’axe des abscisses.
4. Résoudre $f(x) \geq 6$.

:::corrige
1. $f(x) = -2(x^2 - 2x) + 6 = -2(x - 1)^2 + 2 + 6 = -2(x - 1)^2 + 8$ : sommet $(1 ; 8)$.
2. $T = -2(x_1 + x_2) + 4 = -2(x_1 + x_2 - 2)$ : positif si $x_1, x_2 \leq 1$, négatif si $x_1, x_2 \geq 1$. $f$ croît sur $]-\infty ; 1]$ et décroît sur $[1 ; +\infty[$.
3. $f(x) = -2(x^2 - 2x - 3) = -2(x - 3)(x + 1)$ : points $(-1 ; 0)$ et $(3 ; 0)$.
4. $-2x^2 + 4x \geq 0 \iff -2x(x - 2) \geq 0 \iff x \in [0 ; 2]$.
:::
:::

:::exercice Problème 2 : une fonction homographique
Soit $h(x) = \dfrac{2x - 1}{x + 1}$.

1. Montrer que $h(x) = 2 - \dfrac{3}{x + 1}$, et en déduire le centre et les asymptotes de la courbe.
2. Donner les variations de $h$.
3. Résoudre $h(x) = 1$.
4. Montrer que la courbe de $h$ ne coupe pas la droite $y = x$.

:::corrige
1. $\frac{2x - 1}{x + 1} = \frac{2(x + 1) - 3}{x + 1} = 2 - \frac{3}{x + 1}$. Centre $(-1 ; 2)$, asymptotes $x = -1$ et $y = 2$.
2. $k = -3 < 0$ : $h$ est croissante sur $]-\infty ; -1[$ et sur $]-1 ; +\infty[$.
3. $2x - 1 = x + 1 \iff x = 2$.
4. $\frac{2x - 1}{x + 1} = x \iff 2x - 1 = x^2 + x \iff x^2 - x + 1 = 0$, de discriminant $-3 < 0$ : pas de solution.
:::
:::
