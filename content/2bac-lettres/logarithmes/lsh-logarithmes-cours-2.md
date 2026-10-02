---
title: Fonctions logarithmiques — partie 2 : limites, dérivées et étude
kind: cours
summary: Limites de ln en 0 et en l’infini, croissance comparée, dérivée de ln x et de fonctions simples qui le contiennent, étude complète de f(x) = x − ln x.
position: 20
visibility: public
---

## Limites

:::propriete
$$
\lim_{x \to +\infty} \ln x = +\infty \qquad \lim_{x \to 0^+} \ln x = -\infty \qquad \lim_{x \to +\infty} \frac{\ln x}{x} = 0 \qquad \lim_{x \to 0^+} x\ln x = 0
$$
:::

La droite $x = 0$ (l’axe des ordonnées) est asymptote verticale à la courbe de $\ln$. Quand $x$ devient grand, $\ln x$ grandit beaucoup moins vite que $x$.

:::exemple
- $\lim_{x \to +\infty} (x + \ln x) = +\infty$ (somme de deux termes qui tendent vers $+\infty$).
- $\lim_{x \to 0^+} (2 + \ln x) = -\infty$.
- $\lim_{x \to +\infty} (x - \ln x) = \lim_{x \to +\infty} x\left(1 - \frac{\ln x}{x}\right) = +\infty$.
:::

## Dérivées

:::propriete
$(\ln x)' = \frac{1}{x}$ pour $x > 0$. Avec les règles de dérivation, on dérive les fonctions qui contiennent $\ln x$.
:::

:::exemple
- $f(x) = 3x + 2\ln x$ : $f'(x) = 3 + \frac{2}{x}$.
- $g(x) = x\ln x$ : $g'(x) = 1 \times \ln x + x \times \frac{1}{x} = \ln x + 1$.
- $h(x) = (\ln x)^2$ : $h'(x) = 2 \times \frac{1}{x} \times \ln x = \frac{2\ln x}{x}$.
:::

## Exemple d’étude : f(x) = x − ln x

Étudions $f(x) = x - \ln x$ sur $]0 ; +\infty[$.

- **Limites** : en $0^+$, $-\ln x \to +\infty$, donc $f(x) \to +\infty$ (asymptote $x = 0$). En $+\infty$, $f(x) \to +\infty$ (voir plus haut).
- **Dérivée** : $f'(x) = 1 - \frac{1}{x} = \frac{x - 1}{x}$, du signe de $x - 1$ puisque $x > 0$.
- **Variations** : $f$ décroît sur $]0 ; 1]$, croît sur $[1 ; +\infty[$, et son minimum est $f(1) = 1$.
- **Conséquence** : $f(x) \geq 1 > 0$, donc $\ln x < x$ pour tout $x > 0$.

:::attention
Avant de calculer une limite ou une dérivée, on vérifie que $x$ est dans $]0 ; +\infty[$ : $\ln x$ n’a pas de sens ailleurs.
:::
