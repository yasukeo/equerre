---
title: Nombres complexes (1re partie)
kind: cours
summary: Forme algébrique, conjugué, représentation géométrique, module et argument, forme trigonométrique, et premières applications à la géométrie.
position: 20
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

## Module et argument

:::definition
Le **module** de $z = a + ib$ est le réel positif $|z| = \sqrt{a^2 + b^2} = \sqrt{z\bar{z}}$. Si $M$ est l’image de $z$, $|z| = OM$, et $AB = |z_B - z_A|$.
:::

:::propriete
$|z z'| = |z| \, |z'|$, $|z^n| = |z|^n$, $\left|\frac{z}{z'}\right| = \frac{|z|}{|z'|}$ si $z' \neq 0$, $|\bar{z}| = |-z| = |z|$, et $|z + z'| \leq |z| + |z'|$.
:::

:::definition
Soit $z \neq 0$ d’image $M$. On appelle **argument** de $z$, noté $\arg(z)$, toute mesure de l’angle orienté $\left(\vec{u}, \overrightarrow{OM}\right)$. Il est défini à $2\pi$ près : on écrit $\arg(z) \equiv \theta \, [2\pi]$.
:::

:::propriete
Pour $z$ et $z'$ non nuls et $n$ entier :

$$
\arg(z z') \equiv \arg z + \arg z' \, [2\pi] \qquad \arg\left(\frac{z}{z'}\right) \equiv \arg z - \arg z' \, [2\pi] \qquad \arg(z^n) \equiv n \arg z \, [2\pi]
$$

$\arg(\bar{z}) \equiv -\arg z \, [2\pi]$ et $\arg(-z) \equiv \pi + \arg z \, [2\pi]$.
:::

:::propriete
Pour $A$, $B$, $C$ d’affixes $z_A$, $z_B$, $z_C$, avec $A \neq B$ et $A \neq C$ :

$$
\left(\overrightarrow{AB}, \overrightarrow{AC}\right) \equiv \arg\left(\frac{z_C - z_A}{z_B - z_A}\right) \, [2\pi]
$$
:::

## Forme trigonométrique

:::definition
Tout nombre complexe non nul $z$, de module $r$ et d’argument $\theta$, s’écrit :

$$
z = r(\cos\theta + i\sin\theta)
$$

C’est une **forme trigonométrique** de $z$ ; on la note aussi $[r, \theta]$.
:::

Pour passer de la forme algébrique $z = a + ib$ à la forme trigonométrique, on calcule $r = \sqrt{a^2 + b^2}$, puis on cherche $\theta$ tel que $\cos\theta = \frac{a}{r}$ et $\sin\theta = \frac{b}{r}$.

:::exemple
$z = 1 + i\sqrt{3}$ : $r = \sqrt{1 + 3} = 2$, $\cos\theta = \frac{1}{2}$ et $\sin\theta = \frac{\sqrt{3}}{2}$, donc $\theta = \frac{\pi}{3}$ et $z = 2\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right)$.
:::

:::propriete
**Formule de Moivre.** Pour tout réel $\theta$ et tout entier $n$ :

$$
(\cos\theta + i\sin\theta)^n = \cos(n\theta) + i\sin(n\theta)
$$
:::

:::exemple
$(1 + i\sqrt{3})^6 = \left[2, \frac{\pi}{3}\right]^6 = \left[64, 2\pi\right] = 64$.
:::

## Applications géométriques

:::propriete
Soit $A$, $B$, $C$ trois points distincts et $Z = \frac{z_C - z_A}{z_B - z_A}$.

- $A$, $B$, $C$ sont alignés $\iff Z$ est réel.
- $(AB) \perp (AC) \iff Z$ est imaginaire pur.
- $ABC$ est isocèle en $A$ $\iff |Z| = 1$.
- $ABC$ est équilatéral $\iff Z = \cos\frac{\pi}{3} \pm i\sin\frac{\pi}{3}$.
:::

:::exemple
$A(1)$, $B(3 + i)$, $C(i)$ : $Z = \frac{i - 1}{2 + i} = \frac{(i - 1)(2 - i)}{5} = \frac{-1 + 3i}{5}$. $Z$ n’est ni réel ni imaginaire pur : $A$, $B$, $C$ ne sont pas alignés et l’angle en $A$ n’est pas droit.
:::
