---
title: Devoir surveillé : fonctions primitives
kind: devoir
summary: Un devoir d’une heure sur 20 points : calculs de primitives, primitive avec une condition et primitive de forme imposée, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice non autorisée.

:::exercice Exercice 1 (8 points) : calculs de primitives
Déterminer une primitive de chaque fonction sur l’intervalle indiqué.

1. $f_1(x) = 3x^2 - \dfrac{2}{x^3} + 1$ sur $]0 ; +\infty[$ (2 pts)
2. $f_2(x) = \dfrac{x + 1}{\left(x^2 + 2x + 3\right)^2}$ sur $\mathbb{R}$ (2 pts)
3. $f_3(x) = \dfrac{\cos x}{\sqrt{\sin x + 2}}$ sur $\mathbb{R}$ (2 pts)
4. $f_4(x) = \sin(2x)\cos^2(2x)$ sur $\mathbb{R}$ (2 pts)

:::corrige
1. $F_1(x) = x^3 + \frac{1}{x^2} + x$.
2. Avec $u(x) = x^2 + 2x + 3$ (toujours $> 0$, discriminant négatif), $u'(x) = 2(x + 1)$ et $f_2 = \frac{1}{2} \times \frac{u'}{u^2}$ : $F_2(x) = -\frac{1}{2\left(x^2 + 2x + 3\right)}$.
3. Avec $u(x) = \sin x + 2 > 0$, $f_3 = \frac{u'}{\sqrt{u}}$ : $F_3(x) = 2\sqrt{\sin x + 2}$.
4. Avec $u(x) = \cos(2x)$, $u'(x) = -2\sin(2x)$ et $f_4 = -\frac{1}{2}u'u^2$ : $F_4(x) = -\frac{1}{6}\cos^3(2x)$.
:::
:::

:::exercice Exercice 2 (5 points) : primitive avec une condition
Soit $f(x) = 6x\left(x^2 - 1\right)^2$.

1. Déterminer les primitives de $f$ sur $\mathbb{R}$. (3 pts)
2. En déduire celle qui vaut $2$ en $1$. (2 pts)

:::corrige
1. Avec $u(x) = x^2 - 1$, $u'(x) = 2x$ et $f = 3u'u^2$ : les primitives sont $\left(x^2 - 1\right)^3 + c$.
2. $F(1) = 0 + c = 2$ : $F(x) = \left(x^2 - 1\right)^3 + 2$.
:::
:::

:::exercice Exercice 3 (7 points) : primitive de forme imposée
Soit $f(x) = \dfrac{x}{\sqrt{x + 1}}$ sur $]-1 ; +\infty[$, et $F(x) = (ax + b)\sqrt{x + 1}$.

1. Calculer $F'(x)$. (2 pts)
2. Déterminer $a$ et $b$ pour que $F$ soit une primitive de $f$. (3 pts)
3. Déterminer la primitive de $f$ qui s’annule en $0$. (2 pts)

:::corrige
1. $F'(x) = a\sqrt{x + 1} + \frac{ax + b}{2\sqrt{x + 1}} = \frac{3ax + 2a + b}{2\sqrt{x + 1}}$.
2. On identifie : $\frac{3a}{2} = 1$ et $\frac{2a + b}{2} = 0$, donc $a = \frac{2}{3}$ et $b = -\frac{4}{3}$.
3. $F(0) = -\frac{4}{3}$, donc la primitive cherchée est $x \mapsto \frac{2}{3}(x - 2)\sqrt{x + 1} + \frac{4}{3}$.
:::
:::
