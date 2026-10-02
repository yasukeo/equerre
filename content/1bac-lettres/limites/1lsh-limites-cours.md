---
title: Limites — partie 1 : limites à l’infini
kind: cours
summary: Ce que signifie une limite à l’infini, limites des fonctions usuelles, règles de calcul, limites des polynômes et des fractions rationnelles, asymptote horizontale.
position: 10
visibility: public
---

## L’idée de limite à l’infini

Quand $x$ devient de plus en plus grand :

- si $f(x)$ devient aussi grand qu’on veut, on écrit $\lim_{x \to +\infty} f(x) = +\infty$ ;
- si $f(x)$ se rapproche autant qu’on veut d’un réel $\ell$, on écrit $\lim_{x \to +\infty} f(x) = \ell$.

On définit de même les limites quand $x \to -\infty$.

:::exemple
$f(x) = \frac{1}{x}$ : $f(10) = 0{,}1$, $f(1\,000) = 0{,}001$, $f(1\,000\,000) = 0{,}000\,001$. Les valeurs se rapprochent de $0$ : $\lim_{x \to +\infty} \frac{1}{x} = 0$.
:::

## Limites usuelles

:::propriete
- En $+\infty$ : $x$, $x^2$, $x^3$, $x^n$ et $\sqrt{x}$ tendent vers $+\infty$ ; $\frac{1}{x}$, $\frac{1}{x^2}$, $\frac{1}{\sqrt{x}}$ tendent vers $0$.
- En $-\infty$ : $x^2$ (et toute puissance paire) tend vers $+\infty$ ; $x$ et $x^3$ (et toute puissance impaire) tendent vers $-\infty$ ; $\frac{1}{x}$ et $\frac{1}{x^2}$ tendent vers $0$.
:::

## Règles de calcul

:::propriete
Pour $\ell$ un réel :

- **somme** : $\ell + (+\infty) = +\infty$ ; $(+\infty) + (+\infty) = +\infty$ ; $(-\infty) + (-\infty) = -\infty$ ;
- **produit** : un réel non nul fois l’infini donne l’infini, avec la règle des signes ; $(+\infty) \times (-\infty) = -\infty$ ;
- **quotient** : $\frac{\ell}{\pm\infty} = 0$.
:::

:::attention
Quatre cas ne se calculent pas directement : $+\infty - \infty$, $0 \times \infty$, $\frac{\infty}{\infty}$ et $\frac{0}{0}$. Ce sont des **formes indéterminées** : il faut transformer l’expression.
:::

## Polynômes et fractions rationnelles

:::propriete
- En $+\infty$ ou en $-\infty$, un **polynôme** a la même limite que son terme de plus haut degré.
- Une **fraction rationnelle** a la même limite que le quotient des termes de plus haut degré du numérateur et du dénominateur.
:::

:::exemple
- $\lim_{x \to +\infty} (2x^3 - 5x + 1) = \lim_{x \to +\infty} 2x^3 = +\infty$.
- $\lim_{x \to -\infty} (-x^2 + 3x) = \lim_{x \to -\infty} (-x^2) = -\infty$.
- $\lim_{x \to +\infty} \frac{3x + 1}{x - 2} = \lim_{x \to +\infty} \frac{3x}{x} = 3$.
- $\lim_{x \to +\infty} \frac{x + 1}{x^2 + 1} = \lim_{x \to +\infty} \frac{x}{x^2} = \lim_{x \to +\infty} \frac{1}{x} = 0$.
- $\lim_{x \to +\infty} \frac{x^2 + 1}{x - 1} = \lim_{x \to +\infty} \frac{x^2}{x} = \lim_{x \to +\infty} x = +\infty$.
:::

## Asymptote horizontale

:::definition
Si $\lim_{x \to +\infty} f(x) = \ell$ (ou en $-\infty$), la droite d’équation $y = \ell$ est une **asymptote horizontale** à la courbe de $f$ : la courbe s’en rapproche de plus en plus.
:::

:::exemple
Pour $f(x) = \frac{3x + 1}{x - 2}$, la limite en $+\infty$ et en $-\infty$ vaut $3$ : la droite $y = 3$ est asymptote horizontale.
:::
