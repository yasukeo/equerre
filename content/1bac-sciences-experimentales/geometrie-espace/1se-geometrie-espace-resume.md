---
title: Géométrie analytique de l’espace : l’essentiel
kind: resume
summary: Coordonnées, colinéarité, déterminant et coplanarité, représentations paramétriques et équations de plans, positions relatives, sur une page.
position: 10
visibility: public
---

## Coordonnées

$\overrightarrow{AB}(x_B - x_A ; y_B - y_A ; z_B - z_A)$ ; milieu : moyenne des coordonnées. Colinéaires : coordonnées proportionnelles.

## Déterminant

:::propriete
$\det(\vec{u}, \vec{v}, \vec{w}) = x\begin{vmatrix} y' & y'' \\ z' & z'' \end{vmatrix} - x'\begin{vmatrix} y & y'' \\ z & z'' \end{vmatrix} + x''\begin{vmatrix} y & y' \\ z & z' \end{vmatrix}$.

Coplanaires $\iff \det = 0$ ; $A$, $B$, $C$, $D$ coplanaires $\iff \det\left(\overrightarrow{AB}, \overrightarrow{AC}, \overrightarrow{AD}\right) = 0$.
:::

## Droites et plans

- Droite : $x = x_A + at$, $y = y_A + bt$, $z = z_A + ct$.
- Plan par $A$ dirigé par $\vec{u}$, $\vec{v}$ : $\det\left(\overrightarrow{AM}, \vec{u}, \vec{v}\right) = 0$, d’où $ax + by + cz + d = 0$.

## Positions relatives

Droite et plan : remplacer la représentation paramétrique dans l’équation (une, aucune ou toutes les valeurs de $t$). Deux plans : parallèles si $(a ; b ; c)$ proportionnels. Deux droites : vecteurs directeurs colinéaires, sinon chercher un point commun avec deux paramètres.

:::attention
Un plan a une infinité d’équations, toutes proportionnelles : vérifiez la vôtre avec un ou deux points du plan.
:::
