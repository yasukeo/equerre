---
title: Nombres complexes (2e partie) — partie 1 : forme exponentielle et équations
kind: cours
summary: Notation exponentielle, règles de calcul, formules d’Euler et linéarisation, équations du second degré à coefficients réels dans C, somme et produit des solutions, factorisation d’un polynôme.
position: 10
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

:::exemple
$z^2 + z + 1 = 0$ : $\Delta = -3 = \left(i\sqrt{3}\right)^2$, donc $z = \frac{-1 - i\sqrt{3}}{2} = e^{-i\frac{2\pi}{3}}$ ou $z = \frac{-1 + i\sqrt{3}}{2} = e^{i\frac{2\pi}{3}}$.
:::

### Équations qui se ramènent au second degré

:::exemple
Soit $P(z) = z^3 - 3z^2 + 4z - 2$. On remarque que $P(1) = 1 - 3 + 4 - 2 = 0$ ; on peut donc factoriser par $z - 1$ : $P(z) = (z - 1)\left(z^2 - 2z + 2\right)$ (on le vérifie en développant). L’équation $z^2 - 2z + 2 = 0$ a pour discriminant $-4 = (2i)^2$ et pour solutions $1 - i$ et $1 + i$. Les solutions de $P(z) = 0$ sont $1$, $1 - i$ et $1 + i$.
:::

:::exemple
Résoudre $z^4 - 1 = 0$ : $z^4 - 1 = (z^2 - 1)(z^2 + 1) = (z - 1)(z + 1)(z - i)(z + i)$. Les solutions sont $1$, $-1$, $i$ et $-i$.
:::

### Linéariser avec Euler

:::exemple
$\sin^3\theta = \left(\frac{e^{i\theta} - e^{-i\theta}}{2i}\right)^3 = \frac{e^{3i\theta} - 3e^{i\theta} + 3e^{-i\theta} - e^{-3i\theta}}{-8i} = \frac{2i\sin 3\theta - 6i\sin\theta}{-8i} = \frac{3\sin\theta - \sin 3\theta}{4}$.
:::
