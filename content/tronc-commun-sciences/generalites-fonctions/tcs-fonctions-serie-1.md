---
title: Série 1 — partie 1 : définition, parité, variations
kind: serie
summary: Ensembles de définition, parité, sens de variation par le taux de variation et extremum, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Ensembles de définition
Déterminer l’ensemble de définition de :

1. $f_1(x) = \dfrac{3x - 1}{x^2 - 5x + 6}$
2. $f_2(x) = \sqrt{4 - x^2}$
3. $f_3(x) = \dfrac{1}{\sqrt{x + 2}}$
4. $f_4(x) = \dfrac{\sqrt{x}}{x^2 - 1}$

:::corrige
1. $x^2 - 5x + 6 = (x - 2)(x - 3)$ : $\mathbb{R} \setminus \{2 ; 3\}$.
2. $4 - x^2 \geq 0 \iff -2 \leq x \leq 2$ : $[-2 ; 2]$.
3. $x + 2 > 0$ : $]-2 ; +\infty[$.
4. $x \geq 0$ et $x \neq 1$ : $[0 ; 1[ \cup ]1 ; +\infty[$.
:::
:::

:::exercice Parité
Étudier la parité de :

1. $f(x) = x^3 - 3x$
2. $g(x) = \dfrac{x^2 + 1}{|x|}$
3. $h(x) = \sqrt{x}$
4. $k(x) = x^2 + x$

:::corrige
1. Définie sur $\mathbb{R}$ ; $f(-x) = -x^3 + 3x = -f(x)$ : impaire.
2. Définie sur $\mathbb{R}^*$, symétrique ; $g(-x) = \frac{x^2 + 1}{|x|} = g(x)$ : paire.
3. $D_h = [0 ; +\infty[$ n’est pas symétrique : ni paire ni impaire.
4. $k(1) = 2$ et $k(-1) = 0$ : ni paire ni impaire.
:::
:::

:::exercice Taux de variation
Soit $f(x) = -x^2 + 2x$.

1. Montrer que le taux de variation entre $x_1$ et $x_2$ vaut $T = 2 - (x_1 + x_2)$.
2. En déduire les variations de $f$ sur $]-\infty ; 1]$ et sur $[1 ; +\infty[$.
3. En déduire le maximum de $f$.

:::corrige
1. $f(x_1) - f(x_2) = -(x_1^2 - x_2^2) + 2(x_1 - x_2) = (x_1 - x_2)(2 - x_1 - x_2)$.
2. Sur $]-\infty ; 1]$, $x_1 + x_2 < 2$ pour $x_1 \neq x_2$, donc $T > 0$ : croissante. Sur $[1 ; +\infty[$, $T < 0$ : décroissante.
3. Le maximum est $f(1) = 1$.
:::
:::

:::exercice Une fonction rationnelle
Soit $g(x) = \dfrac{x + 2}{x + 1}$ sur $]-1 ; +\infty[$.

1. Montrer que $g(x) = 1 + \dfrac{1}{x + 1}$.
2. Calculer le taux de variation de $g$ et en déduire son sens de variation.
3. Montrer que $g(x) > 1$ pour tout $x > -1$.

:::corrige
1. $\frac{x + 2}{x + 1} = \frac{(x + 1) + 1}{x + 1} = 1 + \frac{1}{x + 1}$.
2. $g(x_1) - g(x_2) = \frac{1}{x_1 + 1} - \frac{1}{x_2 + 1} = \frac{x_2 - x_1}{(x_1 + 1)(x_2 + 1)}$, donc $T = \frac{-1}{(x_1 + 1)(x_2 + 1)} < 0$ : $g$ est strictement décroissante.
3. $x + 1 > 0$, donc $\frac{1}{x + 1} > 0$ et $g(x) > 1$.
:::
:::
