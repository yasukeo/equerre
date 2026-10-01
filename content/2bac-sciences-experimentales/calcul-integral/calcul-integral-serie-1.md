---
title: Série 1 : calcul intégral
kind: serie
summary: Calculs d’intégrales, intégration par parties, aire entre deux courbes et valeur moyenne, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices, du calcul direct à l’aire d’un domaine.

:::exercice Calculs directs
Calculer :

1. $\displaystyle \int_1^2 \left(3x^2 - \frac{1}{x^2}\right) dx$
2. $\displaystyle \int_0^1 \frac{2x}{x^2 + 1} \, dx$
3. $\displaystyle \int_0^{\ln 2} e^{2x} \, dx$

:::corrige
1. $\left[x^3 + \frac{1}{x}\right]_1^2 = \left(8 + \frac{1}{2}\right) - (1 + 1) = \frac{13}{2}$.
2. C’est $\frac{u'}{u}$ avec $u(x) = x^2 + 1 > 0$ : $\big[\ln(x^2 + 1)\big]_0^1 = \ln 2$.
3. $\left[\frac{1}{2} e^{2x}\right]_0^{\ln 2} = \frac{1}{2}\left(e^{2\ln 2} - 1\right) = \frac{1}{2}(4 - 1) = \frac{3}{2}$.
:::
:::

:::exercice Intégration par parties
Calculer $\displaystyle I = \int_1^e x \ln x \, dx$.

:::corrige
On pose $u(x) = \ln x$ et $v'(x) = x$, donc $u'(x) = \frac{1}{x}$ et $v(x) = \frac{x^2}{2}$ :

$$
I = \left[\frac{x^2}{2}\ln x\right]_1^e - \int_1^e \frac{x}{2} \, dx = \frac{e^2}{2} - \left[\frac{x^2}{4}\right]_1^e = \frac{e^2}{2} - \frac{e^2 - 1}{4} = \frac{e^2 + 1}{4}
$$
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

:::exercice Valeur moyenne et encadrement
1. Calculer la valeur moyenne de $f(x) = \sin x$ sur $[0 ; \pi]$.
2. Montrer que $\displaystyle \frac{1}{2} \leq \int_0^1 \frac{1}{1 + x^2} \, dx \leq 1$.

:::corrige
1. $\mu = \frac{1}{\pi}\int_0^\pi \sin x \, dx = \frac{1}{\pi}\big[-\cos x\big]_0^\pi = \frac{1}{\pi}(1 + 1) = \frac{2}{\pi}$.
2. Pour $x \in [0 ; 1]$, $1 \leq 1 + x^2 \leq 2$, donc $\frac{1}{2} \leq \frac{1}{1 + x^2} \leq 1$. En intégrant sur $[0 ; 1]$, intervalle de longueur $1$ : $\frac{1}{2} \leq \int_0^1 \frac{1}{1 + x^2} \, dx \leq 1$.
:::
:::
