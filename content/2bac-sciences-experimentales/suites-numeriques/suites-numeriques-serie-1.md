---
title: Série 1 : suites numériques
kind: serie
summary: Récurrence, suites arithmétiques et géométriques, suite auxiliaire, convergence d’une suite définie par récurrence, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices, de la récurrence à l’étude complète d’une suite.

:::exercice Raisonnement par récurrence
Montrer que pour tout entier $n \geq 1$ :

$$
1 + 2 + \cdots + n = \frac{n(n + 1)}{2}
$$

:::corrige
- Pour $n = 1$ : $1 = \frac{1 \times 2}{2}$.
- Supposons l’égalité vraie pour un entier $n \geq 1$. Alors $1 + 2 + \cdots + n + (n + 1) = \frac{n(n + 1)}{2} + (n + 1) = \frac{(n + 1)(n + 2)}{2}$, qui est l’égalité au rang $n + 1$.

Elle est donc vraie pour tout $n \geq 1$.
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

:::exercice Suite définie par une fonction
Soit $f(x) = \dfrac{4x + 2}{x + 3}$ sur $[0 ; +\infty[$ et $(u_n)$ définie par $u_0 = 0$ et $u_{n + 1} = f(u_n)$.

1. Montrer que $f$ est croissante sur $[0 ; +\infty[$.
2. Montrer par récurrence que $0 \leq u_n \leq 2$ pour tout $n$.
3. Montrer que $(u_n)$ est croissante, puis qu’elle converge, et déterminer sa limite.

:::corrige
1. $f'(x) = \dfrac{4(x + 3) - (4x + 2)}{(x + 3)^2} = \dfrac{10}{(x + 3)^2} > 0$ : $f$ est croissante.
2. $u_0 = 0 \in [0 ; 2]$. Si $0 \leq u_n \leq 2$, comme $f$ est croissante, $f(0) \leq u_{n + 1} \leq f(2)$, avec $f(0) = \frac{2}{3}$ et $f(2) = 2$, donc $0 \leq u_{n + 1} \leq 2$.
3. $u_{n + 1} - u_n = \dfrac{4u_n + 2 - u_n(u_n + 3)}{u_n + 3} = \dfrac{-u_n^2 + u_n + 2}{u_n + 3} = \dfrac{(2 - u_n)(u_n + 1)}{u_n + 3} \geq 0$ car $0 \leq u_n \leq 2$. La suite est croissante et majorée par $2$ : elle converge vers un réel $\ell \in [0 ; 2]$. $f$ est continue sur $[0 ; 2]$ et $f([0 ; 2]) = [\frac{2}{3} ; 2] \subset [0 ; 2]$, donc $\ell = f(\ell)$ : $\ell(\ell + 3) = 4\ell + 2$, soit $\ell^2 - \ell - 2 = 0$, d’où $\ell = 2$ ou $\ell = -1$. Comme $\ell \geq 0$, $\lim u_n = 2$.
:::
:::
