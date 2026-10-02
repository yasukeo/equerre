---
title: Produit scalaire dans l’espace — partie 2 : plans, distances et sphères
kind: cours
summary: Équation cartésienne d’un plan à partir d’un vecteur normal, distance d’un point à un plan, projeté orthogonal, équation d’une sphère, positions relatives d’une sphère et d’un plan.
position: 20
visibility: public
---

L’espace est muni d’un repère orthonormé.

## Équation d’un plan

:::theoreme
Le plan passant par $A$ et de vecteur normal $\vec{n}(a ; b ; c)$ est l’ensemble des points $M$ tels que $\overrightarrow{AM} \cdot \vec{n} = 0$. Il a une équation de la forme $ax + by + cz + d = 0$, et réciproquement une telle équation (avec $(a ; b ; c) \neq (0 ; 0 ; 0)$) est celle d’un plan de vecteur normal $(a ; b ; c)$.
:::

:::exemple
Plan passant par $A(1 ; 2 ; -1)$ et de vecteur normal $\vec{n}(2 ; -1 ; 3)$ : $2x - y + 3z + d = 0$ avec $2 - 2 - 3 + d = 0$, soit $2x - y + 3z + 3 = 0$.
:::

:::exemple
**Plan médiateur.** L’ensemble des points équidistants de $A(1 ; 0 ; 2)$ et $B(3 ; 2 ; 0)$ est le plan passant par le milieu $I(2 ; 1 ; 1)$ et de vecteur normal $\overrightarrow{AB}(2 ; 2 ; -2)$, ou $(1 ; 1 ; -1)$ : $x + y - z - 2 = 0$.
:::

## Distance d’un point à un plan

:::propriete
La distance de $M_0(x_0 ; y_0 ; z_0)$ au plan $(P) : ax + by + cz + d = 0$ est :

$$
d(M_0, (P)) = \frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2 + b^2 + c^2}}
$$

C’est la distance $M_0H$, où $H$ est le **projeté orthogonal** de $M_0$ sur $(P)$.
:::

:::exemple
Distance de $O$ au plan $x + 2y + 2z - 6 = 0$ : $\frac{6}{3} = 2$. Le projeté $H$ vérifie $\overrightarrow{OH} = t(1 ; 2 ; 2)$ et $t + 4t + 4t - 6 = 0$, donc $t = \frac{2}{3}$ et $H\left(\frac{2}{3} ; \frac{4}{3} ; \frac{4}{3}\right)$.
:::

## Sphères

:::definition
La sphère de centre $\Omega(a ; b ; c)$ et de rayon $r > 0$ est l’ensemble des points $M$ tels que $\Omega M = r$ ; son équation est $(x - a)^2 + (y - b)^2 + (z - c)^2 = r^2$.
:::

:::propriete
- L’équation $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ s’écrit $(x - a)^2 + (y - b)^2 + (z - c)^2 = a^2 + b^2 + c^2 - d$ : c’est une sphère si ce nombre est strictement positif.
- La sphère de diamètre $[AB]$ est l’ensemble des points $M$ tels que $\overrightarrow{MA} \cdot \overrightarrow{MB} = 0$.
:::

## Sphère et plan

Soit $(S)$ de centre $\Omega$ et de rayon $r$, $(P)$ un plan et $d = d(\Omega, (P))$, $H$ le projeté de $\Omega$ sur $(P)$.

:::propriete
- $d > r$ : aucune intersection.
- $d = r$ : $(P)$ est **tangent** à $(S)$ en $H$.
- $d < r$ : l’intersection est le **cercle** de centre $H$ et de rayon $\sqrt{r^2 - d^2}$.
:::

:::exemple
$(S) : x^2 + y^2 + z^2 = 9$ et $(P) : z = 2$ : $d = 2 < 3$, intersection : cercle de centre $(0 ; 0 ; 2)$ et de rayon $\sqrt{9 - 4} = \sqrt{5}$.
:::
