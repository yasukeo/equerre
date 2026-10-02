---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux problèmes comme à l’examen national : étude d’une fonction avec ln puis aire entre la courbe et son asymptote, et une suite d’intégrales avec une intégration par parties, avec les corrigés.
position: 130
visibility: enrolled
---

Deux problèmes où l’intégrale termine une étude, comme dans le problème de l’examen national.

:::exercice Problème 1 : étude d’une fonction et aire
**Partie A.** Soit $g(x) = x^2 + 1 - \ln x$ sur $]0 ; +\infty[$.

1. Étudier les variations de $g$.
2. En déduire que $g(x) > 0$ pour tout $x > 0$.

**Partie B.** Soit $f(x) = x + \dfrac{\ln x}{x}$ sur $]0 ; +\infty[$, et $(C)$ sa courbe dans un repère orthonormé d’unité $2$ cm.

1. Calculer les limites de $f$ en $0^+$ et en $+\infty$.
2. Montrer que la droite $(\Delta) : y = x$ est asymptote à $(C)$ en $+\infty$, et étudier leur position relative.
3. Montrer que $f'(x) = \dfrac{g(x)}{x^2}$ et en déduire le sens de variation de $f$.
4. Calculer, en cm², l’aire du domaine limité par $(C)$, $(\Delta)$ et les droites $x = 1$ et $x = e$.

:::corrige
**Partie A.**

1. $g'(x) = 2x - \frac{1}{x} = \frac{2x^2 - 1}{x}$, qui s’annule en $\frac{1}{\sqrt{2}}$ : $g$ décroît sur $\left]0 ; \frac{1}{\sqrt{2}}\right]$ et croît ensuite.
2. Son minimum est $g\left(\frac{1}{\sqrt{2}}\right) = \frac{1}{2} + 1 - \ln\frac{1}{\sqrt{2}} = \frac{3}{2} + \frac{\ln 2}{2} > 0$. Donc $g(x) > 0$ pour tout $x > 0$.

**Partie B.**

1. En $0^+$ : $\ln x \to -\infty$ et $\frac{1}{x} \to +\infty$, donc $\frac{\ln x}{x} \to -\infty$ et $f(x) \to -\infty$. En $+\infty$ : $\frac{\ln x}{x} \to 0$, donc $f(x) \to +\infty$.
2. $f(x) - x = \frac{\ln x}{x} \to 0$ en $+\infty$. Ce terme a le signe de $\ln x$ : $(C)$ est au-dessous de $(\Delta)$ sur $]0 ; 1[$ et au-dessus sur $]1 ; +\infty[$.
3. $f'(x) = 1 + \frac{1 - \ln x}{x^2} = \frac{x^2 + 1 - \ln x}{x^2} = \frac{g(x)}{x^2} > 0$ : $f$ est strictement croissante.
4. Sur $[1 ; e]$, $(C)$ est au-dessus de $(\Delta)$ : $\mathcal{A} = \int_1^e \frac{\ln x}{x}\,dx = \left[\frac{(\ln x)^2}{2}\right]_1^e = \frac{1}{2}$ unité d’aire, soit $\frac{1}{2} \times 4 = 2$ cm².
:::
:::

:::exercice Problème 2 : une suite d’intégrales
Pour $n \in \mathbb{N}$, on pose $I_n = \displaystyle \int_0^1 x^n e^{-x} \, dx$.

1. Calculer $I_0$.
2. À l’aide d’une intégration par parties, montrer que $I_{n + 1} = (n + 1)I_n - \dfrac{1}{e}$, et en déduire $I_1$ et $I_2$.
3. Montrer que pour tout $n$, $0 \leq I_n \leq \dfrac{1}{n + 1}$.
4. En déduire $\lim I_n$.
5. Montrer que $(I_n)$ est décroissante.

:::corrige
1. $I_0 = \big[-e^{-x}\big]_0^1 = 1 - \frac{1}{e}$.
2. Avec $u(x) = x^{n + 1}$, $v'(x) = e^{-x}$, donc $u'(x) = (n + 1)x^n$ et $v(x) = -e^{-x}$ : $I_{n + 1} = \big[-x^{n + 1}e^{-x}\big]_0^1 + (n + 1)\int_0^1 x^n e^{-x}\,dx = -\frac{1}{e} + (n + 1)I_n$. Donc $I_1 = 1 - \frac{2}{e}$ et $I_2 = 2I_1 - \frac{1}{e} = 2 - \frac{5}{e}$.
3. Sur $[0 ; 1]$, $0 < e^{-x} \leq 1$, donc $0 \leq x^n e^{-x} \leq x^n$ ; en intégrant, $0 \leq I_n \leq \frac{1}{n + 1}$.
4. Par les gendarmes, $\lim I_n = 0$.
5. $I_{n + 1} - I_n = \int_0^1 x^n(x - 1)e^{-x}\,dx \leq 0$, car $x - 1 \leq 0$ sur $[0 ; 1]$.
:::
:::
