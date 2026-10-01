---
title: Série 1 — partie 1 : forme exponentielle et équations
kind: serie
summary: Forme exponentielle, puissances, équations du second degré dans C, polynôme de degré 3, linéarisation avec les formules d’Euler, avec les corrigés.
position: 10
visibility: public
---

Cinq exercices sur la première partie du cours.

:::exercice Forme exponentielle
Soit $a = 1 + i\sqrt{3}$ et $b = \sqrt{3} - i$.

1. Écrire $a$ et $b$ sous forme exponentielle.
2. En déduire la forme exponentielle de $a b$ et de $\dfrac{a}{b}$.

:::corrige
1. $|a| = 2$ et $a = 2\left(\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) = 2e^{i\frac{\pi}{3}}$. $|b| = 2$ et $b = 2\left(\frac{\sqrt{3}}{2} - \frac{1}{2}i\right) = 2e^{-i\frac{\pi}{6}}$.
2. $ab = 4e^{i\left(\frac{\pi}{3} - \frac{\pi}{6}\right)} = 4e^{i\frac{\pi}{6}}$ et $\dfrac{a}{b} = e^{i\left(\frac{\pi}{3} + \frac{\pi}{6}\right)} = e^{i\frac{\pi}{2}} = i$.
:::
:::

:::exercice Équation du second degré
Résoudre dans $\mathbb{C}$ l’équation $z^2 - 4z + 13 = 0$, puis placer les images des solutions dans le plan complexe.

:::corrige
$\Delta = 16 - 52 = -36 = (6i)^2$, donc $z_1 = \frac{4 - 6i}{2} = 2 - 3i$ et $z_2 = 2 + 3i$. Les deux solutions sont conjuguées : leurs images $M_1(2 ; -3)$ et $M_2(2 ; 3)$ sont symétriques par rapport à l’axe des abscisses. On vérifie : $z_1 + z_2 = 4$ et $z_1 z_2 = 4 + 9 = 13$.
:::
:::

:::exercice Puissances sous forme exponentielle
1. Écrire $1 + i$ et $-1 + i\sqrt{3}$ sous forme exponentielle.
2. Calculer $(1 + i)^8$ et $\left(-1 + i\sqrt{3}\right)^6$.
3. Montrer que $\left(1 + i\right)^{4} + 4 = 0$.

:::corrige
1. $1 + i = \sqrt{2}e^{i\frac{\pi}{4}}$ et $-1 + i\sqrt{3} = 2\left(-\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) = 2e^{i\frac{2\pi}{3}}$.
2. $(1 + i)^8 = 16e^{2i\pi} = 16$ et $\left(-1 + i\sqrt{3}\right)^6 = 64e^{4i\pi} = 64$.
3. $(1 + i)^4 = 4e^{i\pi} = -4$, donc $(1 + i)^4 + 4 = 0$.
:::
:::

:::exercice Un polynôme de degré 3
Soit $P(z) = z^3 - 2z^2 + 9z - 18$.

1. Calculer $P(2)$.
2. Déterminer les réels $a$ et $b$ tels que $P(z) = (z - 2)\left(z^2 + az + b\right)$.
3. Résoudre dans $\mathbb{C}$ l’équation $P(z) = 0$.

:::corrige
1. $P(2) = 8 - 8 + 18 - 18 = 0$.
2. $(z - 2)(z^2 + az + b) = z^3 + (a - 2)z^2 + (b - 2a)z - 2b$. En identifiant : $a - 2 = -2$, $b - 2a = 9$, $-2b = -18$, donc $a = 0$ et $b = 9$.
3. $P(z) = (z - 2)(z^2 + 9) = 0 \iff z = 2$ ou $z^2 = -9 = (3i)^2$, soit $z = 3i$ ou $z = -3i$. $S = \{2 ; 3i ; -3i\}$.
:::
:::

:::exercice Linéariser avec Euler
1. Montrer que pour tout réel $\theta$, $\cos^3\theta = \dfrac{\cos 3\theta + 3\cos\theta}{4}$.
2. En déduire une primitive de $x \mapsto \cos^3 x$.

:::corrige
1. $\cos^3\theta = \left(\frac{e^{i\theta} + e^{-i\theta}}{2}\right)^3 = \frac{e^{3i\theta} + 3e^{i\theta} + 3e^{-i\theta} + e^{-3i\theta}}{8} = \frac{2\cos 3\theta + 6\cos\theta}{8} = \frac{\cos 3\theta + 3\cos\theta}{4}$.
2. Une primitive est $x \mapsto \frac{\sin 3x}{12} + \frac{3\sin x}{4}$.
:::
:::
