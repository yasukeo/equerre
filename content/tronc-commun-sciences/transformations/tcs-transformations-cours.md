---
title: Transformations du plan — partie 1 : translation et symétries
kind: cours
summary: Translation, symétrie centrale et symétrie axiale, leurs caractérisations vectorielles, images en coordonnées, et les propriétés conservées : distances, alignement, parallélisme, milieux et angles.
position: 10
visibility: public
---

## Translation

:::definition
Soit $\vec{u}$ un vecteur. La **translation** de vecteur $\vec{u}$, notée $t_{\vec{u}}$, associe à tout point $M$ le point $M'$ tel que $\overrightarrow{MM'} = \vec{u}$.
:::

:::propriete
Si $t_{\vec{u}}(A) = A'$ et $t_{\vec{u}}(B) = B'$, alors $\overrightarrow{A'B'} = \overrightarrow{AB}$ : le quadrilatère $ABB'A'$ est un parallélogramme. En coordonnées, si $\vec{u}(a ; b)$, l’image de $M(x ; y)$ est $M'(x + a ; y + b)$.
:::

## Symétrie centrale

:::definition
Soit $\Omega$ un point. La **symétrie centrale** de centre $\Omega$, notée $S_\Omega$, associe à $M$ le point $M'$ tel que $\Omega$ soit le milieu de $[MM']$, c’est-à-dire $\overrightarrow{\Omega M'} = -\overrightarrow{\Omega M}$.
:::

:::propriete
Si $S_\Omega(A) = A'$ et $S_\Omega(B) = B'$, alors $\overrightarrow{A'B'} = -\overrightarrow{AB}$. En coordonnées, si $\Omega(a ; b)$, l’image de $M(x ; y)$ est $M'(2a - x ; 2b - y)$.
:::

## Symétrie axiale

:::definition
Soit $(D)$ une droite. La **symétrie axiale** d’axe $(D)$ associe à un point $M$ de $(D)$ le point $M$ lui-même, et à un point $M$ hors de $(D)$ le point $M'$ tel que $(D)$ soit la **médiatrice** de $[MM']$.
:::

## Propriétés conservées

:::propriete
La translation, la symétrie centrale et la symétrie axiale **conservent** :

- les distances : $A'B' = AB$ ;
- l’alignement : les images de points alignés sont alignées ;
- le parallélisme et l’orthogonalité ;
- le milieu : l’image du milieu de $[AB]$ est le milieu de $[A'B']$ ;
- les mesures des angles géométriques.
:::

:::propriete
- L’image d’une droite est une droite ; par une translation ou une symétrie centrale, elle lui est **parallèle**.
- L’image d’un cercle de centre $O$ et de rayon $r$ est le cercle de centre $O'$ (image de $O$) et de même rayon $r$.
:::

:::exemple
Soit $ABCD$ un parallélogramme de centre $O$. La symétrie de centre $O$ envoie $A$ sur $C$ et $B$ sur $D$ : elle envoie la droite $(AB)$ sur la droite $(CD)$, qui lui est parallèle, et le segment $[AB]$ sur $[CD]$, de même longueur.
:::

:::attention
Une symétrie axiale ne transforme pas une droite en une droite parallèle en général : seulement si la droite est parallèle ou perpendiculaire à l’axe.
:::
