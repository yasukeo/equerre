---
title: Fonctions logarithmiques — partie 2 : limites, dérivées et étude
kind: cours
summary: Limites usuelles avec ln, courbe et tangente, dérivée de ln(u), primitives de u′/u, logarithme de base a et logarithme décimal, étude complète d’une fonction avec ln.
position: 20
visibility: public
---
## Limites

:::propriete
$$
\lim_{x \to +\infty} \ln x = +\infty \qquad \lim_{x \to 0^+} \ln x = -\infty
$$

$$
\lim_{x \to +\infty} \frac{\ln x}{x} = 0 \qquad \lim_{x \to 0^+} x \ln x = 0 \qquad \lim_{x \to 1} \frac{\ln x}{x - 1} = 1 \qquad \lim_{x \to 0} \frac{\ln(1 + x)}{x} = 1
$$

Plus généralement, pour $n \geq 1$ : $\lim_{x \to +\infty} \frac{\ln x}{x^n} = 0$ et $\lim_{x \to 0^+} x^n \ln x = 0$.
:::

La courbe de $\ln$ a l’axe des ordonnées pour asymptote verticale, et une branche parabolique de direction l’axe des abscisses en $+\infty$. Sa tangente au point d’abscisse $1$ a pour équation $y = x - 1$, et la courbe est au-dessous : $\ln x \leq x - 1$ pour tout $x > 0$.

:::exemple
$\lim_{x \to +\infty} \left(x - \ln x\right) = \lim_{x \to +\infty} x\left(1 - \frac{\ln x}{x}\right) = +\infty$, car $\frac{\ln x}{x} \to 0$.
:::

## La fonction ln(u)

:::propriete
Si $u$ est dérivable et strictement positive sur $I$, alors $\ln u$ est dérivable sur $I$ et :

$$
(\ln u)' = \frac{u'}{u}
$$

Si $u$ est dérivable et ne s’annule pas sur $I$, $\left(\ln|u|\right)' = \frac{u'}{u}$ : les primitives de $\frac{u'}{u}$ sur $I$ sont les fonctions $\ln|u| + c$.
:::

:::exemple
- $f(x) = \ln(x^2 + 1)$ : $f'(x) = \frac{2x}{x^2 + 1}$.
- Une primitive de $g(x) = \frac{\cos x}{\sin x}$ sur $]0 ; \pi[$ est $G(x) = \ln(\sin x)$.
- Une primitive de $h(x) = \frac{1}{2x + 3}$ sur $]-\frac{3}{2} ; +\infty[$ est $H(x) = \frac{1}{2}\ln(2x + 3)$.
:::

## Logarithme de base a

:::definition
Soit $a > 0$ et $a \neq 1$. La **fonction logarithme de base** $a$ est définie sur $]0 ; +\infty[$ par :

$$
\log_a x = \frac{\ln x}{\ln a}
$$

Le logarithme décimal est $\log = \log_{10}$.
:::

:::propriete
- $\log_a a = 1$, $\log_a 1 = 0$, et $\log_a\left(a^r\right) = r$ pour $r$ rationnel.
- $\log_a$ a les mêmes propriétés algébriques que $\ln$.
- $(\log_a x)' = \frac{1}{x \ln a}$ : $\log_a$ est croissante si $a > 1$, décroissante si $0 < a < 1$.
- $\log(10^n) = n$ pour tout entier $n$.
:::

## Exemple d’étude complète

Étudions $f(x) = \dfrac{1 + \ln x}{x}$ sur $]0 ; +\infty[$.

**Limites.** En $0^+$, $1 + \ln x \to -\infty$ et $\frac{1}{x} \to +\infty$ : $\lim_{0^+} f = -\infty$, la droite $x = 0$ est asymptote verticale. En $+\infty$, $f(x) = \frac{1}{x} + \frac{\ln x}{x} \to 0$ : la droite $y = 0$ est asymptote horizontale.

**Variations.** $f'(x) = \dfrac{\frac{1}{x} \times x - (1 + \ln x)}{x^2} = \dfrac{-\ln x}{x^2}$, du signe de $-\ln x$ : $f$ est croissante sur $]0 ; 1]$, décroissante sur $[1 ; +\infty[$, et son maximum est $f(1) = 1$.

**Intersection avec l’axe des abscisses.** $f(x) = 0 \iff \ln x = -1 \iff x = \frac{1}{e}$ ; $f$ est négative sur $\left]0 ; \frac{1}{e}\right[$ et positive après.

**Tangente.** En $\frac{1}{e}$ : $f'\left(\frac{1}{e}\right) = \frac{1}{e^{-2}} = e^2$, donc la tangente a pour équation $y = e^2\left(x - \frac{1}{e}\right) = e^2 x - e$.

## Logarithme décimal : une application

Le nombre de chiffres d’un entier $N \geq 1$ est l’entier $n$ tel que $10^{n - 1} \leq N < 10^n$, soit $n - 1 \leq \log N < n$.

:::exemple
$\log\left(2^{30}\right) = 30\log 2 \approx 9{,}03$ : $2^{30}$ s’écrit avec $10$ chiffres.
:::
