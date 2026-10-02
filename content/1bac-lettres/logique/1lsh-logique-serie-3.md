---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes qui mêlent connecteurs, quantificateurs et raisonnements : des affirmations à vérifier ou à réfuter, puis une étude sur les nombres pairs et impairs, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : vrai ou faux ?
Pour chaque affirmation, dire si elle est vraie ou fausse, et le justifier par une démonstration ou par un contre-exemple.

1. « Pour tout réel $x$, si $x > 2$ alors $x^2 > 4$. »
2. « Pour tout réel $x$, si $x^2 > 4$ alors $x > 2$. »
3. « Il existe un réel $x$ tel que $x^2 = -1$. »
4. « Pour tout entier naturel $n$, $2^n > n$. » On pourra vérifier pour $n = 0, 1, 2, 3$ puis expliquer pourquoi l’écart grandit.
5. « La somme de deux nombres impairs est impaire. »

:::corrige
1. Vraie : si $x > 2 > 0$, alors $x^2 > 2x > 4$.
2. Fausse : pour $x = -3$, $x^2 = 9 > 4$ mais $x < 2$.
3. Fausse : un carré est toujours positif ou nul.
4. Vraie : $1 > 0$, $2 > 1$, $4 > 2$, $8 > 3$ ; en passant de $n$ à $n + 1$, $2^n$ est multiplié par $2$, donc augmente d’au moins $1$, alors que $n$ augmente exactement de $1$.
5. Fausse : $3 + 5 = 8$ est pair. En fait, $(2k + 1) + (2k' + 1) = 2(k + k' + 1)$ est toujours pair.
:::
:::

:::exercice Problème 2 : pairs et impairs
1. Montrer que le produit de deux nombres impairs est impair.
2. En déduire, par contraposée, que si $ab$ est pair, alors $a$ est pair ou $b$ est pair.
3. Écrire la négation de « $a$ est pair ou $b$ est pair ».
4. Montrer que pour tout entier $n$, $n^2 - n$ est pair.

:::corrige
1. $(2k + 1)(2k' + 1) = 4kk' + 2k + 2k' + 1 = 2(2kk' + k + k') + 1$ : c’est impair.
2. La contraposée de « si $ab$ est pair, alors $a$ est pair ou $b$ est pair » est « si $a$ et $b$ sont impairs, alors $ab$ est impair », ce que montre la question 1.
3. « $a$ est impair et $b$ est impair ».
4. $n^2 - n = n(n - 1)$ est le produit de deux entiers consécutifs : l’un des deux est pair, donc le produit est pair.
:::
:::
