---
title: Limites — partie 2 : limites en un point
kind: cours
summary: Limite en un réel où la fonction est définie, limites à droite et à gauche, quotient d’un réel par zéro et règle des signes, asymptote verticale, forme 0/0 levée en factorisant.
position: 20
visibility: public
---

## Limite en un point où la fonction est définie

:::propriete
Si $f$ est un polynôme, ou une fraction rationnelle dont le dénominateur ne s’annule pas en $a$, alors $\lim_{x \to a} f(x) = f(a)$ : on remplace simplement $x$ par $a$.
:::

:::exemple
- $\lim_{x \to 2} (x^2 + 3x - 1) = 4 + 6 - 1 = 9$.
- $\lim_{x \to 1} \frac{2x + 1}{x + 3} = \frac{3}{4}$.
:::

## Limites à droite et à gauche

:::definition
- $\lim_{x \to a^+} f(x)$ est la limite quand $x$ tend vers $a$ en restant **plus grand** que $a$ (limite à droite).
- $\lim_{x \to a^-} f(x)$ est la limite quand $x$ tend vers $a$ en restant **plus petit** que $a$ (limite à gauche).
:::

:::exemple
$\lim_{x \to 0^+} \frac{1}{x} = +\infty$ et $\lim_{x \to 0^-} \frac{1}{x} = -\infty$ : par exemple $\frac{1}{0{,}001} = 1\,000$ et $\frac{1}{-0{,}001} = -1\,000$.
:::

## Un réel divisé par un nombre qui tend vers 0

:::propriete
Si le numérateur tend vers un réel $\ell \neq 0$ et le dénominateur tend vers $0$, le quotient tend vers $+\infty$ ou $-\infty$. Le signe se trouve par la **règle des signes** : on écrit $0^+$ si le dénominateur reste positif, $0^-$ s’il reste négatif.
:::

:::exemple
$f(x) = \frac{x + 1}{x - 2}$ en $2$. Le numérateur tend vers $3$.

- Pour $x > 2$, $x - 2 > 0$ : le dénominateur tend vers $0^+$, et $\lim_{x \to 2^+} f(x) = +\infty$.
- Pour $x < 2$, $x - 2 < 0$ : le dénominateur tend vers $0^-$, et $\lim_{x \to 2^-} f(x) = -\infty$.
:::

## Asymptote verticale

:::definition
Si $f(x)$ tend vers $+\infty$ ou $-\infty$ quand $x$ tend vers $a$ (à droite ou à gauche), la droite d’équation $x = a$ est une **asymptote verticale** à la courbe de $f$.
:::

:::exemple
Pour $f(x) = \frac{x + 1}{x - 2}$, la droite $x = 2$ est asymptote verticale.
:::

## La forme 0/0 : factoriser

:::propriete
Si le numérateur et le dénominateur s’annulent tous les deux en $a$, ils se factorisent par $x - a$ : on simplifie, puis on remplace $x$ par $a$.
:::

:::exemple
$\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$ : en $3$, on obtient $\frac{0}{0}$. Or $x^2 - 9 = (x - 3)(x + 3)$, donc pour $x \neq 3$ la fraction vaut $x + 3$, et la limite est $6$.
:::

:::attention
« $\frac{0}{0}$ » n’est pas un résultat : c’est le signal qu’il faut factoriser.
:::
