---
title: Série 1 — partie 2 : limites, dérivées et étude
kind: serie
summary: Limites avec ln, dérivées de ln(u), primitives de u′/u, étude d’une fonction et inégalité ln x ≤ x − 1, logarithme décimal, avec les corrigés.
position: 20
visibility: enrolled
---

Cinq exercices sur la deuxième partie du cours.

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

:::exercice Primitives avec ln
Déterminer une primitive de chaque fonction sur l’intervalle indiqué.

1. $f(x) = \dfrac{2x}{x^2 + 1}$ sur $\mathbb{R}$.
2. $g(x) = \dfrac{1}{3x - 2}$ sur $\left]\frac{2}{3} ; +\infty\right[$.
3. $h(x) = \dfrac{\ln x}{x}$ sur $]0 ; +\infty[$.
4. $k(x) = \tan x$ sur $\left]-\frac{\pi}{2} ; \frac{\pi}{2}\right[$.

:::corrige
1. C’est $\frac{u'}{u}$ avec $u(x) = x^2 + 1 > 0$ : $F(x) = \ln(x^2 + 1)$.
2. $g = \frac{1}{3} \times \frac{u'}{u}$ avec $u(x) = 3x - 2 > 0$ : $G(x) = \frac{1}{3}\ln(3x - 2)$.
3. C’est $u'u$ avec $u = \ln$ : $H(x) = \frac{1}{2}(\ln x)^2$.
4. $\tan x = \frac{\sin x}{\cos x} = -\frac{u'}{u}$ avec $u = \cos > 0$ sur cet intervalle : $K(x) = -\ln(\cos x)$.
:::
:::

:::exercice Logarithme décimal
1. Calculer $\log 1000$, $\log 0{,}01$ et $\log\sqrt{10}$.
2. Résoudre $\log x = 2{,}5$, puis $\log(x + 1) \leq 1$.
3. Combien de chiffres a le nombre $3^{20}$ ? (On donne $\log 3 \approx 0{,}477$.)

:::corrige
1. $\log 1000 = 3$, $\log 0{,}01 = -2$, $\log\sqrt{10} = \frac{1}{2}$.
2. $\log x = 2{,}5 \iff \ln x = 2{,}5\ln 10 \iff x = 10^{2{,}5} = 100\sqrt{10}$. Puis $\log(x + 1) \leq 1 = \log 10 \iff 0 < x + 1 \leq 10 \iff -1 < x \leq 9$.
3. $\log\left(3^{20}\right) = 20\log 3 \approx 9{,}54$, donc $10^9 \leq 3^{20} < 10^{10}$ : il a $10$ chiffres.
:::
:::
