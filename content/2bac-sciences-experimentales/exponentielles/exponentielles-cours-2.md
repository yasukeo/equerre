---
title: Fonctions exponentielles — partie 2 : dérivées, limites et étude
kind: cours
summary: Dérivée et limites usuelles, inégalité eˣ ≥ x + 1, dérivée et primitives de e^u, exponentielle de base a, étude complète d’une fonction avec exp.
position: 20
visibility: public
---
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

## Exemple d’étude complète

Étudions $f(x) = \dfrac{e^x - 1}{x}$ pour $x \neq 0$, prolongée par $f(0) = 1$.

**Continuité en 0.** $\lim_{x \to 0} \frac{e^x - 1}{x} = 1 = f(0)$ : $f$ est continue en $0$.

**Limites.** En $+\infty$, $\frac{e^x}{x} \to +\infty$ et $\frac{1}{x} \to 0$, donc $f(x) \to +\infty$ ; $\frac{f(x)}{x} = \frac{e^x}{x^2} - \frac{1}{x^2} \to +\infty$ : branche parabolique de direction l’axe des ordonnées. En $-\infty$, $e^x - 1 \to -1$ et $x \to -\infty$, donc $f(x) \to 0$ : asymptote horizontale $y = 0$.

**Variations.** Pour $x \neq 0$, $f'(x) = \dfrac{xe^x - (e^x - 1)}{x^2} = \dfrac{g(x)}{x^2}$ avec $g(x) = (x - 1)e^x + 1$. Or $g'(x) = xe^x$ : $g$ décroît sur $]-\infty ; 0]$ et croît sur $[0 ; +\infty[$, avec $g(0) = 0$. Donc $g(x) \geq 0$, et $f$ est croissante sur $]-\infty ; 0[$ et sur $]0 ; +\infty[$ ; continue en $0$, elle est croissante sur $\mathbb{R}$.

## Exponentielle et croissance comparée

:::propriete
En $+\infty$, l’exponentielle l’emporte sur toute puissance, et toute puissance l’emporte sur le logarithme :

$$
\lim_{x \to +\infty} \frac{e^x}{x^n} = +\infty \qquad \lim_{x \to +\infty} x^n e^{-x} = 0 \qquad \lim_{x \to +\infty} \frac{\ln x}{x^n} = 0
$$
:::

:::exemple
$\lim_{x \to +\infty} \dfrac{x^3 + 1}{e^x} = \lim_{x \to +\infty} \left(\dfrac{x^3}{e^x} + e^{-x}\right) = 0$.
:::
