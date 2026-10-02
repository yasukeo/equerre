---
title: Arithmétique dans ℤ — partie 2 : PGCD et PPCM
kind: cours
summary: Diviseurs communs et PGCD, multiples communs et PPCM, algorithme d’Euclide, PGCD et PPCM par la décomposition en facteurs premiers, nombres premiers entre eux, problèmes concrets.
position: 20
visibility: public
---

## PGCD

:::definition
Soit $a$ et $b$ deux entiers non nuls. Le **plus grand commun diviseur** de $a$ et $b$, noté $a \wedge b$ ou $\operatorname{PGCD}(a ; b)$, est le plus grand entier naturel qui divise à la fois $a$ et $b$.
:::

:::propriete
- Les diviseurs communs à $a$ et $b$ sont exactement les diviseurs de $a \wedge b$.
- $a \wedge b = b \wedge a$, $a \wedge b = |a| \wedge |b|$, et si $b \mid a$, $a \wedge b = |b|$.
- Pour $k > 0$, $(ka) \wedge (kb) = k(a \wedge b)$.
:::

## Algorithme d’Euclide

:::propriete
Si $a = bq + r$ (division euclidienne), alors $a \wedge b = b \wedge r$. On répète les divisions : le PGCD est le **dernier reste non nul**.
:::

:::exemple
$\begin{aligned} 840 &= 300 \times 2 + 240 \\ 300 &= 240 \times 1 + 60 \\ 240 &= 60 \times 4 + 0 \end{aligned}$

Le dernier reste non nul est $60$ : $840 \wedge 300 = 60$.
:::

## PPCM

:::definition
Le **plus petit commun multiple** de $a$ et $b$ (non nuls), noté $a \vee b$ ou $\operatorname{PPCM}(a ; b)$, est le plus petit entier strictement positif multiple de $a$ et de $b$.
:::

:::propriete
- Les multiples communs à $a$ et $b$ sont les multiples de $a \vee b$.
- Pour $a$, $b$ positifs : $(a \wedge b) \times (a \vee b) = ab$.
:::

:::exemple
$840 \vee 300 = \frac{840 \times 300}{60} = 4\,200$.
:::

## Avec la décomposition en facteurs premiers

:::propriete
Si $a = \prod p_i^{\alpha_i}$ et $b = \prod p_i^{\beta_i}$ (avec des exposants éventuellement nuls) :

- $a \wedge b = \prod p_i^{\min(\alpha_i, \beta_i)}$ : on prend chaque facteur commun avec le **plus petit** exposant ;
- $a \vee b = \prod p_i^{\max(\alpha_i, \beta_i)}$ : on prend chaque facteur avec le **plus grand** exposant.
:::

:::exemple
$840 = 2^3 \times 3 \times 5 \times 7$ et $300 = 2^2 \times 3 \times 5^2$ : $840 \wedge 300 = 2^2 \times 3 \times 5 = 60$ et $840 \vee 300 = 2^3 \times 3 \times 5^2 \times 7 = 4\,200$.
:::

## Nombres premiers entre eux

:::definition
$a$ et $b$ sont **premiers entre eux** si $a \wedge b = 1$ : leur seul diviseur commun positif est $1$.
:::

:::exemple
$35$ et $12$ sont premiers entre eux ; deux entiers consécutifs $n$ et $n + 1$ le sont toujours, car un diviseur commun divise leur différence $1$.
:::

:::propriete
Une fraction $\frac{a}{b}$ est **irréductible** si et seulement si $a$ et $b$ sont premiers entre eux. Pour la simplifier, on divise $a$ et $b$ par $a \wedge b$.
:::

:::exemple
$\frac{840}{300} = \frac{840 \div 60}{300 \div 60} = \frac{14}{5}$.
:::

:::attention
Le PGCD sert à **partager** en parts égales le plus grandes possible ; le PPCM à trouver la **première fois** que deux phénomènes périodiques coïncident.
:::
