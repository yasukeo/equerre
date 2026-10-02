---
title: Série 1 — partie 1 : définition, parité, variations
kind: serie
summary: Ensembles de définition, images et antécédents, points d’une courbe, parité, sens de variation par la définition et minimum, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Ensembles de définition
Déterminer l’ensemble de définition de chaque fonction.

1. $f_1(x) = 3x^2 - x + 2$
2. $f_2(x) = \dfrac{2x}{x + 5}$
3. $f_3(x) = \sqrt{6 - 3x}$
4. $f_4(x) = \dfrac{1}{x^2 - 9}$

:::corrige
1. $\mathbb{R}$.
2. $x + 5 \neq 0$ : $\mathbb{R} \setminus \{-5\}$.
3. $6 - 3x \geq 0 \iff x \leq 2$ : $]-\infty ; 2]$.
4. $x^2 - 9 = 0 \iff x = 3$ ou $x = -3$ : $\mathbb{R} \setminus \{-3 ; 3\}$.
:::
:::

:::exercice Images et antécédents
Soit $f(x) = x^2 - 2x$.

1. Calculer les images de $-1$, $0$ et $3$.
2. Trouver les antécédents de $3$.
3. Les points $A(2 ; 0)$ et $B(1 ; 1)$ sont-ils sur la courbe de $f$ ?

:::corrige
1. $f(-1) = 1 + 2 = 3$, $f(0) = 0$, $f(3) = 9 - 6 = 3$.
2. $x^2 - 2x = 3 \iff x^2 - 2x - 3 = 0 \iff (x - 3)(x + 1) = 0$ : les antécédents sont $3$ et $-1$.
3. $f(2) = 0$ : $A$ est sur la courbe. $f(1) = -1 \neq 1$ : $B$ n’y est pas.
:::
:::

:::exercice Parité
Étudier la parité de chaque fonction.

1. $f(x) = 2x^4 - x^2$
2. $g(x) = \dfrac{x}{x^2 + 1}$
3. $h(x) = x^2 + 2x$
4. $k(x) = \dfrac{1}{x - 1}$

:::corrige
1. Définie sur $\mathbb{R}$ ; $f(-x) = 2x^4 - x^2 = f(x)$ : paire.
2. $x^2 + 1 > 0$, donc $g$ est définie sur $\mathbb{R}$ ; $g(-x) = \frac{-x}{x^2 + 1} = -g(x)$ : impaire.
3. $h(1) = 3$ et $h(-1) = -1$ : ni paire ni impaire.
4. $D_k = \mathbb{R} \setminus \{1\}$ n’est pas symétrique ($-1$ y est, mais pas $1$) : ni paire ni impaire.
:::
:::

:::exercice Sens de variation et minimum
1. Montrer, avec la définition, que $f(x) = -2x + 5$ est décroissante sur $\mathbb{R}$.
2. Montrer que $g(x) = \dfrac{1}{x}$ est décroissante sur $]0 ; +\infty[$.
3. Montrer que $h(x) = (x - 3)^2 + 2$ admet un minimum sur $\mathbb{R}$, et le donner.

:::corrige
1. Si $a < b$, alors $-2a > -2b$, et $-2a + 5 > -2b + 5$ : $f(a) > f(b)$.
2. Si $0 < a < b$, alors $\frac{1}{a} > \frac{1}{b}$ (deux nombres positifs sont rangés dans l’ordre inverse de leurs inverses) : $g$ est décroissante.
3. $(x - 3)^2 \geq 0$, donc $h(x) \geq 2 = h(3)$ : le minimum est $2$, atteint en $3$.
:::
:::
