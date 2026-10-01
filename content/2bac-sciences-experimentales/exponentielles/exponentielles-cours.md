---
title: Fonctions exponentielles
kind: cours
summary: La fonction exponentielle népérienne, ses propriétés, sa dérivée et ses limites, la fonction exp(u), et l’exponentielle de base a.
position: 20
visibility: public
---

## L’exponentielle népérienne

:::definition
La fonction $\ln$ est continue et strictement croissante de $]0 ; +\infty[$ sur $\mathbb{R}$. Sa fonction réciproque est la **fonction exponentielle népérienne**, notée $\exp$ ou $x \mapsto e^x$. Pour tout réel $x$ et tout $y > 0$ :

$$
y = e^x \iff x = \ln y
$$
:::

:::propriete
- $\exp$ est définie, continue et strictement croissante sur $\mathbb{R}$, et $e^x > 0$ pour tout $x$.
- $e^0 = 1$, $e^1 = e$.
- $\ln\left(e^x\right) = x$ pour tout réel $x$, et $e^{\ln x} = x$ pour tout $x > 0$.
- $e^a = e^b \iff a = b$ et $e^a < e^b \iff a < b$.
- Les courbes de $\exp$ et de $\ln$ sont symétriques par rapport à la droite $y = x$.
:::

## Propriétés algébriques

:::propriete
Pour tous réels $a$ et $b$ et tout rationnel $r$ :

$$
e^{a + b} = e^a e^b \qquad e^{-a} = \frac{1}{e^a} \qquad e^{a - b} = \frac{e^a}{e^b} \qquad \left(e^a\right)^r = e^{ra}
$$
:::

:::exemple
$e^{2x} - 3e^x + 2 = 0$ : avec $X = e^x > 0$, l’équation devient $X^2 - 3X + 2 = 0$, soit $X = 1$ ou $X = 2$. Donc $e^x = 1$ ou $e^x = 2$, c’est-à-dire $x = 0$ ou $x = \ln 2$.
:::

## Dérivée et limites

:::propriete
$\exp$ est dérivable sur $\mathbb{R}$ et $\left(e^x\right)' = e^x$.
:::

:::propriete
$$
\lim_{x \to +\infty} e^x = +\infty \qquad \lim_{x \to -\infty} e^x = 0
$$

$$
\lim_{x \to +\infty} \frac{e^x}{x} = +\infty \qquad \lim_{x \to -\infty} x e^x = 0 \qquad \lim_{x \to 0} \frac{e^x - 1}{x} = 1
$$

Plus généralement, pour $n \geq 1$ : $\lim_{x \to +\infty} \frac{e^x}{x^n} = +\infty$ et $\lim_{x \to -\infty} x^n e^x = 0$.
:::

La courbe de $\exp$ a pour asymptote horizontale l’axe des abscisses en $-\infty$ et une branche parabolique de direction l’axe des ordonnées en $+\infty$. Sa tangente en $0$ est la droite $y = x + 1$, et la courbe est au-dessus : $e^x \geq x + 1$ pour tout $x$.

:::exemple
$\lim_{x \to +\infty} \left(e^x - x^2\right) = \lim_{x \to +\infty} x^2\left(\frac{e^x}{x^2} - 1\right) = +\infty$.
:::

## La fonction exp(u)

:::propriete
Si $u$ est dérivable sur $I$, alors $e^u$ est dérivable sur $I$ et :

$$
\left(e^{u}\right)' = u' e^{u}
$$

Les primitives de $u' e^u$ sur $I$ sont les fonctions $e^u + c$.
:::

:::exemple
- $f(x) = e^{x^2 - x}$ : $f'(x) = (2x - 1)e^{x^2 - x}$.
- Une primitive de $g(x) = x e^{x^2}$ est $G(x) = \frac{1}{2} e^{x^2}$.
- Une primitive de $h(x) = e^{-3x + 1}$ est $H(x) = -\frac{1}{3} e^{-3x + 1}$.
:::

## Exponentielle de base a

:::definition
Soit $a > 0$. Pour tout réel $x$, on pose $a^x = e^{x \ln a}$.
:::

:::propriete
- Pour $a > 0$, $b > 0$ et $x$, $y$ réels : $a^{x + y} = a^x a^y$, $a^{-x} = \frac{1}{a^x}$, $(a^x)^y = a^{xy}$, $(ab)^x = a^x b^x$.
- $\ln(a^x) = x \ln a$.
- $(a^x)' = (\ln a)\, a^x$ : pour $a > 1$, $x \mapsto a^x$ est croissante ; pour $0 < a < 1$, décroissante.
- Pour $a \neq 1$, $x \mapsto a^x$ est la réciproque de $\log_a$ : $y = a^x \iff x = \log_a y$.
:::

:::exemple
$2^x = 5 \iff x \ln 2 = \ln 5 \iff x = \frac{\ln 5}{\ln 2}$.
:::
