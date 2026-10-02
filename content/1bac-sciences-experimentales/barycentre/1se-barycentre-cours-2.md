---
title: Le barycentre — partie 2 : trois points et applications
kind: cours
summary: Barycentre de trois points, centre de gravité, barycentre partiel (associativité), coordonnées, concours de droites, ensembles de points définis par une égalité vectorielle.
position: 20
visibility: public
---

## Barycentre de trois points

:::theoreme
Soit $(A ; \alpha)$, $(B ; \beta)$, $(C ; \gamma)$ avec $\alpha + \beta + \gamma \neq 0$. Il existe un unique point $G$ tel que $\alpha\overrightarrow{GA} + \beta\overrightarrow{GB} + \gamma\overrightarrow{GC} = \vec{0}$ : c’est le **barycentre** de ces trois points pondérés.

Pour tout point $M$ : $\alpha\overrightarrow{MA} + \beta\overrightarrow{MB} + \gamma\overrightarrow{MC} = (\alpha + \beta + \gamma)\overrightarrow{MG}$.
:::

:::propriete
- L’isobarycentre de $A$, $B$, $C$ (coefficients égaux) est le **centre de gravité** du triangle $ABC$.
- Coordonnées : $x_G = \frac{\alpha x_A + \beta x_B + \gamma x_C}{\alpha + \beta + \gamma}$, et de même pour $y_G$.
:::

## Barycentre partiel (associativité)

:::theoreme
Si $\alpha + \beta \neq 0$ et si $H$ est le barycentre de $\{(A ; \alpha), (B ; \beta)\}$, alors le barycentre $G$ de $\{(A ; \alpha), (B ; \beta), (C ; \gamma)\}$ est aussi le barycentre de $\{(H ; \alpha + \beta), (C ; \gamma)\}$.
:::

Cette propriété permet de **construire** $G$ en deux étapes, et de montrer que des droites sont **concourantes** ou que des points sont **alignés**.

:::exemple
$G$ barycentre de $\{(A ; 1), (B ; 1), (C ; 2)\}$. Soit $I$ le milieu de $[AB]$ (barycentre de $\{(A ; 1), (B ; 1)\}$). Alors $G$ est le barycentre de $\{(I ; 2), (C ; 2)\}$ : c’est le milieu de $[IC]$.
:::

:::exemple
**Médianes.** Le centre de gravité $G$ de $ABC$ est barycentre de $\{(I ; 2), (C ; 1)\}$, où $I$ est le milieu de $[AB]$ : il est sur la médiane $(CI)$ et $\overrightarrow{CG} = \frac{2}{3}\overrightarrow{CI}$. De même pour les deux autres médianes : elles sont concourantes en $G$.
:::

## Ensembles de points

On réduit une somme vectorielle à l’aide du barycentre, puis on reconnaît une figure.

:::exemple
Ensemble des points $M$ tels que $\left\|\overrightarrow{MA} + 2\overrightarrow{MB}\right\| = 6$, avec $AB = 3$. Soit $G$ le barycentre de $\{(A ; 1), (B ; 2)\}$ : $\overrightarrow{MA} + 2\overrightarrow{MB} = 3\overrightarrow{MG}$, donc la condition s’écrit $3MG = 6$, soit $MG = 2$. C’est le cercle de centre $G$ et de rayon $2$.
:::

:::exemple
Ensemble des points $M$ tels que $\left\|\overrightarrow{MA} + \overrightarrow{MB}\right\| = \left\|\overrightarrow{MA} - \overrightarrow{MC}\right\|$. Avec $I$ milieu de $[AB]$ : $\overrightarrow{MA} + \overrightarrow{MB} = 2\overrightarrow{MI}$, et $\overrightarrow{MA} - \overrightarrow{MC} = \overrightarrow{CA}$. La condition s’écrit $2MI = CA$ : cercle de centre $I$ et de rayon $\frac{CA}{2}$.
:::

:::attention
Quand la somme des coefficients est nulle, la somme vectorielle ne dépend pas de $M$ : $\overrightarrow{MA} - \overrightarrow{MB} = \overrightarrow{BA}$.
:::
