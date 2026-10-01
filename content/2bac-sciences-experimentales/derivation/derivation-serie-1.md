---
title: Série 1 : dérivation et étude des fonctions
kind: serie
summary: Dérivabilité en un point, calculs de dérivées, tangente, variations, branches infinies et étude complète d’une fonction, avec les corrigés.
position: 10
visibility: public
---

Cinq exercices, du nombre dérivé à l’étude complète d’une fonction.

:::exercice Dérivabilité en un point
Soit $f$ définie sur $\mathbb{R}$ par $f(x) = x|x - 1|$.

1. Étudier la dérivabilité de $f$ à droite et à gauche en $1$.
2. $f$ est-elle dérivable en $1$ ? Interpréter géométriquement.

:::corrige
1. Pour $x > 1$, $f(x) = x(x - 1)$, donc $\frac{f(x) - f(1)}{x - 1} = x \to 1$ quand $x \to 1^+$ : $f'_d(1) = 1$. Pour $x < 1$, $f(x) = -x(x - 1)$, donc $\frac{f(x) - f(1)}{x - 1} = -x \to -1$ quand $x \to 1^-$ : $f'_g(1) = -1$.
2. $f'_d(1) \neq f'_g(1)$ : $f$ n’est pas dérivable en $1$. La courbe a au point $A(1 ; 0)$ deux demi-tangentes de coefficients directeurs $1$ et $-1$ : c’est un point anguleux.
:::
:::

:::exercice Calculs de dérivées
Calculer la dérivée de chaque fonction sur l’intervalle indiqué.

1. $f(x) = (2x^2 - 3)^4$ sur $\mathbb{R}$.
2. $g(x) = \dfrac{x^2 + 1}{x - 2}$ sur $]2 ; +\infty[$.
3. $h(x) = \sqrt{x^2 + x + 1}$ sur $\mathbb{R}$.
4. $k(x) = \sin^2(2x)$ sur $\mathbb{R}$.

:::corrige
1. $f'(x) = 4 \times 4x \times (2x^2 - 3)^3 = 16x(2x^2 - 3)^3$.
2. $g'(x) = \dfrac{2x(x - 2) - (x^2 + 1)}{(x - 2)^2} = \dfrac{x^2 - 4x - 1}{(x - 2)^2}$.
3. $x^2 + x + 1 > 0$ pour tout $x$ (discriminant $-3 < 0$), donc $h'(x) = \dfrac{2x + 1}{2\sqrt{x^2 + x + 1}}$.
4. $k'(x) = 2 \times 2\cos(2x) \times \sin(2x) = 4 \sin(2x)\cos(2x) = 2\sin(4x)$.
:::
:::

:::exercice Tangente
Soit $f(x) = \dfrac{2x - 1}{x + 1}$ sur $]-1 ; +\infty[$.

1. Déterminer l’équation de la tangente $(T)$ à la courbe de $f$ au point d’abscisse $0$.
2. Étudier la position de la courbe par rapport à $(T)$.

:::corrige
1. $f'(x) = \dfrac{2(x + 1) - (2x - 1)}{(x + 1)^2} = \dfrac{3}{(x + 1)^2}$, donc $f(0) = -1$ et $f'(0) = 3$ : $(T) : y = 3x - 1$.
2. $f(x) - (3x - 1) = \dfrac{2x - 1 - (3x - 1)(x + 1)}{x + 1} = \dfrac{-3x^2}{x + 1}$. Sur $]-1 ; +\infty[$, $x + 1 > 0$, donc cette différence est négative ou nulle : la courbe est au-dessous de $(T)$, et la touche seulement au point d’abscisse $0$.
:::
:::

:::exercice Branches infinies
Soit $f(x) = x + \sqrt{x^2 + 1}$ sur $\mathbb{R}$.

1. Calculer $\lim_{x \to +\infty} f(x)$ et $\lim_{x \to -\infty} f(x)$.
2. Étudier la branche infinie de la courbe en $+\infty$.

:::corrige
1. En $+\infty$, $f(x) \to +\infty$ (somme de deux termes qui tendent vers $+\infty$). En $-\infty$, c’est une forme $-\infty + \infty$ ; avec la quantité conjuguée, $f(x) = \dfrac{x^2 - (x^2 + 1)}{x - \sqrt{x^2 + 1}} = \dfrac{-1}{x - \sqrt{x^2 + 1}}$, et le dénominateur tend vers $-\infty$, donc $\lim_{x \to -\infty} f(x) = 0$ : la droite $y = 0$ est asymptote en $-\infty$.
2. Pour $x > 0$, $\dfrac{f(x)}{x} = 1 + \sqrt{1 + \dfrac{1}{x^2}} \to 2$. Puis $f(x) - 2x = \sqrt{x^2 + 1} - x = \dfrac{1}{\sqrt{x^2 + 1} + x} \to 0$ : la droite $y = 2x$ est asymptote oblique en $+\infty$.
:::
:::

:::exercice Étude complète
Soit $f(x) = x^3 - 3x + 1$.

1. Calculer les limites de $f$ en $-\infty$ et en $+\infty$.
2. Dresser le tableau de variations de $f$.
3. Montrer que l’équation $f(x) = 0$ admet exactement trois solutions réelles.
4. Déterminer le point d’inflexion de la courbe.

:::corrige
1. $f$ se comporte comme $x^3$ : $\lim_{x \to -\infty} f(x) = -\infty$ et $\lim_{x \to +\infty} f(x) = +\infty$.
2. $f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$. $f$ est croissante sur $]-\infty ; -1]$, décroissante sur $[-1 ; 1]$, croissante sur $[1 ; +\infty[$, avec $f(-1) = 3$ (maximum local) et $f(1) = -1$ (minimum local).
3. Sur chacun des intervalles $]-\infty ; -1]$, $[-1 ; 1]$ et $[1 ; +\infty[$, $f$ est continue et strictement monotone, et son image contient $0$ : $]-\infty ; 3]$, $[-1 ; 3]$ et $[-1 ; +\infty[$. L’équation a donc exactement une solution dans chacun, soit trois en tout.
4. $f''(x) = 6x$ s’annule en $0$ en changeant de signe : le point $I(0 ; 1)$ est un point d’inflexion.
:::
:::
