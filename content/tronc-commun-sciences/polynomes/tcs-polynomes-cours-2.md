---
title: Les polynômes — partie 2 : division par x − a et factorisation
kind: cours
summary: Factorisation par x − a quand a est racine, division par x − a par identification ou par la division posée, reste de la division, signe d’un polynôme factorisé et inéquations.
position: 20
visibility: public
---

## Factoriser par $x - a$

:::theoreme
Soit $P$ un polynôme de degré $n \geq 1$ et $a$ un réel. $a$ est une racine de $P$ si et seulement s’il existe un polynôme $Q$ de degré $n - 1$ tel que :

$$
P(x) = (x - a)Q(x) \quad \text{pour tout réel } x
$$
:::

:::propriete
Plus généralement, la division de $P$ par $x - a$ s’écrit $P(x) = (x - a)Q(x) + r$, et le **reste** $r$ vaut $P(a)$.
:::

## Trouver $Q$ par identification

:::exemple
$P(x) = x^3 - 2x^2 - 5x + 6$. On a $P(1) = 1 - 2 - 5 + 6 = 0$, donc $P(x) = (x - 1)(ax^2 + bx + c)$. En développant : $ax^3 + (b - a)x^2 + (c - b)x - c$. On identifie : $a = 1$, $b - a = -2$ donc $b = -1$, et $-c = 6$ donc $c = -6$ (on vérifie : $c - b = -5$). Ainsi $P(x) = (x - 1)(x^2 - x - 6) = (x - 1)(x - 3)(x + 2)$.
:::

## Trouver $Q$ par la division posée

On divise comme pour les entiers, en éliminant à chaque étape le terme de plus haut degré.

:::exemple
Division de $P(x) = 2x^3 + x^2 - 13x + 6$ par $x - 2$ :

1. $2x^3$ divisé par $x$ donne $2x^2$ ; $2x^2(x - 2) = 2x^3 - 4x^2$ ; on soustrait : il reste $5x^2 - 13x + 6$.
2. $5x^2$ divisé par $x$ donne $5x$ ; $5x(x - 2) = 5x^2 - 10x$ ; il reste $-3x + 6$.
3. $-3x$ divisé par $x$ donne $-3$ ; $-3(x - 2) = -3x + 6$ ; il reste $0$.

Donc $P(x) = (x - 2)(2x^2 + 5x - 3) = (x - 2)(2x - 1)(x + 3)$.
:::

## Signe d’un polynôme et inéquations

:::propriete
Une fois $P$ factorisé en produit de facteurs du premier degré (et de trinômes de signe constant), on étudie le signe de chaque facteur et on applique la règle des signes.
:::

:::exemple
$P(x) = (x - 1)(x - 3)(x + 2)$ s’annule en $-2$, $1$ et $3$.

- Sur $]-\infty ; -2[$ : trois facteurs négatifs, $P(x) < 0$.
- Sur $]-2 ; 1[$ : deux facteurs négatifs, $P(x) > 0$.
- Sur $]1 ; 3[$ : un facteur négatif, $P(x) < 0$.
- Sur $]3 ; +\infty[$ : tous positifs, $P(x) > 0$.

Donc $P(x) \geq 0 \iff x \in [-2 ; 1] \cup [3 ; +\infty[$.
:::

:::attention
Avant d’identifier, vérifiez toujours que $a$ est bien une racine : sinon la division donne un reste non nul.
:::
