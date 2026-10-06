---
title: Les polynômes — partie 1 : définitions et opérations
kind: cours
summary: Monômes et polynômes, degré et coefficients, égalité de deux polynômes et identification, somme et produit, racine d’un polynôme.
position: 10
visibility: public
---

## Monômes et polynômes

:::definition
- Un **monôme** est une expression $ax^n$, avec $a$ réel et $n$ entier naturel. Si $a \neq 0$, son degré est $n$.
- Un **polynôme** est une somme de monômes : $P(x) = a_nx^n + a_{n - 1}x^{n - 1} + \cdots + a_1x + a_0$. Les réels $a_k$ sont ses **coefficients**.
- Si $a_n \neq 0$, le **degré** de $P$ est $n$, noté $\deg P$. Le polynôme dont tous les coefficients sont nuls est le **polynôme nul** ; il n’a pas de degré.
:::

:::exemple
- $P(x) = 2x^3 - x + 5$ est de degré $3$, de coefficients $2$, $0$, $-1$ et $5$.
- $Q(x) = (x^2 + 1)(2x - 3) - 2x^3 = -3x^2 + 2x - 3$ est de degré $2$ : les termes en $x^3$ se sont annulés.
:::

## Égalité de deux polynômes

:::theoreme
Deux polynômes sont égaux (prennent la même valeur pour tout réel $x$) si et seulement s’ils ont le même degré et les mêmes coefficients.
:::

:::exemple
Trouver $a$, $b$, $c$ tels que, pour tout $x$, $ax^2 + (b - 1)x + c = 3x^2 + 2x - 4$. On identifie les coefficients : $a = 3$, $b - 1 = 2$, $c = -4$, donc $b = 3$.
:::

## Somme et produit

:::propriete
- La somme de deux polynômes est un polynôme ; son degré est au plus le plus grand des deux degrés.
- Le produit de deux polynômes non nuls est un polynôme, et $\deg(PQ) = \deg P + \deg Q$.
:::

:::exemple
$P(x) = x^2 - 3x + 1$ et $Q(x) = 2x + 4$ : $P(x) + Q(x) = x^2 - x + 5$ et $P(x)Q(x) = 2x^3 + 4x^2 - 6x^2 - 12x + 2x + 4 = 2x^3 - 2x^2 - 10x + 4$, de degré $1 + 2 = 3$.
:::

## Racine d’un polynôme

:::definition
Le réel $a$ est une **racine** du polynôme $P$ si $P(a) = 0$.
:::

:::exemple
$P(x) = x^3 - 3x^2 + 4$ : $P(2) = 8 - 12 + 4 = 0$ et $P(-1) = -1 - 3 + 4 = 0$. Les réels $2$ et $-1$ sont des racines de $P$.
:::

:::attention
Pour chercher une racine « évidente » d’un polynôme à coefficients entiers dont le coefficient dominant est $1$, on essaie les diviseurs du terme constant : $\pm 1$, $\pm 2$, …
:::
