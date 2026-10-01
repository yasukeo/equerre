---
title: Devoir surveillé : nombres complexes (1re partie)
kind: devoir
summary: Un devoir d’une heure sur 20 points : forme algébrique, forme trigonométrique et formule de Moivre, triangle rectangle isocèle et carré, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice non autorisée.

:::exercice Exercice 1 (6 points) : forme algébrique
Écrire sous forme algébrique :

1. $(1 - 2i)^2$ (2 pts)
2. $\dfrac{3 + i}{1 + 2i}$ (2 pts)
3. $i^{103}$ (2 pts)

:::corrige
1. $1 - 4i + 4i^2 = -3 - 4i$.
2. $\frac{(3 + i)(1 - 2i)}{(1 + 2i)(1 - 2i)} = \frac{3 - 6i + i - 2i^2}{5} = \frac{5 - 5i}{5} = 1 - i$.
3. $103 = 4 \times 25 + 3$, donc $i^{103} = i^3 = -i$.
:::
:::

:::exercice Exercice 2 (6 points) : forme trigonométrique
Soit $z = 1 - i$.

1. Calculer le module et un argument de $z$. (2 pts)
2. Écrire $z$ sous forme trigonométrique. (1 pt)
3. Calculer $z^{10}$ sous forme algébrique. (3 pts)

:::corrige
1. $|z| = \sqrt{2}$ ; $\cos\theta = \frac{\sqrt{2}}{2}$ et $\sin\theta = -\frac{\sqrt{2}}{2}$, donc $\arg z \equiv -\frac{\pi}{4}$ $[2\pi]$.
2. $z = \sqrt{2}\left(\cos\left(-\frac{\pi}{4}\right) + i\sin\left(-\frac{\pi}{4}\right)\right)$.
3. $z^{10} = \left(\sqrt{2}\right)^{10}\left(\cos\left(-\frac{10\pi}{4}\right) + i\sin\left(-\frac{10\pi}{4}\right)\right) = 32\left(\cos\left(-\frac{\pi}{2}\right) + i\sin\left(-\frac{\pi}{2}\right)\right) = -32i$, car $-\frac{10\pi}{4} = -\frac{5\pi}{2} \equiv -\frac{\pi}{2}$ $[2\pi]$.
:::
:::

:::exercice Exercice 3 (8 points) : géométrie
On considère les points $A(2 + i)$, $B(4 + 3i)$ et $C(4 - i)$.

1. Calculer $\dfrac{z_C - z_A}{z_B - z_A}$ sous forme algébrique. (2,5 pts)
2. En déduire la nature du triangle $ABC$. (2 pts)
3. Déterminer l’affixe du point $D$ tel que $ABDC$ soit un parallélogramme, et préciser la nature de $ABDC$. (2 pts)
4. Déterminer l’ensemble des points $M(z)$ tels que $|z - 2 - i| = |z - 4 - 3i|$. (1,5 pt)

:::corrige
1. $z_C - z_A = 2 - 2i$ et $z_B - z_A = 2 + 2i$, donc le quotient vaut $\frac{(2 - 2i)(2 - 2i)}{(2 + 2i)(2 - 2i)} = \frac{4 - 8i + 4i^2}{8} = -i$.
2. $|-i| = 1$, donc $AC = AB$, et $\arg(-i) \equiv -\frac{\pi}{2}$ $[2\pi]$, donc $\left(\overrightarrow{AB}, \overrightarrow{AC}\right) \equiv -\frac{\pi}{2}$ $[2\pi]$ : $ABC$ est rectangle et isocèle en $A$.
3. $\overrightarrow{AB} = \overrightarrow{CD}$ donne $z_D = z_C + z_B - z_A = 6 + i$. Le parallélogramme $ABDC$ a un angle droit en $A$ et deux côtés consécutifs égaux : c’est un carré.
4. $|z - z_A| = |z - z_B|$ : c’est la médiatrice du segment $[AB]$.
:::
:::
