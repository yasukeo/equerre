---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux problèmes sur les suites rédigés comme à l’examen national : suite homographique et suite arithmétique auxiliaire, suite auxiliaire géométrique et somme de termes, avec les corrigés.
position: 30
visibility: enrolled
---

Deux problèmes complets, comme l’exercice sur les suites de l’examen national.

:::exercice Problème 1 : une suite homographique
Soit $(u_n)$ la suite définie par $u_0 = 3$ et, pour tout $n \in \mathbb{N}$, $u_{n + 1} = \dfrac{5u_n - 4}{u_n + 1}$.

1. Montrer que pour tout $n$, $u_{n + 1} - 2 = \dfrac{3(u_n - 2)}{u_n + 1}$.
2. Montrer par récurrence que $u_n > 2$ pour tout $n$.
3. Étudier le sens de variation de $(u_n)$.
4. On pose $v_n = \dfrac{1}{u_n - 2}$. Montrer que $(v_n)$ est une suite arithmétique de raison $\frac{1}{3}$.
5. En déduire $v_n$, puis $u_n$ en fonction de $n$, et $\lim u_n$.

:::corrige
1. $u_{n + 1} - 2 = \frac{5u_n - 4 - 2(u_n + 1)}{u_n + 1} = \frac{3u_n - 6}{u_n + 1} = \frac{3(u_n - 2)}{u_n + 1}$.
2. $u_0 = 3 > 2$. Si $u_n > 2$, alors $u_n - 2 > 0$ et $u_n + 1 > 0$, donc d’après la question 1, $u_{n + 1} - 2 > 0$.
3. $u_{n + 1} - u_n = \frac{5u_n - 4 - u_n^2 - u_n}{u_n + 1} = \frac{-(u_n^2 - 4u_n + 4)}{u_n + 1} = \frac{-(u_n - 2)^2}{u_n + 1} < 0$, car $u_n > 2$. La suite est strictement décroissante.
4. $v_{n + 1} = \frac{1}{u_{n + 1} - 2} = \frac{u_n + 1}{3(u_n - 2)} = \frac{(u_n - 2) + 3}{3(u_n - 2)} = \frac{1}{3} + \frac{1}{u_n - 2} = v_n + \frac{1}{3}$ : $(v_n)$ est arithmétique de raison $\frac{1}{3}$.
5. $v_0 = \frac{1}{3 - 2} = 1$, donc $v_n = 1 + \frac{n}{3} = \frac{n + 3}{3}$. Puis $u_n - 2 = \frac{1}{v_n} = \frac{3}{n + 3}$, donc $u_n = 2 + \dfrac{3}{n + 3}$, et $\lim u_n = 2$.
:::
:::

:::exercice Problème 2 : suite auxiliaire et somme
Soit $(u_n)$ définie par $u_0 = 1$ et $u_{n + 1} = \dfrac{1}{2}u_n + n - 1$.

1. Calculer $u_1$ et $u_2$.
2. On pose $v_n = u_n - 2n + 6$. Montrer que $(v_n)$ est géométrique ; préciser sa raison et son premier terme.
3. En déduire $u_n$ en fonction de $n$ et $\lim u_n$.
4. Montrer par récurrence que $u_n \geq 2n - 6$ pour tout $n$.
5. Calculer $S_n = u_0 + u_1 + \cdots + u_n$ en fonction de $n$.

:::corrige
1. $u_1 = \frac{1}{2} - 1 = -\frac{1}{2}$ et $u_2 = -\frac{1}{4} + 1 - 1 = -\frac{1}{4}$.
2. $v_{n + 1} = u_{n + 1} - 2(n + 1) + 6 = \frac{1}{2}u_n + n - 1 - 2n + 4 = \frac{1}{2}u_n - n + 3 = \frac{1}{2}\left(u_n - 2n + 6\right) = \frac{1}{2}v_n$. $(v_n)$ est géométrique de raison $\frac{1}{2}$ et de premier terme $v_0 = 7$.
3. $v_n = 7\left(\frac{1}{2}\right)^n$, donc $u_n = 7\left(\frac{1}{2}\right)^n + 2n - 6$. Comme $\left(\frac{1}{2}\right)^n \to 0$ et $2n - 6 \to +\infty$, $\lim u_n = +\infty$.
4. D’après la question 3, $u_n - (2n - 6) = v_n = 7\left(\frac{1}{2}\right)^n > 0$. (Par récurrence : $u_0 = 1 \geq -6$ ; si $v_n > 0$, alors $v_{n + 1} = \frac{1}{2}v_n > 0$.)
5. $S_n = \sum_{k = 0}^{n} v_k + \sum_{k = 0}^{n} (2k - 6) = 7 \times \frac{1 - \left(\frac{1}{2}\right)^{n + 1}}{1 - \frac{1}{2}} + 2 \times \frac{n(n + 1)}{2} - 6(n + 1)$, soit

$$
S_n = 14\left(1 - \left(\frac{1}{2}\right)^{n + 1}\right) + (n + 1)(n - 6)
$$
:::
:::
