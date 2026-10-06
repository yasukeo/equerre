---
title: Fonctions numériques — partie 2 : fonctions linéaires, affines et de référence
kind: cours
summary: Fonctions linéaires et proportionnalité, fonctions affines, coefficient directeur et ordonnée à l’origine, trouver une fonction affine, fonctions carré et inverse.
position: 20
visibility: public
---

## Fonctions linéaires

:::definition
Une fonction **linéaire** s’écrit $f(x) = ax$. Elle traduit une situation de **proportionnalité** de coefficient $a$. Sa courbe est une droite qui passe par l’origine.
:::

:::exemple
Un kilogramme de dattes coûte $12$ dirhams : le prix de $x$ kilogrammes est $f(x) = 12x$. Augmenter un prix de $20\,\%$, c’est appliquer la fonction linéaire $x \mapsto 1{,}2x$.
:::

## Fonctions affines

:::definition
Une fonction **affine** s’écrit $f(x) = ax + b$. Sa courbe est une droite : $a$ est son **coefficient directeur** (sa pente), $b$ son **ordonnée à l’origine** ($f(0) = b$).
:::

:::propriete
- Si $a > 0$, $f$ est croissante ; si $a < 0$, elle est décroissante ; si $a = 0$, elle est constante.
- Pour deux nombres $x_1 \neq x_2$ : $a = \frac{f(x_2) - f(x_1)}{x_2 - x_1}$.
:::

:::exemple
Un taxi facture $7$ dirhams de prise en charge, puis $2{,}5$ dirhams par kilomètre : $f(x) = 2{,}5x + 7$. Un trajet de $10$ km coûte $f(10) = 32$ dirhams.
:::

:::exemple
**Trouver une fonction affine.** On cherche $f(x) = ax + b$ avec $f(1) = 3$ et $f(4) = 9$. Alors $a = \frac{9 - 3}{4 - 1} = 2$, et $f(1) = 2 + b = 3$ donne $b = 1$ : $f(x) = 2x + 1$.
:::

## Fonctions de référence

:::propriete
- La fonction **carré** $x \mapsto x^2$ : décroissante sur $]-\infty ; 0]$, croissante sur $[0 ; +\infty[$ ; minimum $0$ en $0$ ; sa courbe est une **parabole**, symétrique par rapport à l’axe des ordonnées.
- La fonction **inverse** $x \mapsto \frac{1}{x}$, définie pour $x \neq 0$ : décroissante sur $]-\infty ; 0[$ et sur $]0 ; +\infty[$ ; sa courbe est une **hyperbole**, symétrique par rapport à l’origine.
:::

:::exemple
- $x^2 = 9 \iff x = 3$ ou $x = -3$.
- $\frac{1}{x} = 4 \iff x = \frac{1}{4}$.
- $2{,}5^2 < 3^2$, car la fonction carré est croissante sur $[0 ; +\infty[$.
:::

:::attention
Une fonction linéaire est un cas particulier de fonction affine, avec $b = 0$.
:::
