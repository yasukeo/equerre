---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : les diagonales d’un trapèze et le rapport de leurs segments, puis la droite des milieux démontrée par projection, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un trapèze
$ABCD$ est un trapèze de bases $[AB]$ et $[CD]$, avec $(AB) \parallel (CD)$, $AB = 6$ et $CD = 9$. Ses diagonales $[AC]$ et $[BD]$ se coupent en $O$.

1. En utilisant la configuration en papillon, montrer que $\frac{OA}{OC} = \frac{OB}{OD} = \frac{AB}{CD}$.
2. On donne $AC = 10$. Calculer $OA$ et $OC$.
3. La parallèle à $(AB)$ passant par $O$ coupe $[AD]$ en $E$. Calculer $\frac{AE}{AD}$.

:::corrige
1. Les droites $(AC)$ et $(BD)$ se coupent en $O$, et $(AB) \parallel (CD)$. Thalès en papillon : $\frac{OA}{OC} = \frac{OB}{OD} = \frac{AB}{CD}$.
2. $\frac{OA}{OC} = \frac{6}{9} = \frac{2}{3}$ et $OA + OC = 10$ : $OA = 4$ et $OC = 6$.
3. Dans le triangle $ACD$, $(OE) \parallel (CD)$ car $(OE) \parallel (AB) \parallel (CD)$. Thalès : $\frac{AE}{AD} = \frac{AO}{AC} = \frac{4}{10} = \frac{2}{5}$.
:::
:::

:::exercice Problème 2 : la droite des milieux
Soit $ABC$ un triangle, $I$ le milieu de $[AB]$, et $(d)$ la parallèle à $(BC)$ passant par $I$. Elle coupe $(AC)$ en $J$.

1. On note $p$ la projection sur $(AC)$ parallèlement à $(BC)$. Donner $p(A)$, $p(B)$ et $p(I)$.
2. En déduire que $J$ est le milieu de $[AC]$.
3. Montrer que $IJ = \frac{1}{2}BC$, en utilisant le théorème de Thalès.

:::corrige
1. $p(A) = A$ car $A$ est sur $(AC)$ ; la parallèle à $(BC)$ passant par $B$ est $(BC)$, qui coupe $(AC)$ en $C$ : $p(B) = C$ ; la parallèle à $(BC)$ passant par $I$ est $(d)$ : $p(I) = J$.
2. $I$ est le milieu de $[AB]$, et la projection conserve le milieu : $J$ est le milieu de $[p(A)p(B)] = [AC]$.
3. $(IJ) \parallel (BC)$, donc $\frac{IJ}{BC} = \frac{AI}{AB} = \frac{1}{2}$.
:::
:::
