---
title: Série 1 — partie 1 : limites usuelles et opérations
kind: serie
summary: Limites de polynômes et de fonctions rationnelles, limites à droite et à gauche, opérations et signes, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Polynômes
Calculer :

1. $\lim_{x \to +\infty} (-3x^3 + x^2 + 5)$
2. $\lim_{x \to -\infty} (x^4 - 2x^3 + 1)$
3. $\lim_{x \to 2} (x^3 - 4x + 1)$

:::corrige
1. $-3x^3 \to -\infty$ : $-\infty$.
2. $x^4 \to +\infty$ : $+\infty$.
3. $8 - 8 + 1 = 1$.
:::
:::

:::exercice Fonctions rationnelles à l’infini
Calculer :

1. $\lim_{x \to +\infty} \dfrac{2x^2 - x}{5x^2 + 3}$
2. $\lim_{x \to -\infty} \dfrac{x^3 + 1}{2x - 1}$
3. $\lim_{x \to +\infty} \dfrac{4x + 7}{x^2 + 1}$

:::corrige
1. $\frac{2x^2}{5x^2} = \frac{2}{5}$.
2. $\frac{x^3}{2x} = \frac{x^2}{2} \to +\infty$.
3. $\frac{4x}{x^2} = \frac{4}{x} \to 0$.
:::
:::

:::exercice Limites à droite et à gauche
Soit $f(x) = \dfrac{2x + 1}{x - 3}$.

1. Calculer $\lim_{x \to 3^+} f(x)$ et $\lim_{x \to 3^-} f(x)$.
2. Calculer les limites de $f$ en $+\infty$ et en $-\infty$.

:::corrige
1. Le numérateur tend vers $7 > 0$ ; $x - 3 \to 0^+$ à droite et $0^-$ à gauche : $+\infty$ à droite, $-\infty$ à gauche.
2. $\frac{2x}{x} = 2$ dans les deux cas.
:::
:::

:::exercice Signe du dénominateur
Calculer :

1. $\lim_{x \to 1^+} \dfrac{x}{1 - x}$
2. $\lim_{x \to -2} \dfrac{-3}{(x + 2)^2}$
3. $\lim_{x \to 0^-} \left(x + \dfrac{1}{x}\right)$

:::corrige
1. Numérateur $\to 1$, dénominateur $\to 0^-$ : $-\infty$.
2. Dénominateur $\to 0^+$ (un carré), numérateur $-3$ : $-\infty$.
3. $x \to 0$ et $\frac{1}{x} \to -\infty$ : $-\infty$.
:::
:::
