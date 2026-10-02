---
title: Dérivation — partie 2 : sens de variation et extremums
kind: cours
summary: Lien entre le signe de la dérivée et le sens de variation, tableau de variations rédigé, maximum et minimum, et un problème d’optimisation résolu pas à pas.
position: 20
visibility: public
---

## Dérivée et sens de variation

:::theoreme
Soit $f$ une fonction dérivable sur un intervalle $I$.

- Si $f'(x) > 0$ sur $I$ (sauf en quelques points isolés où elle s’annule), $f$ est **strictement croissante** sur $I$.
- Si $f'(x) < 0$ sur $I$ (sauf en quelques points isolés), $f$ est **strictement décroissante** sur $I$.
- Si $f'(x) = 0$ sur tout $I$, $f$ est **constante** sur $I$.
:::

Pour trouver le sens de variation d’une fonction, on suit donc trois étapes : on calcule $f'(x)$, on étudie son signe, puis on en déduit les variations.

:::exemple
$f(x) = x^2 - 4x + 1$ sur $\mathbb{R}$ : $f'(x) = 2x - 4$.

- $2x - 4 < 0 \iff x < 2$ : $f$ est décroissante sur $]-\infty ; 2]$.
- $2x - 4 > 0 \iff x > 2$ : $f$ est croissante sur $[2 ; +\infty[$.
:::

## Extremums

:::propriete
Si $f'$ s’annule en $a$ **en changeant de signe**, alors $f(a)$ est un **extremum** de $f$ :

- un **maximum** si $f'$ passe du signe $+$ au signe $-$ (la fonction monte puis descend) ;
- un **minimum** si $f'$ passe du signe $-$ au signe $+$ (la fonction descend puis monte).
:::

:::exemple
Pour $f(x) = x^2 - 4x + 1$ : $f'$ passe de $-$ à $+$ en $2$, donc $f(2) = 4 - 8 + 1 = -3$ est le minimum de $f$.
:::

:::exemple
$g(x) = x^3 - 12x$ : $g'(x) = 3x^2 - 12 = 3(x - 2)(x + 2)$. Le trinôme est positif à l’extérieur des racines $-2$ et $2$, négatif entre elles :

- $g$ est croissante sur $]-\infty ; -2]$, décroissante sur $[-2 ; 2]$, croissante sur $[2 ; +\infty[$ ;
- maximum local $g(-2) = -8 + 24 = 16$ ; minimum local $g(2) = 8 - 24 = -16$.
:::

:::attention
$f'(a) = 0$ ne suffit pas : pour $f(x) = x^3$, $f'(0) = 0$, mais $f'(x) = 3x^2$ ne change pas de signe, et $f$ n’a pas d’extremum en $0$.
:::

## Un problème d’optimisation

:::exemple
On veut construire un enclos rectangulaire de périmètre $20$ m, d’aire la plus grande possible. Si un côté mesure $x$ mètres, l’autre mesure $10 - x$, avec $0 \leq x \leq 10$.

- L’aire est $A(x) = x(10 - x) = 10x - x^2$.
- $A'(x) = 10 - 2x$ : positive pour $x < 5$, négative pour $x > 5$.
- $A$ est croissante sur $[0 ; 5]$ et décroissante sur $[5 ; 10]$ : son maximum est $A(5) = 25$.

L’enclos le plus grand est un carré de $5$ m de côté, d’aire $25$ m².
:::
