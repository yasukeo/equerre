---
title: Série 1 — partie 2 : arrangements, permutations, combinaisons
kind: serie
summary: Calculs de factorielles, arrangements, permutations et anagrammes, combinaisons, et choix du modèle pour des tirages, avec les corrigés.
position: 20
visibility: enrolled
---

Cinq exercices sur la deuxième partie du cours.

:::exercice Factorielles
Calculer $5!$, $\dfrac{7!}{5!}$ et $\dfrac{10!}{8! \times 2!}$.

:::corrige
$5! = 120$ ; $\frac{7!}{5!} = 7 \times 6 = 42$ ; $\frac{10!}{8! \times 2!} = \frac{10 \times 9}{2} = 45$.
:::
:::

:::exercice Arrangements
1. Dix coureurs participent à une course. Combien de podiums différents sont possibles ?
2. Une association de $12$ membres élit un président, un secrétaire et un trésorier, trois personnes différentes. Combien de bureaux sont possibles ?

:::corrige
1. $A_{10}^3 = 10 \times 9 \times 8 = 720$.
2. $A_{12}^3 = 12 \times 11 \times 10 = 1\,320$.
:::
:::

:::exercice Permutations
1. Combien d’anagrammes a le mot « MAROC » ? Combien commencent par M ?
2. De combien de façons six personnes peuvent-elles s’asseoir sur un banc de six places ?

:::corrige
1. $5! = 120$ ; avec M en premier, on range les $4$ autres lettres : $4! = 24$.
2. $6! = 720$.
:::
:::

:::exercice Combinaisons
1. Huit personnes se serrent la main, chacune une fois avec chaque autre. Combien de poignées de main ?
2. De combien de façons peut-on choisir $2$ livres parmi $10$ ?
3. Combien d’équipes de $5$ joueurs peut-on former avec $12$ joueurs ?

:::corrige
1. Une poignée de main, c’est un groupe de $2$ personnes : $C_8^2 = \frac{8 \times 7}{2} = 28$.
2. $C_{10}^2 = 45$.
3. $C_{12}^5 = \frac{12 \times 11 \times 10 \times 9 \times 8}{120} = 792$.
:::
:::

:::exercice Quel modèle ?
Une urne contient $5$ boules rouges et $3$ boules vertes. On tire $2$ boules. Combien de tirages sont possibles :

1. si on les tire simultanément ?
2. si on les tire l’une après l’autre sans remise ?
3. si on les tire l’une après l’autre avec remise ?

:::corrige
1. $C_8^2 = 28$.
2. $A_8^2 = 8 \times 7 = 56$.
3. $8^2 = 64$.
:::
:::
