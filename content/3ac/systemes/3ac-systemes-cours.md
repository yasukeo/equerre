---
title: Systèmes — partie 1 : résoudre un système
kind: cours
summary: Système de deux équations du premier degré à deux inconnues, vérifier une solution, méthode par substitution et méthode par combinaison.
position: 10
visibility: public
---

## Qu’est-ce qu’un système ?

:::definition
Résoudre un **système** de deux équations à deux inconnues $x$ et $y$, c’est trouver tous les couples $(x ; y)$ qui vérifient **les deux** équations en même temps.
:::

:::exemple
Le couple $(2 ; -1)$ est solution du système $x + 3y = -1$ et $2x - y = 5$, car $2 - 3 = -1$ et $4 + 1 = 5$.
:::

## Méthode par substitution

:::propriete
1. Dans une équation, on exprime une inconnue en fonction de l’autre.
2. On remplace dans l’autre équation, qui n’a plus qu’une inconnue.
3. On la résout, puis on calcule la seconde inconnue.
:::

:::exemple
$$
\begin{cases} 3x + 2y = 16 \\ x - y = 2 \end{cases}
$$

De la seconde équation : $x = y + 2$. Dans la première : $3(y + 2) + 2y = 16$, soit $5y = 10$, donc $y = 2$, puis $x = 4$. La solution est $(4 ; 2)$.
:::

## Méthode par combinaison

:::propriete
On multiplie les équations par des nombres choisis pour que, en les additionnant (ou en les soustrayant), une inconnue disparaisse.
:::

:::exemple
$$
\begin{cases} 2x + 3y = 12 \\ 5x - 2y = 11 \end{cases}
$$

On multiplie la première par $2$ et la seconde par $3$ : $4x + 6y = 24$ et $15x - 6y = 33$. En additionnant : $19x = 57$, donc $x = 3$. Puis $6 + 3y = 12$, donc $y = 2$. Vérification : $15 - 4 = 11$. La solution est $(3 ; 2)$.
:::

:::attention
On vérifie toujours la solution dans les **deux** équations de départ.
:::
