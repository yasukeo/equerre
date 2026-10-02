---
title: Produit scalaire dans l’espace — partie 1 : définition et orthogonalité
kind: cours
summary: Produit scalaire de deux vecteurs de l’espace, propriétés, expression dans un repère orthonormé, norme et distance, orthogonalité de vecteurs, de droites et de plans, vecteur normal à un plan.
position: 10
visibility: public
---

## Définition

:::definition
Soit $\vec{u}$ et $\vec{v}$ deux vecteurs de l’espace, et $A$, $B$, $C$ trois points tels que $\vec{u} = \overrightarrow{AB}$ et $\vec{v} = \overrightarrow{AC}$. Le **produit scalaire** $\vec{u} \cdot \vec{v}$ est le produit scalaire $\overrightarrow{AB} \cdot \overrightarrow{AC}$ calculé dans un plan contenant $A$, $B$, $C$ :

$$
\vec{u} \cdot \vec{v} = \|\vec{u}\| \times \|\vec{v}\| \times \cos\left(\widehat{BAC}\right)
$$
:::

Il a les mêmes propriétés que dans le plan : symétrie, bilinéarité, $\vec{u} \cdot \vec{u} = \|\vec{u}\|^2$, identités remarquables, projection orthogonale.

## Dans un repère orthonormé

L’espace est muni d’un repère orthonormé $(O, \vec{i}, \vec{j}, \vec{k})$.

:::propriete
Si $\vec{u}(x ; y ; z)$ et $\vec{v}(x' ; y' ; z')$ :

$$
\vec{u} \cdot \vec{v} = xx' + yy' + zz' \qquad \|\vec{u}\| = \sqrt{x^2 + y^2 + z^2} \qquad AB = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}
$$
:::

:::exemple
$\vec{u}(1 ; -2 ; 2)$ et $\vec{v}(2 ; 1 ; 0)$ : $\vec{u} \cdot \vec{v} = 2 - 2 + 0 = 0$, $\|\vec{u}\| = 3$, $\|\vec{v}\| = \sqrt{5}$.
:::

## Orthogonalité

:::propriete
- $\vec{u}$ et $\vec{v}$ sont **orthogonaux** si et seulement si $\vec{u} \cdot \vec{v} = 0$.
- Deux droites de vecteurs directeurs $\vec{u}$ et $\vec{v}$ sont **orthogonales** si $\vec{u} \cdot \vec{v} = 0$ (elles peuvent ne pas se couper : dans l’espace, « orthogonales » n’implique pas « sécantes »).
- Une droite est **orthogonale à un plan** si elle est orthogonale à deux droites sécantes de ce plan.
:::

## Vecteur normal à un plan

:::definition
Un vecteur $\vec{n}$ non nul est **normal** à un plan $(P)$ s’il est orthogonal à deux vecteurs directeurs (non colinéaires) de $(P)$ ; il est alors orthogonal à tout vecteur de $(P)$.
:::

:::exemple
Le plan dirigé par $\vec{u}(1 ; 0 ; 1)$ et $\vec{v}(0 ; 1 ; -1)$ : on cherche $\vec{n}(a ; b ; c)$ avec $a + c = 0$ et $b - c = 0$, par exemple $c = 1$ : $\vec{n}(-1 ; 1 ; 1)$.
:::

:::propriete
- Deux plans sont **parallèles** si leurs vecteurs normaux sont colinéaires.
- Deux plans sont **perpendiculaires** si leurs vecteurs normaux sont orthogonaux.
- Une droite est orthogonale à un plan si son vecteur directeur est colinéaire à un vecteur normal du plan.
:::
