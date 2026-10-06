---
title: Série 1 — partie 2 : règles de calcul et relations dans le triangle
kind: serie
summary: Calculs avec les règles du produit scalaire, Al-Kashi pour une longueur et pour les angles, théorème de la médiane, diagonales d’un losange, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Règles de calcul
On sait que $\|\vec{u}\| = 3$, $\|\vec{v}\| = 2$ et $\vec{u} \cdot \vec{v} = -1$. Calculer :

1. $(\vec{u} + \vec{v})^2$
2. $\|\vec{u} - \vec{v}\|$
3. $(2\vec{u} - \vec{v}) \cdot (\vec{u} + 3\vec{v})$

:::corrige
1. $9 + 2 \times (-1) + 4 = 11$.
2. $(\vec{u} - \vec{v})^2 = 9 + 2 + 4 = 15$, donc $\|\vec{u} - \vec{v}\| = \sqrt{15}$.
3. $2\vec{u}^2 + 6\vec{u} \cdot \vec{v} - \vec{v} \cdot \vec{u} - 3\vec{v}^2 = 18 - 6 + 1 - 12 = 1$.
:::
:::

:::exercice Al-Kashi
1. Dans un triangle $ABC$, $AB = 3$, $AC = 5$ et $\widehat{BAC} = 60°$. Calculer $BC$.
2. Un triangle a pour côtés $5$, $7$ et $8$. Calculer le cosinus de chacun de ses angles, et montrer que l’un mesure $60°$.

:::corrige
1. $BC^2 = 9 + 25 - 2 \times 3 \times 5 \times \frac{1}{2} = 19$, donc $BC = \sqrt{19}$.
2. Face au côté $8$ : $\frac{25 + 49 - 64}{70} = \frac{1}{7}$. Face au côté $5$ : $\frac{49 + 64 - 25}{112} = \frac{11}{14}$. Face au côté $7$ : $\frac{25 + 64 - 49}{80} = \frac{1}{2}$, donc cet angle mesure $60°$.
:::
:::

:::exercice Médiane
Dans un triangle $ABC$, $AB = 7$, $AC = 5$ et $BC = 6$. Soit $I$ le milieu de $[BC]$. Calculer $AI$.

:::corrige
$AB^2 + AC^2 = 2AI^2 + \frac{BC^2}{2}$ : $74 = 2AI^2 + 18$, donc $AI^2 = 28$ et $AI = 2\sqrt{7}$.
:::
:::

:::exercice Losange
Soit $ABCD$ un parallélogramme.

1. Montrer que $\overrightarrow{AC} \cdot \overrightarrow{BD} = AD^2 - AB^2$.
2. En déduire que les diagonales sont perpendiculaires si et seulement si $ABCD$ est un losange.

:::corrige
1. $\overrightarrow{AC} = \overrightarrow{AB} + \overrightarrow{AD}$ et $\overrightarrow{BD} = \overrightarrow{AD} - \overrightarrow{AB}$, donc le produit vaut $AD^2 - AB^2$.
2. Les diagonales sont perpendiculaires si et seulement si ce produit est nul, c’est-à-dire $AD = AB$ : deux côtés consécutifs égaux, donc un losange.
:::
:::
