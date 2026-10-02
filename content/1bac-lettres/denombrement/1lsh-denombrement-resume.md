---
title: Dénombrement : l’essentiel
kind: resume
summary: Cardinal d’une réunion et du complémentaire, principe multiplicatif, listes, arrangements, permutations et combinaisons, et le choix du modèle, sur une page.
position: 10
visibility: public
---

## Ensembles

$\operatorname{card}(A \cup B) = \operatorname{card}(A) + \operatorname{card}(B) - \operatorname{card}(A \cap B)$ ; $\operatorname{card}(\bar{A}) = \operatorname{card}(E) - \operatorname{card}(A)$.

## Les outils

:::propriete
- Principe multiplicatif : on multiplie les nombres de possibilités de chaque étape.
- Listes avec répétition : $n^p$.
- Arrangements (ordre, sans répétition) : $A_n^p = n(n - 1) \cdots (n - p + 1)$.
- Permutations : $n!$.
- Combinaisons (sans ordre) : $C_n^p = \frac{n!}{p!(n - p)!}$, avec $C_n^p = C_n^{n - p}$.
:::

:::attention
Deux questions pour choisir : l’ordre compte-t-il ? les répétitions sont-elles possibles ?
:::
