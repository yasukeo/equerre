---
title: Le produit scalaire — partie 1 : définition et propriétés
kind: cours
summary: Définition du produit scalaire par le cosinus et par la projection, orthogonalité, propriétés de calcul, identités remarquables, théorème d’Al-Kashi et théorème de la médiane.
position: 10
visibility: public
---

## Définition

:::definition
Soit $\vec{u}$ et $\vec{v}$ deux vecteurs non nuls, et $\theta$ une mesure de l’angle $(\vec{u}, \vec{v})$. Le **produit scalaire** de $\vec{u}$ et $\vec{v}$ est le réel :

$$
\vec{u} \cdot \vec{v} = \|\vec{u}\| \times \|\vec{v}\| \times \cos\theta
$$

Si l’un des vecteurs est nul, $\vec{u} \cdot \vec{v} = 0$.
:::

:::propriete
**Avec la projection.** Si $\vec{u} = \overrightarrow{AB}$, $\vec{v} = \overrightarrow{AC}$ et si $H$ est le projeté orthogonal de $C$ sur la droite $(AB)$ :

- $\overrightarrow{AB} \cdot \overrightarrow{AC} = AB \times AH$ si $\overrightarrow{AB}$ et $\overrightarrow{AH}$ ont le même sens ;
- $\overrightarrow{AB} \cdot \overrightarrow{AC} = -AB \times AH$ s’ils sont de sens contraires.
:::

:::exemple
Dans un triangle équilatéral $ABC$ de côté $4$ : $\overrightarrow{AB} \cdot \overrightarrow{AC} = 4 \times 4 \times \cos 60° = 8$.
:::

## Orthogonalité

:::propriete
$\vec{u} \cdot \vec{v} = 0$ si et seulement si $\vec{u}$ et $\vec{v}$ sont **orthogonaux** (l’un des deux est nul, ou leurs directions sont perpendiculaires).
:::

## Propriétés de calcul

:::propriete
Pour tous vecteurs $\vec{u}$, $\vec{v}$, $\vec{w}$ et tout réel $k$ :

- $\vec{u} \cdot \vec{v} = \vec{v} \cdot \vec{u}$ ;
- $\vec{u} \cdot (\vec{v} + \vec{w}) = \vec{u} \cdot \vec{v} + \vec{u} \cdot \vec{w}$ ;
- $(k\vec{u}) \cdot \vec{v} = k(\vec{u} \cdot \vec{v})$ ;
- $\vec{u} \cdot \vec{u} = \|\vec{u}\|^2$, noté $\vec{u}^2$.
:::

:::propriete
**Identités remarquables.**

$$
\|\vec{u} + \vec{v}\|^2 = \|\vec{u}\|^2 + 2\vec{u} \cdot \vec{v} + \|\vec{v}\|^2 \qquad (\vec{u} + \vec{v}) \cdot (\vec{u} - \vec{v}) = \|\vec{u}\|^2 - \|\vec{v}\|^2
$$

D’où : $\vec{u} \cdot \vec{v} = \frac{1}{2}\left(\|\vec{u} + \vec{v}\|^2 - \|\vec{u}\|^2 - \|\vec{v}\|^2\right)$.
:::

## Théorème d’Al-Kashi

:::theoreme
Dans un triangle $ABC$, avec $a = BC$, $b = CA$, $c = AB$ et $\hat{A}$ l’angle en $A$ :

$$
a^2 = b^2 + c^2 - 2bc\cos\hat{A}
$$

Si $\hat{A}$ est droit, on retrouve le théorème de Pythagore.
:::

:::exemple
$AB = 5$, $AC = 3$ et $\hat{A} = 60°$ : $BC^2 = 9 + 25 - 2 \times 3 \times 5 \times \frac{1}{2} = 19$, donc $BC = \sqrt{19}$.
:::

## Théorème de la médiane

:::theoreme
Soit $I$ le milieu de $[AB]$. Pour tout point $M$ :

$$
MA^2 + MB^2 = 2MI^2 + \frac{AB^2}{2} \qquad \text{et} \qquad \overrightarrow{MA} \cdot \overrightarrow{MB} = MI^2 - \frac{AB^2}{4}
$$
:::

:::exemple
**Ensemble de points.** Avec $AB = 4$, l’ensemble des points $M$ tels que $\overrightarrow{MA} \cdot \overrightarrow{MB} = 5$ vérifie $MI^2 - 4 = 5$, soit $MI = 3$ : c’est le cercle de centre $I$ et de rayon $3$. Celui des points tels que $\overrightarrow{MA} \cdot \overrightarrow{MB} = 0$ est le cercle de diamètre $[AB]$.
:::
