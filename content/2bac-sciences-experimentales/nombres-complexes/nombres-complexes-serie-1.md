---
title: Série 1 — partie 1 : forme algébrique
kind: serie
summary: Calculs sous forme algébrique, puissances de i, conjugué, équations du premier degré dans C, affixes, milieu et alignement, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Forme algébrique
Écrire sous forme algébrique :

1. $(3 - 2i)(1 + 4i)$
2. $\dfrac{2 + i}{1 - i}$
3. $(1 + i)^4$

:::corrige
1. $3 + 12i - 2i - 8i^2 = 3 + 10i + 8 = 11 + 10i$.
2. $\dfrac{(2 + i)(1 + i)}{(1 - i)(1 + i)} = \dfrac{2 + 2i + i + i^2}{2} = \dfrac{1 + 3i}{2} = \dfrac{1}{2} + \dfrac{3}{2}i$.
3. $(1 + i)^2 = 1 + 2i + i^2 = 2i$, donc $(1 + i)^4 = (2i)^2 = -4$.
:::
:::

:::exercice Puissances de i et conjugué
1. Calculer $i^{2025}$ et $i^{2026} + i^{2027}$.
2. Soit $z = 2 - 3i$. Calculer $z + \bar{z}$, $z - \bar{z}$ et $z\bar{z}$.
3. Soit $z = x + iy$ ($x, y$ réels). Écrire $Z = z^2 + \bar{z}$ sous forme algébrique, et trouver les $z$ pour lesquels $Z$ est réel.

:::corrige
1. $2025 = 4 \times 506 + 1$, donc $i^{2025} = i$. Puis $i^{2026} + i^{2027} = i^2 + i^3 = -1 - i$.
2. $z + \bar{z} = 4$, $z - \bar{z} = -6i$, $z\bar{z} = 4 + 9 = 13$.
3. $Z = x^2 - y^2 + 2ixy + x - iy = \left(x^2 - y^2 + x\right) + i\,y(2x - 1)$. $Z$ est réel si et seulement si $y = 0$ ou $x = \frac{1}{2}$ : $z$ est réel, ou sa partie réelle vaut $\frac{1}{2}$.
:::
:::

:::exercice Équations du premier degré
Résoudre dans $\mathbb{C}$ :

1. $(2 - i)z + 3i = 1$
2. $\dfrac{z + 1}{z - 1} = i$ (avec $z \neq 1$)
3. $z + 2\bar{z} = 6 - 2i$

:::corrige
1. $(2 - i)z = 1 - 3i$, donc $z = \frac{1 - 3i}{2 - i} = \frac{(1 - 3i)(2 + i)}{5} = \frac{2 + i - 6i + 3}{5} = \frac{5 - 5i}{5} = 1 - i$.
2. $z + 1 = i(z - 1)$, donc $z(1 - i) = -1 - i$ et $z = \frac{-1 - i}{1 - i} = \frac{(-1 - i)(1 + i)}{2} = \frac{-1 - 2i - i^2}{2} = -i$, qui est bien différent de $1$.
3. Avec $z = x + iy$ : $x + iy + 2x - 2iy = 3x - iy = 6 - 2i$, donc $x = 2$ et $y = 2$ : $z = 2 + 2i$.
:::
:::

:::exercice Affixes et alignement
On considère les points $A(1 + 2i)$, $B(3 - i)$ et $C(-1 + 5i)$.

1. Calculer les affixes des vecteurs $\overrightarrow{AB}$ et $\overrightarrow{AC}$, et celle du milieu $I$ de $[BC]$.
2. Montrer que $A$, $B$ et $C$ sont alignés.
3. Soit $E$ le point d’affixe $i$. Déterminer l’affixe du point $D$ tel que $ABDE$ soit un parallélogramme.

:::corrige
1. $z_{\overrightarrow{AB}} = 2 - 3i$, $z_{\overrightarrow{AC}} = -2 + 3i$, $z_I = \frac{(3 - i) + (-1 + 5i)}{2} = 1 + 2i$.
2. $\frac{z_C - z_A}{z_B - z_A} = \frac{-2 + 3i}{2 - 3i} = -1$ est réel : les points sont alignés (et $A$ est le milieu de $[BC]$, puisque $z_I = z_A$).
3. $ABDE$ est un parallélogramme si et seulement si $\overrightarrow{ED} = \overrightarrow{AB}$, soit $z_D - z_E = z_B - z_A$. Donc $z_D = i + 2 - 3i = 2 - 2i$.
:::
:::
