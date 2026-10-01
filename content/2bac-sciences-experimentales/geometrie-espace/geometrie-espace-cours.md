---
title: Géométrie dans l’espace
kind: cours
summary: Produit scalaire dans l’espace, équation cartésienne d’un plan, distance d’un point à un plan, équation d’une sphère, produit vectoriel et ses applications.
position: 20
visibility: public
---

L’espace est muni d’un repère orthonormé direct $(O, \vec{i}, \vec{j}, \vec{k})$.

## Produit scalaire

:::definition
Pour $\vec{u}(x ; y ; z)$ et $\vec{v}(x' ; y' ; z')$ :

$$
\vec{u} \cdot \vec{v} = x x' + y y' + z z' \qquad \|\vec{u}\| = \sqrt{x^2 + y^2 + z^2}
$$
:::

:::propriete
- $\vec{u} \perp \vec{v} \iff \vec{u} \cdot \vec{v} = 0$.
- $AB = \|\overrightarrow{AB}\| = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}$.
- Le produit scalaire est symétrique et bilinéaire, comme dans le plan.
:::

## Équation cartésienne d’un plan

:::definition
Un vecteur $\vec{n}$ non nul est **normal** à un plan $(P)$ s’il est orthogonal à tout vecteur de $(P)$.
:::

:::theoreme
Le plan passant par $A$ et de vecteur normal $\vec{n}(a ; b ; c)$ est l’ensemble des points $M$ tels que $\overrightarrow{AM} \cdot \vec{n} = 0$. Il a une équation de la forme :

$$
ax + by + cz + d = 0
$$

Réciproquement, si $(a ; b ; c) \neq (0 ; 0 ; 0)$, cette équation est celle d’un plan de vecteur normal $\vec{n}(a ; b ; c)$.
:::

:::exemple
Le plan passant par $A(1 ; 2 ; -1)$ de vecteur normal $\vec{n}(2 ; -1 ; 3)$ a pour équation $2x - y + 3z + d = 0$, et $A$ lui appartient : $2 - 2 - 3 + d = 0$, donc $d = 3$. $(P) : 2x - y + 3z + 3 = 0$.
:::

:::propriete
Deux plans de vecteurs normaux $\vec{n}$ et $\vec{n'}$ sont parallèles si $\vec{n}$ et $\vec{n'}$ sont colinéaires, et perpendiculaires si $\vec{n} \cdot \vec{n'} = 0$.
:::

## Distance d’un point à un plan

:::propriete
La distance du point $A(x_A ; y_A ; z_A)$ au plan $(P) : ax + by + cz + d = 0$ est :

$$
d(A, (P)) = \frac{|a x_A + b y_A + c z_A + d|}{\sqrt{a^2 + b^2 + c^2}}
$$
:::

:::exemple
Distance de $O$ au plan $2x - y + 2z - 9 = 0$ : $\frac{|-9|}{\sqrt{4 + 1 + 4}} = \frac{9}{3} = 3$.
:::

## Sphère

:::definition
La **sphère** de centre $\Omega(a ; b ; c)$ et de rayon $R > 0$ est l’ensemble des points $M$ tels que $\Omega M = R$. Elle a pour équation :

$$
(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2
$$
:::

:::propriete
La sphère de diamètre $[AB]$ est l’ensemble des points $M$ tels que $\overrightarrow{MA} \cdot \overrightarrow{MB} = 0$.
:::

:::exemple
$x^2 + y^2 + z^2 - 2x + 4z - 4 = 0$ s’écrit $(x - 1)^2 + y^2 + (z + 2)^2 = 9$ : c’est la sphère de centre $\Omega(1 ; 0 ; -2)$ et de rayon $3$.
:::

### Position d’une sphère et d’un plan

Soit $S$ une sphère de centre $\Omega$ et de rayon $R$, $(P)$ un plan et $d = d(\Omega, (P))$.

- Si $d > R$, le plan ne coupe pas la sphère.
- Si $d = R$, le plan est **tangent** à la sphère en un point $H$, projeté orthogonal de $\Omega$ sur $(P)$.
- Si $d < R$, le plan coupe la sphère selon un **cercle** de centre $H$ (projeté orthogonal de $\Omega$ sur $(P)$) et de rayon $r = \sqrt{R^2 - d^2}$.

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
