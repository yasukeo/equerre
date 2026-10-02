---
title: Série 1 — partie 2 : fonctions de référence et courbes
kind: serie
summary: Forme canonique d’un trinôme, fonction homographique et son centre, axes et centres de symétrie, translations et résolution graphique, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Trinômes
Pour chaque fonction, donner la forme canonique, le sommet de la parabole et le tableau de variations.

1. $f(x) = x^2 + 6x + 5$
2. $g(x) = -2x^2 + 4x + 1$

:::corrige
1. $f(x) = (x + 3)^2 - 4$ : sommet $(-3 ; -4)$ ; $f$ décroît sur $]-\infty ; -3]$ et croît ensuite, minimum $-4$.
2. $g(x) = -2(x - 1)^2 + 3$ : sommet $(1 ; 3)$ ; $g$ croît sur $]-\infty ; 1]$ et décroît ensuite, maximum $3$.
:::
:::

:::exercice Fonction homographique
Soit $f(x) = \dfrac{3x - 1}{x + 2}$.

1. Déterminer $D_f$ et les réels $\beta$ et $k$ tels que $f(x) = \beta + \dfrac{k}{x + 2}$.
2. En déduire le centre de symétrie de la courbe, ses asymptotes et le sens de variation de $f$.

:::corrige
1. $D_f = \mathbb{R} \setminus \{-2\}$. $3x - 1 = 3(x + 2) - 7$, donc $f(x) = 3 - \frac{7}{x + 2}$ : $\beta = 3$, $k = -7$.
2. Centre $\Omega(-2 ; 3)$, asymptotes $x = -2$ et $y = 3$. Comme $k < 0$, $f$ est croissante sur $]-\infty ; -2[$ et sur $]-2 ; +\infty[$.
:::
:::

:::exercice Symétries
1. Soit $f(x) = x^4 - 4x^3 + 4x^2$. Vérifier que $f(x) = x^2(x - 2)^2$, puis montrer que la droite $x = 1$ est un axe de symétrie de sa courbe.
2. Montrer que $\Omega(1 ; 2)$ est un centre de symétrie de la courbe de $g(x) = \dfrac{2x - 1}{x - 1}$.

:::corrige
1. $x^2(x - 2)^2 = x^2(x^2 - 4x + 4) = x^4 - 4x^3 + 4x^2$. Puis $f(2 - x) = (2 - x)^2(2 - x - 2)^2 = (2 - x)^2 x^2 = f(x)$.
2. $g(x) = 2 + \frac{1}{x - 1}$, donc $g(2 - x) = 2 + \frac{1}{1 - x}$ et $g(2 - x) + g(x) = 4 = 2 \times 2$.
:::
:::

:::exercice Translation et lecture graphique
Soit $f(x) = \sqrt{x}$ et $g(x) = \sqrt{x + 3} - 1$.

1. Comment obtient-on la courbe de $g$ à partir de celle de $f$ ?
2. Résoudre par le calcul $g(x) = 1$, puis $g(x) \geq 0$.

:::corrige
1. Par la translation de vecteur $-3\vec{i} - \vec{j}$ : $3$ vers la gauche et $1$ vers le bas.
2. $\sqrt{x + 3} = 2 \iff x + 3 = 4 \iff x = 1$. $\sqrt{x + 3} \geq 1 \iff x + 3 \geq 1 \iff x \geq -2$ : $S = [-2 ; +\infty[$.
:::
:::
