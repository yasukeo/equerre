---
title: Devoir surveillé : fonctions exponentielles
kind: devoir
summary: Un devoir d’une heure sur 20 points : équations et inéquations, limites, étude de x·e^(−x) et une primitive, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice non autorisée.

:::exercice Exercice 1 (6 points) : équations et inéquations
Résoudre dans $\mathbb{R}$ :

1. $e^{2x} - e^x - 6 = 0$ (2 pts)
2. $e^{x^2} \leq e^{3x - 2}$ (2 pts)
3. $2^x = 3^{x - 1}$ (2 pts)

:::corrige
1. Avec $X = e^x > 0$ : $X^2 - X - 6 = (X - 3)(X + 2) = 0$, et $X > 0$ impose $X = 3$ : $S = \{\ln 3\}$.
2. $x^2 \leq 3x - 2 \iff (x - 1)(x - 2) \leq 0$ : $S = [1 ; 2]$.
3. $x\ln 2 = (x - 1)\ln 3$, donc $x = \frac{\ln 3}{\ln 3 - \ln 2}$.
:::
:::

:::exercice Exercice 2 (5 points) : limites
Calculer :

1. $\lim_{x \to +\infty} x^2 e^{-x}$ (1,5 pt)
2. $\lim_{x \to -\infty} \left(e^x + x\right)$ (1,5 pt)
3. $\lim_{x \to 0} \dfrac{e^{3x} - 1}{2x}$ (2 pts)

:::corrige
1. $x^2 e^{-x} = \frac{x^2}{e^x} \to 0$ (croissances comparées).
2. $e^x \to 0$ et $x \to -\infty$ : la limite vaut $-\infty$.
3. $\frac{e^{3x} - 1}{2x} = \frac{3}{2} \times \frac{e^{3x} - 1}{3x} \to \frac{3}{2}$.
:::
:::

:::exercice Exercice 3 (9 points) : étude d’une fonction
Soit $f(x) = xe^{-x}$ sur $\mathbb{R}$, et $(C)$ sa courbe.

1. Calculer les limites de $f$ en $-\infty$ et en $+\infty$ ; interpréter. (2 pts)
2. Calculer $f'(x)$ et dresser le tableau de variations de $f$. (2,5 pts)
3. Donner l’équation de la tangente $(T)$ à $(C)$ en $O$, et étudier la position de $(C)$ par rapport à $(T)$. (2,5 pts)
4. Vérifier que $F(x) = -(x + 1)e^{-x}$ est une primitive de $f$ sur $\mathbb{R}$. (2 pts)

:::corrige
1. En $-\infty$ : $x \to -\infty$ et $e^{-x} \to +\infty$, donc $f(x) \to -\infty$. En $+\infty$ : $f(x) = \frac{x}{e^x} \to 0$ ; la droite $y = 0$ est asymptote en $+\infty$.
2. $f'(x) = e^{-x} - xe^{-x} = (1 - x)e^{-x}$ : $f$ croît sur $]-\infty ; 1]$, décroît sur $[1 ; +\infty[$, de maximum $f(1) = \frac{1}{e}$.
3. $f(0) = 0$ et $f'(0) = 1$ : $(T) : y = x$. $f(x) - x = x\left(e^{-x} - 1\right)$. Pour $x > 0$, $e^{-x} < 1$ ; pour $x < 0$, $e^{-x} > 1$ : dans les deux cas le produit est négatif. Donc $(C)$ est au-dessous de $(T)$, sauf en $O$.
4. $F'(x) = -e^{-x} + (x + 1)e^{-x} = xe^{-x} = f(x)$.
:::
:::
