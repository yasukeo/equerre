---
title: Équations, inéquations et systèmes — partie 2 : systèmes de deux équations
kind: cours
summary: Résoudre un système de deux équations à deux inconnues par combinaison et par substitution, systèmes sans solution ou avec une infinité de solutions, et problèmes concrets.
position: 20
visibility: public
---

## Qu’est-ce qu’un système ?

:::definition
Un **système** de deux équations à deux inconnues $x$ et $y$ demande de trouver les couples $(x ; y)$ qui vérifient **les deux** équations à la fois.
:::

## Méthode par combinaison

:::propriete
On additionne (ou on soustrait) les équations, éventuellement après les avoir multipliées par des nombres bien choisis, pour faire disparaître une inconnue.
:::

:::exemple
$$
\begin{cases} x + y = 10 \\ x - y = 4 \end{cases}
$$

En additionnant : $2x = 14$, donc $x = 7$, puis $y = 10 - 7 = 3$. La solution est $(7 ; 3)$.
:::

## Méthode par substitution

:::propriete
On exprime une inconnue en fonction de l’autre dans une équation, puis on remplace dans l’autre équation.
:::

:::exemple
$$
\begin{cases} 2x + 3y = 13 \\ x - y = -1 \end{cases}
$$

De la seconde : $x = y - 1$. Dans la première : $2(y - 1) + 3y = 13$, soit $5y = 15$, donc $y = 3$ et $x = 2$. Vérification : $4 + 9 = 13$ et $2 - 3 = -1$.
:::

## Cas particuliers

:::exemple
- $x + 2y = 3$ et $2x + 4y = 6$ : la seconde équation est la première multipliée par $2$. Il y a une infinité de solutions.
- $x + 2y = 3$ et $2x + 4y = 5$ : en multipliant la première par $2$, on obtient $2x + 4y = 6$, qui contredit la seconde. Il n’y a aucune solution.
:::

## Un problème

:::exemple
$3$ cahiers et $2$ stylos coûtent $27$ dirhams ; $2$ cahiers et $5$ stylos coûtent $29$ dirhams. On note $c$ le prix d’un cahier et $s$ celui d’un stylo : $3c + 2s = 27$ et $2c + 5s = 29$. On multiplie la première par $2$ et la seconde par $3$ : $6c + 4s = 54$ et $6c + 15s = 87$. En soustrayant : $11s = 33$, donc $s = 3$, puis $3c = 21$ et $c = 7$. Un cahier coûte $7$ dirhams et un stylo $3$ dirhams.
:::

:::attention
On vérifie toujours la solution dans les **deux** équations de départ.
:::
