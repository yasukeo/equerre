---
title: Série 1 — partie 2 : sens de variation et extremums
kind: serie
summary: Variations d’un polynôme du second et du troisième degré, d’un quotient, et maximisation d’un bénéfice, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Un polynôme du second degré
Soit $f(x) = -2x^2 + 8x - 3$ sur $\mathbb{R}$.

1. Calculer $f'(x)$ et étudier son signe.
2. En déduire les variations de $f$ et son extremum.

:::corrige
1. $f'(x) = -4x + 8$ : positive pour $x < 2$, négative pour $x > 2$.
2. $f$ est croissante sur $]-\infty ; 2]$ et décroissante sur $[2 ; +\infty[$. Son maximum est $f(2) = -8 + 16 - 3 = 5$.
:::
:::

:::exercice Un polynôme du troisième degré
Soit $g(x) = x^3 - 3x^2 + 2$ sur $\mathbb{R}$.

1. Montrer que $g'(x) = 3x(x - 2)$.
2. Étudier le signe de $g'(x)$ et donner les variations de $g$.
3. Donner le maximum local et le minimum local de $g$.

:::corrige
1. $g'(x) = 3x^2 - 6x = 3x(x - 2)$.
2. Le trinôme $3x(x - 2)$ est positif à l’extérieur de $0$ et $2$, négatif entre eux : $g$ est croissante sur $]-\infty ; 0]$, décroissante sur $[0 ; 2]$, croissante sur $[2 ; +\infty[$.
3. Maximum local $g(0) = 2$ ; minimum local $g(2) = 8 - 12 + 2 = -2$.
:::
:::

:::exercice Un quotient
Soit $h(x) = \dfrac{2x - 1}{x + 1}$ sur $]-1 ; +\infty[$. Calculer $h'(x)$ et en déduire le sens de variation de $h$.

:::corrige
$h'(x) = \frac{2(x + 1) - (2x - 1) \times 1}{(x + 1)^2} = \frac{3}{(x + 1)^2}$. Le numérateur et le dénominateur sont positifs : $h'(x) > 0$, et $h$ est croissante sur $]-1 ; +\infty[$.
:::
:::

:::exercice Un bénéfice
Une coopérative fabrique $x$ centaines de tapis par an, avec $0 \leq x \leq 40$. Son bénéfice, en milliers de dirhams, est $B(x) = -x^2 + 40x - 300$.

1. Calculer $B'(x)$ et étudier les variations de $B$.
2. Combien de tapis faut-il fabriquer pour que le bénéfice soit maximal ? Quel est ce bénéfice ?

:::corrige
1. $B'(x) = -2x + 40$ : positive pour $x < 20$, négative pour $x > 20$. $B$ est croissante sur $[0 ; 20]$ et décroissante sur $[20 ; 40]$.
2. Le maximum est $B(20) = -400 + 800 - 300 = 100$ : il faut fabriquer $2\,000$ tapis, pour un bénéfice de $100\,000$ dirhams.
:::
:::
