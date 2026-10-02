---
title: La rotation — partie 2 : constructions et applications
kind: cours
summary: Construire l’image d’un point, d’une droite, d’un cercle, déterminer une rotation à partir de deux points et de leurs images, utiliser une rotation pour démontrer des égalités de longueurs, des alignements et des angles.
position: 20
visibility: public
---

## Construire une image

Pour construire l’image $M'$ de $M$ par la rotation de centre $\Omega$ et d’angle $\theta$ :

1. on trace le cercle de centre $\Omega$ passant par $M$ ;
2. on reporte l’angle $\theta$ à partir de la demi-droite $[\Omega M)$, dans le sens indiqué par le signe de $\theta$ ;
3. $M'$ est à l’intersection de ce cercle et de la demi-droite obtenue.

Pour l’image d’une droite, il suffit de construire les images de deux de ses points ; pour un cercle, l’image de son centre.

## Déterminer une rotation

:::propriete
Soit $A$, $B$, $A'$, $B'$ quatre points avec $AB = A'B' \neq 0$ et $\overrightarrow{AB} \neq \overrightarrow{A'B'}$. Il existe une **unique** rotation qui transforme $A$ en $A'$ et $B$ en $B'$. Son angle est une mesure de $\left(\overrightarrow{AB}, \overrightarrow{A'B'}\right)$, et son centre est sur la **médiatrice** de $[AA']$ et sur celle de $[BB']$.
:::

:::exemple
$ABCD$ est un carré direct de centre $O$. La rotation de centre $O$ et d’angle $\frac{\pi}{2}$ transforme $A$ en $B$, $B$ en $C$, $C$ en $D$ et $D$ en $A$ : elle laisse le carré globalement invariant.
:::

## Démontrer avec une rotation

### Égalité de longueurs

:::exemple
Soit $ABC$ un triangle, et $ABD$, $ACE$ deux triangles équilatéraux construits à l’extérieur de $ABC$. La rotation $R$ de centre $A$ et d’angle $\frac{\pi}{3}$ (dans le bon sens) transforme $D$ en $B$ et $C$ en $E$. Elle transforme donc le segment $[DC]$ en $[BE]$ : $DC = BE$, et l’angle entre les droites $(DC)$ et $(BE)$ vaut $\frac{\pi}{3}$.
:::

### Alignement et concours

Une rotation transforme trois points alignés en trois points alignés, et deux droites concourantes en deux droites concourantes : on peut transporter une propriété d’une figure à son image.

### Triangles rectangles isocèles et équilatéraux

:::propriete
- $B'$ est l’image de $B$ par la rotation de centre $A$ et d’angle $\pm\frac{\pi}{2}$ si et seulement si $ABB'$ est rectangle isocèle en $A$.
- $B'$ est l’image de $B$ par la rotation de centre $A$ et d’angle $\pm\frac{\pi}{3}$ si et seulement si $ABB'$ est équilatéral.
:::

:::attention
Le sens de la rotation compte : une rotation d’angle $\frac{\pi}{2}$ et une rotation d’angle $-\frac{\pi}{2}$ de même centre n’ont pas les mêmes images. Repérez le sens sur la figure avant de conclure.
:::
