---
title: Série 1 — partie 2 : fonctions homographiques
kind: serie
summary: Deux études complètes de fonctions homographiques, une équation résolue par le calcul et lue sur la courbe, et un centre de symétrie, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Une fonction décroissante
Soit $f(x) = \dfrac{x + 3}{x - 2}$.

1. Donner $D_f$, puis les limites aux bornes, et en déduire les asymptotes.
2. Calculer $f'(x)$ et donner les variations de $f$.
3. Trouver les points d’intersection de la courbe avec les axes.

:::corrige
1. $D_f = \mathbb{R} \setminus \{2\}$. En $\pm\infty$ : limite $1$, asymptote $y = 1$. En $2$ : le numérateur tend vers $5$ ; $+\infty$ à droite, $-\infty$ à gauche ; asymptote $x = 2$.
2. $f'(x) = \frac{(x - 2) - (x + 3)}{(x - 2)^2} = \frac{-5}{(x - 2)^2} < 0$ : $f$ est décroissante sur $]-\infty ; 2[$ et sur $]2 ; +\infty[$.
3. $f(x) = 0 \iff x = -3$ : point $(-3 ; 0)$. $f(0) = -\frac{3}{2}$ : point $\left(0 ; -\frac{3}{2}\right)$.
:::
:::

:::exercice Une fonction croissante
Soit $g(x) = \dfrac{2x - 4}{x + 1}$.

1. Donner $D_g$, les limites aux bornes et les asymptotes.
2. Étudier les variations de $g$.
3. Trouver les points d’intersection de la courbe avec les axes.

:::corrige
1. $D_g = \mathbb{R} \setminus \{-1\}$. En $\pm\infty$ : limite $2$, asymptote $y = 2$. En $-1$ : le numérateur tend vers $-6$ ; à droite $x + 1 \to 0^+$ et $g(x) \to -\infty$ ; à gauche $g(x) \to +\infty$. Asymptote $x = -1$.
2. $g'(x) = \frac{2(x + 1) - (2x - 4)}{(x + 1)^2} = \frac{6}{(x + 1)^2} > 0$ : $g$ est croissante sur $]-\infty ; -1[$ et sur $]-1 ; +\infty[$.
3. $g(x) = 0 \iff x = 2$ : point $(2 ; 0)$. $g(0) = -4$ : point $(0 ; -4)$.
:::
:::

:::exercice Résoudre une équation
Avec $f(x) = \dfrac{x + 3}{x - 2}$ :

1. Résoudre $f(x) = 2$.
2. Résoudre $f(x) = 1$. Expliquer le résultat avec la courbe.

:::corrige
1. Pour $x \neq 2$ : $x + 3 = 2(x - 2) \iff x = 7$. Vérification : $f(7) = \frac{10}{5} = 2$.
2. $x + 3 = x - 2$ donne $3 = -2$ : pas de solution. La courbe ne coupe jamais son asymptote horizontale $y = 1$.
:::
:::

:::exercice Un centre de symétrie
1. Montrer que pour $x \neq 2$, $f(x) = \dfrac{x + 3}{x - 2} = 1 + \dfrac{5}{x - 2}$.
2. Montrer que $f(4 - x) + f(x) = 2$ pour tout $x \neq 2$. Qu’en déduire ?

:::corrige
1. $1 + \frac{5}{x - 2} = \frac{x - 2 + 5}{x - 2} = \frac{x + 3}{x - 2}$.
2. $f(4 - x) = 1 + \frac{5}{2 - x} = 1 - \frac{5}{x - 2}$, donc $f(4 - x) + f(x) = 2$. Le point $\Omega(2 ; 1)$, intersection des asymptotes, est centre de symétrie de la courbe.
:::
:::
