---
title: Dénombrement — partie 1 : ensembles finis et principe multiplicatif
kind: cours
summary: Cardinal d’un ensemble, réunion, intersection et complémentaire, principe multiplicatif et arbre de choix, listes avec répétition.
position: 10
visibility: public
---

## Cardinal d’un ensemble fini

:::definition
Le **cardinal** d’un ensemble fini $E$, noté $\operatorname{card}(E)$, est son nombre d’éléments.
:::

:::exemple
$E = \{a ; b ; c ; d\}$ : $\operatorname{card}(E) = 4$. L’ensemble des chiffres de $0$ à $9$ a pour cardinal $10$.
:::

## Réunion, intersection, complémentaire

:::propriete
Soit $A$ et $B$ deux parties d’un ensemble fini $E$.

- $A \cap B$ (« $A$ et $B$ ») contient les éléments communs ; $A \cup B$ (« $A$ ou $B$ ») contient les éléments d’au moins un des deux.
- $\operatorname{card}(A \cup B) = \operatorname{card}(A) + \operatorname{card}(B) - \operatorname{card}(A \cap B)$.
- Le **complémentaire** $\bar{A}$ contient les éléments de $E$ qui ne sont pas dans $A$ : $\operatorname{card}(\bar{A}) = \operatorname{card}(E) - \operatorname{card}(A)$.
:::

:::exemple
Dans une classe de $30$ élèves, $18$ jouent au football, $12$ au basket, et $5$ aux deux.

- Nombre d’élèves qui pratiquent au moins un des deux sports : $18 + 12 - 5 = 25$.
- Nombre d’élèves qui ne pratiquent aucun des deux : $30 - 25 = 5$.
- Nombre d’élèves qui jouent seulement au football : $18 - 5 = 13$.
:::

:::attention
Dans $\operatorname{card}(A) + \operatorname{card}(B)$, les éléments communs sont comptés deux fois : c’est pourquoi on retire $\operatorname{card}(A \cap B)$.
:::

## Principe multiplicatif

:::propriete
Si un choix se fait en plusieurs étapes, avec $n_1$ possibilités à la première étape, $n_2$ à la deuxième, …, $n_k$ à la dernière, le nombre total de choix est :

$$
n_1 \times n_2 \times \cdots \times n_k
$$
:::

:::exemple
Un restaurant propose $3$ entrées, $4$ plats et $2$ desserts. Un menu comprend une entrée, un plat et un dessert : il y a $3 \times 4 \times 2 = 24$ menus.
:::

:::propriete
**Arbre de choix.** On peut représenter les étapes par un arbre : chaque branche est un choix, et le nombre de chemins complets est le nombre total de possibilités.
:::

:::exemple
On lance une pièce trois fois. À chaque lancer, $2$ issues : pile (P) ou face (F). L’arbre a $2 \times 2 \times 2 = 8$ chemins : PPP, PPF, PFP, PFF, FPP, FPF, FFP, FFF.
:::

## Listes avec répétition

:::propriete
Le nombre de façons de choisir **successivement** $p$ éléments parmi $n$, **avec répétition possible** et en tenant compte de l’ordre, est $n^p$.
:::

:::exemple
- Un code de $3$ chiffres (de $0$ à $9$) : $10^3 = 1\,000$ codes.
- Un QCM de $5$ questions, avec $4$ réponses possibles chacune : $4^5 = 1\,024$ façons de répondre.
:::
