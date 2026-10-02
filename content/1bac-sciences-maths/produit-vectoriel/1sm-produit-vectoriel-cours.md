---
title: Le produit vectoriel — partie 1 : définition et calcul
kind: cours
summary: Orientation de l’espace, définition géométrique du produit vectoriel, propriétés, expression dans un repère orthonormé direct, colinéarité.
position: 10
visibility: public
---

## Orientation de l’espace

Un repère orthonormé $(O, \vec{i}, \vec{j}, \vec{k})$ est **direct** si un observateur placé debout le long de $\vec{k}$, regardant dans la direction de $\vec{i}$, a $\vec{j}$ à sa gauche (règle de la main droite : pouce $\vec{i}$, index $\vec{j}$, majeur $\vec{k}$).

## Définition

:::definition
Soit $\vec{u}$ et $\vec{v}$ deux vecteurs. Le **produit vectoriel** $\vec{u} \wedge \vec{v}$ est :

- le vecteur nul si $\vec{u}$ et $\vec{v}$ sont colinéaires ;
- sinon, le vecteur $\vec{w}$ tel que : $\vec{w}$ est orthogonal à $\vec{u}$ et à $\vec{v}$ ; la base $(\vec{u}, \vec{v}, \vec{w})$ est directe ; et $\|\vec{w}\| = \|\vec{u}\| \times \|\vec{v}\| \times \sin\theta$, où $\theta \in [0 ; \pi]$ est l’angle entre $\vec{u}$ et $\vec{v}$.
:::

:::exemple
Dans une base orthonormée directe : $\vec{i} \wedge \vec{j} = \vec{k}$, $\vec{j} \wedge \vec{k} = \vec{i}$, $\vec{k} \wedge \vec{i} = \vec{j}$, et $\vec{j} \wedge \vec{i} = -\vec{k}$.
:::

## Propriétés

:::propriete
Pour tous vecteurs $\vec{u}$, $\vec{v}$, $\vec{w}$ et tout réel $k$ :

- **antisymétrie** : $\vec{v} \wedge \vec{u} = -\vec{u} \wedge \vec{v}$ ;
- $(k\vec{u}) \wedge \vec{v} = k(\vec{u} \wedge \vec{v})$ ;
- $\vec{u} \wedge (\vec{v} + \vec{w}) = \vec{u} \wedge \vec{v} + \vec{u} \wedge \vec{w}$ ;
- $\vec{u} \wedge \vec{v} = \vec{0} \iff \vec{u}$ et $\vec{v}$ sont colinéaires.
:::

:::attention
Le produit vectoriel n’est pas commutatif : $\vec{u} \wedge \vec{v} = -\vec{v} \wedge \vec{u}$.
:::

## Expression analytique

:::propriete
Dans un repère orthonormé direct, si $\vec{u}(x ; y ; z)$ et $\vec{v}(x' ; y' ; z')$ :

$$
\vec{u} \wedge \vec{v} = \begin{vmatrix} y & y' \\ z & z' \end{vmatrix}\vec{i} - \begin{vmatrix} x & x' \\ z & z' \end{vmatrix}\vec{j} + \begin{vmatrix} x & x' \\ y & y' \end{vmatrix}\vec{k} = (yz' - zy')\vec{i} - (xz' - zx')\vec{j} + (xy' - yx')\vec{k}
$$
:::

:::exemple
$\vec{u}(1 ; 2 ; 3)$ et $\vec{v}(2 ; 0 ; 1)$ : $\vec{u} \wedge \vec{v} = (2 \times 1 - 3 \times 0)\vec{i} - (1 \times 1 - 3 \times 2)\vec{j} + (1 \times 0 - 2 \times 2)\vec{k} = 2\vec{i} + 5\vec{j} - 4\vec{k}$. Vérification : $(2 ; 5 ; -4) \cdot (1 ; 2 ; 3) = 2 + 10 - 12 = 0$ et $(2 ; 5 ; -4) \cdot (2 ; 0 ; 1) = 4 - 4 = 0$.
:::
