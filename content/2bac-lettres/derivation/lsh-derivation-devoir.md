---
title: Devoir surveillé : dérivation et étude des fonctions
kind: devoir
summary: Un devoir d’une heure sur 20 points : calculs de dérivées, une tangente, l’étude d’un polynôme, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : dérivées
Calculer la dérivée de chaque fonction.

1. $f(x) = 5x^4 - 2x^3 + 7$ (2 pts)
2. $g(x) = (x - 3)(x^2 + 2)$ (2 pts)
3. $h(x) = \dfrac{2x + 3}{x + 1}$, pour $x \neq -1$ (2 pts)

:::corrige
1. $f'(x) = 20x^3 - 6x^2$.
2. $g'(x) = (x^2 + 2) + (x - 3) \times 2x = 3x^2 - 6x + 2$.
3. $h'(x) = \frac{2(x + 1) - (2x + 3)}{(x + 1)^2} = \frac{-1}{(x + 1)^2}$.
:::
:::

:::exercice Exercice 2 (4 points) : tangente
Soit $f(x) = x^2 - 4x + 3$. Donner l’équation de la tangente au point d’abscisse $3$, puis le point où la tangente est horizontale.

:::corrige
$f(3) = 0$, $f'(x) = 2x - 4$, $f'(3) = 2$ : $y = 2(x - 3) = 2x - 6$. La tangente est horizontale quand $f'(x) = 0$, soit $x = 2$ : au point $(2 ; -1)$.
:::
:::

:::exercice Exercice 3 (10 points) : étude d’une fonction
Soit $f(x) = x^3 - 6x^2 + 9x$ sur $\mathbb{R}$.

1. Calculer les limites de $f$ en $-\infty$ et en $+\infty$. (2 pts)
2. Calculer $f'(x)$ et montrer que $f'(x) = 3(x - 1)(x - 3)$. (2 pts)
3. Dresser le tableau de variations de $f$. (3 pts)
4. Vérifier que $f(x) = x(x - 3)^2$ et en déduire les points d’intersection de la courbe avec l’axe des abscisses. (3 pts)

:::corrige
1. $-\infty$ en $-\infty$, $+\infty$ en $+\infty$.
2. $f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3)$.
3. $f$ croît jusqu’au maximum $f(1) = 4$, décroît jusqu’au minimum $f(3) = 0$, puis croît.
4. $x(x - 3)^2 = x(x^2 - 6x + 9) = f(x)$. $f(x) = 0 \iff x = 0$ ou $x = 3$ : points $(0 ; 0)$ et $(3 ; 0)$ (en $3$, la courbe touche l’axe sans le traverser).
:::
:::
