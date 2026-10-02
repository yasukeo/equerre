---
title: Série 2 : exercices type examen
kind: serie
summary: Deux exercices comme à l’examen national de Lettres et sciences humaines : équations avec ln, puis étude complète d’une fonction et de sa courbe, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Exercice 1 : équations
1. Résoudre l’équation $\ln(x - 2) + \ln(x + 2) = \ln 5$.
2. Résoudre l’inéquation $\ln(3 - x) \geq \ln(x + 1)$.
3. Résoudre l’équation $(\ln x)^2 - 3\ln x + 2 = 0$ (on pourra poser $X = \ln x$).

:::corrige
1. Domaine : $x > 2$. L’équation s’écrit $\ln\left(x^2 - 4\right) = \ln 5$, soit $x^2 = 9$, donc $x = 3$ ou $x = -3$ ; seul $3$ convient.
2. Domaine : $-1 < x < 3$. $3 - x \geq x + 1 \iff x \leq 1$ : $S = ]-1 ; 1]$.
3. $X^2 - 3X + 2 = 0$ donne $X = 1$ ou $X = 2$, donc $x = e$ ou $x = e^2$.
:::
:::

:::exercice Exercice 2 : étude d’une fonction
Soit $f(x) = x - 1 - \ln x$ sur $]0 ; +\infty[$, et $(C)$ sa courbe.

1. Calculer $\lim_{x \to 0^+} f(x)$ et interpréter graphiquement.
2. Calculer $\lim_{x \to +\infty} f(x)$ (on pourra écrire $f(x) = x\left(1 - \frac{1}{x} - \frac{\ln x}{x}\right)$).
3. Calculer $f'(x)$ et dresser le tableau de variations de $f$.
4. Calculer $f(1)$ et en déduire le signe de $f(x)$.
5. Donner l’équation de la tangente à $(C)$ au point d’abscisse $e$.

:::corrige
1. $-\ln x \to +\infty$ en $0^+$, donc $f(x) \to +\infty$ : la droite $x = 0$ est asymptote verticale.
2. $\frac{1}{x} \to 0$ et $\frac{\ln x}{x} \to 0$, donc $f(x) \to +\infty$.
3. $f'(x) = 1 - \frac{1}{x} = \frac{x - 1}{x}$ : $f$ décroît sur $]0 ; 1]$ et croît sur $[1 ; +\infty[$.
4. $f(1) = 0$ est le minimum : $f(x) \geq 0$ pour tout $x > 0$.
5. $f(e) = e - 2$ et $f'(e) = 1 - \frac{1}{e}$ : $y = \left(1 - \frac{1}{e}\right)(x - e) + e - 2$, soit $y = \left(1 - \frac{1}{e}\right)x - 1$.
:::
:::
