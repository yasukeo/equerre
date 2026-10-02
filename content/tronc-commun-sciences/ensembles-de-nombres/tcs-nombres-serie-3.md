---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : un calcul avec des racines et l’irrationalité de racine de 2 démontrée par l’absurde, puis un nombre qui se simplifie grâce aux identités remarquables, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : racine de 2 est irrationnel
1. Montrer que si un entier $n$ est impair, alors $n^2$ est impair. En déduire que si $n^2$ est pair, alors $n$ est pair.
2. On suppose que $\sqrt{2} = \frac{p}{q}$, avec $p$ et $q$ entiers naturels non nuls et la fraction irréductible. Montrer que $p^2 = 2q^2$, puis que $p$ est pair.
3. En écrivant $p = 2k$, montrer que $q$ est pair. Conclure.

:::corrige
1. Si $n = 2m + 1$, alors $n^2 = 4m^2 + 4m + 1 = 2(2m^2 + 2m) + 1$ est impair. Par contraposée, si $n^2$ est pair, $n$ est pair.
2. En élevant au carré : $2 = \frac{p^2}{q^2}$, soit $p^2 = 2q^2$. Donc $p^2$ est pair, et $p$ est pair d’après la question 1.
3. $4k^2 = 2q^2$, soit $q^2 = 2k^2$ : $q^2$ est pair, donc $q$ est pair. Alors $p$ et $q$ sont tous deux divisibles par $2$, ce qui contredit le fait que $\frac{p}{q}$ est irréductible. Donc $\sqrt{2}$ n’est pas rationnel.
:::
:::

:::exercice Problème 2 : un nombre qui se simplifie
On pose $a = \sqrt{7 + 4\sqrt{3}}$ et $b = \sqrt{7 - 4\sqrt{3}}$.

1. Développer $\left(2 + \sqrt{3}\right)^2$ et $\left(2 - \sqrt{3}\right)^2$.
2. En déduire une écriture simple de $a$ et de $b$.
3. Calculer $a + b$, $a - b$ et $ab$.
4. Montrer que $\frac{1}{a} = b$.

:::corrige
1. $\left(2 + \sqrt{3}\right)^2 = 7 + 4\sqrt{3}$ et $\left(2 - \sqrt{3}\right)^2 = 7 - 4\sqrt{3}$.
2. $2 + \sqrt{3} > 0$ et $2 - \sqrt{3} > 0$ (car $\sqrt{3} < 2$), donc $a = 2 + \sqrt{3}$ et $b = 2 - \sqrt{3}$.
3. $a + b = 4$ ; $a - b = 2\sqrt{3}$ ; $ab = 4 - 3 = 1$.
4. $ab = 1$, donc $b = \frac{1}{a}$.
:::
:::
