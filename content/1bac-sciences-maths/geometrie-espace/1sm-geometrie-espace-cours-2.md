---
title: Géométrie analytique de l’espace — partie 2 : droites et plans
kind: cours
summary: Représentation paramétrique d’une droite et d’un plan, équation cartésienne d’un plan, intersections et positions relatives de droites et de plans.
position: 20
visibility: public
---

L’espace est muni d’un repère $(O, \vec{i}, \vec{j}, \vec{k})$.

## Représentation paramétrique d’une droite

:::propriete
La droite passant par $A(x_A ; y_A ; z_A)$ et de vecteur directeur $\vec{u}(a ; b ; c)$ a pour représentation paramétrique :

$$
\begin{cases} x = x_A + at \\ y = y_A + bt \\ z = z_A + ct \end{cases} \qquad t \in \mathbb{R}
$$
:::

:::exemple
La droite $(AB)$ avec $A(1 ; 2 ; 0)$ et $B(3 ; 1 ; 4)$ : $\overrightarrow{AB}(2 ; -1 ; 4)$, donc $x = 1 + 2t$, $y = 2 - t$, $z = 4t$.
:::

## Plans

:::propriete
- **Représentation paramétrique** : le plan passant par $A$ et dirigé par $\vec{u}$ et $\vec{v}$ non colinéaires est l’ensemble des points $M$ tels que $\overrightarrow{AM} = s\vec{u} + t\vec{v}$.
- **Équation cartésienne** : $M$ est dans ce plan si et seulement si $\det\left(\overrightarrow{AM}, \vec{u}, \vec{v}\right) = 0$. En développant, on obtient une équation $ax + by + cz + d = 0$ avec $(a ; b ; c) \neq (0 ; 0 ; 0)$.
- Réciproquement, toute équation de cette forme est celle d’un plan.
:::

:::exemple
Plan passant par $A(1 ; 0 ; 0)$ et dirigé par $\vec{u}(1 ; 1 ; 0)$ et $\vec{v}(0 ; 1 ; 1)$. On développe $\det\left(\overrightarrow{AM}, \vec{u}, \vec{v}\right)$ selon la première colonne, $\overrightarrow{AM}(x - 1 ; y ; z)$ :

$$
(x - 1)\begin{vmatrix} 1 & 1 \\ 0 & 1 \end{vmatrix} - y\begin{vmatrix} 1 & 0 \\ 0 & 1 \end{vmatrix} + z\begin{vmatrix} 1 & 0 \\ 1 & 1 \end{vmatrix} = (x - 1) - y + z
$$

L’équation est $x - y + z - 1 = 0$.
:::

## Positions relatives

### Droite et plan

On remplace $x$, $y$, $z$ par la représentation paramétrique de la droite dans l’équation du plan :

- une seule valeur de $t$ : la droite coupe le plan en un point ;
- aucune valeur : la droite est strictement parallèle au plan ;
- toutes les valeurs : la droite est incluse dans le plan.

:::exemple
Droite $x = 1 + t$, $y = 2t$, $z = 3 - t$ et plan $x + y + z - 2 = 0$ : $(1 + t) + 2t + (3 - t) - 2 = 2t + 2 = 0$, donc $t = -1$ : le point $(0 ; -2 ; 4)$.
:::

### Deux plans

:::propriete
Les plans $ax + by + cz + d = 0$ et $a'x + b'y + c'z + d' = 0$ sont parallèles si et seulement si $(a ; b ; c)$ et $(a' ; b' ; c')$ sont proportionnels ; sinon ils sont sécants selon une droite.
:::

### Deux droites

Deux droites sont parallèles si leurs vecteurs directeurs sont colinéaires. Sinon, on cherche un point commun en égalant les deux représentations paramétriques (avec deux paramètres différents) : une solution, elles sont sécantes ; aucune, elles sont non coplanaires.

:::attention
Pour deux droites, utilisez deux paramètres différents ($t$ et $s$) : un même point n’a aucune raison de correspondre à la même valeur du paramètre sur les deux droites.
:::
