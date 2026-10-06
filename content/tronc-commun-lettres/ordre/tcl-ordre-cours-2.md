---
title: L’ordre dans ℝ — partie 2 : intervalles et valeur absolue
kind: cours
summary: Les intervalles et leur représentation, intersection et réunion, valeur absolue et distance entre deux nombres, équations et inéquations simples avec une valeur absolue.
position: 20
visibility: public
---

## Les intervalles

:::definition
Pour deux réels $a < b$ :

- $[a ; b]$ : les réels $x$ tels que $a \leq x \leq b$ (crochets tournés vers l’intérieur : bornes comprises) ;
- $]a ; b[$ : les réels tels que $a < x < b$ (bornes exclues) ;
- $[a ; b[$ et $]a ; b]$ : une borne comprise, l’autre exclue ;
- $[a ; +\infty[$ : les réels $x \geq a$ ; $]-\infty ; b[$ : les réels $x < b$.
:::

:::exemple
- $x \geq -1$ s’écrit $x \in [-1 ; +\infty[$.
- $-2 < x \leq 5$ s’écrit $x \in ]-2 ; 5]$.
:::

:::propriete
- L’**intersection** $I \cap J$ contient les réels qui sont dans les deux intervalles.
- La **réunion** $I \cup J$ contient les réels qui sont dans l’un au moins.
:::

:::exemple
$[-3 ; 2] \cap [0 ; 5] = [0 ; 2]$ et $[-3 ; 2] \cup [0 ; 5] = [-3 ; 5]$.
:::

## Valeur absolue

:::definition
La **valeur absolue** d’un nombre est ce nombre sans son signe : $|x| = x$ si $x \geq 0$, et $|x| = -x$ si $x < 0$. Ainsi $|-7| = 7$ et $|7| = 7$.
:::

:::propriete
$|a - b|$ est la **distance** entre $a$ et $b$ sur la droite graduée.
:::

:::exemple
- La distance entre $3$ et $8$ est $|3 - 8| = 5$ ; entre $-2$ et $5$, c’est $|-2 - 5| = 7$.
- $|\pi - 4| = 4 - \pi$, car $\pi - 4 < 0$.
:::

## Équations et inéquations

:::propriete
Pour $r > 0$ :

- $|x - a| = r \iff x = a - r$ ou $x = a + r$ ;
- $|x - a| \leq r \iff a - r \leq x \leq a + r$ : $x$ est à une distance au plus $r$ de $a$.
:::

:::exemple
- $|x - 4| = 3 \iff x = 1$ ou $x = 7$.
- $|x - 2| \leq 3 \iff -1 \leq x \leq 5$, soit $x \in [-1 ; 5]$.
:::

:::attention
Une valeur absolue est toujours positive ou nulle : l’équation $|x| = -2$ n’a pas de solution.
:::
