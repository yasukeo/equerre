---
title: Série 1 — partie 1 : produit scalaire, plans et sphères
kind: serie
summary: Produit scalaire et orthogonalité, équations de plans, plan médiateur, distance et projeté orthogonal, équation d’une sphère, position d’une sphère et d’un plan, avec les corrigés.
position: 10
visibility: public
---

Cinq exercices sur la première partie du cours. L’espace est muni d’un repère orthonormé direct $(O, \vec{i}, \vec{j}, \vec{k})$.

:::exercice Produit scalaire et orthogonalité
On considère $A(1 ; 2 ; 0)$, $B(3 ; 1 ; 2)$ et $C(2 ; 4 ; 0)$.

1. Calculer $\overrightarrow{AB} \cdot \overrightarrow{AC}$. Que peut-on en déduire ?
2. Calculer $AB$ et $AC$, puis l’aire du triangle $ABC$.

:::corrige
1. $\overrightarrow{AB}(2 ; -1 ; 2)$ et $\overrightarrow{AC}(1 ; 2 ; 0)$ : $\overrightarrow{AB} \cdot \overrightarrow{AC} = 2 - 2 + 0 = 0$. Le triangle $ABC$ est rectangle en $A$.
2. $AB = \sqrt{4 + 1 + 4} = 3$ et $AC = \sqrt{1 + 4} = \sqrt{5}$. L’aire vaut $\frac{AB \times AC}{2} = \frac{3\sqrt{5}}{2}$.
:::
:::

:::exercice Équations de plans
1. Déterminer une équation du plan $(P)$ passant par $A(1 ; 0 ; 2)$ et de vecteur normal $\vec{n}(2 ; 1 ; -1)$.
2. Déterminer une équation du plan médiateur de $[EF]$, avec $E(1 ; 0 ; 1)$ et $F(3 ; 2 ; -1)$.
3. Les plans $(P)$ et $(Q) : x - y + z + 5 = 0$ sont-ils perpendiculaires ?

:::corrige
1. $2x + y - z + d = 0$ et $2 + 0 - 2 + d = 0$, donc $d = 0$ : $(P) : 2x + y - z = 0$.
2. Le plan médiateur passe par le milieu $I(2 ; 1 ; 0)$ et a pour vecteur normal $\overrightarrow{EF}(2 ; 2 ; -2)$, ou $(1 ; 1 ; -1)$ : $x + y - z + d = 0$ avec $2 + 1 + d = 0$, soit $x + y - z - 3 = 0$.
3. $\vec{n}(2 ; 1 ; -1) \cdot \vec{n'}(1 ; -1 ; 1) = 2 - 1 - 1 = 0$ : oui, ils sont perpendiculaires.
:::
:::

:::exercice Distance et projeté orthogonal
Soit $(P) : x + 2y - 2z + 1 = 0$ et $M(2 ; 1 ; 3)$.

1. Calculer la distance de $M$ au plan $(P)$.
2. Déterminer les coordonnées du projeté orthogonal $H$ de $M$ sur $(P)$.

:::corrige
1. $d(M, (P)) = \frac{|2 + 2 - 6 + 1|}{\sqrt{1 + 4 + 4}} = \frac{1}{3}$.
2. $\overrightarrow{MH} = t\,\vec{n}$ avec $\vec{n}(1 ; 2 ; -2)$ : $H(2 + t ; 1 + 2t ; 3 - 2t)$. En remplaçant dans $(P)$ : $(2 + t) + 2(1 + 2t) - 2(3 - 2t) + 1 = 9t - 1 = 0$, donc $t = \frac{1}{9}$ et $H\left(\frac{19}{9} ; \frac{11}{9} ; \frac{25}{9}\right)$. On vérifie : $MH = |t| \times \|\vec{n}\| = \frac{1}{9} \times 3 = \frac{1}{3}$.
:::
:::

:::exercice Équations de sphères
1. Montrer que $x^2 + y^2 + z^2 + 4x - 2y + 6z + 5 = 0$ est l’équation d’une sphère dont on donnera le centre et le rayon.
2. Déterminer une équation de la sphère de diamètre $[AB]$, avec $A(1 ; 0 ; 1)$ et $B(3 ; 2 ; -1)$.

:::corrige
1. $(x + 2)^2 - 4 + (y - 1)^2 - 1 + (z + 3)^2 - 9 + 5 = 0$, soit $(x + 2)^2 + (y - 1)^2 + (z + 3)^2 = 9$ : centre $\Omega(-2 ; 1 ; -3)$, rayon $3$.
2. Le centre est le milieu $I(2 ; 1 ; 0)$ et le rayon vaut $\frac{AB}{2} = \frac{\sqrt{4 + 4 + 4}}{2} = \sqrt{3}$ : $(x - 2)^2 + (y - 1)^2 + z^2 = 3$.
:::
:::

:::exercice Sphère et plans
Soit $(S) : x^2 + y^2 + z^2 - 2z - 8 = 0$.

1. Déterminer le centre $\Omega$ et le rayon $R$ de $(S)$.
2. Montrer que le plan $(P_1) : z = 4$ est tangent à $(S)$ et donner le point de contact.
3. Montrer que le plan $(P_2) : x + y + z = 0$ coupe $(S)$ selon un cercle, et donner son rayon.

:::corrige
1. $x^2 + y^2 + (z - 1)^2 = 9$ : $\Omega(0 ; 0 ; 1)$, $R = 3$.
2. $d(\Omega, (P_1)) = |1 - 4| = 3 = R$ : le plan est tangent à $(S)$ au projeté de $\Omega$ sur $(P_1)$, c’est-à-dire $H(0 ; 0 ; 4)$.
3. $d(\Omega, (P_2)) = \frac{|0 + 0 + 1|}{\sqrt{3}} = \frac{1}{\sqrt{3}} < 3$ : le cercle a pour rayon $r = \sqrt{9 - \frac{1}{3}} = \sqrt{\frac{26}{3}}$.
:::
:::
