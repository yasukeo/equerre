---
title: Fonctions logarithmiques
kind: cours
summary: Le logarithme népérien, ses propriétés algébriques, sa dérivée et ses limites, la fonction ln(u), et le logarithme de base a.
position: 20
visibility: public
---

## Le logarithme népérien

:::definition
La fonction $x \mapsto \frac{1}{x}$ est continue sur $]0 ; +\infty[$. La **fonction logarithme népérien**, notée $\ln$, est sa primitive sur $]0 ; +\infty[$ qui s’annule en $1$ :

$$
\ln 1 = 0 \qquad \text{et} \qquad (\ln x)' = \frac{1}{x} \text{ pour } x > 0
$$
:::

:::propriete
- $\ln$ est définie, continue et strictement croissante sur $]0 ; +\infty[$.
- Pour $a > 0$ et $b > 0$ : $\ln a = \ln b \iff a = b$ et $\ln a < \ln b \iff a < b$.
- $\ln x > 0 \iff x > 1$ et $\ln x < 0 \iff 0 < x < 1$.
- Le nombre $e$ est l’unique réel tel que $\ln e = 1$ ; $e \approx 2{,}718$.
:::

## Propriétés algébriques

:::propriete
Pour tous réels $a > 0$, $b > 0$ et tout rationnel $r$ :

$$
\ln(ab) = \ln a + \ln b \qquad \ln\frac{1}{a} = -\ln a \qquad \ln\frac{a}{b} = \ln a - \ln b \qquad \ln\left(a^r\right) = r \ln a
$$

En particulier, $\ln\sqrt{a} = \frac{1}{2}\ln a$.
:::

:::exemple
$\ln 8 - 2\ln 2 = 3\ln 2 - 2\ln 2 = \ln 2$ et $\ln\frac{e^2}{\sqrt{e}} = 2 - \frac{1}{2} = \frac{3}{2}$.
:::

:::attention
$\ln(a + b)$ n’est pas $\ln a + \ln b$. Et $\ln(ab) = \ln a + \ln b$ demande $a > 0$ et $b > 0$ : si $ab > 0$ avec $a, b < 0$, on écrit $\ln(ab) = \ln|a| + \ln|b|$.
:::

### Équations et inéquations

Pour résoudre une équation ou une inéquation avec $\ln$ :

1. on détermine l’ensemble où elle a un sens (arguments strictement positifs) ;
2. on se ramène à $\ln A = \ln B$ ou $\ln A < \ln B$, et on utilise $A = B$ ou $A < B$ ;
3. on garde les solutions qui sont dans l’ensemble de départ.

:::exemple
$\ln(x - 1) + \ln(x + 1) = \ln 3$ n’a de sens que pour $x > 1$. Elle s’écrit $\ln(x^2 - 1) = \ln 3$, soit $x^2 = 4$, donc $x = 2$ ou $x = -2$. Seul $x = 2$ convient.
:::

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
