---
title: Série 1 — partie 1 : généralités et suites arithmétiques
kind: serie
summary: Calculer des termes, étudier un sens de variation, reconnaître une suite arithmétique, terme général et sommes, un problème de salaire, avec les corrigés.
position: 10
visibility: public
---

Cinq exercices sur la première partie du cours.

:::exercice Calculer des termes
1. Soit $u_n = 3n - 4$. Calculer $u_0$, $u_1$, $u_5$ et $u_{100}$.
2. Soit $v_0 = 2$ et $v_{n + 1} = 3v_n - 1$. Calculer $v_1$, $v_2$ et $v_3$.

:::corrige
1. $u_0 = -4$, $u_1 = -1$, $u_5 = 11$, $u_{100} = 296$.
2. $v_1 = 5$, $v_2 = 14$, $v_3 = 41$.
:::
:::

:::exercice Sens de variation
Étudier le sens de variation de chaque suite.

1. $u_n = 5 - 2n$
2. $v_n = n^2 + 3n$
3. $w_n = \dfrac{1}{n + 1}$

:::corrige
1. $u_{n + 1} - u_n = -2 < 0$ : décroissante.
2. $v_{n + 1} - v_n = (n + 1)^2 + 3(n + 1) - n^2 - 3n = 2n + 4 > 0$ : croissante.
3. $w_{n + 1} - w_n = \frac{1}{n + 2} - \frac{1}{n + 1} = \frac{-1}{(n + 1)(n + 2)} < 0$ : décroissante.
:::
:::

:::exercice Reconnaître une suite arithmétique
Les suites suivantes sont-elles arithmétiques ? Si oui, donner la raison et le premier terme.

1. $u_n = 4n + 7$
2. $v_n = n^2$
3. $w_n = \dfrac{3 - 5n}{2}$

:::corrige
1. $u_{n + 1} - u_n = 4$ : arithmétique de raison $4$, $u_0 = 7$.
2. $v_1 - v_0 = 1$ et $v_2 - v_1 = 3$ : la différence n’est pas constante, non.
3. $w_{n + 1} - w_n = -\frac{5}{2}$ : arithmétique de raison $-\frac{5}{2}$, $w_0 = \frac{3}{2}$.
:::
:::

:::exercice Terme général et somme
$(u_n)$ est arithmétique, avec $u_2 = 11$ et $u_7 = 31$.

1. Calculer la raison $r$ et $u_0$.
2. Exprimer $u_n$ en fonction de $n$.
3. Calculer $S = u_0 + u_1 + \cdots + u_{15}$.

:::corrige
1. $u_7 = u_2 + 5r$, donc $5r = 20$ et $r = 4$ ; $u_0 = u_2 - 2r = 3$.
2. $u_n = 3 + 4n$.
3. $16$ termes, $u_{15} = 63$ : $S = 16 \times \frac{3 + 63}{2} = 528$.
:::
:::

:::exercice Un salaire
Un employé gagne $3\,500$ dirhams par mois la première année, et son salaire mensuel augmente de $200$ dirhams chaque année.

1. Quel est son salaire mensuel la $10^e$ année ?
2. Combien a-t-il gagné en tout pendant ces $10$ années ?

:::corrige
1. Le salaire de l’année $n$ ($n \geq 1$) est $3\,500 + 200(n - 1)$ : la $10^e$ année, $5\,300$ dirhams par mois.
2. La somme des salaires mensuels vaut $10 \times \frac{3\,500 + 5\,300}{2} = 44\,000$ ; sur $12$ mois par an, il a gagné $12 \times 44\,000 = 528\,000$ dirhams.
:::
:::
