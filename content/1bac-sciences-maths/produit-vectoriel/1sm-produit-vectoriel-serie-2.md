---
title: Série 1 — partie 2 : applications
kind: serie
summary: Alignement, équation de plan par trois points, aires de triangles, distance d’un point à une droite, intersection de deux plans, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours. Le repère est orthonormé direct.

:::exercice Alignement et plan
$A(1 ; 2 ; 1)$, $B(2 ; 0 ; 3)$, $C(0 ; 1 ; 1)$.

1. Montrer que $A$, $B$, $C$ ne sont pas alignés.
2. Déterminer une équation du plan $(ABC)$.

:::corrige
1. $\overrightarrow{AB}(1 ; -2 ; 2)$, $\overrightarrow{AC}(-1 ; -1 ; 0)$ : $\overrightarrow{AB} \wedge \overrightarrow{AC} = ((-2)(0) - 2(-1) ; -(1 \times 0 - 2 \times (-1)) ; 1 \times (-1) - (-2)(-1)) = (2 ; -2 ; -3) \neq \vec{0}$.
2. $2x - 2y - 3z + d = 0$ avec $A$ : $2 - 4 - 3 + d = 0$, $d = 5$ : $2x - 2y - 3z + 5 = 0$. Vérification avec $B$ : $4 - 0 - 9 + 5 = 0$ ; avec $C$ : $0 - 2 - 3 + 5 = 0$.
:::
:::

:::exercice Aire d’un triangle
Calculer l’aire du triangle $ABC$ de l’exercice précédent.

:::corrige
$\frac{1}{2}\sqrt{4 + 4 + 9} = \frac{\sqrt{17}}{2}$.
:::
:::

:::exercice Distance à une droite
Soit $(D)$ la droite passant par $A(1 ; 0 ; 2)$ et de vecteur directeur $\vec{u}(1 ; 1 ; 0)$, et $M(3 ; 1 ; 0)$. Calculer $d(M, (D))$.

:::corrige
$\overrightarrow{AM}(2 ; 1 ; -2)$ ; $\overrightarrow{AM} \wedge \vec{u} = (1 \times 0 - (-2) \times 1 ; -(2 \times 0 - (-2) \times 1) ; 2 \times 1 - 1 \times 1) = (2 ; -2 ; 1)$, de norme $3$. $d = \frac{3}{\sqrt{2}} = \frac{3\sqrt{2}}{2}$.
:::
:::

:::exercice Intersection de deux plans
$(P) : 2x + y - z = 1$ et $(Q) : x - y + z = 2$.

1. Montrer que les plans sont sécants et donner un vecteur directeur de leur intersection.
2. Trouver un point commun et une représentation paramétrique de la droite d’intersection.

:::corrige
1. $(2 ; 1 ; -1) \wedge (1 ; -1 ; 1) = (1 \times 1 - (-1)(-1) ; -(2 \times 1 - (-1) \times 1) ; 2 \times (-1) - 1 \times 1) = (0 ; -3 ; -3)$, non nul : sécants ; direction $(0 ; 1 ; 1)$.
2. En additionnant les équations : $3x = 3$, $x = 1$ ; puis $y - z = -1$, par exemple $y = 0$, $z = 1$ : le point $(1 ; 0 ; 1)$. Droite : $x = 1$, $y = t$, $z = 1 + t$.
:::
:::
