---
title: Série 1 — partie 2 : les raisonnements
kind: serie
summary: Démontrer par contraposée, par l’absurde, par disjonction des cas, par équivalences, réfuter par un contre-exemple, démontrer par récurrence, avec les corrigés.
position: 20
visibility: enrolled
---

Six exercices sur la deuxième partie du cours.

:::exercice Contraposée
Soit $n$ un entier. Montrer que si $n^2$ est impair, alors $n$ est impair.

:::corrige
Contraposée : si $n$ est pair, alors $n^2$ est pair. Si $n = 2k$, $n^2 = 4k^2 = 2(2k^2)$ est pair.
:::
:::

:::exercice Par l’absurde
Montrer qu’il n’existe pas d’entiers $a$ et $b$ tels que $6a + 9b = 1$.

:::corrige
Supposons qu’il en existe. Alors $3(2a + 3b) = 1$, donc $3$ divise $1$ : contradiction.
:::
:::

:::exercice Disjonction des cas
1. Montrer que pour tout entier $n$, $n^2 + n + 1$ est impair.
2. Résoudre dans $\mathbb{R}$ l’équation $|2x - 4| = x + 1$.

:::corrige
1. $n^2 + n = n(n + 1)$ est pair (produit de deux entiers consécutifs), donc $n^2 + n + 1$ est impair.
2. Si $x \geq 2$ : $2x - 4 = x + 1$, $x = 5$, qui convient. Si $x < 2$ : $4 - 2x = x + 1$, $x = 1$, qui convient. $S = \{1 ; 5\}$.
:::
:::

:::exercice Équivalences successives
Montrer que pour tous réels $a$ et $b$ : $a^2 + b^2 \geq 2ab$, puis que pour tout $x > 0$, $x + \dfrac{1}{x} \geq 2$.

:::corrige
$a^2 + b^2 \geq 2ab \iff a^2 - 2ab + b^2 \geq 0 \iff (a - b)^2 \geq 0$, vrai. Pour $x > 0$ : $x + \frac{1}{x} \geq 2 \iff x^2 + 1 \geq 2x$ (on multiplie par $x > 0$) $\iff (x - 1)^2 \geq 0$, vrai.
:::
:::

:::exercice Contre-exemples
Les propositions suivantes sont fausses : le prouver.

1. Pour tout réel $x$, $\sqrt{x^2} = x$.
2. Pour tous réels $a$ et $b$, $(a + b)^2 = a^2 + b^2$.
3. Tout entier impair est premier.

:::corrige
1. Pour $x = -2$ : $\sqrt{4} = 2 \neq -2$.
2. Pour $a = b = 1$ : $4 \neq 2$.
3. $9$ est impair et $9 = 3 \times 3$ n’est pas premier.
:::
:::

:::exercice Récurrence
1. Montrer que pour tout $n \geq 1$, $1 + 2 + 2^2 + \cdots + 2^{n - 1} = 2^n - 1$.
2. Montrer que pour tout $n \in \mathbb{N}$, $5^n - 1$ est divisible par $4$.

:::corrige
1. Pour $n = 1$ : $1 = 2^1 - 1$. Si vrai au rang $n$ : $1 + \cdots + 2^{n - 1} + 2^n = 2^n - 1 + 2^n = 2^{n + 1} - 1$.
2. Pour $n = 0$ : $0$ est divisible par $4$. Si $5^n - 1 = 4k$, alors $5^{n + 1} - 1 = 5 \times 5^n - 1 = 5(4k + 1) - 1 = 20k + 4 = 4(5k + 1)$.
:::
:::
