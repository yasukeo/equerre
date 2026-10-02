---
title: Géométrie dans l’espace — partie 1 : produit scalaire, plans et sphères
kind: cours
summary: Produit scalaire dans l’espace, vecteur normal et équation cartésienne d’un plan, distance d’un point à un plan, équation d’une sphère, positions relatives d’une sphère et d’un plan, plan tangent.
position: 10
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

:::exemple
Soit $(S)$ la sphère de centre $\Omega(1 ; 2 ; -1)$ et de rayon $R = 3$, et $(P) : x + 2y + 2z + 4 = 0$. Alors $d(\Omega, (P)) = \frac{|1 + 4 - 2 + 4|}{\sqrt{1 + 4 + 4}} = \frac{7}{3} < 3$ : le plan coupe la sphère selon un cercle de rayon $r = \sqrt{9 - \frac{49}{9}} = \frac{\sqrt{32}}{3} = \frac{4\sqrt{2}}{3}$.
:::

### Plan tangent à une sphère

:::propriete
Le plan tangent à la sphère de centre $\Omega$ en un point $A$ de la sphère est le plan passant par $A$ et de vecteur normal $\overrightarrow{\Omega A}$.
:::

:::exemple
La sphère $x^2 + y^2 + z^2 = 9$ (centre $O$, rayon $3$) contient $A(1 ; 2 ; 2)$. Le plan tangent en $A$ a pour vecteur normal $\overrightarrow{OA}(1 ; 2 ; 2)$ : $x + 2y + 2z + d = 0$ avec $1 + 4 + 4 + d = 0$, soit $x + 2y + 2z - 9 = 0$. On vérifie que $d(O, (P)) = \frac{9}{3} = 3 = R$.
:::

### Projeté orthogonal d’un point sur un plan

Pour trouver le projeté orthogonal $H$ de $\Omega$ sur $(P) : ax + by + cz + d = 0$, on écrit que $\overrightarrow{\Omega H} = t\,\vec{n}$ avec $\vec{n}(a ; b ; c)$, puis on remplace les coordonnées de $H$ dans l’équation de $(P)$ pour trouver $t$.
