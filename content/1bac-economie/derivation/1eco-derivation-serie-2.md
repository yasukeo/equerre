---
title: Série 1 — partie 2 : fonction dérivée et variations
kind: serie
summary: Calculs de dérivées avec les formules, sens de variation et extremums, recherche d’un paramètre, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Calculs de dérivées
Calculer la dérivée de chaque fonction sur l’intervalle indiqué.

1. $f(x) = x^4 - 3x^2 + \dfrac{2}{x}$ sur $]0 ; +\infty[$
2. $g(x) = (2x - 1)\sqrt{x}$ sur $]0 ; +\infty[$
3. $h(x) = \dfrac{x^2}{x^2 + 1}$ sur $\mathbb{R}$
4. $k(x) = \sqrt{x^2 + 2x + 5}$ sur $\mathbb{R}$

:::corrige
1. $f'(x) = 4x^3 - 6x - \frac{2}{x^2}$.
2. $g'(x) = 2\sqrt{x} + \frac{2x - 1}{2\sqrt{x}} = \frac{4x + 2x - 1}{2\sqrt{x}} = \frac{6x - 1}{2\sqrt{x}}$.
3. $h'(x) = \frac{2x(x^2 + 1) - 2x \cdot x^2}{(x^2 + 1)^2} = \frac{2x}{(x^2 + 1)^2}$.
4. $x^2 + 2x + 5 = (x + 1)^2 + 4 > 0$, donc $k'(x) = \frac{2x + 2}{2\sqrt{x^2 + 2x + 5}} = \frac{x + 1}{\sqrt{x^2 + 2x + 5}}$.
:::
:::

:::exercice Variations
Étudier les variations de chaque fonction et donner ses extremums.

1. $f(x) = 2x^3 - 9x^2 + 12x$ sur $\mathbb{R}$
2. $g(x) = \dfrac{x^2 + 4}{x}$ sur $]0 ; +\infty[$

:::corrige
1. $f'(x) = 6x^2 - 18x + 12 = 6(x - 1)(x - 2)$ : croissante jusqu’à $f(1) = 5$ (max local), décroissante jusqu’à $f(2) = 4$ (min local), puis croissante.
2. $g'(x) = 1 - \frac{4}{x^2} = \frac{(x - 2)(x + 2)}{x^2}$ : décroissante sur $]0 ; 2]$, croissante ensuite ; minimum $g(2) = 4$.
:::
:::

:::exercice Une inégalité
Montrer, en étudiant $f(x) = x^3 - 3x + 2$ sur $[0 ; +\infty[$, que $x^3 + 2 \geq 3x$ pour tout $x \geq 0$.

:::corrige
$f'(x) = 3(x - 1)(x + 1)$ : sur $[0 ; +\infty[$, $f$ décroît sur $[0 ; 1]$ et croît ensuite, minimum $f(1) = 0$. Donc $f(x) \geq 0$, soit $x^3 + 2 \geq 3x$.
:::
:::

:::exercice Déterminer un paramètre
Soit $f(x) = ax^2 + bx + 1$. Déterminer $a$ et $b$ pour que la courbe de $f$ admette au point d’abscisse $1$ une tangente d’équation $y = 3x - 1$.

:::corrige
Il faut $f(1) = 2$ et $f'(1) = 3$ : $a + b + 1 = 2$ et $2a + b = 3$. Donc $a = 2$ et $b = -1$.
:::
:::
