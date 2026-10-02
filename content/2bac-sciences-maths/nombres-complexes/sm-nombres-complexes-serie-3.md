---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux problèmes comme à l’examen national : quotient de deux complexes sous deux formes et triangle isocèle, puis ensembles de points définis par un quotient, avec les corrigés.
position: 30
visibility: enrolled
---

Deux problèmes qui mêlent calcul et géométrie, comme l’exercice sur les nombres complexes de l’examen.

:::exercice Problème 1 : un quotient sous deux formes
On considère $z_1 = \sqrt{3} + i$ et $z_2 = 1 + i\sqrt{3}$, d’images $A$ et $B$ dans le plan complexe.

1. Écrire $z_1$ et $z_2$ sous forme trigonométrique.
2. Calculer $z_1 z_2$ sous forme algébrique, puis vérifier le résultat avec les formes trigonométriques.
3. Soit $Z = \dfrac{z_1}{z_2}$. Écrire $Z$ sous forme trigonométrique, puis sous forme algébrique.
4. En déduire la nature du triangle $OAB$ et une mesure de l’angle $\left(\overrightarrow{OB}, \overrightarrow{OA}\right)$.
5. Déterminer le plus petit entier $n \geq 1$ tel que $Z^n$ soit réel, puis calculer $Z^{12}$.

:::corrige
1. $|z_1| = 2$, $\cos\theta_1 = \frac{\sqrt{3}}{2}$, $\sin\theta_1 = \frac{1}{2}$ : $z_1 = \left[2, \frac{\pi}{6}\right]$. De même $z_2 = \left[2, \frac{\pi}{3}\right]$.
2. $z_1 z_2 = \sqrt{3} + 3i + i + i^2\sqrt{3} = 4i$. Avec les formes trigonométriques : $\left[4, \frac{\pi}{6} + \frac{\pi}{3}\right] = \left[4, \frac{\pi}{2}\right] = 4i$.
3. $Z = \left[1, \frac{\pi}{6} - \frac{\pi}{3}\right] = \left[1, -\frac{\pi}{6}\right]$. Sous forme algébrique : $Z = \frac{(\sqrt{3} + i)(1 - i\sqrt{3})}{4} = \frac{2\sqrt{3} - 2i}{4} = \frac{\sqrt{3}}{2} - \frac{1}{2}i$, ce qui est bien $\cos\left(-\frac{\pi}{6}\right) + i\sin\left(-\frac{\pi}{6}\right)$.
4. $|Z| = 1$, donc $OA = OB$ : le triangle $OAB$ est isocèle en $O$. Et $\left(\overrightarrow{OB}, \overrightarrow{OA}\right) \equiv \arg\frac{z_1}{z_2} \equiv -\frac{\pi}{6}$ $[2\pi]$.
5. $Z^n = \left[1, -\frac{n\pi}{6}\right]$ est réel si et seulement si $\frac{n\pi}{6} \equiv 0$ $[\pi]$, c’est-à-dire si $n$ est un multiple de $6$. Le plus petit est $n = 6$ ($Z^6 = -1$). Puis $Z^{12} = \left(Z^6\right)^2 = 1$.
:::
:::

:::exercice Problème 2 : ensembles de points
On considère les points $A(-1)$ et $B(1)$, et pour $z \neq -1$, on pose $Z = \dfrac{z - 1}{z + 1}$.

1. On écrit $z = x + iy$ avec $x$, $y$ réels. Montrer que $Z = \dfrac{x^2 + y^2 - 1 + 2iy}{(x + 1)^2 + y^2}$.
2. Déterminer l’ensemble $(E)$ des points $M(z)$ tels que $Z$ soit réel.
3. Déterminer l’ensemble $(F)$ des points $M(z)$ tels que $Z$ soit imaginaire pur.
4. Retrouver le résultat de la question 3 par un raisonnement géométrique.

:::corrige
1. $Z = \frac{(z - 1)\left(\bar{z} + 1\right)}{(z + 1)\left(\bar{z} + 1\right)} = \frac{z\bar{z} + z - \bar{z} - 1}{|z + 1|^2}$. Avec $z\bar{z} = x^2 + y^2$, $z - \bar{z} = 2iy$ et $|z + 1|^2 = (x + 1)^2 + y^2$, on obtient l’expression demandée.
2. $Z$ est réel si et seulement si $y = 0$ : $(E)$ est l’axe des abscisses privé du point $A$.
3. $Z$ est imaginaire pur si et seulement si $x^2 + y^2 = 1$ : $(F)$ est le cercle de centre $O$ et de rayon $1$, privé du point $A$.
4. Pour $M$ distinct de $A$ et $B$, $Z$ est imaginaire pur si et seulement si $\left(\overrightarrow{MA}, \overrightarrow{MB}\right) \equiv \frac{\pi}{2}$ $[\pi]$, c’est-à-dire si le triangle $AMB$ est rectangle en $M$ : $M$ est sur le cercle de diamètre $[AB]$, de centre $O$ et de rayon $1$. Le point $B$ ($Z = 0$) y est aussi.
:::
:::
