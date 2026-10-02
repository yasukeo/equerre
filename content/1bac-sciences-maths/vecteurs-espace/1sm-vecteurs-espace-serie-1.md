---
title: Série 1 — partie 1 : calcul vectoriel
kind: serie
summary: Simplifier avec Chasles dans un cube, colinéarité et alignement, milieux et centre de gravité dans un tétraèdre, avec les corrigés.
position: 10
visibility: public
---

Trois exercices sur la première partie du cours. $ABCDEFGH$ désigne un cube, avec la face $ABCD$ en bas et $E$, $F$, $G$, $H$ au-dessus de $A$, $B$, $C$, $D$.

:::exercice Chasles dans un cube
Simplifier :

1. $\overrightarrow{AB} + \overrightarrow{CG} + \overrightarrow{BC}$
2. $\overrightarrow{EF} + \overrightarrow{DH} + \overrightarrow{FG}$
3. $\overrightarrow{AE} + \overrightarrow{HG} - \overrightarrow{AG}$

:::corrige
1. $\overrightarrow{AB} + \overrightarrow{BC} + \overrightarrow{CG} = \overrightarrow{AG}$.
2. $\overrightarrow{EF} + \overrightarrow{FG} = \overrightarrow{EG}$, et $\overrightarrow{DH} = \overrightarrow{AE}$ : la somme vaut $\overrightarrow{AE} + \overrightarrow{EG} = \overrightarrow{AG}$.
3. $\overrightarrow{HG} = \overrightarrow{EF}$, donc $\overrightarrow{AE} + \overrightarrow{EF} - \overrightarrow{AG} = \overrightarrow{AF} - \overrightarrow{AG} = \overrightarrow{GF}$.
:::
:::

:::exercice Colinéarité et alignement
$ABCD$ est un tétraèdre. On définit $M$ et $N$ par $\overrightarrow{AM} = \frac{1}{3}\overrightarrow{AB}$ et $\overrightarrow{AN} = \frac{1}{3}\overrightarrow{AC}$.

1. Exprimer $\overrightarrow{MN}$ en fonction de $\overrightarrow{BC}$.
2. Que peut-on en déduire pour les droites $(MN)$ et $(BC)$ ?
3. Soit $P$ tel que $\overrightarrow{BP} = 2\overrightarrow{BC}$. Les points $M$, $N$, $P$ sont-ils alignés ?

:::corrige
1. $\overrightarrow{MN} = \overrightarrow{MA} + \overrightarrow{AN} = -\frac{1}{3}\overrightarrow{AB} + \frac{1}{3}\overrightarrow{AC} = \frac{1}{3}\overrightarrow{BC}$.
2. Les vecteurs sont colinéaires : $(MN)$ et $(BC)$ sont parallèles.
3. $(MN)$ est parallèle à $(BC)$ et ne la rencontre pas (sinon elles seraient confondues, et $M$ serait sur $(BC)$). $P$ est sur $(BC)$, donc pas sur $(MN)$ : les trois points ne sont pas alignés.
:::
:::

:::exercice Milieux et centre de gravité
$ABCD$ est un tétraèdre, $I$ le milieu de $[AB]$, $J$ celui de $[CD]$ et $G$ le milieu de $[IJ]$.

1. Montrer que $\overrightarrow{GA} + \overrightarrow{GB} = 2\overrightarrow{GI}$ et $\overrightarrow{GC} + \overrightarrow{GD} = 2\overrightarrow{GJ}$.
2. En déduire que $\overrightarrow{GA} + \overrightarrow{GB} + \overrightarrow{GC} + \overrightarrow{GD} = \vec{0}$.

:::corrige
1. Propriété du milieu appliquée à $[AB]$ et à $[CD]$.
2. La somme vaut $2\left(\overrightarrow{GI} + \overrightarrow{GJ}\right) = \vec{0}$, car $G$ est le milieu de $[IJ]$.
:::
:::
