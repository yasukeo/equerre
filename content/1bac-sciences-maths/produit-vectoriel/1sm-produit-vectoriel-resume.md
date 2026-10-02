---
title: Le produit vectoriel : l’essentiel
kind: resume
summary: Définition, calcul et applications du produit vectoriel (alignement, plans, aires, distances), sur une page.
position: 10
visibility: public
---

## Définition et calcul

:::propriete
- $\vec{u} \wedge \vec{v}$ est orthogonal à $\vec{u}$ et $\vec{v}$, $(\vec{u}, \vec{v}, \vec{u} \wedge \vec{v})$ est directe, $\|\vec{u} \wedge \vec{v}\| = \|\vec{u}\|\|\vec{v}\|\sin\theta$.
- $\vec{u} \wedge \vec{v} = (yz' - zy' ; -(xz' - zx') ; xy' - yx')$.
- Antisymétrique ; nul $\iff$ colinéaires.
:::

## Applications

- $A$, $B$, $C$ alignés $\iff \overrightarrow{AB} \wedge \overrightarrow{AC} = \vec{0}$.
- Vecteur normal à $(ABC)$ : $\overrightarrow{AB} \wedge \overrightarrow{AC}$.
- Aire du triangle : $\frac{1}{2}\left\|\overrightarrow{AB} \wedge \overrightarrow{AC}\right\|$.
- Distance à une droite : $\frac{\left\|\overrightarrow{AM} \wedge \vec{u}\right\|}{\|\vec{u}\|}$.
- Intersection de deux plans : direction $\vec{n} \wedge \vec{n'}$.

:::attention
Le signe moins devant la deuxième composante ; vérifier le résultat par deux produits scalaires nuls.
:::
