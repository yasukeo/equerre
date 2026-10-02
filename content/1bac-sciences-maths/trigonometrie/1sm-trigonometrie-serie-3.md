---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets : une expression trigonométrique transformée puis utilisée pour résoudre équation et inéquation, et une valeur exacte obtenue par duplication, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : une expression trigonométrique
Soit $A(x) = \cos 2x - \sqrt{3}\sin 2x$.

1. Écrire $A(x)$ sous la forme $r\cos(2x - \varphi)$.
2. Résoudre dans $\mathbb{R}$ l’équation $A(x) = 1$.
3. Résoudre dans $[0 ; \pi]$ l’inéquation $A(x) \geq 1$.

:::corrige
1. $r = 2$, $\cos\varphi = \frac{1}{2}$, $\sin\varphi = -\frac{\sqrt{3}}{2}$ : $\varphi = -\frac{\pi}{3}$, et $A(x) = 2\cos\left(2x + \frac{\pi}{3}\right)$.
2. $\cos\left(2x + \frac{\pi}{3}\right) = \frac{1}{2}$ : $2x + \frac{\pi}{3} = \pm\frac{\pi}{3} + 2k\pi$, donc $x = k\pi$ ou $x = -\frac{\pi}{3} + k\pi$.
3. Pour $x \in [0 ; \pi]$, $X = 2x + \frac{\pi}{3} \in \left[\frac{\pi}{3} ; \frac{7\pi}{3}\right]$, et il faut $\cos X \geq \frac{1}{2}$ : $X = \frac{\pi}{3}$ ou $X \in \left[\frac{5\pi}{3} ; \frac{7\pi}{3}\right]$. Donc $x = 0$ ou $x \in \left[\frac{2\pi}{3} ; \pi\right]$.
:::
:::

:::exercice Problème 2 : une valeur exacte
1. Montrer que pour tout réel $x$, $\cos 2x = 1 - 2\sin^2 x$, et en déduire $\sin\dfrac{\pi}{8}$.
2. Montrer que $\tan\dfrac{\pi}{8} = \sqrt{2} - 1$ (on pourra utiliser $\tan\frac{\pi}{4} = \frac{2t}{1 - t^2}$ avec $t = \tan\frac{\pi}{8}$).
3. Résoudre dans $\mathbb{R}$ l’équation $\tan x = \sqrt{2} - 1$.

:::corrige
1. $\cos 2x = \cos^2 x - \sin^2 x = 1 - 2\sin^2 x$. Avec $x = \frac{\pi}{8}$ : $\sin^2\frac{\pi}{8} = \frac{1 - \frac{\sqrt{2}}{2}}{2} = \frac{2 - \sqrt{2}}{4}$, et $\sin\frac{\pi}{8} > 0$ : $\sin\frac{\pi}{8} = \frac{\sqrt{2 - \sqrt{2}}}{2}$.
2. $1 = \frac{2t}{1 - t^2}$ donne $t^2 + 2t - 1 = 0$, soit $t = -1 \pm \sqrt{2}$ ; comme $t > 0$ ($\frac{\pi}{8} \in \left]0 ; \frac{\pi}{2}\right[$), $t = \sqrt{2} - 1$.
3. $\tan x = \tan\frac{\pi}{8}$ : $x = \frac{\pi}{8} + k\pi$.
:::
:::
