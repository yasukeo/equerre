---
title: Série 1 — partie 2 : limites, dérivées et étude
kind: serie
summary: Limites avec l’exponentielle, dérivées de fonctions simples, étude d’une fonction et tangente, avec les corrigés.
position: 20
visibility: enrolled
---

Trois exercices sur la deuxième partie du cours.

:::exercice Limites
Calculer :

1. $\lim_{x \to +\infty} (e^x + x)$
2. $\lim_{x \to -\infty} (3 - e^x)$
3. $\lim_{x \to -\infty} (x + 1)e^x$

:::corrige
1. $+\infty$.
2. $e^x \to 0$ : la limite vaut $3$.
3. $(x + 1)e^x = xe^x + e^x \to 0 + 0 = 0$.
:::
:::

:::exercice Dérivées
Calculer la dérivée de chaque fonction sur $\mathbb{R}$.

1. $f(x) = 2e^x + x^3$
2. $g(x) = (x - 2)e^x$
3. $h(x) = \dfrac{e^x}{e^x + 1}$

:::corrige
1. $f'(x) = 2e^x + 3x^2$.
2. $g'(x) = e^x + (x - 2)e^x = (x - 1)e^x$.
3. $h'(x) = \frac{e^x(e^x + 1) - e^x \times e^x}{(e^x + 1)^2} = \frac{e^x}{(e^x + 1)^2}$.
:::
:::

:::exercice Étude d’une fonction
Soit $f(x) = (x - 2)e^x$ sur $\mathbb{R}$.

1. Calculer les limites de $f$ en $-\infty$ et en $+\infty$.
2. Montrer que $f'(x) = (x - 1)e^x$ et dresser le tableau de variations.
3. Donner l’équation de la tangente au point d’abscisse $0$.

:::corrige
1. En $-\infty$ : $f(x) = xe^x - 2e^x \to 0$. En $+\infty$ : $x - 2 \to +\infty$ et $e^x \to +\infty$, donc $+\infty$.
2. Voir l’exercice précédent. $f'$ a le signe de $x - 1$ : $f$ décroît sur $]-\infty ; 1]$ et croît ensuite ; minimum $f(1) = -e$.
3. $f(0) = -2$ et $f'(0) = -1$ : $y = -x - 2$.
:::
:::
