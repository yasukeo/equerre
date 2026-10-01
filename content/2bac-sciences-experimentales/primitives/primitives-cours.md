---
title: Fonctions primitives
kind: cours
summary: Définition d’une primitive, primitives usuelles, opérations, et la primitive qui prend une valeur donnée en un point.
position: 20
visibility: public
---

## Définition

:::definition
Soit $f$ une fonction définie sur un intervalle $I$. On appelle **primitive** de $f$ sur $I$ toute fonction $F$ dérivable sur $I$ telle que $F'(x) = f(x)$ pour tout $x \in I$.
:::

:::exemple
$F(x) = x^3 + 5$ est une primitive de $f(x) = 3x^2$ sur $\mathbb{R}$, car $F'(x) = 3x^2$.
:::

:::theoreme
Toute fonction continue sur un intervalle $I$ admet des primitives sur $I$.
:::

:::propriete
Si $F$ est une primitive de $f$ sur $I$, les primitives de $f$ sur $I$ sont les fonctions $x \mapsto F(x) + c$, où $c$ est un réel quelconque.

Pour $x_0 \in I$ et $y_0$ réel, il existe une **unique** primitive $G$ de $f$ sur $I$ telle que $G(x_0) = y_0$.
:::

:::exemple
Primitive de $f(x) = 2x + 1$ sur $\mathbb{R}$ qui vaut $3$ en $1$ : les primitives sont $F(x) = x^2 + x + c$, et $F(1) = 2 + c = 3$ donne $c = 1$, donc $F(x) = x^2 + x + 1$.
:::

## Primitives usuelles

:::propriete
Sur tout intervalle où la fonction est définie ($c$ réel) :

- $a$ (constante) a pour primitives $ax + c$ ;
- $x^n$ ($n \in \mathbb{N}$) a pour primitives $\frac{x^{n + 1}}{n + 1} + c$ ;
- $\frac{1}{x^n}$ ($n \geq 2$) a pour primitives $-\frac{1}{(n - 1) x^{n - 1}} + c$ ;
- $x^r$ ($r$ rationnel, $r \neq -1$, $x > 0$) a pour primitives $\frac{x^{r + 1}}{r + 1} + c$ ;
- $\frac{1}{\sqrt{x}}$ ($x > 0$) a pour primitives $2\sqrt{x} + c$ ;
- $\cos x$ a pour primitives $\sin x + c$, et $\sin x$ a pour primitives $-\cos x + c$ ;
- $1 + \tan^2 x = \frac{1}{\cos^2 x}$ a pour primitives $\tan x + c$ ;
- $\cos(ax + b)$ a pour primitives $\frac{1}{a} \sin(ax + b) + c$, et $\sin(ax + b)$ a pour primitives $-\frac{1}{a}\cos(ax + b) + c$ ($a \neq 0$).
:::

## Opérations

:::propriete
Si $F$ et $G$ sont des primitives de $f$ et $g$ sur $I$, et $k$ un réel, alors $F + G$ est une primitive de $f + g$ et $kF$ une primitive de $kf$.
:::

:::attention
Il n’y a pas de règle pour le produit ni pour le quotient : on cherche à reconnaître une dérivée connue.
:::

:::propriete
Si $u$ est dérivable sur $I$ :

- $u' u^n$ ($n \in \mathbb{N}$) a pour primitives $\frac{u^{n + 1}}{n + 1} + c$ ;
- $\frac{u'}{u^2}$ a pour primitives $-\frac{1}{u} + c$, là où $u$ ne s’annule pas ;
- $u' u^r$ ($r$ rationnel, $r \neq -1$) a pour primitives $\frac{u^{r + 1}}{r + 1} + c$, là où $u > 0$ ;
- $\frac{u'}{\sqrt{u}}$ a pour primitives $2\sqrt{u} + c$, là où $u > 0$ ;
- $u' \times v' \circ u$ a pour primitives $v \circ u + c$.
:::

:::exemple
- $f(x) = x(x^2 + 1)^3$ : avec $u(x) = x^2 + 1$, $f = \frac{1}{2} u' u^3$, donc $F(x) = \frac{1}{8}(x^2 + 1)^4$.
- $g(x) = \frac{2x}{\sqrt{x^2 + 3}}$ : c’est $\frac{u'}{\sqrt{u}}$ avec $u(x) = x^2 + 3 > 0$, donc $G(x) = 2\sqrt{x^2 + 3}$.
- $h(x) = \sin x \cos^2 x$ : avec $u = \cos$, $h = -u' u^2$, donc $H(x) = -\frac{1}{3}\cos^3 x$.
:::

## Méthode

Pour trouver une primitive :

1. on écrit la fonction comme une somme de termes simples ;
2. pour chaque terme, on reconnaît une forme du tableau, quitte à multiplier et diviser par une constante ;
3. on vérifie en dérivant le résultat.
