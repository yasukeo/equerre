---
title: Devoir surveillé : arithmétique dans ℕ
kind: devoir
summary: Un devoir d’une heure sur 20 points : parité, critères de divisibilité, nombres premiers, décompositions, PGCD et PPCM et un problème, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : parité et divisibilité
1. Montrer que la somme de deux nombres impairs est paire. (2 pts)
2. Trouver le chiffre $a$ pour que le nombre $\overline{3a5}$ soit divisible par $9$. (2 pts)
3. Le nombre $119$ est-il premier ? (2 pts)

:::corrige
1. $(2k + 1) + (2k' + 1) = 2(k + k' + 1)$ : pair.
2. $3 + a + 5 = 8 + a$ doit être multiple de $9$ : $a = 1$, soit $315 = 9 \times 35$.
3. Non : $119 = 7 \times 17$.
:::
:::

:::exercice Exercice 2 (8 points) : PGCD et PPCM
1. Décomposer $420$ et $588$ en produit de facteurs premiers. (2 pts)
2. En déduire leur PGCD et leur PPCM. (4 pts)
3. Rendre irréductible la fraction $\dfrac{420}{588}$. (2 pts)

:::corrige
1. $420 = 2^2 \times 3 \times 5 \times 7$ et $588 = 2^2 \times 3 \times 7^2$.
2. PGCD : $2^2 \times 3 \times 7 = 84$. PPCM : $2^2 \times 3 \times 5 \times 7^2 = 2\,940$.
3. On divise par $84$ : $\frac{5}{7}$.
:::
:::

:::exercice Exercice 3 (6 points) : deux phares
Deux phares s’allument ensemble à $21$ h. Le premier s’allume toutes les $20$ secondes, le second toutes les $45$ secondes.

1. Au bout de combien de temps s’allumeront-ils de nouveau ensemble ? (3 pts)
2. Combien de fois s’allumeront-ils ensemble après $21$ h et jusqu’à $22$ h compris ? (3 pts)

:::corrige
1. $\operatorname{PPCM}(20 ; 45) = 180$ s, soit $3$ minutes : à $21$ h $03$.
2. En une heure, $3\,600$ s, il y a $\frac{3\,600}{180} = 20$ allumages simultanés.
:::
:::
