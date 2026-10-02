---
title: Série 1 — partie 1 : définition et propriétés
kind: serie
summary: Calculer un produit scalaire de plusieurs façons, orthogonalité, identités remarquables, Al-Kashi et théorème de la médiane, ensembles de points, avec les corrigés.
position: 10
visibility: public
---

Cinq exercices sur la première partie du cours.

:::exercice Calculer un produit scalaire
$ABCD$ est un carré de côté $3$.

1. Calculer $\overrightarrow{AB} \cdot \overrightarrow{AC}$ par la projection.
2. Calculer $\overrightarrow{AB} \cdot \overrightarrow{AC}$ avec le cosinus.
3. Calculer $\overrightarrow{AB} \cdot \overrightarrow{CD}$ et $\overrightarrow{AC} \cdot \overrightarrow{BD}$.

:::corrige
1. Le projeté de $C$ sur $(AB)$ est $B$ : $\overrightarrow{AB} \cdot \overrightarrow{AC} = AB \times AB = 9$.
2. $AC = 3\sqrt{2}$ et l’angle vaut $45°$ : $3 \times 3\sqrt{2} \times \frac{\sqrt{2}}{2} = 9$.
3. $\overrightarrow{CD} = -\overrightarrow{AB}$ : $\overrightarrow{AB} \cdot \overrightarrow{CD} = -9$. Les diagonales d’un carré sont perpendiculaires : $\overrightarrow{AC} \cdot \overrightarrow{BD} = 0$.
:::
:::

:::exercice Avec les normes
$\|\vec{u}\| = 3$, $\|\vec{v}\| = 2$ et $\vec{u} \cdot \vec{v} = -1$.

1. Calculer $\|\vec{u} + \vec{v}\|$ et $\|\vec{u} - 2\vec{v}\|$.
2. Calculer $(\vec{u} + \vec{v}) \cdot (2\vec{u} - \vec{v})$.

:::corrige
1. $\|\vec{u} + \vec{v}\|^2 = 9 - 2 + 4 = 11$, donc $\sqrt{11}$. $\|\vec{u} - 2\vec{v}\|^2 = 9 + 4 + 16 = 29$ (car $-4\vec{u} \cdot \vec{v} = 4$), donc $\sqrt{29}$.
2. $2\|\vec{u}\|^2 - \vec{u} \cdot \vec{v} + 2\vec{v} \cdot \vec{u} - \|\vec{v}\|^2 = 18 + 1 - 2 - 4 = 13$.
:::
:::

:::exercice Al-Kashi
Dans un triangle $ABC$, $AB = 6$, $AC = 4$ et $BC = 5$.

1. Calculer $\cos\hat{A}$.
2. Calculer $\overrightarrow{AB} \cdot \overrightarrow{AC}$.

:::corrige
1. $25 = 16 + 36 - 48\cos\hat{A}$, donc $\cos\hat{A} = \frac{27}{48} = \frac{9}{16}$.
2. $6 \times 4 \times \frac{9}{16} = \frac{27}{2}$.
:::
:::

:::exercice Théorème de la médiane
Dans un triangle $ABC$, $AB = 4$, $AC = 6$, $BC = 8$. Soit $I$ le milieu de $[BC]$.

Calculer la longueur de la médiane $AI$.

:::corrige
$AB^2 + AC^2 = 2AI^2 + \frac{BC^2}{2}$ : $16 + 36 = 2AI^2 + 32$, donc $AI^2 = 10$ et $AI = \sqrt{10}$.
:::
:::

:::exercice Ensembles de points
Soit $A$ et $B$ deux points tels que $AB = 6$, et $I$ le milieu de $[AB]$.

1. Déterminer l’ensemble des points $M$ tels que $\overrightarrow{MA} \cdot \overrightarrow{MB} = 7$.
2. Déterminer l’ensemble des points $M$ tels que $MA^2 + MB^2 = 50$.

:::corrige
1. $MI^2 - 9 = 7$, donc $MI = 4$ : cercle de centre $I$ et de rayon $4$.
2. $2MI^2 + 18 = 50$, donc $MI^2 = 16$ et $MI = 4$ : le même cercle.
:::
:::
