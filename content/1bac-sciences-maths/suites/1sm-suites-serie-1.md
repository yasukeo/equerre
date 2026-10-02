---
title: Série 1 — partie 1 : généralités
kind: serie
summary: Calculer des termes, suites bornées, sens de variation par trois méthodes, raisonnement par récurrence sur une suite, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Calculer des termes
1. Soit $u_n = \dfrac{2n - 1}{n + 2}$. Calculer $u_0$, $u_1$, $u_{10}$, puis exprimer $u_{n + 1}$ en fonction de $n$.
2. Soit $v_0 = 1$ et $v_{n + 1} = v_n^2 - 2v_n + 2$. Calculer $v_1$, $v_2$.

:::corrige
1. $u_0 = -\frac{1}{2}$, $u_1 = \frac{1}{3}$, $u_{10} = \frac{19}{12}$, $u_{n + 1} = \frac{2n + 1}{n + 3}$.
2. $v_1 = 1 - 2 + 2 = 1$, $v_2 = 1$ : la suite est constante.
:::
:::

:::exercice Suites bornées
1. Montrer que $u_n = \dfrac{3n + 1}{n + 1}$ vérifie $1 \leq u_n < 3$.
2. Montrer que $v_n = \dfrac{(-1)^n}{n + 1}$ est bornée.

:::corrige
1. $u_n = 3 - \frac{2}{n + 1}$. Comme $0 < \frac{2}{n + 1} \leq 2$, $1 \leq u_n < 3$.
2. $|v_n| = \frac{1}{n + 1} \leq 1$, donc $-1 \leq v_n \leq 1$.
:::
:::

:::exercice Sens de variation
Étudier le sens de variation de chaque suite.

1. $u_n = \dfrac{n + 2}{n + 1}$
2. $v_n = \dfrac{5^n}{3^{n + 1}}$
3. $w_n = n^2 - 6n + 1$

:::corrige
1. $u_n = 1 + \frac{1}{n + 1}$, et $n \mapsto \frac{1}{n + 1}$ est décroissante : décroissante.
2. $v_n > 0$ et $\frac{v_{n + 1}}{v_n} = \frac{5}{3} > 1$ : croissante.
3. $w_{n + 1} - w_n = 2n - 5$ : positif pour $n \geq 3$ ; la suite décroît jusqu’à $w_3$ puis croît.
:::
:::

:::exercice Récurrence
Soit $u_0 = 1$ et $u_{n + 1} = \sqrt{u_n + 6}$.

1. Montrer par récurrence que $0 \leq u_n \leq 3$ pour tout $n$.
2. Montrer que $u_{n + 1}^2 - u_n^2 = (3 - u_n)(2 + u_n)$ et en déduire que la suite est croissante.

:::corrige
1. $u_0 = 1 \in [0 ; 3]$. Si $0 \leq u_n \leq 3$, alors $6 \leq u_n + 6 \leq 9$, donc $\sqrt{6} \leq u_{n + 1} \leq 3$.
2. $u_{n + 1}^2 - u_n^2 = u_n + 6 - u_n^2 = (3 - u_n)(2 + u_n) \geq 0$. Les termes étant positifs, $u_{n + 1} \geq u_n$.
:::
:::
