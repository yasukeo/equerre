---
title: Série 1 : fonctions exponentielles
kind: serie
summary: Équations, inéquations, limites, dérivées et étude d’une fonction avec l’exponentielle, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la fonction exponentielle.

:::exercice Équations et inéquations
Résoudre dans $\mathbb{R}$ :

1. $e^{2x + 1} = e^{3 - x}$
2. $e^{2x} - 4e^x + 3 = 0$
3. $e^{x} - 2 > 0$

:::corrige
1. $2x + 1 = 3 - x$, donc $x = \frac{2}{3}$.
2. Avec $X = e^x > 0$ : $X^2 - 4X + 3 = 0$, soit $X = 1$ ou $X = 3$. Donc $x = 0$ ou $x = \ln 3$.
3. $e^x > 2 \iff x > \ln 2$ : $S = ]\ln 2 ; +\infty[$.
:::
:::

:::exercice Limites
Calculer :

1. $\displaystyle \lim_{x \to +\infty} \left(e^x - 3x\right)$
2. $\displaystyle \lim_{x \to -\infty} (x + 1)e^x$
3. $\displaystyle \lim_{x \to 0} \frac{e^{2x} - 1}{x}$

:::corrige
1. $e^x - 3x = x\left(\frac{e^x}{x} - 3\right)$ avec $\frac{e^x}{x} \to +\infty$ : la limite vaut $+\infty$.
2. $(x + 1)e^x = x e^x + e^x$, et $x e^x \to 0$, $e^x \to 0$ en $-\infty$ : la limite vaut $0$.
3. $\frac{e^{2x} - 1}{x} = 2 \times \frac{e^{2x} - 1}{2x}$, et $\frac{e^X - 1}{X} \to 1$ quand $X = 2x \to 0$ : la limite vaut $2$.
:::
:::

:::exercice Dérivées
Calculer la dérivée de chaque fonction sur $\mathbb{R}$.

1. $f(x) = (x^2 + 1)e^{x}$
2. $g(x) = e^{-x^2}$
3. $h(x) = \dfrac{e^x}{e^x + 1}$

:::corrige
1. $f'(x) = 2x e^x + (x^2 + 1)e^x = (x + 1)^2 e^x$.
2. $g'(x) = -2x e^{-x^2}$.
3. $h'(x) = \dfrac{e^x(e^x + 1) - e^x \times e^x}{(e^x + 1)^2} = \dfrac{e^x}{(e^x + 1)^2}$.
:::
:::

:::exercice Étude d’une fonction
Soit $f(x) = (2 - x)e^x$ sur $\mathbb{R}$.

1. Calculer les limites de $f$ en $-\infty$ et en $+\infty$.
2. Étudier les variations de $f$ et dresser son tableau de variations.
3. Déterminer l’équation de la tangente à la courbe au point d’abscisse $0$.

:::corrige
1. En $-\infty$ : $f(x) = 2e^x - x e^x \to 0$ (asymptote horizontale $y = 0$). En $+\infty$ : $2 - x \to -\infty$ et $e^x \to +\infty$, donc $f(x) \to -\infty$.
2. $f'(x) = -e^x + (2 - x)e^x = (1 - x)e^x$, du signe de $1 - x$ : $f$ est croissante sur $]-\infty ; 1]$ et décroissante sur $[1 ; +\infty[$, avec un maximum $f(1) = e$.
3. $f(0) = 2$ et $f'(0) = 1$ : la tangente a pour équation $y = x + 2$.
:::
:::
