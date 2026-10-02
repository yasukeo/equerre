---
title: Série 1 — partie 1 : parité, divisibilité, nombres premiers
kind: serie
summary: Raisonner sur la parité, sommes d’entiers consécutifs, critères de divisibilité pour trouver un chiffre manquant, diviseurs d’un nombre et test de primalité, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Parité
1. Montrer que le produit de deux entiers impairs est impair.
2. Soit $n$ un entier impair. Montrer que $n^2 - 1$ est divisible par $8$. On pourra écrire $n = 2k + 1$.

:::corrige
1. $(2k + 1)(2k' + 1) = 4kk' + 2k + 2k' + 1 = 2(2kk' + k + k') + 1$ : impair.
2. $n^2 - 1 = 4k^2 + 4k = 4k(k + 1)$. Or $k(k + 1)$ est pair, donc $k(k + 1) = 2m$ et $n^2 - 1 = 8m$.
:::
:::

:::exercice Chiffre manquant
On note $\overline{47a}$ le nombre de trois chiffres $4$, $7$ et $a$.

1. Quelles valeurs de $a$ rendent $\overline{47a}$ divisible par $3$ ?
2. Pour quelle valeur est-il divisible par $2$ et par $3$ ?
3. Pour quelle valeur est-il divisible par $9$ ?

:::corrige
1. $4 + 7 + a = 11 + a$ doit être multiple de $3$ : $a \in \{1 ; 4 ; 7\}$.
2. $a$ doit en plus être pair : $a = 4$, soit $474$.
3. $11 + a = 18$ : $a = 7$, soit $477$.
:::
:::

:::exercice Diviseurs
1. Donner tous les diviseurs de $48$.
2. Montrer que la somme de quatre entiers consécutifs n’est jamais un multiple de $4$.

:::corrige
1. $1$, $2$, $3$, $4$, $6$, $8$, $12$, $16$, $24$, $48$.
2. $n + (n + 1) + (n + 2) + (n + 3) = 4n + 6 = 4(n + 1) + 2$ : le reste de la division par $4$ est $2$, jamais $0$.
:::
:::

:::exercice Premier ou non ?
Les nombres suivants sont-ils premiers ? $101$ ; $143$ ; $221$ ; $127$.

:::corrige
- $101$ : $\sqrt{101} \approx 10{,}05$ ; ni $2$, $3$, $5$, ni $7$ ne le divisent : premier.
- $143 = 11 \times 13$ : pas premier.
- $221 = 13 \times 17$ : pas premier.
- $127$ : $\sqrt{127} \approx 11{,}3$ ; ni $2$, $3$, $5$, $7$, ni $11$ ne le divisent : premier.
:::
:::
