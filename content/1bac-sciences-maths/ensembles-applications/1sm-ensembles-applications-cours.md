---
title: Ensembles et applications — partie 1 : les ensembles
kind: cours
summary: Appartenance et inclusion, égalité d’ensembles, intersection, réunion, complémentaire, différence et différence symétrique, lois de Morgan, produit cartésien, ensemble des parties.
position: 10
visibility: public
---

## Appartenance et inclusion

:::definition
- $x \in E$ : l’élément $x$ **appartient** à l’ensemble $E$.
- $A \subset E$ ($A$ est **inclus** dans $E$, ou $A$ est une **partie** de $E$) : tout élément de $A$ est un élément de $E$, c’est-à-dire $(\forall x)(x \in A \Rightarrow x \in E)$.
- $A = B$ si et seulement si $A \subset B$ et $B \subset A$ (**double inclusion**).
:::

:::exemple
$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$. L’ensemble vide $\varnothing$ est inclus dans tout ensemble.
:::

## Opérations sur les parties

Soit $A$ et $B$ deux parties d’un ensemble $E$.

:::definition
- **Intersection** : $A \cap B = \{x \in E : x \in A \text{ et } x \in B\}$.
- **Réunion** : $A \cup B = \{x \in E : x \in A \text{ ou } x \in B\}$.
- **Complémentaire** de $A$ dans $E$ : $\overline{A} = C_E A = \{x \in E : x \notin A\}$.
- **Différence** : $A \setminus B = \{x \in A : x \notin B\} = A \cap \overline{B}$.
- **Différence symétrique** : $A \Delta B = (A \setminus B) \cup (B \setminus A)$.
:::

:::propriete
- $\cap$ et $\cup$ sont commutatives et associatives ; chacune est distributive par rapport à l’autre : $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$ et $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$.
- **Lois de Morgan** : $\overline{A \cap B} = \overline{A} \cup \overline{B}$ et $\overline{A \cup B} = \overline{A} \cap \overline{B}$.
- $\overline{\overline{A}} = A$ ; $A \subset B \iff \overline{B} \subset \overline{A}$.
:::

:::exemple
Dans $E = \mathbb{R}$, avec $A = [0 ; 3]$ et $B = [2 ; 5]$ : $A \cap B = [2 ; 3]$, $A \cup B = [0 ; 5]$, $A \setminus B = [0 ; 2[$, $A \Delta B = [0 ; 2[ \cup ]3 ; 5]$, $\overline{A} = ]-\infty ; 0[ \cup ]3 ; +\infty[$.
:::

## Produit cartésien et parties

:::definition
- Le **produit cartésien** $E \times F$ est l’ensemble des couples $(x ; y)$ avec $x \in E$ et $y \in F$.
- $\mathcal{P}(E)$ est l’ensemble de toutes les parties de $E$. Si $E$ a $n$ éléments, $\mathcal{P}(E)$ en a $2^n$.
:::

:::exemple
$E = \{1 ; 2\}$ : $E \times E = \{(1 ; 1) ; (1 ; 2) ; (2 ; 1) ; (2 ; 2)\}$ et $\mathcal{P}(E) = \{\varnothing ; \{1\} ; \{2\} ; \{1 ; 2\}\}$.
:::

## Démontrer une égalité d’ensembles

:::exemple
Montrons que $A \setminus (B \cup C) = (A \setminus B) \cap (A \setminus C)$. Avec les complémentaires : $A \setminus (B \cup C) = A \cap \overline{B \cup C} = A \cap \overline{B} \cap \overline{C}$ (Morgan), et $(A \cap \overline{B}) \cap (A \cap \overline{C}) = A \cap \overline{B} \cap \overline{C}$.
:::

:::attention
$x \in A$ (un élément) et $\{x\} \subset A$ (une partie) ne s’écrivent pas de la même façon : on ne mélange pas $\in$ et $\subset$.
:::
