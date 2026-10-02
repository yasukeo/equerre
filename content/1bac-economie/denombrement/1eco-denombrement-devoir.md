---
title: Devoir surveillé : dénombrement
kind: devoir
summary: Un devoir d’une heure sur 20 points : cardinaux, arrangements et combinaisons, codes, avec le barème et le corrigé.
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

:::exercice Exercice 3 (6 points) : codes
Le code d’une carte bancaire est formé de $4$ chiffres, de $0$ à $9$.

1. Combien y a-t-il de codes possibles ? (2 pts)
2. Combien de codes ont leurs $4$ chiffres tous différents ? (2 pts)
3. Combien de codes contiennent au moins un $0$ ? (2 pts)

:::corrige
1. $10^4 = 10\,000$.
2. $A_{10}^4 = 10 \times 9 \times 8 \times 7 = 5\,040$.
3. Codes sans $0$ : $9^4 = 6\,561$. Donc $10\,000 - 6\,561 = 3\,439$ codes contiennent au moins un $0$.
:::
:::
