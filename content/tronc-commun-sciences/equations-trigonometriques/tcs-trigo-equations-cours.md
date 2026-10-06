---
title: Équations trigonométriques — partie 1 : cos x = a, sin x = a, tan x = a
kind: cours
summary: Résoudre cos x = a, sin x = a et tan x = a dans ℝ, puis dans un intervalle, équations du type cos(ax + b) = cos θ, et équations qui se ramènent au second degré.
position: 10
visibility: public
---

## L’équation $\cos x = a$

:::propriete
- Si $a > 1$ ou $a < -1$ : aucune solution.
- Sinon, on cherche un réel $\alpha$ tel que $\cos \alpha = a$, et :

$$
\cos x = \cos \alpha \iff x = \alpha + 2k\pi \;\text{ ou }\; x = -\alpha + 2k\pi \qquad (k \in \mathbb{Z})
$$
:::

:::exemple
$\cos x = \frac{1}{2} = \cos \frac{\pi}{3}$ : $x = \frac{\pi}{3} + 2k\pi$ ou $x = -\frac{\pi}{3} + 2k\pi$. Dans $[0 ; 2\pi[$, les solutions sont $\frac{\pi}{3}$ et $\frac{5\pi}{3}$.
:::

## L’équation $\sin x = a$

:::propriete
Si $-1 \leq a \leq 1$ et $\sin \alpha = a$ :

$$
\sin x = \sin \alpha \iff x = \alpha + 2k\pi \;\text{ ou }\; x = \pi - \alpha + 2k\pi \qquad (k \in \mathbb{Z})
$$
:::

:::exemple
$\sin x = -\frac{\sqrt{2}}{2} = \sin\left(-\frac{\pi}{4}\right)$ : $x = -\frac{\pi}{4} + 2k\pi$ ou $x = \frac{5\pi}{4} + 2k\pi$. Dans $]-\pi ; \pi]$, les solutions sont $-\frac{\pi}{4}$ et $\frac{5\pi}{4} - 2\pi = -\frac{3\pi}{4}$.
:::

## L’équation $\tan x = a$

:::propriete
Pour tout réel $a$, si $\tan \alpha = a$ :

$$
\tan x = \tan \alpha \iff x = \alpha + k\pi \qquad (k \in \mathbb{Z})
$$
:::

:::exemple
$\tan x = \sqrt{3} = \tan \frac{\pi}{3}$ : $x = \frac{\pi}{3} + k\pi$. Dans $[0 ; 2\pi[$ : $\frac{\pi}{3}$ et $\frac{4\pi}{3}$.
:::

## Équations du type $\cos(ax + b) = \cos \theta$

:::exemple
$\cos 2x = \frac{1}{2}$ : $2x = \frac{\pi}{3} + 2k\pi$ ou $2x = -\frac{\pi}{3} + 2k\pi$, donc $x = \frac{\pi}{6} + k\pi$ ou $x = -\frac{\pi}{6} + k\pi$. Dans $[0 ; 2\pi[$ : $\frac{\pi}{6}$, $\frac{7\pi}{6}$, $\frac{5\pi}{6}$ et $\frac{11\pi}{6}$.
:::

:::attention
Après avoir divisé par $2$, la période devient $k\pi$ : il y a deux fois plus de solutions sur un intervalle de longueur $2\pi$.
:::

## Se ramener au second degré

:::exemple
$2\cos^2 x - \cos x - 1 = 0$. On pose $X = \cos x$ : $2X^2 - X - 1 = 0$, $\Delta = 9$, $X = 1$ ou $X = -\frac{1}{2}$. Donc $\cos x = 1$, soit $x = 2k\pi$, ou $\cos x = -\frac{1}{2} = \cos \frac{2\pi}{3}$, soit $x = \pm\frac{2\pi}{3} + 2k\pi$.
:::
