---
title: Série 1 — partie 2 : lever les indéterminations
kind: serie
summary: Factoriser une forme 0/0, quantité conjuguée, limites trigonométriques, comparaison et gendarmes, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Factoriser
Calculer :

1. $\lim_{x \to 3} \dfrac{x^2 - 9}{x - 3}$
2. $\lim_{x \to -1} \dfrac{x^2 + 3x + 2}{x^2 - 1}$
3. $\lim_{x \to 2} \dfrac{x^3 - 8}{x - 2}$

:::corrige
1. $\frac{(x - 3)(x + 3)}{x - 3} = x + 3 \to 6$.
2. $\frac{(x + 1)(x + 2)}{(x + 1)(x - 1)} = \frac{x + 2}{x - 1} \to \frac{1}{-2} = -\frac{1}{2}$.
3. $x^3 - 8 = (x - 2)(x^2 + 2x + 4)$, donc la limite vaut $4 + 4 + 4 = 12$.
:::
:::

:::exercice Quantité conjuguée
Calculer :

1. $\lim_{x \to 0} \dfrac{\sqrt{x + 9} - 3}{x}$
2. $\lim_{x \to +\infty} \left(\sqrt{x^2 + 4x} - x\right)$
3. $\lim_{x \to +\infty} \left(\sqrt{x + 1} - \sqrt{x}\right)$

:::corrige
1. $\frac{x}{x\left(\sqrt{x + 9} + 3\right)} = \frac{1}{\sqrt{x + 9} + 3} \to \frac{1}{6}$.
2. $\frac{4x}{\sqrt{x^2 + 4x} + x} = \frac{4}{\sqrt{1 + \frac{4}{x}} + 1} \to 2$.
3. $\frac{1}{\sqrt{x + 1} + \sqrt{x}} \to 0$.
:::
:::

:::exercice Limites trigonométriques
Calculer :

1. $\lim_{x \to 0} \dfrac{\sin 5x}{2x}$
2. $\lim_{x \to 0} \dfrac{\tan 3x}{\sin x}$
3. $\lim_{x \to 0} \dfrac{1 - \cos 2x}{x^2}$

:::corrige
1. $\frac{5}{2} \times \frac{\sin 5x}{5x} \to \frac{5}{2}$.
2. $\frac{\tan 3x}{3x} \times \frac{x}{\sin x} \times 3 \to 3$.
3. $4 \times \frac{1 - \cos 2x}{(2x)^2} \to 4 \times \frac{1}{2} = 2$.
:::
:::

:::exercice Comparaison
1. Montrer que pour tout $x > 0$, $\dfrac{x - 1}{x} \leq \dfrac{x + \cos x}{x} \leq \dfrac{x + 1}{x}$, et en déduire la limite en $+\infty$.
2. Montrer que $\lim_{x \to +\infty} \left(x^2 + \sin x\right) = +\infty$.

:::corrige
1. $-1 \leq \cos x \leq 1$, puis on divise par $x > 0$ ; les deux bornes tendent vers $1$ : la limite vaut $1$.
2. $x^2 + \sin x \geq x^2 - 1$, qui tend vers $+\infty$.
:::
:::
