---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets : un barycentre de trois points construit par associativité avec alignement et coordonnées, puis des ensembles de points, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : construction et alignement
Soit $ABC$ un triangle. On considère $G$ le barycentre de $\{(A ; 1), (B ; 3), (C ; -2)\}$.

1. Justifier l’existence de $G$.
2. Soit $E$ le barycentre de $\{(A ; 1), (B ; 3)\}$. Montrer que $G$ est le barycentre de $\{(E ; 4), (C ; -2)\}$, et en déduire $\overrightarrow{EG}$ en fonction de $\overrightarrow{EC}$.
3. Soit $F$ le barycentre de $\{(B ; 3), (C ; -2)\}$. Montrer que $A$, $F$ et $G$ sont alignés.
4. Dans un repère où $A(0 ; 0)$, $B(2 ; 0)$ et $C(0 ; 2)$, calculer les coordonnées de $E$, $F$ et $G$, et vérifier les résultats précédents.

:::corrige
1. $1 + 3 - 2 = 2 \neq 0$.
2. Associativité : $G$ est le barycentre de $\{(E ; 4), (C ; -2)\}$, donc $\overrightarrow{EG} = \frac{-2}{4 - 2}\overrightarrow{EC} = -\overrightarrow{EC}$ : $E$ est le milieu de $[GC]$.
3. $3 - 2 = 1 \neq 0$ : $F$ existe, et $G$ est le barycentre de $\{(A ; 1), (F ; 1)\}$ : c’est le milieu de $[AF]$, donc $A$, $F$, $G$ sont alignés.
4. $E\left(\frac{6}{4} ; 0\right) = \left(\frac{3}{2} ; 0\right)$ ; $F\left(\frac{6 - 0}{1} ; \frac{0 - 4}{1}\right) = (6 ; -4)$ ; $G\left(\frac{0 + 6 + 0}{2} ; \frac{0 + 0 - 4}{2}\right) = (3 ; -2)$. On vérifie : $G$ est bien le milieu de $[AF]$, et $E$ le milieu de $[GC]$ : $\frac{3 + 0}{2} = \frac{3}{2}$ et $\frac{-2 + 2}{2} = 0$.
:::
:::

:::exercice Problème 2 : ensembles de points
Soit $ABC$ un triangle équilatéral de côté $3$, $I$ le milieu de $[BC]$ et $G$ le barycentre de $\{(A ; 2), (B ; 1), (C ; 1)\}$.

1. Montrer que $G$ est le milieu de $[AI]$.
2. Déterminer l’ensemble $(\Gamma_1)$ des points $M$ tels que $\left\|2\overrightarrow{MA} + \overrightarrow{MB} + \overrightarrow{MC}\right\| = 6$.
3. Montrer que $2\overrightarrow{MA} - \overrightarrow{MB} - \overrightarrow{MC} = -2\overrightarrow{AI}$ pour tout point $M$, puis déterminer l’ensemble $(\Gamma_2)$ des points $M$ tels que $\left\|2\overrightarrow{MA} + \overrightarrow{MB} + \overrightarrow{MC}\right\| = \left\|2\overrightarrow{MA} - \overrightarrow{MB} - \overrightarrow{MC}\right\|$.

:::corrige
1. $I$ est le barycentre de $\{(B ; 1), (C ; 1)\}$, donc $G$ est le barycentre de $\{(A ; 2), (I ; 2)\}$ : le milieu de $[AI]$.
2. $2\overrightarrow{MA} + \overrightarrow{MB} + \overrightarrow{MC} = 4\overrightarrow{MG}$ : $4MG = 6$, soit $MG = \frac{3}{2}$ : cercle de centre $G$ et de rayon $\frac{3}{2}$.
3. $2\overrightarrow{MA} - \overrightarrow{MB} - \overrightarrow{MC} = \left(\overrightarrow{MA} - \overrightarrow{MB}\right) + \left(\overrightarrow{MA} - \overrightarrow{MC}\right) = \overrightarrow{BA} + \overrightarrow{CA} = -\left(\overrightarrow{AB} + \overrightarrow{AC}\right) = -2\overrightarrow{AI}$. Sa norme est $2AI$, et $AI$ est la hauteur du triangle équilatéral : $AI = \frac{3\sqrt{3}}{2}$. La condition s’écrit $4MG = 3\sqrt{3}$, soit $MG = \frac{3\sqrt{3}}{4}$ : $(\Gamma_2)$ est le cercle de centre $G$ et de rayon $\frac{3\sqrt{3}}{4}$.
:::
:::
