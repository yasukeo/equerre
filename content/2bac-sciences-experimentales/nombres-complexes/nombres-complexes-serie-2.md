---
title: Série 1 — partie 2 : module, argument, forme trigonométrique
kind: serie
summary: Module et argument, forme trigonométrique, formule de Moivre, produit et quotient, ensembles de points et nature d’un triangle, avec les corrigés.
position: 20
visibility: enrolled
---

Cinq exercices sur la deuxième partie du cours.

:::exercice Module, argument, forme trigonométrique
Soit $z = -1 + i$.

1. Calculer le module et un argument de $z$, et écrire $z$ sous forme trigonométrique.
2. En déduire $z^8$.

:::corrige
1. $|z| = \sqrt{1 + 1} = \sqrt{2}$. $\cos\theta = -\frac{1}{\sqrt{2}} = -\frac{\sqrt{2}}{2}$ et $\sin\theta = \frac{\sqrt{2}}{2}$, donc $\theta = \frac{3\pi}{4}$ et $z = \sqrt{2}\left(\cos\frac{3\pi}{4} + i\sin\frac{3\pi}{4}\right)$.
2. Par la formule de Moivre, $z^8 = \left(\sqrt{2}\right)^8 \left(\cos(6\pi) + i\sin(6\pi)\right) = 16$.
:::
:::

:::exercice Ensembles de points
Déterminer et représenter l’ensemble des points $M$ d’affixe $z$ tels que :

1. $|z - 2 + i| = 3$ ;
2. $|z + 1| = |z - 3i|$ ;
3. $|\bar{z} - i| = 1$.

:::corrige
1. $|z - (2 - i)| = 3$ : cercle de centre $\Omega(2 - i)$ et de rayon $3$.
2. $|z - (-1)| = |z - 3i|$ : médiatrice du segment $[AB]$ avec $A(-1)$ et $B(3i)$.
3. $|\bar{z} - i| = \left|\overline{z + i}\right| = |z + i|$ : cercle de centre le point d’affixe $-i$ et de rayon $1$.
:::
:::

:::exercice Formule de Moivre
1. Écrire $z = \sqrt{3} + i$ sous forme trigonométrique.
2. Calculer $z^6$ et $z^{12}$.
3. À l’aide de la formule de Moivre pour $n = 2$, retrouver les formules de $\cos 2\theta$ et $\sin 2\theta$.

:::corrige
1. $|z| = 2$, $\cos\theta = \frac{\sqrt{3}}{2}$, $\sin\theta = \frac{1}{2}$ : $z = 2\left(\cos\frac{\pi}{6} + i\sin\frac{\pi}{6}\right)$.
2. $z^6 = 64\left(\cos\pi + i\sin\pi\right) = -64$ et $z^{12} = \left(z^6\right)^2 = 4096$.
3. $(\cos\theta + i\sin\theta)^2 = \cos^2\theta - \sin^2\theta + 2i\sin\theta\cos\theta = \cos 2\theta + i\sin 2\theta$ ; en identifiant : $\cos 2\theta = \cos^2\theta - \sin^2\theta$ et $\sin 2\theta = 2\sin\theta\cos\theta$.
:::
:::

:::exercice Produit et quotient sous forme trigonométrique
Soit $a = 1 + i$ et $b = 1 - i\sqrt{3}$.

1. Écrire $a$ et $b$ sous forme trigonométrique.
2. En déduire une forme trigonométrique de $ab$ et de $\frac{a}{b}$.
3. Écrire $\frac{a}{b}$ sous forme algébrique et en déduire $\cos\frac{7\pi}{12}$.

:::corrige
1. $a = \sqrt{2}\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right)$ et $b = 2\left(\cos\left(-\frac{\pi}{3}\right) + i\sin\left(-\frac{\pi}{3}\right)\right)$.
2. $ab = \left[2\sqrt{2}, \frac{\pi}{4} - \frac{\pi}{3}\right] = \left[2\sqrt{2}, -\frac{\pi}{12}\right]$ et $\frac{a}{b} = \left[\frac{\sqrt{2}}{2}, \frac{\pi}{4} + \frac{\pi}{3}\right] = \left[\frac{\sqrt{2}}{2}, \frac{7\pi}{12}\right]$.
3. $\frac{a}{b} = \frac{(1 + i)(1 + i\sqrt{3})}{4} = \frac{1 - \sqrt{3} + i\left(1 + \sqrt{3}\right)}{4}$. En identifiant les parties réelles : $\frac{\sqrt{2}}{2}\cos\frac{7\pi}{12} = \frac{1 - \sqrt{3}}{4}$, donc $\cos\frac{7\pi}{12} = \frac{1 - \sqrt{3}}{2\sqrt{2}} = \frac{\sqrt{2} - \sqrt{6}}{4}$.
:::
:::

:::exercice Interprétation géométrique
Dans le plan complexe, on considère les points $A$, $B$ et $C$ d’affixes $z_A = 1 + i$, $z_B = 3 + 2i$ et $z_C = 3i$.

1. Calculer $Z = \dfrac{z_C - z_A}{z_B - z_A}$ sous forme algébrique.
2. En déduire la nature du triangle $ABC$.

:::corrige
1. $z_C - z_A = -1 + 2i$ et $z_B - z_A = 2 + i$, donc $Z = \dfrac{(-1 + 2i)(2 - i)}{(2 + i)(2 - i)} = \dfrac{-2 + i + 4i - 2i^2}{5} = \dfrac{5i}{5} = i$.
2. $|Z| = 1$, donc $AC = AB$ ; et $\arg Z \equiv \frac{\pi}{2}$ $[2\pi]$, donc $\left(\overrightarrow{AB}, \overrightarrow{AC}\right) \equiv \frac{\pi}{2}$ $[2\pi]$. Le triangle $ABC$ est rectangle et isocèle en $A$.
:::
:::
