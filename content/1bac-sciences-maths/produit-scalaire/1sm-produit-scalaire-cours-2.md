---
title: Le produit scalaire — partie 2 : produit scalaire et géométrie analytique
kind: cours
summary: Expression analytique dans un repère orthonormé, norme et distance, vecteur normal et équation d’une droite, distance d’un point à une droite, équation d’un cercle, position d’une droite et d’un cercle, tangente.
position: 20
visibility: public
---

Le plan est muni d’un repère orthonormé $(O, \vec{i}, \vec{j})$.

## Expression analytique

:::propriete
Si $\vec{u}(x ; y)$ et $\vec{v}(x' ; y')$ :

$$
\vec{u} \cdot \vec{v} = xx' + yy' \qquad \|\vec{u}\| = \sqrt{x^2 + y^2} \qquad AB = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}
$$
:::

:::exemple
$\vec{u}(3 ; -1)$ et $\vec{v}(2 ; 6)$ : $\vec{u} \cdot \vec{v} = 6 - 6 = 0$ : ils sont orthogonaux. $\cos(\vec{u}, \vec{w})$ avec $\vec{w}(1 ; 1)$ : $\frac{3 - 1}{\sqrt{10}\sqrt{2}} = \frac{2}{\sqrt{20}} = \frac{1}{\sqrt{5}}$.
:::

## Droites et vecteurs normaux

:::definition
Un vecteur $\vec{n}$ non nul est **normal** à une droite $(D)$ s’il est orthogonal à un vecteur directeur de $(D)$.
:::

:::propriete
- La droite passant par $A$ et de vecteur normal $\vec{n}(a ; b)$ est l’ensemble des points $M$ tels que $\overrightarrow{AM} \cdot \vec{n} = 0$ ; elle a une équation $ax + by + c = 0$.
- Réciproquement, la droite d’équation $ax + by + c = 0$ a pour vecteur normal $\vec{n}(a ; b)$ et pour vecteur directeur $\vec{u}(-b ; a)$.
- Deux droites sont perpendiculaires si et seulement si leurs vecteurs normaux sont orthogonaux.
:::

:::exemple
Droite passant par $A(1 ; 2)$ et de vecteur normal $\vec{n}(3 ; -1)$ : $3x - y + c = 0$ avec $3 - 2 + c = 0$, soit $3x - y - 1 = 0$.
:::

## Distance d’un point à une droite

:::propriete
La distance du point $A(x_A ; y_A)$ à la droite $(D) : ax + by + c = 0$ est :

$$
d(A, (D)) = \frac{|ax_A + by_A + c|}{\sqrt{a^2 + b^2}}
$$
:::

:::exemple
Distance de $O$ à la droite $3x + 4y - 10 = 0$ : $\frac{|-10|}{5} = 2$.
:::

## Cercles

:::propriete
- Le cercle de centre $\Omega(a ; b)$ et de rayon $r$ a pour équation $(x - a)^2 + (y - b)^2 = r^2$.
- L’équation $x^2 + y^2 - 2ax - 2by + c = 0$ s’écrit $(x - a)^2 + (y - b)^2 = a^2 + b^2 - c$ : c’est un cercle si $a^2 + b^2 - c > 0$, un point si c’est nul, l’ensemble vide si c’est négatif.
- Le cercle de diamètre $[AB]$ est l’ensemble des points $M$ tels que $\overrightarrow{MA} \cdot \overrightarrow{MB} = 0$.
:::

:::exemple
$x^2 + y^2 - 4x + 6y - 3 = 0$ s’écrit $(x - 2)^2 + (y + 3)^2 = 16$ : cercle de centre $\Omega(2 ; -3)$ et de rayon $4$.
:::

## Droite et cercle

Soit $(\mathcal{C})$ un cercle de centre $\Omega$ et de rayon $r$, $(D)$ une droite et $d = d(\Omega, (D))$.

:::propriete
- Si $d > r$, la droite ne coupe pas le cercle.
- Si $d = r$, la droite est **tangente** au cercle.
- Si $d < r$, elle le coupe en deux points.
:::

:::propriete
La tangente au cercle de centre $\Omega$ en un point $A$ du cercle est la droite passant par $A$ et de vecteur normal $\overrightarrow{\Omega A}$.
:::

:::exemple
Le cercle $x^2 + y^2 = 25$ passe par $A(3 ; 4)$. La tangente en $A$ a pour vecteur normal $\overrightarrow{OA}(3 ; 4)$ : $3x + 4y + c = 0$ avec $9 + 16 + c = 0$, soit $3x + 4y - 25 = 0$.
:::
