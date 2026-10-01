---
title: Fonctions primitives : l’essentiel
kind: resume
summary: Les définitions, le tableau des primitives et les méthodes du chapitre sur une page, pour réviser avant un contrôle.
position: 10
visibility: public
---

## Définition

$F$ est une primitive de $f$ sur l’intervalle $I$ si $F' = f$ sur $I$. Toute fonction continue sur un intervalle a des primitives ; elles diffèrent d’une constante : $F + c$. Il y en a une seule qui prend une valeur $y_0$ donnée en un point $x_0$.

## Primitives usuelles

:::propriete
- $x^n$ ($n \in \mathbb{N}$) : $\frac{x^{n + 1}}{n + 1}$ ;
- $\frac{1}{x^n}$ ($n \geq 2$) : $-\frac{1}{(n - 1)x^{n - 1}}$ ;
- $x^r$ ($r \in \mathbb{Q}$, $r \neq -1$, $x > 0$) : $\frac{x^{r + 1}}{r + 1}$ ;
- $\frac{1}{\sqrt{x}}$ : $2\sqrt{x}$ ;
- $\cos(ax + b)$ : $\frac{1}{a}\sin(ax + b)$ ; $\sin(ax + b)$ : $-\frac{1}{a}\cos(ax + b)$ ;
- $1 + \tan^2 x = \frac{1}{\cos^2 x}$ : $\tan x$.
:::

## Formes composées

:::propriete
- $u'u^n$ : $\frac{u^{n + 1}}{n + 1}$ ; $u'u^r$ ($u > 0$, $r \neq -1$) : $\frac{u^{r + 1}}{r + 1}$ ;
- $\frac{u'}{u^2}$ : $-\frac{1}{u}$ ; $\frac{u'}{\sqrt{u}}$ ($u > 0$) : $2\sqrt{u}$ ;
- $u' \times (v' \circ u)$ : $v \circ u$.
:::

## Méthodes

1. Écrire la fonction comme une somme de termes simples ; ajuster les constantes ($\frac{1}{2}$, $-1$…).
2. Linéariser : $\cos^2 x = \frac{1 + \cos 2x}{2}$, $\sin^2 x = \frac{1 - \cos 2x}{2}$.
3. Une fraction : faire apparaître $ax + b + \frac{c}{(x + d)^2}$.
4. Toujours vérifier en dérivant.

:::attention
Pas de règle pour un produit ni pour un quotient : on cherche une dérivée connue. Le signe de $f$ donne le sens de variation de ses primitives.
:::
