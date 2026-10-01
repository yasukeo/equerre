---
title: Série 1 — partie 2 : limites et convergence
kind: serie
summary: Calculs de limites, comparaison et gendarmes, limite de f(u(n)), convergence des suites monotones et suites définies par u(n+1) = f(u(n)), avec les corrigés.
position: 20
visibility: enrolled
---

Cinq exercices sur la deuxième partie du cours.

:::exercice Calculs de limites
Calculer la limite de chaque suite.

1. $u_n = \dfrac{3n^2 + 1}{n^2 + n}$
2. $v_n = \sqrt{n^2 + n} - n$
3. $w_n = \dfrac{2^n + 3^n}{3^n}$
4. $a_n = \dfrac{(-2)^n}{3^n}$
5. $b_n = n - \sqrt{n}$

:::corrige
1. $u_n = \frac{3 + \frac{1}{n^2}}{1 + \frac{1}{n}} \to 3$.
2. $v_n = \frac{n}{\sqrt{n^2 + n} + n} = \frac{1}{\sqrt{1 + \frac{1}{n}} + 1} \to \frac{1}{2}$.
3. $w_n = \left(\frac{2}{3}\right)^n + 1 \to 1$, car $0 < \frac{2}{3} < 1$.
4. $a_n = \left(-\frac{2}{3}\right)^n \to 0$, car $-1 < -\frac{2}{3} < 1$.
5. $b_n = \sqrt{n}\left(\sqrt{n} - 1\right) \to +\infty$ (produit de deux suites qui tendent vers $+\infty$).
:::
:::

:::exercice Comparaison et gendarmes
1. Montrer que pour tout $n \geq 1$, $\dfrac{n - 1}{n + 1} \leq \dfrac{n + \sin n}{n + 1} \leq 1$, et en déduire la limite de $u_n = \dfrac{n + \sin n}{n + 1}$.
2. Calculer la limite de $v_n = n + (-1)^n$.
3. Calculer la limite de $w_n = \dfrac{\cos n}{n^2}$ ($n \geq 1$).

:::corrige
1. $-1 \leq \sin n \leq 1$ donne $\frac{n - 1}{n + 1} \leq u_n \leq \frac{n + 1}{n + 1} = 1$. Les deux encadrants tendent vers $1$, donc $\lim u_n = 1$.
2. $v_n \geq n - 1$ et $\lim (n - 1) = +\infty$, donc $\lim v_n = +\infty$.
3. $-\frac{1}{n^2} \leq w_n \leq \frac{1}{n^2}$ et les encadrants tendent vers $0$ : $\lim w_n = 0$.
:::
:::

:::exercice Limite de f(u_n)
Calculer les limites suivantes.

1. $\lim \sqrt{\dfrac{9n + 1}{n + 1}}$
2. $\lim \sin\left(\dfrac{\pi n}{2n + 1}\right)$
3. $\lim \left(\dfrac{2n + 1}{n}\right)^3$

:::corrige
1. $\frac{9n + 1}{n + 1} \to 9$ et $\sqrt{\cdot}$ est continue en $9$ : la limite vaut $3$.
2. $\frac{\pi n}{2n + 1} \to \frac{\pi}{2}$ et $\sin$ est continue : la limite vaut $\sin\frac{\pi}{2} = 1$.
3. $\frac{2n + 1}{n} \to 2$ et $x \mapsto x^3$ est continue : la limite vaut $8$.
:::
:::

:::exercice Une suite récurrente avec une racine
Soit $(u_n)$ définie par $u_0 = 0$ et $u_{n + 1} = \sqrt{2u_n + 3}$.

1. Montrer par récurrence que $0 \leq u_n \leq 3$ pour tout $n$.
2. Montrer que $u_{n + 1}^2 - u_n^2 = (3 - u_n)(1 + u_n)$ et en déduire que $(u_n)$ est croissante.
3. Montrer que $(u_n)$ converge et déterminer sa limite.

:::corrige
1. $u_0 = 0 \in [0 ; 3]$. Si $0 \leq u_n \leq 3$, alors $3 \leq 2u_n + 3 \leq 9$, donc $\sqrt{3} \leq u_{n + 1} \leq 3$, et en particulier $0 \leq u_{n + 1} \leq 3$.
2. $u_{n + 1}^2 - u_n^2 = 2u_n + 3 - u_n^2 = (3 - u_n)(1 + u_n) \geq 0$, car $0 \leq u_n \leq 3$. Donc $u_{n + 1}^2 \geq u_n^2$, et comme les termes sont positifs, $u_{n + 1} \geq u_n$ : la suite est croissante.
3. Croissante et majorée par $3$, elle converge vers un réel $\ell \in [0 ; 3]$. $f(x) = \sqrt{2x + 3}$ est continue sur $[0 ; 3]$ et $f([0 ; 3]) = [\sqrt{3} ; 3] \subset [0 ; 3]$, donc $\ell = \sqrt{2\ell + 3}$, soit $\ell^2 - 2\ell - 3 = 0$ avec $\ell \geq 0$ : $\ell = 3$.
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
