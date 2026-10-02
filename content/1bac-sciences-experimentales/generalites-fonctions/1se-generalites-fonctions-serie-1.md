---
title: Série 1 — partie 1 : vocabulaire et propriétés
kind: serie
summary: Ensembles de définition, parité, fonctions bornées et extremums, sens de variation par le taux de variation, composition, avec les corrigés.
position: 10
visibility: public
---

Cinq exercices sur la première partie du cours.

:::exercice Ensembles de définition
Déterminer l’ensemble de définition de chaque fonction.

1. $f(x) = \dfrac{x}{x^2 - 3x + 2}$
2. $g(x) = \sqrt{2x + 6}$
3. $h(x) = \dfrac{1}{\sqrt{4 - x^2}}$

:::corrige
1. $x^2 - 3x + 2 = (x - 1)(x - 2)$ : $D_f = \mathbb{R} \setminus \{1 ; 2\}$.
2. $2x + 6 \geq 0 \iff x \geq -3$ : $D_g = [-3 ; +\infty[$.
3. $4 - x^2 > 0 \iff -2 < x < 2$ : $D_h = ]-2 ; 2[$.
:::
:::

:::exercice Parité
Étudier la parité de chaque fonction.

1. $f(x) = \dfrac{x^2 + 1}{x^2 - 1}$
2. $g(x) = x\sqrt{x^2 + 1}$
3. $h(x) = x^2 - 2x$

:::corrige
1. $D_f = \mathbb{R} \setminus \{-1 ; 1\}$, symétrique ; $f(-x) = f(x)$ : paire.
2. $D_g = \mathbb{R}$ ; $g(-x) = -x\sqrt{x^2 + 1} = -g(x)$ : impaire.
3. $h(1) = -1$ et $h(-1) = 3$ : ni paire, ni impaire.
:::
:::

:::exercice Fonctions bornées
1. Montrer que $f(x) = \dfrac{2x}{x^2 + 1}$ vérifie $-1 \leq f(x) \leq 1$ pour tout réel $x$.
2. Montrer que $1$ est le maximum de $f$ et $-1$ son minimum.

:::corrige
1. $1 - f(x) = \frac{x^2 - 2x + 1}{x^2 + 1} = \frac{(x - 1)^2}{x^2 + 1} \geq 0$ et $f(x) + 1 = \frac{(x + 1)^2}{x^2 + 1} \geq 0$.
2. $f(1) = 1$ et $f(-1) = -1$ : les bornes sont atteintes.
:::
:::

:::exercice Taux de variation
Soit $f(x) = \dfrac{1}{x - 2}$ sur $]2 ; +\infty[$.

1. Calculer le taux de variation de $f$ entre deux réels $a \neq b$ de $]2 ; +\infty[$.
2. En déduire le sens de variation de $f$.

:::corrige
1. $\frac{f(b) - f(a)}{b - a} = \frac{\frac{(a - 2) - (b - 2)}{(a - 2)(b - 2)}}{b - a} = \frac{-1}{(a - 2)(b - 2)}$.
2. Sur $]2 ; +\infty[$, $(a - 2)(b - 2) > 0$, donc le taux est négatif : $f$ est strictement décroissante.
:::
:::

:::exercice Composition
Soit $f(x) = x^2 - 4x$ et $g(x) = \sqrt{x}$.

1. Déterminer l’ensemble de définition de $h = g \circ f$ et exprimer $h(x)$.
2. Étudier le sens de variation de $f$ puis celui de $h$ sur $[4 ; +\infty[$.

:::corrige
1. Il faut $x^2 - 4x \geq 0$, soit $x(x - 4) \geq 0$ : $D_h = ]-\infty ; 0] \cup [4 ; +\infty[$, et $h(x) = \sqrt{x^2 - 4x}$.
2. $f(x) = (x - 2)^2 - 4$ est croissante sur $[2 ; +\infty[$, donc sur $[4 ; +\infty[$, avec $f(x) \geq 0$ ; $g$ est croissante sur $[0 ; +\infty[$. Donc $h$ est croissante sur $[4 ; +\infty[$.
:::
:::
