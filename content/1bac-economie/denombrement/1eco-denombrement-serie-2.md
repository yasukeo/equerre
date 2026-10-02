---
title: Série 1 — partie 2 : arrangements, permutations, combinaisons
kind: serie
summary: Arrangements et permutations, anagrammes, combinaisons et tirages, relation de Pascal, comités, avec les corrigés.
position: 20
visibility: enrolled
---

Cinq exercices sur la deuxième partie du cours.

:::exercice Arrangements et permutations
1. De combien de façons $8$ coureurs peuvent-ils occuper les $3$ marches d’un podium ?
2. De combien de façons peut-on asseoir $5$ personnes sur un banc de $5$ places ? Et si deux d’entre elles veulent être côte à côte ?

:::corrige
1. $A_8^3 = 336$.
2. $5! = 120$. Si deux sont côte à côte : on les regroupe en un bloc (2 ordres internes), et on range $4$ objets : $2 \times 4! = 48$.
:::
:::

:::exercice Anagrammes
Combien d’anagrammes ont les mots CASA, MAROC et BACCALAUREAT ?

:::corrige
CASA : $\frac{4!}{2!} = 12$. MAROC : $5! = 120$. BACCALAUREAT ($12$ lettres : A quatre fois, C deux fois) : $\frac{12!}{4! \times 2!} = 9\,979\,200$.
:::
:::

:::exercice Combinaisons
Un club de $12$ personnes, dont $5$ femmes, forme un comité de $4$ personnes.

1. Combien de comités possibles ?
2. Combien comprennent exactement $2$ femmes ?
3. Combien comprennent au moins une femme ?

:::corrige
1. $C_{12}^4 = 495$.
2. $C_5^2 \times C_7^2 = 10 \times 21 = 210$.
3. $495 - C_7^4 = 495 - 35 = 460$.
:::
:::

:::exercice Relation de Pascal
1. Écrire les lignes $0$ à $6$ du triangle de Pascal.
2. Démontrer, par le calcul, que $C_n^p + C_n^{p + 1} = C_{n + 1}^{p + 1}$.

:::corrige
1. $1$ ; $1, 1$ ; $1, 2, 1$ ; $1, 3, 3, 1$ ; $1, 4, 6, 4, 1$ ; $1, 5, 10, 10, 5, 1$ ; $1, 6, 15, 20, 15, 6, 1$.
2. $\frac{n!}{p!(n - p)!} + \frac{n!}{(p + 1)!(n - p - 1)!} = \frac{n!\left[(p + 1) + (n - p)\right]}{(p + 1)!(n - p)!} = \frac{(n + 1)!}{(p + 1)!(n - p)!} = C_{n + 1}^{p + 1}$.
:::
:::

:::exercice Comités
Une classe de $20$ élèves, $12$ filles et $8$ garçons, choisit des délégués.

1. Combien de comités de $3$ élèves peut-on former ?
2. Combien de ces comités comptent exactement $2$ filles ?
3. Combien comptent au moins un garçon ?
4. Combien de façons d’élire un président, un trésorier et un secrétaire, trois élèves différents ?

:::corrige
1. $C_{20}^3 = \frac{20 \times 19 \times 18}{6} = 1\,140$.
2. $C_{12}^2 \times C_8^1 = 66 \times 8 = 528$.
3. Par le complémentaire : $1\,140 - C_{12}^3 = 1\,140 - 220 = 920$.
4. L’ordre compte (les rôles sont différents) : $A_{20}^3 = 20 \times 19 \times 18 = 6\,840$.
:::
:::
