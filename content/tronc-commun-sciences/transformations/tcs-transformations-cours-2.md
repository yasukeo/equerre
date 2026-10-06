---
title: Transformations du plan — partie 2 : l’homothétie
kind: cours
summary: Homothétie de centre Ω et de rapport k, propriété vectorielle, image en coordonnées, effet sur les longueurs et les aires, images de droites et de cercles, et utilisation pour démontrer.
position: 20
visibility: public
---

## Définition

:::definition
Soit $\Omega$ un point et $k$ un réel non nul. L’**homothétie** de centre $\Omega$ et de rapport $k$, notée $h(\Omega, k)$, associe à tout point $M$ le point $M'$ tel que :

$$
\overrightarrow{\Omega M'} = k\overrightarrow{\Omega M}
$$
:::

:::exemple
- $h(\Omega, -1)$ est la symétrie centrale de centre $\Omega$.
- $h(\Omega, 1)$ laisse tous les points à leur place.
- Si $k > 0$, $M'$ est sur la demi-droite $[\Omega M)$ ; si $k < 0$, il est de l’autre côté de $\Omega$.
:::

## Propriété fondamentale

:::theoreme
Si $h(\Omega, k)$ envoie $A$ sur $A'$ et $B$ sur $B'$, alors $\overrightarrow{A'B'} = k\overrightarrow{AB}$.
:::

En effet, $\overrightarrow{A'B'} = \overrightarrow{\Omega B'} - \overrightarrow{\Omega A'} = k\overrightarrow{\Omega B} - k\overrightarrow{\Omega A} = k\overrightarrow{AB}$.

:::propriete
- Les longueurs sont multipliées par $|k|$, les aires par $k^2$.
- L’homothétie conserve l’alignement, le parallélisme, le milieu et les angles.
- L’image d’une droite est une droite qui lui est parallèle.
- L’image du cercle de centre $O$ et de rayon $r$ est le cercle de centre $O' = h(O)$ et de rayon $|k|r$.
:::

:::exemple
En coordonnées, si $\Omega(a ; b)$, l’image de $M(x ; y)$ par $h(\Omega, k)$ est $M'(a + k(x - a) ; b + k(y - b))$. Pour $\Omega(1 ; 2)$, $k = 2$ et $M(3 ; -1)$ : $M'(1 + 4 ; 2 - 6) = (5 ; -4)$.
:::

## Démontrer avec une homothétie

:::exemple
Soit $ABC$ un triangle, $G$ son centre de gravité, et $I$, $J$, $K$ les milieux de $[BC]$, $[CA]$, $[AB]$. On sait que $\overrightarrow{AG} = \frac{2}{3}\overrightarrow{AI}$, donc $\overrightarrow{GI} = \frac{1}{3}\overrightarrow{AI}$ et $\overrightarrow{GA} = -\frac{2}{3}\overrightarrow{AI}$ : ainsi $\overrightarrow{GI} = -\frac{1}{2}\overrightarrow{GA}$.

L’homothétie $h\left(G, -\frac{1}{2}\right)$ envoie $A$ sur $I$, et de même $B$ sur $J$ et $C$ sur $K$. Le triangle $IJK$ a donc ses côtés parallèles à ceux de $ABC$, deux fois plus courts, et une aire quatre fois plus petite.
:::

:::attention
Le rapport peut être négatif : les longueurs sont alors multipliées par $|k|$, pas par $k$.
:::
