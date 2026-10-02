---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux exercices complets comme à l’examen national : équation du second degré, rotation, carré et homothétie, puis forme exponentielle et triangle équilatéral, avec les corrigés.
position: 30
visibility: enrolled
---

Ces deux problèmes ont la forme de l’exercice sur les nombres complexes de l’examen national : une équation, puis de la géométrie avec une transformation.

:::exercice Problème 1 : rotation, carré et homothétie
1. Résoudre dans $\mathbb{C}$ l’équation $z^2 - 6z + 13 = 0$.
2. Dans le plan complexe, on considère les points $A(3 + 2i)$ et $B(3 - 2i)$, et la rotation $R$ de centre $A$ et d’angle $\frac{\pi}{2}$. Donner l’écriture complexe de $R$ et montrer que l’image de $B$ est le point $C(7 + 2i)$.
3. Montrer que le triangle $ABC$ est rectangle et isocèle en $A$.
4. Soit $D$ l’image de $C$ par la translation de vecteur $\overrightarrow{AB}$. Calculer $z_D$ et montrer que $ABDC$ est un carré.
5. Soit $h$ l’homothétie de centre $A$ et de rapport $\frac{1}{2}$. Déterminer l’image de $D$ par $h$ et interpréter.

:::corrige
1. $\Delta = 36 - 52 = -16 = (4i)^2$ : $z = 3 - 2i$ ou $z = 3 + 2i$.
2. $z' - (3 + 2i) = i\left(z - (3 + 2i)\right)$, soit $z' = iz + 5 - i$. Alors $R(B)$ a pour affixe $i(3 - 2i) + 5 - i = 3i + 2 + 5 - i = 7 + 2i = z_C$.
3. Par définition de la rotation, $AC = AB$ et $\left(\overrightarrow{AB}, \overrightarrow{AC}\right) \equiv \frac{\pi}{2}$ $[2\pi]$ : $ABC$ est rectangle et isocèle en $A$.
4. $z_D = z_C + (z_B - z_A) = 7 + 2i - 4i = 7 - 2i$. Alors $\overrightarrow{CD} = \overrightarrow{AB}$ : $ABDC$ est un parallélogramme ; il a un angle droit en $A$ et deux côtés consécutifs égaux ($AB = AC$) : c’est un carré.
5. $z' - z_A = \frac{1}{2}(z_D - z_A) = \frac{1}{2}(4 - 4i) = 2 - 2i$, donc $z' = 5$. C’est le milieu de la diagonale $[AD]$, c’est-à-dire le centre du carré.
:::
:::

:::exercice Problème 2 : forme exponentielle et triangle équilatéral
1. Résoudre dans $\mathbb{C}$ l’équation $z^2 - 2\sqrt{3}z + 4 = 0$. On note $a$ la solution de partie imaginaire positive et $b$ l’autre.
2. Écrire $a$ et $b$ sous forme exponentielle, puis calculer $a^6$.
3. Soit $R$ la rotation de centre $O$ et d’angle $\frac{\pi}{3}$. Montrer que $R(B) = A$, où $A$ et $B$ sont les images de $a$ et $b$.
4. En déduire la nature du triangle $OAB$.
5. Déterminer l’affixe du centre de gravité $G$ du triangle $OAB$.

:::corrige
1. $\Delta = 12 - 16 = -4 = (2i)^2$ : $a = \sqrt{3} + i$ et $b = \sqrt{3} - i$.
2. $|a| = 2$, $a = 2e^{i\frac{\pi}{6}}$ et $b = \bar{a} = 2e^{-i\frac{\pi}{6}}$. $a^6 = 64e^{i\pi} = -64$.
3. $R$ s’écrit $z' = e^{i\frac{\pi}{3}}z$, et $e^{i\frac{\pi}{3}} \times 2e^{-i\frac{\pi}{6}} = 2e^{i\frac{\pi}{6}} = a$.
4. $OA = OB$ et $\left(\overrightarrow{OB}, \overrightarrow{OA}\right) \equiv \frac{\pi}{3}$ $[2\pi]$ : le triangle $OAB$ est équilatéral.
5. $z_G = \frac{0 + a + b}{3} = \frac{2\sqrt{3}}{3}$.
:::
:::
