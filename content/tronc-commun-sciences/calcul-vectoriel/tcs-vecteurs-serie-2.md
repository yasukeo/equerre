---
title: Série 1 — partie 2 : produit par un réel et colinéarité
kind: serie
summary: Calculs avec le produit par un réel, construire des points, démontrer un alignement et un parallélisme, centre de gravité, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Calculs
Simplifier :

1. $2(\vec{u} + 3\vec{v}) - 5(\vec{u} - \vec{v})$
2. $\frac{1}{2}\left(4\overrightarrow{AB} - 2\overrightarrow{AC}\right) + \overrightarrow{CA}$

:::corrige
1. $2\vec{u} + 6\vec{v} - 5\vec{u} + 5\vec{v} = -3\vec{u} + 11\vec{v}$.
2. $2\overrightarrow{AB} - \overrightarrow{AC} - \overrightarrow{AC} = 2\overrightarrow{AB} - 2\overrightarrow{AC} = 2\overrightarrow{CB}$.
:::
:::

:::exercice Alignement
Soit $ABC$ un triangle. On définit $E$ par $\overrightarrow{AE} = 3\overrightarrow{AB}$ et $F$ par $\overrightarrow{AF} = \overrightarrow{AB} + \frac{2}{3}\overrightarrow{BC}$.

1. Exprimer $\overrightarrow{AF}$ en fonction de $\overrightarrow{AB}$ et $\overrightarrow{AC}$.
2. Exprimer $\overrightarrow{CE}$ et $\overrightarrow{CF}$ en fonction de $\overrightarrow{AB}$ et $\overrightarrow{AC}$.
3. Les points $C$, $E$, $F$ sont-ils alignés ?

:::corrige
1. $\overrightarrow{AF} = \overrightarrow{AB} + \frac{2}{3}\left(\overrightarrow{AC} - \overrightarrow{AB}\right) = \frac{1}{3}\overrightarrow{AB} + \frac{2}{3}\overrightarrow{AC}$.
2. $\overrightarrow{CE} = \overrightarrow{CA} + \overrightarrow{AE} = 3\overrightarrow{AB} - \overrightarrow{AC}$ ; $\overrightarrow{CF} = \overrightarrow{CA} + \overrightarrow{AF} = \frac{1}{3}\overrightarrow{AB} - \frac{1}{3}\overrightarrow{AC}$.
3. Pour que $\overrightarrow{CE} = k\overrightarrow{CF}$, il faudrait $3 = \frac{k}{3}$ et $-1 = -\frac{k}{3}$, soit $k = 9$ et $k = 3$ : impossible. Les points ne sont pas alignés.
:::
:::

:::exercice Dans un parallélogramme
Soit $ABCD$ un parallélogramme, $E$ défini par $\overrightarrow{BE} = \frac{1}{2}\overrightarrow{BC}$ et $F$ par $\overrightarrow{AF} = 2\overrightarrow{AE}$.

1. Exprimer $\overrightarrow{AE}$ en fonction de $\overrightarrow{AB}$ et $\overrightarrow{AD}$.
2. En déduire $\overrightarrow{AF}$, puis $\overrightarrow{DF}$.
3. Montrer que $D$, $C$, $F$ sont alignés.

:::corrige
1. $\overrightarrow{BC} = \overrightarrow{AD}$, donc $\overrightarrow{AE} = \overrightarrow{AB} + \frac{1}{2}\overrightarrow{AD}$.
2. $\overrightarrow{AF} = 2\overrightarrow{AB} + \overrightarrow{AD}$, et $\overrightarrow{DF} = \overrightarrow{DA} + \overrightarrow{AF} = 2\overrightarrow{AB}$.
3. $\overrightarrow{DC} = \overrightarrow{AB}$, donc $\overrightarrow{DF} = 2\overrightarrow{DC}$ : les vecteurs sont colinéaires et $D$, $C$, $F$ sont alignés.
:::
:::

:::exercice Centre de gravité
Soit $ABC$ un triangle de centre de gravité $G$.

1. Montrer que pour tout point $M$ : $\overrightarrow{MA} + \overrightarrow{MB} + \overrightarrow{MC} = 3\overrightarrow{MG}$.
2. En déduire $\overrightarrow{AG}$ en fonction de $\overrightarrow{AB}$ et $\overrightarrow{AC}$.

:::corrige
1. On insère $G$ : $\overrightarrow{MA} + \overrightarrow{MB} + \overrightarrow{MC} = 3\overrightarrow{MG} + \overrightarrow{GA} + \overrightarrow{GB} + \overrightarrow{GC} = 3\overrightarrow{MG}$.
2. Avec $M = A$ : $\vec{0} + \overrightarrow{AB} + \overrightarrow{AC} = 3\overrightarrow{AG}$, soit $\overrightarrow{AG} = \frac{1}{3}\overrightarrow{AB} + \frac{1}{3}\overrightarrow{AC}$.
:::
:::
