---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes dans un tétraèdre et un cube : section d’un tétraèdre par un plan parallèle à une arête, puis points définis vectoriellement et coplanarité, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un plan parallèle à une arête
$ABCD$ est un tétraèdre. $I$ est le milieu de $[AB]$, $J$ celui de $[AC]$ et $K$ celui de $[CD]$.

1. Montrer que $(IJ)$ est parallèle à $(BC)$.
2. En déduire que la droite $(BC)$ est parallèle au plan $(IJK)$.
3. Le plan $(IJK)$ coupe $(BD)$ en un point $L$. Montrer que $(KL)$ est parallèle à $(BC)$, et en déduire que $L$ est le milieu de $[BD]$.
4. Quelle est la nature du quadrilatère $IJKL$ ?

:::corrige
1. Théorème des milieux dans $ABC$ : $\overrightarrow{IJ} = \frac{1}{2}\overrightarrow{BC}$.
2. $(BC)$ est parallèle à $(IJ)$, droite du plan $(IJK)$.
3. Le plan $(BCD)$ contient $(BC)$, parallèle à $(IJK)$, et coupe $(IJK)$ selon $(KL)$ : $(KL)$ est parallèle à $(BC)$. Dans le triangle $BCD$, $K$ est le milieu de $[CD]$ et $(KL)$ est parallèle à $(BC)$ : $L$ est le milieu de $[BD]$.
4. $\overrightarrow{IJ} = \frac{1}{2}\overrightarrow{BC} = \overrightarrow{LK}$ : $IJKL$ est un parallélogramme.
:::
:::

:::exercice Problème 2 : coplanarité dans un cube
$ABCDEFGH$ est un cube. On pose $\vec{i} = \overrightarrow{AB}$, $\vec{j} = \overrightarrow{AD}$, $\vec{k} = \overrightarrow{AE}$. Soit $M$ tel que $\overrightarrow{AM} = \frac{1}{2}\vec{i} + \vec{j} + \frac{1}{2}\vec{k}$ et $N$ le centre de la face $BCGF$.

1. Exprimer $\overrightarrow{AN}$ dans la base $(\vec{i}, \vec{j}, \vec{k})$.
2. Montrer que $M$ est le centre de la face $DCGH$.
3. Montrer que les vecteurs $\overrightarrow{AM}$, $\overrightarrow{AN}$ et $\overrightarrow{AG}$ sont coplanaires.

:::corrige
1. $N$ est le milieu de $[BG]$ : $\overrightarrow{AN} = \frac{1}{2}\left(\overrightarrow{AB} + \overrightarrow{AG}\right) = \frac{1}{2}\left(\vec{i} + \vec{i} + \vec{j} + \vec{k}\right) = \vec{i} + \frac{1}{2}\vec{j} + \frac{1}{2}\vec{k}$.
2. Le centre de $DCGH$ est le milieu de $[DG]$ : $\frac{1}{2}\left(\overrightarrow{AD} + \overrightarrow{AG}\right) = \frac{1}{2}\left(\vec{j} + \vec{i} + \vec{j} + \vec{k}\right) = \frac{1}{2}\vec{i} + \vec{j} + \frac{1}{2}\vec{k} = \overrightarrow{AM}$.
3. $\overrightarrow{AM} + \overrightarrow{AN} = \frac{3}{2}\left(\vec{i} + \vec{j} + \vec{k}\right) = \frac{3}{2}\overrightarrow{AG}$ : $\overrightarrow{AG}$ est combinaison linéaire de $\overrightarrow{AM}$ et $\overrightarrow{AN}$.
:::
:::
