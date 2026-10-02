---
title: Série 1 — partie 2 : intégration par parties, aires et volumes
kind: serie
summary: Intégrations par parties simples et répétées, aire entre deux courbes, aire en cm², avec les corrigés.
position: 120
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Intégration par parties
Calculer $\displaystyle I = \int_1^e x \ln x \, dx$.

:::corrige
On pose $u(x) = \ln x$ et $v'(x) = x$, donc $u'(x) = \frac{1}{x}$ et $v(x) = \frac{x^2}{2}$ :

$$
I = \left[\frac{x^2}{2}\ln x\right]_1^e - \int_1^e \frac{x}{2} \, dx = \frac{e^2}{2} - \left[\frac{x^2}{4}\right]_1^e = \frac{e^2}{2} - \frac{e^2 - 1}{4} = \frac{e^2 + 1}{4}
$$
:::
:::

:::exercice Intégrations par parties
Calculer :

1. $\displaystyle \int_0^{1} xe^{2x} \, dx$
2. $\displaystyle \int_0^1 (2x + 1)e^{-x} \, dx$
3. $\displaystyle \int_1^e \ln x \, dx$ puis $\displaystyle \int_1^e (\ln x)^2 \, dx$

:::corrige
1. $u = x$, $v' = e^{2x}$, $v = \frac{1}{2}e^{2x}$ : $\left[\frac{x}{2}e^{2x}\right]_0^1 - \frac{1}{2}\int_0^1 e^{2x}\,dx = \frac{e^2}{2} - \frac{e^2 - 1}{4} = \frac{e^2 + 1}{4}$.
2. $u = 2x + 1$, $v' = e^{-x}$, $v = -e^{-x}$ : $\big[-(2x + 1)e^{-x}\big]_0^1 + 2\int_0^1 e^{-x}\,dx = \left(-\frac{3}{e} + 1\right) + 2\left(1 - \frac{1}{e}\right) = 3 - \frac{5}{e}$.
3. $\int_1^e \ln x\,dx = \big[x\ln x\big]_1^e - \int_1^e dx = e - (e - 1) = 1$. Puis, avec $u = (\ln x)^2$ et $v' = 1$ : $\int_1^e (\ln x)^2\,dx = \big[x(\ln x)^2\big]_1^e - 2\int_1^e \ln x\,dx = e - 2$.
:::
:::

:::exercice Aire et unité graphique
Soit $f(x) = \ln x$ et $(C)$ sa courbe dans un repère orthonormé d’unité $2$ cm.

1. Étudier le signe de $\ln x$ sur $\left[\frac{1}{e} ; e\right]$.
2. Calculer, en cm², l’aire du domaine limité par $(C)$, l’axe des abscisses et les droites $x = \frac{1}{e}$ et $x = e$.

:::corrige
1. $\ln x \leq 0$ sur $\left[\frac{1}{e} ; 1\right]$ et $\ln x \geq 0$ sur $[1 ; e]$.
2. Une primitive de $\ln x$ est $x\ln x - x$. Donc $\int_{\frac{1}{e}}^1 (-\ln x)\,dx = -\big[x\ln x - x\big]_{\frac{1}{e}}^1 = -\left(-1 - \left(-\frac{1}{e} - \frac{1}{e}\right)\right) = 1 - \frac{2}{e}$ et $\int_1^e \ln x\,dx = 1$. L’aire vaut $2 - \frac{2}{e}$ unités d’aire, et une unité d’aire vaut $4$ cm² : $\mathcal{A} = 8 - \frac{8}{e}$ cm² $\approx 5{,}06$ cm².
:::
:::

:::exercice Aire entre deux courbes
Calculer l’aire du domaine limité par les courbes de $f(x) = x^2$ et $g(x) = 2x$, en unités d’aire.

:::corrige
Les courbes se coupent quand $x^2 = 2x$, soit en $x = 0$ et $x = 2$. Sur $[0 ; 2]$, $2x - x^2 = x(2 - x) \geq 0$, donc :

$$
\mathcal{A} = \int_0^2 (2x - x^2) \, dx = \left[x^2 - \frac{x^3}{3}\right]_0^2 = 4 - \frac{8}{3} = \frac{4}{3}
$$
:::
:::
