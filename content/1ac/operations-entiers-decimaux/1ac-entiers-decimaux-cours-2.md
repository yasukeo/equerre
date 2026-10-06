---
title: Entiers et décimaux — partie 2 : division et priorités
kind: cours
summary: Division euclidienne, multiples et diviseurs, division décimale, diviser par 10, 100, 1 000, priorités des opérations et calculs avec parenthèses.
position: 20
visibility: public
---

## Division euclidienne

:::definition
Effectuer la **division euclidienne** d’un entier $a$ (le dividende) par un entier $b$ non nul (le diviseur), c’est trouver le **quotient** $q$ et le **reste** $r$ tels que $a = b \times q + r$, avec $r < b$.
:::

:::exemple
$47 = 6 \times 7 + 5$ : le quotient est $7$ et le reste $5$. Si le reste est nul, $b$ est un **diviseur** de $a$, et $a$ est un **multiple** de $b$ : $42 = 6 \times 7$.
:::

## Division décimale

:::propriete
- Quand le reste n’est pas nul, on peut continuer la division après la virgule en ajoutant des zéros au dividende.
- Diviser par $10$, $100$, $1\,000$ déplace la virgule de $1$, $2$, $3$ rangs vers la gauche.
:::

:::exemple
- $7 \div 4 = 1{,}75$.
- $365 \div 100 = 3{,}65$ et $8 \div 1\,000 = 0{,}008$.
:::

## Priorités des opérations

:::propriete
1. Les calculs entre parenthèses.
2. Les multiplications et les divisions, de gauche à droite.
3. Les additions et les soustractions, de gauche à droite.
:::

:::exemple
- $5 + 3 \times 4 = 5 + 12 = 17$.
- $(5 + 3) \times 4 = 8 \times 4 = 32$.
- $20 - 12 \div 4 + 2 = 20 - 3 + 2 = 19$.
:::

:::attention
Dans $5 + 3 \times 4$, on ne commence pas par l’addition : la multiplication est prioritaire.
:::
