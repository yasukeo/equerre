---
title: Série 1 : nombres complexes
kind: serie
summary: Forme algébrique, module et argument, forme trigonométrique, équation du second degré et nature d’un triangle, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur les nombres complexes.

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

:::exercice Module, argument, forme trigonométrique
Soit $z = -1 + i$.

1. Calculer le module et un argument de $z$, et écrire $z$ sous forme trigonométrique.
2. En déduire $z^8$.

:::corrige
1. $|z| = \sqrt{1 + 1} = \sqrt{2}$. $\cos\theta = -\frac{1}{\sqrt{2}} = -\frac{\sqrt{2}}{2}$ et $\sin\theta = \frac{\sqrt{2}}{2}$, donc $\theta = \frac{3\pi}{4}$ et $z = \sqrt{2}\left(\cos\frac{3\pi}{4} + i\sin\frac{3\pi}{4}\right)$.
2. Par la formule de Moivre, $z^8 = \left(\sqrt{2}\right)^8 \left(\cos(6\pi) + i\sin(6\pi)\right) = 16$.
:::
:::

:::exercice Équation du second degré
Résoudre dans $\mathbb{C}$ l’équation $z^2 - 4z + 13 = 0$, puis placer les images des solutions dans le plan complexe.

:::corrige
$\Delta = 16 - 52 = -36 = (6i)^2$, donc $z_1 = \frac{4 - 6i}{2} = 2 - 3i$ et $z_2 = 2 + 3i$. Les deux solutions sont conjuguées : leurs images $M_1(2 ; -3)$ et $M_2(2 ; 3)$ sont symétriques par rapport à l’axe des abscisses. On vérifie : $z_1 + z_2 = 4$ et $z_1 z_2 = 4 + 9 = 13$.
:::
:::

:::exercice Interprétation géométrique
Dans le plan complexe, on considère les points $A$, $B$ et $C$ d’affixes $z_A = 1 + i$, $z_B = 3 + 2i$ et $z_C = 3i$.

1. Calculer $Z = \dfrac{z_C - z_A}{z_B - z_A}$ sous forme algébrique.
2. En déduire la nature du triangle $ABC$.

:::corrige
1. $z_C - z_A = -1 + 2i$ et $z_B - z_A = 2 + i$, donc $Z = \dfrac{(-1 + 2i)(2 - i)}{(2 + i)(2 - i)} = \dfrac{-2 + i + 4i - 2i^2}{5} = \dfrac{5i}{5} = i$.
2. $|Z| = 1$, donc $AC = AB$ ; et $\arg Z \equiv \frac{\pi}{2}$ $[2\pi]$, donc $\left(\overrightarrow{AB}, \overrightarrow{AC}\right) \equiv \frac{\pi}{2}$ $[2\pi]$. Le triangle $ABC$ est rectangle et isocèle en $A$.
:::
:::
