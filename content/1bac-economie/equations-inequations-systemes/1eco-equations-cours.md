---
title: Équations, inéquations et systèmes — partie 1 : le second degré
kind: cours
summary: Trinôme du second degré, forme canonique, discriminant et racines, somme et produit des racines, factorisation, signe du trinôme, inéquations et équations qui se ramènent au second degré.
position: 10
visibility: public
---

## Le trinôme du second degré

:::definition
Un **trinôme du second degré** est une expression $P(x) = ax^2 + bx + c$ avec $a \neq 0$. Son **discriminant** est le réel $\Delta = b^2 - 4ac$.
:::

:::propriete
**Forme canonique.** Pour tout réel $x$ :

$$
P(x) = a\left[\left(x + \frac{b}{2a}\right)^2 - \frac{\Delta}{4a^2}\right]
$$
:::

## Résoudre $ax^2 + bx + c = 0$

:::theoreme
- Si $\Delta > 0$ : deux solutions $x_1 = \frac{-b - \sqrt{\Delta}}{2a}$ et $x_2 = \frac{-b + \sqrt{\Delta}}{2a}$, et $P(x) = a(x - x_1)(x - x_2)$.
- Si $\Delta = 0$ : une solution double $x_0 = -\frac{b}{2a}$, et $P(x) = a(x - x_0)^2$.
- Si $\Delta < 0$ : aucune solution réelle, et $P(x)$ ne se factorise pas.
:::

:::exemple
$2x^2 - 5x + 2 = 0$ : $\Delta = 25 - 16 = 9$, $x_1 = \frac{5 - 3}{4} = \frac{1}{2}$ et $x_2 = \frac{5 + 3}{4} = 2$. Donc $2x^2 - 5x + 2 = 2\left(x - \frac{1}{2}\right)(x - 2) = (2x - 1)(x - 2)$.
:::

**Discriminant réduit.** Quand $b = 2b'$ est pair, on peut calculer $\Delta' = b'^2 - ac$ : les solutions sont $\frac{-b' \pm \sqrt{\Delta'}}{a}$. Par exemple, pour $x^2 - 6x + 7 = 0$ : $\Delta' = 9 - 7 = 2$, et $x = 3 \pm \sqrt{2}$.

## Somme et produit des racines

:::propriete
Si $\Delta \geq 0$, les racines $x_1$ et $x_2$ vérifient :

$$
x_1 + x_2 = -\frac{b}{a} \qquad x_1 x_2 = \frac{c}{a}
$$

Réciproquement, deux nombres de somme $S$ et de produit $P$ sont les solutions de $x^2 - Sx + P = 0$.
:::

:::exemple
- $x^2 - 7x + 10 = 0$ a pour racine évidente $2$ ; l’autre vaut $\frac{10}{2} = 5$.
- Deux nombres de somme $10$ et de produit $21$ sont solutions de $x^2 - 10x + 21 = 0$ : $\Delta = 100 - 84 = 16$, ce sont $3$ et $7$.
:::

## Signe du trinôme

:::propriete
- Si $\Delta > 0$ : $P(x)$ est du signe de $a$ à l’extérieur des racines, et du signe contraire entre les racines.
- Si $\Delta = 0$ : $P(x)$ est du signe de $a$, et s’annule en $x_0$.
- Si $\Delta < 0$ : $P(x)$ est toujours du signe de $a$.
:::

## Inéquations du second degré

:::exemple
$-x^2 + x + 6 \geq 0$ : $\Delta = 1 + 24 = 25$, les racines sont $\frac{-1 - 5}{-2} = 3$ et $\frac{-1 + 5}{-2} = -2$. Comme $a = -1 < 0$, le trinôme est positif entre les racines : $S = [-2 ; 3]$.
:::

:::exemple
$x^2 + x + 1 > 0$ : $\Delta = 1 - 4 = -3 < 0$ et $a = 1 > 0$ : le trinôme est toujours positif, $S = \mathbb{R}$.
:::

## Équations et inéquations qui se ramènent au second degré

:::exemple
**Équation bicarrée.** $x^4 - 5x^2 + 4 = 0$ : on pose $X = x^2$, avec $X \geq 0$. Alors $X^2 - 5X + 4 = 0$, donc $X = 1$ ou $X = 4$, et $x \in \{-2 ; -1 ; 1 ; 2\}$.
:::

:::exemple
**Avec une fraction.** $\frac{x + 2}{x - 1} = 2x$, pour $x \neq 1$ : $x + 2 = 2x^2 - 2x$, soit $2x^2 - 3x - 2 = 0$. $\Delta = 9 + 16 = 25$, $x = \frac{3 + 5}{4} = 2$ ou $x = \frac{3 - 5}{4} = -\frac{1}{2}$. Les deux valeurs sont différentes de $1$ : $S = \left\{-\frac{1}{2} ; 2\right\}$.
:::

:::exemple
**Inéquation-quotient.** $\frac{x^2 - 4}{x - 3} \leq 0$, pour $x \neq 3$. Le numérateur est négatif sur $]-2 ; 2[$ et positif à l’extérieur ; le dénominateur est négatif avant $3$ et positif après.

- Sur $]-\infty ; -2]$ : numérateur $\geq 0$, dénominateur $< 0$ : quotient $\leq 0$.
- Sur $]-2 ; 2[$ : numérateur $< 0$, dénominateur $< 0$ : quotient $> 0$.
- Sur $[2 ; 3[$ : numérateur $\geq 0$, dénominateur $< 0$ : quotient $\leq 0$.
- Sur $]3 ; +\infty[$ : quotient $> 0$.

Donc $S = ]-\infty ; -2] \cup [2 ; 3[$.
:::

:::attention
Dans une inéquation, on ne multiplie jamais les deux membres par une expression dont on ne connaît pas le signe : on passe tout dans un membre et on étudie le signe.
:::
