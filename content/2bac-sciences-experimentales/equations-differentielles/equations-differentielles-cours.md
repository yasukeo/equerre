---
title: Équations différentielles
kind: cours
summary: Les équations y' = ay + b et y'' + ay' + by = 0 : solutions générales, solution qui vérifie des conditions initiales, et exemples.
position: 20
visibility: public
---

## Qu’est-ce qu’une équation différentielle ?

Une **équation différentielle** relie une fonction inconnue $y$ de la variable $x$ à ses dérivées. **Résoudre** l’équation sur $\mathbb{R}$, c’est trouver toutes les fonctions dérivables (deux fois si $y''$ apparaît) qui la vérifient pour tout réel $x$.

## L’équation y′ = ay + b

:::theoreme
Soit $a$ un réel non nul. Les solutions sur $\mathbb{R}$ de l’équation $y' = ay$ sont les fonctions :

$$
x \mapsto C e^{ax}, \qquad C \in \mathbb{R}
$$
:::

:::theoreme
Soient $a$ et $b$ deux réels, $a \neq 0$. Les solutions sur $\mathbb{R}$ de l’équation $y' = ay + b$ sont les fonctions :

$$
x \mapsto C e^{ax} - \frac{b}{a}, \qquad C \in \mathbb{R}
$$

Pour tous réels $x_0$ et $y_0$, il existe une **unique** solution qui vérifie $y(x_0) = y_0$.
:::

:::exemple
Résoudre $y' = -2y + 6$ avec $y(0) = 1$. Les solutions sont $y(x) = C e^{-2x} + 3$, car $-\frac{b}{a} = -\frac{6}{-2} = 3$. La condition $y(0) = C + 3 = 1$ donne $C = -2$, donc $y(x) = 3 - 2e^{-2x}$.
:::

:::attention
Mettez d’abord l’équation sous la forme $y' = ay + b$ : $2y' + y = 4$ s’écrit $y' = -\frac{1}{2} y + 2$, donc $a = -\frac{1}{2}$ et $b = 2$.
:::

## L’équation y″ + ay′ + by = 0

On associe à l’équation $y'' + ay' + by = 0$ ($a$ et $b$ réels) son **équation caractéristique** :

$$
r^2 + ar + b = 0, \qquad \Delta = a^2 - 4b
$$

:::theoreme
- Si $\Delta > 0$, l’équation caractéristique a deux racines réelles $r_1$ et $r_2$, et les solutions sont les fonctions $x \mapsto \alpha e^{r_1 x} + \beta e^{r_2 x}$.
- Si $\Delta = 0$, elle a une racine double $r$, et les solutions sont les fonctions $x \mapsto (\alpha x + \beta) e^{r x}$.
- Si $\Delta < 0$, elle a deux racines complexes conjuguées $p + iq$ et $p - iq$ ($q \neq 0$), et les solutions sont les fonctions $x \mapsto e^{p x}\left(\alpha \cos(qx) + \beta \sin(qx)\right)$.

Dans chaque cas, $\alpha$ et $\beta$ sont des réels quelconques.
:::

:::propriete
Pour tous réels $x_0$, $y_0$ et $y_1$, il existe une unique solution qui vérifie $y(x_0) = y_0$ et $y'(x_0) = y_1$.
:::

:::exemple
$y'' - 3y' + 2y = 0$ : l’équation $r^2 - 3r + 2 = 0$ a pour racines $1$ et $2$. Les solutions sont $y(x) = \alpha e^{x} + \beta e^{2x}$.
:::

:::exemple
$y'' + 4y = 0$ avec $y(0) = 1$ et $y'(0) = 2$ : l’équation $r^2 + 4 = 0$ a pour racines $2i$ et $-2i$ ($p = 0$, $q = 2$), donc $y(x) = \alpha\cos(2x) + \beta\sin(2x)$. $y(0) = \alpha = 1$ ; $y'(x) = -2\alpha\sin(2x) + 2\beta\cos(2x)$, donc $y'(0) = 2\beta = 2$ et $\beta = 1$ : $y(x) = \cos(2x) + \sin(2x)$.
:::

:::exemple
$y'' + 2y' + y = 0$ : $r^2 + 2r + 1 = (r + 1)^2$, racine double $-1$. Les solutions sont $y(x) = (\alpha x + \beta)e^{-x}$.
:::

## Un exemple en physique

:::exemple
La charge $q$ d’un condensateur qui se décharge dans une résistance vérifie $RC\,q' + q = 0$, soit $q' = -\frac{1}{RC} q$. Donc $q(t) = q_0 \, e^{-\frac{t}{RC}}$, où $q_0$ est la charge à l’instant $t = 0$.
:::
