---
title: Devoir surveillé : limite d’une suite
kind: devoir
summary: Un devoir d’une heure sur 20 points : limites et formes indéterminées, limites de qⁿ, une suite auxiliaire et sa limite, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (7 points) : limites
Calculer la limite de chaque suite.

1. $u_n = 4n^2 - n$ (2 pts)
2. $v_n = \dfrac{6n + 2}{3n - 1}$ (2 pts)
3. $w_n = \dfrac{n + 1}{n^2}$, $n \geq 1$ (1,5 pt)
4. $t_n = 2 - \left(\dfrac{3}{4}\right)^n$ (1,5 pt)

:::corrige
1. $u_n = n^2\left(4 - \frac{1}{n}\right) \to +\infty$.
2. $\frac{6n}{3n} = 2$.
3. $\frac{n}{n^2} = \frac{1}{n} \to 0$.
4. $\left(\frac{3}{4}\right)^n \to 0$, donc $t_n \to 2$.
:::
:::

:::exercice Exercice 2 (5 points) : suites géométriques
1. Donner la limite de $a_n = 5^n$ et de $b_n = 7 \times (0{,}2)^n$. (2 pts)
2. Calculer $S_n = 1 + 0{,}2 + 0{,}2^2 + \cdots + 0{,}2^n$ et sa limite. (3 pts)

:::corrige
1. $a_n \to +\infty$ ; $b_n \to 0$.
2. $S_n = \frac{1 - 0{,}2^{n + 1}}{0{,}8} = 1{,}25\left(1 - 0{,}2^{n + 1}\right) \to 1{,}25$.
:::
:::

:::exercice Exercice 3 (8 points) : suite auxiliaire
Soit $u_0 = 2$ et $u_{n + 1} = \dfrac{1}{4}u_n + 3$. On pose $v_n = u_n - 4$.

1. Calculer $u_1$. (1 pt)
2. Montrer que $(v_n)$ est géométrique de raison $\frac{1}{4}$. (3 pts)
3. Exprimer $u_n$ en fonction de $n$. (2 pts)
4. Calculer $\lim u_n$. (2 pts)

:::corrige
1. $u_1 = \frac{1}{2} + 3 = \frac{7}{2}$.
2. $v_{n + 1} = \frac{1}{4}u_n + 3 - 4 = \frac{1}{4}(u_n - 4) = \frac{1}{4}v_n$.
3. $v_0 = -2$, $v_n = -2\left(\frac{1}{4}\right)^n$, $u_n = 4 - 2\left(\frac{1}{4}\right)^n$.
4. $\lim u_n = 4$.
:::
:::
