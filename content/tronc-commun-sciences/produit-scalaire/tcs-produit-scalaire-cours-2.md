---
title: Le produit scalaire — partie 2 : règles de calcul et relations dans le triangle
kind: cours
summary: Symétrie et bilinéarité, identités remarquables, théorème d’Al-Kashi, calcul d’angles, théorème de la médiane et ensemble des points M tels que MA · MB = k.
position: 20
visibility: public
---

## Règles de calcul

:::propriete
Pour tous vecteurs $\vec{u}$, $\vec{v}$, $\vec{w}$ et tout réel $k$ :

- $\vec{u} \cdot \vec{v} = \vec{v} \cdot \vec{u}$ ;
- $\vec{u} \cdot (\vec{v} + \vec{w}) = \vec{u} \cdot \vec{v} + \vec{u} \cdot \vec{w}$ ;
- $(k\vec{u}) \cdot \vec{v} = k(\vec{u} \cdot \vec{v})$.
:::

:::propriete
**Identités remarquables.**

- $(\vec{u} + \vec{v})^2 = \vec{u}^2 + 2\vec{u} \cdot \vec{v} + \vec{v}^2$ ;
- $(\vec{u} - \vec{v})^2 = \vec{u}^2 - 2\vec{u} \cdot \vec{v} + \vec{v}^2$ ;
- $(\vec{u} + \vec{v}) \cdot (\vec{u} - \vec{v}) = \vec{u}^2 - \vec{v}^2$.
:::

:::exemple
Dans un losange $ABCD$ : $\overrightarrow{AC} \cdot \overrightarrow{BD} = \left(\overrightarrow{AB} + \overrightarrow{AD}\right) \cdot \left(\overrightarrow{AD} - \overrightarrow{AB}\right) = AD^2 - AB^2 = 0$. Les diagonales d’un losange sont perpendiculaires.
:::

## Théorème d’Al-Kashi

:::theoreme
Dans un triangle $ABC$ :

$$
BC^2 = AB^2 + AC^2 - 2 \times AB \times AC \times \cos \widehat{BAC}
$$
:::

En effet, $BC^2 = \left(\overrightarrow{AC} - \overrightarrow{AB}\right)^2 = AC^2 - 2\overrightarrow{AB} \cdot \overrightarrow{AC} + AB^2$. Si l’angle en $A$ est droit, on retrouve le théorème de Pythagore.

:::exemple
- $AB = 5$, $AC = 8$ et $\widehat{BAC} = 60°$ : $BC^2 = 25 + 64 - 80 \times \frac{1}{2} = 49$, donc $BC = 7$.
- Inversement, un triangle de côtés $5$, $7$, $8$ : l’angle opposé au côté $7$ vérifie $\cos \alpha = \frac{25 + 64 - 49}{2 \times 5 \times 8} = \frac{1}{2}$, donc $\alpha = 60°$.
:::

## Théorème de la médiane

:::theoreme
Soit $I$ le milieu de $[BC]$. Pour tout point $M$ :

$$
\overrightarrow{MB} \cdot \overrightarrow{MC} = MI^2 - \frac{BC^2}{4} \qquad MB^2 + MC^2 = 2MI^2 + \frac{BC^2}{2}
$$
:::

:::exemple
Dans un triangle avec $AB = 6$, $AC = 8$ et $BC = 10$, la médiane issue de $A$ vérifie $AI^2 = \frac{36 + 64}{2} - \frac{100}{4} = 25$, donc $AI = 5$.
:::

:::propriete
L’ensemble des points $M$ tels que $\overrightarrow{MA} \cdot \overrightarrow{MB} = 0$ est le **cercle de diamètre $[AB]$**.
:::

:::attention
Dans Al-Kashi, l’angle utilisé est celui qui est **opposé** au côté qu’on calcule.
:::
