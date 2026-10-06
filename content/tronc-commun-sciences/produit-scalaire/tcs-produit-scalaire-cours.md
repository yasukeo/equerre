---
title: Le produit scalaire — partie 1 : définitions
kind: cours
summary: Produit scalaire défini par la projection orthogonale, puis par les normes et le cosinus, carré scalaire, et orthogonalité de deux vecteurs.
position: 10
visibility: public
---

## Définition par la projection orthogonale

:::definition
Soit $A$, $B$, $C$ trois points avec $A \neq B$, et $H$ le projeté orthogonal de $C$ sur la droite $(AB)$. Le **produit scalaire** $\overrightarrow{AB} \cdot \overrightarrow{AC}$ est le réel :

- $AB \times AH$ si $\overrightarrow{AB}$ et $\overrightarrow{AH}$ ont le même sens ;
- $-AB \times AH$ s’ils sont de sens contraires.

Si $A = B$, le produit scalaire est nul.
:::

:::exemple
Soit $ABCD$ un carré de côté $a$.

- Le projeté de $C$ sur $(AB)$ est $B$ : $\overrightarrow{AB} \cdot \overrightarrow{AC} = AB \times AB = a^2$.
- Le projeté de $D$ sur $(AB)$ est $A$ : $\overrightarrow{AB} \cdot \overrightarrow{AD} = 0$.
- $\overrightarrow{CD} = -\overrightarrow{AB}$, et $\overrightarrow{AB} \cdot \overrightarrow{CD} = -a^2$.
:::

## Définition par le cosinus

:::propriete
Si $\vec{u}$ et $\vec{v}$ sont non nuls et forment un angle $\theta$ :

$$
\vec{u} \cdot \vec{v} = \|\vec{u}\| \times \|\vec{v}\| \times \cos\theta
$$

En particulier, $\overrightarrow{AB} \cdot \overrightarrow{AC} = AB \times AC \times \cos \widehat{BAC}$.
:::

:::exemple
Dans un triangle équilatéral de côté $4$ : $\overrightarrow{AB} \cdot \overrightarrow{AC} = 4 \times 4 \times \cos 60° = 8$.
:::

:::propriete
- Si l’angle est aigu, le produit scalaire est positif ; s’il est obtus, il est négatif.
- Le **carré scalaire** est $\vec{u} \cdot \vec{u} = \vec{u}^2 = \|\vec{u}\|^2$ ; ainsi $\overrightarrow{AB}^2 = AB^2$.
:::

## Orthogonalité

:::definition
Deux vecteurs sont **orthogonaux** si l’un est nul ou si leurs directions sont perpendiculaires.
:::

:::theoreme
$\vec{u}$ et $\vec{v}$ sont orthogonaux si et seulement si $\vec{u} \cdot \vec{v} = 0$.
:::

:::exemple
Pour un point $M$ du cercle de diamètre $[AB]$, distinct de $A$ et $B$, l’angle $\widehat{AMB}$ est droit : $\overrightarrow{MA} \cdot \overrightarrow{MB} = 0$.
:::

:::attention
Un produit scalaire est un **nombre**, pas un vecteur : on ne peut pas écrire $\vec{u} \cdot \vec{v} = \vec{0}$.
:::
