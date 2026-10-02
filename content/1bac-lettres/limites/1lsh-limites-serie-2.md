---
title: Série 1 — partie 2 : limites en un point
kind: serie
summary: Limites par remplacement, limites à droite et à gauche avec la règle des signes, asymptotes verticales et formes 0/0 levées en factorisant, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Remplacer
Calculer :

1. $\lim_{x \to -1} (x^3 + 2x)$
2. $\lim_{x \to 2} \dfrac{x + 2}{x^2 + 1}$
3. $\lim_{x \to 4} \left(\sqrt{x} + x\right)$

:::corrige
1. $-1 - 2 = -3$.
2. $\frac{4}{5}$.
3. $2 + 4 = 6$.
:::
:::

:::exercice À droite et à gauche
1. Soit $f(x) = \dfrac{2x - 1}{x - 3}$. Calculer les limites de $f$ à droite et à gauche en $3$. Que peut-on en déduire ?
2. Soit $g(x) = \dfrac{1}{(x + 1)^2}$. Calculer la limite de $g$ en $-1$.
3. Calculer $\lim_{x \to 0^+} \left(-\dfrac{2}{x}\right)$.

:::corrige
1. Le numérateur tend vers $5$. Pour $x > 3$, $x - 3 \to 0^+$ : $+\infty$ ; pour $x < 3$, $x - 3 \to 0^-$ : $-\infty$. La droite $x = 3$ est asymptote verticale.
2. Le dénominateur est un carré, toujours positif : il tend vers $0^+$, et $g(x) \to +\infty$ des deux côtés.
3. $\frac{2}{x} \to +\infty$, donc $-\frac{2}{x} \to -\infty$.
:::
:::

:::exercice La forme 0/0
Calculer en factorisant :

1. $\lim_{x \to 2} \dfrac{x^2 - 4}{x - 2}$
2. $\lim_{x \to 1} \dfrac{x^2 - 3x + 2}{x - 1}$
3. $\lim_{x \to 0} \dfrac{x^2 + 5x}{x}$

:::corrige
1. $\frac{(x - 2)(x + 2)}{x - 2} = x + 2 \to 4$.
2. $\frac{(x - 1)(x - 2)}{x - 1} = x - 2 \to -1$.
3. $\frac{x(x + 5)}{x} = x + 5 \to 5$.
:::
:::

:::exercice Toutes les limites d’une fonction
Soit $f(x) = \dfrac{x + 2}{x - 1}$ sur $\mathbb{R} \setminus \{1\}$.

1. Calculer les limites de $f$ en $+\infty$ et en $-\infty$.
2. Calculer les limites de $f$ à droite et à gauche en $1$.
3. Donner les asymptotes de la courbe de $f$.

:::corrige
1. Comme $\frac{x}{x} = 1$ : la limite vaut $1$ en $+\infty$ et en $-\infty$.
2. Le numérateur tend vers $3$ ; $x - 1 \to 0^+$ à droite et $0^-$ à gauche : $+\infty$ à droite, $-\infty$ à gauche.
3. Asymptote horizontale $y = 1$ et asymptote verticale $x = 1$.
:::
:::
