---
title: Série 1 : dénombrement et probabilités
kind: serie
summary: Tirages simultanés et successifs, probabilités conditionnelles, épreuves répétées et loi d’une variable aléatoire, avec les corrigés.
position: 10
visibility: public
---

Trois exercices dans l’esprit de l’examen national.

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

:::exercice Probabilités conditionnelles
Dans un lycée, $60\,\%$ des élèves sont en filière PC et les autres en SVT. $30\,\%$ des élèves de PC et $50\,\%$ des élèves de SVT suivent des cours de soutien. On choisit un élève au hasard.

1. Calculer la probabilité qu’il suive des cours de soutien.
2. Il suit des cours de soutien : quelle est la probabilité qu’il soit en PC ?

:::corrige
Notons $P$ : « l’élève est en PC » et $S$ : « il suit des cours de soutien ».

1. D’après la formule des probabilités totales : $p(S) = 0{,}6 \times 0{,}3 + 0{,}4 \times 0{,}5 = 0{,}18 + 0{,}2 = 0{,}38$.
2. $p_S(P) = \dfrac{p(P \cap S)}{p(S)} = \dfrac{0{,}18}{0{,}38} = \dfrac{9}{19}$.
:::
:::

:::exercice Épreuves répétées et variable aléatoire
On lance $3$ fois une pièce équilibrée. $X$ est le nombre de « pile » obtenus.

1. Donner la loi de probabilité de $X$.
2. Calculer $E(X)$ et $V(X)$.

:::corrige
1. $X$ suit la loi binomiale de paramètres $n = 3$ et $p = \frac{1}{2}$ : $p(X = k) = C_3^k \left(\frac{1}{2}\right)^3$, soit $p(X = 0) = \frac{1}{8}$, $p(X = 1) = \frac{3}{8}$, $p(X = 2) = \frac{3}{8}$ et $p(X = 3) = \frac{1}{8}$.
2. $E(X) = np = \frac{3}{2}$ et $V(X) = np(1 - p) = \frac{3}{4}$.
:::
:::
