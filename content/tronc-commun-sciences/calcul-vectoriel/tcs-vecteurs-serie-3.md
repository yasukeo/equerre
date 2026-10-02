---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : des points définis par des égalités vectorielles dans un triangle, avec un alignement à démontrer ou à réfuter, puis le théorème des milieux et le parallélogramme de Varignon, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : trois points alignés
Soit $ABC$ un triangle. On définit les points $M$, $N$ et $P$ par :

$$
\overrightarrow{AM} = \frac{1}{3}\overrightarrow{AB} \qquad \overrightarrow{AN} = 2\overrightarrow{AC} \qquad \overrightarrow{BP} = \frac{4}{5}\overrightarrow{BC}
$$

1. Exprimer $\overrightarrow{AP}$ en fonction de $\overrightarrow{AB}$ et $\overrightarrow{AC}$.
2. Exprimer $\overrightarrow{MN}$ et $\overrightarrow{MP}$ en fonction de $\overrightarrow{AB}$ et $\overrightarrow{AC}$.
3. Montrer que $\overrightarrow{MP} = \frac{2}{5}\overrightarrow{MN}$. Que peut-on en conclure ?
4. Soit $Q$ le milieu de $[BC]$. Les points $M$, $N$ et $Q$ sont-ils alignés ?

:::corrige
1. $\overrightarrow{AP} = \overrightarrow{AB} + \frac{4}{5}\left(\overrightarrow{AC} - \overrightarrow{AB}\right) = \frac{1}{5}\overrightarrow{AB} + \frac{4}{5}\overrightarrow{AC}$.
2. $\overrightarrow{MN} = \overrightarrow{MA} + \overrightarrow{AN} = -\frac{1}{3}\overrightarrow{AB} + 2\overrightarrow{AC}$. $\overrightarrow{MP} = \overrightarrow{MA} + \overrightarrow{AP} = \left(\frac{1}{5} - \frac{1}{3}\right)\overrightarrow{AB} + \frac{4}{5}\overrightarrow{AC} = -\frac{2}{15}\overrightarrow{AB} + \frac{4}{5}\overrightarrow{AC}$.
3. $\frac{2}{5}\overrightarrow{MN} = -\frac{2}{15}\overrightarrow{AB} + \frac{4}{5}\overrightarrow{AC} = \overrightarrow{MP}$. Les vecteurs sont colinéaires : $M$, $N$, $P$ sont alignés.
4. $\overrightarrow{AQ} = \frac{1}{2}\overrightarrow{AB} + \frac{1}{2}\overrightarrow{AC}$, donc $\overrightarrow{MQ} = \frac{1}{6}\overrightarrow{AB} + \frac{1}{2}\overrightarrow{AC}$. Pour avoir $\overrightarrow{MQ} = k\overrightarrow{MN}$, il faudrait $\frac{1}{6} = -\frac{k}{3}$ et $\frac{1}{2} = 2k$, soit $k = -\frac{1}{2}$ et $k = \frac{1}{4}$ : impossible. $M$, $N$, $Q$ ne sont pas alignés.
:::
:::

:::exercice Problème 2 : les milieux
1. Soit $ABC$ un triangle, $I$ le milieu de $[AB]$ et $J$ le milieu de $[AC]$. Montrer que $\overrightarrow{IJ} = \frac{1}{2}\overrightarrow{BC}$. Qu’en déduit-on pour les droites $(IJ)$ et $(BC)$, et pour les longueurs ?
2. Soit $ABCD$ un quadrilatère quelconque, et $I$, $J$, $K$, $L$ les milieux de $[AB]$, $[BC]$, $[CD]$ et $[DA]$. Montrer que $\overrightarrow{IJ} = \frac{1}{2}\overrightarrow{AC}$ et $\overrightarrow{LK} = \frac{1}{2}\overrightarrow{AC}$.
3. En déduire la nature du quadrilatère $IJKL$.

:::corrige
1. $\overrightarrow{IJ} = \overrightarrow{IA} + \overrightarrow{AJ} = \frac{1}{2}\overrightarrow{BA} + \frac{1}{2}\overrightarrow{AC} = \frac{1}{2}\left(\overrightarrow{BA} + \overrightarrow{AC}\right) = \frac{1}{2}\overrightarrow{BC}$. Donc $(IJ)$ est parallèle à $(BC)$ et $IJ = \frac{1}{2}BC$.
2. Dans le triangle $ABC$, la question 1 donne $\overrightarrow{IJ} = \frac{1}{2}\overrightarrow{AC}$. De même, dans le triangle $DAC$ : $\overrightarrow{LK} = \overrightarrow{LD} + \overrightarrow{DK} = \frac{1}{2}\overrightarrow{AD} + \frac{1}{2}\overrightarrow{DC} = \frac{1}{2}\overrightarrow{AC}$.
3. $\overrightarrow{IJ} = \overrightarrow{LK}$ : $IJKL$ est un parallélogramme.
:::
:::
