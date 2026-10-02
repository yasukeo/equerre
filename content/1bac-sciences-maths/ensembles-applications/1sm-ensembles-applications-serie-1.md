---
title: Série 1 — partie 1 : les ensembles
kind: serie
summary: Opérations sur des intervalles et des ensembles finis, démontrer une inclusion et une égalité, lois de Morgan, produit cartésien et parties, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Opérations
Dans $E = \mathbb{R}$, on pose $A = ]-2 ; 4]$ et $B = [1 ; 6[$. Déterminer $A \cap B$, $A \cup B$, $A \setminus B$, $B \setminus A$, $A \Delta B$ et $\overline{A}$.

:::corrige
$A \cap B = [1 ; 4]$, $A \cup B = ]-2 ; 6[$, $A \setminus B = ]-2 ; 1[$, $B \setminus A = ]4 ; 6[$, $A \Delta B = ]-2 ; 1[ \cup ]4 ; 6[$, $\overline{A} = ]-\infty ; -2] \cup ]4 ; +\infty[$.
:::
:::

:::exercice Ensembles finis
$E = \{1, 2, \ldots, 10\}$, $A$ l’ensemble des nombres pairs de $E$ et $B$ celui des multiples de $3$ de $E$.

1. Écrire $A$, $B$, $A \cap B$, $A \cup B$ en extension.
2. Vérifier la loi de Morgan $\overline{A \cup B} = \overline{A} \cap \overline{B}$ dans ce cas.

:::corrige
1. $A = \{2, 4, 6, 8, 10\}$, $B = \{3, 6, 9\}$, $A \cap B = \{6\}$, $A \cup B = \{2, 3, 4, 6, 8, 9, 10\}$.
2. $\overline{A \cup B} = \{1, 5, 7\}$ ; $\overline{A} = \{1, 3, 5, 7, 9\}$, $\overline{B} = \{1, 2, 4, 5, 7, 8, 10\}$, et $\overline{A} \cap \overline{B} = \{1, 5, 7\}$.
:::
:::

:::exercice Inclusions et égalités
Soit $A$, $B$ deux parties d’un ensemble $E$.

1. Montrer que $A \cap B = A \iff A \subset B$.
2. Montrer que $A \Delta B = (A \cup B) \setminus (A \cap B)$.

:::corrige
1. Si $A \subset B$, tout élément de $A$ est dans $A \cap B$, donc $A \subset A \cap B \subset A$. Réciproquement, si $A \cap B = A$, tout élément de $A$ est dans $A \cap B$, donc dans $B$.
2. Un élément est dans $A \Delta B$ s’il est dans exactement un des deux ensembles : dans $A$ et pas dans $B$, ou dans $B$ et pas dans $A$. C’est exactement être dans $A \cup B$ sans être dans $A \cap B$.
:::
:::

:::exercice Produit cartésien et parties
$E = \{a ; b ; c\}$.

1. Combien $E \times E$ a-t-il d’éléments ?
2. Écrire $\mathcal{P}(E)$ et vérifier qu’il a $2^3$ éléments.

:::corrige
1. $3 \times 3 = 9$.
2. $\mathcal{P}(E) = \{\varnothing ; \{a\} ; \{b\} ; \{c\} ; \{a ; b\} ; \{a ; c\} ; \{b ; c\} ; E\}$ : $8$ éléments.
:::
:::
