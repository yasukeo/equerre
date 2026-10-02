---
title: Série 2 : exercices type examen
kind: serie
summary: Deux exercices de probabilités comme à l’examen national de Lettres et sciences humaines : une urne avec tirage simultané, puis des lancers répétés, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Exercice 1 : une urne
Une urne contient $6$ boules indiscernables au toucher : $2$ rouges, $3$ blanches et $1$ noire. On tire simultanément $3$ boules.

1. Montrer qu’il y a $20$ tirages possibles.
2. Calculer la probabilité des événements :
   - $A$ : « les trois boules sont blanches » ;
   - $B$ : « on obtient exactement une boule rouge » ;
   - $C$ : « on obtient une boule de chaque couleur ».
3. Calculer la probabilité de $D$ : « on n’obtient aucune boule rouge », puis de « on obtient au moins une boule rouge ».

:::corrige
1. $C_6^3 = \frac{6 \times 5 \times 4}{6} = 20$.
2. $p(A) = \frac{C_3^3}{20} = \frac{1}{20}$. Pour $B$ : une rouge parmi $2$ et deux autres boules parmi les $4$ non rouges : $\frac{2 \times C_4^2}{20} = \frac{12}{20} = \frac{3}{5}$. Pour $C$ : $\frac{2 \times 3 \times 1}{20} = \frac{3}{10}$.
3. $p(D) = \frac{C_4^3}{20} = \frac{4}{20} = \frac{1}{5}$, et au moins une rouge : $1 - \frac{1}{5} = \frac{4}{5}$.
:::
:::

:::exercice Exercice 2 : lancers d’une pièce
On lance trois fois une pièce équilibrée et on note la suite des résultats (P pour pile, F pour face).

1. Combien y a-t-il d’issues ? Les écrire à l’aide d’un arbre.
2. Calculer la probabilité d’obtenir exactement deux « pile ».
3. Calculer la probabilité d’obtenir au moins un « pile ».
4. On note $X$ le nombre de « pile ». Donner les valeurs possibles de $X$ et la probabilité de chacune.

:::corrige
1. $2^3 = 8$ issues : PPP, PPF, PFP, PFF, FPP, FPF, FFP, FFF.
2. PPF, PFP, FPP : $\frac{3}{8}$.
3. Le contraire est FFF : $1 - \frac{1}{8} = \frac{7}{8}$.
4. $X$ vaut $0$, $1$, $2$ ou $3$, avec les probabilités $\frac{1}{8}$, $\frac{3}{8}$, $\frac{3}{8}$ et $\frac{1}{8}$ (la somme vaut $1$).
:::
:::
