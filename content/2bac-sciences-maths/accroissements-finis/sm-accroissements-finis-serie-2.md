---
title: Série 1 — partie 2 : applications
kind: serie
summary: Encadrer ln(1 + x) et en déduire une limite, calculer une limite par les accroissements finis, étudier deux suites récurrentes avec |f′| ≤ k < 1, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Encadrer ln(1 + x)
1. Montrer que pour tout $x > 0$, $\dfrac{x}{1 + x} \leq \ln(1 + x) \leq x$.
2. En déduire que pour tout entier $n \geq 1$, $\dfrac{n}{n + 1} \leq n\ln\left(1 + \dfrac{1}{n}\right) \leq 1$.
3. En déduire $\lim_{n \to +\infty} \left(1 + \dfrac{1}{n}\right)^n$.

:::corrige
1. Sur $[0 ; x]$, $\frac{1}{1 + x} \leq \frac{1}{1 + t} \leq 1$ : l’inégalité des accroissements finis appliquée à $t \mapsto \ln(1 + t)$ donne $\frac{x}{1 + x} \leq \ln(1 + x) - 0 \leq x$.
2. Avec $x = \frac{1}{n}$ : $\frac{1}{n + 1} \leq \ln\left(1 + \frac{1}{n}\right) \leq \frac{1}{n}$, puis on multiplie par $n$.
3. Par les gendarmes, $n\ln\left(1 + \frac{1}{n}\right) \to 1$, et $\exp$ est continue : $\left(1 + \frac{1}{n}\right)^n = e^{n\ln\left(1 + \frac{1}{n}\right)} \to e$.
:::
:::

:::exercice Une limite par les accroissements finis
Calculer $\lim_{n \to +\infty} \sqrt{n}\left(\sqrt{n + 1} - \sqrt{n}\right)$ en encadrant $\sqrt{n + 1} - \sqrt{n}$ à l’aide des accroissements finis.

:::corrige
Sur $[n ; n + 1]$, $\frac{1}{2\sqrt{n + 1}} \leq \frac{1}{2\sqrt{t}} \leq \frac{1}{2\sqrt{n}}$, donc $\frac{1}{2\sqrt{n + 1}} \leq \sqrt{n + 1} - \sqrt{n} \leq \frac{1}{2\sqrt{n}}$. En multipliant par $\sqrt{n}$ : $\frac{1}{2}\sqrt{\frac{n}{n + 1}} \leq \sqrt{n}\left(\sqrt{n + 1} - \sqrt{n}\right) \leq \frac{1}{2}$, et la limite vaut $\frac{1}{2}$.
:::
:::

:::exercice Une suite récurrente avec une racine
Soit $u_0 = 0$ et $u_{n + 1} = \sqrt{u_n + 2}$, avec $f(x) = \sqrt{x + 2}$ et $I = [0 ; 2]$.

1. Montrer que $f(I) \subset I$ et que $u_n \in I$ pour tout $n$.
2. Montrer que pour tout $x \in I$, $|f'(x)| \leq \dfrac{1}{2\sqrt{2}}$.
3. En déduire que $|u_n - 2| \leq 2\left(\dfrac{1}{2\sqrt{2}}\right)^n$ et la limite de $(u_n)$.

:::corrige
1. $f$ est croissante, $f(0) = \sqrt{2}$ et $f(2) = 2$, donc $f(I) = \left[\sqrt{2} ; 2\right] \subset I$. Par récurrence, $u_0 = 0 \in I$ et si $u_n \in I$, $u_{n + 1} = f(u_n) \in I$.
2. $f'(x) = \frac{1}{2\sqrt{x + 2}} \leq \frac{1}{2\sqrt{2}}$ pour $x \geq 0$.
3. $f(2) = 2$. Les accroissements finis entre $u_n$ et $2$ donnent $|u_{n + 1} - 2| \leq \frac{1}{2\sqrt{2}}|u_n - 2|$, puis par récurrence $|u_n - 2| \leq \left(\frac{1}{2\sqrt{2}}\right)^n|u_0 - 2| = 2\left(\frac{1}{2\sqrt{2}}\right)^n$. Comme $0 < \frac{1}{2\sqrt{2}} < 1$, $\lim u_n = 2$.
:::
:::

:::exercice La suite u(n+1) = e^(−u(n))
Soit $u_0 = \frac{1}{2}$, $u_{n + 1} = e^{-u_n}$, $f(x) = e^{-x}$ et $I = \left[\frac{1}{e} ; 1\right]$.

1. Montrer que $f(I) \subset I$.
2. Montrer que l’équation $f(x) = x$ a une unique solution $\ell$ dans $I$.
3. Montrer que $|f'(x)| \leq e^{-\frac{1}{e}}$ sur $I$, et conclure que $(u_n)$ converge vers $\ell$.

:::corrige
1. $f$ est décroissante : $f(I) = \left[e^{-1} ; e^{-\frac{1}{e}}\right]$, et $e^{-\frac{1}{e}} < 1$ : $f(I) \subset I$.
2. $g(x) = e^{-x} - x$ est strictement décroissante, $g\left(\frac{1}{e}\right) = e^{-\frac{1}{e}} - \frac{1}{e} > 0$ (car $e^{-\frac{1}{e}} > e^{-1}$) et $g(1) = \frac{1}{e} - 1 < 0$ : une unique solution $\ell \in I$.
3. $|f'(x)| = e^{-x} \leq e^{-\frac{1}{e}} = k$ pour $x \geq \frac{1}{e}$, et $k < 1$. Comme $u_0 = \frac{1}{2} \in I$, tous les termes sont dans $I$, et $|u_n - \ell| \leq k^n|u_0 - \ell| \to 0$.
:::
:::
