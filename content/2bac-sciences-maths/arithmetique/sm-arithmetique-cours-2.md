---
title: Arithmétique dans ℤ — partie 2 : PGCD, Bézout, Gauss, Fermat
kind: cours
summary: PGCD et PPCM, algorithme d’Euclide, nombres premiers entre eux, théorèmes de Bézout et de Gauss, équations ax + by = c, petit théorème de Fermat et inverse modulo n.
position: 20
visibility: public
---

## PGCD et PPCM

:::definition
Le **PGCD** de deux entiers non nuls $a$ et $b$, noté $a \wedge b$, est le plus grand diviseur positif commun à $a$ et à $b$. Leur **PPCM**, noté $a \vee b$, est le plus petit multiple strictement positif commun.
:::

:::propriete
- Les diviseurs communs à $a$ et $b$ sont les diviseurs de $a \wedge b$.
- Pour $a$, $b$ positifs : $(a \wedge b) \times (a \vee b) = ab$.
- $(ka) \wedge (kb) = k(a \wedge b)$ pour $k > 0$.
:::

### Algorithme d’Euclide

:::propriete
Si $a = bq + r$, alors $a \wedge b = b \wedge r$. En répétant des divisions euclidiennes, le PGCD est le dernier reste non nul.
:::

:::exemple
$$
\begin{aligned} 252 &= 198 \times 1 + 54 \\ 198 &= 54 \times 3 + 36 \\ 54 &= 36 \times 1 + 18 \\ 36 &= 18 \times 2 + 0 \end{aligned}
$$

Le dernier reste non nul est $18$ : $252 \wedge 198 = 18$, et $252 \vee 198 = \frac{252 \times 198}{18} = 2772$.
:::

## Bézout et Gauss

:::definition
$a$ et $b$ sont **premiers entre eux** si $a \wedge b = 1$.
:::

:::theoreme
**Bézout.** $a$ et $b$ sont premiers entre eux si et seulement s’il existe des entiers $u$ et $v$ tels que $au + bv = 1$.

Plus généralement, il existe toujours des entiers $u$ et $v$ tels que $au + bv = a \wedge b$.
:::

:::exemple
En remontant l’algorithme d’Euclide pour $252$ et $198$ : $18 = 54 - 36 = 54 - (198 - 3 \times 54) = 4 \times 54 - 198 = 4(252 - 198) - 198 = 4 \times 252 - 5 \times 198$.
:::

:::theoreme
**Gauss.** Si $a \mid bc$ et si $a \wedge b = 1$, alors $a \mid c$.
:::

:::propriete
- Si $a \mid n$, $b \mid n$ et $a \wedge b = 1$, alors $ab \mid n$.
- Si un nombre premier $p$ divise un produit $ab$, il divise $a$ ou $b$.
:::

## Équations ax + by = c

:::propriete
L’équation $ax + by = c$, d’inconnues entières $x$ et $y$, a des solutions si et seulement si $a \wedge b$ divise $c$.
:::

### Méthode

1. Vérifier que $d = a \wedge b$ divise $c$, puis diviser l’équation par $d$ : on se ramène à $a'x + b'y = c'$ avec $a' \wedge b' = 1$.
2. Trouver une solution particulière $(x_0 ; y_0)$ (par Bézout ou à vue).
3. Soustraire : $a'(x - x_0) = -b'(y - y_0)$ ; par Gauss, $b' \mid x - x_0$, donc $x = x_0 + b'k$ et $y = y_0 - a'k$, $k \in \mathbb{Z}$.

:::exemple
$5x + 3y = 1$ : $(x_0 ; y_0) = (2 ; -3)$. Alors $5(x - 2) = -3(y + 3)$ ; $5 \wedge 3 = 1$, donc $3 \mid x - 2$ : $x = 2 + 3k$, et $y = -3 - 5k$, $k \in \mathbb{Z}$.
:::

## Petit théorème de Fermat

:::theoreme
Soit $p$ un nombre premier et $a$ un entier.

- Si $p$ ne divise pas $a$, alors $a^{p - 1} \equiv 1 \ [p]$.
- Pour tout entier $a$, $a^p \equiv a \ [p]$.
:::

:::exemple
$3^{100}$ modulo $7$ : $7$ est premier et ne divise pas $3$, donc $3^6 \equiv 1 \ [7]$. $100 = 6 \times 16 + 4$, donc $3^{100} \equiv 3^4 = 81 \equiv 4 \ [7]$.
:::

## Inverse modulo n

Si $a \wedge n = 1$, Bézout donne $au + nv = 1$, donc $au \equiv 1 \ [n]$ : $u$ est un **inverse** de $a$ modulo $n$. Il permet de résoudre $ax \equiv b \ [n]$ : $x \equiv ub \ [n]$.

:::exemple
$3x \equiv 2 \ [7]$ : $3 \times 5 = 15 \equiv 1 \ [7]$, donc $x \equiv 5 \times 2 = 10 \equiv 3 \ [7]$.
:::

:::attention
On ne peut pas « simplifier » une congruence par un nombre qui n’est pas premier avec le module : $2 \times 3 \equiv 2 \times 1 \ [4]$, mais $3 \not\equiv 1 \ [4]$.
:::
