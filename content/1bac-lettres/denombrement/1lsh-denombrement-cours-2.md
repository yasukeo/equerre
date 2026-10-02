---
title: Dénombrement — partie 2 : arrangements, permutations, combinaisons
kind: cours
summary: Factorielle, arrangements quand l’ordre compte, permutations, combinaisons quand l’ordre ne compte pas, leurs propriétés, et comment choisir le bon modèle pour un tirage.
position: 20
visibility: public
---

## Factorielle

:::definition
Pour un entier $n \geq 1$, la **factorielle** de $n$ est $n! = n \times (n - 1) \times \cdots \times 2 \times 1$. Par convention, $0! = 1$.
:::

:::exemple
$3! = 6$, $4! = 24$, $5! = 120$, $6! = 720$. Et $\frac{7!}{5!} = 7 \times 6 = 42$.
:::

## Arrangements : l’ordre compte

:::definition
Un **arrangement** de $p$ éléments parmi $n$ est une liste ordonnée de $p$ éléments **différents** choisis parmi $n$. Leur nombre est :

$$
A_n^p = n \times (n - 1) \times \cdots \times (n - p + 1) \qquad (p \text{ facteurs})
$$
:::

:::exemple
Une course réunit $8$ coureurs. Le nombre de podiums possibles (premier, deuxième, troisième) est $A_8^3 = 8 \times 7 \times 6 = 336$.
:::

## Permutations

:::propriete
Une **permutation** de $n$ éléments est une façon de les ranger tous dans un ordre. Il y en a $n!$.
:::

:::exemple
On range $5$ livres différents sur une étagère : $5! = 120$ rangements. Le mot « MAROC » a $5! = 120$ anagrammes.
:::

## Combinaisons : l’ordre ne compte pas

:::definition
Une **combinaison** de $p$ éléments parmi $n$ est un groupe de $p$ éléments différents, **sans ordre**. Leur nombre est :

$$
C_n^p = \frac{A_n^p}{p!} = \frac{n!}{p!\,(n - p)!}
$$
:::

:::exemple
On choisit $3$ délégués parmi $25$ élèves, sans rôle particulier : $C_{25}^3 = \frac{25 \times 24 \times 23}{3 \times 2 \times 1} = 2\,300$ choix.
:::

:::propriete
$C_n^0 = 1$, $C_n^1 = n$, $C_n^n = 1$ et $C_n^p = C_n^{n - p}$ (choisir les $p$ qu’on prend revient à choisir les $n - p$ qu’on laisse).
:::

## Choisir le bon modèle

:::propriete
On tire $p$ objets parmi $n$ :

- **successivement avec remise** (l’ordre compte, répétitions possibles) : $n^p$ ;
- **successivement sans remise** (l’ordre compte, pas de répétition) : $A_n^p$ ;
- **simultanément** (pas d’ordre, pas de répétition) : $C_n^p$.
:::

:::exemple
Une urne contient $8$ boules. On en tire $2$ :

- simultanément : $C_8^2 = 28$ tirages ;
- l’une après l’autre, sans remise : $A_8^2 = 56$ tirages ;
- l’une après l’autre, avec remise : $8^2 = 64$ tirages.
:::

:::attention
Pour compter « au moins un », on compte souvent le contraire (« aucun ») et on le retire du total.
:::
