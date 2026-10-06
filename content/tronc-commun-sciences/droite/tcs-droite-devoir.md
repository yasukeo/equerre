---
title: Devoir surveillé : la droite dans le plan
kind: devoir
summary: Un devoir d’une heure sur 20 points : coordonnées et distances, triangle rectangle, équations de droites, parallèle, intersection et positions relatives, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Le repère est orthonormé.

:::exercice Exercice 1 (6 points) : un triangle
On donne $A(2 ; 1)$, $B(-2 ; 3)$ et $C(4 ; 5)$.

1. Montrer que $A$, $B$, $C$ ne sont pas alignés. (2 pts)
2. Calculer les coordonnées du milieu de $[BC]$. (1 pt)
3. Montrer que le triangle $ABC$ est rectangle et isocèle en $A$. (3 pts)

:::corrige
1. $\overrightarrow{AB}(-4 ; 2)$ et $\overrightarrow{AC}(2 ; 4)$ : $-4 \times 4 - 2 \times 2 = -20 \neq 0$.
2. $(1 ; 4)$.
3. $AB^2 = 16 + 4 = 20$, $AC^2 = 4 + 16 = 20$ et $BC^2 = 36 + 4 = 40$. Donc $AB = AC$ et $AB^2 + AC^2 = BC^2$ : rectangle et isocèle en $A$.
:::
:::

:::exercice Exercice 2 (8 points) : équations
Avec les points de l’exercice 1 :

1. Donner l’équation réduite de $(BC)$. (3 pts)
2. Donner une représentation paramétrique de la droite passant par $A$ et de vecteur directeur $\overrightarrow{BC}$. (2 pts)
3. Donner l’équation réduite de cette droite. (3 pts)

:::corrige
1. $m = \frac{5 - 3}{4 + 2} = \frac{1}{3}$, et $3 = -\frac{2}{3} + p$ : $y = \frac{1}{3}x + \frac{11}{3}$.
2. $\overrightarrow{BC}(6 ; 2)$ : $x = 2 + 6t$, $y = 1 + 2t$.
3. C’est la parallèle à $(BC)$ passant par $A$ : pente $\frac{1}{3}$, et $1 = \frac{2}{3} + p$ : $y = \frac{1}{3}x + \frac{1}{3}$.
:::
:::

:::exercice Exercice 3 (6 points) : positions relatives
On donne $(D) : x + 2y - 4 = 0$, $(D') : 3x - y - 5 = 0$ et $(D'') : 2x + 4y + 1 = 0$.

1. Montrer que $(D)$ et $(D')$ sont sécantes et calculer leur point d’intersection. (3 pts)
2. Montrer que $(D)$ et $(D'')$ sont strictement parallèles. (3 pts)

:::corrige
1. $1 \times (-1) - 3 \times 2 = -7 \neq 0$ : sécantes. De $(D')$ : $y = 3x - 5$ ; dans $(D)$ : $x + 6x - 10 - 4 = 0$, donc $x = 2$ et $y = 1$. Le point d’intersection est $(2 ; 1)$.
2. $1 \times 4 - 2 \times 2 = 0$ : parallèles. Le point $(4 ; 0)$ est sur $(D)$ mais pas sur $(D'')$, car $8 + 0 + 1 \neq 0$ : elles sont strictement parallèles.
:::
:::
