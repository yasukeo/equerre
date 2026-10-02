---
title: Devoir surveillé : les limites
kind: devoir
summary: Un devoir d’une heure sur 20 points : limites à l’infini de polynômes et de fractions, limites en un point, forme 0/0 et asymptotes, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (8 points) : à l’infini
Calculer (2 pts chacune) :

1. $\lim_{x \to +\infty} (-3x^3 + x - 1)$
2. $\lim_{x \to -\infty} (x^2 - 5x)$
3. $\lim_{x \to +\infty} \dfrac{5x - 2}{x + 4}$
4. $\lim_{x \to -\infty} \dfrac{x + 3}{x^2 + 1}$

:::corrige
1. Comme $-3x^3$ : $-\infty$.
2. Comme $x^2$ : $+\infty$.
3. $\frac{5x}{x} = 5$.
4. $\frac{x}{x^2} = \frac{1}{x} \to 0$.
:::
:::

:::exercice Exercice 2 (6 points) : en un point
Calculer :

1. $\lim_{x \to 2} (3x^2 - x)$ (2 pts)
2. $\lim_{x \to 5^+} \dfrac{x + 1}{x - 5}$ et $\lim_{x \to 5^-} \dfrac{x + 1}{x - 5}$ (2 pts)
3. $\lim_{x \to -3} \dfrac{x^2 - 9}{x + 3}$ (2 pts)

:::corrige
1. $12 - 2 = 10$.
2. Le numérateur tend vers $6$ ; à droite $x - 5 \to 0^+$ : $+\infty$ ; à gauche $x - 5 \to 0^-$ : $-\infty$.
3. $\frac{(x - 3)(x + 3)}{x + 3} = x - 3 \to -6$.
:::
:::

:::exercice Exercice 3 (6 points) : asymptotes
Soit $f(x) = \dfrac{4x + 1}{x - 2}$.

1. Donner l’ensemble de définition de $f$. (1 pt)
2. Calculer les limites de $f$ en $+\infty$ et en $-\infty$, et en déduire une asymptote. (2 pts)
3. Calculer les limites de $f$ à droite et à gauche en $2$, et en déduire une asymptote. (3 pts)

:::corrige
1. $D_f = \mathbb{R} \setminus \{2\}$.
2. Comme $\frac{4x}{x} = 4$ : la limite vaut $4$ en $\pm\infty$ ; asymptote horizontale $y = 4$.
3. Le numérateur tend vers $9$ ; à droite, $x - 2 \to 0^+$ : $+\infty$ ; à gauche, $0^-$ : $-\infty$. Asymptote verticale $x = 2$.
:::
:::
