---
title: Devoir surveillé : le produit scalaire
kind: devoir
summary: Un devoir d’une heure sur 20 points : produits scalaires dans un triangle équilatéral, Al-Kashi et médiane, règles de calcul et orthogonalité, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : triangle équilatéral
Soit $ABC$ un triangle équilatéral de côté $6$ et $I$ le milieu de $[BC]$. Calculer :

1. $\overrightarrow{AB} \cdot \overrightarrow{AC}$ (2 pts)
2. $\overrightarrow{AB} \cdot \overrightarrow{BC}$ (2 pts)
3. $\overrightarrow{AI} \cdot \overrightarrow{BC}$ (2 pts)

:::corrige
1. $6 \times 6 \times \cos 60° = 18$.
2. Angle de $120°$ entre les vecteurs : $36 \times \left(-\frac{1}{2}\right) = -18$.
3. La médiane $(AI)$ est aussi la hauteur : $0$.
:::
:::

:::exercice Exercice 2 (8 points) : dans un triangle
Soit $ABC$ un triangle avec $AB = 4$, $AC = 5$ et $BC = 6$.

1. Calculer $\overrightarrow{AB} \cdot \overrightarrow{AC}$. (3 pts)
2. En déduire $\cos \widehat{BAC}$. (2 pts)
3. Calculer la longueur de la médiane issue de $A$. (3 pts)

:::corrige
1. $BC^2 = AB^2 + AC^2 - 2\overrightarrow{AB} \cdot \overrightarrow{AC}$ : $36 = 41 - 2\overrightarrow{AB} \cdot \overrightarrow{AC}$, donc $\overrightarrow{AB} \cdot \overrightarrow{AC} = \frac{5}{2}$.
2. $\cos \widehat{BAC} = \frac{5/2}{4 \times 5} = \frac{1}{8}$.
3. $16 + 25 = 2AI^2 + 18$, donc $AI^2 = \frac{23}{2}$ et $AI = \frac{\sqrt{46}}{2}$.
:::
:::

:::exercice Exercice 3 (6 points) : règles de calcul
On sait que $\|\vec{u}\| = 2$, $\|\vec{v}\| = 5$ et que l’angle entre $\vec{u}$ et $\vec{v}$ vaut $\frac{\pi}{3}$.

1. Calculer $\vec{u} \cdot \vec{v}$. (2 pts)
2. Calculer $\|\vec{u} + \vec{v}\|$. (2 pts)
3. Trouver le réel $x$ tel que $\vec{u} + x\vec{v}$ soit orthogonal à $\vec{u}$. (2 pts)

:::corrige
1. $2 \times 5 \times \frac{1}{2} = 5$.
2. $(\vec{u} + \vec{v})^2 = 4 + 10 + 25 = 39$, donc $\|\vec{u} + \vec{v}\| = \sqrt{39}$.
3. $\vec{u} \cdot (\vec{u} + x\vec{v}) = 4 + 5x = 0$, donc $x = -\frac{4}{5}$.
:::
:::
