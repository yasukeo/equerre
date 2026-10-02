---
title: Série 1 — partie 2 : produit scalaire et géométrie analytique
kind: serie
summary: Calculs dans un repère orthonormé, équations de droites et perpendiculaires, distance d’un point à une droite, équations de cercles, tangente et intersection, avec les corrigés.
position: 20
visibility: enrolled
---

Cinq exercices sur la deuxième partie du cours. Le plan est muni d’un repère orthonormé.

:::exercice Dans un repère
$A(1 ; 2)$, $B(4 ; 3)$, $C(2 ; -1)$.

1. Calculer $\overrightarrow{AB} \cdot \overrightarrow{AC}$. Que peut-on dire du triangle $ABC$ ?
2. Calculer $AB$, $AC$ et l’aire du triangle.

:::corrige
1. $\overrightarrow{AB}(3 ; 1)$, $\overrightarrow{AC}(1 ; -3)$ : $3 - 3 = 0$ : le triangle est rectangle en $A$.
2. $AB = AC = \sqrt{10}$ (il est aussi isocèle) ; aire $= \frac{\sqrt{10} \times \sqrt{10}}{2} = 5$.
:::
:::

:::exercice Équations de droites
1. Donner une équation de la droite $(D)$ passant par $A(2 ; -1)$ et de vecteur normal $\vec{n}(1 ; 3)$.
2. Donner une équation de la perpendiculaire $(\Delta)$ à $(D)$ passant par $B(0 ; 4)$.
3. Déterminer le point d’intersection de $(D)$ et $(\Delta)$.

:::corrige
1. $x + 3y + c = 0$ avec $2 - 3 + c = 0$ : $(D) : x + 3y + 1 = 0$.
2. Un vecteur directeur de $(D)$ est $(-3 ; 1)$ ; c’est un vecteur normal de $(\Delta)$ : $-3x + y + c = 0$ avec $4 + c = 0$, soit $(\Delta) : -3x + y - 4 = 0$.
3. $y = 3x + 4$ et $x + 3(3x + 4) + 1 = 0$, donc $10x = -13$, $x = -\frac{13}{10}$ et $y = \frac{1}{10}$.
:::
:::

:::exercice Distance à une droite
Calculer la distance du point $A(3 ; 1)$ à la droite $(D) : 4x - 3y + 1 = 0$, puis l’équation du cercle de centre $A$ tangent à $(D)$.

:::corrige
$d = \frac{|12 - 3 + 1|}{5} = 2$. Le cercle tangent a pour rayon $2$ : $(x - 3)^2 + (y - 1)^2 = 4$.
:::
:::

:::exercice Équations de cercles
1. Reconnaître l’ensemble d’équation $x^2 + y^2 + 2x - 8y + 8 = 0$.
2. L’équation $x^2 + y^2 - 2x + 4y + 6 = 0$ est-elle celle d’un cercle ?
3. Donner une équation du cercle de diamètre $[AB]$, avec $A(-1 ; 2)$ et $B(3 ; 4)$.

:::corrige
1. $(x + 1)^2 + (y - 4)^2 = 1 + 16 - 8 = 9$ : cercle de centre $(-1 ; 4)$ et de rayon $3$.
2. $(x - 1)^2 + (y + 2)^2 = 1 + 4 - 6 = -1 < 0$ : ensemble vide.
3. $\overrightarrow{MA} \cdot \overrightarrow{MB} = 0$ : $(x + 1)(x - 3) + (y - 2)(y - 4) = 0$, soit $x^2 + y^2 - 2x - 6y + 5 = 0$ ; centre $(1 ; 3)$, rayon $\sqrt{5}$.
:::
:::

:::exercice Droite et cercle
Soit $(\mathcal{C}) : x^2 + y^2 - 4x - 2y = 0$ et $(D) : x + y - 1 = 0$.

1. Déterminer le centre $\Omega$ et le rayon $r$ de $(\mathcal{C})$.
2. Étudier la position de $(D)$ par rapport à $(\mathcal{C})$.
3. Donner l’équation de la tangente à $(\mathcal{C})$ en $O$.

:::corrige
1. $(x - 2)^2 + (y - 1)^2 = 5$ : $\Omega(2 ; 1)$, $r = \sqrt{5}$.
2. $d(\Omega, (D)) = \frac{|2 + 1 - 1|}{\sqrt{2}} = \sqrt{2} < \sqrt{5}$ : la droite coupe le cercle en deux points.
3. $O \in (\mathcal{C})$ ; vecteur normal $\overrightarrow{\Omega O}(-2 ; -1)$ : $2x + y = 0$.
:::
:::
