---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux exercices complets comme à l’examen national : sphère, plan tangent, plan défini par trois points et cercle d’intersection, puis volume d’un tétraèdre avec le produit vectoriel, avec les corrigés.
position: 30
visibility: enrolled
---

L’espace est muni d’un repère orthonormé direct $(O, \vec{i}, \vec{j}, \vec{k})$.

:::exercice Problème 1 : sphère, plan tangent et cercle
On considère la sphère $(S) : x^2 + y^2 + z^2 - 2x - 4z + 2 = 0$ et les points $A(0 ; -1 ; 1)$, $B(1 ; 1 ; 0)$ et $C(2 ; 0 ; 1)$.

1. Déterminer le centre $\Omega$ et le rayon $R$ de $(S)$, et vérifier que $A \in (S)$.
2. Déterminer une équation du plan $(P)$ tangent à $(S)$ en $A$.
3. Calculer $\overrightarrow{AB} \wedge \overrightarrow{AC}$, et en déduire une équation du plan $(ABC)$ et l’aire du triangle $ABC$.
4. Montrer que $(ABC)$ coupe $(S)$ selon un cercle $(\Gamma)$ dont on donnera le rayon.
5. Déterminer le centre $H$ de $(\Gamma)$.

:::corrige
1. $(x - 1)^2 + y^2 + (z - 2)^2 = 1 + 4 - 2 = 3$ : $\Omega(1 ; 0 ; 2)$ et $R = \sqrt{3}$. Pour $A$ : $0 + 1 + 1 - 0 - 4 + 2 = 0$, donc $A \in (S)$.
2. $(P)$ a pour vecteur normal $\overrightarrow{\Omega A}(-1 ; -1 ; -1)$, ou $(1 ; 1 ; 1)$ : $x + y + z + d = 0$ avec $0 - 1 + 1 + d = 0$, soit $(P) : x + y + z = 0$. On vérifie : $d(\Omega, (P)) = \frac{3}{\sqrt{3}} = \sqrt{3} = R$.
3. $\overrightarrow{AB}(1 ; 2 ; -1)$, $\overrightarrow{AC}(2 ; 1 ; 0)$ : $\overrightarrow{AB} \wedge \overrightarrow{AC} = (0 + 1)\vec{i} - (0 + 2)\vec{j} + (1 - 4)\vec{k} = \vec{i} - 2\vec{j} - 3\vec{k}$. $(ABC) : x - 2y - 3z + d = 0$ avec $A$ : $2 - 3 + d = 0$, soit $x - 2y - 3z + 1 = 0$. Aire : $\frac{1}{2}\sqrt{1 + 4 + 9} = \frac{\sqrt{14}}{2}$.
4. $d(\Omega, (ABC)) = \frac{|1 - 0 - 6 + 1|}{\sqrt{14}} = \frac{4}{\sqrt{14}} < \sqrt{3}$ (car $\frac{16}{14} < 3$) : le rayon est $r = \sqrt{3 - \frac{16}{14}} = \sqrt{\frac{13}{7}}$.
5. $H$ est le projeté de $\Omega$ sur $(ABC)$ : $H(1 + t ; -2t ; 2 - 3t)$ et $(1 + t) + 4t - 3(2 - 3t) + 1 = 14t - 4 = 0$, donc $t = \frac{2}{7}$ et $H\left(\frac{9}{7} ; -\frac{4}{7} ; \frac{8}{7}\right)$.
:::
:::

:::exercice Problème 2 : volume d’un tétraèdre
On considère $A(1 ; 0 ; 0)$, $B(0 ; 2 ; 0)$ et $C(0 ; 0 ; 3)$.

1. Calculer $\overrightarrow{AB} \wedge \overrightarrow{AC}$.
2. En déduire une équation du plan $(ABC)$ et l’aire du triangle $ABC$.
3. Calculer la distance de $O$ au plan $(ABC)$.
4. En déduire le volume du tétraèdre $OABC$, et vérifier le résultat avec la base $OAB$.

:::corrige
1. $\overrightarrow{AB}(-1 ; 2 ; 0)$, $\overrightarrow{AC}(-1 ; 0 ; 3)$ : $\overrightarrow{AB} \wedge \overrightarrow{AC} = (6 - 0)\vec{i} - (-3 - 0)\vec{j} + (0 + 2)\vec{k} = 6\vec{i} + 3\vec{j} + 2\vec{k}$.
2. $(ABC) : 6x + 3y + 2z + d = 0$ avec $A$ : $6 + d = 0$, soit $6x + 3y + 2z - 6 = 0$. Aire : $\frac{1}{2}\sqrt{36 + 9 + 4} = \frac{7}{2}$.
3. $d(O, (ABC)) = \frac{6}{7}$.
4. $V = \frac{1}{3} \times \frac{7}{2} \times \frac{6}{7} = 1$. Avec la base $OAB$ (triangle rectangle d’aire $\frac{1 \times 2}{2} = 1$) et la hauteur $OC = 3$ : $V = \frac{1}{3} \times 1 \times 3 = 1$.
:::
:::
