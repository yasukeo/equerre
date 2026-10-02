---
title: Série 1 — partie 1 : vecteurs, égalité, somme
kind: serie
summary: Simplifier avec la relation de Chasles, démontrer qu’un quadrilatère est un parallélogramme, construire une somme, utiliser le milieu, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Relation de Chasles
Simplifier :

1. $\overrightarrow{AB} + \overrightarrow{CA} + \overrightarrow{BC}$
2. $\overrightarrow{MN} - \overrightarrow{PN} + \overrightarrow{PQ}$
3. $\overrightarrow{AB} - \overrightarrow{AC} + \overrightarrow{BC}$

:::corrige
1. $\overrightarrow{CA} + \overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{CC} = \vec{0}$.
2. $\overrightarrow{MN} + \overrightarrow{NP} + \overrightarrow{PQ} = \overrightarrow{MQ}$.
3. $\overrightarrow{AB} + \overrightarrow{CA} + \overrightarrow{BC} = \vec{0}$, comme dans la question 1.
:::
:::

:::exercice Montrer un parallélogramme
Soit $A$, $B$, $C$, $D$ quatre points du plan.

1. Montrer que $\overrightarrow{AB} + \overrightarrow{CD} = \overrightarrow{AD} + \overrightarrow{CB}$.
2. On définit le point $E$ par $\overrightarrow{AE} = \overrightarrow{AB} + \overrightarrow{AD}$. Montrer que $ABED$ est un parallélogramme.

:::corrige
1. $\overrightarrow{AB} + \overrightarrow{CD} - \overrightarrow{AD} - \overrightarrow{CB} = \overrightarrow{AB} + \overrightarrow{BC} + \overrightarrow{CD} + \overrightarrow{DA} = \overrightarrow{AA} = \vec{0}$.
2. $\overrightarrow{AE} = \overrightarrow{AB} + \overrightarrow{AD}$ donne $\overrightarrow{AE} - \overrightarrow{AB} = \overrightarrow{AD}$, soit $\overrightarrow{BE} = \overrightarrow{AD}$. Donc $ABED$ est un parallélogramme.
:::
:::

:::exercice Avec un milieu
Soit $I$ le milieu de $[AB]$ et $M$ un point du plan.

1. Montrer que $\overrightarrow{MA} + \overrightarrow{MB} = 2\overrightarrow{MI}$.
2. Où se trouve le point $M$ tel que $\overrightarrow{MA} + \overrightarrow{MB} = \overrightarrow{AB}$ ?

:::corrige
1. $\overrightarrow{MA} + \overrightarrow{MB} = \overrightarrow{MI} + \overrightarrow{IA} + \overrightarrow{MI} + \overrightarrow{IB} = 2\overrightarrow{MI} + \vec{0}$.
2. $2\overrightarrow{MI} = \overrightarrow{AB}$, donc $\overrightarrow{IM} = -\frac{1}{2}\overrightarrow{AB} = \overrightarrow{IA}$ : $M = A$.
:::
:::

:::exercice Somme de trois vecteurs
Soit $ABC$ un triangle et $D$ le point tel que $\overrightarrow{AD} = \overrightarrow{AB} + \overrightarrow{AC}$.

1. Quelle est la nature de $ABDC$ ?
2. Soit $I$ le milieu de $[BC]$. Montrer que $I$ est aussi le milieu de $[AD]$.

:::corrige
1. $\overrightarrow{AD} - \overrightarrow{AB} = \overrightarrow{AC}$, soit $\overrightarrow{BD} = \overrightarrow{AC}$ : $ABDC$ est un parallélogramme.
2. Les diagonales d’un parallélogramme se coupent en leur milieu : le milieu de $[BC]$ est celui de $[AD]$. Vectoriellement : $\overrightarrow{AD} = \overrightarrow{AB} + \overrightarrow{AC} = 2\overrightarrow{AI}$.
:::
:::
