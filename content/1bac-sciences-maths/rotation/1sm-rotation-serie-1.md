---
title: Série 1 — partie 1 : définition et propriétés
kind: serie
summary: Angles orientés et Chasles, images de points par une rotation, rotation réciproque, conservation des distances et des angles, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Angles orientés
$ABC$ est un triangle équilatéral direct (on tourne de $A$ vers $B$ puis $C$ dans le sens direct).

1. Donner une mesure de $\left(\overrightarrow{AB}, \overrightarrow{AC}\right)$ et de $\left(\overrightarrow{AC}, \overrightarrow{AB}\right)$.
2. Donner une mesure de $\left(\overrightarrow{AB}, \overrightarrow{BC}\right)$.

:::corrige
1. $\frac{\pi}{3}$ et $-\frac{\pi}{3}$.
2. $\left(\overrightarrow{AB}, \overrightarrow{BC}\right) = \left(\overrightarrow{AB}, \overrightarrow{BA}\right) + \left(\overrightarrow{BA}, \overrightarrow{BC}\right) \equiv \pi - \frac{\pi}{3} = \frac{2\pi}{3} \ [2\pi]$.
:::
:::

:::exercice Images par une rotation
$ABCD$ est un carré direct de centre $O$. On note $R$ la rotation de centre $O$ et d’angle $\frac{\pi}{2}$.

1. Déterminer les images de $A$, $B$, $C$ et $D$ par $R$.
2. Déterminer l’image de la droite $(AB)$ et celle du segment $[AC]$.
3. Quelle est la rotation réciproque de $R$ ? Que vaut $R^{-1}(A)$ ?

:::corrige
1. $R(A) = B$, $R(B) = C$, $R(C) = D$, $R(D) = A$.
2. $R((AB)) = (BC)$ et $R([AC]) = [BD]$.
3. La rotation de centre $O$ et d’angle $-\frac{\pi}{2}$ ; $R^{-1}(A) = D$.
:::
:::

:::exercice Conservation
Soit $R$ une rotation de centre $\Omega$, et $A$, $B$, $C$ trois points d’images $A'$, $B'$, $C'$.

1. Si $I$ est le milieu de $[AB]$, quelle est l’image de $I$ ?
2. Si $ABC$ est rectangle en $A$, que peut-on dire de $A'B'C'$ ?
3. Si $AB = 5$, que vaut $A'B'$ ?

:::corrige
1. Le milieu de $[A'B']$ (conservation des milieux).
2. $A'B'C'$ est rectangle en $A'$ (conservation des angles), et isométrique à $ABC$.
3. $A'B' = 5$.
:::
:::

:::exercice Triangle équilatéral
Soit $A$ et $B$ deux points distincts, et $R$ la rotation de centre $A$ et d’angle $\frac{\pi}{3}$. On note $C = R(B)$.

1. Montrer que $ABC$ est équilatéral.
2. Soit $D$ l’image de $C$ par $R$. Montrer que $B$, $A$ et $D$ ne sont pas alignés et calculer $\left(\overrightarrow{AB}, \overrightarrow{AD}\right)$.

:::corrige
1. $AC = AB$ et $\left(\overrightarrow{AB}, \overrightarrow{AC}\right) \equiv \frac{\pi}{3}$ : le triangle isocèle en $A$ a un angle de $60°$ au sommet, il est équilatéral.
2. $\left(\overrightarrow{AB}, \overrightarrow{AD}\right) = \left(\overrightarrow{AB}, \overrightarrow{AC}\right) + \left(\overrightarrow{AC}, \overrightarrow{AD}\right) \equiv \frac{2\pi}{3} \ [2\pi]$, qui n’est ni $0$ ni $\pi$ : les points ne sont pas alignés.
:::
:::
