---
title: Nombres complexes (2e partie) — partie 2 : transformations du plan
kind: cours
summary: Écriture complexe d’une translation, d’une homothétie et d’une rotation, reconnaître une transformation z′ = az + b, images de points et de figures, applications à la géométrie.
position: 20
visibility: public
---
## Transformations du plan

À chaque transformation, on associe son **écriture complexe** : la relation entre l’affixe $z$ d’un point $M$ et l’affixe $z'$ de son image $M'$.

:::propriete
- **Translation** de vecteur $\vec{w}$ d’affixe $b$ : $z' = z + b$.
- **Homothétie** de centre $\Omega$ d’affixe $\omega$ et de rapport $k$ réel non nul : $z' - \omega = k(z - \omega)$.
- **Rotation** de centre $\Omega$ d’affixe $\omega$ et d’angle $\theta$ : $z' - \omega = e^{i\theta}(z - \omega)$.
:::

:::exemple
La rotation de centre $\Omega(1 + i)$ et d’angle $\frac{\pi}{2}$ a pour écriture $z' - (1 + i) = i\left(z - (1 + i)\right)$, soit $z' = iz + 2$. L’image de $O$ est le point d’affixe $2$.
:::

:::propriete
Réciproquement, soit $z' = az + b$ avec $a \neq 0$ :

- si $a = 1$, c’est la translation de vecteur d’affixe $b$ ;
- si $a$ est réel et $a \neq 1$, c’est l’homothétie de rapport $a$ et de centre le point fixe d’affixe $\omega = \frac{b}{1 - a}$ ;
- si $|a| = 1$ et $a \neq 1$, c’est la rotation d’angle $\arg a$ et de centre le point fixe d’affixe $\omega = \frac{b}{1 - a}$.
:::

:::exemple
$z' = -2z + 3$ : $a = -2$ est réel, c’est l’homothétie de rapport $-2$ et de centre le point d’affixe $\omega = \frac{3}{1 + 2} = 1$.
:::

## Images de figures

Une translation, une homothétie ou une rotation transforme une droite en une droite et un cercle en un cercle. L’image du cercle de centre $A$ et de rayon $r$ est :

- par une translation ou une rotation, le cercle de centre $A'$ (image de $A$) et de même rayon $r$ ;
- par une homothétie de rapport $k$, le cercle de centre $A'$ et de rayon $|k| r$.

:::exemple
Par l’homothétie $z' = -2z + 3$, le cercle de centre $A(i)$ et de rayon $1$ a pour image le cercle de centre $A'(3 - 2i)$ et de rayon $2$.
:::

## Méthode : prouver une configuration avec une rotation

Pour montrer que $\Omega AB$ est équilatéral, il suffit de montrer que $B$ est l’image de $A$ par la rotation de centre $\Omega$ et d’angle $\frac{\pi}{3}$ (ou $-\frac{\pi}{3}$), c’est-à-dire que $z_B - z_\Omega = e^{\pm i\frac{\pi}{3}}\left(z_A - z_\Omega\right)$.

:::exemple
$\Omega(0)$, $A(2)$ et $B\left(1 + i\sqrt{3}\right)$ : $e^{i\frac{\pi}{3}} \times 2 = 2\left(\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) = 1 + i\sqrt{3} = z_B$. Donc $B$ est l’image de $A$ par la rotation de centre $O$ et d’angle $\frac{\pi}{3}$ : le triangle $OAB$ est équilatéral.
:::
