---
title: Équations différentielles — partie 1 : premier ordre
kind: cours
summary: Notion d’équation différentielle, équations y′ = ay et y′ = ay + b, solution vérifiant une condition initiale, équation avec une solution particulière donnée, applications en physique.
position: 10
visibility: public
---

## Qu’est-ce qu’une équation différentielle ?

Une **équation différentielle** relie une fonction inconnue $y$ de la variable $x$ à ses dérivées. **Résoudre** l’équation sur $\mathbb{R}$, c’est trouver toutes les fonctions dérivables (deux fois si $y''$ apparaît) qui la vérifient pour tout réel $x$.

## L’équation y′ = ay + b

:::theoreme
Soit $a$ un réel non nul. Les solutions sur $\mathbb{R}$ de l’équation $y' = ay$ sont les fonctions :

$$
x \mapsto C e^{ax}, \qquad C \in \mathbb{R}
$$
:::

:::theoreme
Soient $a$ et $b$ deux réels, $a \neq 0$. Les solutions sur $\mathbb{R}$ de l’équation $y' = ay + b$ sont les fonctions :

$$
x \mapsto C e^{ax} - \frac{b}{a}, \qquad C \in \mathbb{R}
$$

Pour tous réels $x_0$ et $y_0$, il existe une **unique** solution qui vérifie $y(x_0) = y_0$.
:::

:::exemple
Résoudre $y' = -2y + 6$ avec $y(0) = 1$. Les solutions sont $y(x) = C e^{-2x} + 3$, car $-\frac{b}{a} = -\frac{6}{-2} = 3$. La condition $y(0) = C + 3 = 1$ donne $C = -2$, donc $y(x) = 3 - 2e^{-2x}$.
:::

:::attention
Mettez d’abord l’équation sous la forme $y' = ay + b$ : $2y' + y = 4$ s’écrit $y' = -\frac{1}{2} y + 2$, donc $a = -\frac{1}{2}$ et $b = 2$.
:::

## Une solution particulière donnée

Il arrive qu’un énoncé donne une équation $(E) : y' = ay + g(x)$, où $g$ n’est pas constante, avec une solution particulière $u$. On s’y ramène à l’équation sans second membre.

:::propriete
Si $u$ est une solution de $(E) : y' = ay + g(x)$, alors $y$ est solution de $(E)$ si et seulement si $y - u$ est solution de $y' = ay$. Les solutions de $(E)$ sont donc les fonctions $x \mapsto Ce^{ax} + u(x)$.
:::

:::exemple
$(E) : y' + y = 2e^{-x}$. La fonction $u(x) = 2xe^{-x}$ est solution : $u'(x) = 2e^{-x} - 2xe^{-x}$, donc $u' + u = 2e^{-x}$. Les solutions de $(E)$ sont $y(x) = Ce^{-x} + 2xe^{-x} = (2x + C)e^{-x}$.
:::

## En physique et en chimie

:::exemple
**Refroidissement.** La température $T$ (en °C) d’un liquide dans une pièce à $20$ °C vérifie $T' = -0{,}2(T - 20)$, soit $T' = -0{,}2\,T + 4$, le temps $t$ étant en minutes. Avec $T(0) = 90$ : $T(t) = 20 + 70e^{-0{,}2t}$. Le liquide atteint $40$ °C quand $70e^{-0{,}2t} = 20$, soit $t = 5\ln 3{,}5 \approx 6{,}3$ minutes.
:::
