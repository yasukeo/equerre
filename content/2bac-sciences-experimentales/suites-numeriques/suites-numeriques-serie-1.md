---
title: Série 1 — partie 1 : récurrence, monotonie, suites usuelles
kind: serie
summary: Raisonnement par récurrence, sens de variation, suites arithmétiques et géométriques, sommes de termes et suite auxiliaire, avec les corrigés.
position: 10
visibility: public
---

Six exercices sur la première partie du cours.

:::exercice Raisonnement par récurrence
1. Montrer que pour tout entier $n \geq 1$ : $1^2 + 2^2 + \cdots + n^2 = \dfrac{n(n + 1)(2n + 1)}{6}$.
2. Montrer que pour tout entier naturel $n$, $4^n - 1$ est un multiple de $3$.
3. Montrer que pour tout entier naturel $n$, $2^n \geq n + 1$.

:::corrige
1. Pour $n = 1$ : $1 = \frac{1 \times 2 \times 3}{6}$. Si l’égalité est vraie au rang $n$, alors

$$
1^2 + \cdots + n^2 + (n + 1)^2 = \frac{n(n + 1)(2n + 1)}{6} + (n + 1)^2 = \frac{(n + 1)\left(2n^2 + 7n + 6\right)}{6} = \frac{(n + 1)(n + 2)(2n + 3)}{6}
$$

qui est l’égalité au rang $n + 1$.

2. Pour $n = 0$ : $4^0 - 1 = 0 = 3 \times 0$. Si $4^n - 1 = 3k$ avec $k$ entier, alors $4^{n + 1} - 1 = 4 \times 4^n - 1 = 4(4^n - 1) + 3 = 3(4k + 1)$ : c’est un multiple de $3$.
3. Pour $n = 0$ : $1 \geq 1$. Si $2^n \geq n + 1$, alors $2^{n + 1} = 2 \times 2^n \geq 2n + 2 \geq n + 2$, car $n \geq 0$.
:::
:::

:::exercice Sens de variation
Étudier le sens de variation des suites suivantes.

1. $u_n = n^2 - 4n$ pour $n \in \mathbb{N}$.
2. $v_n = \dfrac{3^n}{n + 1}$ pour $n \in \mathbb{N}$.
3. $w_n = \dfrac{n + 2}{n + 1}$ pour $n \in \mathbb{N}$.

:::corrige
1. $u_{n + 1} - u_n = (n + 1)^2 - 4(n + 1) - n^2 + 4n = 2n - 3$. Ce nombre est négatif pour $n \leq 1$ et positif pour $n \geq 2$ : $u_0 > u_1 > u_2$, puis la suite est strictement croissante à partir du rang $2$.
2. Tous les termes sont strictement positifs et $\frac{v_{n + 1}}{v_n} = \frac{3^{n + 1}}{n + 2} \times \frac{n + 1}{3^n} = \frac{3(n + 1)}{n + 2}$. Or $3(n + 1) - (n + 2) = 2n + 1 > 0$, donc ce quotient est supérieur à $1$ : $(v_n)$ est strictement croissante.
3. $w_n = 1 + \frac{1}{n + 1}$, et $n \mapsto \frac{1}{n + 1}$ est strictement décroissante : $(w_n)$ est strictement décroissante.
:::
:::

:::exercice Suite arithmétique
$(u_n)$ est une suite arithmétique telle que $u_3 = 7$ et $u_8 = 22$.

1. Déterminer sa raison $r$ et son premier terme $u_0$.
2. Exprimer $u_n$ en fonction de $n$.
3. Calculer $S = u_0 + u_1 + \cdots + u_{20}$.

:::corrige
1. $u_8 = u_3 + 5r$, donc $5r = 15$ et $r = 3$. Puis $u_0 = u_3 - 3r = 7 - 9 = -2$.
2. $u_n = -2 + 3n$.
3. $S$ compte $21$ termes : $S = 21 \times \frac{u_0 + u_{20}}{2} = 21 \times \frac{-2 + 58}{2} = 588$.
:::
:::

:::exercice Suite géométrique
Soit $(u_n)$ la suite géométrique de premier terme $u_0 = 3$ et de raison $q = \frac{1}{2}$.

1. Exprimer $u_n$ en fonction de $n$ et calculer $\lim u_n$.
2. Calculer $S_n = u_0 + u_1 + \cdots + u_n$ et sa limite.

:::corrige
1. $u_n = 3\left(\frac{1}{2}\right)^n$. Comme $-1 < \frac{1}{2} < 1$, $\lim \left(\frac{1}{2}\right)^n = 0$, donc $\lim u_n = 0$.
2. $S_n = 3 \times \dfrac{1 - \left(\frac{1}{2}\right)^{n + 1}}{1 - \frac{1}{2}} = 6\left(1 - \left(\frac{1}{2}\right)^{n + 1}\right)$, donc $\lim S_n = 6$.
:::
:::

:::exercice Suite auxiliaire
Soit $(u_n)$ définie par $u_0 = 5$ et $u_{n + 1} = \frac{1}{3} u_n + 2$. On pose $v_n = u_n - 3$.

1. Montrer que $(v_n)$ est géométrique.
2. En déduire $u_n$ en fonction de $n$, puis $\lim u_n$.

:::corrige
1. $v_{n + 1} = u_{n + 1} - 3 = \frac{1}{3} u_n - 1 = \frac{1}{3}(u_n - 3) = \frac{1}{3} v_n$ : $(v_n)$ est géométrique de raison $\frac{1}{3}$ et de premier terme $v_0 = 2$.
2. $v_n = 2\left(\frac{1}{3}\right)^n$, donc $u_n = 3 + 2\left(\frac{1}{3}\right)^n$, et $\lim u_n = 3$.
:::
:::

:::exercice Suite arithmético-géométrique
Soit $(u_n)$ définie par $u_0 = 1$ et $u_{n + 1} = 2u_n - 3$.

1. Calculer $u_1$, $u_2$ et $u_3$. La suite est-elle arithmétique ? géométrique ?
2. Déterminer le réel $\ell$ tel que $\ell = 2\ell - 3$, et montrer que $v_n = u_n - \ell$ définit une suite géométrique.
3. En déduire $u_n$ en fonction de $n$, puis $\lim u_n$.

:::corrige
1. $u_1 = -1$, $u_2 = -5$, $u_3 = -13$. $u_1 - u_0 = -2 \neq u_2 - u_1 = -4$ : pas arithmétique ; $\frac{u_1}{u_0} = -1 \neq \frac{u_2}{u_1} = 5$ : pas géométrique.
2. $\ell = 3$. $v_{n + 1} = u_{n + 1} - 3 = 2u_n - 6 = 2v_n$ : $(v_n)$ est géométrique de raison $2$ et de premier terme $v_0 = -2$.
3. $v_n = -2 \times 2^n$, donc $u_n = 3 - 2^{n + 1}$. Comme $2 > 1$, $\lim 2^{n + 1} = +\infty$, donc $\lim u_n = -\infty$.
:::
:::
