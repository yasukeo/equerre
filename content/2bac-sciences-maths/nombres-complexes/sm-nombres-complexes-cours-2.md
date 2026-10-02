---
title: Nombres complexes (1re partie) — partie 2 : module, argument, forme trigonométrique
kind: cours
summary: Module et argument, distances et angles orientés, forme trigonométrique, formule de Moivre, ensembles de points (cercles, médiatrices) et caractérisation des configurations géométriques.
position: 20
visibility: public
---
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

## Cercles et médiatrices

:::propriete
Soit $A$ et $B$ d’affixes $a$ et $b$, et $r > 0$.

- L’ensemble des points $M(z)$ tels que $|z - a| = r$ est le **cercle** de centre $A$ et de rayon $r$.
- L’ensemble des points $M(z)$ tels que $|z - a| = |z - b|$ est la **médiatrice** de $[AB]$.
:::

:::exemple
- $|z - 1 + i| = 2$ s’écrit $|z - (1 - i)| = 2$ : cercle de centre $\Omega(1 - i)$ et de rayon $2$.
- $|z - 1| = |z + i|$ s’écrit $|z - 1| = |z - (-i)|$ : médiatrice du segment $[AB]$ avec $A(1)$ et $B(-i)$.
:::

## Formule de Moivre et trigonométrie

La formule de Moivre permet d’exprimer $\cos(n\theta)$ et $\sin(n\theta)$ avec des puissances de $\cos\theta$ et $\sin\theta$.

:::exemple
$(\cos\theta + i\sin\theta)^3 = \cos 3\theta + i\sin 3\theta$. En développant le membre de gauche :

$$
\cos^3\theta + 3i\cos^2\theta\sin\theta - 3\cos\theta\sin^2\theta - i\sin^3\theta
$$

et en identifiant les parties réelles : $\cos 3\theta = \cos^3\theta - 3\cos\theta\sin^2\theta = 4\cos^3\theta - 3\cos\theta$.
:::

:::exemple
Forme trigonométrique de $z = -1 + i$ : $|z| = \sqrt{2}$, $\cos\theta = -\frac{\sqrt{2}}{2}$, $\sin\theta = \frac{\sqrt{2}}{2}$, donc $\theta = \frac{3\pi}{4}$ et $z = \sqrt{2}\left(\cos\frac{3\pi}{4} + i\sin\frac{3\pi}{4}\right)$. Alors $z^4 = 4\left(\cos 3\pi + i\sin 3\pi\right) = -4$.
:::
