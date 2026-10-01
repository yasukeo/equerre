---
title: Nombres complexes (1re partie) — partie 1 : forme algébrique
kind: cours
summary: L’ensemble C, forme algébrique, partie réelle et imaginaire, calculs, puissances de i, conjugué, équations du premier degré, représentation géométrique : affixe d’un point, d’un vecteur, d’un milieu, alignement.
position: 10
visibility: public
---

## Forme algébrique

:::definition
Il existe un ensemble noté $\mathbb{C}$, dont les éléments sont appelés **nombres complexes**, qui contient $\mathbb{R}$, qui contient un nombre $i$ tel que $i^2 = -1$, et où l’addition et la multiplication suivent les mêmes règles que dans $\mathbb{R}$.

Tout nombre complexe $z$ s’écrit de façon unique $z = a + ib$ avec $a$ et $b$ réels : c’est sa **forme algébrique**. $a$ est la **partie réelle** de $z$, notée $\operatorname{Re}(z)$, et $b$ sa **partie imaginaire**, notée $\operatorname{Im}(z)$.
:::

- $z$ est **réel** si $\operatorname{Im}(z) = 0$, et **imaginaire pur** si $\operatorname{Re}(z) = 0$.
- $a + ib = a' + ib' \iff a = a'$ et $b = b'$.

:::exemple
$(2 + 3i)(1 - i) = 2 - 2i + 3i - 3i^2 = 2 + i + 3 = 5 + i$.

Pour écrire un quotient sous forme algébrique, on multiplie par le conjugué du dénominateur :

$$
\frac{1 + 2i}{3 - i} = \frac{(1 + 2i)(3 + i)}{(3 - i)(3 + i)} = \frac{3 + i + 6i + 2i^2}{9 + 1} = \frac{1 + 7i}{10}
$$
:::

## Conjugué

:::definition
Le **conjugué** de $z = a + ib$ est $\bar{z} = a - ib$.
:::

:::propriete
Pour tous nombres complexes $z$ et $z'$ :

- $z + \bar{z} = 2\operatorname{Re}(z)$ et $z - \bar{z} = 2i\operatorname{Im}(z)$ ;
- $z$ est réel $\iff \bar{z} = z$, et $z$ est imaginaire pur $\iff \bar{z} = -z$ ;
- $\overline{z + z'} = \bar{z} + \bar{z'}$, $\overline{z z'} = \bar{z} \, \bar{z'}$, $\overline{z^n} = \bar{z}^n$ et, si $z' \neq 0$, $\overline{\left(\frac{z}{z'}\right)} = \frac{\bar{z}}{\bar{z'}}$ ;
- $z \bar{z} = a^2 + b^2$ est un réel positif.
:::

## Représentation géométrique

Le plan est muni d’un repère orthonormé direct $(O, \vec{u}, \vec{v})$.

:::definition
À tout nombre complexe $z = a + ib$, on associe le point $M(a ; b)$ et le vecteur $\vec{w}(a ; b)$. On dit que $z$ est l’**affixe** de $M$ et de $\vec{w}$, et que $M$ est l’**image** de $z$.
:::

:::propriete
Si $A$ et $B$ ont pour affixes $z_A$ et $z_B$ :

- le vecteur $\overrightarrow{AB}$ a pour affixe $z_B - z_A$ ;
- le milieu $I$ de $[AB]$ a pour affixe $\frac{z_A + z_B}{2}$ ;
- $A$, $B$, $C$ distincts sont alignés si et seulement si $\frac{z_C - z_A}{z_B - z_A}$ est réel.
:::

### Puissances de $i$

$i^0 = 1$, $i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$ : les puissances de $i$ se répètent de $4$ en $4$. Pour tout entier $k$, $i^{4k} = 1$, $i^{4k + 1} = i$, $i^{4k + 2} = -1$, $i^{4k + 3} = -i$.

:::exemple
$2026 = 4 \times 506 + 2$, donc $i^{2026} = i^2 = -1$.
:::

### Équations du premier degré

:::exemple
Résoudre $(1 + i)z = 3 - i$ : $z = \frac{3 - i}{1 + i} = \frac{(3 - i)(1 - i)}{(1 + i)(1 - i)} = \frac{3 - 3i - i + i^2}{2} = \frac{2 - 4i}{2} = 1 - 2i$.
:::

Quand l’équation contient $z$ et $\bar{z}$, on pose $z = x + iy$ avec $x$ et $y$ réels, et on identifie les parties réelles et imaginaires.

:::exemple
Résoudre $2z + i\bar{z} = 3 + 3i$. Avec $z = x + iy$ : $2x + 2iy + i(x - iy) = (2x + y) + i(x + 2y)$. Il faut $2x + y = 3$ et $x + 2y = 3$, donc $x = y = 1$ : $z = 1 + i$.
:::

### Ensembles de points

:::exemple
Ensemble des points $M$ d’affixe $z \neq -1$ tels que $\frac{z - 2i}{z + 1}$ soit réel. Avec $A(2i)$ et $B(-1)$, ce quotient est réel si et seulement si $z = 2i$ ou $M$, $A$, $B$ sont alignés : l’ensemble est la droite $(AB)$ privée de $B$.
:::
