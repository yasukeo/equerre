---
title: Série 1 : fonctions primitives
kind: serie
summary: Primitives usuelles, formes u′uⁿ et u′/√u, primitive qui prend une valeur donnée, avec les corrigés.
position: 10
visibility: public
---

Trois exercices pour reconnaître une dérivée.

:::exercice Primitives usuelles
Déterminer une primitive de chaque fonction sur l’intervalle indiqué.

1. $f(x) = 4x^3 - 6x + 5$ sur $\mathbb{R}$.
2. $g(x) = \dfrac{1}{x^2} + \dfrac{1}{\sqrt{x}}$ sur $]0 ; +\infty[$.
3. $h(x) = \cos(2x) - 3\sin x$ sur $\mathbb{R}$.

:::corrige
1. $F(x) = x^4 - 3x^2 + 5x$.
2. $G(x) = -\dfrac{1}{x} + 2\sqrt{x}$.
3. $H(x) = \dfrac{1}{2}\sin(2x) + 3\cos x$.
:::
:::

:::exercice Reconnaître une forme
Déterminer une primitive de chaque fonction.

1. $f(x) = (2x + 1)(x^2 + x)^4$ sur $\mathbb{R}$.
2. $g(x) = \dfrac{x}{\sqrt{x^2 + 4}}$ sur $\mathbb{R}$.
3. $h(x) = \dfrac{3}{(3x - 1)^2}$ sur $\left]\frac{1}{3} ; +\infty\right[$.

:::corrige
1. C’est $u' u^4$ avec $u(x) = x^2 + x$ : $F(x) = \dfrac{(x^2 + x)^5}{5}$.
2. Avec $u(x) = x^2 + 4 > 0$, $g = \dfrac{1}{2} \times \dfrac{u'}{\sqrt{u}}$, donc $G(x) = \sqrt{x^2 + 4}$.
3. C’est $\dfrac{u'}{u^2}$ avec $u(x) = 3x - 1$ : $H(x) = -\dfrac{1}{3x - 1}$.
:::
:::

:::exercice Primitive qui prend une valeur donnée
Déterminer la primitive $F$ de $f(x) = 2x - \sin x$ sur $\mathbb{R}$ telle que $F(0) = 3$.

:::corrige
Les primitives de $f$ sont $F(x) = x^2 + \cos x + c$. $F(0) = 1 + c = 3$ donne $c = 2$, donc $F(x) = x^2 + \cos x + 2$.
:::
:::
