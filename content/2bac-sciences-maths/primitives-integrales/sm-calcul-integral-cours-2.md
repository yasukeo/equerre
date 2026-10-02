---
title: Calcul intégral — partie 2 : intégration par parties, aires et volumes
kind: cours
summary: Intégration par parties, simple et répétée, calcul d’aires sous une courbe et entre deux courbes, conversion en cm², volume d’un solide de révolution, suites d’intégrales.
position: 120
visibility: public
---
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

## Intégrations par parties répétées

:::exemple
$J = \int_0^1 x^2 e^x \, dx$. Avec $u = x^2$, $v' = e^x$ : $J = \big[x^2 e^x\big]_0^1 - 2\int_0^1 xe^x\,dx = e - 2 \times 1 = e - 2$ (en utilisant $\int_0^1 xe^x\,dx = 1$, calculé plus haut).
:::

:::exemple
$\int_0^\pi x\sin x \, dx$ : avec $u = x$ et $v' = \sin x$, $v = -\cos x$ :

$$
\int_0^\pi x\sin x\,dx = \big[-x\cos x\big]_0^\pi + \int_0^\pi \cos x\,dx = \pi + \big[\sin x\big]_0^\pi = \pi
$$
:::

### Choisir u et v′

On choisit pour $u$ la fonction qui se simplifie en la dérivant ($\ln x$, un polynôme) et pour $v'$ celle dont on connaît une primitive ($e^x$, $\sin x$, $\cos x$, $x^n$).

## Suite d’intégrales

:::exemple
Pour $n \in \mathbb{N}$, $I_n = \int_0^1 x^n e^{-x}\,dx$. Une intégration par parties avec $u = x^{n + 1}$ et $v' = e^{-x}$ donne la relation de récurrence

$$
I_{n + 1} = \big[-x^{n + 1}e^{-x}\big]_0^1 + (n + 1)\int_0^1 x^n e^{-x}\,dx = -\frac{1}{e} + (n + 1)I_n
$$

et $I_0 = 1 - \frac{1}{e}$, donc $I_1 = -\frac{1}{e} + 1 - \frac{1}{e} = 1 - \frac{2}{e}$.
:::
