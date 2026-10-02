---
title: La rotation — partie 1 : définition et propriétés
kind: cours
summary: Angles orientés, définition d’une rotation par son centre et son angle, rotation réciproque, propriétés de conservation (distances, angles, alignement, milieux, barycentres).
position: 10
visibility: public
---

## Angles orientés

Le plan est **orienté** : le sens direct (ou positif) est le sens inverse des aiguilles d’une montre. Une mesure de l’angle orienté $\left(\overrightarrow{OA}, \overrightarrow{OB}\right)$ est définie à $2\pi$ près.

:::propriete
**Relation de Chasles** : $\left(\vec{u}, \vec{v}\right) + \left(\vec{v}, \vec{w}\right) \equiv \left(\vec{u}, \vec{w}\right) \ [2\pi]$. Et $\left(\vec{v}, \vec{u}\right) \equiv -\left(\vec{u}, \vec{v}\right) \ [2\pi]$.
:::

## Définition

:::definition
Soit $\Omega$ un point et $\theta$ un réel. La **rotation** $R$ de centre $\Omega$ et d’angle $\theta$ est la transformation qui :

- laisse $\Omega$ fixe : $R(\Omega) = \Omega$ ;
- à tout point $M \neq \Omega$ associe le point $M'$ tel que $\Omega M' = \Omega M$ et $\left(\overrightarrow{\Omega M}, \overrightarrow{\Omega M'}\right) \equiv \theta \ [2\pi]$.
:::

:::exemple
- La rotation d’angle $\pi$ est la **symétrie centrale** de centre $\Omega$.
- La rotation d’angle $0$ est l’identité : chaque point est sa propre image.
- Un **quart de tour** direct est une rotation d’angle $\frac{\pi}{2}$.
:::

:::propriete
- La rotation de centre $\Omega$ et d’angle $\theta$ est une bijection ; sa **réciproque** est la rotation de même centre et d’angle $-\theta$.
- Si $\theta \not\equiv 0 \ [2\pi]$, le seul point fixe est $\Omega$.
:::

## Propriétés de conservation

:::theoreme
Une rotation **conserve les distances** : si $R(A) = A'$ et $R(B) = B'$, alors $A'B' = AB$. De plus, $\left(\overrightarrow{AB}, \overrightarrow{A'B'}\right) \equiv \theta \ [2\pi]$.
:::

:::propriete
Une rotation conserve :

- l’alignement (l’image d’une droite est une droite) ;
- le parallélisme et l’orthogonalité ;
- les angles orientés ;
- les milieux et, plus généralement, les barycentres ;
- les aires.
:::

:::propriete
- L’image d’un segment $[AB]$ est le segment $[A'B']$, de même longueur.
- L’image d’un cercle de centre $I$ et de rayon $r$ est le cercle de centre $I' = R(I)$ et de même rayon $r$.
- L’image d’une droite $(D)$ est une droite $(D')$ ; l’angle entre $(D)$ et $(D')$ vaut $\theta$ (modulo $\pi$).
:::

:::exemple
Soit $ABC$ un triangle et $R$ la rotation de centre $A$ et d’angle $\frac{\pi}{3}$. Si $R(B) = B'$, le triangle $ABB'$ est **équilatéral** : $AB' = AB$ et l’angle en $A$ vaut $\frac{\pi}{3}$.
:::
