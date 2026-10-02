---
title: Devoir surveillé : calcul intégral
kind: devoir
summary: Un devoir d’une heure sur 20 points : calculs d’intégrales, intégrations par parties et aire d’un domaine en cm², avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice non autorisée.

:::exercice Exercice 1 (7 points) : calculs d’intégrales
Calculer :

1. $\displaystyle \int_0^1 \frac{2x + 1}{x^2 + x + 1} \, dx$ (2,5 pts)
2. $\displaystyle \int_0^{\frac{\pi}{2}} \sin x\cos^2 x \, dx$ (2 pts)
3. $\displaystyle \int_0^1 e^{2x + 1} \, dx$ (2,5 pts)

:::corrige
1. C’est $\frac{u'}{u}$ avec $u(x) = x^2 + x + 1 > 0$ : $\big[\ln\left(x^2 + x + 1\right)\big]_0^1 = \ln 3$.
2. $\left[-\frac{\cos^3 x}{3}\right]_0^{\frac{\pi}{2}} = \frac{1}{3}$.
3. $\left[\frac{1}{2}e^{2x + 1}\right]_0^1 = \frac{e^3 - e}{2}$.
:::
:::

:::exercice Exercice 2 (6 points) : intégration par parties
Calculer :

1. $\displaystyle \int_0^1 xe^{-x} \, dx$ (3 pts)
2. $\displaystyle \int_1^e x^2\ln x \, dx$ (3 pts)

:::corrige
1. $u = x$, $v' = e^{-x}$ : $\big[-xe^{-x}\big]_0^1 + \int_0^1 e^{-x}\,dx = -\frac{1}{e} + 1 - \frac{1}{e} = 1 - \frac{2}{e}$.
2. $u = \ln x$, $v' = x^2$, $v = \frac{x^3}{3}$ : $\left[\frac{x^3}{3}\ln x\right]_1^e - \int_1^e \frac{x^2}{3}\,dx = \frac{e^3}{3} - \frac{e^3 - 1}{9} = \frac{2e^3 + 1}{9}$.
:::
:::

:::exercice Exercice 3 (7 points) : aire
Soit $f(x) = x^2 - 2x$, et $(C)$ sa courbe dans un repère orthonormé d’unité $2$ cm.

1. Étudier le signe de $f(x)$ sur $[0 ; 3]$. (2 pts)
2. Calculer l’aire, en unités d’aire puis en cm², du domaine limité par $(C)$, l’axe des abscisses et les droites $x = 0$ et $x = 3$. (5 pts)

:::corrige
1. $f(x) = x(x - 2)$ : $f(x) \leq 0$ sur $[0 ; 2]$ et $f(x) \geq 0$ sur $[2 ; 3]$.
2. $\mathcal{A} = \int_0^2 \left(2x - x^2\right)dx + \int_2^3 \left(x^2 - 2x\right)dx = \left[x^2 - \frac{x^3}{3}\right]_0^2 + \left[\frac{x^3}{3} - x^2\right]_2^3 = \frac{4}{3} + \left(0 + \frac{4}{3}\right) = \frac{8}{3}$ unités d’aire, soit $\frac{8}{3} \times 4 = \frac{32}{3}$ cm².
:::
:::
