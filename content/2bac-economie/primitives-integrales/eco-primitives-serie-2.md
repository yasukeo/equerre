---
title: Série 1 — partie 2 : opérations et méthodes
kind: serie
summary: Reconnaître u′uⁿ, u′/u², u′/√u et décomposer une fraction, primitive avec une condition, avec les corrigés.
position: 20
visibility: enrolled
---

Trois exercices sur la deuxième partie du cours.

:::exercice Reconnaître une forme
Déterminer une primitive de chaque fonction.

1. $f(x) = (2x + 1)(x^2 + x)^4$ sur $\mathbb{R}$.
2. $g(x) = \dfrac{x}{\sqrt{x^2 + 4}}$ sur $\mathbb{R}$.
3. $h(x) = \dfrac{3}{(3x - 1)^2}$ sur $\left]\frac{1}{3} ; +\infty\right[$.
4. $k(x) = x\left(x^2 - 1\right)^4$ sur $\mathbb{R}$.
5. $m(x) = x\sqrt{x^2 + 1}$ sur $\mathbb{R}$.

:::corrige
1. C’est $u' u^4$ avec $u(x) = x^2 + x$ : $F(x) = \dfrac{(x^2 + x)^5}{5}$.
2. Avec $u(x) = x^2 + 4 > 0$, $g = \dfrac{1}{2} \times \dfrac{u'}{\sqrt{u}}$, donc $G(x) = \sqrt{x^2 + 4}$.
3. C’est $\dfrac{u'}{u^2}$ avec $u(x) = 3x - 1$ : $H(x) = -\dfrac{1}{3x - 1}$.
4. $k = \frac{1}{2}u'u^4$ avec $u(x) = x^2 - 1$ : $K(x) = \frac{\left(x^2 - 1\right)^5}{10}$.
5. $m = \frac{1}{2}u'u^{\frac{1}{2}}$ avec $u(x) = x^2 + 1 > 0$, donc $M(x) = \frac{1}{2} \times \frac{u^{\frac{3}{2}}}{\frac{3}{2}} = \frac{1}{3}(x^2 + 1)\sqrt{x^2 + 1}$.
:::
:::

:::exercice Une fraction rationnelle
Soit $f(x) = \dfrac{x^2 + 4x + 5}{(x + 2)^2}$ sur $]-2 ; +\infty[$.

1. Montrer que $f(x) = 1 + \dfrac{1}{(x + 2)^2}$.
2. En déduire la primitive $F$ de $f$ sur $]-2 ; +\infty[$ telle que $F(0) = 0$.

:::corrige
1. $(x + 2)^2 + 1 = x^2 + 4x + 5$, d’où l’égalité.
2. Les primitives sont $x - \frac{1}{x + 2} + c$. $F(0) = -\frac{1}{2} + c = 0$ donne $c = \frac{1}{2}$ : $F(x) = x - \frac{1}{x + 2} + \frac{1}{2}$.
:::
:::

:::exercice Déterminer des coefficients
Soit $f(x) = \dfrac{2x^3 - 1}{x^2}$ sur $]0 ; +\infty[$.

1. Déterminer les réels $a$ et $b$ tels que $f(x) = ax + \dfrac{b}{x^2}$.
2. En déduire la primitive de $f$ qui s’annule en $1$.

:::corrige
1. $\frac{2x^3 - 1}{x^2} = 2x - \frac{1}{x^2}$ : $a = 2$, $b = -1$.
2. Les primitives sont $x^2 + \frac{1}{x} + c$. En $1$ : $2 + c = 0$, donc $F(x) = x^2 + \frac{1}{x} - 2$.
:::
:::
