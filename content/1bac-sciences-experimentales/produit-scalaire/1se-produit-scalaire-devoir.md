---
title: Devoir surveillé : le produit scalaire
kind: devoir
summary: Un devoir d’une heure sur 20 points : calculs de produits scalaires, Al-Kashi, droite et cercle dans un repère, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : calculs
$ABC$ est un triangle équilatéral de côté $2$, et $I$ le milieu de $[BC]$.

1. Calculer $\overrightarrow{AB} \cdot \overrightarrow{AC}$ et $\overrightarrow{AB} \cdot \overrightarrow{BC}$. (3 pts)
2. Calculer $\overrightarrow{AI} \cdot \overrightarrow{BC}$ et $AI$. (3 pts)

:::corrige
1. $2 \times 2 \times \cos 60° = 2$. $\overrightarrow{AB} \cdot \overrightarrow{BC} = -\overrightarrow{BA} \cdot \overrightarrow{BC} = -2$.
2. $(AI) \perp (BC)$ : $0$. $AI^2 = AB^2 - BI^2 = 4 - 1 = 3$, $AI = \sqrt{3}$.
:::
:::

:::exercice Exercice 2 (5 points) : Al-Kashi
Dans un triangle $ABC$, $AB = 3$, $AC = 8$ et $\hat{A} = 60°$. Calculer $BC$, puis $\cos\hat{B}$.

:::corrige
$BC^2 = 9 + 64 - 2 \times 3 \times 8 \times \frac{1}{2} = 49$, donc $BC = 7$. Puis $AC^2 = AB^2 + BC^2 - 2 \times AB \times BC \cos\hat{B}$ : $64 = 9 + 49 - 42\cos\hat{B}$, donc $\cos\hat{B} = -\frac{6}{42} = -\frac{1}{7}$.
:::
:::

:::exercice Exercice 3 (9 points) : dans un repère orthonormé
Soit $A(2 ; 1)$, $B(-2 ; 3)$ et $(\mathcal{C})$ le cercle de diamètre $[AB]$.

1. Déterminer le centre $\Omega$ et le rayon de $(\mathcal{C})$, puis son équation. (3 pts)
2. Donner l’équation de la médiatrice de $[AB]$. (3 pts)
3. Donner l’équation de la tangente à $(\mathcal{C})$ en $A$. (3 pts)

:::corrige
1. $\Omega(0 ; 2)$, $r = \frac{AB}{2} = \frac{\sqrt{16 + 4}}{2} = \sqrt{5}$ : $x^2 + (y - 2)^2 = 5$.
2. Elle passe par $\Omega$ et a pour vecteur normal $\overrightarrow{AB}(-4 ; 2)$, ou $(2 ; -1)$ : $2x - y + c = 0$ avec $-2 + c = 0$, soit $2x - y + 2 = 0$.
3. Vecteur normal $\overrightarrow{\Omega A}(2 ; -1)$ : $2x - y + c = 0$ avec $4 - 1 + c = 0$, soit $2x - y - 3 = 0$.
:::
:::
