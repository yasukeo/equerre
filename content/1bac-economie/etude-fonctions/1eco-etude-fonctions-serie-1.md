---
title: Série 1 — partie 1 : branches infinies, concavité, symétries
kind: serie
summary: Asymptotes et position relative, branches paraboliques, points d’inflexion, axes et centres de symétrie, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Asymptotes
Soit $f(x) = \dfrac{2x^2 + 3x}{x + 1}$ sur $\mathbb{R} \setminus \{-1\}$.

1. Déterminer les réels $a$, $b$, $c$ tels que $f(x) = ax + b + \dfrac{c}{x + 1}$.
2. En déduire les asymptotes de la courbe et la position par rapport à l’asymptote oblique.

:::corrige
1. $2x^2 + 3x = (x + 1)(2x + 1) - 1$, donc $f(x) = 2x + 1 - \frac{1}{x + 1}$.
2. Asymptote oblique $y = 2x + 1$ en $\pm\infty$ ; asymptote verticale $x = -1$ (le numérateur tend vers $-1 \neq 0$). $f(x) - (2x + 1) = -\frac{1}{x + 1}$ : la courbe est au-dessous pour $x > -1$, au-dessus pour $x < -1$.
:::
:::

:::exercice Branches paraboliques
Étudier la branche infinie en $+\infty$ de chaque courbe.

1. $f(x) = x^2 - 3x$
2. $g(x) = \sqrt{x + 1}$
3. $h(x) = 2x - \sqrt{x}$

:::corrige
1. $\frac{f(x)}{x} = x - 3 \to +\infty$ : direction l’axe des ordonnées.
2. $\frac{g(x)}{x} = \frac{\sqrt{x + 1}}{x} \to 0$ : direction l’axe des abscisses.
3. $\frac{h(x)}{x} \to 2$ et $h(x) - 2x = -\sqrt{x} \to -\infty$ : direction la droite $y = 2x$.
:::
:::

:::exercice Point d’inflexion
Soit $f(x) = x^3 + 3x^2 - 1$. Étudier la concavité de la courbe et déterminer son point d’inflexion, puis la tangente en ce point.

:::corrige
$f'(x) = 3x^2 + 6x$, $f''(x) = 6x + 6$ : concave sur $]-\infty ; -1]$, convexe sur $[-1 ; +\infty[$. Point d’inflexion $I(-1 ; 1)$. $f'(-1) = -3$ : tangente $y = -3(x + 1) + 1 = -3x - 2$.
:::
:::

:::exercice Symétries
1. Montrer que $\Omega(-1 ; 1)$ est un centre de symétrie de la courbe de $f(x) = \dfrac{x + 2}{x + 1}$.
2. Montrer que la droite $x = 2$ est un axe de symétrie de la courbe de $g(x) = \sqrt{x^2 - 4x + 5}$.

:::corrige
1. $f(x) = 1 + \frac{1}{x + 1}$ ; $f(-2 - x) = 1 + \frac{1}{-1 - x} = 1 - \frac{1}{x + 1}$, donc $f(-2 - x) + f(x) = 2 = 2 \times 1$.
2. $x^2 - 4x + 5 = (x - 2)^2 + 1 > 0$ : $g$ est définie sur $\mathbb{R}$. $(4 - x)^2 - 4(4 - x) + 5 = 16 - 8x + x^2 - 16 + 4x + 5 = x^2 - 4x + 5$, donc $g(4 - x) = g(x)$.
:::
:::
