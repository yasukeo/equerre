---
title: Arithmétique dans ℤ : l’essentiel
kind: resume
summary: Divisibilité, congruences, nombres premiers, PGCD, Bézout, Gauss, équations ax + by = c et Fermat, sur une page.
position: 10
visibility: public
---

## Divisibilité et division euclidienne

$b \mid a \iff a = kb$. Si $d \mid a$ et $d \mid b$, alors $d \mid au + bv$. Division euclidienne : $a = bq + r$ avec $0 \leq r < b$ (reste toujours positif).

## Congruences

:::propriete
$a \equiv b \ [n] \iff n \mid a - b$. On peut additionner, multiplier et élever à une puissance des congruences de même module. Chercher une puissance $a^k \equiv 1 \ [n]$ pour réduire $a^N$.
:::

## Nombres premiers

Pour savoir si $n$ est premier, tester les premiers $p$ avec $p^2 \leq n$. Décomposition unique $n = p_1^{\alpha_1}\cdots p_k^{\alpha_k}$ ; nombre de diviseurs $(\alpha_1 + 1)\cdots(\alpha_k + 1)$.

## PGCD, Bézout, Gauss

:::theoreme
- Euclide : $a \wedge b = b \wedge r$ ; le PGCD est le dernier reste non nul. $(a \wedge b)(a \vee b) = ab$.
- **Bézout** : $a \wedge b = 1 \iff$ il existe $u$, $v$ avec $au + bv = 1$.
- **Gauss** : $a \mid bc$ et $a \wedge b = 1$ $\Rightarrow$ $a \mid c$.
- **Fermat** : $p$ premier, $p \nmid a$ $\Rightarrow$ $a^{p - 1} \equiv 1 \ [p]$ ; toujours $a^p \equiv a \ [p]$.
:::

## Équation ax + by = c

Solutions si et seulement si $a \wedge b \mid c$. Diviser par le PGCD, trouver une solution particulière, puis appliquer Gauss : $x = x_0 + b'k$, $y = y_0 - a'k$.

:::attention
On ne simplifie une congruence par $a$ que si $a$ est premier avec le module : on multiplie alors par un inverse de $a$ modulo $n$.
:::
