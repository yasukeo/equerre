---
title: Devoir surveillé : étude de fonctions
kind: devoir
summary: Un devoir d’une heure sur 20 points : étude d’un polynôme du troisième degré et étude d’une fonction homographique avec ses asymptotes, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (10 points) : un polynôme
Soit $f(x) = x^3 - 3x^2$.

1. Calculer les limites de $f$ en $+\infty$ et en $-\infty$. (2 pts)
2. Calculer $f'(x)$ et étudier son signe. (3 pts)
3. Donner les variations de $f$, son maximum local et son minimum local. (3 pts)
4. Trouver les points d’intersection de la courbe avec l’axe des abscisses. (2 pts)

:::corrige
1. Comme $x^3$ : $+\infty$ en $+\infty$, $-\infty$ en $-\infty$.
2. $f'(x) = 3x^2 - 6x = 3x(x - 2)$ : positive à l’extérieur de $0$ et $2$, négative entre.
3. $f$ croît sur $]-\infty ; 0]$, décroît sur $[0 ; 2]$, croît sur $[2 ; +\infty[$. Maximum local $f(0) = 0$ ; minimum local $f(2) = 8 - 12 = -4$.
4. $x^2(x - 3) = 0 \iff x = 0$ ou $x = 3$ : les points $(0 ; 0)$ et $(3 ; 0)$.
:::
:::

:::exercice Exercice 2 (10 points) : une fonction homographique
Soit $g(x) = \dfrac{2x + 3}{x - 1}$.

1. Donner l’ensemble de définition de $g$. (1 pt)
2. Calculer les limites de $g$ en $\pm\infty$ et en déduire une asymptote. (2 pts)
3. Calculer les limites de $g$ à droite et à gauche en $1$ et en déduire une asymptote. (3 pts)
4. Calculer $g'(x)$ et donner les variations de $g$. (3 pts)
5. Trouver les points d’intersection de la courbe avec les axes. (1 pt)

:::corrige
1. $D_g = \mathbb{R} \setminus \{1\}$.
2. Comme $\frac{2x}{x} = 2$ : limite $2$ ; asymptote horizontale $y = 2$.
3. Le numérateur tend vers $5$ ; à droite $x - 1 \to 0^+$ : $+\infty$ ; à gauche : $-\infty$. Asymptote verticale $x = 1$.
4. $g'(x) = \frac{2(x - 1) - (2x + 3)}{(x - 1)^2} = \frac{-5}{(x - 1)^2} < 0$ : $g$ est décroissante sur $]-\infty ; 1[$ et sur $]1 ; +\infty[$.
5. $g(x) = 0 \iff x = -\frac{3}{2}$ : point $\left(-\frac{3}{2} ; 0\right)$ ; $g(0) = -3$ : point $(0 ; -3)$.
:::
:::
