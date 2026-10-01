---
title: Devoir surveillé : nombres complexes (2e partie)
kind: devoir
summary: Un devoir d’une heure sur 20 points : équation du second degré, forme exponentielle et puissances, rotation et homothétie, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice non autorisée.

:::exercice Exercice 1 (5 points) : équation du second degré
1. Résoudre dans $\mathbb{C}$ l’équation $z^2 + 2z + 5 = 0$. (3 pts)
2. Vérifier que la somme et le produit des solutions valent $-2$ et $5$. (2 pts)

:::corrige
1. $\Delta = 4 - 20 = -16 = (4i)^2$ : $z_1 = -1 - 2i$ et $z_2 = -1 + 2i$.
2. $z_1 + z_2 = -2$ et $z_1 z_2 = (-1)^2 - (2i)^2 = 1 + 4 = 5$.
:::
:::

:::exercice Exercice 2 (6 points) : forme exponentielle
Soit $a = -2 + 2i$.

1. Écrire $a$ sous forme exponentielle. (2 pts)
2. Calculer $a^4$. (2 pts)
3. Écrire $\dfrac{a}{1 + i}$ sous forme exponentielle puis sous forme algébrique. (2 pts)

:::corrige
1. $|a| = 2\sqrt{2}$, et $a = 2\sqrt{2}\left(-\frac{\sqrt{2}}{2} + i\frac{\sqrt{2}}{2}\right) = 2\sqrt{2}e^{i\frac{3\pi}{4}}$.
2. $a^4 = 64e^{3i\pi} = -64$.
3. $1 + i = \sqrt{2}e^{i\frac{\pi}{4}}$, donc $\frac{a}{1 + i} = 2e^{i\frac{\pi}{2}} = 2i$.
:::
:::

:::exercice Exercice 3 (9 points) : transformations
Soit $R$ la transformation d’écriture complexe $z' = -iz + 2$.

1. Montrer que $R$ est une rotation dont on précisera l’angle et le centre $\Omega$. (3 pts)
2. Déterminer l’image $A'$ du point $A(1 + i)$. (2 pts)
3. Montrer que le triangle $\Omega AA'$ est rectangle isocèle en $\Omega$. (2 pts)
4. Soit $h$ l’homothétie de centre $\Omega$ et de rapport $2$. Donner son écriture complexe. (2 pts)

:::corrige
1. $|-i| = 1$ et $-i \neq 1$ : $R$ est la rotation d’angle $\arg(-i) = -\frac{\pi}{2}$ et de centre d’affixe $\omega = \frac{2}{1 + i} = \frac{2(1 - i)}{2} = 1 - i$.
2. $z_{A'} = -i(1 + i) + 2 = -i + 1 + 2 = 3 - i$.
3. Par définition de la rotation, $\Omega A = \Omega A'$ et $\left(\overrightarrow{\Omega A}, \overrightarrow{\Omega A'}\right) \equiv -\frac{\pi}{2}$ $[2\pi]$. On le vérifie : $\frac{z_{A'} - \omega}{z_A - \omega} = \frac{2}{2i} = -i$.
4. $z' - (1 - i) = 2\left(z - (1 - i)\right)$, soit $z' = 2z - 1 + i$.
:::
:::
