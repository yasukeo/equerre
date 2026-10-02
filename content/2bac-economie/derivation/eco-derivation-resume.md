---
title: Dérivation et étude des fonctions : l’essentiel
kind: resume
summary: Les formules de dérivation, la tangente, le lien entre dérivée et variations, la concavité et les branches infinies, sur une page.
position: 10
visibility: public
---

## Nombre dérivé et tangente

- $f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}$, s’il s’agit d’un réel.
- Tangente au point d’abscisse $a$ : $y = f'(a)(x - a) + f(a)$.
- $f'_d(a) \neq f'_g(a)$ : point anguleux. Limite infinie du taux : demi-tangente verticale.
- Dérivable en $a$ entraîne continue en $a$ (pas l’inverse).

## Formules

- $(x^n)' = n x^{n - 1}$, $(\sqrt{x})' = \frac{1}{2\sqrt{x}}$, $(\sin x)' = \cos x$, $(\cos x)' = -\sin x$, $(\tan x)' = 1 + \tan^2 x$.
- $(uv)' = u'v + uv'$, $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$, $(u^n)' = n u' u^{n - 1}$, $(\sqrt{u})' = \frac{u'}{2\sqrt{u}}$.
- $(v \circ u)' = u' \times v' \circ u$.
- $\left(f^{-1}\right)'(b) = \frac{1}{f'\left(f^{-1}(b)\right)}$ si $f'\left(f^{-1}(b)\right) \neq 0$.

## Variations et extremums

:::theoreme
Sur un intervalle : $f' > 0$ (sauf en des points isolés) donne $f$ strictement croissante ; $f' < 0$ donne $f$ strictement décroissante ; $f' = 0$ donne $f$ constante.
:::

- Un extremum local en $a$ intérieur à l’intervalle : $f'$ s’annule en $a$ **en changeant de signe**.

## Concavité

- $f'' \geq 0$ : courbe convexe, au-dessus de ses tangentes. $f'' \leq 0$ : concave, au-dessous.
- $f''$ s’annule en changeant de signe en $a$ : point d’inflexion.

## Branches infinies

- $\lim_{x \to a} f(x) = \pm\infty$ : asymptote verticale $x = a$.
- $\lim_{x \to \pm\infty} f(x) = b$ : asymptote horizontale $y = b$.
- $\lim_{x \to \pm\infty} \left(f(x) - (ax + b)\right) = 0$ : asymptote oblique $y = ax + b$.
- Si $f(x) \to \pm\infty$, on étudie $\frac{f(x)}{x}$ : limite infinie, branche parabolique de direction $(Oy)$ ; limite $0$, direction $(Ox)$ ; limite $a \neq 0$, on étudie $f(x) - ax$.

:::attention
Pour la position de la courbe par rapport à une asymptote ou une tangente, étudiez le **signe** de la différence $f(x) - (ax + b)$.
:::
