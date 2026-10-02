---
title: Limite d’une suite : l’essentiel
kind: resume
summary: Limites usuelles, opérations, formes indéterminées, limite de qⁿ et méthodes, sur une page.
position: 10
visibility: public
---

## Limites usuelles

$\lim n^p = +\infty$, $\lim \sqrt{n} = +\infty$, $\lim \frac{1}{n^p} = 0$, $\lim \frac{1}{\sqrt{n}} = 0$.

## Formes indéterminées

$+\infty - \infty$, $0 \times \infty$, $\frac{\infty}{\infty}$, $\frac{0}{0}$ : on **factorise par le terme le plus fort**. Une fraction de polynômes a la limite du quotient de ses termes de plus haut degré.

## Limite de qⁿ

:::propriete
- $q > 1$ : $q^n \to +\infty$ ;
- $-1 < q < 1$ : $q^n \to 0$ ;
- $q = 1$ : constante égale à $1$ ;
- $q \leq -1$ : pas de limite.
:::

Suite géométrique $u_0 q^n$ avec $-1 < q < 1$ : tend vers $0$. Somme $1 + q + \cdots + q^n \to \frac{1}{1 - q}$ si $-1 < q < 1$.

## Comparaison

Si $u_n \geq v_n$ et $v_n \to +\infty$, alors $u_n \to +\infty$. Gendarmes : $v_n \leq u_n \leq w_n$ avec $v_n$ et $w_n$ qui tendent vers $\ell$, alors $u_n \to \ell$.

:::attention
On ne conclut jamais directement sur une forme indéterminée : on transforme d’abord l’écriture.
:::
