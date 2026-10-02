---
title: Série 1 — partie 2 : suites géométriques et convergence
kind: serie
summary: Limites de qⁿ et des suites géométriques, limite d’une somme géométrique, suite auxiliaire et limite, comparaison et gendarmes, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Limites de qⁿ
Calculer la limite de chaque suite, si elle existe.

1. $u_n = 3^n$
2. $v_n = \left(\dfrac{2}{3}\right)^n$
3. $w_n = 4 \times (0{,}5)^n + 1$
4. $t_n = (-3)^n$

:::corrige
1. $3 > 1$ : $+\infty$.
2. $0 < \frac{2}{3} < 1$ : $0$.
3. $(0{,}5)^n \to 0$ : la limite vaut $1$.
4. $-3 \leq -1$ : pas de limite.
:::
:::

:::exercice Limite d’une somme
Soit $S_n = 1 + \dfrac{1}{3} + \dfrac{1}{9} + \cdots + \left(\dfrac{1}{3}\right)^n$.

1. Exprimer $S_n$ en fonction de $n$.
2. En déduire $\lim S_n$.

:::corrige
1. $S_n = \frac{1 - \left(\frac{1}{3}\right)^{n + 1}}{1 - \frac{1}{3}} = \frac{3}{2}\left(1 - \left(\frac{1}{3}\right)^{n + 1}\right)$.
2. $\left(\frac{1}{3}\right)^{n + 1} \to 0$, donc $\lim S_n = \frac{3}{2}$.
:::
:::

:::exercice Suite auxiliaire et limite
Soit $u_0 = 10$ et $u_{n + 1} = 0{,}5\,u_n + 3$. On pose $v_n = u_n - 6$.

1. Montrer que $(v_n)$ est géométrique de raison $0{,}5$.
2. Exprimer $u_n$ en fonction de $n$ et calculer $\lim u_n$.

:::corrige
1. $v_{n + 1} = u_{n + 1} - 6 = 0{,}5u_n - 3 = 0{,}5(u_n - 6) = 0{,}5v_n$.
2. $v_0 = 4$, $v_n = 4 \times 0{,}5^n$, $u_n = 6 + 4 \times 0{,}5^n$, et $\lim u_n = 6$.
:::
:::

:::exercice Comparaison
1. Montrer que pour tout $n$, $n^2 + (-1)^n \geq n^2 - 1$, et en déduire la limite de $u_n = n^2 + (-1)^n$.
2. Montrer que pour tout $n \geq 1$, $\dfrac{-1}{n^2} \leq \dfrac{(-1)^n}{n^2} \leq \dfrac{1}{n^2}$, et en déduire la limite de $v_n = \dfrac{(-1)^n}{n^2}$.

:::corrige
1. $(-1)^n \geq -1$ ; et $n^2 - 1 \to +\infty$, donc $\lim u_n = +\infty$.
2. $-1 \leq (-1)^n \leq 1$, on divise par $n^2 > 0$ ; les deux bornes tendent vers $0$ : $\lim v_n = 0$.
:::
:::
