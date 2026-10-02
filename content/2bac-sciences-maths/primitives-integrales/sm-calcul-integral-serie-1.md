---
title: Série 1 — partie 1 : intégrale et propriétés
kind: serie
summary: Calculs d’intégrales avec les primitives usuelles et composées, Chasles et parité, valeur moyenne, encadrement et suite d’intégrales, avec les corrigés.
position: 110
visibility: public
---

Cinq exercices sur la première partie du cours.

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

:::exercice Formes composées
Calculer :

1. $\displaystyle \int_0^{\frac{\pi}{2}} \sin x\cos^2 x \, dx$
2. $\displaystyle \int_0^1 x\left(x^2 + 1\right)^3 dx$
3. $\displaystyle \int_1^{e} \frac{\ln x}{x} \, dx$
4. $\displaystyle \int_0^1 \frac{e^x}{e^x + 1} \, dx$

:::corrige
1. $\left[-\frac{\cos^3 x}{3}\right]_0^{\frac{\pi}{2}} = 0 + \frac{1}{3} = \frac{1}{3}$.
2. $\left[\frac{(x^2 + 1)^4}{8}\right]_0^1 = \frac{16 - 1}{8} = \frac{15}{8}$.
3. $\left[\frac{(\ln x)^2}{2}\right]_1^e = \frac{1}{2}$.
4. $\big[\ln(e^x + 1)\big]_0^1 = \ln(e + 1) - \ln 2 = \ln\frac{e + 1}{2}$.
:::
:::

:::exercice Chasles et parité
1. Calculer $\displaystyle \int_{-1}^{2} |x| \, dx$.
2. Calculer $\displaystyle \int_{-\pi}^{\pi} x^2\sin x \, dx$ sans chercher de primitive.
3. Calculer $\displaystyle \int_{-2}^{2} \left(x^2 + x^3\right) dx$.

:::corrige
1. $\int_{-1}^0 (-x)\,dx + \int_0^2 x\,dx = \frac{1}{2} + 2 = \frac{5}{2}$.
2. $x \mapsto x^2\sin x$ est impaire et l’intervalle est symétrique : l’intégrale vaut $0$.
3. $\int_{-2}^2 x^3\,dx = 0$ (impaire) et $\int_{-2}^2 x^2\,dx = 2\int_0^2 x^2\,dx = \frac{16}{3}$ (paire) : le total vaut $\frac{16}{3}$.
:::
:::

:::exercice Une suite d’intégrales qui tend vers 0
Pour $n \in \mathbb{N}$, on pose $I_n = \displaystyle \int_0^1 \frac{x^n}{1 + x} \, dx$.

1. Calculer $I_0$ et $I_0 + I_1$, puis $I_1$.
2. Montrer que $(I_n)$ est décroissante.
3. Montrer que $0 \leq I_n \leq \dfrac{1}{n + 1}$ et en déduire $\lim I_n$.

:::corrige
1. $I_0 = \big[\ln(1 + x)\big]_0^1 = \ln 2$. $I_0 + I_1 = \int_0^1 \frac{1 + x}{1 + x}\,dx = 1$, donc $I_1 = 1 - \ln 2$.
2. $I_{n + 1} - I_n = \int_0^1 \frac{x^n(x - 1)}{1 + x}\,dx \leq 0$, car $x^n(x - 1) \leq 0$ sur $[0 ; 1]$.
3. Sur $[0 ; 1]$, $0 \leq \frac{x^n}{1 + x} \leq x^n$, d’où $0 \leq I_n \leq \frac{1}{n + 1}$. Par les gendarmes, $\lim I_n = 0$.
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
