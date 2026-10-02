---
title: Série 1 — partie 2 : second ordre
kind: serie
summary: Équations y″ + ay′ + by = 0 avec racines réelles, double ou complexes, conditions initiales, retrouver une équation à partir de ses solutions, avec les corrigés.
position: 20
visibility: enrolled
---

Cinq exercices sur la deuxième partie du cours.

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

:::exercice Racine double
Résoudre $y'' - 4y' + 4y = 0$, puis déterminer la solution $h$ telle que $h(0) = 1$ et $h'(0) = 0$. Étudier le signe de $h'(x)$.

:::corrige
$r^2 - 4r + 4 = (r - 2)^2$ : racine double $2$, solutions $y(x) = (\alpha x + \beta)e^{2x}$. $h(0) = \beta = 1$. $h'(x) = \alpha e^{2x} + 2(\alpha x + \beta)e^{2x}$, donc $h'(0) = \alpha + 2 = 0$ et $\alpha = -2$ : $h(x) = (1 - 2x)e^{2x}$. Alors $h'(x) = -2e^{2x} + 2(1 - 2x)e^{2x} = -4xe^{2x}$, positive pour $x < 0$ et négative pour $x > 0$.
:::
:::

:::exercice Retrouver l’équation
1. Déterminer une équation $y'' + ay' + by = 0$ dont les solutions sont les fonctions $x \mapsto \alpha e^{x} + \beta e^{-3x}$.
2. Même question pour $x \mapsto e^{2x}\left(\alpha\cos x + \beta\sin x\right)$.

:::corrige
1. Racines $1$ et $-3$ : $(r - 1)(r + 3) = r^2 + 2r - 3$, donc $y'' + 2y' - 3y = 0$.
2. Racines $2 + i$ et $2 - i$ : leur somme vaut $4$ et leur produit $5$, donc $r^2 - 4r + 5$ et l’équation $y'' - 4y' + 5y = 0$.
:::
:::

:::exercice Conditions initiales, racines complexes
Résoudre $y'' - 2y' + 5y = 0$, puis déterminer la solution $f$ telle que $f(0) = 0$ et $f'(0) = 2$.

:::corrige
$\Delta = 4 - 20 = -16$ : racines $1 + 2i$ et $1 - 2i$. Les solutions sont $y(x) = e^{x}\left(\alpha\cos 2x + \beta\sin 2x\right)$. $f(0) = \alpha = 0$, donc $f(x) = \beta e^x\sin 2x$ et $f'(x) = \beta e^x\left(\sin 2x + 2\cos 2x\right)$ ; $f'(0) = 2\beta = 2$, donc $f(x) = e^x\sin 2x$.
:::
:::
