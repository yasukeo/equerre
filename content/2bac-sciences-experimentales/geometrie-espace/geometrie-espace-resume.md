---
title: Géométrie dans l’espace : l’essentiel
kind: resume
summary: Produit scalaire, plans, sphères, produit vectoriel et droites sur une page, avec les formules de distance et d’aire.
position: 10
visibility: public
---

Repère orthonormé direct $(O, \vec{i}, \vec{j}, \vec{k})$.

## Produit scalaire et plans

:::propriete
- $\vec{u} \cdot \vec{v} = xx' + yy' + zz'$ ; $\vec{u} \perp \vec{v} \iff \vec{u} \cdot \vec{v} = 0$ ; $\|\vec{u}\| = \sqrt{x^2 + y^2 + z^2}$.
- Plan de vecteur normal $\vec{n}(a ; b ; c)$ : $ax + by + cz + d = 0$ ($d$ par un point du plan).
- $d(A, (P)) = \frac{|ax_A + by_A + cz_A + d|}{\sqrt{a^2 + b^2 + c^2}}$.
- Plans parallèles : normales colinéaires ; perpendiculaires : normales orthogonales.
:::

## Sphères

:::propriete
- Centre $\Omega(a ; b ; c)$, rayon $R$ : $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$ ; sphère de diamètre $[AB]$ : $\overrightarrow{MA} \cdot \overrightarrow{MB} = 0$.
- Avec $d = d(\Omega, (P))$ : $d > R$, pas d’intersection ; $d = R$, plan tangent au projeté $H$ de $\Omega$ ; $d < R$, cercle de centre $H$ et de rayon $\sqrt{R^2 - d^2}$.
- Plan tangent en $A$ : vecteur normal $\overrightarrow{\Omega A}$.
:::

## Produit vectoriel

:::propriete
- $\vec{u} \wedge \vec{v} = (yz' - zy')\vec{i} - (xz' - zx')\vec{j} + (xy' - yx')\vec{k}$, orthogonal à $\vec{u}$ et $\vec{v}$.
- $A$, $B$, $C$ alignés $\iff \overrightarrow{AB} \wedge \overrightarrow{AC} = \vec{0}$ ; sinon c’est un vecteur normal à $(ABC)$.
- Aire de $ABC = \frac{1}{2}\left\|\overrightarrow{AB} \wedge \overrightarrow{AC}\right\|$ ; $d(M, (D)) = \frac{\left\|\overrightarrow{AM} \wedge \vec{u}\right\|}{\|\vec{u}\|}$.
:::

## Droites

Droite par $A$, de vecteur directeur $\vec{u}(\alpha ; \beta ; \gamma)$ : $x = x_A + \alpha t$, $y = y_A + \beta t$, $z = z_A + \gamma t$. Intersection avec un plan ou une sphère : remplacer dans l’équation et résoudre en $t$.

:::attention
Le signe moins devant la composante en $\vec{j}$ du produit vectoriel : vérifier l’orthogonalité du résultat avec les deux vecteurs.
:::
