---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets : un triangle étudié avec Al-Kashi et la médiane, puis un cercle, ses tangentes et une droite dans un repère, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un triangle
Soit $ABC$ un triangle tel que $AB = 4$, $AC = 5$ et $\overrightarrow{AB} \cdot \overrightarrow{AC} = 10$.

1. Calculer $\cos\hat{A}$ et une mesure de l’angle $\hat{A}$.
2. Calculer $BC$.
3. Calculer la longueur de la médiane issue de $A$.
4. Calculer l’aire du triangle $ABC$.

:::corrige
1. $4 \times 5 \times \cos\hat{A} = 10$, donc $\cos\hat{A} = \frac{1}{2}$ et $\hat{A} = 60°$.
2. $BC^2 = 16 + 25 - 2 \times 4 \times 5 \times \frac{1}{2} = 21$, $BC = \sqrt{21}$.
3. Avec $I$ milieu de $[BC]$ : $16 + 25 = 2AI^2 + \frac{21}{2}$, donc $AI^2 = \frac{61}{4}$ et $AI = \frac{\sqrt{61}}{2}$.
4. Aire $= \frac{1}{2} \times AB \times AC \times \sin\hat{A} = \frac{1}{2} \times 20 \times \frac{\sqrt{3}}{2} = 5\sqrt{3}$.
:::
:::

:::exercice Problème 2 : cercle et tangentes
Dans un repère orthonormé, soit $(\mathcal{C}) : x^2 + y^2 - 2x + 4y - 20 = 0$.

1. Déterminer le centre $\Omega$ et le rayon $r$ de $(\mathcal{C})$.
2. Vérifier que $A(4 ; 2)$ appartient à $(\mathcal{C})$, et donner l’équation de la tangente $(T)$ en $A$.
3. Pour quelles valeurs du réel $m$ la droite $(D_m) : 3x - 4y + m = 0$ est-elle tangente à $(\mathcal{C})$ ?
4. Déterminer les points d’intersection de $(\mathcal{C})$ avec l’axe des abscisses.

:::corrige
1. $(x - 1)^2 + (y + 2)^2 = 1 + 4 + 20 = 25$ : $\Omega(1 ; -2)$, $r = 5$.
2. $16 + 4 - 8 + 8 - 20 = 0$. Vecteur normal $\overrightarrow{\Omega A}(3 ; 4)$ : $3x + 4y + c = 0$ avec $12 + 8 + c = 0$, soit $(T) : 3x + 4y - 20 = 0$.
3. $d(\Omega, (D_m)) = \frac{|3 + 8 + m|}{5} = 5 \iff |11 + m| = 25 \iff m = 14$ ou $m = -36$.
4. $y = 0$ : $x^2 - 2x - 20 = 0$, $x = 1 \pm \sqrt{21}$. Les points sont $\left(1 + \sqrt{21} ; 0\right)$ et $\left(1 - \sqrt{21} ; 0\right)$.
:::
:::
