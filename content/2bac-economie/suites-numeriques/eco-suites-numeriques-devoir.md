---
title: Devoir surveillé : suites numériques
kind: devoir
summary: Un devoir d’une heure sur 20 points : suite auxiliaire arithmétique, calculs de limites et étude d’une suite récurrente, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice non autorisée.

:::exercice Exercice 1 (6 points) : une suite auxiliaire
Soit $(u_n)$ définie par $u_0 = 1$ et $u_{n + 1} = \dfrac{u_n}{1 + u_n}$.

1. Montrer par récurrence que $u_n > 0$ pour tout $n$. (1,5 pt)
2. On pose $v_n = \dfrac{1}{u_n}$. Montrer que $(v_n)$ est arithmétique. (2 pts)
3. En déduire $u_n$ en fonction de $n$, puis $\lim u_n$. (2,5 pts)

:::corrige
1. $u_0 = 1 > 0$. Si $u_n > 0$, alors $1 + u_n > 0$ et $u_{n + 1} = \frac{u_n}{1 + u_n} > 0$.
2. $v_{n + 1} = \frac{1 + u_n}{u_n} = \frac{1}{u_n} + 1 = v_n + 1$ : $(v_n)$ est arithmétique de raison $1$, de premier terme $v_0 = 1$.
3. $v_n = n + 1$, donc $u_n = \frac{1}{n + 1}$ et $\lim u_n = 0$.
:::
:::

:::exercice Exercice 2 (6 points) : limites
Calculer la limite de chaque suite.

1. $a_n = \dfrac{n^2 + 1}{2n^2 - n}$ (1 pt)
2. $b_n = \sqrt{4n^2 + n} - 2n$ (2 pts)
3. $c_n = \dfrac{3^n - 5^n}{5^n + 1}$ (1,5 pt)
4. $d_n = \dfrac{n + (-1)^n}{n}$, pour $n \geq 1$ (1,5 pt)

:::corrige
1. $a_n = \frac{1 + \frac{1}{n^2}}{2 - \frac{1}{n}} \to \frac{1}{2}$.
2. $b_n = \frac{n}{\sqrt{4n^2 + n} + 2n} = \frac{1}{\sqrt{4 + \frac{1}{n}} + 2} \to \frac{1}{4}$.
3. $c_n = \frac{\left(\frac{3}{5}\right)^n - 1}{1 + \left(\frac{1}{5}\right)^n} \to \frac{0 - 1}{1 + 0} = -1$.
4. $d_n = 1 + \frac{(-1)^n}{n}$ et $-\frac{1}{n} \leq \frac{(-1)^n}{n} \leq \frac{1}{n}$, donc $\lim d_n = 1$.
:::
:::

:::exercice Exercice 3 (8 points) : une suite récurrente
Soit $(u_n)$ définie par $u_0 = \dfrac{1}{2}$ et $u_{n + 1} = \dfrac{2u_n}{u_n + 1}$.

1. Montrer par récurrence que $0 < u_n < 1$ pour tout $n$. (2 pts)
2. Montrer que $u_{n + 1} - u_n = \dfrac{u_n(1 - u_n)}{u_n + 1}$ et en déduire le sens de variation de $(u_n)$. (2 pts)
3. En déduire que $(u_n)$ converge. (1 pt)
4. On pose $v_n = \dfrac{u_n - 1}{u_n}$. Montrer que $(v_n)$ est géométrique de raison $\frac{1}{2}$. (1,5 pt)
5. Exprimer $u_n$ en fonction de $n$ et calculer $\lim u_n$. (1,5 pt)

:::corrige
1. $u_0 = \frac{1}{2} \in ]0 ; 1[$. Si $0 < u_n < 1$, alors $u_{n + 1} > 0$ (quotient de deux nombres positifs) et $1 - u_{n + 1} = \frac{u_n + 1 - 2u_n}{u_n + 1} = \frac{1 - u_n}{u_n + 1} > 0$, donc $0 < u_{n + 1} < 1$.
2. $u_{n + 1} - u_n = \frac{2u_n - u_n^2 - u_n}{u_n + 1} = \frac{u_n(1 - u_n)}{u_n + 1} > 0$ d’après la question 1 : la suite est strictement croissante.
3. Croissante et majorée par $1$, elle converge.
4. $v_{n + 1} = 1 - \frac{1}{u_{n + 1}} = 1 - \frac{u_n + 1}{2u_n} = \frac{u_n - 1}{2u_n} = \frac{1}{2}v_n$. De plus $v_0 = \frac{-\frac{1}{2}}{\frac{1}{2}} = -1$.
5. $v_n = -\left(\frac{1}{2}\right)^n$. De $v_n = 1 - \frac{1}{u_n}$, on tire $u_n = \frac{1}{1 - v_n} = \dfrac{1}{1 + \left(\frac{1}{2}\right)^n}$, donc $\lim u_n = 1$.
:::
:::
