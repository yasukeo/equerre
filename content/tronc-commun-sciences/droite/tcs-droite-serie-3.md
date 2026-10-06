---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : médiane, hauteur et centre de gravité d’un triangle isocèle dans un repère, puis une famille de droites qui passent toutes par un même point, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un triangle dans un repère
Dans un repère orthonormé, on donne $A(1 ; 2)$, $B(5 ; 4)$ et $C(3 ; -2)$.

1. Donner l’équation réduite de $(BC)$.
2. Soit $I$ le milieu de $[BC]$. Donner l’équation réduite de la médiane $(AI)$.
3. Donner l’équation réduite de la hauteur issue de $A$. Que constate-t-on ?
4. Calculer $AB$ et $AC$, et expliquer le constat de la question 3.
5. Calculer les coordonnées du centre de gravité $G$ et vérifier qu’il est sur $(AI)$.

:::corrige
1. $m = \frac{-2 - 4}{3 - 5} = 3$, et $4 = 15 + p$ : $y = 3x - 11$.
2. $I(4 ; 1)$ ; pente $\frac{1 - 2}{4 - 1} = -\frac{1}{3}$, et $2 = -\frac{1}{3} + p$ : $y = -\frac{1}{3}x + \frac{7}{3}$.
3. La hauteur est perpendiculaire à $(BC)$ : pente $-\frac{1}{3}$, et elle passe par $A$ : $y = -\frac{1}{3}x + \frac{7}{3}$. C’est la même droite que la médiane.
4. $AB = \sqrt{16 + 4} = 2\sqrt{5}$ et $AC = \sqrt{4 + 16} = 2\sqrt{5}$ : le triangle est isocèle en $A$, et dans un triangle isocèle la médiane et la hauteur issues du sommet principal sont confondues.
5. $G\left(\frac{1 + 5 + 3}{3} ; \frac{2 + 4 - 2}{3}\right) = \left(3 ; \frac{4}{3}\right)$, et $-\frac{1}{3} \times 3 + \frac{7}{3} = \frac{4}{3}$ : $G$ est sur $(AI)$.
:::
:::

:::exercice Problème 2 : une famille de droites
Pour tout réel $m$, on note $(D_m)$ la droite d’équation $(m - 1)x + 2y - m = 0$.

1. Montrer que toutes les droites $(D_m)$ passent par un même point $\Omega$, dont on donnera les coordonnées.
2. Pour quelle valeur de $m$ la droite $(D_m)$ est-elle parallèle à $(\Delta) : x - y + 3 = 0$ ?
3. Pour quelle valeur de $m$ est-elle parallèle à l’axe des abscisses ?
4. Pour quelle valeur de $m$ est-elle perpendiculaire à $(\Delta)$ (repère orthonormé) ?

:::corrige
1. L’équation s’écrit $m(x - 1) - x + 2y = 0$. Elle est vraie pour tout $m$ si $x - 1 = 0$ et $-x + 2y = 0$, soit $\Omega\left(1 ; \frac{1}{2}\right)$.
2. La pente de $(D_m)$ est $-\frac{m - 1}{2}$ et celle de $(\Delta)$ est $1$ : $-\frac{m - 1}{2} = 1 \iff m = -1$.
3. Pente nulle : $m = 1$, et $(D_1) : 2y - 1 = 0$, soit $y = \frac{1}{2}$.
4. Pente $-1$ : $-\frac{m - 1}{2} = -1 \iff m = 3$, et $(D_3) : 2x + 2y - 3 = 0$.
:::
:::
