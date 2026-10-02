---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux exercices comme à l’examen national : tirage simultané et loi d’une variable aléatoire, puis deux urnes, probabilités totales, probabilité « inverse » et épreuves répétées, avec les corrigés.
position: 30
visibility: enrolled
---

Deux exercices de probabilités de la forme de ceux de l’examen national.

:::exercice Problème 1 : tirage simultané et variable aléatoire
Une urne contient $6$ boules indiscernables au toucher : $3$ rouges, $2$ vertes et $1$ blanche. On tire simultanément $3$ boules.

1. Combien y a-t-il de tirages possibles ?
2. Calculer la probabilité des événements $A$ : « les trois boules sont de la même couleur » et $B$ : « les trois boules sont de trois couleurs différentes ».
3. Soit $X$ le nombre de boules rouges tirées. Déterminer la loi de probabilité de $X$.
4. Calculer l’espérance de $X$.

:::corrige
1. $C_6^3 = 20$.
2. Seules les rouges sont au moins trois : $p(A) = \frac{C_3^3}{20} = \frac{1}{20}$. Pour $B$ : $3 \times 2 \times 1 = 6$ tirages, donc $p(B) = \frac{6}{20} = \frac{3}{10}$.
3. Il y a $3$ boules non rouges. $p(X = 0) = \frac{C_3^3}{20} = \frac{1}{20}$, $p(X = 1) = \frac{C_3^1 C_3^2}{20} = \frac{9}{20}$, $p(X = 2) = \frac{C_3^2 C_3^1}{20} = \frac{9}{20}$, $p(X = 3) = \frac{1}{20}$. La somme vaut $1$.
4. $E(X) = \frac{0 + 9 + 18 + 3}{20} = \frac{3}{2}$.
:::
:::

:::exercice Problème 2 : deux urnes
L’urne $U_1$ contient $2$ boules rouges et $3$ noires ; l’urne $U_2$ contient $4$ boules rouges et $1$ noire. On lance un dé équilibré : si l’on obtient $6$, on tire une boule de $U_2$, sinon une boule de $U_1$.

1. Représenter la situation par un arbre pondéré.
2. Calculer la probabilité de l’événement $R$ : « la boule tirée est rouge ».
3. La boule tirée est rouge. Quelle est la probabilité qu’elle provienne de $U_2$ ?
4. On répète trois fois l’expérience, en remettant chaque fois la boule dans son urne. Soit $X$ le nombre de boules rouges obtenues. Quelle est la loi de $X$ ? Calculer $p(X \geq 1)$.

:::corrige
1. Premier niveau : $U_2$ avec la probabilité $\frac{1}{6}$, $U_1$ avec $\frac{5}{6}$. Second niveau : sachant $U_1$, rouge $\frac{2}{5}$, noire $\frac{3}{5}$ ; sachant $U_2$, rouge $\frac{4}{5}$, noire $\frac{1}{5}$.
2. $p(R) = \frac{5}{6} \times \frac{2}{5} + \frac{1}{6} \times \frac{4}{5} = \frac{10}{30} + \frac{4}{30} = \frac{7}{15}$.
3. $p_R(U_2) = \frac{p(U_2 \cap R)}{p(R)} = \frac{\frac{4}{30}}{\frac{14}{30}} = \frac{2}{7}$.
4. Les trois épreuves sont indépendantes et identiques : $X$ suit la loi binomiale de paramètres $3$ et $\frac{7}{15}$. $p(X \geq 1) = 1 - \left(\frac{8}{15}\right)^3 = 1 - \frac{512}{3375} = \frac{2863}{3375}$.
:::
:::
