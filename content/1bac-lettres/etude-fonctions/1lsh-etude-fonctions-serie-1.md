---
title: Série 1 — partie 1 : la méthode et les polynômes
kind: serie
summary: Étude d’un trinôme, étude d’un polynôme du troisième degré impair, tangentes et nombre de solutions d’une équation, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Un trinôme
Soit $f(x) = -x^2 + 4x - 3$.

1. Calculer les limites de $f$ en $+\infty$ et en $-\infty$.
2. Étudier les variations de $f$ et donner son extremum.
3. Trouver les points d’intersection de la courbe avec les axes.

:::corrige
1. Comme $-x^2$ : $-\infty$ en $+\infty$ et en $-\infty$.
2. $f'(x) = -2x + 4$ : $f$ croît sur $]-\infty ; 2]$ et décroît sur $[2 ; +\infty[$ ; maximum $f(2) = -4 + 8 - 3 = 1$.
3. $f(x) = -(x - 1)(x - 3)$ : points $(1 ; 0)$ et $(3 ; 0)$ ; et $f(0) = -3$ : point $(0 ; -3)$.
:::
:::

:::exercice Un polynôme du troisième degré
Soit $g(x) = x^3 - 3x$.

1. Montrer que $g$ est impaire. Que peut-on dire de sa courbe ?
2. Calculer les limites de $g$ en $+\infty$ et en $-\infty$.
3. Montrer que $g'(x) = 3(x - 1)(x + 1)$, puis donner les variations et les extremums de $g$.
4. Résoudre $g(x) = 0$.

:::corrige
1. $g(-x) = -x^3 + 3x = -g(x)$ : impaire ; la courbe est symétrique par rapport à l’origine.
2. Comme $x^3$ : $+\infty$ en $+\infty$, $-\infty$ en $-\infty$.
3. $g'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$ : positive à l’extérieur de $-1$ et $1$, négative entre. $g$ croît sur $]-\infty ; -1]$, décroît sur $[-1 ; 1]$, croît sur $[1 ; +\infty[$. Maximum local $g(-1) = 2$ ; minimum local $g(1) = -2$.
4. $x(x^2 - 3) = 0 \iff x = 0$ ou $x = \sqrt{3}$ ou $x = -\sqrt{3}$.
:::
:::

:::exercice Tangentes
Pour $g(x) = x^3 - 3x$, donner l’équation de la tangente au point d’abscisse $0$, puis au point d’abscisse $2$.

:::corrige
- En $0$ : $g(0) = 0$ et $g'(0) = -3$ : $y = -3x$.
- En $2$ : $g(2) = 8 - 6 = 2$ et $g'(2) = 12 - 3 = 9$ : $y = 9(x - 2) + 2$, soit $y = 9x - 16$.
:::
:::

:::exercice Nombre de solutions
Toujours avec $g(x) = x^3 - 3x$, combien de solutions ont les équations $g(x) = 1$ et $g(x) = 3$ ?

:::corrige
- $g(x) = 1$ : sur $]-\infty ; -1]$, $g$ croît de $-\infty$ à $2$ ; sur $[-1 ; 1]$, elle décroît de $2$ à $-2$ ; sur $[1 ; +\infty[$, elle croît de $-2$ à $+\infty$. La valeur $1$ est atteinte une fois sur chaque intervalle : $3$ solutions.
- $g(x) = 3$ : sur $]-\infty ; 1]$, $g(x) \leq 2$ ; sur $[1 ; +\infty[$, une solution. Donc $1$ solution.
:::
:::
