---
title: Généralités sur les fonctions — partie 1 : définition, parité, variations
kind: cours
summary: Fonction, image et antécédent, ensemble de définition, courbe représentative, fonctions paires et impaires, sens de variation et extremums.
position: 10
visibility: public
---

## Fonction, image, antécédent

:::definition
Une **fonction** $f$ associe à chaque réel $x$ d’un ensemble $D_f$ un **unique** réel noté $f(x)$, appelé **image** de $x$. Si $f(a) = b$, on dit que $a$ est **un antécédent** de $b$.
:::

:::exemple
$f(x) = x^2 - 2x$ : l’image de $3$ est $f(3) = 9 - 6 = 3$. Les antécédents de $0$ sont les solutions de $x^2 - 2x = 0$, soit $x(x - 2) = 0$ : ce sont $0$ et $2$.
:::

:::attention
Un nombre a toujours **une seule** image, mais il peut avoir zéro, un ou plusieurs antécédents.
:::

## Ensemble de définition

:::propriete
- Un polynôme est défini sur $\mathbb{R}$.
- Une fraction est définie quand son **dénominateur n’est pas nul**.
- Une racine carrée $\sqrt{A}$ est définie quand $A \geq 0$.
:::

:::exemple
- $f(x) = \frac{x + 1}{x - 3}$ : il faut $x - 3 \neq 0$, donc $D_f = \mathbb{R} \setminus \{3\}$.
- $g(x) = \sqrt{2x - 4}$ : il faut $2x - 4 \geq 0$, soit $x \geq 2$, donc $D_g = [2 ; +\infty[$.
- $h(x) = \frac{1}{x^2 - 4}$ : $x^2 - 4 = 0 \iff x = 2$ ou $x = -2$, donc $D_h = \mathbb{R} \setminus \{-2 ; 2\}$.
:::

## Courbe représentative

:::definition
Dans un repère, la **courbe représentative** $C_f$ de $f$ est l’ensemble des points $M(x ; y)$ avec $x \in D_f$ et $y = f(x)$.
:::

:::exemple
Pour $f(x) = x^2 - 2x$ : $A(3 ; 3)$ est sur $C_f$ car $f(3) = 3$ ; $B(1 ; 1)$ n’y est pas car $f(1) = -1 \neq 1$.
:::

## Parité

:::definition
Soit $f$ définie sur un ensemble $D_f$ **symétrique par rapport à $0$** (si $x$ est dans $D_f$, $-x$ aussi).

- $f$ est **paire** si $f(-x) = f(x)$ pour tout $x$ de $D_f$ : sa courbe est symétrique par rapport à l’**axe des ordonnées**.
- $f$ est **impaire** si $f(-x) = -f(x)$ pour tout $x$ de $D_f$ : sa courbe est symétrique par rapport à l’**origine** $O$.
:::

:::exemple
- $f(x) = x^2 - 3$ : $f(-x) = (-x)^2 - 3 = x^2 - 3 = f(x)$ : paire.
- $g(x) = x^3 - x$ : $g(-x) = -x^3 + x = -g(x)$ : impaire.
- $h(x) = x^2 + x$ : $h(1) = 2$ et $h(-1) = 0$ ; ni $h(-1) = h(1)$, ni $h(-1) = -h(1)$ : ni paire ni impaire.
:::

## Sens de variation

:::definition
Soit $f$ définie sur un intervalle $I$.

- $f$ est **croissante** sur $I$ si pour tous $a < b$ de $I$, $f(a) \leq f(b)$ : quand $x$ augmente, $f(x)$ augmente.
- $f$ est **décroissante** sur $I$ si pour tous $a < b$ de $I$, $f(a) \geq f(b)$ : quand $x$ augmente, $f(x)$ diminue.
:::

:::exemple
- $f(x) = 3x - 1$ : si $a < b$, alors $3a < 3b$ et $3a - 1 < 3b - 1$ : $f$ est croissante sur $\mathbb{R}$.
- $g(x) = x^2$ sur $[0 ; +\infty[$ : si $0 \leq a < b$, alors $a^2 < b^2$ : $g$ est croissante sur $[0 ; +\infty[$.
:::

## Maximum et minimum

:::definition
- $M = f(a)$ est le **maximum** de $f$ sur $I$ si $f(x) \leq M$ pour tout $x$ de $I$.
- $m = f(b)$ est le **minimum** de $f$ sur $I$ si $f(x) \geq m$ pour tout $x$ de $I$.
:::

:::exemple
$f(x) = x^2 + 1$ : pour tout $x$, $x^2 \geq 0$, donc $f(x) \geq 1 = f(0)$. Le minimum de $f$ sur $\mathbb{R}$ est $1$, atteint en $0$.
:::
