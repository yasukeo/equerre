---
title: Racines carrées — partie 2 : règles de calcul
kind: cours
summary: Racine d’un produit et d’un quotient, simplifier une racine, additionner des racines, développer avec des racines, et rendre un dénominateur sans racine.
position: 20
visibility: public
---

## Produit et quotient

:::propriete
Pour $a \geq 0$ et $b > 0$ :

$$
\sqrt{a \times b} = \sqrt{a} \times \sqrt{b} \qquad \sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}}
$$
:::

:::exemple
$\sqrt{3} \times \sqrt{12} = \sqrt{36} = 6$ ; $\frac{\sqrt{50}}{\sqrt{2}} = \sqrt{25} = 5$.
:::

:::attention
Il n’y a pas de règle pour la somme : $\sqrt{9 + 16} = 5$, alors que $\sqrt{9} + \sqrt{16} = 7$.
:::

## Simplifier une racine

:::propriete
Pour écrire $\sqrt{n}$ sous la forme $a\sqrt{b}$, on cherche dans $n$ le plus grand carré parfait possible.
:::

:::exemple
- $\sqrt{18} = \sqrt{9 \times 2} = 3\sqrt{2}$.
- $\sqrt{75} = \sqrt{25 \times 3} = 5\sqrt{3}$.
- $\sqrt{8} + \sqrt{50} - \sqrt{32} = 2\sqrt{2} + 5\sqrt{2} - 4\sqrt{2} = 3\sqrt{2}$.
:::

## Développer avec des racines

:::exemple
- $\left(1 + \sqrt{3}\right)^2 = 1 + 2\sqrt{3} + 3 = 4 + 2\sqrt{3}$.
- $\left(\sqrt{5} - 1\right)\left(\sqrt{5} + 1\right) = 5 - 1 = 4$.
:::

## Dénominateur sans racine

:::propriete
- Pour $\frac{a}{\sqrt{b}}$, on multiplie le numérateur et le dénominateur par $\sqrt{b}$.
- Pour $\frac{a}{\sqrt{b} - c}$, on multiplie par l’**expression conjuguée** $\sqrt{b} + c$, et on utilise $(x - y)(x + y) = x^2 - y^2$.
:::

:::exemple
- $\frac{3}{\sqrt{3}} = \frac{3\sqrt{3}}{3} = \sqrt{3}$.
- $\frac{2}{\sqrt{5} - 1} = \frac{2\left(\sqrt{5} + 1\right)}{5 - 1} = \frac{\sqrt{5} + 1}{2}$.
:::
