---
title: Série 1 — partie 2 : produit vectoriel et droites
kind: serie
summary: Produit vectoriel, alignement, aire d’un triangle, distance à une droite, représentation paramétrique, intersections d’une droite avec un plan et une sphère, et un exercice complet, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours. L’espace est muni d’un repère orthonormé direct $(O, \vec{i}, \vec{j}, \vec{k})$.

:::exercice Calculs de produits vectoriels
Soit $\vec{u}(1 ; 2 ; -1)$ et $\vec{v}(3 ; 0 ; 2)$.

1. Calculer $\vec{w} = \vec{u} \wedge \vec{v}$ et vérifier que $\vec{w}$ est orthogonal à $\vec{u}$ et à $\vec{v}$.
2. Les points $A(1 ; 1 ; 1)$, $B(2 ; 3 ; 0)$ et $C(4 ; 7 ; -2)$ sont-ils alignés ?

:::corrige
1. $\vec{w} = (2 \times 2 - (-1) \times 0)\vec{i} - (1 \times 2 - (-1) \times 3)\vec{j} + (1 \times 0 - 2 \times 3)\vec{k} = 4\vec{i} - 5\vec{j} - 6\vec{k}$. $\vec{w} \cdot \vec{u} = 4 - 10 + 6 = 0$ et $\vec{w} \cdot \vec{v} = 12 + 0 - 12 = 0$.
2. $\overrightarrow{AB}(1 ; 2 ; -1)$ et $\overrightarrow{AC}(3 ; 6 ; -3) = 3\overrightarrow{AB}$ : $\overrightarrow{AB} \wedge \overrightarrow{AC} = \vec{0}$, les points sont alignés.
:::
:::

:::exercice Aire d’un triangle et distance à une droite
On considère $A(1 ; 0 ; 0)$, $B(1 ; 2 ; 0)$ et $C(0 ; 0 ; 3)$.

1. Calculer $\overrightarrow{AB} \wedge \overrightarrow{AC}$ et l’aire du triangle $ABC$.
2. En déduire une équation du plan $(ABC)$.
3. Calculer la distance du point $C$ à la droite $(AB)$.

:::corrige
1. $\overrightarrow{AB}(0 ; 2 ; 0)$, $\overrightarrow{AC}(-1 ; 0 ; 3)$ : $\overrightarrow{AB} \wedge \overrightarrow{AC} = (2 \times 3 - 0)\vec{i} - (0 \times 3 - 0 \times (-1))\vec{j} + (0 \times 0 - 2 \times (-1))\vec{k} = 6\vec{i} + 2\vec{k}$. L’aire vaut $\frac{1}{2}\sqrt{36 + 4} = \sqrt{10}$.
2. Vecteur normal $(6 ; 0 ; 2)$, ou $(3 ; 0 ; 1)$ : $3x + z + d = 0$ avec $A$ : $3 + d = 0$. $(ABC) : 3x + z - 3 = 0$.
3. $d(C, (AB)) = \frac{\left\|\overrightarrow{AC} \wedge \overrightarrow{AB}\right\|}{AB} = \frac{\sqrt{40}}{2} = \sqrt{10}$. (On retrouve l’aire : $\frac{1}{2} \times AB \times d = \sqrt{10}$.)
:::
:::

:::exercice Droite, plan et sphère
Soit $(D)$ la droite passant par $A(1 ; 1 ; 0)$ et de vecteur directeur $\vec{u}(1 ; -1 ; 2)$, le plan $(P) : x + y + z - 4 = 0$ et la sphère $(S) : x^2 + y^2 + z^2 = 6$.

1. Donner une représentation paramétrique de $(D)$.
2. Déterminer l’intersection de $(D)$ et de $(P)$.
3. Déterminer l’intersection de $(D)$ et de $(S)$.

:::corrige
1. $x = 1 + t$, $y = 1 - t$, $z = 2t$ ($t \in \mathbb{R}$).
2. $(1 + t) + (1 - t) + 2t - 4 = 0$, soit $2t - 2 = 0$ et $t = 1$ : le point $(2 ; 0 ; 2)$.
3. $(1 + t)^2 + (1 - t)^2 + 4t^2 = 6$, soit $2 + 6t^2 = 6$ et $t^2 = \frac{2}{3}$ : $t = \pm\sqrt{\frac{2}{3}}$. La droite coupe la sphère en deux points, $\left(1 + \sqrt{\tfrac{2}{3}} ; 1 - \sqrt{\tfrac{2}{3}} ; 2\sqrt{\tfrac{2}{3}}\right)$ et $\left(1 - \sqrt{\tfrac{2}{3}} ; 1 + \sqrt{\tfrac{2}{3}} ; -2\sqrt{\tfrac{2}{3}}\right)$.
:::
:::

:::exercice Plan, sphère et droite
On considère les points $A(1 ; 0 ; 1)$, $B(2 ; 1 ; 1)$ et $C(1 ; 1 ; 2)$, et la sphère $(S)$ d’équation $x^2 + y^2 + z^2 - 2x - 4y - 4 = 0$.

1. Calculer $\overrightarrow{AB} \wedge \overrightarrow{AC}$ et en déduire une équation cartésienne du plan $(ABC)$.
2. Déterminer le centre $\Omega$ et le rayon $R$ de $(S)$.
3. Calculer la distance de $\Omega$ au plan $(ABC)$, et en déduire que $(ABC)$ coupe $(S)$ selon un cercle dont on donnera le rayon.
4. Donner une représentation paramétrique de la droite $(\Delta)$ passant par $\Omega$ et perpendiculaire au plan $(ABC)$, puis déterminer le centre du cercle.

:::corrige
1. $\overrightarrow{AB}(1 ; 1 ; 0)$ et $\overrightarrow{AC}(0 ; 1 ; 1)$, donc $\overrightarrow{AB} \wedge \overrightarrow{AC} = (1 \times 1 - 0 \times 1)\vec{i} - (1 \times 1 - 0 \times 0)\vec{j} + (1 \times 1 - 1 \times 0)\vec{k} = \vec{i} - \vec{j} + \vec{k}$. Ce vecteur est normal à $(ABC)$, qui a donc une équation $x - y + z + d = 0$ ; $A$ lui appartient : $1 - 0 + 1 + d = 0$, donc $(ABC) : x - y + z - 2 = 0$.
2. $(x - 1)^2 + (y - 2)^2 + z^2 = 4 + 1 + 4 = 9$ : $\Omega(1 ; 2 ; 0)$ et $R = 3$.
3. $d(\Omega, (ABC)) = \dfrac{|1 - 2 + 0 - 2|}{\sqrt{1 + 1 + 1}} = \dfrac{3}{\sqrt{3}} = \sqrt{3}$. Comme $\sqrt{3} < 3$, le plan coupe la sphère selon un cercle de rayon $r = \sqrt{R^2 - d^2} = \sqrt{9 - 3} = \sqrt{6}$.
4. $(\Delta)$ a pour vecteur directeur $\vec{n}(1 ; -1 ; 1)$ : $x = 1 + t$, $y = 2 - t$, $z = t$ ($t \in \mathbb{R}$). Le centre du cercle est l’intersection de $(\Delta)$ et du plan : $(1 + t) - (2 - t) + t - 2 = 0$, soit $3t - 3 = 0$ et $t = 1$. Le centre est $H(2 ; 1 ; 1)$.
:::
:::
