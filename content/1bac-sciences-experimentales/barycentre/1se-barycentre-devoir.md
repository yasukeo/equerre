---
title: Devoir surveillé : le barycentre
kind: devoir
summary: Un devoir d’une heure sur 20 points : construction et coordonnées, barycentre partiel et alignement, un ensemble de points, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : barycentre de deux points
Soit $A(1 ; 3)$ et $B(4 ; -3)$.

1. Calculer les coordonnées du barycentre $G$ de $\{(A ; 2), (B ; 1)\}$. (2 pts)
2. Exprimer $\overrightarrow{AG}$ en fonction de $\overrightarrow{AB}$. (2 pts)
3. Le point $C(7 ; -9)$ est-il barycentre de $A$ et $B$ ? Si oui, avec quels coefficients ? (2 pts)

:::corrige
1. $G\left(\frac{2 + 4}{3} ; \frac{6 - 3}{3}\right) = (2 ; 1)$.
2. $\overrightarrow{AG} = \frac{1}{3}\overrightarrow{AB}$.
3. $\overrightarrow{AB}(3 ; -6)$ et $\overrightarrow{AC}(6 ; -12) = 2\overrightarrow{AB}$ : $C$ est sur $(AB)$ et $\frac{\beta}{\alpha + \beta} = 2$, par exemple $\alpha = -1$, $\beta = 2$ : $C$ est le barycentre de $\{(A ; -1), (B ; 2)\}$.
:::
:::

:::exercice Exercice 2 (8 points) : trois points
Soit $ABC$ un triangle, $I$ le milieu de $[AB]$ et $G$ le barycentre de $\{(A ; 1), (B ; 1), (C ; 2)\}$.

1. Montrer que $G$ est le milieu de $[IC]$. (3 pts)
2. Soit $J$ le barycentre de $\{(A ; 1), (C ; 2)\}$. Montrer que $B$, $G$ et $J$ sont alignés. (3 pts)
3. Construire $I$, $J$ et $G$ sur une figure. (2 pts)

:::corrige
1. $I$ est le barycentre de $\{(A ; 1), (B ; 1)\}$, donc $G$ est celui de $\{(I ; 2), (C ; 2)\}$ : le milieu de $[IC]$.
2. $G$ est aussi le barycentre de $\{(J ; 3), (B ; 1)\}$ : il est sur $(BJ)$.
3. $I$ milieu de $[AB]$ ; $\overrightarrow{AJ} = \frac{2}{3}\overrightarrow{AC}$ ; $G$ milieu de $[IC]$, qui est aussi sur $(BJ)$.
:::
:::

:::exercice Exercice 3 (6 points) : un ensemble de points
Soit $A$ et $B$ tels que $AB = 6$, et $G$ le barycentre de $\{(A ; 1), (B ; 2)\}$.

1. Calculer $AG$. (2 pts)
2. Déterminer l’ensemble des points $M$ tels que $\left\|\overrightarrow{MA} + 2\overrightarrow{MB}\right\| = 12$. (4 pts)

:::corrige
1. $\overrightarrow{AG} = \frac{2}{3}\overrightarrow{AB}$, donc $AG = 4$.
2. $\overrightarrow{MA} + 2\overrightarrow{MB} = 3\overrightarrow{MG}$ : $3MG = 12$, $MG = 4$. C’est le cercle de centre $G$ et de rayon $4$ (il passe par $A$).
:::
:::
