---
title: Géométrie dans l’espace — partie 2 : produit vectoriel et droites
kind: cours
summary: Produit vectoriel, alignement, vecteur normal à un plan défini par trois points, aire d’un triangle, distance d’un point à une droite, représentation paramétrique, intersections avec un plan et une sphère.
position: 20
visibility: public
---
## Produit vectoriel

:::definition
Le **produit vectoriel** de $\vec{u}(x ; y ; z)$ et $\vec{v}(x' ; y' ; z')$ est le vecteur :

$$
\vec{u} \wedge \vec{v} = (y z' - z y') \, \vec{i} - (x z' - z x') \, \vec{j} + (x y' - y x') \, \vec{k}
$$
:::

:::propriete
- $\vec{u} \wedge \vec{v}$ est orthogonal à $\vec{u}$ et à $\vec{v}$.
- $\vec{v} \wedge \vec{u} = -\vec{u} \wedge \vec{v}$.
- $\vec{u} \wedge \vec{v} = \vec{0} \iff \vec{u}$ et $\vec{v}$ sont colinéaires.
- $\|\vec{u} \wedge \vec{v}\| = \|\vec{u}\| \, \|\vec{v}\| \, |\sin\theta|$, où $\theta$ est une mesure de l’angle entre $\vec{u}$ et $\vec{v}$.
:::

### Applications

:::propriete
- $A$, $B$, $C$ sont alignés $\iff \overrightarrow{AB} \wedge \overrightarrow{AC} = \vec{0}$.
- Si $A$, $B$, $C$ ne sont pas alignés, $\overrightarrow{AB} \wedge \overrightarrow{AC}$ est un vecteur normal au plan $(ABC)$.
- L’aire du triangle $ABC$ est $\frac{1}{2}\left\|\overrightarrow{AB} \wedge \overrightarrow{AC}\right\|$.
- La distance d’un point $M$ à la droite $(D)$ passant par $A$ et de vecteur directeur $\vec{u}$ est $\dfrac{\left\|\overrightarrow{AM} \wedge \vec{u}\right\|}{\|\vec{u}\|}$.
:::

:::exemple
$A(1 ; 0 ; 0)$, $B(0 ; 1 ; 0)$, $C(0 ; 0 ; 1)$ : $\overrightarrow{AB}(-1 ; 1 ; 0)$ et $\overrightarrow{AC}(-1 ; 0 ; 1)$, donc $\overrightarrow{AB} \wedge \overrightarrow{AC} = (1 \times 1 - 0 \times 0)\vec{i} - ((-1) \times 1 - 0 \times (-1))\vec{j} + ((-1) \times 0 - 1 \times (-1))\vec{k} = \vec{i} + \vec{j} + \vec{k}$.

Le plan $(ABC)$ a pour équation $x + y + z - 1 = 0$, et l’aire du triangle $ABC$ vaut $\frac{1}{2}\sqrt{3}$.
:::

## Représentation paramétrique d’une droite

:::propriete
La droite passant par $A(x_A ; y_A ; z_A)$ et de vecteur directeur $\vec{u}(\alpha ; \beta ; \gamma)$ a pour représentation paramétrique :

$$
\begin{cases} x = x_A + \alpha t \\ y = y_A + \beta t \\ z = z_A + \gamma t \end{cases} \qquad t \in \mathbb{R}
$$
:::

Pour trouver l’intersection d’une droite et d’un plan, on remplace $x$, $y$, $z$ par leurs expressions en $t$ dans l’équation du plan, et on résout en $t$.

## Droite et sphère

Pour étudier l’intersection d’une droite $(D)$ et d’une sphère $(S)$, on remplace $x$, $y$, $z$ par la représentation paramétrique de $(D)$ dans l’équation de $(S)$ : on obtient une équation du second degré en $t$.

- Deux solutions : la droite coupe la sphère en deux points.
- Une solution double : la droite est tangente à la sphère.
- Aucune solution : la droite ne coupe pas la sphère.

On peut aussi comparer la distance du centre à la droite au rayon.

:::exemple
$(S) : x^2 + y^2 + z^2 = 9$ et $(D) : x = t$, $y = 1 + t$, $z = 2$ ($t \in \mathbb{R}$). En remplaçant : $t^2 + (1 + t)^2 + 4 = 9$, soit $2t^2 + 2t - 4 = 0$, donc $t^2 + t - 2 = 0$ : $t = 1$ ou $t = -2$. Les points d’intersection sont $(1 ; 2 ; 2)$ et $(-2 ; -1 ; 2)$.
:::

## Distance d’un point à une droite : un exemple

:::exemple
Distance de $M(1 ; 1 ; 1)$ à la droite $(D)$ passant par $A(0 ; 0 ; 0)$ et de vecteur directeur $\vec{u}(1 ; 0 ; 0)$ : $\overrightarrow{AM} \wedge \vec{u} = (1 \times 0 - 1 \times 0)\vec{i} - (1 \times 0 - 1 \times 1)\vec{j} + (1 \times 0 - 1 \times 1)\vec{k} = \vec{j} - \vec{k}$, de norme $\sqrt{2}$. Donc $d(M, (D)) = \frac{\sqrt{2}}{1} = \sqrt{2}$.
:::

:::attention
Dans la formule du produit vectoriel, la composante sur $\vec{j}$ est précédée d’un signe moins. On vérifie toujours le résultat : $\vec{u} \wedge \vec{v}$ doit être orthogonal à $\vec{u}$ et à $\vec{v}$.
:::
