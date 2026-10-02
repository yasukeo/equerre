---
title: Série 1 — partie 2 : trois points et applications
kind: serie
summary: Barycentre de trois points, barycentre partiel et construction, concours de droites, ensembles de points, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Coordonnées d’un barycentre de trois points
$A(0 ; 0)$, $B(4 ; 0)$, $C(0 ; 6)$. Calculer les coordonnées du barycentre $G$ de $\{(A ; 1), (B ; 1), (C ; 1)\}$, puis du barycentre $K$ de $\{(A ; 2), (B ; 1), (C ; 1)\}$.

:::corrige
$G\left(\frac{4}{3} ; 2\right)$ (centre de gravité). $K$ : $x_K = \frac{0 + 4 + 0}{4} = 1$, $y_K = \frac{6}{4} = \frac{3}{2}$, donc $K\left(1 ; \frac{3}{2}\right)$.
:::
:::

:::exercice Barycentre partiel
Soit $ABC$ un triangle et $G$ le barycentre de $\{(A ; 2), (B ; 1), (C ; 1)\}$. Soit $I$ le milieu de $[BC]$.

1. Montrer que $G$ est le barycentre de $\{(A ; 2), (I ; 2)\}$ et préciser sa position.
2. Construire $G$.

:::corrige
1. $I$ est le barycentre de $\{(B ; 1), (C ; 1)\}$ ; par associativité, $G$ est le barycentre de $\{(A ; 2), (I ; 2)\}$ : c’est le milieu de $[AI]$.
2. On construit le milieu $I$ de $[BC]$, puis le milieu de $[AI]$.
:::
:::

:::exercice Droites concourantes
Soit $ABC$ un triangle, $G$ le barycentre de $\{(A ; 1), (B ; 2), (C ; 3)\}$, $A'$ le barycentre de $\{(B ; 2), (C ; 3)\}$, $B'$ celui de $\{(A ; 1), (C ; 3)\}$ et $C'$ celui de $\{(A ; 1), (B ; 2)\}$.

Montrer que les droites $(AA')$, $(BB')$ et $(CC')$ sont concourantes.

:::corrige
Par associativité, $G$ est le barycentre de $\{(A ; 1), (A' ; 5)\}$, donc $G \in (AA')$ ; de $\{(B ; 2), (B' ; 4)\}$, donc $G \in (BB')$ ; de $\{(C ; 3), (C' ; 3)\}$, donc $G \in (CC')$. Les trois droites passent par $G$.
:::
:::

:::exercice Ensembles de points
Soit $A$ et $B$ tels que $AB = 4$, et $G$ le barycentre de $\{(A ; 3), (B ; 1)\}$.

1. Déterminer l’ensemble des points $M$ tels que $\left\|3\overrightarrow{MA} + \overrightarrow{MB}\right\| = 8$.
2. Déterminer l’ensemble des points $M$ tels que $\left\|3\overrightarrow{MA} + \overrightarrow{MB}\right\| = \left\|\overrightarrow{MA} - \overrightarrow{MB}\right\|$.

:::corrige
1. $3\overrightarrow{MA} + \overrightarrow{MB} = 4\overrightarrow{MG}$ : $4MG = 8$, soit $MG = 2$ : cercle de centre $G$ et de rayon $2$.
2. $\overrightarrow{MA} - \overrightarrow{MB} = \overrightarrow{BA}$, de norme $4$ : $4MG = 4$, soit $MG = 1$ : cercle de centre $G$ et de rayon $1$.
:::
:::
