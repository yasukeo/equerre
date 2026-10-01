---
title: Dénombrement et probabilités
kind: cours
summary: Principe du produit, arrangements, permutations et combinaisons ; probabilités, probabilités conditionnelles, indépendance, épreuves répétées et variables aléatoires.
position: 20
visibility: public
---

## Dénombrement

### Principe du produit

:::propriete
Si une expérience se déroule en $p$ étapes, la première ayant $n_1$ issues possibles, la deuxième $n_2$, …, la $p$-ième $n_p$, alors le nombre total d’issues est $n_1 \times n_2 \times \cdots \times n_p$.
:::

### Tirages

Dans un ensemble de $n$ éléments, on tire $p$ éléments.

:::propriete
- **Successivement avec remise** (l’ordre compte, répétitions possibles) : $n^p$ tirages.
- **Successivement sans remise** (l’ordre compte, sans répétition) : $A_n^p = n(n - 1)\cdots(n - p + 1) = \frac{n!}{(n - p)!}$ arrangements, pour $p \leq n$.
- **Simultanément** (l’ordre ne compte pas) : $C_n^p = \frac{A_n^p}{p!} = \frac{n!}{p!\,(n - p)!}$ combinaisons.
:::

:::definition
Pour $n \in \mathbb{N}^*$, $n! = 1 \times 2 \times \cdots \times n$, et $0! = 1$. Le nombre de façons d’ordonner $n$ éléments (**permutations**) est $n!$.
:::

:::propriete
$C_n^0 = C_n^n = 1$, $C_n^1 = n$, $C_n^p = C_n^{n - p}$ et $C_n^p + C_n^{p + 1} = C_{n + 1}^{p + 1}$.
:::

:::exemple
Une urne contient $5$ boules rouges et $3$ vertes. On tire simultanément $2$ boules : il y a $C_8^2 = 28$ tirages. Ceux qui donnent deux boules rouges sont au nombre de $C_5^2 = 10$.
:::

## Probabilités

:::definition
Soit $\Omega$ l’ensemble fini des issues d’une expérience aléatoire (l’**univers**). Un **événement** est une partie de $\Omega$. Une **probabilité** associe à chaque événement $A$ un réel $p(A) \in [0 ; 1]$, avec $p(\Omega) = 1$ et $p(A \cup B) = p(A) + p(B)$ si $A \cap B = \varnothing$.
:::

:::propriete
- $p(\varnothing) = 0$ et $p(\bar{A}) = 1 - p(A)$.
- $p(A \cup B) = p(A) + p(B) - p(A \cap B)$.
- En cas d’**équiprobabilité** : $p(A) = \dfrac{\operatorname{card}(A)}{\operatorname{card}(\Omega)}$.
:::

:::exemple
Avec l’urne précédente, la probabilité de tirer deux boules rouges est $\frac{10}{28} = \frac{5}{14}$.
:::

## Probabilités conditionnelles

:::definition
Soit $A$ un événement de probabilité non nulle. La probabilité de $B$ **sachant** $A$ est :

$$
p_A(B) = p(B / A) = \frac{p(A \cap B)}{p(A)}
$$
:::

:::propriete
- $p(A \cap B) = p(A) \times p_A(B)$.
- **Probabilités totales** : si $A_1, \dots, A_n$ forment une partition de $\Omega$, alors $p(B) = p(A_1) p_{A_1}(B) + \cdots + p(A_n) p_{A_n}(B)$.
:::

:::exemple
On tire successivement et sans remise deux boules de l’urne précédente. Soit $R_1$ : « la première est rouge » et $R_2$ : « la deuxième est rouge ».

$$
p(R_2) = p(R_1) p_{R_1}(R_2) + p(\bar{R_1}) p_{\bar{R_1}}(R_2) = \frac{5}{8} \times \frac{4}{7} + \frac{3}{8} \times \frac{5}{7} = \frac{35}{56} = \frac{5}{8}
$$
:::

## Indépendance

:::definition
Deux événements $A$ et $B$ sont **indépendants** si $p(A \cap B) = p(A) \times p(B)$. Si $p(A) \neq 0$, cela revient à $p_A(B) = p(B)$.
:::

## Épreuves répétées

:::theoreme
On répète $n$ fois, de façon indépendante, une épreuve dont un événement $A$ a la probabilité $p$. La probabilité que $A$ se réalise exactement $k$ fois ($0 \leq k \leq n$) est :

$$
C_n^k \, p^k (1 - p)^{n - k}
$$
:::

:::exemple
On lance $4$ fois un dé équilibré. La probabilité d’obtenir exactement deux fois le $6$ est $C_4^2 \left(\frac{1}{6}\right)^2 \left(\frac{5}{6}\right)^2 = 6 \times \frac{25}{1296} = \frac{25}{216}$.
:::

## Variables aléatoires

:::definition
Une **variable aléatoire** $X$ associe un réel à chaque issue. Sa **loi de probabilité** donne, pour chaque valeur $x_i$ qu’elle prend, la probabilité $p(X = x_i)$.
:::

:::definition
Si $X$ prend les valeurs $x_1, \dots, x_n$ avec les probabilités $p_1, \dots, p_n$ :

- son **espérance** est $E(X) = \sum_{i = 1}^{n} x_i p_i$ ;
- sa **variance** est $V(X) = \sum_{i = 1}^{n} x_i^2 p_i - \left(E(X)\right)^2$ ;
- son **écart type** est $\sigma(X) = \sqrt{V(X)}$.
:::

:::propriete
**Loi binomiale.** Si $X$ compte le nombre de réalisations de $A$ au cours de $n$ épreuves répétées indépendantes où $p(A) = p$, alors $p(X = k) = C_n^k p^k (1 - p)^{n - k}$, et :

$$
E(X) = np \qquad V(X) = np(1 - p)
$$
:::

:::exemple
Dans l’exemple du dé, $X$ = nombre de $6$ obtenus en $4$ lancers suit la loi binomiale de paramètres $4$ et $\frac{1}{6}$ : $E(X) = \frac{4}{6} = \frac{2}{3}$ et $V(X) = 4 \times \frac{1}{6} \times \frac{5}{6} = \frac{5}{9}$.
:::
