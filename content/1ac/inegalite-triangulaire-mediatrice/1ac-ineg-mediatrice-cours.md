---
title: Inégalité triangulaire et médiatrice — partie 1 : l’inégalité triangulaire
kind: cours
summary: L’inégalité triangulaire, le cas d’égalité quand un point est sur le segment, et savoir si un triangle est constructible avec trois longueurs données.
position: 10
visibility: public
---

## L’inégalité triangulaire

:::propriete
Pour trois points $A$, $B$, $C$ quelconques :

$$
AC \leq AB + BC
$$

Le chemin direct de $A$ à $C$ est toujours le plus court.
:::

## Le cas d’égalité

:::propriete
$AC = AB + BC$ si et seulement si le point $B$ est sur le segment $[AC]$.
:::

:::exemple
$AB = 3$ cm, $BC = 5$ cm et $AC = 8$ cm : $AB + BC = AC$, donc $B$ appartient à $[AC]$ et les trois points sont alignés.
:::

## Construire un triangle

:::propriete
On peut construire un triangle avec trois longueurs si et seulement si la **plus grande** est **strictement inférieure** à la somme des deux autres.
:::

:::exemple
- $4$ cm, $5$ cm, $7$ cm : $7 < 4 + 5 = 9$, le triangle est constructible.
- $3$ cm, $4$ cm, $8$ cm : $8 > 3 + 4 = 7$, il n’est pas constructible.
- $3$ cm, $5$ cm, $8$ cm : $8 = 3 + 5$, les points sont alignés : on obtient un triangle « aplati ».
:::

:::attention
Il suffit de tester la plus grande longueur : si elle est plus petite que la somme des deux autres, les autres inégalités sont automatiquement vraies.
:::
