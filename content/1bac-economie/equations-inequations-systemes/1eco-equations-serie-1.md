---
title: Série 1 — partie 1 : le second degré
kind: serie
summary: Résoudre des équations du second degré, somme et produit des racines, inéquations, équations bicarrées et avec fractions, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Équations du second degré
Résoudre dans $\mathbb{R}$ :

1. $3x^2 - 7x + 2 = 0$
2. $4x^2 - 12x + 9 = 0$
3. $x^2 - 2x + 5 = 0$
4. $x^2 - 2\sqrt{3}x + 2 = 0$

:::corrige
1. $\Delta = 49 - 24 = 25$ : $x = \frac{7 - 5}{6} = \frac{1}{3}$ ou $x = \frac{7 + 5}{6} = 2$.
2. $\Delta = 144 - 144 = 0$ : solution double $x = \frac{12}{8} = \frac{3}{2}$.
3. $\Delta = 4 - 20 = -16 < 0$ : pas de solution.
4. $\Delta' = 3 - 2 = 1$ : $x = \sqrt{3} - 1$ ou $x = \sqrt{3} + 1$.
:::
:::

:::exercice Somme et produit
1. Vérifier que $3$ est solution de $x^2 + 4x - 21 = 0$ et trouver l’autre solution sans calculer $\Delta$.
2. Trouver deux nombres dont la somme est $15$ et le produit $56$.
3. Soit $x_1$ et $x_2$ les solutions de $2x^2 - 6x - 3 = 0$. Sans les calculer, donner $x_1 + x_2$, $x_1 x_2$, $x_1^2 + x_2^2$ et $\frac{1}{x_1} + \frac{1}{x_2}$.

:::corrige
1. $9 + 12 - 21 = 0$. Le produit des racines vaut $-21$, donc l’autre est $\frac{-21}{3} = -7$.
2. Ils sont solutions de $x^2 - 15x + 56 = 0$ : $\Delta = 225 - 224 = 1$, ce sont $7$ et $8$.
3. $\Delta = 36 + 24 = 60 > 0$. $x_1 + x_2 = 3$ et $x_1 x_2 = -\frac{3}{2}$ ; $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = 9 + 3 = 12$ ; $\frac{1}{x_1} + \frac{1}{x_2} = \frac{x_1 + x_2}{x_1 x_2} = \frac{3}{-\frac{3}{2}} = -2$.
:::
:::

:::exercice Inéquations
Résoudre dans $\mathbb{R}$ :

1. $x^2 - x - 6 < 0$
2. $-2x^2 + 3x - 2 \leq 0$
3. $\dfrac{x^2 - 1}{x + 2} \geq 0$

:::corrige
1. Racines $-2$ et $3$, $a > 0$ : le trinôme est négatif entre les racines, $S = ]-2 ; 3[$.
2. $\Delta = 9 - 16 = -7 < 0$ et $a < 0$ : le trinôme est toujours négatif, $S = \mathbb{R}$.
3. Le numérateur s’annule en $-1$ et $1$, le dénominateur en $-2$. Sur $]-\infty ; -2[$, le quotient est négatif ; sur $]-2 ; -1]$, positif ou nul ; sur $]-1 ; 1[$, négatif ; sur $[1 ; +\infty[$, positif ou nul. $S = ]-2 ; -1] \cup [1 ; +\infty[$.
:::
:::

:::exercice Se ramener au second degré
Résoudre dans $\mathbb{R}$ :

1. $x^4 - 3x^2 - 4 = 0$
2. $x - 5\sqrt{x} + 6 = 0$
3. $\dfrac{1}{x} + \dfrac{1}{x + 1} = \dfrac{5}{6}$

:::corrige
1. Avec $X = x^2 \geq 0$ : $X^2 - 3X - 4 = 0$, $X = 4$ ou $X = -1$ (refusé). Donc $x = -2$ ou $x = 2$.
2. Avec $X = \sqrt{x} \geq 0$ : $X^2 - 5X + 6 = 0$, $X = 2$ ou $X = 3$. Donc $x = 4$ ou $x = 9$.
3. Pour $x \notin \{-1 ; 0\}$ : $6(x + 1) + 6x = 5x(x + 1)$, soit $5x^2 - 7x - 6 = 0$. $\Delta = 49 + 120 = 169$, $x = \frac{7 + 13}{10} = 2$ ou $x = \frac{7 - 13}{10} = -\frac{3}{5}$. $S = \left\{-\frac{3}{5} ; 2\right\}$.
:::
:::
