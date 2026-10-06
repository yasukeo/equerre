---
title: Série 1 — partie 1 : repère, coordonnées, déterminant
kind: serie
summary: Coordonnées de vecteurs, milieu, quatrième sommet d’un parallélogramme, distances et triangle rectangle, colinéarité avec paramètre et alignement, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours. Le repère est orthonormé.

:::exercice Coordonnées
On donne $A(-1 ; 2)$, $B(3 ; 4)$ et $C(5 ; 0)$.

1. Calculer les coordonnées de $\overrightarrow{AB}$, $\overrightarrow{BC}$ et du milieu $I$ de $[AC]$.
2. Déterminer les coordonnées de $D$ tel que $ABCD$ soit un parallélogramme.

:::corrige
1. $\overrightarrow{AB}(4 ; 2)$, $\overrightarrow{BC}(2 ; -4)$, $I(2 ; 1)$.
2. $\overrightarrow{AD} = \overrightarrow{BC}$, donc $D(-1 + 2 ; 2 - 4) = (1 ; -2)$. Vérification : le milieu de $[BD]$ est $(2 ; 1) = I$.
:::
:::

:::exercice Distances
Avec les points de l’exercice précédent :

1. Calculer $AB$, $BC$ et $AC$.
2. Montrer que le triangle $ABC$ est rectangle et isocèle. En quel sommet ?
3. Que peut-on dire du parallélogramme $ABCD$ ?

:::corrige
1. $AB = \sqrt{16 + 4} = 2\sqrt{5}$, $BC = \sqrt{4 + 16} = 2\sqrt{5}$, $AC = \sqrt{36 + 4} = 2\sqrt{10}$.
2. $AB^2 + BC^2 = 20 + 20 = 40 = AC^2$ : rectangle en $B$ (Pythagore), et isocèle car $AB = BC$.
3. Un parallélogramme avec un angle droit et deux côtés consécutifs égaux est un carré.
:::
:::

:::exercice Colinéarité
1. Les vecteurs $\vec{u}(3 ; -5)$ et $\vec{v}(-6 ; 10)$ sont-ils colinéaires ? Et $\vec{w}(2 ; 7)$ et $\vec{z}(4 ; 13)$ ?
2. Déterminer les réels $m$ pour lesquels $\vec{a}(m ; 2)$ et $\vec{b}(3 ; m + 1)$ sont colinéaires.

:::corrige
1. $3 \times 10 - (-6) \times (-5) = 30 - 30 = 0$ : oui. $2 \times 13 - 4 \times 7 = -2 \neq 0$ : non.
2. $m(m + 1) - 3 \times 2 = 0 \iff m^2 + m - 6 = 0 \iff (m + 3)(m - 2) = 0$ : $m = -3$ ou $m = 2$.
:::
:::

:::exercice Alignement
On donne $A(1 ; 1)$ et $B(3 ; 5)$.

1. Le point $C(4 ; 7)$ est-il aligné avec $A$ et $B$ ?
2. Déterminer $y$ pour que $E(-1 ; y)$ soit aligné avec $A$ et $B$.

:::corrige
1. $\overrightarrow{AB}(2 ; 4)$ et $\overrightarrow{AC}(3 ; 6)$ : $2 \times 6 - 3 \times 4 = 0$, oui.
2. $\overrightarrow{AE}(-2 ; y - 1)$ : $2(y - 1) - (-2) \times 4 = 0 \iff 2y + 6 = 0 \iff y = -3$.
:::
:::
