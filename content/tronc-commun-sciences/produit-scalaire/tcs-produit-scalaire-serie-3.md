---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : l’identité du parallélogramme et un angle retrouvé par le produit scalaire, puis des ensembles de points définis par MA · MB, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : l’identité du parallélogramme
Soit $ABCD$ un parallélogramme.

1. Montrer que $AC^2 = AB^2 + AD^2 + 2\overrightarrow{AB} \cdot \overrightarrow{AD}$ et $BD^2 = AB^2 + AD^2 - 2\overrightarrow{AB} \cdot \overrightarrow{AD}$.
2. En déduire que $AC^2 + BD^2 = 2\left(AB^2 + AD^2\right)$.
3. On donne $AB = 5$, $AD = 3$ et $AC = 7$. Calculer $BD$.
4. Calculer $\overrightarrow{AB} \cdot \overrightarrow{AD}$, puis l’angle $\widehat{BAD}$.

:::corrige
1. $\overrightarrow{AC} = \overrightarrow{AB} + \overrightarrow{AD}$ et $\overrightarrow{BD} = \overrightarrow{AD} - \overrightarrow{AB}$ ; on développe les carrés.
2. En additionnant, les doubles produits s’annulent.
3. $BD^2 = 2(25 + 9) - 49 = 19$, donc $BD = \sqrt{19}$.
4. $49 = 25 + 9 + 2\overrightarrow{AB} \cdot \overrightarrow{AD}$, donc $\overrightarrow{AB} \cdot \overrightarrow{AD} = \frac{15}{2}$. Puis $\cos \widehat{BAD} = \frac{15/2}{5 \times 3} = \frac{1}{2}$ : $\widehat{BAD} = 60°$.
:::
:::

:::exercice Problème 2 : des ensembles de points
Soit $A$ et $B$ deux points tels que $AB = 4$, et $I$ le milieu de $[AB]$.

1. En écrivant $\overrightarrow{MA} = \overrightarrow{MI} + \overrightarrow{IA}$ et $\overrightarrow{MB} = \overrightarrow{MI} - \overrightarrow{IA}$, montrer que $\overrightarrow{MA} \cdot \overrightarrow{MB} = MI^2 - 4$.
2. Déterminer l’ensemble des points $M$ tels que $\overrightarrow{MA} \cdot \overrightarrow{MB} = 0$.
3. Déterminer l’ensemble des points $M$ tels que $\overrightarrow{MA} \cdot \overrightarrow{MB} = 5$.
4. Existe-t-il des points $M$ tels que $\overrightarrow{MA} \cdot \overrightarrow{MB} = -5$ ?

:::corrige
1. $\overrightarrow{IB} = -\overrightarrow{IA}$, donc $\overrightarrow{MA} \cdot \overrightarrow{MB} = MI^2 - IA^2 = MI^2 - 4$, car $IA = 2$.
2. $MI^2 = 4$, soit $MI = 2$ : le cercle de centre $I$ et de rayon $2$, c’est-à-dire le cercle de diamètre $[AB]$.
3. $MI^2 = 9$ : le cercle de centre $I$ et de rayon $3$.
4. Il faudrait $MI^2 = -1$ : impossible, aucun point.
:::
:::
