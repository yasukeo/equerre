---
title: Équations, inéquations et systèmes — partie 1 : équations et inéquations
kind: cours
summary: Équations du premier degré, équations produit et quotient, signe de ax + b et inéquations, puis le second degré : discriminant, racines, factorisation, signe du trinôme et inéquations.
position: 10
visibility: public
---

## Équations du premier degré, produit et quotient

:::propriete
- $ax + b = 0$ avec $a \neq 0$ a une unique solution : $x = -\frac{b}{a}$.
- **Équation produit** : $A \times B = 0 \iff A = 0$ ou $B = 0$.
- **Équation quotient** : $\frac{A}{B} = 0 \iff A = 0$ et $B \neq 0$.
:::

:::exemple
- $(2x - 1)(x + 3) = 0 \iff x = \frac{1}{2}$ ou $x = -3$.
- $\frac{x - 1}{x + 2} = 0 \iff x = 1$ (et $1 \neq -2$).
- $x^2 - 9 = (x - 3)(2x + 1) \iff (x - 3)(x + 3) - (x - 3)(2x + 1) = 0 \iff (x - 3)(2 - x) = 0 \iff x = 3$ ou $x = 2$.
:::

## Signe de $ax + b$ et inéquations

:::propriete
Pour $a \neq 0$, $ax + b$ s’annule en $-\frac{b}{a}$ ; il est du **signe de $a$** à droite de ce nombre, et du signe contraire à gauche.
:::

:::exemple
- $-2x + 6$ s’annule en $3$ ; $a = -2 < 0$ : positif pour $x < 3$, négatif pour $x > 3$.
- $(x - 1)(3 - x) \geq 0$ : le premier facteur est positif pour $x > 1$, le second pour $x < 3$. Le produit est positif ou nul sur $[1 ; 3]$, et négatif ailleurs : $S = [1 ; 3]$.
- $\frac{x - 2}{x + 1} \geq 0$, pour $x \neq -1$ : le quotient est positif quand les deux termes ont le même signe, soit $x < -1$ ou $x > 2$, et nul en $2$ : $S = ]-\infty ; -1[ \cup [2 ; +\infty[$.
:::

:::attention
Quand on multiplie ou divise une inéquation par un nombre négatif, on change son sens : $-3x < 6 \iff x > -2$.
:::

## Le second degré

:::theoreme
Soit $ax^2 + bx + c = 0$ avec $a \neq 0$, et $\Delta = b^2 - 4ac$.

- Si $\Delta > 0$ : deux solutions $\frac{-b - \sqrt{\Delta}}{2a}$ et $\frac{-b + \sqrt{\Delta}}{2a}$, et $ax^2 + bx + c = a(x - x_1)(x - x_2)$.
- Si $\Delta = 0$ : une solution double $-\frac{b}{2a}$, et $ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2$.
- Si $\Delta < 0$ : aucune solution réelle.
:::

:::exemple
$2x^2 - 5x + 2 = 0$ : $\Delta = 25 - 16 = 9$, solutions $\frac{5 - 3}{4} = \frac{1}{2}$ et $\frac{5 + 3}{4} = 2$, et $2x^2 - 5x + 2 = (2x - 1)(x - 2)$.
:::

:::propriete
**Somme et produit.** Si $\Delta \geq 0$ : $x_1 + x_2 = -\frac{b}{a}$ et $x_1x_2 = \frac{c}{a}$.

**Signe du trinôme.** $ax^2 + bx + c$ est du signe de $a$, sauf entre les racines quand $\Delta > 0$.
:::

:::exemple
- $x^2 - x - 6 < 0$ : racines $-2$ et $3$, $a > 0$ : négatif entre les racines, $S = ]-2 ; 3[$.
- $x^2 + x + 1 > 0$ : $\Delta = -3 < 0$ et $a > 0$ : toujours vrai, $S = \mathbb{R}$.
:::
