---
title: Calcul vectoriel — partie 1 : vecteurs, égalité, somme
kind: cours
summary: Vecteur défini par deux points, égalité de vecteurs et parallélogramme, vecteur nul et vecteur opposé, somme de vecteurs, relation de Chasles, règle du parallélogramme et milieu d’un segment.
position: 10
visibility: public
---

## Le vecteur $\overrightarrow{AB}$

:::definition
Soit $A$ et $B$ deux points distincts. Le **vecteur** $\overrightarrow{AB}$ est caractérisé par :

- sa **direction** : celle de la droite $(AB)$ ;
- son **sens** : de $A$ vers $B$ ;
- sa **longueur**, ou **norme**, notée $AB$ ou $\left\|\overrightarrow{AB}\right\|$.

Le vecteur $\overrightarrow{AA}$ est le **vecteur nul**, noté $\vec{0}$.
:::

## Égalité de vecteurs

:::definition
Deux vecteurs sont **égaux** s’ils ont même direction, même sens et même longueur.
:::

:::propriete
$\overrightarrow{AB} = \overrightarrow{DC}$ si et seulement si $ABCD$ est un **parallélogramme** (éventuellement aplati).
:::

:::exemple
Si $ABCD$ est un parallélogramme, alors $\overrightarrow{AB} = \overrightarrow{DC}$ et $\overrightarrow{AD} = \overrightarrow{BC}$.
:::

:::definition
Le **vecteur opposé** de $\overrightarrow{AB}$ est $\overrightarrow{BA}$ : même direction, même longueur, sens contraire. On note $\overrightarrow{BA} = -\overrightarrow{AB}$.
:::

## Somme de vecteurs

:::propriete
**Relation de Chasles.** Pour tous points $A$, $B$, $C$ :

$$
\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}
$$
:::

:::propriete
**Règle du parallélogramme.** Si $ABCD$ est un parallélogramme, alors $\overrightarrow{AB} + \overrightarrow{AD} = \overrightarrow{AC}$.
:::

:::exemple
- $\overrightarrow{MN} + \overrightarrow{NP} + \overrightarrow{PQ} = \overrightarrow{MQ}$.
- $\overrightarrow{AB} - \overrightarrow{CB} = \overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$.
- $\overrightarrow{AB} + \overrightarrow{BA} = \overrightarrow{AA} = \vec{0}$.
:::

:::attention
En général, $AB + BC \neq AC$ pour les longueurs : la relation de Chasles concerne les **vecteurs**, pas les distances.
:::

## Milieu d’un segment

:::propriete
Les trois affirmations suivantes sont équivalentes :

- $I$ est le milieu de $[AB]$ ;
- $\overrightarrow{AI} = \overrightarrow{IB}$ ;
- $\overrightarrow{IA} + \overrightarrow{IB} = \vec{0}$.
:::

:::exemple
Soit $I$ le milieu de $[AB]$ et $M$ un point quelconque. Alors $\overrightarrow{MA} + \overrightarrow{MB} = \overrightarrow{MI} + \overrightarrow{IA} + \overrightarrow{MI} + \overrightarrow{IB} = 2\overrightarrow{MI}$, car $\overrightarrow{IA} + \overrightarrow{IB} = \vec{0}$.
:::
