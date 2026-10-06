---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : comparer deux classes avec moyenne, médiane et écart-type, puis retrouver des effectifs manquants à partir de la moyenne et étudier l’effet d’une même hausse de toutes les valeurs, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : deux classes
Voici les notes d’un devoir dans deux classes de $20$ élèves.

- Classe A : $6$ (×$2$), $8$ (×$3$), $10$ (×$5$), $12$ (×$5$), $14$ (×$3$), $16$ (×$2$).
- Classe B : $10$ (×$8$), $11$ (×$6$), $12$ (×$6$).

1. Calculer la moyenne de chaque classe.
2. Calculer la médiane de chaque classe.
3. Calculer l’écart-type de chaque classe.
4. Comparer les deux classes.

:::corrige
1. A : $\frac{12 + 24 + 50 + 60 + 42 + 32}{20} = \frac{220}{20} = 11$. B : $\frac{80 + 66 + 72}{20} = \frac{218}{20} = 10{,}9$.
2. A : effectifs cumulés $2$, $5$, $10$, $15$… : rang $10$ vaut $10$, rang $11$ vaut $12$, donc $Me = 11$. B : cumulés $8$, $14$… : rangs $10$ et $11$ valent $11$, donc $Me = 11$.
3. A : $\frac{2 \times 36 + 3 \times 64 + 5 \times 100 + 5 \times 144 + 3 \times 196 + 2 \times 256}{20} = \frac{72 + 192 + 500 + 720 + 588 + 512}{20} = \frac{2\,584}{20} = 129{,}2$, donc $V = 129{,}2 - 121 = 8{,}2$ et $\sigma \approx 2{,}86$. B : $\frac{8 \times 100 + 6 \times 121 + 6 \times 144}{20} = \frac{800 + 726 + 864}{20} = \frac{2\,390}{20} = 119{,}5$, donc $V = 119{,}5 - 118{,}81 = 0{,}69$ et $\sigma \approx 0{,}83$.
4. Moyennes et médianes presque égales, mais la classe B est beaucoup plus homogène : son écart-type est plus de trois fois plus petit.
:::
:::

:::exercice Problème 2 : une valeur manquante
Dans une entreprise, on relève le nombre de jours d’absence de $25$ employés sur un mois : $0$ jour : $8$ employés ; $1$ jour : $a$ employés ; $2$ jours : $5$ ; $3$ jours : $b$ ; $4$ jours : $2$. La moyenne est de $1{,}44$ jour.

1. Montrer que $a + b = 10$ et $a + 3b = 18$.
2. En déduire $a$ et $b$.
3. Déterminer la médiane.
4. Le mois suivant, chaque employé a exactement un jour d’absence de plus. Que deviennent la moyenne, la médiane et l’écart-type ?

:::corrige
1. Effectif : $8 + a + 5 + b + 2 = 25$, donc $a + b = 10$. Somme des valeurs : $0 \times 8 + 1 \times a + 2 \times 5 + 3 \times b + 4 \times 2 = a + 3b + 18$, et elle vaut $1{,}44 \times 25 = 36$ : donc $a + 3b = 18$.
2. En soustrayant : $2b = 8$, donc $b = 4$ et $a = 6$.
3. $N = 25$ : la médiane est la valeur de rang $13$. Les effectifs cumulés sont $8$, $14$, $19$, $23$, $25$ : le rang $13$ correspond à $1$ jour. $Me = 1$.
4. Toutes les valeurs augmentent de $1$ : la moyenne devient $2{,}44$ et la médiane $2$. Les écarts à la moyenne ne changent pas, donc l’écart-type reste le même.
:::
:::
