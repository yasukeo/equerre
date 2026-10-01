---
title: Série 1 : équations différentielles
kind: serie
summary: Équations y′ = ay + b et y″ + ay′ + by = 0 avec conditions initiales, avec les corrigés.
position: 10
visibility: public
---

Trois exercices sur les deux types d’équations du programme.

:::exercice Premier ordre
Résoudre l’équation $y' + 3y = 6$, puis déterminer la solution $f$ telle que $f(0) = 0$.

:::corrige
L’équation s’écrit $y' = -3y + 6$ ($a = -3$, $b = 6$). Ses solutions sont $y(x) = C e^{-3x} + 2$, car $-\frac{b}{a} = 2$. $f(0) = C + 2 = 0$ donne $C = -2$, donc $f(x) = 2 - 2e^{-3x}$.
:::
:::

:::exercice Second ordre, racines réelles
Résoudre $y'' - y' - 6y = 0$, puis déterminer la solution $g$ telle que $g(0) = 1$ et $g'(0) = 8$.

:::corrige
L’équation caractéristique $r^2 - r - 6 = 0$ a pour racines $3$ et $-2$ ($\Delta = 25$). Les solutions sont $y(x) = \alpha e^{3x} + \beta e^{-2x}$.

$g(0) = \alpha + \beta = 1$ et $g'(0) = 3\alpha - 2\beta = 8$. En remplaçant $\beta = 1 - \alpha$ : $3\alpha - 2 + 2\alpha = 8$, donc $\alpha = 2$ et $\beta = -1$ : $g(x) = 2e^{3x} - e^{-2x}$.
:::
:::

:::exercice Second ordre, racines complexes
Résoudre $y'' + 2y' + 5y = 0$.

:::corrige
L’équation caractéristique $r^2 + 2r + 5 = 0$ a pour discriminant $\Delta = 4 - 20 = -16 = (4i)^2$, et pour racines $-1 + 2i$ et $-1 - 2i$ ($p = -1$, $q = 2$). Les solutions sont :

$$
y(x) = e^{-x}\left(\alpha\cos(2x) + \beta\sin(2x)\right), \qquad \alpha, \beta \in \mathbb{R}
$$
:::
:::
