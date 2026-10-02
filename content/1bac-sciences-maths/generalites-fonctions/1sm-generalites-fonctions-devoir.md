---
title: Devoir surveillé : généralités sur les fonctions
kind: devoir
summary: Un devoir d’une heure sur 20 points : ensemble de définition et parité, une fonction bornée, un trinôme et une fonction homographique, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : définition et parité
1. Déterminer l’ensemble de définition de $f(x) = \dfrac{x^3}{x^2 - 9}$ et étudier sa parité. (3 pts)
2. Déterminer l’ensemble de définition de $g(x) = \sqrt{x^2 - 1}$ et étudier sa parité. (3 pts)

:::corrige
1. $D_f = \mathbb{R} \setminus \{-3 ; 3\}$, symétrique ; $f(-x) = \frac{-x^3}{x^2 - 9} = -f(x)$ : impaire.
2. $x^2 - 1 \geq 0 \iff x \leq -1$ ou $x \geq 1$ : $D_g = ]-\infty ; -1] \cup [1 ; +\infty[$, symétrique ; $g(-x) = g(x)$ : paire.
:::
:::

:::exercice Exercice 2 (5 points) : une fonction bornée
Soit $f(x) = \dfrac{x^2}{x^2 + 4}$ sur $\mathbb{R}$.

1. Montrer que $0 \leq f(x) < 1$ pour tout réel $x$. (3 pts)
2. $f$ admet-elle un minimum ? un maximum ? (2 pts)

:::corrige
1. $f(x) \geq 0$ (quotient de positifs) et $1 - f(x) = \frac{4}{x^2 + 4} > 0$.
2. Minimum $f(0) = 0$. Pas de maximum : $f(x) < 1$ toujours, et $f(x)$ s’approche de $1$ quand $x$ devient grand, sans l’atteindre.
:::
:::

:::exercice Exercice 3 (9 points) : trinôme et homographique
1. Soit $f(x) = -x^2 + 4x - 1$. Écrire $f(x)$ sous forme canonique, donner le sommet de sa parabole et son tableau de variations. (4 pts)
2. Soit $g(x) = \dfrac{x + 1}{x - 2}$. Écrire $g(x) = 1 + \dfrac{k}{x - 2}$, puis donner le centre de symétrie, les asymptotes et le sens de variation. (5 pts)

:::corrige
1. $f(x) = -(x - 2)^2 + 3$ : sommet $(2 ; 3)$ ; $f$ croît sur $]-\infty ; 2]$ et décroît ensuite, maximum $3$.
2. $x + 1 = (x - 2) + 3$ : $g(x) = 1 + \frac{3}{x - 2}$. Centre $\Omega(2 ; 1)$, asymptotes $x = 2$ et $y = 1$ ; $k = 3 > 0$, donc $g$ est décroissante sur $]-\infty ; 2[$ et sur $]2 ; +\infty[$.
:::
:::
