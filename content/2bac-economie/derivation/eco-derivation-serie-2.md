---
title: Série 1 — partie 2 : étude des fonctions
kind: serie
summary: Branches infinies et asymptotes, variations et extremums, concavité et points d’inflexion, éléments de symétrie et étude complète, avec les corrigés.
position: 20
visibility: enrolled
---

Cinq exercices sur la deuxième partie du cours, jusqu’à l’étude complète d’une fonction.

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

:::exercice Concavité et points d’inflexion
Soit $f(x) = x^4 - 6x^2 + 1$ sur $\mathbb{R}$.

1. Calculer $f'(x)$ et $f''(x)$.
2. Étudier la concavité de la courbe et déterminer ses points d’inflexion.
3. Donner l’équation de la tangente à la courbe au point d’inflexion d’abscisse positive.

:::corrige
1. $f'(x) = 4x^3 - 12x$ et $f''(x) = 12x^2 - 12 = 12(x - 1)(x + 1)$.
2. $f''(x) > 0$ sur $]-\infty ; -1[$ et sur $]1 ; +\infty[$ : la courbe y est convexe. $f''(x) < 0$ sur $]-1 ; 1[$ : elle y est concave. $f''$ s’annule en changeant de signe en $-1$ et en $1$ : les points $A(-1 ; -4)$ et $B(1 ; -4)$ sont des points d’inflexion.
3. $f(1) = -4$ et $f'(1) = -8$ : la tangente en $B$ a pour équation $y = -8(x - 1) - 4$, soit $y = -8x + 4$.
:::
:::

:::exercice Éléments de symétrie
1. Soit $f(x) = \sqrt{x^2 - 2x + 5}$ sur $\mathbb{R}$. Montrer que la droite d’équation $x = 1$ est un axe de symétrie de sa courbe.
2. Soit $g(x) = x + 1 + \dfrac{1}{x + 1}$ sur $\mathbb{R} \setminus \{-1\}$. Montrer que le point $\Omega(-1 ; 0)$ est un centre de symétrie de sa courbe.

:::corrige
1. Pour tout réel $x$, $2 - x \in \mathbb{R}$ et $(2 - x)^2 - 2(2 - x) + 5 = x^2 - 4x + 4 - 4 + 2x + 5 = x^2 - 2x + 5$. Donc $f(2 - x) = f(x)$ : la droite $x = 1$ est axe de symétrie.
2. Si $x \neq -1$, alors $-2 - x \neq -1$, et

$$
g(-2 - x) + g(x) = (-1 - x) + \frac{1}{-1 - x} + (x + 1) + \frac{1}{x + 1} = 0 = 2 \times 0
$$

donc $\Omega(-1 ; 0)$ est centre de symétrie.
:::
:::

:::exercice Déterminer une fonction
Soit $f(x) = x^3 + ax^2 + b$, où $a$ et $b$ sont deux réels.

Déterminer $a$ et $b$ pour que la courbe de $f$ passe par le point $A(1 ; 0)$ et y admette une tangente horizontale. Étudier alors les variations de $f$.

:::corrige
$f'(x) = 3x^2 + 2ax$. Les conditions s’écrivent $f(1) = 0$ et $f'(1) = 0$, soit $1 + a + b = 0$ et $3 + 2a = 0$. Donc $a = -\frac{3}{2}$ et $b = \frac{1}{2}$.

Alors $f'(x) = 3x^2 - 3x = 3x(x - 1)$ : $f$ est croissante sur $]-\infty ; 0]$, décroissante sur $[0 ; 1]$ et croissante sur $[1 ; +\infty[$, avec un maximum local $f(0) = \frac{1}{2}$ et un minimum local $f(1) = 0$.
:::
:::
