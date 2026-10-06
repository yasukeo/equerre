---
title: Trigonométrie — partie 2 : cosinus, sinus, tangente et formules
kind: cours
summary: Cosinus, sinus et tangente d’un réel, relations fondamentales, valeurs remarquables, angles associés, et calculs ou simplifications d’expressions trigonométriques.
position: 20
visibility: public
---

## Cosinus, sinus, tangente

:::definition
Soit $M$ le point du cercle trigonométrique d’abscisse curviligne $x$. Le **cosinus** de $x$ est l’abscisse de $M$, et le **sinus** de $x$ est son ordonnée : $M(\cos x ; \sin x)$. Pour $x \neq \frac{\pi}{2} + k\pi$, la **tangente** de $x$ est $\tan x = \frac{\sin x}{\cos x}$.
:::

:::propriete
Pour tout réel $x$ et tout entier $k$ :

- $-1 \leq \cos x \leq 1$ et $-1 \leq \sin x \leq 1$ ;
- $\cos^2 x + \sin^2 x = 1$ ;
- $\cos(x + 2k\pi) = \cos x$ et $\sin(x + 2k\pi) = \sin x$ ;
- $1 + \tan^2 x = \frac{1}{\cos^2 x}$ (là où $\tan x$ existe).
:::

## Valeurs remarquables

:::propriete
- $\cos 0 = 1$ et $\sin 0 = 0$.
- $\cos \frac{\pi}{6} = \frac{\sqrt{3}}{2}$, $\sin \frac{\pi}{6} = \frac{1}{2}$, $\tan \frac{\pi}{6} = \frac{\sqrt{3}}{3}$.
- $\cos \frac{\pi}{4} = \sin \frac{\pi}{4} = \frac{\sqrt{2}}{2}$, $\tan \frac{\pi}{4} = 1$.
- $\cos \frac{\pi}{3} = \frac{1}{2}$, $\sin \frac{\pi}{3} = \frac{\sqrt{3}}{2}$, $\tan \frac{\pi}{3} = \sqrt{3}$.
- $\cos \frac{\pi}{2} = 0$ et $\sin \frac{\pi}{2} = 1$ ; $\cos \pi = -1$ et $\sin \pi = 0$.
:::

## Angles associés

:::propriete
- $\cos(-x) = \cos x$ et $\sin(-x) = -\sin x$ ;
- $\cos(\pi - x) = -\cos x$ et $\sin(\pi - x) = \sin x$ ;
- $\cos(\pi + x) = -\cos x$ et $\sin(\pi + x) = -\sin x$ ;
- $\cos\left(\frac{\pi}{2} - x\right) = \sin x$ et $\sin\left(\frac{\pi}{2} - x\right) = \cos x$ ;
- $\cos\left(\frac{\pi}{2} + x\right) = -\sin x$ et $\sin\left(\frac{\pi}{2} + x\right) = \cos x$.
:::

Ces formules se lisent sur le cercle : $-x$ est le symétrique par rapport à l’axe des abscisses, $\pi - x$ par rapport à l’axe des ordonnées, $\pi + x$ par rapport à l’origine.

:::exemple
- $\cos \frac{5\pi}{6} = \cos\left(\pi - \frac{\pi}{6}\right) = -\frac{\sqrt{3}}{2}$.
- $\sin \frac{7\pi}{6} = \sin\left(\pi + \frac{\pi}{6}\right) = -\frac{1}{2}$.
- $\tan \frac{2\pi}{3} = \frac{\sin \frac{2\pi}{3}}{\cos \frac{2\pi}{3}} = \frac{\frac{\sqrt{3}}{2}}{-\frac{1}{2}} = -\sqrt{3}$.
:::

## Calculer et simplifier

:::exemple
On sait que $\sin x = \frac{3}{5}$ et $x \in \left[\frac{\pi}{2} ; \pi\right]$. Alors $\cos^2 x = 1 - \frac{9}{25} = \frac{16}{25}$, et $\cos x \leq 0$ sur cet intervalle : $\cos x = -\frac{4}{5}$, puis $\tan x = -\frac{3}{4}$.
:::

:::exemple
$A = \cos(\pi - x) + \sin\left(\frac{\pi}{2} - x\right) + \cos(\pi + x) + \cos(-x) = -\cos x + \cos x - \cos x + \cos x = 0$.
:::

:::attention
Après $\cos^2 x = \ldots$, le signe de $\cos x$ se décide avec l’intervalle où se trouve $x$ : on ne garde qu’une des deux racines.
:::
