---
title: Devoir surveillé : la dérivation
kind: devoir
summary: Un devoir d’une heure sur 20 points : calculs de dérivées, tangente, variations et extremums d’un polynôme du troisième degré, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : dérivées
Calculer la dérivée de chaque fonction.

1. $f(x) = 5x^3 - 2x^2 + 7$ (2 pts)
2. $g(x) = (x^2 - 1)(x + 3)$ (2 pts)
3. $h(x) = \dfrac{x + 4}{2x - 1}$ sur $\left]\dfrac{1}{2} ; +\infty\right[$ (2 pts)

:::corrige
1. $f'(x) = 15x^2 - 4x$.
2. $g'(x) = 2x(x + 3) + (x^2 - 1) = 3x^2 + 6x - 1$.
3. $h'(x) = \frac{1 \times (2x - 1) - (x + 4) \times 2}{(2x - 1)^2} = \frac{-9}{(2x - 1)^2}$.
:::
:::

:::exercice Exercice 2 (4 points) : tangente
Donner l’équation de la tangente à la courbe de $f(x) = x^2 - 3x + 1$ au point d’abscisse $2$.

:::corrige
$f(2) = 4 - 6 + 1 = -1$ ; $f'(x) = 2x - 3$, donc $f'(2) = 1$. La tangente a pour équation $y = 1 \times (x - 2) - 1$, soit $y = x - 3$.
:::
:::

:::exercice Exercice 3 (10 points) : variations
Soit $f(x) = -x^3 + 3x + 2$ sur $\mathbb{R}$.

1. Calculer $f'(x)$ et montrer que $f'(x) = -3(x - 1)(x + 1)$. (2 pts)
2. Étudier le signe de $f'(x)$ et donner les variations de $f$. (3 pts)
3. Donner le minimum local et le maximum local de $f$. (2 pts)
4. Vérifier que $f(x) = (x + 1)^2(2 - x)$ et résoudre $f(x) = 0$. (3 pts)

:::corrige
1. $f'(x) = -3x^2 + 3 = -3(x^2 - 1) = -3(x - 1)(x + 1)$.
2. Le trinôme a pour racines $-1$ et $1$, et $a = -3 < 0$ : il est positif entre les racines, négatif à l’extérieur. $f$ est décroissante sur $]-\infty ; -1]$, croissante sur $[-1 ; 1]$, décroissante sur $[1 ; +\infty[$.
3. Minimum local $f(-1) = 1 - 3 + 2 = 0$ ; maximum local $f(1) = -1 + 3 + 2 = 4$.
4. $(x + 1)^2(2 - x) = (x^2 + 2x + 1)(2 - x) = -x^3 + 3x + 2$. Donc $f(x) = 0 \iff x = -1$ ou $x = 2$.
:::
:::
