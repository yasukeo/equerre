---
title: Produit scalaire dans l’espace : l’essentiel
kind: resume
summary: Produit scalaire, orthogonalité, vecteur normal, équation de plan, distance à un plan, sphères et positions, sur une page.
position: 10
visibility: public
---

## Produit scalaire

$\vec{u} \cdot \vec{v} = xx' + yy' + zz'$ (repère orthonormé) ; $\|\vec{u}\| = \sqrt{x^2 + y^2 + z^2}$ ; orthogonaux $\iff \vec{u} \cdot \vec{v} = 0$.

## Plans

:::propriete
- Vecteur normal : orthogonal à deux vecteurs directeurs non colinéaires.
- Plan de vecteur normal $(a ; b ; c)$ : $ax + by + cz + d = 0$.
- Plans parallèles : normales colinéaires ; perpendiculaires : normales orthogonales.
- $d(M_0, (P)) = \frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2 + b^2 + c^2}}$.
:::

## Sphères

Centre $(a ; b ; c)$, rayon $r$ : $(x - a)^2 + (y - b)^2 + (z - c)^2 = r^2$. Diamètre $[AB]$ : $\overrightarrow{MA} \cdot \overrightarrow{MB} = 0$. Sphère et plan : comparer $d(\Omega, (P))$ à $r$ ; cercle de rayon $\sqrt{r^2 - d^2}$.

:::attention
Dans l’espace, deux droites orthogonales ne se coupent pas forcément ; « perpendiculaires » veut dire orthogonales **et** sécantes.
:::
