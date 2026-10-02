---
title: Série 2 : exercices type examen
kind: serie
summary: Deux exercices sur les suites comme à l’examen national de Lettres et sciences humaines, avec une suite auxiliaire et un problème de placement, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Exercice 1 : une suite auxiliaire
Soit $(u_n)$ définie par $u_0 = 6$ et $u_{n + 1} = \dfrac{1}{2}u_n + 1$ pour tout $n$.

1. Calculer $u_1$ et $u_2$.
2. On pose $v_n = u_n - 2$. Montrer que $(v_n)$ est géométrique de raison $\frac{1}{2}$, et calculer $v_0$.
3. Exprimer $v_n$ puis $u_n$ en fonction de $n$.
4. Calculer $S_n = v_0 + v_1 + \cdots + v_n$ en fonction de $n$.

:::corrige
1. $u_1 = 4$, $u_2 = 3$.
2. $v_{n + 1} = u_{n + 1} - 2 = \frac{1}{2}u_n - 1 = \frac{1}{2}(u_n - 2) = \frac{1}{2}v_n$, et $v_0 = 4$.
3. $v_n = 4\left(\frac{1}{2}\right)^n$, donc $u_n = 2 + 4\left(\frac{1}{2}\right)^n$.
4. $S_n = 4 \times \frac{1 - \left(\frac{1}{2}\right)^{n + 1}}{1 - \frac{1}{2}} = 8\left(1 - \left(\frac{1}{2}\right)^{n + 1}\right)$.
:::
:::

:::exercice Exercice 2 : deux placements
Ahmed place $10\,000$ dirhams à intérêts simples, au taux de $6\,\%$ par an : chaque année, il reçoit $600$ dirhams. Salma place $10\,000$ dirhams à intérêts composés, au taux de $5\,\%$ par an. On note $A_n$ et $B_n$ leurs capitaux après $n$ années.

1. Montrer que $(A_n)$ est arithmétique et que $(B_n)$ est géométrique ; exprimer $A_n$ et $B_n$.
2. Calculer $A_{10}$ et $B_{10}$.
3. Calculer $A_{20}$ et $B_{20}$. Quel placement est le meilleur à long terme ?

:::corrige
1. $A_{n + 1} = A_n + 600$ : $A_n = 10\,000 + 600n$. $B_{n + 1} = 1{,}05\,B_n$ : $B_n = 10\,000 \times 1{,}05^n$.
2. $A_{10} = 16\,000$ et $B_{10} \approx 16\,289$ dirhams.
3. $A_{20} = 22\,000$ et $B_{20} \approx 26\,533$ dirhams : à long terme, le placement à intérêts composés rapporte davantage, même avec un taux plus faible.
:::
:::
