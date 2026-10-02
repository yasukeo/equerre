---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets : l’étude d’un polynôme du troisième degré jusqu’au nombre de solutions d’une équation, puis une fonction homographique qui modélise l’apprentissage de mots, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un polynôme du troisième degré
Soit $f(x) = x^3 - 6x^2 + 9x$.

1. Calculer les limites de $f$ en $+\infty$ et en $-\infty$.
2. Montrer que $f'(x) = 3(x - 1)(x - 3)$.
3. Donner les variations de $f$, son maximum local et son minimum local.
4. Vérifier que $f(x) = x(x - 3)^2$ et trouver les points où la courbe rencontre l’axe des abscisses.
5. Donner l’équation de la tangente à l’origine.
6. Combien de solutions a l’équation $f(x) = 2$ ?

:::corrige
1. Comme $x^3$ : $+\infty$ en $+\infty$, $-\infty$ en $-\infty$.
2. $f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3)$.
3. $f$ croît sur $]-\infty ; 1]$, décroît sur $[1 ; 3]$, croît sur $[3 ; +\infty[$. Maximum local $f(1) = 4$ ; minimum local $f(3) = 0$.
4. $x(x - 3)^2 = x(x^2 - 6x + 9) = x^3 - 6x^2 + 9x$. La courbe rencontre l’axe en $(0 ; 0)$ et en $(3 ; 0)$, où elle le touche avec une tangente horizontale.
5. $f'(0) = 9$ : $y = 9x$.
6. Sur $]-\infty ; 1]$, $f$ croît de $-\infty$ à $4$ ; sur $[1 ; 3]$, elle décroît de $4$ à $0$ ; sur $[3 ; +\infty[$, elle croît de $0$ à $+\infty$. La valeur $2$ est atteinte une fois sur chaque intervalle : $3$ solutions.
:::
:::

:::exercice Problème 2 : apprendre des mots
Un élève apprend le vocabulaire d’une langue étrangère. On estime qu’après $t$ heures de travail ($t \geq 0$), il retient $N(t) = \dfrac{30t}{t + 2}$ mots d’une liste.

1. Calculer $N(0)$, $N(2)$ et $N(8)$.
2. Calculer $N'(t)$ et en déduire le sens de variation de $N$.
3. Calculer la limite de $N(t)$ quand $t$ tend vers $+\infty$. Interpréter.
4. Combien d’heures faut-il pour retenir $24$ mots ?

:::corrige
1. $N(0) = 0$, $N(2) = \frac{60}{4} = 15$, $N(8) = \frac{240}{10} = 24$.
2. $N'(t) = \frac{30(t + 2) - 30t}{(t + 2)^2} = \frac{60}{(t + 2)^2} > 0$ : $N$ est croissante, plus on travaille, plus on retient.
3. Comme $\frac{30t}{t} = 30$ : la limite vaut $30$. Le nombre de mots retenus se rapproche de $30$ sans jamais l’atteindre : la droite $y = 30$ est asymptote horizontale.
4. $\frac{30t}{t + 2} = 24 \iff 30t = 24t + 48 \iff t = 8$ : il faut $8$ heures.
:::
:::
