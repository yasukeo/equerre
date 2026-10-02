---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets : une parabole et une droite, avec intersections et position relative, puis la recette d’un théâtre à maximiser, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : une parabole et une droite
Soit $f(x) = x^2 - 4x + 3$ et $g(x) = -x + 3$.

1. Déterminer le sommet de la parabole $C_f$, les variations de $f$ et son minimum.
2. Donner le sens de variation de $g$.
3. Calculer les coordonnées des points d’intersection de $C_f$ et de la droite $C_g$.
4. Étudier la position de $C_f$ par rapport à $C_g$.
5. Résoudre $f(x) \leq g(x)$.

:::corrige
1. $\alpha = 2$, $f(2) = -1$ : sommet $S(2 ; -1)$. $f$ décroît sur $]-\infty ; 2]$, croît sur $[2 ; +\infty[$ ; minimum $-1$.
2. $g$ est affine de coefficient $-1 < 0$ : décroissante sur $\mathbb{R}$.
3. $x^2 - 4x + 3 = -x + 3 \iff x^2 - 3x = 0 \iff x(x - 3) = 0$ : les points $(0 ; 3)$ et $(3 ; 0)$.
4. $f(x) - g(x) = x(x - 3)$ : négatif sur $]0 ; 3[$, où $C_f$ est au-dessous de $C_g$ ; positif ailleurs, où $C_f$ est au-dessus.
5. $S = [0 ; 3]$.
:::
:::

:::exercice Problème 2 : la recette d’un théâtre
Un théâtre fixe le prix du billet à $x$ dirhams, avec $20 \leq x \leq 100$. Une étude montre qu’il vend alors $400 - 4x$ billets.

1. Combien de billets sont vendus si le prix est de $30$ dirhams ? Quelle est la recette ?
2. Montrer que la recette est $R(x) = -4x^2 + 400x$.
3. Déterminer le sommet de la parabole et les variations de $R$ sur $[20 ; 100]$.
4. Quel prix faut-il fixer pour que la recette soit maximale ? Combien de billets sont alors vendus ?

:::corrige
1. $400 - 120 = 280$ billets ; recette $30 \times 280 = 8\,400$ dirhams.
2. $R(x) = x(400 - 4x) = -4x^2 + 400x$.
3. $\alpha = \frac{-400}{-8} = 50$ et $R(50) = -10\,000 + 20\,000 = 10\,000$. Comme $a = -4 < 0$, $R$ croît sur $[20 ; 50]$ et décroît sur $[50 ; 100]$.
4. Un billet à $50$ dirhams donne la recette maximale de $10\,000$ dirhams, avec $400 - 200 = 200$ billets vendus.
:::
:::
