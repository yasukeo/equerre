---
title: Devoir surveillé : généralités sur les fonctions
kind: devoir
summary: Un devoir d’une heure sur 20 points : ensemble de définition, parité, forme canonique et variations d’un trinôme, fonction homographique, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : définition et parité
1. Déterminer l’ensemble de définition de $f(x) = \dfrac{\sqrt{x + 4}}{x - 1}$. (2 pts)
2. Étudier la parité de $g(x) = \dfrac{x}{x^2 + 1}$ et de $h(x) = x^2 - |x|$. (4 pts)

:::corrige
1. $x + 4 \geq 0$ et $x \neq 1$ : $[-4 ; 1[ \cup ]1 ; +\infty[$.
2. Les deux sont définies sur $\mathbb{R}$. $g(-x) = \frac{-x}{x^2 + 1} = -g(x)$ : impaire. $h(-x) = x^2 - |x| = h(x)$ : paire.
:::
:::

:::exercice Exercice 2 (7 points) : un trinôme
Soit $f(x) = x^2 + 4x + 1$.

1. Écrire $f(x)$ sous forme canonique. (2 pts)
2. Montrer que le taux de variation vaut $x_1 + x_2 + 4$ et en déduire les variations de $f$. (3 pts)
3. Donner le minimum de $f$. (2 pts)

:::corrige
1. $f(x) = (x + 2)^2 - 4 + 1 = (x + 2)^2 - 3$.
2. $f(x_1) - f(x_2) = (x_1 - x_2)(x_1 + x_2) + 4(x_1 - x_2)$, donc $T = x_1 + x_2 + 4$. Sur $]-\infty ; -2]$, $T < 0$ : décroissante ; sur $[-2 ; +\infty[$, $T > 0$ : croissante.
3. Le minimum est $f(-2) = -3$.
:::
:::

:::exercice Exercice 3 (7 points) : une fonction homographique
Soit $g(x) = \dfrac{3x + 1}{x - 1}$.

1. Donner l’ensemble de définition de $g$. (1 pt)
2. Montrer que $g(x) = 3 + \dfrac{4}{x - 1}$. (2 pts)
3. Donner le centre et les asymptotes de sa courbe. (2 pts)
4. Donner les variations de $g$. (2 pts)

:::corrige
1. $\mathbb{R} \setminus \{1\}$.
2. $\frac{3(x - 1) + 4}{x - 1} = 3 + \frac{4}{x - 1}$.
3. Centre $(1 ; 3)$ ; asymptotes $x = 1$ et $y = 3$.
4. $k = 4 > 0$ : $g$ est décroissante sur $]-\infty ; 1[$ et sur $]1 ; +\infty[$.
:::
:::
