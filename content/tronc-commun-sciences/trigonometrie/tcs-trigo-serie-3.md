---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : une expression trigonométrique simplifiée, évaluée et encadrée, puis tous les rapports trigonométriques d’un réel déduits de sa tangente, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : simplifier, évaluer, encadrer
Pour tout réel $x$, on pose $A(x) = \cos^2(\pi - x) + \cos^2\left(\frac{\pi}{2} - x\right) + \sin(\pi + x) + \sin(-x)$.

1. Montrer que $A(x) = 1 - 2\sin x$.
2. Calculer $A\left(\frac{\pi}{6}\right)$, $A\left(-\frac{\pi}{2}\right)$ et $A\left(\frac{7\pi}{6}\right)$.
3. Montrer que $-1 \leq A(x) \leq 3$ pour tout réel $x$.
4. En lisant le cercle trigonométrique, trouver les réels $x$ de $[0 ; 2\pi[$ tels que $A(x) = 0$.

:::corrige
1. $\cos^2(\pi - x) = (-\cos x)^2 = \cos^2 x$ ; $\cos^2\left(\frac{\pi}{2} - x\right) = \sin^2 x$ ; $\sin(\pi + x) = -\sin x$ ; $\sin(-x) = -\sin x$. Donc $A(x) = \cos^2 x + \sin^2 x - 2\sin x = 1 - 2\sin x$.
2. $A\left(\frac{\pi}{6}\right) = 1 - 1 = 0$ ; $A\left(-\frac{\pi}{2}\right) = 1 + 2 = 3$ ; $A\left(\frac{7\pi}{6}\right) = 1 - 2 \times \left(-\frac{1}{2}\right) = 2$.
3. $-1 \leq \sin x \leq 1$, donc $-2 \leq -2\sin x \leq 2$ et $-1 \leq 1 - 2\sin x \leq 3$.
4. $A(x) = 0 \iff \sin x = \frac{1}{2}$. Sur le cercle, deux points ont pour ordonnée $\frac{1}{2}$ : ceux d’abscisses curvilignes $\frac{\pi}{6}$ et $\pi - \frac{\pi}{6} = \frac{5\pi}{6}$.
:::
:::

:::exercice Problème 2 : à partir de la tangente
Soit $x \in \left]\frac{\pi}{2} ; \pi\right[$ tel que $\tan x = -2\sqrt{2}$.

1. Calculer $\cos x$, puis $\sin x$.
2. En déduire $\cos(\pi - x)$, $\sin(\pi + x)$ et $\cos\left(\frac{\pi}{2} - x\right)$.
3. Calculer $E = (\sin x + \cos x)^2$.

:::corrige
1. $\frac{1}{\cos^2 x} = 1 + \tan^2 x = 9$, donc $\cos^2 x = \frac{1}{9}$. Sur $\left]\frac{\pi}{2} ; \pi\right[$, $\cos x < 0$ : $\cos x = -\frac{1}{3}$. Puis $\sin x = \tan x \cos x = \frac{2\sqrt{2}}{3}$, positif comme attendu.
2. $\cos(\pi - x) = \frac{1}{3}$ ; $\sin(\pi + x) = -\frac{2\sqrt{2}}{3}$ ; $\cos\left(\frac{\pi}{2} - x\right) = \sin x = \frac{2\sqrt{2}}{3}$.
3. $E = \sin^2 x + \cos^2 x + 2\sin x\cos x = 1 + 2 \times \frac{2\sqrt{2}}{3} \times \left(-\frac{1}{3}\right) = 1 - \frac{4\sqrt{2}}{9}$.
:::
:::
