---
title: Série 1 — partie 2 : fonctions de référence et lectures graphiques
kind: serie
summary: Sommet d’une parabole et variations d’un trinôme, comparaisons avec les fonctions de référence, position relative de deux courbes, lecture d’un tableau de variations, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Paraboles
Pour chaque fonction, donner le sommet de la parabole, les variations et l’extremum.

1. $f(x) = x^2 - 6x + 5$
2. $g(x) = -x^2 + 2x + 3$

:::corrige
1. $\alpha = \frac{6}{2} = 3$ et $f(3) = 9 - 18 + 5 = -4$ : sommet $S(3 ; -4)$. Comme $a = 1 > 0$, $f$ décroît sur $]-\infty ; 3]$ et croît sur $[3 ; +\infty[$ ; minimum $-4$.
2. $\alpha = \frac{-2}{-2} = 1$ et $g(1) = -1 + 2 + 3 = 4$ : sommet $S(1 ; 4)$. Comme $a = -1 < 0$, $g$ croît sur $]-\infty ; 1]$ et décroît sur $[1 ; +\infty[$ ; maximum $4$.
:::
:::

:::exercice Comparer sans calculer
Comparer, en citant la fonction de référence utilisée :

1. $\sqrt{7}$ et $\sqrt{8}$
2. $(-3)^3$ et $(-2)^3$
3. $\dfrac{1}{0{,}4}$ et $\dfrac{1}{0{,}5}$
4. $(-5)^2$ et $(-4)^2$

:::corrige
1. Racine carrée croissante : $\sqrt{7} < \sqrt{8}$.
2. Cube croissante sur $\mathbb{R}$ : $(-3)^3 < (-2)^3$.
3. Inverse décroissante sur $]0 ; +\infty[$ : $\frac{1}{0{,}4} > \frac{1}{0{,}5}$.
4. Carré décroissante sur $]-\infty ; 0]$ : comme $-5 < -4$, $(-5)^2 > (-4)^2$.
:::
:::

:::exercice Position relative
Soit $f(x) = x^2 - 1$ et $g(x) = x + 1$.

1. Montrer que $f(x) - g(x) = (x - 2)(x + 1)$.
2. Trouver les points d’intersection des deux courbes.
3. Préciser la position de $C_f$ par rapport à $C_g$, puis résoudre $f(x) \leq g(x)$.

:::corrige
1. $f(x) - g(x) = x^2 - x - 2 = (x - 2)(x + 1)$.
2. Pour $x = -1$ et $x = 2$ : les points $(-1 ; 0)$ et $(2 ; 3)$.
3. Le produit est négatif sur $]-1 ; 2[$ : $C_f$ y est au-dessous de $C_g$ ; il est positif ailleurs. $f(x) \leq g(x) \iff x \in [-1 ; 2]$.
:::
:::

:::exercice Lire des variations
Une fonction $f$ est définie sur $[-3 ; 5]$. On sait que $f(-3) = 2$, que $f$ décroît sur $[-3 ; 1]$ jusqu’à $f(1) = -2$, puis croît sur $[1 ; 5]$ jusqu’à $f(5) = 4$.

1. Donner le maximum et le minimum de $f$ sur $[-3 ; 5]$.
2. Comparer $f(2)$ et $f(3)$.
3. Combien l’équation $f(x) = 0$ a-t-elle de solutions ? Et l’équation $f(x) = 3$ ?

:::corrige
1. Maximum $4$ (en $5$) ; minimum $-2$ (en $1$).
2. $f$ est croissante sur $[1 ; 5]$ et $2 < 3$ : $f(2) \leq f(3)$.
3. Sur $[-3 ; 1]$, $f$ descend de $2$ à $-2$ : une solution de $f(x) = 0$ ; sur $[1 ; 5]$, elle monte de $-2$ à $4$ : une autre. Donc deux solutions. Pour $f(x) = 3$ : sur $[-3 ; 1]$, $f(x) \leq 2$, pas de solution ; sur $[1 ; 5]$, une solution. Donc une seule.
:::
:::
