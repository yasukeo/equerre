---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets : une suite récurrente étudiée par récurrence et par une suite auxiliaire, puis une situation de croissance à pourcentage, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : une suite récurrente
Soit $(u_n)$ définie par $u_0 = 5$ et $u_{n + 1} = \dfrac{1}{3}u_n + 2$.

1. Calculer $u_1$ et $u_2$.
2. Montrer par récurrence que $u_n > 3$ pour tout $n$.
3. Montrer que $u_{n + 1} - u_n = -\dfrac{2}{3}(u_n - 3)$ et en déduire le sens de variation de $(u_n)$.
4. On pose $v_n = u_n - 3$. Montrer que $(v_n)$ est géométrique et exprimer $u_n$ en fonction de $n$.
5. Calculer $S_n = u_0 + u_1 + \cdots + u_n$.

:::corrige
1. $u_1 = \frac{11}{3}$, $u_2 = \frac{11}{9} + 2 = \frac{29}{9}$.
2. $u_0 = 5 > 3$. Si $u_n > 3$, alors $\frac{1}{3}u_n > 1$ et $u_{n + 1} > 3$.
3. $u_{n + 1} - u_n = 2 - \frac{2}{3}u_n = -\frac{2}{3}(u_n - 3) < 0$ : la suite est décroissante.
4. $v_{n + 1} = \frac{1}{3}u_n - 1 = \frac{1}{3}v_n$, $v_0 = 2$ : $v_n = 2\left(\frac{1}{3}\right)^n$ et $u_n = 3 + 2\left(\frac{1}{3}\right)^n$.
5. $S_n = 3(n + 1) + 2 \times \frac{1 - \left(\frac{1}{3}\right)^{n + 1}}{1 - \frac{1}{3}} = 3(n + 1) + 3\left(1 - \left(\frac{1}{3}\right)^{n + 1}\right)$.
:::
:::

:::exercice Problème 2 : un abonnement
Un club comptait $800$ abonnés en 2025. Chaque année, $90\,\%$ des abonnés renouvellent leur abonnement et $120$ nouveaux s’inscrivent. On note $a_n$ le nombre d’abonnés en $2025 + n$.

1. Justifier que $a_{n + 1} = 0{,}9\,a_n + 120$, et calculer $a_1$, $a_2$.
2. On pose $b_n = a_n - 1\,200$. Montrer que $(b_n)$ est géométrique.
3. Exprimer $a_n$ en fonction de $n$ et étudier le sens de variation de $(a_n)$.
4. En quelle année le club dépassera-t-il $1\,000$ abonnés ?

:::corrige
1. Il reste $90\,\%$ des abonnés, plus $120$ nouveaux. $a_1 = 840$, $a_2 = 876$.
2. $b_{n + 1} = 0{,}9a_n + 120 - 1\,200 = 0{,}9(a_n - 1\,200) = 0{,}9b_n$.
3. $b_0 = -400$, $a_n = 1\,200 - 400 \times 0{,}9^n$. $0{,}9^n$ décroît, donc $-400 \times 0{,}9^n$ croît : $(a_n)$ est croissante.
4. $400 \times 0{,}9^n < 200 \iff 0{,}9^n < 0{,}5$. On calcule : $0{,}9^6 \approx 0{,}531$, $0{,}9^7 \approx 0{,}478$. Donc $n = 7$ : en 2032.
:::
:::
