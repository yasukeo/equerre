---
title: Le barycentre : l’essentiel
kind: resume
summary: Définition, construction, coordonnées, barycentre partiel et ensembles de points, sur une page.
position: 10
visibility: public
---

## Définition

$G$ barycentre de $\{(A ; \alpha), (B ; \beta)\}$ ($\alpha + \beta \neq 0$) : $\alpha\overrightarrow{GA} + \beta\overrightarrow{GB} = \vec{0}$. Construction : $\overrightarrow{AG} = \frac{\beta}{\alpha + \beta}\overrightarrow{AB}$.

:::propriete
- Réduction : $\alpha\overrightarrow{MA} + \beta\overrightarrow{MB} + \gamma\overrightarrow{MC} = (\alpha + \beta + \gamma)\overrightarrow{MG}$.
- Homogénéité : multiplier tous les coefficients par $k \neq 0$ ne change pas $G$.
- Coefficients égaux : milieu (deux points), centre de gravité (trois points).
- Coordonnées : $x_G = \frac{\sum \alpha_i x_i}{\sum \alpha_i}$.
:::

## Barycentre partiel

Remplacer deux points par leur barycentre affecté de la somme de leurs coefficients : cela construit $G$ et montre alignements et concours.

## Ensembles de points

$\left\|\alpha\overrightarrow{MA} + \beta\overrightarrow{MB}\right\| = k$ devient $|\alpha + \beta|\,MG = k$ : un cercle de centre $G$.

:::attention
Si la somme des coefficients est nulle, pas de barycentre : la somme vectorielle est alors un vecteur constant.
:::
