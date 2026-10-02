---
title: Probabilités : l’essentiel
kind: resume
summary: Les formules de dénombrement et les règles de calcul des probabilités, sur une page.
position: 10
visibility: public
---

## Dénombrement

:::propriete
- Principe du produit : $n_1 \times n_2 \times \cdots$.
- Avec remise, ordre : $n^p$. Sans remise, ordre : $A_n^p = n(n - 1)\cdots(n - p + 1)$. Simultané : $C_n^p = \frac{A_n^p}{p!}$.
- $n! = 1 \times 2 \times \cdots \times n$ : nombre de rangements de $n$ objets.
:::

## Probabilités

:::propriete
- Équiprobabilité : $p(A) = \frac{\text{cas favorables}}{\text{cas possibles}}$.
- $p(\bar{A}) = 1 - p(A)$ ; $p(A \cup B) = p(A) + p(B) - p(A \cap B)$.
- Indépendants : $p(A \cap B) = p(A) \times p(B)$ ; expériences répétées : on multiplie.
:::

:::attention
« Au moins un » : passer par le contraire, « aucun ». Et une probabilité est toujours entre $0$ et $1$.
:::
