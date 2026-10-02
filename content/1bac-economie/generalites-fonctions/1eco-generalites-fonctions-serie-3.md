---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets sur les fonctions : un trinôme et une homographique, leurs variations, leurs courbes et la position relative, puis une composée, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : une parabole et une hyperbole
Soit $f(x) = x^2 - 2x - 1$ et $g(x) = \dfrac{x - 3}{x - 1}$.

1. Écrire $f(x)$ sous forme canonique et dresser son tableau de variations.
2. Écrire $g(x)$ sous la forme $1 + \dfrac{k}{x - 1}$ et en déduire ses variations, son centre de symétrie et ses asymptotes.
3. Montrer que, pour $x \neq 1$, $f(x) = g(x) \iff x^3 - 3x^2 + 4 = 0$. Vérifier que $2$ est solution de cette équation, factoriser $x^3 - 3x^2 + 4$ et résoudre $f(x) = g(x)$.
4. Interpréter graphiquement.

:::corrige
1. $f(x) = (x - 1)^2 - 2$ : décroissante sur $]-\infty ; 1]$, croissante ensuite, minimum $-2$.
2. $x - 3 = (x - 1) - 2$, donc $g(x) = 1 - \frac{2}{x - 1}$ : $k = -2 < 0$, $g$ est croissante sur $]-\infty ; 1[$ et sur $]1 ; +\infty[$ ; centre $\Omega(1 ; 1)$, asymptotes $x = 1$ et $y = 1$.
3. Pour $x \neq 1$ : $f(x) = g(x) \iff (x^2 - 2x - 1)(x - 1) = x - 3 \iff x^3 - 3x^2 + x + 1 = x - 3 \iff x^3 - 3x^2 + 4 = 0$. $x = 2$ est solution ($8 - 12 + 4 = 0$) et $x^3 - 3x^2 + 4 = (x - 2)(x^2 - x - 2) = (x - 2)^2(x + 1)$. Les solutions sont $x = 2$ et $x = -1$.
4. Les courbes se coupent au point d’abscisse $-1$, de coordonnées $(-1 ; 2)$, et se touchent au point $(2 ; -1)$ (racine double : elles y ont la même tangente).
:::
:::

:::exercice Problème 2 : une fonction composée
Soit $f(x) = \sqrt{x^2 - 2x + 5}$.

1. Montrer que $f$ est définie sur $\mathbb{R}$.
2. Écrire $f$ comme composée de $u(x) = x^2 - 2x + 5$ et de $v(x) = \sqrt{x}$, et en déduire ses variations.
3. Montrer que la droite $x = 1$ est un axe de symétrie de la courbe de $f$.
4. Déterminer le minimum de $f$ et montrer que $f$ est minorée par $2$.

:::corrige
1. $x^2 - 2x + 5 = (x - 1)^2 + 4 > 0$ pour tout $x$.
2. $f = v \circ u$. $u$ décroît sur $]-\infty ; 1]$ et croît sur $[1 ; +\infty[$ ; $v$ est croissante. Donc $f$ décroît sur $]-\infty ; 1]$ et croît sur $[1 ; +\infty[$.
3. $u(2 - x) = (1 - x)^2 + 4 = u(x)$, donc $f(2 - x) = f(x)$.
4. Le minimum est $f(1) = \sqrt{4} = 2$ : $f(x) \geq 2$ pour tout réel $x$.
:::
:::
