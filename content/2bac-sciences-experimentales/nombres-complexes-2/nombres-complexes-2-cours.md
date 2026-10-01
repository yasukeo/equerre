---
title: Nombres complexes (2e partie)
kind: cours
summary: Notation exponentielle, formules d’Euler, équations du second degré dans ℂ, et transformations du plan (translation, homothétie, rotation).
position: 20
visibility: public
---

## Notation exponentielle

:::definition
Pour tout réel $\theta$, on note $e^{i\theta} = \cos\theta + i\sin\theta$. Tout nombre complexe non nul de module $r$ et d’argument $\theta$ s’écrit $z = r e^{i\theta}$ : c’est sa **forme exponentielle**.
:::

:::propriete
Pour tous réels $\theta$ et $\theta'$ et tout entier $n$ :

$$
e^{i\theta} e^{i\theta'} = e^{i(\theta + \theta')} \qquad \frac{e^{i\theta}}{e^{i\theta'}} = e^{i(\theta - \theta')} \qquad \left(e^{i\theta}\right)^n = e^{in\theta} \qquad \overline{e^{i\theta}} = e^{-i\theta}
$$

$|e^{i\theta}| = 1$, $e^{i\pi} = -1$, $e^{i\frac{\pi}{2}} = i$.
:::

:::propriete
**Formules d’Euler.** Pour tout réel $\theta$ :

$$
\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2} \qquad \sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}
$$
:::

:::exemple
**Linéarisation.** $\cos^2\theta = \left(\frac{e^{i\theta} + e^{-i\theta}}{2}\right)^2 = \frac{e^{2i\theta} + 2 + e^{-2i\theta}}{4} = \frac{1 + \cos(2\theta)}{2}$.
:::

## Équations du second degré

:::theoreme
Soit l’équation $az^2 + bz + c = 0$ avec $a$, $b$, $c$ réels et $a \neq 0$, de discriminant $\Delta = b^2 - 4ac$.

- Si $\Delta > 0$ : deux solutions réelles $\frac{-b - \sqrt{\Delta}}{2a}$ et $\frac{-b + \sqrt{\Delta}}{2a}$.
- Si $\Delta = 0$ : une solution réelle $-\frac{b}{2a}$.
- Si $\Delta < 0$ : deux solutions complexes conjuguées $\frac{-b - i\sqrt{-\Delta}}{2a}$ et $\frac{-b + i\sqrt{-\Delta}}{2a}$.
:::

:::exemple
$z^2 - 2z + 5 = 0$ : $\Delta = 4 - 20 = -16 = (4i)^2$, donc $z = \frac{2 - 4i}{2} = 1 - 2i$ ou $z = 1 + 2i$.
:::

:::propriete
Si $z_1$ et $z_2$ sont les solutions de $az^2 + bz + c = 0$, alors $z_1 + z_2 = -\frac{b}{a}$ et $z_1 z_2 = \frac{c}{a}$.
:::

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
