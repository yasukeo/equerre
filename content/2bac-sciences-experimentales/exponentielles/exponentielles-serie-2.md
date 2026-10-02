---
title: Série 1 — partie 2 : dérivées, limites et étude
kind: serie
summary: Limites et croissances comparées, dérivées et primitives de e^u, exponentielle de base a, inégalité eˣ ≥ x + 1 et étude d’une fonction, avec les corrigés.
position: 20
visibility: enrolled
---

Six exercices sur la deuxième partie du cours.

:::exercice Limites
Calculer :

1. $\displaystyle \lim_{x \to +\infty} \left(e^x - 3x\right)$
2. $\displaystyle \lim_{x \to -\infty} (x + 1)e^x$
3. $\displaystyle \lim_{x \to 0} \frac{e^{2x} - 1}{x}$

:::corrige
1. $e^x - 3x = x\left(\frac{e^x}{x} - 3\right)$ avec $\frac{e^x}{x} \to +\infty$ : la limite vaut $+\infty$.
2. $(x + 1)e^x = x e^x + e^x$, et $x e^x \to 0$, $e^x \to 0$ en $-\infty$ : la limite vaut $0$.
3. $\frac{e^{2x} - 1}{x} = 2 \times \frac{e^{2x} - 1}{2x}$, et $\frac{e^X - 1}{X} \to 1$ quand $X = 2x \to 0$ : la limite vaut $2$.
:::
:::

:::exercice Dérivées
Calculer la dérivée de chaque fonction sur $\mathbb{R}$.

1. $f(x) = (x^2 + 1)e^{x}$
2. $g(x) = e^{-x^2}$
3. $h(x) = \dfrac{e^x}{e^x + 1}$

:::corrige
1. $f'(x) = 2x e^x + (x^2 + 1)e^x = (x + 1)^2 e^x$.
2. $g'(x) = -2x e^{-x^2}$.
3. $h'(x) = \dfrac{e^x(e^x + 1) - e^x \times e^x}{(e^x + 1)^2} = \dfrac{e^x}{(e^x + 1)^2}$.
:::
:::

:::exercice Étude d’une fonction
Soit $f(x) = (2 - x)e^x$ sur $\mathbb{R}$.

1. Calculer les limites de $f$ en $-\infty$ et en $+\infty$.
2. Étudier les variations de $f$ et dresser son tableau de variations.
3. Déterminer l’équation de la tangente à la courbe au point d’abscisse $0$.

:::corrige
1. En $-\infty$ : $f(x) = 2e^x - x e^x \to 0$ (asymptote horizontale $y = 0$). En $+\infty$ : $2 - x \to -\infty$ et $e^x \to +\infty$, donc $f(x) \to -\infty$.
2. $f'(x) = -e^x + (2 - x)e^x = (1 - x)e^x$, du signe de $1 - x$ : $f$ est croissante sur $]-\infty ; 1]$ et décroissante sur $[1 ; +\infty[$, avec un maximum $f(1) = e$.
3. $f(0) = 2$ et $f'(0) = 1$ : la tangente a pour équation $y = x + 2$.
:::
:::

:::exercice Primitives avec exp
Déterminer une primitive de chaque fonction sur $\mathbb{R}$.

1. $f(x) = e^{2x} - 3e^{-x}$
2. $g(x) = xe^{x^2 + 1}$
3. $h(x) = \dfrac{e^x}{e^x + 1}$
4. $k(x) = (2x + 1)e^{x^2 + x}$

:::corrige
1. $F(x) = \frac{1}{2}e^{2x} + 3e^{-x}$.
2. $g = \frac{1}{2}u'e^u$ avec $u(x) = x^2 + 1$ : $G(x) = \frac{1}{2}e^{x^2 + 1}$.
3. C’est $\frac{u'}{u}$ avec $u(x) = e^x + 1 > 0$ : $H(x) = \ln\left(e^x + 1\right)$.
4. C’est $u'e^u$ avec $u(x) = x^2 + x$ : $K(x) = e^{x^2 + x}$.
:::
:::

:::exercice Exponentielle de base a
1. Écrire $2^x$ et $\left(\frac{1}{3}\right)^x$ avec l’exponentielle népérienne, et donner leur sens de variation.
2. Résoudre $2^x = 3^{x - 1}$.
3. Calculer la dérivée de $f(x) = 5^x$ et de $g(x) = x^x$ sur $]0 ; +\infty[$.

:::corrige
1. $2^x = e^{x\ln 2}$, croissante car $\ln 2 > 0$ ; $\left(\frac{1}{3}\right)^x = e^{-x\ln 3}$, décroissante car $-\ln 3 < 0$.
2. En prenant le logarithme : $x\ln 2 = (x - 1)\ln 3$, donc $x(\ln 3 - \ln 2) = \ln 3$ et $x = \dfrac{\ln 3}{\ln 3 - \ln 2} = \dfrac{\ln 3}{\ln\frac{3}{2}}$.
3. $f'(x) = (\ln 5)5^x$. $g(x) = e^{x\ln x}$, donc $g'(x) = \left(\ln x + 1\right)e^{x\ln x} = (\ln x + 1)x^x$.
:::
:::

:::exercice L’inégalité eˣ ≥ x + 1
1. Étudier les variations de $\varphi(x) = e^x - x - 1$ sur $\mathbb{R}$, et en déduire que $e^x \geq x + 1$ pour tout réel $x$.
2. En déduire que pour tout $x > -1$, $\ln(1 + x) \leq x$.
3. En déduire que pour tout entier $n \geq 1$, $\left(1 + \frac{1}{n}\right)^n \leq e$.

:::corrige
1. $\varphi'(x) = e^x - 1$ : $\varphi$ décroît sur $]-\infty ; 0]$ et croît sur $[0 ; +\infty[$, de minimum $\varphi(0) = 0$. Donc $\varphi(x) \geq 0$.
2. Pour $x > -1$, $1 + x > 0$ et $e^x \geq 1 + x$ ; $\ln$ étant croissante, $x \geq \ln(1 + x)$.
3. Avec $x = \frac{1}{n}$ : $\ln\left(1 + \frac{1}{n}\right) \leq \frac{1}{n}$, donc $n\ln\left(1 + \frac{1}{n}\right) \leq 1$ et, $\exp$ étant croissante, $\left(1 + \frac{1}{n}\right)^n \leq e$.
:::
:::
