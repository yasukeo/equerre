---
title: Série 2 : problèmes type examen
kind: serie
summary: Trois problèmes où la primitive sert à autre chose : démontrer une inégalité, trouver une primitive de forme imposée, avec les corrigés.
position: 30
visibility: enrolled
---

Deux problèmes qui reprennent tout le chapitre.

:::exercice Problème 1 : une primitive pour démontrer une inégalité
Soit $g$ la fonction définie sur $I = ]-1 ; +\infty[$ par $g(x) = \dfrac{x^2 + 2x}{(x + 1)^2}$.

1. Montrer que $g(x) = 1 - \dfrac{1}{(x + 1)^2}$ pour tout $x \in I$.
2. Déterminer la primitive $G$ de $g$ sur $I$ telle que $G(0) = 1$.
3. Étudier le signe de $g(x)$ sur $I$ et en déduire le sens de variation de $G$.
4. En déduire que pour tout $x > -1$, $x + \dfrac{1}{x + 1} \geq 1$.

:::corrige
1. $1 - \frac{1}{(x + 1)^2} = \frac{(x + 1)^2 - 1}{(x + 1)^2} = \frac{x^2 + 2x}{(x + 1)^2}$.
2. Les primitives de $g$ sur $I$ sont $x + \frac{1}{x + 1} + c$. $G(0) = 1 + c = 1$ donne $c = 0$ : $G(x) = x + \dfrac{1}{x + 1}$.
3. $g(x) = \frac{x(x + 2)}{(x + 1)^2}$ a le signe de $x(x + 2)$. Sur $I$, $x + 2 > 0$, donc $g(x) < 0$ sur $]-1 ; 0[$ et $g(x) > 0$ sur $]0 ; +\infty[$. Comme $G' = g$, $G$ est décroissante sur $]-1 ; 0]$ et croissante sur $[0 ; +\infty[$.
4. $G$ admet donc un minimum en $0$, égal à $G(0) = 1$ : pour tout $x > -1$, $G(x) \geq 1$, c’est-à-dire $x + \frac{1}{x + 1} \geq 1$.
:::
:::

:::exercice Problème 2 : une primitive de forme imposée
Soit $f(x) = \dfrac{x}{\sqrt{x + 1}}$ sur $]-1 ; +\infty[$.

1. Soit $a$ et $b$ deux réels et $F(x) = (ax + b)\sqrt{x + 1}$. Calculer $F'(x)$ et l’écrire sous la forme $\dfrac{\alpha x + \beta}{2\sqrt{x + 1}}$.
2. Déterminer $a$ et $b$ pour que $F$ soit une primitive de $f$.
3. En déduire la primitive de $f$ qui s’annule en $0$.

:::corrige
1. $F'(x) = a\sqrt{x + 1} + \frac{ax + b}{2\sqrt{x + 1}} = \frac{2a(x + 1) + ax + b}{2\sqrt{x + 1}} = \frac{3ax + 2a + b}{2\sqrt{x + 1}}$.
2. Il faut $\frac{3ax + 2a + b}{2} = x$ pour tout $x$, soit $3a = 2$ et $2a + b = 0$ : $a = \frac{2}{3}$ et $b = -\frac{4}{3}$. Donc $F(x) = \frac{2}{3}(x - 2)\sqrt{x + 1}$.
3. $F(0) = -\frac{4}{3}$ ; la primitive qui s’annule en $0$ est $x \mapsto \frac{2}{3}(x - 2)\sqrt{x + 1} + \frac{4}{3}$.
:::
:::

