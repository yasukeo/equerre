---
title: Le produit vectoriel — partie 2 : applications
kind: cours
summary: Alignement de trois points, vecteur normal et équation d’un plan défini par trois points, aire d’un triangle et d’un parallélogramme, distance d’un point à une droite, intersection de deux plans.
position: 20
visibility: public
---

L’espace est muni d’un repère orthonormé direct.

## Alignement

:::propriete
$A$, $B$, $C$ sont alignés si et seulement si $\overrightarrow{AB} \wedge \overrightarrow{AC} = \vec{0}$.
:::

## Plan défini par trois points

:::propriete
Si $A$, $B$, $C$ ne sont pas alignés, $\overrightarrow{AB} \wedge \overrightarrow{AC}$ est un **vecteur normal** au plan $(ABC)$.
:::

:::exemple
$A(1 ; 0 ; 0)$, $B(0 ; 1 ; 0)$, $C(0 ; 0 ; 1)$ : $\overrightarrow{AB}(-1 ; 1 ; 0)$, $\overrightarrow{AC}(-1 ; 0 ; 1)$, $\overrightarrow{AB} \wedge \overrightarrow{AC} = (1 ; 1 ; 1)$. Le plan $(ABC)$ a pour équation $x + y + z - 1 = 0$.
:::

## Aires

:::propriete
- L’aire du parallélogramme construit sur $\overrightarrow{AB}$ et $\overrightarrow{AC}$ est $\left\|\overrightarrow{AB} \wedge \overrightarrow{AC}\right\|$.
- L’aire du triangle $ABC$ est $\frac{1}{2}\left\|\overrightarrow{AB} \wedge \overrightarrow{AC}\right\|$.
:::

:::exemple
Pour le triangle précédent : $\frac{1}{2}\sqrt{1 + 1 + 1} = \frac{\sqrt{3}}{2}$.
:::

## Distance d’un point à une droite

:::propriete
La distance du point $M$ à la droite $(D)$ passant par $A$ et de vecteur directeur $\vec{u}$ est :

$$
d(M, (D)) = \frac{\left\|\overrightarrow{AM} \wedge \vec{u}\right\|}{\|\vec{u}\|}
$$
:::

:::exemple
$M(1 ; 1 ; 1)$ et la droite $(D)$ passant par $O$ de vecteur directeur $\vec{k}(0 ; 0 ; 1)$ : $\overrightarrow{OM} \wedge \vec{k} = (1 \times 1 - 1 \times 0 ; -(1 \times 1 - 1 \times 0) ; 0) = (1 ; -1 ; 0)$, de norme $\sqrt{2}$ : $d = \sqrt{2}$, la distance de $M$ à l’axe des cotes.
:::

## Intersection de deux plans

:::propriete
Si deux plans de vecteurs normaux $\vec{n}$ et $\vec{n'}$ sont sécants, leur droite d’intersection a pour vecteur directeur $\vec{n} \wedge \vec{n'}$.
:::

:::exemple
$(P) : x + y + z = 3$ et $(Q) : x - y + 2z = 2$ : $(1 ; 1 ; 1) \wedge (1 ; -1 ; 2) = (2 + 1 ; -(2 - 1) ; -1 - 1) = (3 ; -1 ; -2)$ dirige la droite d’intersection. Le point $(1 ; 1 ; 1)$ est dans les deux plans : la droite est $x = 1 + 3t$, $y = 1 - t$, $z = 1 - 2t$.
:::
