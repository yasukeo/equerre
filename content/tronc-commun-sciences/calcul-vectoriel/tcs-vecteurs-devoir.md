---
title: Devoir surveillé : calcul vectoriel
kind: devoir
summary: Un devoir d’une heure sur 20 points : relation de Chasles, centre d’un parallélogramme, parallélisme et milieu dans un triangle, centre de gravité, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : Chasles
1. Simplifier $\overrightarrow{AC} + \overrightarrow{BA} + \overrightarrow{CB}$. (1,5 pt)
2. Simplifier $\overrightarrow{MP} - \overrightarrow{MN} + \overrightarrow{PQ}$. (1,5 pt)
3. Soit $ABCD$ un parallélogramme de centre $O$. Montrer que $\overrightarrow{OA} + \overrightarrow{OB} + \overrightarrow{OC} + \overrightarrow{OD} = \vec{0}$. (3 pts)

:::corrige
1. $\overrightarrow{BA} + \overrightarrow{AC} + \overrightarrow{CB} = \overrightarrow{BB} = \vec{0}$.
2. $\overrightarrow{MP} - \overrightarrow{MN} = \overrightarrow{NM} + \overrightarrow{MP} = \overrightarrow{NP}$, puis $\overrightarrow{NP} + \overrightarrow{PQ} = \overrightarrow{NQ}$.
3. Les diagonales se coupent en leur milieu $O$ : $\overrightarrow{OA} + \overrightarrow{OC} = \vec{0}$ et $\overrightarrow{OB} + \overrightarrow{OD} = \vec{0}$. La somme est nulle.
:::
:::

:::exercice Exercice 2 (8 points) : dans un triangle
Soit $ABC$ un triangle.

1. On définit $D$ et $E$ par $\overrightarrow{AD} = 3\overrightarrow{AB}$ et $\overrightarrow{AE} = 3\overrightarrow{AC}$. Montrer que $\overrightarrow{DE} = 3\overrightarrow{BC}$. (3 pts)
2. Que peut-on en déduire pour les droites $(DE)$ et $(BC)$ ? (1 pt)
3. On définit $K$ par $\overrightarrow{AK} = 2\overrightarrow{AB} - \overrightarrow{AC}$. Montrer que $\overrightarrow{BK} = \overrightarrow{CB}$, et en déduire que $B$ est le milieu de $[CK]$. (4 pts)

:::corrige
1. $\overrightarrow{DE} = \overrightarrow{DA} + \overrightarrow{AE} = -3\overrightarrow{AB} + 3\overrightarrow{AC} = 3\left(\overrightarrow{BA} + \overrightarrow{AC}\right) = 3\overrightarrow{BC}$.
2. Les vecteurs sont colinéaires : $(DE)$ est parallèle à $(BC)$, et $DE = 3BC$.
3. $\overrightarrow{BK} = \overrightarrow{BA} + \overrightarrow{AK} = -\overrightarrow{AB} + 2\overrightarrow{AB} - \overrightarrow{AC} = \overrightarrow{AB} - \overrightarrow{AC} = \overrightarrow{CB}$. Donc $\overrightarrow{CB} = \overrightarrow{BK}$ : $B$ est le milieu de $[CK]$.
:::
:::

:::exercice Exercice 3 (6 points) : centre de gravité
Soit $ABC$ un triangle, $G$ son centre de gravité, qui vérifie $\overrightarrow{GA} + \overrightarrow{GB} + \overrightarrow{GC} = \vec{0}$, et $I$ le milieu de $[BC]$.

1. Montrer que $\overrightarrow{GB} + \overrightarrow{GC} = 2\overrightarrow{GI}$. (2 pts)
2. En déduire que $\overrightarrow{AG} = \frac{2}{3}\overrightarrow{AI}$. (2 pts)
3. Exprimer $\overrightarrow{AG}$ en fonction de $\overrightarrow{AB}$ et $\overrightarrow{AC}$. (2 pts)

:::corrige
1. $\overrightarrow{GB} + \overrightarrow{GC} = \overrightarrow{GI} + \overrightarrow{IB} + \overrightarrow{GI} + \overrightarrow{IC} = 2\overrightarrow{GI}$, car $\overrightarrow{IB} + \overrightarrow{IC} = \vec{0}$.
2. $\overrightarrow{GA} + 2\overrightarrow{GI} = \vec{0}$. Avec $\overrightarrow{GI} = \overrightarrow{GA} + \overrightarrow{AI}$ : $3\overrightarrow{GA} + 2\overrightarrow{AI} = \vec{0}$, donc $\overrightarrow{AG} = \frac{2}{3}\overrightarrow{AI}$.
3. $\overrightarrow{AI} = \frac{1}{2}\left(\overrightarrow{AB} + \overrightarrow{AC}\right)$, donc $\overrightarrow{AG} = \frac{1}{3}\overrightarrow{AB} + \frac{1}{3}\overrightarrow{AC}$.
:::
:::
