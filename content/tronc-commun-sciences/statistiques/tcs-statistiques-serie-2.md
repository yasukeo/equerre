---
title: Série 1 — partie 2 : paramètres de position et de dispersion
kind: serie
summary: Mode, moyenne et médiane d’une série discrète, moyenne d’une série en classes, variance et écart-type, effet d’une valeur extrême, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Une série discrète
On reprend les $40$ familles de la partie 1 : $0$ enfant : $4$ ; $1$ : $10$ ; $2$ : $14$ ; $3$ : $8$ ; $4$ : $4$.

1. Donner le mode et l’étendue.
2. Calculer le nombre moyen d’enfants par famille.
3. Déterminer la médiane.

:::corrige
1. Mode $2$ ; étendue $4$.
2. $\frac{0 + 10 + 28 + 24 + 16}{40} = \frac{78}{40} = 1{,}95$.
3. $N = 40$ : rangs $20$ et $21$. Les effectifs cumulés sont $4$, $14$, $28$… : ces deux rangs correspondent à la valeur $2$. $Me = 2$.
:::
:::

:::exercice Variance et écart-type
Avec la même série :

1. Calculer $\frac{\sum n_ix_i^2}{N}$.
2. En déduire la variance et l’écart-type.

:::corrige
1. $\frac{4 \times 0 + 10 \times 1 + 14 \times 4 + 8 \times 9 + 4 \times 16}{40} = \frac{0 + 10 + 56 + 72 + 64}{40} = \frac{202}{40} = 5{,}05$.
2. $V = 5{,}05 - 1{,}95^2 = 5{,}05 - 3{,}8025 = 1{,}2475$ et $\sigma \approx 1{,}12$.
:::
:::

:::exercice Une série en classes
Temps de trajet de $25$ élèves, en minutes : $[0 ; 10[$ : $5$ ; $[10 ; 20[$ : $9$ ; $[20 ; 30[$ : $7$ ; $[30 ; 40[$ : $4$.

1. Donner la classe modale.
2. Calculer le temps moyen.
3. Dans quelle classe se trouve la médiane ? L’estimer par interpolation linéaire.

:::corrige
1. $[10 ; 20[$.
2. Avec les centres : $\frac{5 \times 5 + 9 \times 15 + 7 \times 25 + 4 \times 35}{25} = \frac{25 + 135 + 175 + 140}{25} = \frac{475}{25} = 19$ minutes.
3. Effectifs cumulés : $5$, $14$, $21$, $25$. Le rang $12{,}5$ est dans $[10 ; 20[$ : $Me \approx 10 + 10 \times \frac{12{,}5 - 5}{9} \approx 18{,}3$ minutes.
:::
:::

:::exercice Une valeur extrême
Cinq élèves ont eu les notes $11$, $12$, $13$, $14$ et $15$.

1. Calculer la moyenne et la médiane.
2. On remplace la note $15$ par une note de $0$ saisie par erreur. Que deviennent la moyenne et la médiane ?

:::corrige
1. Moyenne $\frac{65}{5} = 13$ ; médiane $13$.
2. Notes rangées : $0$, $11$, $12$, $13$, $14$. Moyenne $\frac{50}{5} = 10$ ; médiane $12$. La moyenne baisse de $3$ points, la médiane d’un seul.
:::
:::
