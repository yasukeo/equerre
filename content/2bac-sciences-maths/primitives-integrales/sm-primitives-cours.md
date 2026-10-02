---
title: Fonctions primitives — partie 1 : définition et primitives usuelles
kind: cours
summary: Définition d’une primitive, ensemble des primitives, primitive qui prend une valeur donnée, primitives des fonctions usuelles et lien entre une fonction et le sens de variation de ses primitives.
position: 10
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

:::exemple
- $f(x) = 4x^3 - 6x + 2$ : $F(x) = x^4 - 3x^2 + 2x$ sur $\mathbb{R}$.
- $g(x) = \frac{1}{x^3}$ sur $]0 ; +\infty[$ : $G(x) = -\frac{1}{2x^2}$.
- $h(x) = \sqrt{x} = x^{\frac{1}{2}}$ sur $]0 ; +\infty[$ : $H(x) = \frac{2}{3}x^{\frac{3}{2}} = \frac{2}{3}x\sqrt{x}$.
- $k(x) = \cos(2x) - 3\sin x$ : $K(x) = \frac{1}{2}\sin(2x) + 3\cos x$.
:::

## Primitives et sens de variation

Si $F$ est une primitive de $f$ sur $I$, alors $F' = f$ : le sens de variation de $F$ se lit sur le **signe de $f$**.

:::propriete
- Si $f > 0$ sur $I$ (sauf en des points isolés), toute primitive de $f$ est strictement croissante sur $I$.
- Si $f < 0$ sur $I$ (sauf en des points isolés), toute primitive de $f$ est strictement décroissante sur $I$.
:::

:::exemple
Soit $F$ la primitive de $f(x) = \frac{1}{1 + x^2}$ sur $\mathbb{R}$ qui s’annule en $0$. On ne connaît pas d’expression de $F$ avec les fonctions du programme, mais $f > 0$, donc $F$ est strictement croissante sur $\mathbb{R}$ ; en particulier $F(x) > 0$ pour $x > 0$ et $F(x) < 0$ pour $x < 0$.
:::

:::attention
Pour vérifier une primitive, on la **dérive** : on doit retrouver exactement la fonction de départ.
:::

### Primitives avec arc tangente

:::propriete
$x \mapsto \frac{1}{1 + x^2}$ a pour primitives sur $\mathbb{R}$ les fonctions $\arctan x + c$ ; si $u$ est dérivable, $\frac{u'}{1 + u^2}$ a pour primitives $\arctan u + c$.
:::

:::exemple
- Une primitive de $\frac{1}{1 + 4x^2}$ est $\frac{1}{2}\arctan(2x)$.
- Une primitive de $\frac{1}{x^2 + 9} = \frac{1}{9} \times \frac{1}{1 + \left(\frac{x}{3}\right)^2}$ est $\frac{1}{3}\arctan\frac{x}{3}$.
- Une primitive de $\frac{\cos x}{1 + \sin^2 x}$ est $\arctan(\sin x)$.
:::
