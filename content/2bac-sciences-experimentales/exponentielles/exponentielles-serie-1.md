---
title: Série 1 — partie 1 : la fonction exponentielle et ses règles
kind: serie
summary: Simplifications, équations, inéquations et systèmes avec exp, équations qui se ramènent au second degré, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Équations et inéquations
Résoudre dans $\mathbb{R}$ :

1. $e^{2x + 1} = e^{3 - x}$
2. $e^{2x} - 4e^x + 3 = 0$
3. $e^{x} - 2 > 0$

:::corrige
1. $2x + 1 = 3 - x$, donc $x = \frac{2}{3}$.
2. Avec $X = e^x > 0$ : $X^2 - 4X + 3 = 0$, soit $X = 1$ ou $X = 3$. Donc $x = 0$ ou $x = \ln 3$.
3. $e^x > 2 \iff x > \ln 2$ : $S = ]\ln 2 ; +\infty[$.
:::
:::

:::exercice Simplifier
Simplifier les expressions suivantes.

$$
A = e^{\ln 3 + 2\ln 2} \qquad B = \frac{e^{2x + 1}}{e^{x - 1}} \qquad C = \left(e^x + e^{-x}\right)^2 - \left(e^x - e^{-x}\right)^2 \qquad D = \ln\left(e^{3}\right) + e^{-\ln 2}
$$

:::corrige
- $A = 3 \times \left(e^{\ln 2}\right)^2 = 3 \times 4 = 12$.
- $B = e^{(2x + 1) - (x - 1)} = e^{x + 2}$.
- $C = \left(e^{2x} + 2 + e^{-2x}\right) - \left(e^{2x} - 2 + e^{-2x}\right) = 4$.
- $D = 3 + \frac{1}{e^{\ln 2}} = 3 + \frac{1}{2} = \frac{7}{2}$.
:::
:::

:::exercice Inéquations
Résoudre dans $\mathbb{R}$ :

1. $e^{x^2} \leq e^{3x - 2}$
2. $e^{2x} - e^x - 6 < 0$
3. $e^{1 - x} \geq 2$

:::corrige
1. $x^2 \leq 3x - 2 \iff x^2 - 3x + 2 \leq 0 \iff (x - 1)(x - 2) \leq 0$ : $S = [1 ; 2]$.
2. Avec $X = e^x > 0$ : $(X - 3)(X + 2) < 0 \iff -2 < X < 3$, et comme $X > 0$, $e^x < 3$ : $S = ]-\infty ; \ln 3[$.
3. $1 - x \geq \ln 2 \iff x \leq 1 - \ln 2$ : $S = ]-\infty ; 1 - \ln 2]$.
:::
:::

:::exercice Un système
Résoudre dans $\mathbb{R}^2$ le système $\begin{cases} e^x \times e^y = e^5 \\ e^x + e^y = e^2 + e^3 \end{cases}$.

:::corrige
On pose $X = e^x > 0$ et $Y = e^y > 0$ : $XY = e^5$ et $X + Y = e^2 + e^3$. $X$ et $Y$ sont donc les solutions de $t^2 - \left(e^2 + e^3\right)t + e^5 = 0$, qui s’écrit $\left(t - e^2\right)\left(t - e^3\right) = 0$. Ainsi $\{X ; Y\} = \left\{e^2 ; e^3\right\}$, et les solutions sont $(2 ; 3)$ et $(3 ; 2)$.
:::
:::
