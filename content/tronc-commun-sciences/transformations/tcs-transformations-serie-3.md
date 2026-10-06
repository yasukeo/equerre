---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : le triangle des milieux obtenu par une homothétie de centre le centre de gravité, puis la composée de deux symétries centrales qui donne une translation, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : le triangle des milieux
Soit $ABC$ un triangle, $G$ son centre de gravité, et $I$, $J$, $K$ les milieux de $[BC]$, $[CA]$ et $[AB]$. On rappelle que $\overrightarrow{AG} = \frac{2}{3}\overrightarrow{AI}$.

1. Montrer que $\overrightarrow{GI} = -\frac{1}{2}\overrightarrow{GA}$.
2. On admet de même que $\overrightarrow{GJ} = -\frac{1}{2}\overrightarrow{GB}$ et $\overrightarrow{GK} = -\frac{1}{2}\overrightarrow{GC}$. Quelle homothétie envoie le triangle $ABC$ sur le triangle $IJK$ ?
3. En déduire que $(IJ) \parallel (AB)$ et $IJ = \frac{1}{2}AB$.
4. L’aire de $ABC$ vaut $24$ cm². Quelle est l’aire de $IJK$ ?

:::corrige
1. $\overrightarrow{GI} = \overrightarrow{GA} + \overrightarrow{AI} = -\frac{2}{3}\overrightarrow{AI} + \overrightarrow{AI} = \frac{1}{3}\overrightarrow{AI}$, et $\overrightarrow{GA} = -\frac{2}{3}\overrightarrow{AI}$. Donc $\overrightarrow{GI} = -\frac{1}{2}\overrightarrow{GA}$.
2. $h\left(G, -\frac{1}{2}\right)$ envoie $A$ sur $I$, $B$ sur $J$ et $C$ sur $K$.
3. $\overrightarrow{IJ} = -\frac{1}{2}\overrightarrow{AB}$ : les droites sont parallèles et $IJ = \frac{1}{2}AB$.
4. Les aires sont multipliées par $\left(-\frac{1}{2}\right)^2 = \frac{1}{4}$ : $6$ cm².
:::
:::

:::exercice Problème 2 : deux symétries centrales
Soit $A$ et $B$ deux points distincts. Pour un point $M$, on note $M_1$ son image par la symétrie de centre $A$, puis $M_2$ l’image de $M_1$ par la symétrie de centre $B$.

1. Exprimer $\overrightarrow{MM_1}$ en fonction de $\overrightarrow{MA}$, puis $\overrightarrow{M_1M_2}$ en fonction de $\overrightarrow{M_1B}$.
2. Montrer que $\overrightarrow{MM_2} = 2\overrightarrow{AB}$.
3. Quelle transformation envoie directement $M$ sur $M_2$ ?
4. Dans un repère, $A(1 ; 0)$, $B(3 ; 2)$ et $M(0 ; 4)$. Calculer $M_1$ et $M_2$, et vérifier le résultat de la question 2.

:::corrige
1. $A$ est le milieu de $[MM_1]$ : $\overrightarrow{MM_1} = 2\overrightarrow{MA}$. De même $\overrightarrow{M_1M_2} = 2\overrightarrow{M_1B}$.
2. $\overrightarrow{MM_2} = 2\overrightarrow{MA} + 2\overrightarrow{M_1B} = 2\left(\overrightarrow{MA} + \overrightarrow{M_1A} + \overrightarrow{AB}\right)$. Or $\overrightarrow{M_1A} = \overrightarrow{AM} = -\overrightarrow{MA}$, donc $\overrightarrow{MM_2} = 2\overrightarrow{AB}$.
3. La translation de vecteur $2\overrightarrow{AB}$.
4. $M_1(2 - 0 ; 0 - 4) = (2 ; -4)$, puis $M_2(6 - 2 ; 4 + 4) = (4 ; 8)$. $\overrightarrow{MM_2}(4 ; 4)$ et $2\overrightarrow{AB} = 2(2 ; 2) = (4 ; 4)$.
:::
:::
