---
title: L’ordre dans ℝ — partie 2 : intervalles, valeur absolue, encadrements
kind: cours
summary: Intervalles, réunion et intersection, valeur absolue et distance, équations et inéquations avec une valeur absolue, encadrements d’une somme, d’un produit, d’un inverse, valeurs approchées.
position: 20
visibility: public
---

## Intervalles

:::definition
Pour $a < b$ :

- $[a ; b]$ est l’ensemble des $x$ tels que $a \leq x \leq b$ ; $]a ; b[$ celui des $x$ tels que $a < x < b$ ;
- $[a ; b[$ et $]a ; b]$ sont semi-ouverts ;
- $[a ; +\infty[$ est l’ensemble des $x \geq a$ ; $]-\infty ; b[$ celui des $x < b$.
:::

:::exemple
$[-2 ; 5] \cap [1 ; 7] = [1 ; 5]$ (les réels dans les deux intervalles) et $[-2 ; 5] \cup [1 ; 7] = [-2 ; 7]$ (les réels dans l’un au moins).
:::

## Valeur absolue

:::definition
La **valeur absolue** de $x$ est $|x| = x$ si $x \geq 0$, et $|x| = -x$ si $x < 0$. C’est la distance entre $0$ et $x$ sur la droite graduée ; $|x - a|$ est la distance entre $x$ et $a$.
:::

:::propriete
- $|x| \geq 0$ ; $|-x| = |x|$ ; $|xy| = |x||y|$ ; $\sqrt{x^2} = |x|$.
- Pour $r > 0$ : $|x - a| \leq r \iff a - r \leq x \leq a + r$, c’est-à-dire $x \in [a - r ; a + r]$.
- $|x - a| = r \iff x = a - r$ ou $x = a + r$.
:::

:::exemple
- $|3 - \pi| = \pi - 3$, car $3 - \pi < 0$.
- $|x - 3| = 2 \iff x = 1$ ou $x = 5$.
- $|2x + 1| \leq 3 \iff -3 \leq 2x + 1 \leq 3 \iff -2 \leq x \leq 1$.
- $|x - 1| > 4 \iff x < -3$ ou $x > 5$.
:::

## Encadrements

:::propriete
Si $a \leq x \leq b$ et $c \leq y \leq d$ :

- $a + c \leq x + y \leq b + d$ ;
- $-d \leq -y \leq -c$, donc $a - d \leq x - y \leq b - c$ ;
- si $a > 0$ et $c > 0$ : $ac \leq xy \leq bd$ et $\frac{1}{b} \leq \frac{1}{x} \leq \frac{1}{a}$.
:::

:::exemple
Avec $1{,}41 < \sqrt{2} < 1{,}42$ et $1{,}73 < \sqrt{3} < 1{,}74$ : $3{,}14 < \sqrt{2} + \sqrt{3} < 3{,}16$, et $0{,}31 < \sqrt{3} - \sqrt{2} < 0{,}33$.
:::

## Valeurs approchées

:::definition
Si $a \leq x \leq a + r$ (avec $r > 0$), on dit que $a$ est une **valeur approchée par défaut** de $x$ à $r$ près, et $a + r$ une **valeur approchée par excès** à $r$ près.
:::

:::exemple
$1{,}414 < \sqrt{2} < 1{,}415$ : $1{,}414$ est une valeur approchée de $\sqrt{2}$ par défaut à $10^{-3}$ près, et $1{,}415$ par excès.
:::
