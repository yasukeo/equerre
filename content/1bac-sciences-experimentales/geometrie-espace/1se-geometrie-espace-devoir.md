---
title: Devoir surveillé : géométrie analytique de l’espace
kind: devoir
summary: Un devoir d’une heure sur 20 points : coordonnées et alignement, déterminant et coplanarité, équation d’un plan et intersection avec une droite, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. L’espace est muni d’un repère.

:::exercice Exercice 1 (5 points) : coordonnées
$A(1 ; 2 ; 3)$, $B(3 ; 0 ; 1)$, $C(4 ; -1 ; 0)$. Calculer le milieu de $[AB]$ et dire si $A$, $B$, $C$ sont alignés.

:::corrige
Milieu $(2 ; 1 ; 2)$. $\overrightarrow{AB}(2 ; -2 ; -2)$, $\overrightarrow{AC}(3 ; -3 ; -3) = \frac{3}{2}\overrightarrow{AB}$ : alignés.
:::
:::

:::exercice Exercice 2 (6 points) : coplanarité
Les vecteurs $\vec{u}(1 ; 0 ; 1)$, $\vec{v}(2 ; 1 ; 0)$, $\vec{w}(0 ; 1 ; m)$ sont-ils coplanaires ? Discuter selon $m$.

:::corrige
Première ligne $(1 ; 2 ; 0)$ : $1 \times \begin{vmatrix} 1 & 1 \\ 0 & m \end{vmatrix} - 2 \times \begin{vmatrix} 0 & 1 \\ 1 & m \end{vmatrix} + 0 = m - 2 \times (-1) = m + 2$. Coplanaires si et seulement si $m = -2$.
:::
:::

:::exercice Exercice 3 (9 points) : plan et droite
Soit $A(0 ; 1 ; 1)$, $\vec{u}(1 ; 0 ; 1)$, $\vec{v}(0 ; 1 ; -1)$ et $(P)$ le plan passant par $A$ dirigé par $\vec{u}$ et $\vec{v}$.

1. Déterminer une équation cartésienne de $(P)$. (4 pts)
2. Déterminer l’intersection de $(P)$ avec la droite $(D) : x = t$, $y = 2t$, $z = 1 - t$. (5 pts)

:::corrige
1. $\overrightarrow{AM}(x ; y - 1 ; z - 1)$. Selon la première colonne : $x\begin{vmatrix} 0 & 1 \\ 1 & -1 \end{vmatrix} - (y - 1)\begin{vmatrix} 1 & 0 \\ 1 & -1 \end{vmatrix} + (z - 1)\begin{vmatrix} 1 & 0 \\ 0 & 1 \end{vmatrix} = -x + (y - 1) + (z - 1)$. Équation : $-x + y + z - 2 = 0$, soit $x - y - z + 2 = 0$. Vérification avec $A$ : $0 - 1 - 1 + 2 = 0$.
2. $t - 2t - (1 - t) + 2 = 1 \neq 0$ : aucune solution, $(D)$ est strictement parallèle à $(P)$.
:::
:::
