---
title: Nombres complexes (2e partie) — partie 1 : forme exponentielle et équations
kind: cours
summary: Notation exponentielle, formules d’Euler, équations du second degré à coefficients réels puis complexes, racines carrées d’un complexe, racines n-ièmes de l’unité.
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

## Racines carrées d’un nombre complexe

:::definition
Une **racine carrée** du nombre complexe $Z$ est un nombre complexe $\delta$ tel que $\delta^2 = Z$. Tout nombre complexe non nul a exactement deux racines carrées, opposées.
:::

Pour trouver les racines carrées de $Z = a + ib$ sous forme algébrique, on cherche $\delta = x + iy$ avec $x$, $y$ réels :

$$
\delta^2 = Z \iff \begin{cases} x^2 - y^2 = a \\ 2xy = b \end{cases} \qquad \text{et} \qquad |\delta|^2 = |Z| \text{ donne } x^2 + y^2 = \sqrt{a^2 + b^2}
$$

:::exemple
Racines carrées de $Z = 3 + 4i$ : $x^2 - y^2 = 3$, $x^2 + y^2 = 5$ et $2xy = 4$. Donc $x^2 = 4$, $y^2 = 1$, et $xy > 0$ : $\delta = 2 + i$ ou $\delta = -2 - i$.
:::

## Équations du second degré à coefficients complexes

:::theoreme
Soit $az^2 + bz + c = 0$ avec $a$, $b$, $c$ complexes et $a \neq 0$, et $\Delta = b^2 - 4ac$.

- Si $\Delta = 0$, l’équation a une solution double $-\frac{b}{2a}$.
- Si $\Delta \neq 0$ et si $\delta$ est une racine carrée de $\Delta$, les solutions sont $\frac{-b - \delta}{2a}$ et $\frac{-b + \delta}{2a}$.
:::

:::exemple
$z^2 - (3 + 2i)z + 5 + i = 0$ : $\Delta = (3 + 2i)^2 - 4(5 + i) = 9 + 12i - 4 - 20 - 4i = -15 + 8i$. On cherche $\delta = x + iy$ : $x^2 - y^2 = -15$, $x^2 + y^2 = \sqrt{225 + 64} = 17$, $2xy = 8$, donc $x^2 = 1$, $y^2 = 16$ et $\delta = 1 + 4i$. Les solutions sont $\frac{3 + 2i - 1 - 4i}{2} = 1 - i$ et $\frac{3 + 2i + 1 + 4i}{2} = 2 + 3i$.
:::

## Racines n-ièmes de l’unité

:::theoreme
Soit $n \geq 2$. L’équation $z^n = 1$ a exactement $n$ solutions dans $\mathbb{C}$, les **racines n-ièmes de l’unité** :

$$
\omega_k = e^{\frac{2ik\pi}{n}}, \qquad k \in \{0, 1, \ldots, n - 1\}
$$

Leurs images sont les sommets d’un polygone régulier à $n$ côtés inscrit dans le cercle de centre $O$ et de rayon $1$. Leur somme est nulle.
:::

:::exemple
Pour $n = 3$ : $1$, $j = e^{\frac{2i\pi}{3}} = -\frac{1}{2} + i\frac{\sqrt{3}}{2}$ et $j^2 = \bar{j}$. On a $1 + j + j^2 = 0$ et $j^3 = 1$.
:::

:::propriete
Plus généralement, si $a = re^{i\theta}$ ($r > 0$), les solutions de $z^n = a$ sont les $n$ nombres $\sqrt[n]{r}\,e^{i\left(\frac{\theta}{n} + \frac{2k\pi}{n}\right)}$, $k \in \{0, \ldots, n - 1\}$.
:::

:::exemple
$z^3 = 8i$ : $8i = 8e^{i\frac{\pi}{2}}$, donc $z = 2e^{i\left(\frac{\pi}{6} + \frac{2k\pi}{3}\right)}$, soit $2e^{i\frac{\pi}{6}} = \sqrt{3} + i$, $2e^{i\frac{5\pi}{6}} = -\sqrt{3} + i$ et $2e^{i\frac{3\pi}{2}} = -2i$.
:::
