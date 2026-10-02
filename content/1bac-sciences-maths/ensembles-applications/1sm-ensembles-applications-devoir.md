---
title: Devoir surveillé : ensembles et applications
kind: devoir
summary: Un devoir d’une heure sur 20 points : opérations sur des ensembles, une égalité d’ensembles, une application bijective et une image réciproque, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : ensembles
Dans $\mathbb{R}$, $A = [-3 ; 2[$ et $B = ]0 ; 5]$.

1. Déterminer $A \cap B$, $A \cup B$, $A \setminus B$ et $A \Delta B$. (4 pts)
2. Déterminer $\overline{A \cap B}$ et vérifier la loi de Morgan. (2 pts)

:::corrige
1. $A \cap B = ]0 ; 2[$, $A \cup B = [-3 ; 5]$, $A \setminus B = [-3 ; 0]$, $A \Delta B = [-3 ; 0] \cup [2 ; 5]$.
2. $\overline{A \cap B} = ]-\infty ; 0] \cup [2 ; +\infty[$ ; $\overline{A} \cup \overline{B} = \left(]-\infty ; -3[ \cup [2 ; +\infty[\right) \cup \left(]-\infty ; 0] \cup ]5 ; +\infty[\right) = ]-\infty ; 0] \cup [2 ; +\infty[$.
:::
:::

:::exercice Exercice 2 (5 points) : une égalité
Montrer que pour toutes parties $A$, $B$ d’un ensemble $E$ : $A \cup (A \cap B) = A$ et $A \cap (A \cup B) = A$.

:::corrige
$A \cap B \subset A$, donc $A \cup (A \cap B) = A$. Et $A \subset A \cup B$, donc $A \cap (A \cup B) = A$.
:::
:::

:::exercice Exercice 3 (9 points) : applications
Soit $f : [1 ; +\infty[ \to [0 ; +\infty[$, $f(x) = x^2 - 2x + 1$.

1. Montrer que $f(x) = (x - 1)^2$ et que $f$ est bien à valeurs dans $[0 ; +\infty[$. (2 pts)
2. Montrer que $f$ est bijective et déterminer $f^{-1}$. (4 pts)
3. Déterminer $f([2 ; 4])$ et $f^{-1}([1 ; 9])$. (3 pts)

:::corrige
1. Identité remarquable ; un carré est positif.
2. Pour $y \geq 0$ : $(x - 1)^2 = y$ avec $x - 1 \geq 0$ donne $x = 1 + \sqrt{y}$, unique. $f^{-1}(y) = 1 + \sqrt{y}$.
3. $f$ est croissante sur $[1 ; +\infty[$ : $f([2 ; 4]) = [1 ; 9]$ et $f^{-1}([1 ; 9]) = [2 ; 4]$.
:::
:::
