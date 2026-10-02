---
title: Dénombrement : l’essentiel
kind: resume
summary: Cardinaux, principe multiplicatif, p-listes, arrangements, permutations, combinaisons, Pascal et binôme de Newton, sur une page.
position: 10
visibility: public
---

## Cardinaux

$\operatorname{card}(A \cup B) = \operatorname{card} A + \operatorname{card} B - \operatorname{card}(A \cap B)$ ; $\operatorname{card} \overline{A} = \operatorname{card} E - \operatorname{card} A$ ; $\operatorname{card}(E \times F) = \operatorname{card} E \times \operatorname{card} F$.

## Les quatre outils

:::propriete
- $p$-listes (ordre, répétitions) : $n^p$.
- Arrangements (ordre, sans répétition) : $A_n^p = \frac{n!}{(n - p)!}$.
- Permutations : $n!$.
- Combinaisons (parties, sans ordre) : $C_n^p = \frac{n!}{p!(n - p)!}$.
:::

## Propriétés

$C_n^p = C_n^{n - p}$ ; $C_n^p + C_n^{p + 1} = C_{n + 1}^{p + 1}$ ; $\sum_k C_n^k = 2^n$ ; $(a + b)^n = \sum_{k = 0}^n C_n^k a^{n - k}b^k$.

:::attention
Pour choisir le modèle : l’ordre compte-t-il ? les répétitions sont-elles possibles ? Pour « au moins un », compter le complémentaire.
:::
