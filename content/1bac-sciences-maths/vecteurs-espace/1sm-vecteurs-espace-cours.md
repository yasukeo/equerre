---
title: Vecteurs de l’espace — partie 1 : calcul vectoriel
kind: cours
summary: Vecteurs de l’espace, égalité, somme et relation de Chasles, produit par un réel, colinéarité, droite définie par un point et un vecteur directeur, milieu et centre de gravité.
position: 10
visibility: public
---

## Vecteurs de l’espace

Les vecteurs de l’espace se définissent comme ceux du plan : $\overrightarrow{AB}$ a une **direction** (celle de la droite $(AB)$), un **sens** (de $A$ vers $B$) et une **norme** (la longueur $AB$).

:::propriete
- $\overrightarrow{AB} = \overrightarrow{CD}$ si et seulement si $ABDC$ est un parallélogramme (éventuellement aplati).
- **Relation de Chasles** : pour tous points $A$, $B$, $C$, $\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$.
- Règle du parallélogramme : $\overrightarrow{AB} + \overrightarrow{AD} = \overrightarrow{AC}$ si et seulement si $ABCD$ est un parallélogramme.
:::

## Produit par un réel

:::definition
Pour un réel $k$ et un vecteur $\vec{u}$ non nul, $k\vec{u}$ a la même direction que $\vec{u}$, le même sens si $k > 0$, le sens contraire si $k < 0$, et pour norme $|k| \times \|\vec{u}\|$.
:::

Les règles de calcul sont les mêmes que dans le plan : $k(\vec{u} + \vec{v}) = k\vec{u} + k\vec{v}$, $(k + k')\vec{u} = k\vec{u} + k'\vec{u}$, $k(k'\vec{u}) = (kk')\vec{u}$.

## Colinéarité

:::definition
$\vec{u}$ et $\vec{v}$ sont **colinéaires** si l’un est le produit de l’autre par un réel : $\vec{v} = k\vec{u}$ (ou $\vec{u} = \vec{0}$).
:::

:::propriete
- Trois points $A$, $B$, $C$ sont alignés si et seulement si $\overrightarrow{AB}$ et $\overrightarrow{AC}$ sont colinéaires.
- Deux droites $(AB)$ et $(CD)$ sont parallèles si et seulement si $\overrightarrow{AB}$ et $\overrightarrow{CD}$ sont colinéaires.
:::

## Droite de l’espace

:::definition
La droite $(D)$ passant par $A$ et de **vecteur directeur** $\vec{u}$ non nul est l’ensemble des points $M$ tels que $\overrightarrow{AM} = t\vec{u}$, $t \in \mathbb{R}$.
:::

## Milieu et centre de gravité

:::propriete
- $I$ est le milieu de $[AB]$ si et seulement si $\overrightarrow{IA} + \overrightarrow{IB} = \vec{0}$ ; alors pour tout point $M$, $\overrightarrow{MA} + \overrightarrow{MB} = 2\overrightarrow{MI}$.
- $G$ est le centre de gravité du triangle $ABC$ si et seulement si $\overrightarrow{GA} + \overrightarrow{GB} + \overrightarrow{GC} = \vec{0}$.
:::

:::exemple
Dans un cube $ABCDEFGH$ (face $ABCD$ en bas, $E$ au-dessus de $A$), $\overrightarrow{AB} + \overrightarrow{AD} + \overrightarrow{AE} = \overrightarrow{AC} + \overrightarrow{CG} = \overrightarrow{AG}$ : la diagonale du cube est la somme des trois arêtes issues de $A$.
:::
