---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Un problème complet d’étude de fonction rationnelle avec asymptotes, variations, centre de symétrie, tangente et tracé, puis une discussion graphique, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème : une fonction rationnelle
Soit $f(x) = \dfrac{x^2 + x + 1}{x}$ sur $\mathbb{R}^*$, et $(C)$ sa courbe.

1. Vérifier que $f(x) = x + 1 + \dfrac{1}{x}$.
2. Calculer les limites aux bornes de $\mathbb{R}^*$ et préciser les asymptotes.
3. Étudier la position de $(C)$ par rapport à son asymptote oblique.
4. Calculer $f'(x)$ et dresser le tableau de variations.
5. Montrer que $\Omega(0 ; 1)$ est centre de symétrie de $(C)$.
6. Donner l’équation de la tangente au point d’abscisse $2$.
7. Discuter, selon les valeurs du réel $m$, le nombre de solutions de l’équation $f(x) = m$.

:::corrige
1. $x + 1 + \frac{1}{x} = \frac{x^2 + x + 1}{x}$.
2. $\lim_{\pm\infty} f = \pm\infty$ ; $\lim_{0^+} f = +\infty$, $\lim_{0^-} f = -\infty$ : asymptote verticale $x = 0$. $f(x) - (x + 1) = \frac{1}{x} \to 0$ : asymptote oblique $y = x + 1$.
3. $\frac{1}{x} > 0$ pour $x > 0$ : au-dessus ; au-dessous pour $x < 0$.
4. $f'(x) = 1 - \frac{1}{x^2} = \frac{(x - 1)(x + 1)}{x^2}$ : croissante sur $]-\infty ; -1]$, décroissante sur $[-1 ; 0[$ et $]0 ; 1]$, croissante sur $[1 ; +\infty[$ ; maximum local $f(-1) = -1$, minimum local $f(1) = 3$.
5. $f(-x) + f(x) = (-x + 1 - \frac{1}{x}) + (x + 1 + \frac{1}{x}) = 2 = 2 \times 1$.
6. $f(2) = \frac{7}{2}$, $f'(2) = \frac{3}{4}$ : $y = \frac{3}{4}x + 2$.
7. $m < -1$ : deux solutions (sur $]-\infty ; -1[$ et $]-1 ; 0[$) ; $m = -1$ : une ($x = -1$) ; $-1 < m < 3$ : aucune ; $m = 3$ : une ($x = 1$) ; $m > 3$ : deux (sur $]0 ; 1[$ et $]1 ; +\infty[$).
:::
:::
