---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : une équation et une inéquation du second degré en cos x, puis une équation avec sinus et cosinus ramenée à une équation en tangente, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un trinôme en cos x
On pose $P(x) = 2\cos^2 x + \cos x - 1$.

1. Factoriser $2X^2 + X - 1$.
2. Résoudre $P(x) = 0$ dans $]-\pi ; \pi]$.
3. Étudier le signe de $2\cos x - 1$ et de $\cos x + 1$ sur $]-\pi ; \pi]$.
4. En déduire les solutions de $P(x) \geq 0$ sur $]-\pi ; \pi]$.

:::corrige
1. $\Delta = 1 + 8 = 9$, racines $\frac{1}{2}$ et $-1$ : $2X^2 + X - 1 = (2X - 1)(X + 1)$.
2. $P(x) = (2\cos x - 1)(\cos x + 1)$. $\cos x = \frac{1}{2}$ donne $\pm\frac{\pi}{3}$ ; $\cos x = -1$ donne $\pi$. $S = \left\{-\frac{\pi}{3} ; \frac{\pi}{3} ; \pi\right\}$.
3. $2\cos x - 1 \geq 0 \iff x \in \left[-\frac{\pi}{3} ; \frac{\pi}{3}\right]$. Et $\cos x + 1 \geq 0$ toujours, nul seulement en $\pi$.
4. Le signe de $P(x)$ est celui de $2\cos x - 1$, sauf en $\pi$ où $P$ s’annule : $S = \left[-\frac{\pi}{3} ; \frac{\pi}{3}\right] \cup \{\pi\}$.
:::
:::

:::exercice Problème 2 : sinus égal à cosinus
On veut résoudre $(E) : \sin x = \sqrt{3}\cos x$ sur $[0 ; 2\pi[$.

1. Montrer qu’une solution de $(E)$ ne peut pas vérifier $\cos x = 0$.
2. En déduire que $(E)$ équivaut à $\tan x = \sqrt{3}$, puis la résoudre.
3. Résoudre de même $\sin x = \cos x$ sur $[0 ; 2\pi[$, et en déduire les points du cercle trigonométrique d’abscisse égale à l’ordonnée.

:::corrige
1. Si $\cos x = 0$, l’équation donne $\sin x = 0$ ; or $\cos^2 x + \sin^2 x = 1$, c’est impossible.
2. On peut donc diviser par $\cos x$ : $(E) \iff \tan x = \sqrt{3} \iff x = \frac{\pi}{3} + k\pi$. Sur $[0 ; 2\pi[$ : $\frac{\pi}{3}$ et $\frac{4\pi}{3}$.
3. $\tan x = 1 \iff x = \frac{\pi}{4} + k\pi$ : $\frac{\pi}{4}$ et $\frac{5\pi}{4}$. Ce sont les points $\left(\frac{\sqrt{2}}{2} ; \frac{\sqrt{2}}{2}\right)$ et $\left(-\frac{\sqrt{2}}{2} ; -\frac{\sqrt{2}}{2}\right)$, sur la droite $y = x$.
:::
:::
