---
title: Devoir surveillé : dérivation et étude des fonctions
kind: devoir
summary: Un devoir d’une heure sur 20 points : calculs de dérivées, dérivabilité d’une fonction définie par morceaux et étude d’une fonction polynôme, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice non autorisée.

:::exercice Exercice 1 (5 points) : calculs de dérivées
Calculer la dérivée de chaque fonction sur $\mathbb{R}$.

1. $f(x) = (3x - 1)^5$ (1 pt)
2. $g(x) = \dfrac{x - 1}{x^2 + 1}$ (1,5 pt)
3. $h(x) = \sqrt{2x^2 + 1}$ (1,5 pt)
4. $k(x) = \left(x^2 - 3x\right)(2x + 1)$ (1 pt)

:::corrige
1. $f'(x) = 5 \times 3 \times (3x - 1)^4 = 15(3x - 1)^4$.
2. $g'(x) = \frac{(x^2 + 1) - (x - 1) \times 2x}{(x^2 + 1)^2} = \frac{-x^2 + 2x + 1}{(x^2 + 1)^2}$.
3. $2x^2 + 1 > 0$, donc $h'(x) = \frac{4x}{2\sqrt{2x^2 + 1}} = \frac{2x}{\sqrt{2x^2 + 1}}$.
4. $k'(x) = (2x - 3)(2x + 1) + 2\left(x^2 - 3x\right) = 6x^2 - 10x - 3$.
:::
:::

:::exercice Exercice 2 (5 points) : dérivabilité
Soit $f$ la fonction définie sur $[0 ; +\infty[$ par $f(x) = x^2$ si $0 \leq x \leq 1$ et $f(x) = 2\sqrt{x} - 1$ si $x > 1$.

1. Montrer que $f$ est continue en $1$. (1 pt)
2. Étudier la dérivabilité de $f$ à gauche et à droite en $1$. (3 pts)
3. Interpréter géométriquement et donner les équations des demi-tangentes en $1$. (1 pt)

:::corrige
1. $f(1) = 1$, $\lim_{x \to 1^-} x^2 = 1$ et $\lim_{x \to 1^+} \left(2\sqrt{x} - 1\right) = 1$ : $f$ est continue en $1$.
2. À gauche : $\frac{x^2 - 1}{x - 1} = x + 1 \to 2$, donc $f'_g(1) = 2$. À droite : $\frac{2\sqrt{x} - 2}{x - 1} = \frac{2(\sqrt{x} - 1)}{(\sqrt{x} - 1)(\sqrt{x} + 1)} = \frac{2}{\sqrt{x} + 1} \to 1$, donc $f'_d(1) = 1$. Les deux nombres sont différents : $f$ n’est pas dérivable en $1$.
3. Le point $A(1 ; 1)$ est un point anguleux. Demi-tangente à gauche : $y = 2(x - 1) + 1 = 2x - 1$ (pour $x \leq 1$) ; à droite : $y = (x - 1) + 1 = x$ (pour $x \geq 1$).
:::
:::

:::exercice Exercice 3 (10 points) : étude d’une fonction
Soit $f(x) = x^3 - 3x^2 + 4$ sur $\mathbb{R}$, et $(C)$ sa courbe.

1. Calculer les limites de $f$ en $-\infty$ et en $+\infty$. (1 pt)
2. Calculer $f'(x)$ et dresser le tableau de variations de $f$. (2,5 pts)
3. Vérifier que $f(x) = (x - 2)^2(x + 1)$ et en déduire les points d’intersection de $(C)$ avec l’axe des abscisses. (2 pts)
4. Montrer que $(C)$ admet un point d’inflexion $I$ dont on donnera les coordonnées. (1,5 pt)
5. Montrer que $I$ est un centre de symétrie de $(C)$. (1,5 pt)
6. Donner l’équation de la tangente à $(C)$ en $I$. (1,5 pt)

:::corrige
1. $f$ a la limite de $x^3$ : $-\infty$ en $-\infty$ et $+\infty$ en $+\infty$.
2. $f'(x) = 3x^2 - 6x = 3x(x - 2)$. $f$ est croissante sur $]-\infty ; 0]$, décroissante sur $[0 ; 2]$, croissante sur $[2 ; +\infty[$, avec un maximum local $f(0) = 4$ et un minimum local $f(2) = 0$.
3. $(x - 2)^2(x + 1) = (x^2 - 4x + 4)(x + 1) = x^3 - 3x^2 + 4$. Donc $f(x) = 0 \iff x = 2$ ou $x = -1$ : $(C)$ coupe l’axe des abscisses en $(-1 ; 0)$ et le touche en $(2 ; 0)$ (l’axe y est tangent, car $f'(2) = 0$).
4. $f''(x) = 6x - 6$ s’annule en $1$ en changeant de signe, et $f(1) = 2$ : $I(1 ; 2)$ est un point d’inflexion.
5. $f(2 - x) = (2 - x)^3 - 3(2 - x)^2 + 4 = -x^3 + 3x^2$, donc $f(2 - x) + f(x) = 4 = 2 \times 2$ : $I(1 ; 2)$ est centre de symétrie.
6. $f'(1) = -3$ : la tangente en $I$ a pour équation $y = -3(x - 1) + 2$, soit $y = -3x + 5$.
:::
:::
