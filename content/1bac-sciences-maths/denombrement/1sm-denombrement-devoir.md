---
title: Devoir surveillé : dénombrement
kind: devoir
summary: Un devoir d’une heure sur 20 points : cardinaux, arrangements et combinaisons, binôme de Newton, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (5 points) : cardinaux
Parmi $100$ personnes, $60$ lisent le journal A, $45$ le journal B et $25$ les deux. Combien ne lisent aucun des deux ? Combien lisent exactement un journal ?

:::corrige
Au moins un : $60 + 45 - 25 = 80$ ; aucun : $20$ ; exactement un : $80 - 25 = 55$.
:::
:::

:::exercice Exercice 2 (9 points) : tirages
Un jeu de $32$ cartes contient $4$ as. On tire $5$ cartes simultanément.

1. Combien de mains possibles ? (2 pts)
2. Combien contiennent exactement $2$ as ? (3 pts)
3. Combien contiennent au moins un as ? (4 pts)

:::corrige
1. $C_{32}^5 = 201\,376$.
2. $C_4^2 \times C_{28}^3 = 6 \times 3\,276 = 19\,656$.
3. $C_{32}^5 - C_{28}^5 = 201\,376 - 98\,280 = 103\,096$.
:::
:::

:::exercice Exercice 3 (6 points) : binôme
1. Développer $(x + 3)^5$. (3 pts)
2. Calculer $C_{10}^0 - C_{10}^1 + C_{10}^2 - \cdots + C_{10}^{10}$. (3 pts)

:::corrige
1. $x^5 + 15x^4 + 90x^3 + 270x^2 + 405x + 243$.
2. C’est $(1 - 1)^{10} = 0$.
:::
:::
