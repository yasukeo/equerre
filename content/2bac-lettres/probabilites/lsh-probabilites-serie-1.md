---
title: Série 1 — partie 1 : dénombrement
kind: serie
summary: Principe du produit, codes et podiums, choix simultanés, factorielles et rangements, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Principe du produit
1. Un code est formé d’une lettre (parmi $26$) suivie de deux chiffres. Combien y a-t-il de codes ?
2. Combien de nombres de trois chiffres peut-on écrire avec les chiffres $1$, $2$, $3$, $4$, $5$ (répétitions permises) ?

:::corrige
1. $26 \times 10 \times 10 = 2\,600$.
2. $5^3 = 125$.
:::
:::

:::exercice Avec ou sans ordre ?
Une classe compte $20$ élèves.

1. De combien de façons peut-on choisir un délégué et un suppléant ?
2. De combien de façons peut-on choisir $3$ élèves pour représenter la classe ?

:::corrige
1. L’ordre compte (deux rôles différents) : $A_{20}^2 = 20 \times 19 = 380$.
2. L’ordre ne compte pas : $C_{20}^3 = \frac{20 \times 19 \times 18}{6} = 1\,140$.
:::
:::

:::exercice Factorielles et rangements
1. Calculer $5!$ et $\dfrac{7!}{5!}$.
2. De combien de façons $6$ personnes peuvent-elles s’asseoir sur $6$ chaises alignées ?

:::corrige
1. $5! = 120$ et $\frac{7!}{5!} = 7 \times 6 = 42$.
2. $6! = 720$.
:::
:::

:::exercice Tirages dans une urne
Une urne contient $5$ boules numérotées de $1$ à $5$. Combien de tirages possibles si l’on tire $3$ boules :

1. successivement avec remise ?
2. successivement sans remise ?
3. simultanément ?

:::corrige
1. $5^3 = 125$.
2. $A_5^3 = 5 \times 4 \times 3 = 60$.
3. $C_5^3 = \frac{60}{6} = 10$.
:::
:::
