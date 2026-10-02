---
title: Série 1 — partie 2 : plans, distances et sphères
kind: serie
summary: Équations de plans, plan médiateur, distance et projeté orthogonal, équations de sphères, sphère et plan, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours. Le repère est orthonormé.

:::exercice Équations de plans
1. Équation du plan passant par $A(2 ; 0 ; -1)$ et de vecteur normal $\vec{n}(1 ; 3 ; -2)$.
2. Équation du plan médiateur de $[AB]$ avec $A(0 ; 2 ; 1)$ et $B(2 ; 0 ; 3)$.
3. Les plans $x + 2y - z = 0$ et $2x - y + 1 = 0$ sont-ils perpendiculaires ?

:::corrige
1. $x + 3y - 2z + d = 0$ avec $2 + 2 + d = 0$ : $x + 3y - 2z - 4 = 0$.
2. Milieu $(1 ; 1 ; 2)$, normal $(2 ; -2 ; 2)$ ou $(1 ; -1 ; 1)$ : $x - y + z - 2 = 0$.
3. $(1 ; 2 ; -1) \cdot (2 ; -1 ; 0) = 2 - 2 = 0$ : oui.
:::
:::

:::exercice Distance et projeté
Soit $(P) : 2x - y + 2z + 1 = 0$ et $M(1 ; 2 ; 3)$.

1. Calculer $d(M, (P))$.
2. Déterminer le projeté orthogonal $H$ de $M$ sur $(P)$.

:::corrige
1. $\frac{|2 - 2 + 6 + 1|}{3} = \frac{7}{3}$.
2. $H = M + t(2 ; -1 ; 2)$ : $2(1 + 2t) - (2 - t) + 2(3 + 2t) + 1 = 9t + 7 = 0$, $t = -\frac{7}{9}$ : $H\left(-\frac{5}{9} ; \frac{25}{9} ; \frac{13}{9}\right)$. Vérification : $MH = |t| \times 3 = \frac{7}{3}$.
:::
:::

:::exercice Sphères
1. Reconnaître l’ensemble d’équation $x^2 + y^2 + z^2 - 2x + 4y - 6z + 5 = 0$.
2. Équation de la sphère de diamètre $[AB]$ avec $A(1 ; 0 ; 0)$ et $B(3 ; 2 ; 2)$.

:::corrige
1. $(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 1 + 4 + 9 - 5 = 9$ : sphère de centre $(1 ; -2 ; 3)$ et de rayon $3$.
2. Centre $(2 ; 1 ; 1)$, rayon $\frac{AB}{2} = \frac{\sqrt{12}}{2} = \sqrt{3}$ : $(x - 2)^2 + (y - 1)^2 + (z - 1)^2 = 3$.
:::
:::

:::exercice Sphère et plan
$(S) : (x - 1)^2 + y^2 + (z + 1)^2 = 16$. Étudier l’intersection de $(S)$ avec $(P_1) : x + y + z - 4 = 0$ et avec $(P_2) : z = 3$.

:::corrige
Centre $\Omega(1 ; 0 ; -1)$, $r = 4$. $d(\Omega, (P_1)) = \frac{|1 + 0 - 1 - 4|}{\sqrt{3}} = \frac{4}{\sqrt{3}} < 4$ : cercle de rayon $\sqrt{16 - \frac{16}{3}} = \sqrt{\frac{32}{3}} = \frac{4\sqrt{6}}{3}$. $d(\Omega, (P_2)) = 4 = r$ : $(P_2)$ est tangent à $(S)$ au point $(1 ; 0 ; 3)$.
:::
:::
