---
title: Nombres complexes (2e partie) : l’essentiel
kind: resume
summary: Forme exponentielle, formules d’Euler, équations du second degré dans C et écritures complexes des transformations, sur une page.
position: 10
visibility: public
---

## Forme exponentielle

:::propriete
$e^{i\theta} = \cos\theta + i\sin\theta$ ; $z = re^{i\theta}$ avec $r = |z|$ et $\theta = \arg z$.

$e^{i\theta}e^{i\theta'} = e^{i(\theta + \theta')}$, $\frac{e^{i\theta}}{e^{i\theta'}} = e^{i(\theta - \theta')}$, $\left(e^{i\theta}\right)^n = e^{in\theta}$, $\overline{e^{i\theta}} = e^{-i\theta}$, $e^{i\pi} = -1$.
:::

**Euler** : $\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}$ et $\sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}$ ; ils servent à linéariser $\cos^n\theta$ et $\sin^n\theta$.

## Équations du second degré

$az^2 + bz + c = 0$ ($a, b, c$ réels), $\Delta = b^2 - 4ac$. Si $\Delta < 0$ : $z = \frac{-b \pm i\sqrt{-\Delta}}{2a}$, deux solutions conjuguées. Toujours : $z_1 + z_2 = -\frac{b}{a}$ et $z_1 z_2 = \frac{c}{a}$.

Degré 3 : chercher une racine évidente $z_0$, factoriser par $z - z_0$, puis résoudre le second degré.

## Transformations

:::propriete
- Translation de vecteur $\vec{w}(b)$ : $z' = z + b$.
- Homothétie de centre $\Omega(\omega)$, de rapport $k$ réel : $z' - \omega = k(z - \omega)$.
- Rotation de centre $\Omega(\omega)$, d’angle $\theta$ : $z' - \omega = e^{i\theta}(z - \omega)$.
:::

**Reconnaître** $z' = az + b$ : $a = 1$, translation ; $a$ réel $\neq 1$, homothétie de rapport $a$ ; $|a| = 1$, $a \neq 1$, rotation d’angle $\arg a$. Le centre est le point fixe $\omega = \frac{b}{1 - a}$.

:::attention
Une homothétie de rapport $k$ multiplie les longueurs par $|k|$ ; une rotation et une translation les conservent.
:::
