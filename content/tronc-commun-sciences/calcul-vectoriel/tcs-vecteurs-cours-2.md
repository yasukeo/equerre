---
title: Calcul vectoriel — partie 2 : produit par un réel et colinéarité
kind: cours
summary: Produit d’un vecteur par un réel et ses règles de calcul, vecteurs colinéaires, parallélisme et alignement, caractérisation vectorielle du milieu et du centre de gravité d’un triangle.
position: 20
visibility: public
---

## Produit d’un vecteur par un réel

:::definition
Soit $\vec{u}$ un vecteur non nul et $k$ un réel non nul. Le vecteur $k\vec{u}$ a :

- la même direction que $\vec{u}$ ;
- le même sens que $\vec{u}$ si $k > 0$, le sens contraire si $k < 0$ ;
- une longueur égale à $|k| \times \|\vec{u}\|$.

Par convention, $0\vec{u} = \vec{0}$ et $k\vec{0} = \vec{0}$.
:::

:::propriete
Pour tous vecteurs $\vec{u}$, $\vec{v}$ et réels $a$, $b$ :

- $a(\vec{u} + \vec{v}) = a\vec{u} + a\vec{v}$ ;
- $(a + b)\vec{u} = a\vec{u} + b\vec{u}$ ;
- $a(b\vec{u}) = (ab)\vec{u}$ ;
- $a\vec{u} = \vec{0} \iff a = 0$ ou $\vec{u} = \vec{0}$.
:::

:::exemple
$3(\vec{u} - 2\vec{v}) - 2(\vec{u} + \vec{v}) = 3\vec{u} - 6\vec{v} - 2\vec{u} - 2\vec{v} = \vec{u} - 8\vec{v}$.
:::

## Vecteurs colinéaires

:::definition
Deux vecteurs $\vec{u}$ et $\vec{v}$ sont **colinéaires** s’il existe un réel $k$ tel que $\vec{v} = k\vec{u}$ (ou si $\vec{u} = \vec{0}$). Ils ont alors la même direction.
:::

:::propriete
- Les droites $(AB)$ et $(CD)$ sont **parallèles** si et seulement si $\overrightarrow{AB}$ et $\overrightarrow{CD}$ sont colinéaires.
- Les points $A$, $B$, $C$ sont **alignés** si et seulement si $\overrightarrow{AB}$ et $\overrightarrow{AC}$ sont colinéaires.
:::

:::exemple
Soit $ABC$ un triangle, $M$ défini par $\overrightarrow{AM} = 2\overrightarrow{AB}$ et $N$ par $\overrightarrow{AN} = 2\overrightarrow{AC}$. Alors $\overrightarrow{MN} = \overrightarrow{MA} + \overrightarrow{AN} = -2\overrightarrow{AB} + 2\overrightarrow{AC} = 2\left(\overrightarrow{AC} - \overrightarrow{AB}\right) = 2\overrightarrow{BC}$. Donc $(MN)$ est parallèle à $(BC)$, et $MN = 2BC$.
:::

## Milieu et centre de gravité

:::propriete
- Si $I$ est le milieu de $[BC]$, alors $\overrightarrow{AB} + \overrightarrow{AC} = 2\overrightarrow{AI}$ pour tout point $A$.
- Le **centre de gravité** $G$ du triangle $ABC$, point de concours des médianes, vérifie $\overrightarrow{GA} + \overrightarrow{GB} + \overrightarrow{GC} = \vec{0}$ et $\overrightarrow{AG} = \frac{2}{3}\overrightarrow{AI}$, où $I$ est le milieu de $[BC]$.
:::

:::exemple
Démontrons $\overrightarrow{AG} = \frac{2}{3}\overrightarrow{AI}$ à partir de $\overrightarrow{GA} + \overrightarrow{GB} + \overrightarrow{GC} = \vec{0}$. On a $\overrightarrow{GB} + \overrightarrow{GC} = 2\overrightarrow{GI}$, donc $\overrightarrow{GA} + 2\overrightarrow{GI} = \vec{0}$. Avec $\overrightarrow{GI} = \overrightarrow{GA} + \overrightarrow{AI}$ : $3\overrightarrow{GA} + 2\overrightarrow{AI} = \vec{0}$, soit $\overrightarrow{AG} = \frac{2}{3}\overrightarrow{AI}$.
:::

:::attention
Pour montrer un alignement ou un parallélisme, on exprime les vecteurs utiles en fonction de deux mêmes vecteurs de base, par exemple $\overrightarrow{AB}$ et $\overrightarrow{AC}$, puis on compare.
:::
