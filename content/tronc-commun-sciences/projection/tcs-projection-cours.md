---
title: La projection — partie 1 : projection sur une droite
kind: cours
summary: Projection sur une droite parallèlement à une autre droite, projection orthogonale, projeté d’un milieu, et conservation du coefficient de colinéarité.
position: 10
visibility: public
---

## Définition

:::definition
Soit $(D)$ et $(\Delta)$ deux droites **sécantes** du plan. Pour tout point $M$, la parallèle à $(\Delta)$ passant par $M$ coupe $(D)$ en un unique point $M'$. On dit que $M'$ est le **projeté** de $M$ sur $(D)$ **parallèlement à** $(\Delta)$, et l’application $p : M \mapsto M'$ est la **projection** sur $(D)$ parallèlement à $(\Delta)$.
:::

:::propriete
- Si $M$ est sur $(D)$, son projeté est $M$ lui-même.
- Les points qui ont le même projeté $M'$ sont ceux de la parallèle à $(\Delta)$ passant par $M'$.
:::

:::definition
Si $(\Delta)$ est perpendiculaire à $(D)$, on parle de **projection orthogonale** sur $(D)$. Le projeté orthogonal de $M$ est le pied de la perpendiculaire à $(D)$ passant par $M$.
:::

:::exemple
Dans un triangle $ABC$ rectangle en $A$, le projeté orthogonal de $C$ sur $(AB)$ est $A$. Le projeté orthogonal de $A$ sur $(BC)$ est le pied $H$ de la hauteur issue de $A$.
:::

## Projeté d’un milieu

:::propriete
La projection conserve le milieu : si $I$ est le milieu de $[AB]$ et si $A'$, $B'$, $I'$ sont les projetés de $A$, $B$, $I$, alors $I'$ est le milieu de $[A'B']$.
:::

:::exemple
Soit $ABC$ un triangle, $I$ le milieu de $[BC]$. On projette sur $(AB)$ parallèlement à $(AC)$ : $B$ se projette en $B$, $C$ en $A$ (car $(CA)$ est parallèle à $(AC)$ et coupe $(AB)$ en $A$). Donc $I$ se projette sur le milieu de $[AB]$ : la parallèle à $(AC)$ menée par $I$ coupe $[AB]$ en son milieu.
:::

## Conservation du coefficient de colinéarité

:::theoreme
Soit $A$, $B$, $C$, $D$ quatre points et $A'$, $B'$, $C'$, $D'$ leurs projetés. Si $\overrightarrow{CD} = k\overrightarrow{AB}$, alors $\overrightarrow{C'D'} = k\overrightarrow{A'B'}$.
:::

:::exemple
Soit $A$, $B$, $C$ trois points alignés avec $\overrightarrow{AC} = \frac{3}{4}\overrightarrow{AB}$. Leurs projetés sur une droite $(D)$ vérifient $\overrightarrow{A'C'} = \frac{3}{4}\overrightarrow{A'B'}$ : si $A'B' = 8$ cm, alors $A'C' = 6$ cm.
:::

:::attention
La projection ne conserve pas les longueurs : seuls les **rapports** de longueurs sur une même droite (ou sur des droites parallèles) sont conservés.
:::
