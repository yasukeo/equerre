---
title: Devoir surveillé : dérivation
kind: devoir
summary: Un devoir d’une heure sur 20 points : nombre dérivé, calculs de dérivées, variations et tangente, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (5 points) : nombre dérivé
Soit $f(x) = x^2 - 3x$. Calculer $f'(2)$ par la définition, puis donner l’équation de la tangente en $2$.

:::corrige
$\frac{f(2 + h) - f(2)}{h} = \frac{(4 + 4h + h^2 - 6 - 3h) + 2}{h} = 1 + h \to 1$. $f(2) = -2$ : $y = (x - 2) - 2 = x - 4$.
:::
:::

:::exercice Exercice 2 (6 points) : dérivées
Calculer la dérivée de :

1. $f(x) = (x^2 + 1)^3$ (2 pts)
2. $g(x) = \dfrac{3x - 2}{x + 4}$ sur $]-4 ; +\infty[$ (2 pts)
3. $h(x) = x\cos x$ (2 pts)

:::corrige
1. $f'(x) = 6x(x^2 + 1)^2$.
2. $g'(x) = \frac{3(x + 4) - (3x - 2)}{(x + 4)^2} = \frac{14}{(x + 4)^2}$.
3. $h'(x) = \cos x - x\sin x$.
:::
:::

:::exercice Exercice 3 (9 points) : variations
Soit $f(x) = \dfrac{x^2 - 3}{x - 2}$ sur $]2 ; +\infty[$.

1. Montrer que $f'(x) = \dfrac{x^2 - 4x + 3}{(x - 2)^2}$. (3 pts)
2. Étudier le signe de $f'(x)$ sur $]2 ; +\infty[$ et dresser le tableau de variations. (4 pts)
3. Donner l’équation de la tangente au point d’abscisse $4$. (2 pts)

:::corrige
1. $f'(x) = \frac{2x(x - 2) - (x^2 - 3)}{(x - 2)^2} = \frac{x^2 - 4x + 3}{(x - 2)^2}$.
2. $x^2 - 4x + 3 = (x - 1)(x - 3)$ ; sur $]2 ; +\infty[$, $x - 1 > 0$, donc $f'$ a le signe de $x - 3$ : $f$ décroît sur $]2 ; 3]$ et croît sur $[3 ; +\infty[$, minimum $f(3) = 6$.
3. $f(4) = \frac{13}{2}$, $f'(4) = \frac{3}{4}$ : $y = \frac{3}{4}(x - 4) + \frac{13}{2} = \frac{3}{4}x + \frac{7}{2}$.
:::
:::
