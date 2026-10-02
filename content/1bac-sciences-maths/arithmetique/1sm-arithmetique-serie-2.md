---
title: Série 1 — partie 2 : PGCD et PPCM
kind: serie
summary: PGCD par l’algorithme d’Euclide et par la décomposition, PPCM, fractions irréductibles, nombres premiers entre eux et problèmes de partage, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Algorithme d’Euclide
Calculer $1\,512 \wedge 588$ par l’algorithme d’Euclide, puis $1\,512 \vee 588$.

:::corrige
$1\,512 = 588 \times 2 + 336$ ; $588 = 336 \times 1 + 252$ ; $336 = 252 \times 1 + 84$ ; $252 = 84 \times 3$. Donc $1\,512 \wedge 588 = 84$ et $1\,512 \vee 588 = \frac{1\,512 \times 588}{84} = 1\,512 \times 7 = 10\,584$.
:::
:::

:::exercice Avec la décomposition
$a = 2^4 \times 3^2 \times 5$ et $b = 2^2 \times 3^3 \times 7$.

1. Calculer $a \wedge b$ et $a \vee b$ sous forme décomposée.
2. Vérifier que $(a \wedge b)(a \vee b) = ab$.

:::corrige
1. $a \wedge b = 2^2 \times 3^2 = 36$ ; $a \vee b = 2^4 \times 3^3 \times 5 \times 7 = 15\,120$.
2. $36 \times 15\,120 = 544\,320$ et $ab = 720 \times 756 = 544\,320$.
:::
:::

:::exercice Fractions et premiers entre eux
1. Rendre irréductible $\frac{756}{1\,260}$.
2. Montrer que pour tout entier $n$, $\frac{2n + 1}{n + 1}$ est irréductible.

:::corrige
1. $756 \wedge 1\,260 = 252$ (Euclide : $1\,260 = 756 + 504$, $756 = 504 + 252$, $504 = 2 \times 252$) : $\frac{756}{1\,260} = \frac{3}{5}$.
2. Un diviseur commun $d$ de $2n + 1$ et $n + 1$ divise $2(n + 1) - (2n + 1) = 1$ : $d = 1$.
:::
:::

:::exercice Problèmes concrets
1. Un fleuriste a $210$ roses et $126$ tulipes. Il veut faire des bouquets identiques, en utilisant toutes les fleurs, le plus grand nombre possible de bouquets. Combien de bouquets, et de quelle composition ?
2. Deux phares s’allument, l’un toutes les $18$ secondes, l’autre toutes les $24$ secondes. Ils s’allument ensemble à minuit. Quand s’allumeront-ils de nouveau ensemble ?

:::corrige
1. $210 \wedge 126 = 42$ : $42$ bouquets de $5$ roses et $3$ tulipes.
2. $18 \vee 24 = 72$ : $72$ secondes plus tard, à minuit, une minute et douze secondes.
:::
:::
