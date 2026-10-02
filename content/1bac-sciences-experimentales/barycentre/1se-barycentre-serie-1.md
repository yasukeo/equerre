---
title: Série 1 — partie 1 : barycentre de deux points
kind: serie
summary: Construire un barycentre, exprimer un point comme barycentre, coordonnées, alignement, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Construire un barycentre
Soit $A$ et $B$ deux points tels que $AB = 6$ cm. Construire :

1. $G_1$ barycentre de $\{(A ; 2), (B ; 1)\}$ ;
2. $G_2$ barycentre de $\{(A ; 1), (B ; -3)\}$ ;
3. $G_3$ barycentre de $\{(A ; -2), (B ; -2)\}$.

:::corrige
1. $\overrightarrow{AG_1} = \frac{1}{3}\overrightarrow{AB}$ : sur $[AB]$, à $2$ cm de $A$.
2. $\overrightarrow{AG_2} = \frac{-3}{-2}\overrightarrow{AB} = \frac{3}{2}\overrightarrow{AB}$ : sur la droite $(AB)$, au-delà de $B$, à $9$ cm de $A$.
3. Coefficients égaux (homogénéité) : $G_3$ est le milieu de $[AB]$.
:::
:::

:::exercice Exprimer un point comme barycentre
1. $C$ vérifie $\overrightarrow{AC} = \frac{3}{4}\overrightarrow{AB}$. Écrire $C$ comme barycentre de $A$ et $B$.
2. $D$ vérifie $2\overrightarrow{DA} = 5\overrightarrow{DB}$. Écrire $D$ comme barycentre de $A$ et $B$.

:::corrige
1. $\frac{\beta}{\alpha + \beta} = \frac{3}{4}$ avec $\alpha = 1$, $\beta = 3$ : $C$ est le barycentre de $\{(A ; 1), (B ; 3)\}$.
2. $2\overrightarrow{DA} - 5\overrightarrow{DB} = \vec{0}$ : $D$ est le barycentre de $\{(A ; 2), (B ; -5)\}$.
:::
:::

:::exercice Coordonnées
Dans un repère, $A(2 ; -1)$ et $B(-1 ; 5)$.

1. Calculer les coordonnées du barycentre $G$ de $\{(A ; 2), (B ; 1)\}$.
2. Calculer les coordonnées du barycentre $H$ de $\{(A ; 3), (B ; -1)\}$.

:::corrige
1. $x_G = \frac{4 - 1}{3} = 1$, $y_G = \frac{-2 + 5}{3} = 1$ : $G(1 ; 1)$.
2. $x_H = \frac{6 + 1}{2} = \frac{7}{2}$, $y_H = \frac{-3 - 5}{2} = -4$ : $H\left(\frac{7}{2} ; -4\right)$.
:::
:::

:::exercice Alignement
Soit $G$ le barycentre de $\{(A ; 1), (B ; 2)\}$ et $M$ un point quelconque.

1. Exprimer $\overrightarrow{MA} + 2\overrightarrow{MB}$ en fonction de $\overrightarrow{MG}$.
2. En déduire l’ensemble des points $M$ tels que $\overrightarrow{MA} + 2\overrightarrow{MB}$ soit colinéaire à $\overrightarrow{AB}$.

:::corrige
1. $\overrightarrow{MA} + 2\overrightarrow{MB} = 3\overrightarrow{MG}$.
2. $\overrightarrow{MG}$ colinéaire à $\overrightarrow{AB}$, et $G \in (AB)$ : c’est la droite $(AB)$.
:::
:::
