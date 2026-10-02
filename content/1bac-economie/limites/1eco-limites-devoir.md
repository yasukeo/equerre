---
title: Devoir surveillé : limites d’une fonction
kind: devoir
summary: Un devoir d’une heure sur 20 points : limites à l’infini, formes 0/0, quantité conjuguée et comparaison, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : à l’infini
Calculer :

1. $\lim_{x \to -\infty} (x^3 - 4x^2 + 1)$ (2 pts)
2. $\lim_{x \to +\infty} \dfrac{3x^2 - 2}{x^2 + x}$ (2 pts)
3. $\lim_{x \to +\infty} \left(\sqrt{x^2 + 2x} - x\right)$ (2 pts)

:::corrige
1. $-\infty$.
2. $3$.
3. $\frac{2x}{\sqrt{x^2 + 2x} + x} = \frac{2}{\sqrt{1 + \frac{2}{x}} + 1} \to 1$.
:::
:::

:::exercice Exercice 2 (8 points) : formes indéterminées
Calculer :

1. $\lim_{x \to 2} \dfrac{x^2 - 5x + 6}{x - 2}$ (2 pts)
2. $\lim_{x \to 1} \dfrac{\sqrt{x + 3} - 2}{x - 1}$ (3 pts)
3. $\lim_{x \to 1^+} \dfrac{x + 2}{1 - x^2}$ (3 pts)

:::corrige
1. $(x - 2)(x - 3)$ : $x - 3 \to -1$.
2. $\frac{1}{\sqrt{x + 3} + 2} \to \frac{1}{4}$.
3. Numérateur $\to 3$, $1 - x^2 \to 0^-$ pour $x > 1$ : $-\infty$.
:::
:::

:::exercice Exercice 3 (6 points) : en un point et par comparaison
1. Calculer $\lim_{x \to 3^-} \dfrac{2x}{x - 3}$. (2 pts)
2. Calculer $\lim_{x \to 0} \dfrac{\sqrt{x + 4} - 2}{x^2 + x}$. (2 pts)
3. Soit $f$ telle que $|f(x) - 1| \leq \dfrac{2}{x^2}$ pour tout $x > 0$. Déterminer $\lim_{x \to +\infty} f(x)$. (2 pts)

:::corrige
1. Le numérateur tend vers $6$ et $x - 3 \to 0^-$ : $-\infty$.
2. $\frac{x}{x(x + 1)\left(\sqrt{x + 4} + 2\right)} = \frac{1}{(x + 1)\left(\sqrt{x + 4} + 2\right)} \to \frac{1}{4}$.
3. $\frac{2}{x^2} \to 0$, donc $f(x) \to 1$.
:::
:::
