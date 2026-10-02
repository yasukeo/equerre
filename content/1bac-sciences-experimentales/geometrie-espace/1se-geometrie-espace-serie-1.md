---
title: Série 1 — partie 1 : coordonnées et déterminant
kind: serie
summary: Coordonnées, milieux et parallélogramme, alignement, calcul de déterminants, vecteurs et points coplanaires avec un paramètre, avec les corrigés.
position: 10
visibility: public
---

Trois exercices sur la première partie du cours. L’espace est muni d’un repère.

:::exercice Coordonnées
On considère $A(2 ; -1 ; 3)$, $B(0 ; 1 ; 1)$ et $C(1 ; 2 ; 4)$.

1. Calculer les coordonnées de $\overrightarrow{AB}$, de $\overrightarrow{AC}$ et du milieu $I$ de $[AB]$.
2. Montrer que $A$, $B$, $C$ ne sont pas alignés.
3. Déterminer les coordonnées du point $D$ tel que $ABCD$ soit un parallélogramme.

:::corrige
1. $\overrightarrow{AB}(-2 ; 2 ; -2)$, $\overrightarrow{AC}(-1 ; 3 ; 1)$, $I(1 ; 0 ; 2)$.
2. $\frac{-2}{-1} = 2$ mais $\frac{2}{3} \neq 2$ : les coordonnées ne sont pas proportionnelles, les vecteurs ne sont pas colinéaires.
3. $\overrightarrow{AD} = \overrightarrow{BC} = (1 ; 1 ; 3)$, donc $D(3 ; 0 ; 6)$.
:::
:::

:::exercice Déterminants
1. Calculer $\det(\vec{u}, \vec{v}, \vec{w})$ pour $\vec{u}(1 ; 2 ; 0)$, $\vec{v}(0 ; 1 ; -1)$, $\vec{w}(2 ; 1 ; 3)$. Que peut-on en conclure ?
2. Même question pour $\vec{u}(1 ; 1 ; 1)$, $\vec{v}(1 ; -1 ; 0)$, $\vec{w}(0 ; 1 ; 2)$.

:::corrige
1. En développant selon la première ligne $(1 ; 0 ; 2)$ : $1 \times \begin{vmatrix} 1 & 1 \\ -1 & 3 \end{vmatrix} - 0 + 2 \times \begin{vmatrix} 2 & 1 \\ 0 & -1 \end{vmatrix} = 1 \times 4 + 2 \times (-2) = 0$. Les vecteurs sont coplanaires (en effet $\vec{w} = 2\vec{u} - 3\vec{v}$).
2. Première ligne $(1 ; 1 ; 0)$ : $1 \times \begin{vmatrix} -1 & 1 \\ 0 & 2 \end{vmatrix} - 1 \times \begin{vmatrix} 1 & 1 \\ 1 & 2 \end{vmatrix} + 0 = -2 - 1 = -3 \neq 0$. Ils forment une base de l’espace.
:::
:::

:::exercice Quatre points coplanaires
On considère $A(1 ; 0 ; 0)$, $B(0 ; 1 ; 0)$, $C(0 ; 0 ; 1)$ et $D(1 ; 1 ; m)$, où $m$ est un réel.

1. Calculer $\det\left(\overrightarrow{AB}, \overrightarrow{AC}, \overrightarrow{AD}\right)$ en fonction de $m$.
2. Pour quelle valeur de $m$ les quatre points sont-ils coplanaires ?

:::corrige
1. $\overrightarrow{AB}(-1 ; 1 ; 0)$, $\overrightarrow{AC}(-1 ; 0 ; 1)$, $\overrightarrow{AD}(0 ; 1 ; m)$. Première ligne $(-1 ; -1 ; 0)$ : $-1 \times \begin{vmatrix} 0 & 1 \\ 1 & m \end{vmatrix} + 1 \times \begin{vmatrix} 1 & 1 \\ 0 & m \end{vmatrix} = -1 \times (-1) + m = m + 1$.
2. $m = -1$. On vérifie : $D(1 ; 1 ; -1)$ est sur le plan $(ABC)$ d’équation $x + y + z = 1$.
:::
:::
