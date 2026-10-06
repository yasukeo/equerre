---
title: Série 1 — partie 2 : paraboles, hyperboles et lectures graphiques
kind: serie
summary: Forme canonique et sommet d’une parabole, fonction homographique avec centre et asymptotes, intersections et position relative, inéquation résolue par le calcul, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Une parabole
Soit $f(x) = -x^2 + 6x - 5$.

1. Écrire $f(x)$ sous forme canonique.
2. Donner le sommet de la parabole, les variations de $f$ et son extremum.
3. Trouver les points d’intersection de la parabole avec l’axe des abscisses.

:::corrige
1. $f(x) = -(x^2 - 6x) - 5 = -(x - 3)^2 + 9 - 5 = -(x - 3)^2 + 4$.
2. Sommet $(3 ; 4)$ ; $a < 0$ : croissante sur $]-\infty ; 3]$, décroissante sur $[3 ; +\infty[$, maximum $4$.
3. $(x - 3)^2 = 4 \iff x = 1$ ou $x = 5$ : les points $(1 ; 0)$ et $(5 ; 0)$.
:::
:::

:::exercice Une hyperbole
Soit $g(x) = \dfrac{x - 3}{x - 1}$.

1. Montrer que $g(x) = 1 - \dfrac{2}{x - 1}$.
2. Donner le centre et les asymptotes de sa courbe, et ses variations.

:::corrige
1. $\frac{x - 3}{x - 1} = \frac{(x - 1) - 2}{x - 1} = 1 - \frac{2}{x - 1}$.
2. Centre $(1 ; 1)$, asymptotes $x = 1$ et $y = 1$. Ici $k = -2 < 0$ : $g$ est croissante sur $]-\infty ; 1[$ et sur $]1 ; +\infty[$.
:::
:::

:::exercice Parabole et droite
Soit $f(x) = x^2 - 2x$ et $g(x) = x - 2$.

1. Calculer les coordonnées des points d’intersection de $C_f$ et $C_g$.
2. Étudier la position relative des deux courbes.

:::corrige
1. $x^2 - 2x = x - 2 \iff x^2 - 3x + 2 = 0 \iff x = 1$ ou $x = 2$ : $(1 ; -1)$ et $(2 ; 0)$.
2. $f(x) - g(x) = (x - 1)(x - 2)$ : négatif sur $]1 ; 2[$, où la parabole est au-dessous de la droite ; positif ailleurs.
:::
:::

:::exercice Hyperbole et droite
1. Résoudre $\dfrac{1}{x} = x$.
2. Résoudre $\dfrac{1}{x} \leq x$, et interpréter avec les courbes.

:::corrige
1. Pour $x \neq 0$ : $x^2 = 1 \iff x = -1$ ou $x = 1$.
2. $\frac{1}{x} - x = \frac{1 - x^2}{x} \leq 0$. Le numérateur est positif sur $]-1 ; 1[$ ; le quotient est négatif ou nul sur $[-1 ; 0[ \cup [1 ; +\infty[$. Sur cet ensemble, l’hyperbole est au-dessous de la droite $y = x$ (ou la coupe).
:::
:::
