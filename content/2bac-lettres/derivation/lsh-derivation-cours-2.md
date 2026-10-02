---
title: Dérivation — partie 2 : variations et étude d’une fonction
kind: cours
summary: Signe de la dérivée et sens de variation, tableau de variations, extremums, limites et asymptotes simples, étude complète d’une fonction polynôme et d’une fonction rationnelle.
position: 20
visibility: public
---

## Dérivée et sens de variation

:::theoreme
Soit $f$ dérivable sur un intervalle $I$.

- Si $f'(x) > 0$ sur $I$ (sauf en quelques points), $f$ est **strictement croissante** sur $I$.
- Si $f'(x) < 0$ sur $I$ (sauf en quelques points), $f$ est **strictement décroissante** sur $I$.
- Si $f'(x) = 0$ sur $I$, $f$ est **constante** sur $I$.
:::

## Extremums

:::propriete
Si $f'$ s’annule en $a$ **en changeant de signe**, $f$ admet en $a$ un **extremum local** : un maximum si $f'$ passe de $+$ à $-$, un minimum si elle passe de $-$ à $+$. La tangente y est horizontale.
:::

:::exemple
$f(x) = x^2 - 4x + 1$ : $f'(x) = 2x - 4$, négative pour $x < 2$ et positive pour $x > 2$. $f$ décroît puis croît : elle a un minimum $f(2) = -3$.
:::

## Limites et asymptotes

:::propriete
- En $+\infty$ ou $-\infty$, un polynôme a la même limite que son terme de plus haut degré.
- Si $\lim_{x \to \pm\infty} f(x) = b$ (réel), la droite $y = b$ est **asymptote horizontale**.
- Si $\lim_{x \to a} f(x) = \pm\infty$, la droite $x = a$ est **asymptote verticale**.
:::

## Plan d’étude d’une fonction

1. L’ensemble de définition.
2. Les limites aux bornes, et les asymptotes.
3. La dérivée et son signe.
4. Le tableau de variations, avec les extremums.
5. Quelques points (intersections avec les axes, tangentes utiles), puis la courbe.

## Exemple : une fonction polynôme

Étudions $f(x) = x^3 - 3x^2 + 2$ sur $\mathbb{R}$.

- **Limites** : $f$ a la limite de $x^3$ : $-\infty$ en $-\infty$, $+\infty$ en $+\infty$.
- **Dérivée** : $f'(x) = 3x^2 - 6x = 3x(x - 2)$, positive sur $]-\infty ; 0[$, négative sur $]0 ; 2[$, positive sur $]2 ; +\infty[$.
- **Variations** : $f$ croît jusqu’au maximum $f(0) = 2$, décroît jusqu’au minimum $f(2) = -2$, puis croît.
- **Tangente en $1$** : $f(1) = 0$ et $f'(1) = -3$ : $y = -3x + 3$.

## Exemple : une fonction rationnelle

Étudions $g(x) = \dfrac{2x - 1}{x + 1}$ sur $]-1 ; +\infty[$.

- **Limites** : en $+\infty$, $g(x) \to \frac{2x}{x} = 2$ : asymptote horizontale $y = 2$. Quand $x \to -1^+$, le numérateur tend vers $-3$ et le dénominateur vers $0^+$ : $g(x) \to -\infty$, asymptote verticale $x = -1$.
- **Dérivée** : $g'(x) = \frac{2(x + 1) - (2x - 1)}{(x + 1)^2} = \frac{3}{(x + 1)^2} > 0$ : $g$ est strictement croissante.
- **Point particulier** : $g(x) = 0 \iff x = \frac{1}{2}$.
