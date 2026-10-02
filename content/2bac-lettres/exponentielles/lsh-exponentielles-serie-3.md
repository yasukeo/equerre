---
title: Série 2 : exercices type examen
kind: serie
summary: Deux exercices comme à l’examen national de Lettres et sciences humaines : équations avec l’exponentielle, puis étude complète d’une fonction, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Exercice 1 : équations
1. Résoudre $e^{2x} - 3e^x + 2 = 0$ (on pourra poser $X = e^x$).
2. Résoudre $e^{x^2} = e^{4}$.
3. Résoudre $e^{1 - x} \geq e$.

:::corrige
1. $X^2 - 3X + 2 = 0$ : $X = 1$ ou $X = 2$, donc $e^x = 1$ ou $e^x = 2$, soit $x = 0$ ou $x = \ln 2$.
2. $x^2 = 4 \iff x = 2$ ou $x = -2$.
3. $1 - x \geq 1 \iff x \leq 0$.
:::
:::

:::exercice Exercice 2 : étude d’une fonction
Soit $f(x) = e^x - x - 1$ sur $\mathbb{R}$, et $(C)$ sa courbe.

1. Calculer $\lim_{x \to -\infty} f(x)$.
2. Calculer $\lim_{x \to +\infty} f(x)$ (on pourra écrire $f(x) = x\left(\frac{e^x}{x} - 1 - \frac{1}{x}\right)$).
3. Calculer $f'(x)$ et étudier son signe.
4. Dresser le tableau de variations de $f$ et en déduire que $e^x \geq x + 1$ pour tout réel $x$.
5. Donner l’équation de la tangente à $(C)$ au point d’abscisse $1$.

:::corrige
1. $e^x \to 0$ et $-x - 1 \to +\infty$ : $+\infty$.
2. $\frac{e^x}{x} \to +\infty$ : $f(x) \to +\infty$.
3. $f'(x) = e^x - 1$ : négatif pour $x < 0$, nul en $0$, positif pour $x > 0$.
4. $f$ décroît sur $]-\infty ; 0]$, croît sur $[0 ; +\infty[$, minimum $f(0) = 0$. Donc $f(x) \geq 0$, soit $e^x \geq x + 1$.
5. $f(1) = e - 2$ et $f'(1) = e - 1$ : $y = (e - 1)(x - 1) + e - 2 = (e - 1)x - 1$.
:::
:::
