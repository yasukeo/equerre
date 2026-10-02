---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Un problème complet : plan défini par trois points, aire, distance d’un point au plan et à une droite, volume d’un tétraèdre, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème : un tétraèdre
Le repère est orthonormé direct. On considère $A(1 ; 0 ; 1)$, $B(3 ; 2 ; 1)$, $C(1 ; 2 ; 3)$ et $D(0 ; 4 ; 0)$.

1. Calculer $\overrightarrow{AB} \wedge \overrightarrow{AC}$ et en déduire que $A$, $B$, $C$ définissent un plan.
2. Donner une équation du plan $(ABC)$.
3. Calculer l’aire du triangle $ABC$.
4. Calculer la distance de $D$ au plan $(ABC)$.
5. En déduire le volume du tétraèdre $ABCD$.
6. Calculer la distance de $C$ à la droite $(AB)$, et vérifier la cohérence avec l’aire.

:::corrige
1. $\overrightarrow{AB}(2 ; 2 ; 0)$, $\overrightarrow{AC}(0 ; 2 ; 2)$ : $\overrightarrow{AB} \wedge \overrightarrow{AC} = (2 \times 2 - 0 \times 2 ; -(2 \times 2 - 0 \times 0) ; 2 \times 2 - 2 \times 0) = (4 ; -4 ; 4) \neq \vec{0}$.
2. Normal $(1 ; -1 ; 1)$ : $x - y + z + d = 0$ avec $A$ : $1 + 1 + d = 0$, soit $x - y + z - 2 = 0$.
3. $\frac{1}{2}\sqrt{16 \times 3} = 2\sqrt{3}$.
4. $\frac{|0 - 4 + 0 - 2|}{\sqrt{3}} = \frac{6}{\sqrt{3}} = 2\sqrt{3}$.
5. $V = \frac{1}{3} \times 2\sqrt{3} \times 2\sqrt{3} = 4$.
6. $d(C, (AB)) = \frac{\left\|\overrightarrow{AC} \wedge \overrightarrow{AB}\right\|}{AB} = \frac{4\sqrt{3}}{2\sqrt{2}} = \sqrt{6}$. Aire $= \frac{1}{2} \times AB \times d = \frac{1}{2} \times 2\sqrt{2} \times \sqrt{6} = \sqrt{12} = 2\sqrt{3}$ : cohérent.
:::
:::
