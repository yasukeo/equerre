---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets : un tétraèdre avec plan, hauteur et volume, puis une sphère, un plan tangent et un cercle d’intersection, avec les corrigés.
position: 30
visibility: enrolled
---

Le repère est orthonormé.

:::exercice Problème 1 : un tétraèdre
$A(2 ; 0 ; 0)$, $B(0 ; 2 ; 0)$, $C(0 ; 0 ; 2)$ et $O$ l’origine.

1. Montrer que le plan $(ABC)$ a pour équation $x + y + z - 2 = 0$.
2. Calculer la distance de $O$ au plan $(ABC)$.
3. Montrer que $ABC$ est équilatéral et calculer son aire.
4. Calculer le volume du tétraèdre $OABC$ de deux façons.

:::corrige
1. $A$, $B$, $C$ (non alignés) vérifient l’équation.
2. $\frac{|-2|}{\sqrt{3}} = \frac{2}{\sqrt{3}}$.
3. $AB = BC = CA = 2\sqrt{2}$ ; aire $= \frac{\sqrt{3}}{4} \times 8 = 2\sqrt{3}$.
4. $V = \frac{1}{3} \times 2\sqrt{3} \times \frac{2}{\sqrt{3}} = \frac{4}{3}$, et avec la base $OAB$ (aire $2$) et la hauteur $OC = 2$ : $V = \frac{1}{3} \times 2 \times 2 = \frac{4}{3}$.
:::
:::

:::exercice Problème 2 : sphère et plans
Soit $(S) : x^2 + y^2 + z^2 - 4x - 2z - 4 = 0$.

1. Déterminer le centre $\Omega$ et le rayon $r$ de $(S)$.
2. Vérifier que $A(4 ; 2 ; 2)$ est sur $(S)$ et donner l’équation du plan tangent en $A$.
3. Soit $(P) : x - 2y + 2z = 0$. Montrer que $(P)$ coupe $(S)$ selon un cercle dont on donnera le centre et le rayon.

:::corrige
1. $(x - 2)^2 + y^2 + (z - 1)^2 = 4 + 1 + 4 = 9$ : $\Omega(2 ; 0 ; 1)$, $r = 3$.
2. $16 + 4 + 4 - 16 - 4 - 4 = 0$. Normal $\overrightarrow{\Omega A}(2 ; 2 ; 1)$ : $2x + 2y + z + d = 0$ avec $8 + 4 + 2 + d = 0$, soit $2x + 2y + z - 14 = 0$.
3. $d(\Omega, (P)) = \frac{|2 - 0 + 2|}{3} = \frac{4}{3} < 3$ : cercle de rayon $\sqrt{9 - \frac{16}{9}} = \frac{\sqrt{65}}{3}$. Son centre $H = \Omega + t(1 ; -2 ; 2)$ : $(2 + t) - 2(-2t) + 2(1 + 2t) = 9t + 4 = 0$, $t = -\frac{4}{9}$ : $H\left(\frac{14}{9} ; \frac{8}{9} ; \frac{1}{9}\right)$.
:::
:::
