---
title: Dénombrement et probabilités : l’essentiel
kind: resume
summary: Les formules de dénombrement, les règles de calcul des probabilités, le conditionnement et la loi binomiale sur une page.
position: 10
visibility: public
---

## Dénombrement

:::propriete
- Principe du produit : $n_1 \times n_2 \times \cdots \times n_p$.
- Ordre et répétitions : $n^p$ (successif avec remise).
- Ordre sans répétition : $A_n^p = \frac{n!}{(n - p)!}$ (successif sans remise) ; permutations : $n!$.
- Sans ordre : $C_n^p = \frac{n!}{p!(n - p)!}$ (simultané) ; $C_n^p = C_n^{n - p}$, $C_n^p + C_n^{p + 1} = C_{n + 1}^{p + 1}$.
:::

## Probabilités

:::propriete
- $p(\bar{A}) = 1 - p(A)$ ; $p(A \cup B) = p(A) + p(B) - p(A \cap B)$.
- Équiprobabilité : $p(A) = \frac{\operatorname{card} A}{\operatorname{card} \Omega}$.
- « Au moins un » : passer par le contraire « aucun ».
:::

## Conditionnement et indépendance

:::propriete
- $p_A(B) = \frac{p(A \cap B)}{p(A)}$ et $p(A \cap B) = p(A)\,p_A(B)$.
- Probabilités totales : $p(B) = \sum p(A_i)\,p_{A_i}(B)$ pour une partition $(A_i)$.
- $A$ et $B$ indépendants : $p(A \cap B) = p(A)\,p(B)$.
:::

Sur un arbre : produit le long d’un chemin, somme des chemins qui mènent à l’événement.

## Variables aléatoires

:::propriete
- $E(X) = \sum x_i p_i$ ; $V(X) = \sum x_i^2 p_i - E(X)^2$ ; $\sigma(X) = \sqrt{V(X)}$.
- Loi binomiale $\mathcal{B}(n, p)$ : $p(X = k) = C_n^k p^k(1 - p)^{n - k}$, $E(X) = np$, $V(X) = np(1 - p)$.
:::

:::attention
Avant de compter : l’ordre compte-t-il ? les répétitions sont-elles possibles ? Et la somme des probabilités d’une loi vaut toujours $1$.
:::
