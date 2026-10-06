---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : des équations qui se ramènent au second degré, bicarrée et avec racine carrée, puis les dimensions de terrains trouvées par la somme et le produit et par un système, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : se ramener au second degré
1. Résoudre $x^4 - 13x^2 + 36 = 0$ en posant $X = x^2$.
2. On veut résoudre $\sqrt{x + 3} = x - 3$.
   - Expliquer pourquoi une solution doit vérifier $x \geq 3$.
   - En élevant au carré, montrer qu’une solution vérifie $x^2 - 7x + 6 = 0$.
   - Conclure, en vérifiant les solutions trouvées.

:::corrige
1. $X^2 - 13X + 36 = 0$ : $\Delta = 169 - 144 = 25$, $X = 4$ ou $X = 9$. Donc $x \in \{-3 ; -2 ; 2 ; 3\}$.
2. Une racine carrée est positive, donc $x - 3 \geq 0$. En élevant au carré : $x + 3 = x^2 - 6x + 9$, soit $x^2 - 7x + 6 = 0$, de solutions $1$ et $6$. Seul $6$ vérifie $x \geq 3$, et $\sqrt{9} = 3 = 6 - 3$ : $S = \{6\}$.
:::
:::

:::exercice Problème 2 : des terrains
1. Un terrain rectangulaire a un périmètre de $32$ m et une aire de $60$ m². Montrer que sa longueur et sa largeur sont les solutions de $x^2 - 16x + 60 = 0$, puis les calculer.
2. Un second terrain a une longueur $L$ et une largeur $\ell$ telles que $L + \ell = 20$ et $L - 2\ell = 2$. Calculer ses dimensions et son aire.
3. Quel terrain a la plus grande aire ? Lequel a le plus grand périmètre ?

:::corrige
1. La somme des dimensions vaut $16$ et leur produit $60$ : ce sont les solutions de $x^2 - 16x + 60 = 0$. $\Delta = 256 - 240 = 16$, donc $x = 10$ ou $x = 6$ : $10$ m sur $6$ m.
2. En soustrayant : $3\ell = 18$, donc $\ell = 6$ m et $L = 14$ m ; aire $84$ m².
3. Le second : $84 > 60$ m² d’aire, et $40 > 32$ m de périmètre.
:::
:::
