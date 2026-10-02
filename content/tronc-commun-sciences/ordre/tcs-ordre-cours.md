---
title: L’ordre dans ℝ — partie 1 : ordre et opérations
kind: cours
summary: Comparer deux réels par le signe de leur différence, ordre et addition, ordre et multiplication, produits d’inégalités, inverses, carrés et racines carrées, inégalités classiques.
position: 10
visibility: public
---

## Comparer deux réels

:::definition
Pour deux réels $a$ et $b$ : $a \leq b$ signifie $b - a \geq 0$, et $a < b$ signifie $b - a > 0$.
:::

:::exemple
Comparer $\frac{5}{7}$ et $\frac{7}{9}$ : $\frac{5}{7} - \frac{7}{9} = \frac{45 - 49}{63} = -\frac{4}{63} < 0$, donc $\frac{5}{7} < \frac{7}{9}$.
:::

## Ordre et addition, ordre et multiplication

:::propriete
Pour tous réels $a$, $b$, $c$, $d$ :

- $a \leq b \iff a + c \leq b + c$ ;
- si $c > 0$ : $a \leq b \iff ac \leq bc$ ;
- si $c < 0$ : $a \leq b \iff ac \geq bc$ (le sens **change**) ;
- si $a \leq b$ et $c \leq d$, alors $a + c \leq b + d$ ;
- si $0 \leq a \leq b$ et $0 \leq c \leq d$, alors $ac \leq bd$.
:::

:::attention
On ne soustrait pas deux inégalités membre à membre, et on ne multiplie membre à membre que des inégalités entre nombres **positifs**.
:::

## Inverses, carrés et racines

:::propriete
Pour des réels **strictement positifs** $a$ et $b$ :

- $a \leq b \iff \frac{1}{a} \geq \frac{1}{b}$ ;
- $a \leq b \iff a^2 \leq b^2$ ;
- $a \leq b \iff \sqrt{a} \leq \sqrt{b}$.
:::

:::exemple
- Comparer $2\sqrt{3}$ et $3\sqrt{2}$ : ce sont deux positifs, de carrés $12$ et $18$. Comme $12 < 18$, $2\sqrt{3} < 3\sqrt{2}$.
- Si $0 < a < 1$, alors $a^2 < a$ (on multiplie $a < 1$ par $a > 0$).
:::

## Deux inégalités classiques

:::propriete
- Pour tous réels $a$ et $b$ : $a^2 + b^2 \geq 2ab$.
- Pour tout réel $a > 0$ : $a + \frac{1}{a} \geq 2$.
:::

:::exemple
- $a^2 + b^2 - 2ab = (a - b)^2 \geq 0$.
- $a + \frac{1}{a} - 2 = \frac{a^2 - 2a + 1}{a} = \frac{(a - 1)^2}{a} \geq 0$, car $a > 0$.
:::
