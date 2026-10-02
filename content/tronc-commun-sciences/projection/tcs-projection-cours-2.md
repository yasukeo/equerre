---
title: La projection — partie 2 : le théorème de Thalès
kind: cours
summary: Le théorème de Thalès déduit de la projection, sa forme dans le triangle, sa réciproque, et des applications : calculs de longueurs, parallélisme, partage d’un segment.
position: 20
visibility: public
---

## Le théorème de Thalès

:::theoreme
Soit $(D)$ et $(D')$ deux droites sécantes en $A$. Soit $B$ et $M$ deux points de $(D)$ distincts de $A$, et $C$ et $N$ deux points de $(D')$ distincts de $A$. Si $(MN)$ est parallèle à $(BC)$, alors :

$$
\frac{AM}{AB} = \frac{AN}{AC} = \frac{MN}{BC}
$$
:::

La projection sur $(D')$ parallèlement à $(BC)$ envoie $A$ sur $A$, $B$ sur $C$ et $M$ sur $N$. Comme $\overrightarrow{AM} = k\overrightarrow{AB}$, on obtient $\overrightarrow{AN} = k\overrightarrow{AC}$ : c’est l’égalité des deux premiers rapports.

:::exemple
Dans un triangle $ABC$, $M \in [AB]$ et $N \in [AC]$ avec $(MN) \parallel (BC)$. On donne $AM = 3$, $AB = 5$, $AC = 7{,}5$ et $BC = 6$. Alors $\frac{AN}{7{,}5} = \frac{3}{5}$, donc $AN = 4{,}5$ ; et $\frac{MN}{6} = \frac{3}{5}$, donc $MN = 3{,}6$.
:::

:::attention
Le théorème vaut aussi dans la configuration « en papillon », où $M$ et $N$ sont de l’autre côté de $A$ par rapport à $B$ et $C$.
:::

## La réciproque

:::theoreme
Avec les mêmes notations, si $\frac{AM}{AB} = \frac{AN}{AC}$ et si les points $A$, $M$, $B$ sont dans le même ordre que les points $A$, $N$, $C$, alors $(MN)$ est parallèle à $(BC)$.
:::

:::exemple
$M \in [AB]$, $N \in [AC]$ avec $AM = 4$, $AB = 10$, $AN = 3$ et $AC = 7{,}5$. On a $\frac{4}{10} = 0{,}4$ et $\frac{3}{7{,}5} = 0{,}4$ : $(MN)$ est parallèle à $(BC)$. Si au contraire $AN = 3{,}2$, alors $\frac{3{,}2}{7{,}5} \neq 0{,}4$ et les droites ne sont pas parallèles.
:::

## Partager un segment

:::exemple
Pour partager un segment $[AB]$ en trois parties égales : on trace une demi-droite d’origine $A$, on y reporte trois longueurs égales $AU_1 = U_1U_2 = U_2U_3$, puis on trace la droite $(U_3B)$ et ses parallèles passant par $U_1$ et $U_2$. Elles coupent $[AB]$ en deux points qui le partagent en trois parties égales : c’est la projection sur $(AB)$ parallèlement à $(U_3B)$, qui conserve les rapports.
:::
