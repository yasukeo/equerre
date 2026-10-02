---
title: Série 2 : exercices type examen
kind: serie
summary: Deux exercices comme à l’examen national de Lettres et sciences humaines : une suite récurrente et sa limite, puis une population qui se stabilise, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Exercice 1 : une suite récurrente
Soit $(u_n)$ définie par $u_0 = 1$ et $u_{n + 1} = \dfrac{1}{3}u_n + 2$.

1. Calculer $u_1$ et $u_2$.
2. On pose $v_n = u_n - 3$. Montrer que $(v_n)$ est géométrique et préciser sa raison et son premier terme.
3. Exprimer $v_n$ puis $u_n$ en fonction de $n$.
4. Calculer $\lim u_n$.
5. Calculer $T_n = v_0 + v_1 + \cdots + v_n$ et sa limite.

:::corrige
1. $u_1 = \frac{7}{3}$, $u_2 = \frac{7}{9} + 2 = \frac{25}{9}$.
2. $v_{n + 1} = u_{n + 1} - 3 = \frac{1}{3}u_n - 1 = \frac{1}{3}(u_n - 3) = \frac{1}{3}v_n$ : raison $\frac{1}{3}$, $v_0 = -2$.
3. $v_n = -2\left(\frac{1}{3}\right)^n$ et $u_n = 3 - 2\left(\frac{1}{3}\right)^n$.
4. $\left(\frac{1}{3}\right)^n \to 0$, donc $\lim u_n = 3$.
5. $T_n = -2 \times \frac{1 - \left(\frac{1}{3}\right)^{n + 1}}{1 - \frac{1}{3}} = -3\left(1 - \left(\frac{1}{3}\right)^{n + 1}\right)$, qui tend vers $-3$.
:::
:::

:::exercice Exercice 2 : une population qui se stabilise
Une réserve compte $200$ gazelles. Chaque année, $10\,\%$ des gazelles disparaissent, et on en introduit $40$ nouvelles. On note $G_n$ le nombre de gazelles après $n$ années ($G_0 = 200$).

1. Justifier que $G_{n + 1} = 0{,}9\,G_n + 40$.
2. On pose $H_n = G_n - 400$. Montrer que $(H_n)$ est géométrique.
3. Exprimer $G_n$ en fonction de $n$ et calculer $G_{10}$ (arrondi à l’unité).
4. Vers quelle valeur la population se stabilise-t-elle ?

:::corrige
1. Il reste $90\,\%$ des gazelles, soit $0{,}9G_n$, auxquelles on ajoute $40$.
2. $H_{n + 1} = 0{,}9G_n + 40 - 400 = 0{,}9(G_n - 400) = 0{,}9H_n$ : raison $0{,}9$, $H_0 = -200$.
3. $G_n = 400 - 200 \times 0{,}9^n$, et $G_{10} = 400 - 200 \times 0{,}9^{10} \approx 330$.
4. $0{,}9^n \to 0$, donc $\lim G_n = 400$ gazelles.
:::
:::
