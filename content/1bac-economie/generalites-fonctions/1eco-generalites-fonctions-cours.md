---
title: Généralités sur les fonctions — partie 1 : vocabulaire et propriétés
kind: cours
summary: Ensemble de définition, égalité de fonctions, parité, fonctions majorées, minorées, bornées, extremums, sens de variation, taux de variation, comparaison et composition de fonctions.
position: 10
visibility: public
---

## Ensemble de définition

:::definition
L’**ensemble de définition** $D_f$ d’une fonction $f$ est l’ensemble des réels $x$ pour lesquels $f(x)$ existe.
:::

:::exemple
- $f(x) = \frac{2x + 1}{x^2 - 4}$ : il faut $x^2 \neq 4$, donc $D_f = \mathbb{R} \setminus \{-2 ; 2\}$.
- $g(x) = \sqrt{3 - x}$ : il faut $3 - x \geq 0$, donc $D_g = ]-\infty ; 3]$.
:::

:::definition
Deux fonctions $f$ et $g$ sont **égales** si elles ont le même ensemble de définition $D$ et si $f(x) = g(x)$ pour tout $x \in D$.
:::

## Parité

:::definition
Soit $f$ définie sur un ensemble $D$ symétrique par rapport à $0$ (si $x \in D$, alors $-x \in D$).

- $f$ est **paire** si $f(-x) = f(x)$ pour tout $x \in D$ : sa courbe est symétrique par rapport à l’axe des ordonnées.
- $f$ est **impaire** si $f(-x) = -f(x)$ pour tout $x \in D$ : sa courbe est symétrique par rapport à l’origine.
:::

:::exemple
$f(x) = x^4 - 3x^2$ est paire ; $g(x) = x^3 - \frac{1}{x}$ est impaire ; $h(x) = x^2 + x$ n’est ni paire ni impaire ($h(1) = 2$, $h(-1) = 0$).
:::

## Fonctions majorées, minorées, bornées

:::definition
Soit $f$ définie sur $I$.

- $f$ est **majorée** sur $I$ s’il existe un réel $M$ tel que $f(x) \leq M$ pour tout $x \in I$.
- $f$ est **minorée** sur $I$ s’il existe un réel $m$ tel que $f(x) \geq m$ pour tout $x \in I$.
- $f$ est **bornée** si elle est majorée et minorée.
- $f$ admet un **maximum** en $a$ si $f(x) \leq f(a)$ pour tout $x \in I$ ; un **minimum** si $f(x) \geq f(a)$.
:::

:::exemple
$f(x) = \frac{1}{x^2 + 1}$ est bornée sur $\mathbb{R}$ : $0 < f(x) \leq 1$, et son maximum est $f(0) = 1$.
:::

## Sens de variation

:::definition
$f$ est **croissante** sur $I$ si pour tous $a < b$ de $I$, $f(a) \leq f(b)$ ; **décroissante** si $f(a) \geq f(b)$ ; **strictement** avec des inégalités strictes.
:::

:::propriete
Le **taux de variation** de $f$ entre $a$ et $b$ ($a \neq b$) est $T = \frac{f(b) - f(a)}{b - a}$. $f$ est croissante sur $I$ si et seulement si $T \geq 0$ pour tous $a \neq b$ de $I$, et décroissante si $T \leq 0$.
:::

:::exemple
$f(x) = x^2$ : $T = \frac{b^2 - a^2}{b - a} = a + b$. Sur $[0 ; +\infty[$, $a + b \geq 0$ : $f$ est croissante ; sur $]-\infty ; 0]$, $a + b \leq 0$ : $f$ est décroissante.
:::

## Comparaison et composition

:::definition
- $f \leq g$ sur $I$ si $f(x) \leq g(x)$ pour tout $x \in I$ : la courbe de $f$ est au-dessous de celle de $g$.
- La **composée** $g \circ f$ est définie par $(g \circ f)(x) = g(f(x))$, pour les $x$ tels que $f(x)$ soit dans l’ensemble de définition de $g$.
:::

:::propriete
Si $f$ est monotone sur $I$ et $g$ monotone sur un intervalle contenant $f(I)$, alors $g \circ f$ est monotone sur $I$ : **croissante** si $f$ et $g$ ont le même sens de variation, **décroissante** sinon.
:::

:::exemple
$h(x) = \sqrt{x^2 + 1}$ est $g \circ f$ avec $f(x) = x^2 + 1$ et $g(x) = \sqrt{x}$. Sur $[0 ; +\infty[$, $f$ et $g$ sont croissantes : $h$ est croissante ; sur $]-\infty ; 0]$, $f$ est décroissante : $h$ est décroissante.
:::
