---
title: Série 1 — partie 1 : ordre et opérations
kind: serie
summary: Comparer des fractions et des racines, démontrer des inégalités classiques, encadrer une somme, une différence, un produit, un inverse et un carré, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Comparer
Comparer :

1. $\frac{11}{13}$ et $\frac{13}{15}$
2. $3\sqrt{7}$ et $8$
3. $\sqrt{5} + \sqrt{3}$ et $4$

:::corrige
1. $\frac{11}{13} - \frac{13}{15} = \frac{165 - 169}{195} < 0$ : $\frac{11}{13} < \frac{13}{15}$.
2. Deux positifs de carrés $63$ et $64$ : $3\sqrt{7} < 8$.
3. $\left(\sqrt{5} + \sqrt{3}\right)^2 = 8 + 2\sqrt{15}$ et $4^2 = 16$. Or $2\sqrt{15} < 8$ car $\sqrt{15} < 4$. Donc $\sqrt{5} + \sqrt{3} < 4$.
:::
:::

:::exercice Démontrer des inégalités
1. Montrer que pour tous réels $a$ et $b$, $a^2 + b^2 \geq 2ab$.
2. Montrer que pour tout réel $x \geq 0$, $x + 1 \geq 2\sqrt{x}$.
3. Montrer que pour tous réels $a > 0$ et $b > 0$, $\frac{a}{b} + \frac{b}{a} \geq 2$.

:::corrige
1. $a^2 + b^2 - 2ab = (a - b)^2 \geq 0$.
2. $x + 1 - 2\sqrt{x} = \left(\sqrt{x} - 1\right)^2 \geq 0$.
3. Avec $t = \frac{a}{b} > 0$ : $t + \frac{1}{t} \geq 2$. Ou directement : $\frac{a}{b} + \frac{b}{a} - 2 = \frac{(a - b)^2}{ab} \geq 0$.
:::
:::

:::exercice Encadrer
On sait que $2 \leq x \leq 5$ et $-3 \leq y \leq -1$. Encadrer $x + y$, $x - y$, $xy$, $\frac{1}{x}$ et $x^2$.

:::corrige
- $x + y \in [-1 ; 4]$.
- $-y \in [1 ; 3]$, donc $x - y \in [3 ; 8]$.
- $x > 0$ et $-y > 0$ : $x(-y) \in [2 ; 15]$, donc $xy \in [-15 ; -2]$.
- $\frac{1}{x} \in \left[\frac{1}{5} ; \frac{1}{2}\right]$.
- $x^2 \in [4 ; 25]$.
:::
:::

:::exercice Inverses et carrés
Soit $a$ et $b$ deux réels tels que $0 < a < b$.

1. Ranger $\frac{1}{a}$ et $\frac{1}{b}$, puis $a^2$ et $b^2$, puis $\sqrt{a}$ et $\sqrt{b}$.
2. On suppose de plus $b < 1$. Ranger $b$, $b^2$ et $\sqrt{b}$.

:::corrige
1. $\frac{1}{b} < \frac{1}{a}$ ; $a^2 < b^2$ ; $\sqrt{a} < \sqrt{b}$.
2. Pour $0 < b < 1$ : $b^2 < b$ (multiplier $b < 1$ par $b$), et $b < \sqrt{b}$ (car $\sqrt{b}^2 = b$ et $\sqrt{b} < 1$). Donc $b^2 < b < \sqrt{b}$.
:::
:::
