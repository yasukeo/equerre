---
title: Série 1 : nombres complexes (2e partie)
kind: serie
summary: Forme exponentielle, équation du second degré, rotation et nature d’un quadrilatère, avec les corrigés.
position: 10
visibility: public
---

Deux exercices sur la notation exponentielle et les transformations.

:::exercice Forme exponentielle
Soit $a = 1 + i\sqrt{3}$ et $b = \sqrt{3} - i$.

1. Écrire $a$ et $b$ sous forme exponentielle.
2. En déduire la forme exponentielle de $a b$ et de $\dfrac{a}{b}$.

:::corrige
1. $|a| = 2$ et $a = 2\left(\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) = 2e^{i\frac{\pi}{3}}$. $|b| = 2$ et $b = 2\left(\frac{\sqrt{3}}{2} - \frac{1}{2}i\right) = 2e^{-i\frac{\pi}{6}}$.
2. $ab = 4e^{i\left(\frac{\pi}{3} - \frac{\pi}{6}\right)} = 4e^{i\frac{\pi}{6}}$ et $\dfrac{a}{b} = e^{i\left(\frac{\pi}{3} + \frac{\pi}{6}\right)} = e^{i\frac{\pi}{2}} = i$.
:::
:::

:::exercice Rotation
Dans le plan complexe, on considère $A(2)$, $\Omega(1 + i)$ et la rotation $R$ de centre $\Omega$ et d’angle $\frac{\pi}{2}$.

1. Donner l’écriture complexe de $R$.
2. Déterminer l’affixe de $B = R(A)$.
3. Montrer que le triangle $\Omega AB$ est rectangle isocèle en $\Omega$.

:::corrige
1. $z' - (1 + i) = e^{i\frac{\pi}{2}}\left(z - (1 + i)\right) = i\left(z - 1 - i\right)$, soit $z' = iz + 2$.
2. $z_B = 2i + 2 = 2 + 2i$.
3. Par définition de la rotation, $\Omega B = \Omega A$ et $\left(\overrightarrow{\Omega A}, \overrightarrow{\Omega B}\right) \equiv \frac{\pi}{2}$ $[2\pi]$ : le triangle $\Omega AB$ est rectangle isocèle en $\Omega$. On le vérifie : $\dfrac{z_B - z_\Omega}{z_A - z_\Omega} = \dfrac{1 + i}{1 - i} = \dfrac{(1 + i)^2}{2} = i$.
:::
:::
