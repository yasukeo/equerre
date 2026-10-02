---
title: Série 1 — partie 2 : calculer des probabilités
kind: serie
summary: Probabilités en cas d’équiprobabilité, événement contraire, réunion, tirages simultanés et répétés, indépendance, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Un dé et une pièce
1. On lance un dé équilibré. Calculer la probabilité d’obtenir un multiple de $3$, puis un nombre premier.
2. On lance une pièce et un dé. Combien y a-t-il d’issues ? Quelle est la probabilité d’obtenir « pile » et un $6$ ?

:::corrige
1. Multiples de $3$ : $\{3 ; 6\}$, probabilité $\frac{2}{6} = \frac{1}{3}$. Nombres premiers : $\{2 ; 3 ; 5\}$, probabilité $\frac{1}{2}$.
2. $2 \times 6 = 12$ issues ; une seule convient : $\frac{1}{12}$.
:::
:::

:::exercice Tirage simultané
Une urne contient $3$ boules vertes et $5$ boules jaunes. On tire simultanément $2$ boules.

1. Combien y a-t-il de tirages possibles ?
2. Calculer la probabilité d’obtenir deux boules vertes, puis deux boules de même couleur.
3. Calculer la probabilité d’obtenir au moins une boule verte.

:::corrige
1. $C_8^2 = 28$.
2. Deux vertes : $\frac{C_3^2}{28} = \frac{3}{28}$. Deux jaunes : $\frac{C_5^2}{28} = \frac{10}{28}$. Même couleur : $\frac{13}{28}$.
3. Le contraire est « deux jaunes » : $1 - \frac{10}{28} = \frac{18}{28} = \frac{9}{14}$.
:::
:::

:::exercice Réunion
On tire une carte au hasard dans un jeu de $32$ cartes. $A$ : « la carte est un cœur » ; $B$ : « la carte est une figure » (valet, dame ou roi).

1. Calculer $p(A)$, $p(B)$ et $p(A \cap B)$.
2. En déduire $p(A \cup B)$.

:::corrige
1. $p(A) = \frac{8}{32} = \frac{1}{4}$ ; il y a $12$ figures, $p(B) = \frac{12}{32} = \frac{3}{8}$ ; $3$ figures de cœur, $p(A \cap B) = \frac{3}{32}$.
2. $p(A \cup B) = \frac{8 + 12 - 3}{32} = \frac{17}{32}$.
:::
:::

:::exercice Épreuves répétées
Un QCM a $3$ questions ; chacune a $4$ réponses dont une seule est juste. Un élève répond au hasard.

1. Quelle est la probabilité de répondre juste aux trois questions ?
2. Quelle est la probabilité de ne répondre juste à aucune ?
3. Quelle est la probabilité d’avoir au moins une réponse juste ?

:::corrige
1. Les réponses sont indépendantes : $\left(\frac{1}{4}\right)^3 = \frac{1}{64}$.
2. $\left(\frac{3}{4}\right)^3 = \frac{27}{64}$.
3. $1 - \frac{27}{64} = \frac{37}{64}$.
:::
:::
