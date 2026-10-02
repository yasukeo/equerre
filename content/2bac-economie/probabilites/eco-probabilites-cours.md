---
title: Dénombrement et probabilités — partie 1 : dénombrement et probabilités
kind: cours
summary: Principe du produit, tirages avec ou sans remise, simultanés, arrangements, combinaisons et permutations, univers, événements, probabilité, équiprobabilité, événement contraire et réunion.
position: 10
visibility: public
---

## Dénombrement

### Principe du produit

:::propriete
Si une expérience se déroule en $p$ étapes, la première ayant $n_1$ issues possibles, la deuxième $n_2$, …, la $p$-ième $n_p$, alors le nombre total d’issues est $n_1 \times n_2 \times \cdots \times n_p$.
:::

### Tirages

Dans un ensemble de $n$ éléments, on tire $p$ éléments.

:::propriete
- **Successivement avec remise** (l’ordre compte, répétitions possibles) : $n^p$ tirages.
- **Successivement sans remise** (l’ordre compte, sans répétition) : $A_n^p = n(n - 1)\cdots(n - p + 1) = \frac{n!}{(n - p)!}$ arrangements, pour $p \leq n$.
- **Simultanément** (l’ordre ne compte pas) : $C_n^p = \frac{A_n^p}{p!} = \frac{n!}{p!\,(n - p)!}$ combinaisons.
:::

:::definition
Pour $n \in \mathbb{N}^*$, $n! = 1 \times 2 \times \cdots \times n$, et $0! = 1$. Le nombre de façons d’ordonner $n$ éléments (**permutations**) est $n!$.
:::

:::propriete
$C_n^0 = C_n^n = 1$, $C_n^1 = n$, $C_n^p = C_n^{n - p}$ et $C_n^p + C_n^{p + 1} = C_{n + 1}^{p + 1}$.
:::

:::exemple
Une urne contient $5$ boules rouges et $3$ vertes. On tire simultanément $2$ boules : il y a $C_8^2 = 28$ tirages. Ceux qui donnent deux boules rouges sont au nombre de $C_5^2 = 10$.
:::

## Probabilités

:::definition
Soit $\Omega$ l’ensemble fini des issues d’une expérience aléatoire (l’**univers**). Un **événement** est une partie de $\Omega$. Une **probabilité** associe à chaque événement $A$ un réel $p(A) \in [0 ; 1]$, avec $p(\Omega) = 1$ et $p(A \cup B) = p(A) + p(B)$ si $A \cap B = \varnothing$.
:::

:::propriete
- $p(\varnothing) = 0$ et $p(\bar{A}) = 1 - p(A)$.
- $p(A \cup B) = p(A) + p(B) - p(A \cap B)$.
- En cas d’**équiprobabilité** : $p(A) = \dfrac{\operatorname{card}(A)}{\operatorname{card}(\Omega)}$.
:::

:::exemple
Avec l’urne précédente, la probabilité de tirer deux boules rouges est $\frac{10}{28} = \frac{5}{14}$.
:::

## Choisir le bon modèle

Avant de compter, on se demande si **l’ordre compte** et si **les répétitions sont possibles** :

- l’ordre compte et les répétitions sont possibles (tirage successif avec remise, code, mot de passe) : $n^p$ ;
- l’ordre compte sans répétition (tirage successif sans remise, classement, attribution de postes différents) : $A_n^p$ ;
- l’ordre ne compte pas (tirage simultané, choix d’un groupe ou d’une main de cartes) : $C_n^p$.

:::exemple
- Un code de carte bancaire a $4$ chiffres : $10^4 = 10\,000$ codes.
- Une classe de $30$ élèves élit un président et un secrétaire : $A_{30}^2 = 30 \times 29 = 870$ possibilités.
- On choisit $3$ délégués parmi $30$ élèves : $C_{30}^3 = \frac{30 \times 29 \times 28}{6} = 4060$ possibilités.
- Les anagrammes du mot MAROC (cinq lettres distinctes) : $5! = 120$.
:::

:::exemple
**Au moins un.** On tire simultanément $3$ boules d’une urne de $4$ blanches et $6$ noires. L’événement « au moins une blanche » est le contraire de « aucune blanche » : $p = 1 - \frac{C_6^3}{C_{10}^3} = 1 - \frac{20}{120} = \frac{5}{6}$.
:::

:::attention
« Au moins un » se calcule presque toujours par l’événement contraire « aucun ». Et dans un tirage avec remise, on ne peut pas utiliser les combinaisons.
:::
