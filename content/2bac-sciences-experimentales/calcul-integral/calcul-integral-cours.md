---
title: Calcul intégral
kind: cours
summary: Intégrale d’une fonction continue, propriétés, intégration par parties, calcul d’aires et de volumes, valeur moyenne.
position: 20
visibility: public
---

## Intégrale d’une fonction continue

:::definition
Soit $f$ une fonction continue sur un intervalle $I$, $F$ une primitive de $f$ sur $I$, et $a$, $b$ deux éléments de $I$. L’**intégrale** de $f$ de $a$ à $b$ est le réel :

$$
\int_a^b f(x) \, dx = \big[F(x)\big]_a^b = F(b) - F(a)
$$

Ce réel ne dépend pas de la primitive choisie.
:::

:::exemple
$\int_0^1 (3x^2 + 1) \, dx = \big[x^3 + x\big]_0^1 = 2$ et $\int_0^{\frac{\pi}{2}} \cos x \, dx = \big[\sin x\big]_0^{\frac{\pi}{2}} = 1$.
:::

:::propriete
Si $f$ est continue sur $I$ et $a \in I$, la fonction $x \mapsto \int_a^x f(t) \, dt$ est la primitive de $f$ sur $I$ qui s’annule en $a$.
:::

## Propriétés

:::propriete
Pour $f$ et $g$ continues sur $I$, $a$, $b$, $c$ dans $I$ et $\alpha$, $\beta$ réels :

- $\int_a^a f(x)\,dx = 0$ et $\int_b^a f(x)\,dx = -\int_a^b f(x)\,dx$ ;
- **Chasles** : $\int_a^c f(x)\,dx = \int_a^b f(x)\,dx + \int_b^c f(x)\,dx$ ;
- **Linéarité** : $\int_a^b \left(\alpha f(x) + \beta g(x)\right)dx = \alpha\int_a^b f(x)\,dx + \beta\int_a^b g(x)\,dx$.
:::

:::propriete
Soit $a \leq b$.

- **Positivité** : si $f \geq 0$ sur $[a ; b]$, alors $\int_a^b f(x)\,dx \geq 0$.
- **Ordre** : si $f \leq g$ sur $[a ; b]$, alors $\int_a^b f(x)\,dx \leq \int_a^b g(x)\,dx$.
- Si $m \leq f \leq M$ sur $[a ; b]$, alors $m(b - a) \leq \int_a^b f(x)\,dx \leq M(b - a)$.
:::

:::definition
La **valeur moyenne** de $f$ sur $[a ; b]$ ($a < b$) est $\mu = \frac{1}{b - a}\int_a^b f(x)\,dx$.
:::

## Intégration par parties

:::theoreme
Si $u$ et $v$ sont dérivables sur $I$ et $u'$, $v'$ continues sur $I$, alors pour $a$, $b$ dans $I$ :

$$
\int_a^b u(x) v'(x) \, dx = \big[u(x) v(x)\big]_a^b - \int_a^b u'(x) v(x) \, dx
$$
:::

:::exemple
$\int_0^1 x e^x \, dx$ : avec $u(x) = x$ et $v'(x) = e^x$, soit $u'(x) = 1$ et $v(x) = e^x$ :

$$
\int_0^1 x e^x \, dx = \big[x e^x\big]_0^1 - \int_0^1 e^x \, dx = e - (e - 1) = 1
$$
:::

:::exemple
$\int_1^e \ln x \, dx$ : avec $u(x) = \ln x$ et $v'(x) = 1$, soit $u'(x) = \frac{1}{x}$ et $v(x) = x$ :

$$
\int_1^e \ln x \, dx = \big[x \ln x\big]_1^e - \int_1^e 1 \, dx = e - (e - 1) = 1
$$
:::

## Calcul d’aires

Le plan est muni d’un repère orthogonal ; l’**unité d’aire** est l’aire du rectangle construit sur les vecteurs unitaires.

:::propriete
Soit $f$ continue sur $[a ; b]$, $a < b$. L’aire, en unités d’aire, du domaine limité par la courbe de $f$, l’axe des abscisses et les droites $x = a$ et $x = b$ est :

$$
\mathcal{A} = \int_a^b |f(x)| \, dx
$$

Si $f$ et $g$ sont continues sur $[a ; b]$, l’aire du domaine compris entre leurs courbes et les droites $x = a$, $x = b$ est $\int_a^b |f(x) - g(x)| \, dx$.
:::

:::exemple
Aire entre la courbe de $f(x) = x^2$ et la droite $y = x$ sur $[0 ; 1]$, où $x^2 \leq x$ : $\int_0^1 (x - x^2)\,dx = \frac{1}{2} - \frac{1}{3} = \frac{1}{6}$ unité d’aire.
:::

:::attention
Si l’unité graphique est de $2$ cm sur chaque axe, une unité d’aire vaut $4 \text{ cm}^2$ : il faut convertir le résultat.
:::

## Calcul de volumes

:::propriete
Dans un repère orthonormé, le solide engendré par la rotation autour de l’axe des abscisses de la courbe de $f$ continue sur $[a ; b]$ a pour volume, en unités de volume :

$$
V = \int_a^b \pi \left(f(x)\right)^2 dx
$$
:::

:::exemple
En faisant tourner la courbe de $f(x) = \sqrt{x}$ sur $[0 ; 1]$, on obtient $V = \int_0^1 \pi x \, dx = \frac{\pi}{2}$ unité de volume.
:::
