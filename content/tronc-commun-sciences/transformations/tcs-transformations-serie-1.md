---
title: Série 1 — partie 1 : translation et symétries
kind: serie
summary: Image d’un point par une translation, parallélogramme, symétrie centrale dans un parallélogramme, symétrie axiale dans un triangle isocèle, images en coordonnées, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Translation
Soit $ABC$ un triangle et $t$ la translation de vecteur $\overrightarrow{BC}$. On note $A'$ l’image de $A$.

1. Montrer que $ABCA'$ est un parallélogramme.
2. Quelle est l’image du segment $[AB]$ ? Que peut-on dire de sa longueur ?

:::corrige
1. $\overrightarrow{AA'} = \overrightarrow{BC}$, donc $\overrightarrow{A'C} = \overrightarrow{A'A} + \overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AB}$ : $ABCA'$ est un parallélogramme.
2. $t(A) = A'$ et $t(B) = C$ : l’image de $[AB]$ est $[A'C]$, de même longueur que $[AB]$.
:::
:::

:::exercice Symétrie centrale
Soit $ABCD$ un parallélogramme de centre $O$, et $M$ un point du segment $[AB]$. La droite $(MO)$ recoupe $[CD]$ en $N$.

1. Quelle est l’image de $A$ et de $B$ par la symétrie de centre $O$ ?
2. Montrer que $N$ est l’image de $M$, puis que $O$ est le milieu de $[MN]$.

:::corrige
1. $O$ est le milieu des diagonales : $S_O(A) = C$ et $S_O(B) = D$.
2. $M \in [AB]$, donc son image est sur $[CD]$ ; elle est aussi sur la droite $(MO)$, qui passe par le centre et est donc globalement invariante. L’image de $M$ est l’intersection de $(MO)$ et de $[CD]$ : c’est $N$, et $O$ est le milieu de $[MN]$.
:::
:::

:::exercice Symétrie axiale
Soit $ABC$ un triangle isocèle en $A$ et $(D)$ la médiatrice de $[BC]$.

1. Montrer que $A$ est sur $(D)$.
2. Quelle est l’image de $B$, de $C$ et de $A$ par la symétrie d’axe $(D)$ ?
3. En déduire que les angles $\widehat{ABC}$ et $\widehat{ACB}$ sont égaux.

:::corrige
1. $AB = AC$ : $A$ est à égale distance de $B$ et $C$, donc sur la médiatrice de $[BC]$.
2. $B \mapsto C$, $C \mapsto B$ et $A \mapsto A$.
3. L’image de l’angle $\widehat{ABC}$ est l’angle $\widehat{ACB}$, et la symétrie conserve les angles.
:::
:::

:::exercice En coordonnées
Dans un repère, on donne $A(1 ; 3)$, $M(4 ; -2)$ et $\Omega(1 ; 1)$.

1. Donner l’image de $A$ par la translation de vecteur $\vec{u}(2 ; -1)$.
2. Donner l’image de $M$ par la symétrie de centre $\Omega$.
3. Vérifier que $\Omega$ est le milieu du segment formé par $M$ et son image.

:::corrige
1. $(1 + 2 ; 3 - 1) = (3 ; 2)$.
2. $(2 - 4 ; 2 + 2) = (-2 ; 4)$.
3. Le milieu de $M(4 ; -2)$ et $(-2 ; 4)$ est $(1 ; 1) = \Omega$.
:::
:::
