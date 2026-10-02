---
title: Fonctions exponentielles — partie 2 : limites, dérivées et étude
kind: cours
summary: Limites de l’exponentielle en plus et moins l’infini, croissance comparée, dérivée de eˣ et de fonctions simples, étude complète de f(x) = eˣ − x.
position: 20
visibility: public
---

## Limites

:::propriete
$$
\lim_{x \to +\infty} e^x = +\infty \qquad \lim_{x \to -\infty} e^x = 0 \qquad \lim_{x \to +\infty} \frac{e^x}{x} = +\infty \qquad \lim_{x \to -\infty} xe^x = 0
$$
:::

L’axe des abscisses est asymptote horizontale à la courbe de $\exp$ en $-\infty$. En $+\infty$, l’exponentielle grandit plus vite que $x$.

:::exemple
- $\lim_{x \to -\infty} (e^x + 2) = 2$.
- $\lim_{x \to +\infty} (e^x - x) = \lim_{x \to +\infty} x\left(\frac{e^x}{x} - 1\right) = +\infty$.
:::

## Dérivées

:::propriete
$(e^x)' = e^x$ : l’exponentielle est égale à sa dérivée.
:::

:::exemple
- $f(x) = 3e^x - x^2$ : $f'(x) = 3e^x - 2x$.
- $g(x) = xe^x$ : $g'(x) = e^x + xe^x = (1 + x)e^x$.
- $h(x) = \frac{e^x}{x}$ pour $x \neq 0$ : $h'(x) = \frac{e^x \times x - e^x}{x^2} = \frac{(x - 1)e^x}{x^2}$.
:::

Comme $e^x > 0$, le signe d’un produit comme $(1 + x)e^x$ est celui de $1 + x$.

## Exemple d’étude : f(x) = eˣ − x

Étudions $f(x) = e^x - x$ sur $\mathbb{R}$.

- **Limites** : en $+\infty$, $f(x) \to +\infty$ (voir plus haut) ; en $-\infty$, $e^x \to 0$ et $-x \to +\infty$, donc $f(x) \to +\infty$.
- **Dérivée** : $f'(x) = e^x - 1$, négative pour $x < 0$ (car $e^x < 1$) et positive pour $x > 0$.
- **Variations** : $f$ décroît sur $]-\infty ; 0]$, croît sur $[0 ; +\infty[$, de minimum $f(0) = 1$.
- **Conséquence** : $e^x - x \geq 1$, donc $e^x > x$ pour tout réel $x$.

:::attention
Pour le signe de la dérivée, on factorise par $e^x$, toujours positif : il ne reste qu’à étudier le signe de l’autre facteur.
:::
