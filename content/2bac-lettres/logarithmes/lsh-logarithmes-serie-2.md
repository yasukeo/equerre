---
title: Série 1 — partie 2 : limites, dérivées et étude
kind: serie
summary: Limites avec ln, dérivées de fonctions qui contiennent ln x, étude d’une fonction et tangente, avec les corrigés.
position: 20
visibility: enrolled
---

Trois exercices sur la deuxième partie du cours.

:::exercice Limites
Calculer :

1. $\lim_{x \to +\infty} (2x + \ln x)$
2. $\lim_{x \to 0^+} (x + \ln x)$
3. $\lim_{x \to +\infty} \left(1 + \dfrac{\ln x}{x}\right)$

:::corrige
1. $+\infty$.
2. $x \to 0$ et $\ln x \to -\infty$ : $-\infty$.
3. $\frac{\ln x}{x} \to 0$ : la limite vaut $1$.
:::
:::

:::exercice Dérivées
Calculer la dérivée de chaque fonction sur $]0 ; +\infty[$.

1. $f(x) = x^2 - 4\ln x$
2. $g(x) = (x + 1)\ln x$
3. $h(x) = \dfrac{\ln x}{x}$

:::corrige
1. $f'(x) = 2x - \frac{4}{x}$.
2. $g'(x) = \ln x + \frac{x + 1}{x}$.
3. $h'(x) = \frac{\frac{1}{x} \times x - \ln x}{x^2} = \frac{1 - \ln x}{x^2}$.
:::
:::

:::exercice Étude d’une fonction
Soit $f(x) = 2x - 2\ln x$ sur $]0 ; +\infty[$.

1. Calculer les limites de $f$ en $0^+$ et en $+\infty$.
2. Montrer que $f'(x) = \dfrac{2(x - 1)}{x}$ et dresser le tableau de variations de $f$.
3. En déduire que $\ln x \leq x - 1$ pour tout $x > 0$.
4. Donner l’équation de la tangente à la courbe au point d’abscisse $e$.

:::corrige
1. En $0^+$ : $-2\ln x \to +\infty$, donc $+\infty$. En $+\infty$ : $f(x) = 2x\left(1 - \frac{\ln x}{x}\right) \to +\infty$.
2. $f'(x) = 2 - \frac{2}{x} = \frac{2(x - 1)}{x}$ : $f$ décroît sur $]0 ; 1]$, croît sur $[1 ; +\infty[$, minimum $f(1) = 2$.
3. $f(x) \geq 2$ donne $2x - 2\ln x \geq 2$, soit $\ln x \leq x - 1$.
4. $f(e) = 2e - 2$ et $f'(e) = \frac{2(e - 1)}{e}$ : $y = \frac{2(e - 1)}{e}(x - e) + 2e - 2$, ce qui se simplifie en $y = \frac{2(e - 1)}{e}x$.
:::
:::
