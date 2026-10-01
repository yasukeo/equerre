---
title: Série 1 : géométrie dans l’espace
kind: serie
summary: Plan défini par trois points, distance à un plan, sphère et plan tangent, intersection d’une droite et d’un plan, avec les corrigés.
position: 10
visibility: public
---

Un exercice complet, dans l’esprit de l’examen national. L’espace est muni d’un repère orthonormé direct $(O, \vec{i}, \vec{j}, \vec{k})$.

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
