---
title: Série 1 — partie 1 : dénombrement et probabilités
kind: serie
summary: Choisir entre arrangements, combinaisons et listes, tirages simultanés et successifs, réunion et événement contraire, propriétés des combinaisons, avec les corrigés.
position: 10
visibility: public
---

Cinq exercices sur la première partie du cours.

:::exercice Tirage simultané
Une urne contient $4$ boules blanches et $6$ boules noires. On tire simultanément $3$ boules.

1. Combien y a-t-il de tirages possibles ?
2. Calculer la probabilité des événements $A$ : « les trois boules sont noires » et $B$ : « au moins une boule est blanche ».
3. Calculer la probabilité de $C$ : « exactement deux boules sont blanches ».

:::corrige
1. $C_{10}^3 = \dfrac{10 \times 9 \times 8}{3 \times 2 \times 1} = 120$.
2. $p(A) = \dfrac{C_6^3}{120} = \dfrac{20}{120} = \dfrac{1}{6}$, et $B = \bar{A}$, donc $p(B) = 1 - \dfrac{1}{6} = \dfrac{5}{6}$.
3. $p(C) = \dfrac{C_4^2 \times C_6^1}{120} = \dfrac{6 \times 6}{120} = \dfrac{3}{10}$.
:::
:::

:::exercice Choisir le bon dénombrement
1. Combien de codes de $4$ chiffres peut-on former ? Combien n’ont que des chiffres distincts ?
2. Un club de $12$ membres choisit un président, un trésorier et un secrétaire, tous différents. Combien de bureaux possibles ?
3. Combien de façons de choisir $5$ cartes parmi $32$ ?
4. Combien d’anagrammes a le mot RABAT ?

:::corrige
1. $10^4 = 10\,000$ codes, dont $A_{10}^4 = 10 \times 9 \times 8 \times 7 = 5040$ à chiffres distincts.
2. L’ordre compte (postes différents), sans répétition : $A_{12}^3 = 12 \times 11 \times 10 = 1320$.
3. L’ordre ne compte pas : $C_{32}^5 = \frac{32 \times 31 \times 30 \times 29 \times 28}{120} = 201\,376$.
4. Cinq lettres dont deux A identiques : $\frac{5!}{2!} = 60$ anagrammes.
:::
:::

:::exercice Tirages successifs
Une urne contient $3$ boules rouges et $2$ boules vertes. On tire successivement $2$ boules.

1. Sans remise : combien de tirages ? Quelle est la probabilité de tirer deux boules de même couleur ?
2. Avec remise : mêmes questions.

:::corrige
1. $A_5^2 = 20$ tirages. Deux rouges : $A_3^2 = 6$ ; deux vertes : $A_2^2 = 2$. Probabilité : $\frac{6 + 2}{20} = \frac{2}{5}$.
2. $5^2 = 25$ tirages. Deux rouges : $3^2 = 9$ ; deux vertes : $2^2 = 4$. Probabilité : $\frac{13}{25}$.
:::
:::

:::exercice Réunion et contraire
On lance deux dés équilibrés. On note $A$ : « la somme vaut $7$ » et $B$ : « au moins un des dés donne $6$ ».

1. Calculer $p(A)$ et $p(B)$.
2. Calculer $p(A \cap B)$ et $p(A \cup B)$.

:::corrige
1. Il y a $36$ issues équiprobables. $A = \{(1;6), (2;5), (3;4), (4;3), (5;2), (6;1)\}$ : $p(A) = \frac{6}{36} = \frac{1}{6}$. $\bar{B}$ : « aucun $6$ » a $25$ issues, donc $p(B) = 1 - \frac{25}{36} = \frac{11}{36}$.
2. $A \cap B = \{(1;6), (6;1)\}$ : $p(A \cap B) = \frac{2}{36}$. $p(A \cup B) = \frac{6 + 11 - 2}{36} = \frac{15}{36} = \frac{5}{12}$.
:::
:::

:::exercice Propriétés des combinaisons
1. Calculer $C_7^3$ et $C_7^4$. Que remarque-t-on ?
2. Vérifier que $C_6^2 + C_6^3 = C_7^3$.
3. Résoudre dans $\mathbb{N}$ l’équation $C_n^2 = 15$.

:::corrige
1. $C_7^3 = \frac{7 \times 6 \times 5}{6} = 35 = C_7^4$, car $C_n^p = C_n^{n - p}$.
2. $15 + 20 = 35 = C_7^3$.
3. $\frac{n(n - 1)}{2} = 15 \iff n^2 - n - 30 = 0 \iff n = 6$ ou $n = -5$. Dans $\mathbb{N}$ : $n = 6$.
:::
:::
