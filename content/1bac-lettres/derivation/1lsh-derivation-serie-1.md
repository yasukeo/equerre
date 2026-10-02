---
title: Série 1 — partie 1 : nombre dérivé et calcul des dérivées
kind: serie
summary: Nombre dérivé par le taux de variation, équations de tangentes, calculs de dérivées de polynômes, de produits et de quotients, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Nombre dérivé
Soit $f(x) = x^2 + 3x$.

1. Montrer que pour $h \neq 0$, $\dfrac{f(1 + h) - f(1)}{h} = 5 + h$.
2. En déduire $f'(1)$.

:::corrige
1. $f(1 + h) = 1 + 2h + h^2 + 3 + 3h = 4 + 5h + h^2$ et $f(1) = 4$, donc le taux vaut $\frac{5h + h^2}{h} = 5 + h$.
2. Quand $h \to 0$, $5 + h \to 5$ : $f'(1) = 5$.
:::
:::

:::exercice Calculs de dérivées
Calculer la dérivée de chaque fonction.

1. $f(x) = 2x^3 - 4x^2 + x - 9$
2. $g(x) = x^2 + \dfrac{1}{x}$ ($x \neq 0$)
3. $h(x) = (x^2 + 1)(3x - 2)$
4. $k(x) = 4\sqrt{x} - x$ ($x > 0$)

:::corrige
1. $f'(x) = 6x^2 - 8x + 1$.
2. $g'(x) = 2x - \frac{1}{x^2}$.
3. $h'(x) = 2x(3x - 2) + 3(x^2 + 1) = 9x^2 - 4x + 3$.
4. $k'(x) = \frac{2}{\sqrt{x}} - 1$.
:::
:::

:::exercice Dérivée d’un quotient
Calculer la dérivée de chaque fonction sur l’intervalle indiqué.

1. $f(x) = \dfrac{3x + 1}{x - 1}$ sur $]1 ; +\infty[$
2. $g(x) = \dfrac{x^2}{x + 2}$ sur $]-2 ; +\infty[$

:::corrige
1. $f'(x) = \frac{3(x - 1) - (3x + 1)}{(x - 1)^2} = \frac{-4}{(x - 1)^2}$.
2. $g'(x) = \frac{2x(x + 2) - x^2}{(x + 2)^2} = \frac{x^2 + 4x}{(x + 2)^2} = \frac{x(x + 4)}{(x + 2)^2}$.
:::
:::

:::exercice Tangentes
1. Donner l’équation de la tangente à la courbe de $f(x) = x^3 - 2x$ au point d’abscisse $1$.
2. En quel point la courbe de $g(x) = x^2 - 6x + 5$ a-t-elle une tangente horizontale ?

:::corrige
1. $f(1) = -1$ et $f'(x) = 3x^2 - 2$, donc $f'(1) = 1$ : $y = (x - 1) - 1$, soit $y = x - 2$.
2. $g'(x) = 2x - 6 = 0 \iff x = 3$ : au point $(3 ; -4)$.
:::
:::
