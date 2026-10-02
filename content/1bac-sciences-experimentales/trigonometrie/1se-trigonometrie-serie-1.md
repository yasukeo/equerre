---
title: Série 1 — partie 1 : formules
kind: serie
summary: Calculer avec les formules d’addition et de duplication, simplifier des expressions, démontrer des identités, transformer a cos x + b sin x, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Valeurs exactes
Calculer $\cos\dfrac{7\pi}{12}$ et $\sin\dfrac{7\pi}{12}$ en écrivant $\dfrac{7\pi}{12} = \dfrac{\pi}{3} + \dfrac{\pi}{4}$.

:::corrige
$\cos\frac{7\pi}{12} = \frac{1}{2} \times \frac{\sqrt{2}}{2} - \frac{\sqrt{3}}{2} \times \frac{\sqrt{2}}{2} = \frac{\sqrt{2} - \sqrt{6}}{4}$ et $\sin\frac{7\pi}{12} = \frac{\sqrt{3}}{2} \times \frac{\sqrt{2}}{2} + \frac{1}{2} \times \frac{\sqrt{2}}{2} = \frac{\sqrt{6} + \sqrt{2}}{4}$.
:::
:::

:::exercice Duplication
On sait que $\cos a = \frac{3}{5}$ avec $a \in \left]0 ; \frac{\pi}{2}\right[$.

1. Calculer $\sin a$.
2. Calculer $\cos 2a$, $\sin 2a$ et $\tan 2a$.

:::corrige
1. $\sin^2 a = 1 - \frac{9}{25} = \frac{16}{25}$, et $\sin a > 0$ : $\sin a = \frac{4}{5}$.
2. $\cos 2a = 2 \times \frac{9}{25} - 1 = -\frac{7}{25}$, $\sin 2a = 2 \times \frac{4}{5} \times \frac{3}{5} = \frac{24}{25}$, $\tan 2a = -\frac{24}{7}$.
:::
:::

:::exercice Identités
Montrer que pour tout réel $x$ :

1. $(\cos x + \sin x)^2 = 1 + \sin 2x$ ;
2. $\cos^4 x - \sin^4 x = \cos 2x$ ;
3. $\cos x + \cos\left(x + \dfrac{2\pi}{3}\right) + \cos\left(x + \dfrac{4\pi}{3}\right) = 0$.

:::corrige
1. $\cos^2 x + 2\sin x\cos x + \sin^2 x = 1 + \sin 2x$.
2. $(\cos^2 x - \sin^2 x)(\cos^2 x + \sin^2 x) = \cos 2x \times 1$.
3. $\cos\left(x + \frac{2\pi}{3}\right) = -\frac{1}{2}\cos x - \frac{\sqrt{3}}{2}\sin x$ et $\cos\left(x + \frac{4\pi}{3}\right) = -\frac{1}{2}\cos x + \frac{\sqrt{3}}{2}\sin x$ : la somme vaut $\cos x - \cos x = 0$.
:::
:::

:::exercice Transformer a cos x + b sin x
Écrire sous la forme $r\cos(x - \varphi)$ :

1. $\sqrt{3}\cos x + \sin x$
2. $\cos x - \sin x$

:::corrige
1. $r = 2$, $\cos\varphi = \frac{\sqrt{3}}{2}$, $\sin\varphi = \frac{1}{2}$ : $\varphi = \frac{\pi}{6}$ et $2\cos\left(x - \frac{\pi}{6}\right)$.
2. $r = \sqrt{2}$, $\cos\varphi = \frac{\sqrt{2}}{2}$, $\sin\varphi = -\frac{\sqrt{2}}{2}$ : $\varphi = -\frac{\pi}{4}$ et $\sqrt{2}\cos\left(x + \frac{\pi}{4}\right)$.
:::
:::
