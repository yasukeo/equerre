---
title: Série 1 — partie 1 : définition et orthogonalité
kind: serie
summary: Calculs de produits scalaires et de normes, triangle rectangle, orthogonalité dans un cube, vecteur normal à un plan, avec les corrigés.
position: 10
visibility: public
---

Trois exercices sur la première partie du cours. Le repère est orthonormé.

:::exercice Calculs dans un repère
$A(1 ; 0 ; 2)$, $B(3 ; 1 ; 0)$, $C(0 ; 2 ; 3)$.

1. Calculer $\overrightarrow{AB} \cdot \overrightarrow{AC}$, $AB$ et $AC$.
2. Le triangle $ABC$ est-il rectangle ?
3. Calculer $\cos\widehat{BAC}$ autrement, avec $BC$ et Al-Kashi, pour vérifier.

:::corrige
1. $\overrightarrow{AB}(2 ; 1 ; -2)$, $\overrightarrow{AC}(-1 ; 2 ; 1)$ : produit scalaire $-2 + 2 - 2 = -2$ ; $AB = 3$, $AC = \sqrt{6}$.
2. En $A$ : non (produit $\neq 0$). $\overrightarrow{BA} \cdot \overrightarrow{BC} = (-2 ; -1 ; 2) \cdot (-3 ; 1 ; 3) = 6 - 1 + 6 = 11 \neq 0$. $\overrightarrow{CA} \cdot \overrightarrow{CB} = (1 ; -2 ; -1) \cdot (3 ; -1 ; -3) = 3 + 2 + 3 = 8 \neq 0$. Le triangle n’est pas rectangle.
3. $\cos\widehat{BAC} = \frac{-2}{3\sqrt{6}}$. $BC^2 = 9 + 1 + 9 = 19$, et Al-Kashi : $19 = 9 + 6 - 2 \times 3\sqrt{6}\cos\widehat{BAC}$, donc $\cos\widehat{BAC} = \frac{-4}{6\sqrt{6}} = \frac{-2}{3\sqrt{6}}$.
:::
:::

:::exercice Orthogonalité dans un cube
$ABCDEFGH$ est un cube d’arête $1$ (face $ABCD$ en bas, $E$ au-dessus de $A$). On prend le repère $\left(A ; \overrightarrow{AB}, \overrightarrow{AD}, \overrightarrow{AE}\right)$.

1. Montrer que $(AG)$ est orthogonale à $(BD)$ et à $(BE)$.
2. En déduire que $(AG)$ est orthogonale au plan $(BDE)$.

:::corrige
1. $\overrightarrow{AG}(1 ; 1 ; 1)$, $\overrightarrow{BD}(-1 ; 1 ; 0)$, $\overrightarrow{BE}(-1 ; 0 ; 1)$ : $\overrightarrow{AG} \cdot \overrightarrow{BD} = 0$ et $\overrightarrow{AG} \cdot \overrightarrow{BE} = 0$.
2. $(BD)$ et $(BE)$ sont deux droites sécantes du plan $(BDE)$ : $(AG)$ est orthogonale à ce plan.
:::
:::

:::exercice Vecteur normal
Trouver un vecteur normal au plan $(ABC)$ avec $A(1 ; 1 ; 0)$, $B(2 ; 0 ; 1)$ et $C(0 ; 2 ; 2)$.

:::corrige
$\overrightarrow{AB}(1 ; -1 ; 1)$, $\overrightarrow{AC}(-1 ; 1 ; 2)$. $\vec{n}(a ; b ; c)$ : $a - b + c = 0$ et $-a + b + 2c = 0$. En additionnant : $3c = 0$, $c = 0$, puis $a = b$ : $\vec{n}(1 ; 1 ; 0)$.
:::
:::
