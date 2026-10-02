---
title: Série 1 — partie 1 : premier ordre
kind: serie
summary: Équations y′ = ay + b, conditions initiales, solution particulière donnée, refroidissement, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Premier ordre
Résoudre l’équation $y' + 3y = 6$, puis déterminer la solution $f$ telle que $f(0) = 0$.

:::corrige
L’équation s’écrit $y' = -3y + 6$ ($a = -3$, $b = 6$). Ses solutions sont $y(x) = C e^{-3x} + 2$, car $-\frac{b}{a} = 2$. $f(0) = C + 2 = 0$ donne $C = -2$, donc $f(x) = 2 - 2e^{-3x}$.
:::
:::

:::exercice Mettre sous la forme y′ = ay + b
Résoudre chaque équation, puis donner la solution qui vérifie la condition indiquée.

1. $2y' - y = 3$, avec $y(0) = 1$.
2. $y' = 5 - y$, avec $y(1) = 5 + e^{-1}$.
3. $3y' + 6y = 0$, avec $y(0) = -2$.

:::corrige
1. $y' = \frac{1}{2}y + \frac{3}{2}$ : $y(x) = Ce^{\frac{x}{2}} - 3$. $y(0) = C - 3 = 1$, donc $y(x) = 4e^{\frac{x}{2}} - 3$.
2. $y' = -y + 5$ : $y(x) = Ce^{-x} + 5$. $y(1) = Ce^{-1} + 5 = 5 + e^{-1}$, donc $C = 1$ et $y(x) = e^{-x} + 5$.
3. $y' = -2y$ : $y(x) = Ce^{-2x}$, et $C = -2$ : $y(x) = -2e^{-2x}$.
:::
:::

:::exercice Une solution particulière donnée
On considère l’équation $(E) : y' - 2y = -4x$.

1. Déterminer les réels $a$ et $b$ tels que $u(x) = ax + b$ soit une solution de $(E)$.
2. Montrer que $y$ est solution de $(E)$ si et seulement si $y - u$ est solution de $y' - 2y = 0$.
3. En déduire les solutions de $(E)$, puis celle qui vaut $3$ en $0$.

:::corrige
1. $u'(x) - 2u(x) = a - 2ax - 2b$. Il faut $-2a = -4$ et $a - 2b = 0$, donc $a = 2$ et $b = 1$ : $u(x) = 2x + 1$.
2. $(y - u)' - 2(y - u) = (y' - 2y) - (u' - 2u) = (y' - 2y) + 4x$ : c’est nul si et seulement si $y' - 2y = -4x$.
3. $y - u = Ce^{2x}$, donc $y(x) = Ce^{2x} + 2x + 1$. $y(0) = C + 1 = 3$ donne $y(x) = 2e^{2x} + 2x + 1$.
:::
:::

:::exercice Refroidissement
Un café à $80$ °C est posé dans une pièce à $20$ °C. Sa température $\theta(t)$, en °C, $t$ minutes plus tard, vérifie $\theta' = -0{,}1\left(\theta - 20\right)$.

1. Résoudre cette équation et donner $\theta(t)$.
2. Au bout de combien de temps le café sera-t-il à $50$ °C ?
3. Calculer $\lim_{t \to +\infty} \theta(t)$ et interpréter.

:::corrige
1. $\theta' = -0{,}1\,\theta + 2$ : $\theta(t) = Ce^{-0{,}1t} + 20$, et $\theta(0) = 80$ donne $C = 60$ : $\theta(t) = 20 + 60e^{-0{,}1t}$.
2. $60e^{-0{,}1t} = 30 \iff e^{-0{,}1t} = \frac{1}{2} \iff t = 10\ln 2 \approx 6{,}9$ minutes.
3. $\lim \theta(t) = 20$ : le café finit à la température de la pièce.
:::
:::
