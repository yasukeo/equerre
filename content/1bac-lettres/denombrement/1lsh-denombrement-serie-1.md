---
title: Série 1 — partie 1 : ensembles finis et principe multiplicatif
kind: serie
summary: Cardinal d’une réunion et du complémentaire, principe multiplicatif, listes avec répétition et arbre de choix, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Un sondage
On interroge $50$ personnes : $30$ lisent le journal $A$, $25$ lisent le journal $B$, et $12$ lisent les deux.

1. Combien lisent au moins un des deux journaux ?
2. Combien n’en lisent aucun ?
3. Combien lisent seulement le journal $A$ ?

:::corrige
1. $30 + 25 - 12 = 43$.
2. $50 - 43 = 7$.
3. $30 - 12 = 18$.
:::
:::

:::exercice Principe multiplicatif
1. Samir a $4$ chemises, $3$ pantalons et $2$ paires de chaussures. Combien de tenues différentes peut-il composer ?
2. Il y a $3$ routes de la ville $A$ à la ville $B$, et $2$ routes de $B$ à $C$. Combien de trajets de $A$ à $C$ passant par $B$ ? Combien d’allers-retours $A \to C \to A$ ?

:::corrige
1. $4 \times 3 \times 2 = 24$ tenues.
2. $3 \times 2 = 6$ trajets ; aller-retour : $6 \times 6 = 36$.
:::
:::

:::exercice Listes avec répétition
1. Un QCM compte $10$ questions, avec $4$ réponses possibles à chacune. De combien de façons peut-on le remplir ?
2. Combien y a-t-il de codes de $4$ chiffres ? Combien ne commencent pas par $0$ ?

:::corrige
1. $4^{10} = 1\,048\,576$.
2. $10^4 = 10\,000$ codes ; sans $0$ en premier : $9 \times 10^3 = 9\,000$.
:::
:::

:::exercice Un arbre
On lance une pièce de monnaie trois fois de suite.

1. Construire l’arbre des issues et donner leur nombre.
2. Combien d’issues contiennent exactement deux « face » ?
3. Combien contiennent au moins un « pile » ?

:::corrige
1. $2 \times 2 \times 2 = 8$ issues : PPP, PPF, PFP, PFF, FPP, FPF, FFP, FFF.
2. Trois : PFF, FPF, FFP.
3. Toutes sauf FFF : $8 - 1 = 7$.
:::
:::
