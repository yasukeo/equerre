---
title: Équations différentielles — partie 2 : second ordre
kind: cours
summary: Équation y″ + ay′ + by = 0, équation caractéristique, solutions selon le signe du discriminant, conditions initiales, retrouver une équation à partir de ses solutions, oscillations.
position: 20
visibility: public
---
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

## Retrouver une équation à partir de ses solutions

Si les solutions sont $\alpha e^{r_1 x} + \beta e^{r_2 x}$, l’équation caractéristique a pour racines $r_1$ et $r_2$ : c’est $(r - r_1)(r - r_2) = 0$, soit $r^2 - (r_1 + r_2)r + r_1 r_2 = 0$.

:::exemple
Les fonctions $x \mapsto \alpha e^{2x} + \beta e^{-x}$ sont les solutions de $y'' - y' - 2y = 0$, car $(r - 2)(r + 1) = r^2 - r - 2$.
:::

:::exemple
Les fonctions $x \mapsto \alpha\cos(3x) + \beta\sin(3x)$ sont les solutions de $y'' + 9y = 0$ : les racines sont $\pm 3i$, et $(r - 3i)(r + 3i) = r^2 + 9$.
:::

## Oscillations

:::exemple
Un ressort de raideur $k$ portant une masse $m$, sans frottement, vérifie $x'' + \frac{k}{m}x = 0$. Avec $\omega = \sqrt{\frac{k}{m}}$, les solutions sont $x(t) = \alpha\cos(\omega t) + \beta\sin(\omega t)$ : le mouvement est périodique, de période $\frac{2\pi}{\omega}$.
:::

:::attention
Pour une condition $y(x_0) = y_0$ et $y'(x_0) = y_1$, on dérive la forme générale **avant** de remplacer $x$ par $x_0$, puis on résout le système en $\alpha$ et $\beta$.
:::
