---
title: Devoir surveillé : dénombrement
kind: devoir
summary: Un devoir d’une heure sur 20 points : cardinaux, principe multiplicatif, factorielles, arrangements, combinaisons et un tirage dans une urne, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : ensembles et choix
1. Dans une classe de $40$ élèves, $25$ étudient l’anglais, $20$ l’espagnol, et $8$ les deux langues. Combien étudient au moins une des deux langues ? Combien n’en étudient aucune ? (3 pts)
2. Un menu comprend une entrée parmi $4$, un plat parmi $5$ et un dessert parmi $3$. Combien de menus différents ? (3 pts)

:::corrige
1. $25 + 20 - 8 = 37$ élèves ; aucune : $40 - 37 = 3$.
2. $4 \times 5 \times 3 = 60$ menus.
:::
:::

:::exercice Exercice 2 (8 points) : calculs
Calculer, en justifiant (2 pts chacun) :

1. $6!$
2. $A_7^3$
3. $C_7^3$
4. le nombre d’anagrammes du mot « LIVRE »

:::corrige
1. $720$.
2. $7 \times 6 \times 5 = 210$.
3. $\frac{210}{3!} = \frac{210}{6} = 35$.
4. Cinq lettres différentes : $5! = 120$.
:::
:::

:::exercice Exercice 3 (6 points) : une urne
Une urne contient $4$ boules blanches et $6$ boules noires. On tire simultanément $3$ boules.

1. Combien de tirages sont possibles ? (2 pts)
2. Combien de tirages contiennent exactement une boule blanche ? (2 pts)
3. Combien contiennent au moins une boule blanche ? (2 pts)

:::corrige
1. $C_{10}^3 = 120$.
2. $C_4^1 \times C_6^2 = 4 \times 15 = 60$.
3. Tirages sans boule blanche : $C_6^3 = 20$. Donc $120 - 20 = 100$.
:::
:::
