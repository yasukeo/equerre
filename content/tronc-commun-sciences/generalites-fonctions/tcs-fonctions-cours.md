---
title: Généralités sur les fonctions — partie 1 : définition, parité, variations
kind: cours
summary: Fonction numérique et ensemble de définition, égalité de deux fonctions, parité et symétries de la courbe, sens de variation et taux de variation, extremums.
position: 10
visibility: public
---

## Ensemble de définition

:::definition
Une **fonction numérique** $f$ associe à chaque réel $x$ de son **ensemble de définition** $D_f$ un unique réel $f(x)$.
:::

:::propriete
On exclut les réels qui annulent un dénominateur et ceux qui rendent négative une expression sous une racine carrée.
:::

:::exemple
$f(x) = \frac{\sqrt{x - 1}}{x - 3}$ : il faut $x - 1 \geq 0$ et $x - 3 \neq 0$, donc $D_f = [1 ; 3[ \cup ]3 ; +\infty[$.
:::

## Égalité de deux fonctions

:::definition
Deux fonctions $f$ et $g$ sont **égales** si elles ont le même ensemble de définition $D$ et si $f(x) = g(x)$ pour tout $x$ de $D$.
:::

:::exemple
- $f(x) = \frac{x^2 - 1}{x - 1}$ et $g(x) = x + 1$ ne sont pas égales : $D_f = \mathbb{R} \setminus \{1\}$ et $D_g = \mathbb{R}$.
- $f(x) = \sqrt{x^2}$ et $g(x) = x$ ne sont pas égales : $f(-1) = 1$ et $g(-1) = -1$. En fait $f(x) = |x|$.
:::

## Parité

:::definition
Soit $f$ définie sur un ensemble $D$ symétrique par rapport à $0$.

- $f$ est **paire** si $f(-x) = f(x)$ pour tout $x \in D$ : sa courbe est symétrique par rapport à l’axe des ordonnées.
- $f$ est **impaire** si $f(-x) = -f(x)$ pour tout $x \in D$ : sa courbe est symétrique par rapport à l’origine.
:::

:::exemple
$f(x) = \frac{x}{x^2 - 4}$ est définie sur $\mathbb{R} \setminus \{-2 ; 2\}$, ensemble symétrique, et $f(-x) = \frac{-x}{x^2 - 4} = -f(x)$ : $f$ est impaire.
:::

## Sens de variation et taux de variation

:::definition
Pour $x_1 \neq x_2$ dans $D_f$, le **taux de variation** de $f$ entre $x_1$ et $x_2$ est $T = \frac{f(x_1) - f(x_2)}{x_1 - x_2}$.
:::

:::propriete
Soit $I$ un intervalle inclus dans $D_f$.

- $f$ est croissante sur $I$ si et seulement si $T \geq 0$ pour tous $x_1 \neq x_2$ de $I$ ; strictement croissante si $T > 0$.
- $f$ est décroissante sur $I$ si et seulement si $T \leq 0$ ; strictement décroissante si $T < 0$.
:::

:::exemple
$f(x) = x^2 - 4x$ : $T = \frac{x_1^2 - x_2^2 - 4(x_1 - x_2)}{x_1 - x_2} = x_1 + x_2 - 4$.

- Sur $]-\infty ; 2]$, pour $x_1 \neq x_2$, $x_1 + x_2 < 4$, donc $T < 0$ : $f$ est strictement décroissante.
- Sur $[2 ; +\infty[$, $x_1 + x_2 > 4$, donc $T > 0$ : $f$ est strictement croissante.
:::

## Extremums

:::definition
$f(a)$ est le **maximum** de $f$ sur $I$ si $f(x) \leq f(a)$ pour tout $x \in I$, et le **minimum** si $f(x) \geq f(a)$ pour tout $x \in I$.
:::

:::exemple
$f(x) = x^2 - 4x + 7 = (x - 2)^2 + 3 \geq 3 = f(2)$ : le minimum de $f$ sur $\mathbb{R}$ est $3$, atteint en $2$.
:::
