---
title: Série 1 — partie 2 : conditionnement et variables aléatoires
kind: serie
summary: Probabilités conditionnelles et totales, indépendance, épreuves répétées et « au moins une fois », variable aléatoire, espérance et loi binomiale, avec les corrigés.
position: 20
visibility: enrolled
---

Cinq exercices sur la deuxième partie du cours.

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

:::exercice Indépendance
On tire une carte dans un jeu de $32$ cartes. $A$ : « la carte est un cœur », $B$ : « la carte est un roi ».

1. Calculer $p(A)$, $p(B)$ et $p(A \cap B)$.
2. Les événements $A$ et $B$ sont-ils indépendants ?

:::corrige
1. $p(A) = \frac{8}{32} = \frac{1}{4}$, $p(B) = \frac{4}{32} = \frac{1}{8}$ et $p(A \cap B) = \frac{1}{32}$ (le roi de cœur).
2. $p(A) \times p(B) = \frac{1}{32} = p(A \cap B)$ : ils sont indépendants.
:::
:::

:::exercice Au moins une fois
Un tireur atteint sa cible avec la probabilité $0{,}7$. Il tire $5$ fois, de façon indépendante.

1. Quelle est la probabilité qu’il atteigne la cible exactement $3$ fois ?
2. Quelle est la probabilité qu’il l’atteigne au moins une fois ?
3. Combien de tirs faut-il au minimum pour que la probabilité de l’atteindre au moins une fois dépasse $0{,}999$ ?

:::corrige
1. $C_5^3 \times 0{,}7^3 \times 0{,}3^2 = 10 \times 0{,}343 \times 0{,}09 = 0{,}3087$.
2. $1 - 0{,}3^5 = 1 - 0{,}00243 = 0{,}99757$.
3. Il faut $1 - 0{,}3^n > 0{,}999$, soit $0{,}3^n < 0{,}001$, donc $n\ln 0{,}3 < \ln 0{,}001$ et $n > \frac{\ln 0{,}001}{\ln 0{,}3} \approx 5{,}74$ (on divise par $\ln 0{,}3 < 0$). Il faut au moins $6$ tirs.
:::
:::

:::exercice Un jeu et son espérance
Une urne contient $2$ boules blanches et $3$ noires. On tire simultanément $2$ boules. On gagne $10$ dirhams par boule blanche tirée, et le jeu coûte $6$ dirhams. $X$ est le gain net.

1. Déterminer les valeurs de $X$ et sa loi de probabilité.
2. Calculer $E(X)$. Le jeu est-il favorable au joueur ?

:::corrige
1. Il y a $C_5^2 = 10$ tirages. $X = -6$ (aucune blanche) : $\frac{C_3^2}{10} = \frac{3}{10}$ ; $X = 4$ (une blanche) : $\frac{2 \times 3}{10} = \frac{6}{10}$ ; $X = 14$ (deux blanches) : $\frac{1}{10}$. La somme vaut bien $1$.
2. $E(X) = \frac{-18 + 24 + 14}{10} = 2$ : en moyenne, le joueur gagne $2$ dirhams par partie ; le jeu lui est favorable.
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
