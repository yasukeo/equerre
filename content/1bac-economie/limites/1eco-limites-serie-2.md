---
title: Série 1 — partie 2 : lever les indéterminations
kind: serie
summary: Factoriser une forme 0/0, quantité conjuguée, limites à gauche et à droite, comparaison et gendarmes, avec les corrigés.
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

:::exercice Limites en un point
Calculer :

1. $\lim_{x \to 2^+} \dfrac{x + 1}{x - 2}$ et $\lim_{x \to 2^-} \dfrac{x + 1}{x - 2}$
2. $\lim_{x \to 1} \dfrac{x^2 - 1}{x^2 + x - 2}$
3. $\lim_{x \to 0} \dfrac{\sqrt{1 + x} - \sqrt{1 - x}}{x}$

:::corrige
1. Le numérateur tend vers $3$ ; $x - 2 \to 0^+$ à droite et $0^-$ à gauche : $+\infty$ à droite, $-\infty$ à gauche.
2. $\frac{(x - 1)(x + 1)}{(x - 1)(x + 2)} = \frac{x + 1}{x + 2} \to \frac{2}{3}$.
3. Avec la quantité conjuguée : $\frac{(1 + x) - (1 - x)}{x\left(\sqrt{1 + x} + \sqrt{1 - x}\right)} = \frac{2}{\sqrt{1 + x} + \sqrt{1 - x}} \to \frac{2}{2} = 1$.
:::
:::

:::exercice Comparaison
1. Soit $f$ définie sur $]0 ; +\infty[$ telle que $\dfrac{3x - 1}{x} \leq f(x) \leq \dfrac{3x + 2}{x}$. Déterminer $\lim_{x \to +\infty} f(x)$.
2. Soit $g$ telle que $g(x) \geq x - \dfrac{1}{x}$ pour tout $x > 0$. Déterminer $\lim_{x \to +\infty} g(x)$.
3. Soit $h$ telle que $|h(x) - 4| \leq \dfrac{5}{x^2}$ pour tout $x \neq 0$. Déterminer $\lim_{x \to +\infty} h(x)$.

:::corrige
1. Les deux bornes valent $3 - \frac{1}{x}$ et $3 + \frac{2}{x}$, qui tendent vers $3$ : par les gendarmes, la limite vaut $3$.
2. $x - \frac{1}{x} \to +\infty$, donc $g(x) \to +\infty$.
3. $\frac{5}{x^2} \to 0$, donc $h(x) \to 4$.
:::
:::
