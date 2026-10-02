---
title: Série 1 — partie 2 : décomposition, PGCD et PPCM
kind: serie
summary: Décompositions en facteurs premiers, PGCD et PPCM, fractions irréductibles et dénominateur commun, nombre de diviseurs, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Décompositions
Décomposer en produit de facteurs premiers : $252$ ; $1\,080$ ; $1\,001$.

:::corrige
- $252 = 2^2 \times 3^2 \times 7$.
- $1\,080 = 2^3 \times 3^3 \times 5$.
- $1\,001 = 7 \times 11 \times 13$.
:::
:::

:::exercice PGCD et PPCM
1. Calculer $\operatorname{PGCD}(252 ; 1\,080)$ et $\operatorname{PPCM}(252 ; 1\,080)$.
2. Vérifier que leur produit vaut $252 \times 1\,080$.

:::corrige
1. PGCD : $2^2 \times 3^2 = 36$. PPCM : $2^3 \times 3^3 \times 5 \times 7 = 7\,560$.
2. $36 \times 7\,560 = 272\,160$ et $252 \times 1\,080 = 272\,160$.
:::
:::

:::exercice Fractions
1. Rendre irréductible $\dfrac{252}{1\,080}$.
2. Calculer $\dfrac{1}{252} + \dfrac{1}{1\,080}$ avec le plus petit dénominateur commun.
3. $1\,001$ et $252$ sont-ils premiers entre eux ?

:::corrige
1. On divise par $36$ : $\frac{7}{30}$.
2. Le dénominateur commun est $7\,560$ : $\frac{30}{7\,560} + \frac{7}{7\,560} = \frac{37}{7\,560}$.
3. Non : $7$ divise les deux, donc leur PGCD est au moins $7$ (il vaut exactement $7$).
:::
:::

:::exercice Nombre de diviseurs
1. Combien $1\,080$ a-t-il de diviseurs ?
2. Trouver le plus petit entier qui a exactement $6$ diviseurs.

:::corrige
1. $(3 + 1)(3 + 1)(1 + 1) = 32$ diviseurs.
2. $6 = 6$ ou $6 = 3 \times 2$ : les entiers de la forme $p^5$ ou $p^2 q$. Les plus petits sont $2^5 = 32$ et $2^2 \times 3 = 12$. La réponse est $12$, dont les diviseurs sont $1$, $2$, $3$, $4$, $6$, $12$.
:::
:::
