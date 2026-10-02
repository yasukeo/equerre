---
title: Série 1 — partie 2 : suites géométriques
kind: serie
summary: Reconnaître une suite géométrique, terme général et sommes, pourcentages, une suite auxiliaire, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Reconnaître une suite géométrique
1. Montrer que $u_n = 2 \times 5^n$ définit une suite géométrique ; donner sa raison et son premier terme.
2. $(v_n)$ est géométrique de raison $\frac{1}{3}$ avec $v_0 = 81$. Calculer $v_1$, $v_2$, $v_4$.

:::corrige
1. $\frac{u_{n + 1}}{u_n} = \frac{2 \times 5^{n + 1}}{2 \times 5^n} = 5$ : raison $5$, $u_0 = 2$.
2. $v_1 = 27$, $v_2 = 9$, $v_4 = 1$.
:::
:::

:::exercice Somme de termes
1. Calculer $S = 1 + 3 + 9 + \cdots + 3^8$.
2. Calculer $T = 5 + 10 + 20 + \cdots + 640$.

:::corrige
1. $9$ termes, raison $3$ : $S = \frac{1 - 3^9}{1 - 3} = \frac{3^9 - 1}{2} = 9\,841$.
2. $640 = 5 \times 2^7$ : il y a $8$ termes, et $T = 5 \times \frac{1 - 2^8}{1 - 2} = 5 \times 255 = 1\,275$.
:::
:::

:::exercice Pourcentages
Un capital de $20\,000$ dirhams est placé à $4\,\%$ par an, à intérêts composés. On note $C_n$ le capital après $n$ années.

1. Exprimer $C_{n + 1}$ en fonction de $C_n$, puis $C_n$ en fonction de $n$.
2. Calculer $C_5$ (arrondi au dirham).
3. Une voiture de $150\,000$ dirhams perd $10\,\%$ de sa valeur chaque année. Que vaut-elle après $3$ ans ?

:::corrige
1. $C_{n + 1} = 1{,}04\,C_n$ : $C_n = 20\,000 \times 1{,}04^n$.
2. $C_5 \approx 24\,333$ dirhams.
3. $150\,000 \times 0{,}9^3 = 109\,350$ dirhams.
:::
:::

:::exercice Une suite auxiliaire
Soit $u_0 = 1$ et $u_{n + 1} = 3u_n - 4$. On pose $v_n = u_n - 2$.

1. Calculer $u_1$ et $u_2$.
2. Montrer que $(v_n)$ est géométrique de raison $3$.
3. En déduire $v_n$, puis $u_n$, en fonction de $n$.

:::corrige
1. $u_1 = -1$, $u_2 = -7$.
2. $v_{n + 1} = u_{n + 1} - 2 = 3u_n - 6 = 3(u_n - 2) = 3v_n$.
3. $v_0 = -1$, donc $v_n = -3^n$ et $u_n = 2 - 3^n$. (Vérification : $u_2 = 2 - 9 = -7$.)
:::
:::
