---
title: Le barycentre — partie 1 : barycentre de deux points
kind: cours
summary: Point pondéré, définition et existence du barycentre de deux points, construction, homogénéité, milieu comme isobarycentre, coordonnées, alignement.
position: 10
visibility: public
---

## Barycentre de deux points

:::theoreme
Soit $(A ; \alpha)$ et $(B ; \beta)$ deux points pondérés, avec $\alpha + \beta \neq 0$. Il existe un **unique** point $G$ tel que :

$$
\alpha\overrightarrow{GA} + \beta\overrightarrow{GB} = \vec{0}
$$

$G$ est le **barycentre** du système $\{(A ; \alpha), (B ; \beta)\}$.
:::

:::attention
Si $\alpha + \beta = 0$ (avec $A \neq B$), le barycentre n’existe pas.
:::

:::propriete
Pour tout point $M$ du plan : $\alpha\overrightarrow{MA} + \beta\overrightarrow{MB} = (\alpha + \beta)\overrightarrow{MG}$. En prenant $M = A$ :

$$
\overrightarrow{AG} = \frac{\beta}{\alpha + \beta}\overrightarrow{AB}
$$

Cette relation sert à **construire** $G$ : il est sur la droite $(AB)$.
:::

:::exemple
$G$ barycentre de $\{(A ; 1), (B ; 3)\}$ : $\overrightarrow{AG} = \frac{3}{4}\overrightarrow{AB}$. $G$ est sur le segment $[AB]$, aux trois quarts en partant de $A$.
:::

:::exemple
$G$ barycentre de $\{(A ; 3), (B ; -1)\}$ : $\overrightarrow{AG} = \frac{-1}{2}\overrightarrow{AB}$ : $G$ est sur la droite $(AB)$, hors du segment, du côté de $A$.
:::

## Propriétés

:::propriete
- **Homogénéité** : pour tout réel $k \neq 0$, le barycentre de $\{(A ; k\alpha), (B ; k\beta)\}$ est le même que celui de $\{(A ; \alpha), (B ; \beta)\}$.
- Si $\alpha = \beta$, le barycentre est le **milieu** de $[AB]$ (on parle d’**isobarycentre**).
- Si $\alpha$ et $\beta$ sont de même signe, $G$ appartient au segment $[AB]$.
:::

## Coordonnées du barycentre

:::propriete
Dans un repère, si $A(x_A ; y_A)$ et $B(x_B ; y_B)$, le barycentre $G$ de $\{(A ; \alpha), (B ; \beta)\}$ a pour coordonnées :

$$
x_G = \frac{\alpha x_A + \beta x_B}{\alpha + \beta} \qquad y_G = \frac{\alpha y_A + \beta y_B}{\alpha + \beta}
$$
:::

:::exemple
$A(1 ; 2)$, $B(4 ; -1)$, $G$ barycentre de $\{(A ; 2), (B ; 1)\}$ : $x_G = \frac{2 + 4}{3} = 2$ et $y_G = \frac{4 - 1}{3} = 1$, donc $G(2 ; 1)$.
:::

## Alignement

:::propriete
Trois points distincts $A$, $B$, $C$ sont alignés si et seulement si l’un d’eux est barycentre des deux autres affectés de coefficients convenables.
:::

:::exemple
Si $\overrightarrow{AC} = \frac{2}{5}\overrightarrow{AB}$, alors $C$ est le barycentre de $\{(A ; 3), (B ; 2)\}$ : en effet $\frac{\beta}{\alpha + \beta} = \frac{2}{5}$ avec $\alpha = 3$, $\beta = 2$.
:::
