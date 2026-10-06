---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : une pyramide régulière avec parallélisme, longueurs, aires et volume, puis un tétraèdre découpé dans un cube et la distance d’un sommet à un plan, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : une pyramide régulière
$SABCD$ est une pyramide dont la base $ABCD$ est un carré de côté $6$ cm et de centre $O$, et dont la hauteur est $SO = 4$ cm, avec $(SO)$ orthogonale au plan $(ABC)$. On note $I$ le milieu de $[SC]$ et $M$ le milieu de $[AB]$.

1. Montrer que $(OI)$ est parallèle à $(SA)$, puis au plan $(SAB)$.
2. Calculer $OA$, puis la longueur $SA$ d’une arête latérale.
3. Calculer $SM$, puis l’aire d’une face latérale et l’aire latérale totale.
4. Calculer le volume de la pyramide.

:::corrige
1. Dans le triangle $SAC$, $O$ est le milieu de $[AC]$ et $I$ celui de $[SC]$ : $(OI) \parallel (SA)$. Comme $(SA)$ est dans le plan $(SAB)$, $(OI)$ est parallèle à ce plan.
2. $OA = \frac{AC}{2} = \frac{6\sqrt{2}}{2} = 3\sqrt{2}$. Le triangle $SOA$ est rectangle en $O$ : $SA^2 = 16 + 18 = 34$, donc $SA = \sqrt{34}$ cm.
3. $OM = 3$ et $SOM$ est rectangle en $O$ : $SM = \sqrt{16 + 9} = 5$ cm. Comme $SAB$ est isocèle en $S$, $(SM)$ est sa hauteur : aire $\frac{6 \times 5}{2} = 15$ cm², et aire latérale $60$ cm².
4. $\frac{1}{3} \times 36 \times 4 = 48$ cm³.
:::
:::

:::exercice Problème 2 : un tétraèdre dans un cube
$ABCDEFGH$ est un cube d’arête $a$, avec les notations habituelles.

1. Montrer que le triangle $BDE$ est équilatéral, et calculer son aire.
2. Calculer le volume du tétraèdre $ABDE$.
3. En utilisant le triangle $BDE$ comme base, en déduire la distance $d$ du point $A$ au plan $(BDE)$.
4. Comparer $d$ à la longueur de la diagonale $AG$.

:::corrige
1. $BD$, $DE$ et $EB$ sont des diagonales de faces : elles mesurent $a\sqrt{2}$. L’aire d’un triangle équilatéral de côté $c$ est $\frac{\sqrt{3}}{4}c^2$, soit ici $\frac{\sqrt{3}}{4} \times 2a^2 = \frac{\sqrt{3}}{2}a^2$.
2. $V = \frac{1}{3} \times \frac{a^2}{2} \times a = \frac{a^3}{6}$.
3. $V = \frac{1}{3} \times \frac{\sqrt{3}}{2}a^2 \times d$, donc $d = \frac{3V}{\frac{\sqrt{3}}{2}a^2} = \frac{a^3/2}{\frac{\sqrt{3}}{2}a^2} = \frac{a}{\sqrt{3}} = \frac{a\sqrt{3}}{3}$.
4. $AG = a\sqrt{3}$ : la distance $d$ vaut le tiers de la diagonale.
:::
:::
