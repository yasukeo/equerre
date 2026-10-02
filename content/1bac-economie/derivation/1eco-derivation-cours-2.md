---
title: Dérivation — partie 2 : fonction dérivée et variations
kind: cours
summary: Fonction dérivée, dérivées usuelles, opérations, dérivée de x ↦ f(ax + b), signe de la dérivée et sens de variation, extremums.
position: 20
visibility: public
---

## Fonction dérivée

:::definition
Si $f$ est dérivable en tout point d’un intervalle $I$, la fonction $x \mapsto f'(x)$ est la **fonction dérivée** de $f$ sur $I$.
:::

:::propriete
**Dérivées usuelles.**

- $(k)' = 0$ ; $(x)' = 1$ ; $(x^n)' = nx^{n - 1}$ ($n$ entier, $n \geq 1$) ;
- $\left(\frac{1}{x}\right)' = -\frac{1}{x^2}$ sur $\mathbb{R}^*$ ; $(\sqrt{x})' = \frac{1}{2\sqrt{x}}$ sur $]0 ; +\infty[$.
:::

## Opérations

:::propriete
Pour $u$ et $v$ dérivables et $k$ réel :

- $(u + v)' = u' + v'$, $(ku)' = ku'$ ;
- $(uv)' = u'v + uv'$ ;
- $\left(\frac{1}{v}\right)' = -\frac{v'}{v^2}$ et $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$ là où $v \neq 0$ ;
- $(u^n)' = nu'u^{n - 1}$ ; $(\sqrt{u})' = \frac{u'}{2\sqrt{u}}$ là où $u > 0$ ;
- $\left(f(ax + b)\right)' = af'(ax + b)$.
:::

:::exemple
- $f(x) = (3x^2 - 1)^4$ : $f'(x) = 4 \times 6x \times (3x^2 - 1)^3 = 24x(3x^2 - 1)^3$.
- $g(x) = \sqrt{x^2 + 1}$ : $g'(x) = \frac{2x}{2\sqrt{x^2 + 1}} = \frac{x}{\sqrt{x^2 + 1}}$.
- $h(x) = \frac{1}{2x + 1}$ sur $\left]-\frac{1}{2} ; +\infty\right[$ : $h'(x) = 2 \times \left(-\frac{1}{(2x + 1)^2}\right) = -\frac{2}{(2x + 1)^2}$.
:::

## Dérivée et sens de variation

:::theoreme
Soit $f$ dérivable sur un intervalle $I$.

- Si $f' > 0$ sur $I$ (sauf en des points isolés où elle s’annule), $f$ est strictement croissante sur $I$.
- Si $f' < 0$ sur $I$ (sauf en des points isolés), $f$ est strictement décroissante sur $I$.
- Si $f' = 0$ sur $I$, $f$ est constante.
:::

## Extremums

:::propriete
Si $f$ est dérivable sur un intervalle ouvert $I$ et si $f'$ s’annule en $a \in I$ **en changeant de signe**, $f$ admet un **extremum local** en $a$.
:::

:::exemple
$f(x) = x^3 - 3x$ : $f'(x) = 3(x - 1)(x + 1)$. $f$ croît sur $]-\infty ; -1]$, décroît sur $[-1 ; 1]$, croît sur $[1 ; +\infty[$ : maximum local $f(-1) = 2$, minimum local $f(1) = -2$.
:::

:::attention
$f'(a) = 0$ ne suffit pas pour un extremum : $f(x) = x^3$ a $f'(0) = 0$, mais $f'$ ne change pas de signe et $f$ n’a pas d’extremum en $0$.
:::
