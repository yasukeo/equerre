---
title: Calcul trigonométrique — partie 2 : équations et inéquations
kind: cours
summary: Équations cos x = cos a, sin x = sin a, tan x = tan a, équations du type a cos x + b sin x = c, équations qui se ramènent au second degré, inéquations résolues sur le cercle trigonométrique.
position: 20
visibility: public
---

## Équations fondamentales

:::propriete
Pour tout réel $a$ (et $k$ entier relatif) :

- $\cos x = \cos a \iff x = a + 2k\pi$ ou $x = -a + 2k\pi$ ;
- $\sin x = \sin a \iff x = a + 2k\pi$ ou $x = \pi - a + 2k\pi$ ;
- $\tan x = \tan a \iff x = a + k\pi$ (pour $x$ et $a$ différents de $\frac{\pi}{2} + k\pi$).
:::

:::exemple
$\cos x = \frac{1}{2} = \cos\frac{\pi}{3}$ : $x = \frac{\pi}{3} + 2k\pi$ ou $x = -\frac{\pi}{3} + 2k\pi$. Dans $[0 ; 2\pi[$ : $S = \left\{\frac{\pi}{3} ; \frac{5\pi}{3}\right\}$.
:::

:::exemple
$\sin 2x = \sin\frac{\pi}{6}$ : $2x = \frac{\pi}{6} + 2k\pi$ ou $2x = \frac{5\pi}{6} + 2k\pi$, donc $x = \frac{\pi}{12} + k\pi$ ou $x = \frac{5\pi}{12} + k\pi$.
:::

:::attention
On divise **aussi** la période : $2x = \frac{\pi}{6} + 2k\pi$ donne $x = \frac{\pi}{12} + k\pi$, et non $+ 2k\pi$.
:::

## Équations a cos x + b sin x = c

On transforme le membre de gauche en $r\cos(x - \varphi)$, puis on résout $\cos(x - \varphi) = \frac{c}{r}$ (solutions seulement si $|c| \leq r$).

:::exemple
$\cos x + \sqrt{3}\sin x = 1$ : $2\cos\left(x - \frac{\pi}{3}\right) = 1$, donc $\cos\left(x - \frac{\pi}{3}\right) = \cos\frac{\pi}{3}$ : $x - \frac{\pi}{3} = \pm\frac{\pi}{3} + 2k\pi$, soit $x = \frac{2\pi}{3} + 2k\pi$ ou $x = 2k\pi$.
:::

## Équations du second degré en cos ou sin

:::exemple
$2\cos^2 x - \cos x - 1 = 0$ : avec $X = \cos x$, $2X^2 - X - 1 = 0$ donne $X = 1$ ou $X = -\frac{1}{2}$. Donc $\cos x = 1$, soit $x = 2k\pi$, ou $\cos x = -\frac{1}{2}$, soit $x = \pm\frac{2\pi}{3} + 2k\pi$.
:::

:::exemple
$\cos 2x + \sin x = 0$ : avec $\cos 2x = 1 - 2\sin^2 x$, on obtient $-2\sin^2 x + \sin x + 1 = 0$, soit $\sin x = 1$ ou $\sin x = -\frac{1}{2}$.
:::

## Inéquations

On résout l’équation associée, puis on lit les solutions sur le **cercle trigonométrique** : pour $\cos x \geq k$, on garde les points du cercle d’abscisse au moins $k$ ; pour $\sin x \geq k$, ceux d’ordonnée au moins $k$.

:::exemple
Dans $[-\pi ; \pi]$, $\cos x \geq \frac{1}{2}$ : les points d’abscisse au moins $\frac{1}{2}$ forment l’arc de $-\frac{\pi}{3}$ à $\frac{\pi}{3}$ : $S = \left[-\frac{\pi}{3} ; \frac{\pi}{3}\right]$.
:::

:::exemple
Dans $[0 ; 2\pi[$, $\sin x < -\frac{\sqrt{2}}{2}$ : arc des points d’ordonnée inférieure à $-\frac{\sqrt{2}}{2}$, soit $S = \left]\frac{5\pi}{4} ; \frac{7\pi}{4}\right[$.
:::
