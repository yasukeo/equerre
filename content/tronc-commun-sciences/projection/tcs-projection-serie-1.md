---
title: Série 1 — partie 1 : projection sur une droite
kind: serie
summary: Construire des projetés, projeté d’un milieu, projection orthogonale dans un triangle et conservation du coefficient de colinéarité, avec les corrigés.
position: 10
visibility: public
---

Trois exercices sur la première partie du cours.

:::exercice Projetés dans un parallélogramme
Soit $ABCD$ un parallélogramme de centre $O$. On note $p$ la projection sur $(AB)$ parallèlement à $(AD)$.

1. Donner les projetés de $A$, $B$, $C$ et $D$.
2. En déduire le projeté de $O$.

:::corrige
1. $A$ et $B$ sont sur $(AB)$ : $p(A) = A$ et $p(B) = B$. La parallèle à $(AD)$ passant par $D$ est $(AD)$ elle-même : $p(D) = A$. La parallèle à $(AD)$ passant par $C$ est $(BC)$ : $p(C) = B$.
2. $O$ est le milieu de $[AC]$ ; la projection conserve le milieu, donc $p(O)$ est le milieu de $[p(A)p(C)] = [AB]$.
:::
:::

:::exercice Projection orthogonale
Soit $ABC$ un triangle rectangle en $A$, avec $AB = 6$ et $AC = 8$, et $H$ le projeté orthogonal de $A$ sur $(BC)$.

1. Calculer $BC$.
2. Quel est le projeté orthogonal de $B$ sur $(AC)$ ?
3. En écrivant l’aire du triangle de deux façons, calculer $AH$.

:::corrige
1. Pythagore : $BC = \sqrt{36 + 64} = 10$.
2. $(AB)$ est perpendiculaire à $(AC)$ : le projeté de $B$ est $A$.
3. Aire $= \frac{AB \times AC}{2} = 24$, et aussi $\frac{BC \times AH}{2} = 5AH$. Donc $AH = 4{,}8$.
:::
:::

:::exercice Coefficient de colinéarité
Sur une droite $(L)$, on place $A$, $B$, $C$ tels que $\overrightarrow{AC} = -\frac{1}{2}\overrightarrow{AB}$. On note $A'$, $B'$, $C'$ leurs projetés sur une droite $(D)$ sécante à $(L)$, parallèlement à une droite $(\Delta)$.

1. Exprimer $\overrightarrow{A'C'}$ en fonction de $\overrightarrow{A'B'}$.
2. On mesure $A'B' = 5$ cm. Calculer $A'C'$ et $B'C'$.

:::corrige
1. Par conservation du coefficient de colinéarité : $\overrightarrow{A'C'} = -\frac{1}{2}\overrightarrow{A'B'}$.
2. $A'C' = 2{,}5$ cm. $C'$ est de l’autre côté de $A'$ par rapport à $B'$, donc $B'C' = 5 + 2{,}5 = 7{,}5$ cm.
:::
:::
