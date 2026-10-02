---
title: Dénombrement — partie 2 : arrangements, permutations, combinaisons
kind: cours
summary: Arrangements, permutations et factorielle, combinaisons et propriétés, triangle de Pascal, et choix du bon modèle de tirage.
position: 20
visibility: public
---

## Arrangements et permutations

:::definition
Un **arrangement** de $p$ éléments d’un ensemble $E$ à $n$ éléments ($p \leq n$) est une $p$-liste d’éléments **distincts** de $E$. Leur nombre est :

$$
A_n^p = n(n - 1)\cdots(n - p + 1) = \frac{n!}{(n - p)!}
$$

Un arrangement des $n$ éléments est une **permutation** de $E$ : il y en a $n! = 1 \times 2 \times \cdots \times n$ (avec $0! = 1$).
:::

:::exemple
- Un bureau (président, vice-président, trésorier) parmi $10$ personnes : $A_{10}^3 = 720$.
- Les anagrammes de MAROC : $5! = 120$ ; celles de RABAT (deux A) : $\frac{5!}{2!} = 60$.
:::

## Combinaisons

:::definition
Une **combinaison** de $p$ éléments de $E$ ($p \leq n$) est une **partie** de $E$ à $p$ éléments (l’ordre ne compte pas). Leur nombre est :

$$
C_n^p = \frac{A_n^p}{p!} = \frac{n!}{p!\,(n - p)!}
$$
:::

:::propriete
- $C_n^0 = C_n^n = 1$, $C_n^1 = n$ ;
- **symétrie** : $C_n^p = C_n^{n - p}$ ;
- **relation de Pascal** : $C_n^p + C_n^{p + 1} = C_{n + 1}^{p + 1}$ ;
- $C_n^0 + C_n^1 + \cdots + C_n^n = 2^n$.
:::

La relation de Pascal permet de construire le **triangle de Pascal**, ligne après ligne : $1$ ; $1, 1$ ; $1, 2, 1$ ; $1, 3, 3, 1$ ; $1, 4, 6, 4, 1$ ; …

## Choisir le bon modèle

:::propriete
On tire $p$ objets parmi $n$ :

- **successivement avec remise** (ordre, répétitions) : $n^p$ ;
- **successivement sans remise** (ordre, pas de répétition) : $A_n^p$ ;
- **simultanément** (pas d’ordre) : $C_n^p$.
:::

:::exemple
Une urne contient $4$ boules rouges et $6$ blanches. On tire simultanément $3$ boules : $C_{10}^3 = 120$ tirages, dont $C_4^2 \times C_6^1 = 36$ avec exactement deux rouges, et $C_6^3 = 20$ sans rouge, donc $100$ avec au moins une rouge.
:::

:::attention
« Au moins un » se compte presque toujours par le complémentaire : le total moins « aucun ».
:::
