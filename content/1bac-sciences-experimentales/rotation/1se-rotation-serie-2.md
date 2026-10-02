---
title: Série 1 — partie 2 : constructions et applications
kind: serie
summary: Déterminer une rotation, démontrer des égalités de longueurs et des perpendicularités, triangles équilatéraux et carrés construits sur les côtés, avec les corrigés.
position: 20
visibility: enrolled
---

Trois exercices sur la deuxième partie du cours.

:::exercice Déterminer une rotation
$ABC$ est un triangle équilatéral direct de centre $O$.

1. Montrer qu’il existe une rotation de centre $O$ qui transforme $A$ en $B$, $B$ en $C$ et $C$ en $A$, et donner son angle.
2. En déduire l’image du milieu de $[AB]$.

:::corrige
1. $OA = OB = OC$ et $\left(\overrightarrow{OA}, \overrightarrow{OB}\right) \equiv \left(\overrightarrow{OB}, \overrightarrow{OC}\right) \equiv \frac{2\pi}{3}$ : la rotation de centre $O$ et d’angle $\frac{2\pi}{3}$ convient.
2. Le milieu de $[AB]$ a pour image le milieu de $[BC]$.
:::
:::

:::exercice Carrés sur les côtés d’un triangle
Soit $ABC$ un triangle. On construit, à l’extérieur, les carrés $ABDE$ et $ACFG$, de sorte que $\left(\overrightarrow{AE}, \overrightarrow{AB}\right) \equiv \frac{\pi}{2}$ et $\left(\overrightarrow{AC}, \overrightarrow{AG}\right) \equiv \frac{\pi}{2}$. Soit $R$ la rotation de centre $A$ et d’angle $\frac{\pi}{2}$.

1. Déterminer $R(E)$ et $R(C)$.
2. En déduire que $EC = BG$ et que les droites $(EC)$ et $(BG)$ sont perpendiculaires.

:::corrige
1. $AB = AE$ et $\left(\overrightarrow{AE}, \overrightarrow{AB}\right) \equiv \frac{\pi}{2}$ : $R(E) = B$. De même $R(C) = G$.
2. $R$ transforme le segment $[EC]$ en $[BG]$ : $EC = BG$, et l’angle entre les deux droites vaut $\frac{\pi}{2}$ : elles sont perpendiculaires.
:::
:::

:::exercice Triangles équilatéraux
Soit $A$, $B$, $C$ trois points alignés dans cet ordre, la droite $(AC)$ horizontale, $A$ à gauche. On construit au-dessus de la droite les triangles équilatéraux $ABD$ et $BCE$. Le plan est orienté dans le sens direct.

1. Montrer que $\left(\overrightarrow{BA}, \overrightarrow{BD}\right) \equiv -\frac{\pi}{3}$ et $\left(\overrightarrow{BE}, \overrightarrow{BC}\right) \equiv -\frac{\pi}{3}$ $[2\pi]$.
2. En déduire que la rotation $R$ de centre $B$ et d’angle $-\frac{\pi}{3}$ transforme $A$ en $D$ et $E$ en $C$.
3. Montrer que $AE = DC$.

:::corrige
1. Repérons les directions par leur angle avec l’horizontale orientée vers la droite : $\overrightarrow{BA}$ fait $\pi$, $\overrightarrow{BD}$ fait $\pi - \frac{\pi}{3} = \frac{2\pi}{3}$ (le triangle $ABD$ est au-dessus), donc $\left(\overrightarrow{BA}, \overrightarrow{BD}\right) \equiv \frac{2\pi}{3} - \pi = -\frac{\pi}{3}$. De même $\overrightarrow{BC}$ fait $0$ et $\overrightarrow{BE}$ fait $\frac{\pi}{3}$, donc $\left(\overrightarrow{BE}, \overrightarrow{BC}\right) \equiv -\frac{\pi}{3}$.
2. $BD = BA$ et $\left(\overrightarrow{BA}, \overrightarrow{BD}\right) \equiv -\frac{\pi}{3}$ : $R(A) = D$. $BC = BE$ et $\left(\overrightarrow{BE}, \overrightarrow{BC}\right) \equiv -\frac{\pi}{3}$ : $R(E) = C$.
3. $R$ transforme le segment $[AE]$ en $[DC]$ et conserve les distances : $AE = DC$.
:::
:::
