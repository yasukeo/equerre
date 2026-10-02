---
title: Devoir surveillé : représentation graphique d’une fonction
kind: devoir
summary: Un devoir d’une heure sur 20 points : branches infinies, point d’inflexion et étude d’une fonction rationnelle, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (5 points) : branches infinies
Étudier la branche infinie en $+\infty$ de $f(x) = x + \sqrt{x^2 + 1}$ et de $g(x) = \dfrac{x^2}{x - 1}$.

:::corrige
$\frac{f(x)}{x} = 1 + \sqrt{1 + \frac{1}{x^2}} \to 2$ et $f(x) - 2x = \sqrt{x^2 + 1} - x = \frac{1}{\sqrt{x^2 + 1} + x} \to 0$ : asymptote $y = 2x$. Pour $g$ : $g(x) = x + 1 + \frac{1}{x - 1}$, asymptote $y = x + 1$.
:::
:::

:::exercice Exercice 2 (5 points) : concavité
Soit $f(x) = -x^3 + 6x^2 - 9x$. Étudier la concavité et donner le point d’inflexion et la tangente en ce point.

:::corrige
$f'(x) = -3x^2 + 12x - 9$, $f''(x) = -6x + 12$ : convexe sur $]-\infty ; 2]$, concave sur $[2 ; +\infty[$. $I(2 ; -2)$. $f'(2) = 3$ : $y = 3(x - 2) - 2 = 3x - 8$.
:::
:::

:::exercice Exercice 3 (10 points) : étude d’une fonction
Soit $f(x) = \dfrac{x^2 - 3x + 3}{x - 2}$ sur $\mathbb{R} \setminus \{2\}$.

1. Écrire $f(x) = x - 1 + \dfrac{1}{x - 2}$. (2 pts)
2. Limites et asymptotes. (3 pts)
3. Variations. (3 pts)
4. Centre de symétrie. (2 pts)

:::corrige
1. $(x - 1)(x - 2) + 1 = x^2 - 3x + 3$.
2. $\lim_{\pm\infty} f = \pm\infty$, asymptote oblique $y = x - 1$ ; $\lim_{2^\pm} f = \pm\infty$, asymptote verticale $x = 2$.
3. $f'(x) = 1 - \frac{1}{(x - 2)^2} = \frac{(x - 1)(x - 3)}{(x - 2)^2}$ : croissante sur $]-\infty ; 1]$, décroissante sur $[1 ; 2[$ et $]2 ; 3]$, croissante sur $[3 ; +\infty[$ ; $f(1) = -1$, $f(3) = 3$.
4. $f(4 - x) + f(x) = (3 - x) + \frac{1}{2 - x} + (x - 1) + \frac{1}{x - 2} = 2$ : centre $\Omega(2 ; 1)$.
:::
:::
