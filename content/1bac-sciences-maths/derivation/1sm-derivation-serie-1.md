---
title: Série 1 — partie 1 : nombre dérivé et tangente
kind: serie
summary: Calculer un nombre dérivé par la limite du taux, dérivabilité à droite et à gauche, tangentes et demi-tangentes, approximation affine, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Nombre dérivé par la définition
1. Soit $f(x) = 2x^2 - x$. Calculer $f'(1)$ à l’aide du taux de variation.
2. Soit $g(x) = \dfrac{1}{x}$. Calculer $g'(2)$.

:::corrige
1. $\frac{f(1 + h) - f(1)}{h} = \frac{2(1 + 2h + h^2) - 1 - h - 1}{h} = \frac{3h + 2h^2}{h} = 3 + 2h \to 3$.
2. $\frac{\frac{1}{2 + h} - \frac{1}{2}}{h} = \frac{-1}{2(2 + h)} \to -\frac{1}{4}$.
:::
:::

:::exercice Dérivabilité à droite et à gauche
Soit $f(x) = |x^2 - 1|$. Étudier la dérivabilité de $f$ en $1$.

:::corrige
Pour $x > 1$ : $f(x) = x^2 - 1$, $\frac{f(x) - f(1)}{x - 1} = x + 1 \to 2$. Pour $x$ légèrement inférieur à $1$ : $f(x) = 1 - x^2$, le taux vaut $-(x + 1) \to -2$. $f'_d(1) = 2 \neq f'_g(1) = -2$ : $f$ n’est pas dérivable en $1$ (point anguleux).
:::
:::

:::exercice Tangentes
1. Équation de la tangente à la courbe de $f(x) = x^3 - 2x + 1$ au point d’abscisse $-1$.
2. En quels points la courbe de $g(x) = x^3 - 3x^2$ a-t-elle une tangente horizontale ?

:::corrige
1. $f(-1) = 2$ et $f'(x) = 3x^2 - 2$, $f'(-1) = 1$ : $y = x + 3$.
2. $g'(x) = 3x^2 - 6x = 3x(x - 2) = 0$ : en $(0 ; 0)$ et $(2 ; -4)$.
:::
:::

:::exercice Demi-tangente verticale et approximation
1. Soit $f(x) = \sqrt{x - 2}$ sur $[2 ; +\infty[$. Étudier la dérivabilité à droite en $2$ et interpréter.
2. Donner une approximation affine de $(1 + h)^3$ pour $h$ proche de $0$, et en déduire une valeur approchée de $1{,}01^3$.

:::corrige
1. $\frac{\sqrt{x - 2}}{x - 2} = \frac{1}{\sqrt{x - 2}} \to +\infty$ : non dérivable à droite en $2$ ; demi-tangente verticale au point $(2 ; 0)$.
2. $(1 + h)^3 \approx 1 + 3h$, donc $1{,}01^3 \approx 1{,}03$ (la valeur exacte est $1{,}030301$).
:::
:::
