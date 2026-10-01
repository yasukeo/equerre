---
title: Série 1 : fonctions logarithmiques
kind: serie
summary: Équations et inéquations, limites, dérivées et étude d’une fonction avec ln, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur le logarithme népérien.

:::exercice Équations et inéquations
Résoudre dans $\mathbb{R}$ :

1. $\ln(2x - 1) = \ln(x + 3)$
2. $\ln(x) + \ln(x - 2) = \ln 3$
3. $\ln(3 - x) \leq 0$

:::corrige
1. L’équation a un sens pour $x > \frac{1}{2}$ et $x > -3$, soit $x > \frac{1}{2}$. Elle équivaut à $2x - 1 = x + 3$, soit $x = 4$, qui convient : $S = \{4\}$.
2. Elle a un sens pour $x > 2$. Elle s’écrit $\ln(x^2 - 2x) = \ln 3$, soit $x^2 - 2x - 3 = 0$, donc $x = 3$ ou $x = -1$. Seul $3$ convient : $S = \{3\}$.
3. Elle a un sens pour $x < 3$. $\ln(3 - x) \leq 0 = \ln 1 \iff 3 - x \leq 1 \iff x \geq 2$. Donc $S = [2 ; 3[$.
:::
:::

:::exercice Limites
Calculer :

1. $\displaystyle \lim_{x \to +\infty} \left(\ln x - x\right)$
2. $\displaystyle \lim_{x \to 0^+} \left(x \ln x + 1\right)$
3. $\displaystyle \lim_{x \to +\infty} \frac{\ln(x + 1)}{x}$

:::corrige
1. $\ln x - x = x\left(\frac{\ln x}{x} - 1\right)$, avec $\frac{\ln x}{x} \to 0$ : la limite vaut $-\infty$.
2. $\lim_{x \to 0^+} x \ln x = 0$, donc la limite vaut $1$.
3. $\frac{\ln(x + 1)}{x} = \frac{\ln(x + 1)}{x + 1} \times \frac{x + 1}{x}$ ; le premier facteur tend vers $0$ (avec $X = x + 1 \to +\infty$) et le second vers $1$, donc la limite vaut $0$.
:::
:::

:::exercice Dérivées
Calculer la dérivée de chaque fonction sur l’intervalle indiqué.

1. $f(x) = x \ln x - x$ sur $]0 ; +\infty[$.
2. $g(x) = \ln(x^2 + 1)$ sur $\mathbb{R}$.
3. $h(x) = \dfrac{\ln x}{x}$ sur $]0 ; +\infty[$.

:::corrige
1. $f'(x) = \ln x + x \times \frac{1}{x} - 1 = \ln x$.
2. $g'(x) = \dfrac{2x}{x^2 + 1}$.
3. $h'(x) = \dfrac{\frac{1}{x} \times x - \ln x}{x^2} = \dfrac{1 - \ln x}{x^2}$.
:::
:::

:::exercice Étude d’une fonction
Soit $f(x) = x - 1 - \ln x$ sur $]0 ; +\infty[$.

1. Calculer les limites de $f$ en $0^+$ et en $+\infty$.
2. Étudier les variations de $f$.
3. En déduire que $\ln x \leq x - 1$ pour tout $x > 0$.

:::corrige
1. En $0^+$ : $-\ln x \to +\infty$, donc $f(x) \to +\infty$. En $+\infty$ : $f(x) = x\left(1 - \frac{1}{x} - \frac{\ln x}{x}\right) \to +\infty$.
2. $f'(x) = 1 - \frac{1}{x} = \frac{x - 1}{x}$ : $f$ est décroissante sur $]0 ; 1]$ et croissante sur $[1 ; +\infty[$, avec un minimum $f(1) = 0$.
3. Le minimum de $f$ est $0$, donc $f(x) \geq 0$ pour tout $x > 0$, c’est-à-dire $\ln x \leq x - 1$.
:::
:::
