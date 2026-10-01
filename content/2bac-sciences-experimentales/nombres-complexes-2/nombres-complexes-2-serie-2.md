---
title: Série 1 — partie 2 : transformations du plan
kind: serie
summary: Écriture complexe d’une rotation et d’une homothétie, reconnaître une transformation, image d’un cercle, triangle équilatéral et rectangle isocèle, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Rotation
Dans le plan complexe, on considère $A(2)$, $\Omega(1 + i)$ et la rotation $R$ de centre $\Omega$ et d’angle $\frac{\pi}{2}$.

1. Donner l’écriture complexe de $R$.
2. Déterminer l’affixe de $B = R(A)$.
3. Montrer que le triangle $\Omega AB$ est rectangle isocèle en $\Omega$.

:::corrige
1. $z' - (1 + i) = e^{i\frac{\pi}{2}}\left(z - (1 + i)\right) = i\left(z - 1 - i\right)$, soit $z' = iz + 2$.
2. $z_B = 2i + 2 = 2 + 2i$.
3. Par définition de la rotation, $\Omega B = \Omega A$ et $\left(\overrightarrow{\Omega A}, \overrightarrow{\Omega B}\right) \equiv \frac{\pi}{2}$ $[2\pi]$ : le triangle $\Omega AB$ est rectangle isocèle en $\Omega$. On le vérifie : $\dfrac{z_B - z_\Omega}{z_A - z_\Omega} = \dfrac{1 + i}{1 - i} = \dfrac{(1 + i)^2}{2} = i$.
:::
:::

:::exercice Reconnaître une transformation
Reconnaître chaque transformation et donner ses éléments caractéristiques.

1. $z' = z + 2 - i$
2. $z' = 3z - 2i$
3. $z' = iz + 1 + i$
4. $z' = -z + 4$

:::corrige
1. Translation de vecteur d’affixe $2 - i$.
2. $a = 3$ réel, $a \neq 1$ : homothétie de rapport $3$ et de centre $\omega = \frac{-2i}{1 - 3} = i$.
3. $|i| = 1$, $i \neq 1$ : rotation d’angle $\arg i = \frac{\pi}{2}$ et de centre $\omega = \frac{1 + i}{1 - i} = \frac{(1 + i)^2}{2} = i$.
4. $a = -1$ : homothétie de rapport $-1$ (c’est la symétrie centrale) de centre $\omega = \frac{4}{2} = 2$.
:::
:::

:::exercice Homothétie et cercle
Soit $h$ l’homothétie de centre $\Omega(1 + i)$ et de rapport $-2$.

1. Donner l’écriture complexe de $h$.
2. Déterminer l’image du point $A(2 + i)$.
3. Déterminer l’image par $h$ du cercle $(\mathcal{C})$ de centre $A$ et de rayon $1$.

:::corrige
1. $z' - (1 + i) = -2\left(z - (1 + i)\right)$, soit $z' = -2z + 3 + 3i$.
2. $z_{A'} = -2(2 + i) + 3 + 3i = -1 + i$.
3. C’est le cercle de centre $A'(-1 + i)$ et de rayon $|-2| \times 1 = 2$.
:::
:::

:::exercice Triangle équilatéral
On considère $A(2)$ et $B\left(1 + i\sqrt{3}\right)$, et la rotation $R$ de centre $O$ et d’angle $\frac{\pi}{3}$.

1. Donner l’écriture complexe de $R$.
2. Montrer que $R(A) = B$ et en déduire la nature du triangle $OAB$.
3. Déterminer l’affixe de $C = R(B)$, et montrer que $O$ est le milieu de $[AC']$, où $C'$ est l’image de $C$ par $R$.

:::corrige
1. $z' = e^{i\frac{\pi}{3}}z = \left(\frac{1}{2} + i\frac{\sqrt{3}}{2}\right)z$.
2. $e^{i\frac{\pi}{3}} \times 2 = 1 + i\sqrt{3} = z_B$. Donc $OA = OB$ et $\left(\overrightarrow{OA}, \overrightarrow{OB}\right) \equiv \frac{\pi}{3}$ $[2\pi]$ : $OAB$ est équilatéral.
3. $z_C = e^{i\frac{\pi}{3}} \times 2e^{i\frac{\pi}{3}} = 2e^{i\frac{2\pi}{3}} = -1 + i\sqrt{3}$, puis $z_{C'} = 2e^{i\pi} = -2 = -z_A$ : $O$ est le milieu de $[AC']$.
:::
:::
