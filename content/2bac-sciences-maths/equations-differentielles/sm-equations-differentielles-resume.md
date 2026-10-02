---
title: Équations différentielles : l’essentiel
kind: resume
summary: Les solutions des deux types d’équations du programme et la façon d’utiliser les conditions initiales, sur une page.
position: 10
visibility: public
---

## Premier ordre : y′ = ay + b ($a \neq 0$)

:::theoreme
- $y' = ay$ : $y(x) = Ce^{ax}$.
- $y' = ay + b$ : $y(x) = Ce^{ax} - \frac{b}{a}$.
- Une condition $y(x_0) = y_0$ fixe $C$ : la solution est unique.
:::

Toujours écrire l’équation sous la forme $y' = ay + b$ d’abord : $2y' + y = 4$ donne $a = -\frac{1}{2}$, $b = 2$.

**Solution particulière $u$ donnée** de $y' = ay + g(x)$ : les solutions sont $Ce^{ax} + u(x)$.

## Second ordre : y″ + ay′ + by = 0

Équation caractéristique $r^2 + ar + b = 0$, $\Delta = a^2 - 4b$.

:::theoreme
- $\Delta > 0$, racines $r_1$, $r_2$ : $y = \alpha e^{r_1 x} + \beta e^{r_2 x}$.
- $\Delta = 0$, racine double $r$ : $y = (\alpha x + \beta)e^{rx}$.
- $\Delta < 0$, racines $p \pm iq$ : $y = e^{px}\left(\alpha\cos qx + \beta\sin qx\right)$.
:::

Conditions $y(x_0) = y_0$ et $y'(x_0) = y_1$ : on dérive la forme générale, puis on résout le système en $\alpha$, $\beta$.

**Retrouver l’équation** : si les racines sont $r_1$, $r_2$, l’équation caractéristique est $r^2 - (r_1 + r_2)r + r_1 r_2 = 0$.

:::attention
Pour $\Delta < 0$, c’est $q$ (la partie imaginaire de la racine) qui va dans $\cos qx$, et $p$ (sa partie réelle) dans $e^{px}$.
:::
