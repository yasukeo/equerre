---
title: Devoir surveillé : fonctions logarithmiques
kind: devoir
summary: Un devoir d’une heure sur 20 points : règles de calcul, équations et inéquations, étude d’une fonction avec ln, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (5 points) : calculs
1. Écrire $A = \ln 50 - \ln 2$ en fonction de $\ln 5$. (1,5 pt)
2. Calculer $B = \ln\left(e^5\right) - 2\ln e + \ln 1$. (1,5 pt)
3. Simplifier $C = \ln(x^2) - \ln x$ pour $x > 0$. (2 pts)

:::corrige
1. $A = \ln 25 = 2\ln 5$.
2. $B = 5 - 2 + 0 = 3$.
3. $C = 2\ln x - \ln x = \ln x$.
:::
:::

:::exercice Exercice 2 (6 points) : équations
Résoudre :

1. $\ln(x + 3) = \ln(2x - 1)$ (2 pts)
2. $\ln x = 1$ (1 pt)
3. $\ln(x - 2) \leq 0$ (3 pts)

:::corrige
1. Domaine : $x > \frac{1}{2}$. $x + 3 = 2x - 1 \iff x = 4$ : $S = \{4\}$.
2. $x = e$.
3. Domaine : $x > 2$. $x - 2 \leq 1 \iff x \leq 3$ : $S = ]2 ; 3]$.
:::
:::

:::exercice Exercice 3 (9 points) : étude d’une fonction
Soit $f(x) = x^2 - 2\ln x$ sur $]0 ; +\infty[$.

1. Calculer $\lim_{x \to 0^+} f(x)$. (2 pts)
2. Calculer $f'(x)$ et montrer que $f'(x) = \dfrac{2(x - 1)(x + 1)}{x}$. (3 pts)
3. Dresser le tableau de variations de $f$ et donner son minimum. (3 pts)
4. En déduire que $f(x) > 0$ pour tout $x > 0$. (1 pt)

:::corrige
1. $x^2 \to 0$ et $-2\ln x \to +\infty$ : $+\infty$.
2. $f'(x) = 2x - \frac{2}{x} = \frac{2x^2 - 2}{x} = \frac{2(x - 1)(x + 1)}{x}$.
3. Pour $x > 0$, $f'$ a le signe de $x - 1$ : $f$ décroît sur $]0 ; 1]$ et croît ensuite ; minimum $f(1) = 1$.
4. $f(x) \geq 1 > 0$.
:::
:::
