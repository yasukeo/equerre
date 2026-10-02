---
title: Devoir surveillé : le produit vectoriel
kind: devoir
summary: Un devoir d’une heure sur 20 points : calculs, plan par trois points et aire, distance à une droite, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Le repère est orthonormé direct.

:::exercice Exercice 1 (5 points) : calcul
Calculer $\vec{u} \wedge \vec{v}$ pour $\vec{u}(2 ; 1 ; -1)$ et $\vec{v}(1 ; 0 ; 3)$, puis vérifier l’orthogonalité.

:::corrige
$(1 \times 3 - (-1) \times 0 ; -(2 \times 3 - (-1) \times 1) ; 2 \times 0 - 1 \times 1) = (3 ; -7 ; -1)$. $(3 ; -7 ; -1) \cdot (2 ; 1 ; -1) = 6 - 7 + 1 = 0$ et $\cdot (1 ; 0 ; 3) = 3 - 3 = 0$.
:::
:::

:::exercice Exercice 2 (9 points) : plan et aire
$A(0 ; 1 ; 2)$, $B(1 ; 1 ; 0)$, $C(2 ; 3 ; 1)$.

1. Calculer $\overrightarrow{AB} \wedge \overrightarrow{AC}$. (3 pts)
2. Donner une équation du plan $(ABC)$. (3 pts)
3. Calculer l’aire du triangle $ABC$. (3 pts)

:::corrige
1. $\overrightarrow{AB}(1 ; 0 ; -2)$, $\overrightarrow{AC}(2 ; 2 ; -1)$ : $(0 \times (-1) - (-2) \times 2 ; -(1 \times (-1) - (-2) \times 2) ; 1 \times 2 - 0 \times 2) = (4 ; -3 ; 2)$.
2. $4x - 3y + 2z + d = 0$ avec $A$ : $-3 + 4 + d = 0$, $d = -1$ : $4x - 3y + 2z - 1 = 0$. Vérification avec $B$ : $4 - 3 + 0 - 1 = 0$.
3. $\frac{1}{2}\sqrt{16 + 9 + 4} = \frac{\sqrt{29}}{2}$.
:::
:::

:::exercice Exercice 3 (6 points) : distance à une droite
Calculer la distance du point $M(2 ; 0 ; 1)$ à la droite passant par $O$ et de vecteur directeur $\vec{u}(1 ; 2 ; 2)$.

:::corrige
$\overrightarrow{OM} \wedge \vec{u} = (0 \times 2 - 1 \times 2 ; -(2 \times 2 - 1 \times 1) ; 2 \times 2 - 0 \times 1) = (-2 ; -3 ; 4)$, de norme $\sqrt{29}$ ; $\|\vec{u}\| = 3$. Distance $\frac{\sqrt{29}}{3}$.
:::
:::
