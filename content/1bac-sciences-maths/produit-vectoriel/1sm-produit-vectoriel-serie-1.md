---
title: Série 1 — partie 1 : définition et calcul
kind: serie
summary: Produits vectoriels des vecteurs de base, calculs analytiques et vérifications, propriétés et colinéarité, avec les corrigés.
position: 10
visibility: public
---

Trois exercices sur la première partie du cours. Le repère est orthonormé direct.

:::exercice Vecteurs de base
Calculer : $\vec{i} \wedge \vec{k}$, $(\vec{i} + \vec{j}) \wedge \vec{k}$, $(2\vec{i}) \wedge (3\vec{j})$ et $\vec{i} \wedge \vec{i}$.

:::corrige
$\vec{i} \wedge \vec{k} = -\vec{k} \wedge \vec{i} = -\vec{j}$ ; $(\vec{i} + \vec{j}) \wedge \vec{k} = -\vec{j} + \vec{i}$ ; $(2\vec{i}) \wedge (3\vec{j}) = 6\vec{k}$ ; $\vec{i} \wedge \vec{i} = \vec{0}$.
:::
:::

:::exercice Calculs analytiques
Calculer $\vec{u} \wedge \vec{v}$ et vérifier l’orthogonalité :

1. $\vec{u}(1 ; -1 ; 2)$, $\vec{v}(3 ; 0 ; 1)$
2. $\vec{u}(2 ; 1 ; 0)$, $\vec{v}(0 ; 3 ; -1)$

:::corrige
1. $((-1)(1) - 2 \times 0 ; -(1 \times 1 - 2 \times 3) ; 1 \times 0 - (-1) \times 3) = (-1 ; 5 ; 3)$ ; $(-1 ; 5 ; 3) \cdot (1 ; -1 ; 2) = -1 - 5 + 6 = 0$ et $\cdot (3 ; 0 ; 1) = -3 + 3 = 0$.
2. $(1 \times (-1) - 0 ; -(2 \times (-1) - 0) ; 6 - 0) = (-1 ; 2 ; 6)$ ; $\cdot (2 ; 1 ; 0) = 0$ et $\cdot (0 ; 3 ; -1) = 6 - 6 = 0$.
:::
:::

:::exercice Colinéarité et norme
1. Les vecteurs $(2 ; -4 ; 6)$ et $(-1 ; 2 ; -3)$ sont-ils colinéaires ? Calculer leur produit vectoriel.
2. $\|\vec{u}\| = 2$, $\|\vec{v}\| = 3$ et l’angle entre eux vaut $\frac{\pi}{6}$. Calculer $\|\vec{u} \wedge \vec{v}\|$ et $\vec{u} \cdot \vec{v}$.

:::corrige
1. Le premier vaut $-2$ fois le second : colinéaires, produit vectoriel nul.
2. $\|\vec{u} \wedge \vec{v}\| = 2 \times 3 \times \frac{1}{2} = 3$ et $\vec{u} \cdot \vec{v} = 6 \times \frac{\sqrt{3}}{2} = 3\sqrt{3}$.
:::
:::
