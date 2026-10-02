---
title: Probabilités — partie 1 : dénombrement
kind: cours
summary: Compter avec le principe du produit, les arbres, les tirages avec ou sans remise, simultanés, la factorielle, les arrangements et les combinaisons.
position: 10
visibility: public
---

## Principe du produit

:::propriete
Si un choix se fait en plusieurs étapes, avec $n_1$ possibilités pour la première, $n_2$ pour la deuxième, etc., le nombre total de choix est le **produit** $n_1 \times n_2 \times \cdots$.
:::

:::exemple
Un menu propose $3$ entrées, $4$ plats et $2$ desserts : on peut composer $3 \times 4 \times 2 = 24$ repas différents.
:::

Un **arbre** permet de représenter ces étapes : chaque chemin est une possibilité.

## Tirages

On tire $p$ objets parmi $n$.

:::propriete
- **Avec remise, l’un après l’autre** (l’ordre compte, on peut retomber sur le même objet) : $n^p$ tirages.
- **Sans remise, l’un après l’autre** (l’ordre compte, pas de répétition) : $A_n^p = n \times (n - 1) \times \cdots \times (n - p + 1)$ tirages ($p$ facteurs).
- **En même temps** (simultanément : l’ordre ne compte pas) : $C_n^p = \dfrac{A_n^p}{p!}$ tirages.
:::

:::definition
Pour un entier $n \geq 1$, $n! = 1 \times 2 \times \cdots \times n$ (« factorielle $n$ ») ; par convention $0! = 1$. C’est le nombre de façons de ranger $n$ objets.
:::

:::exemple
- Un code de $3$ chiffres : $10^3 = 1\,000$ codes.
- Un podium (or, argent, bronze) parmi $8$ coureurs : $A_8^3 = 8 \times 7 \times 6 = 336$ podiums.
- Choisir $2$ élèves parmi $5$ pour une sortie : $C_5^2 = \frac{5 \times 4}{2} = 10$ choix.
- Ranger $4$ livres sur une étagère : $4! = 24$ façons.
:::

:::propriete
$C_n^0 = C_n^n = 1$, $C_n^1 = n$ et $C_n^p = C_n^{n - p}$.
:::

:::attention
Pour choisir la bonne formule, on se pose deux questions : l’ordre compte-t-il ? peut-on répéter ? « Simultanément » veut dire que l’ordre ne compte pas.
:::
