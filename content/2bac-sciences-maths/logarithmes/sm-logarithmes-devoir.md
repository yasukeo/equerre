---
title: Devoir surveillé : fonctions logarithmiques
kind: devoir
summary: Un devoir d’une heure sur 20 points : équations et inéquations, limites et dérivées, étude de (1 + ln x)/x, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice non autorisée.

:::exercice Exercice 1 (6 points) : équations et inéquations
Résoudre dans $\mathbb{R}$ :

1. $\ln(x + 3) = 2\ln(x + 1)$ (2 pts)
2. $\ln(2x) - \ln(x - 1) \geq \ln 3$ (2 pts)
3. $(\ln x)^2 + 2\ln x - 3 = 0$ (2 pts)

:::corrige
1. Domaine : $x > -1$. L’équation s’écrit $\ln(x + 3) = \ln\left((x + 1)^2\right)$, soit $x + 3 = x^2 + 2x + 1$, donc $x^2 + x - 2 = 0$ : $x = 1$ ou $x = -2$. Seul $1$ convient : $S = \{1\}$.
2. Domaine : $x > 1$. L’inéquation s’écrit $\ln\frac{2x}{x - 1} \geq \ln 3$, soit $\frac{2x}{x - 1} \geq 3$, donc $2x \geq 3x - 3$ (car $x - 1 > 0$), soit $x \leq 3$. $S = ]1 ; 3]$.
3. Avec $X = \ln x$ : $X^2 + 2X - 3 = 0$, donc $X = 1$ ou $X = -3$. $S = \left\{e ; e^{-3}\right\}$.
:::
:::

:::exercice Exercice 2 (5 points) : limites et dérivées
1. Calculer $\lim_{x \to +\infty} \left(x - 2\ln x\right)$ et $\lim_{x \to 0^+} x\left(\ln x\right)^2$. (2,5 pts)
2. Calculer la dérivée de $f(x) = \ln\left(\dfrac{x - 1}{x + 1}\right)$ sur $]1 ; +\infty[$. (2,5 pts)

:::corrige
1. $x - 2\ln x = x\left(1 - 2\frac{\ln x}{x}\right) \to +\infty$. Pour la seconde, on pose $X = \sqrt{x}$ : $x(\ln x)^2 = X^2 \times (2\ln X)^2 = 4\left(X\ln X\right)^2$, et $X\ln X \to 0$ quand $X \to 0^+$, donc la limite vaut $0$.
2. $f(x) = \ln(x - 1) - \ln(x + 1)$ sur $]1 ; +\infty[$, donc $f'(x) = \frac{1}{x - 1} - \frac{1}{x + 1} = \frac{2}{x^2 - 1}$.
:::
:::

:::exercice Exercice 3 (9 points) : étude d’une fonction
Soit $f(x) = \dfrac{1 + \ln x}{x}$ sur $]0 ; +\infty[$, et $(C)$ sa courbe.

1. Calculer les limites de $f$ en $0^+$ et en $+\infty$ et interpréter. (2,5 pts)
2. Montrer que $f'(x) = -\dfrac{\ln x}{x^2}$ et dresser le tableau de variations de $f$. (3 pts)
3. Déterminer le point d’intersection de $(C)$ avec l’axe des abscisses. (1,5 pt)
4. Donner l’équation de la tangente à $(C)$ en ce point. (2 pts)

:::corrige
1. En $0^+$ : $1 + \ln x \to -\infty$ et $\frac{1}{x} \to +\infty$, donc $f(x) \to -\infty$ ; asymptote verticale $x = 0$. En $+\infty$ : $f(x) = \frac{1}{x} + \frac{\ln x}{x} \to 0$ ; asymptote horizontale $y = 0$.
2. $f'(x) = \frac{\frac{1}{x} \times x - (1 + \ln x)}{x^2} = -\frac{\ln x}{x^2}$. $f$ est croissante sur $]0 ; 1]$, décroissante sur $[1 ; +\infty[$, de maximum $f(1) = 1$.
3. $f(x) = 0 \iff \ln x = -1 \iff x = e^{-1}$ : le point est $\left(\frac{1}{e} ; 0\right)$.
4. $f'\left(\frac{1}{e}\right) = -\frac{-1}{e^{-2}} = e^2$ : la tangente a pour équation $y = e^2\left(x - \frac{1}{e}\right)$, soit $y = e^2 x - e$.
:::
:::
