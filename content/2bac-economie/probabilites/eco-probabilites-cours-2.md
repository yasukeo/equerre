---
title: Dénombrement et probabilités — partie 2 : conditionnement et variables aléatoires
kind: cours
summary: Probabilité conditionnelle, arbre pondéré, probabilités totales, indépendance, épreuves répétées, variable aléatoire, loi, espérance, variance et loi binomiale.
position: 20
visibility: public
---
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

## Arbre pondéré

Une expérience en plusieurs étapes se représente par un **arbre pondéré** : sur chaque branche, on écrit la probabilité conditionnelle de l’événement auquel elle mène.

- La somme des probabilités des branches issues d’un même nœud vaut $1$.
- La probabilité d’un chemin est le produit des probabilités de ses branches : $p(A \cap B) = p(A) \times p_A(B)$.
- La probabilité d’un événement est la somme des probabilités des chemins qui y mènent (probabilités totales).

:::exemple
Un test de dépistage détecte une maladie chez $95\,\%$ des malades, et se trompe chez $2\,\%$ des personnes saines. La maladie touche $1\,\%$ de la population. Avec $M$ : « malade » et $T$ : « test positif » :

$$
p(T) = 0{,}01 \times 0{,}95 + 0{,}99 \times 0{,}02 = 0{,}0095 + 0{,}0198 = 0{,}0293
$$

et $p_T(M) = \frac{0{,}0095}{0{,}0293} \approx 0{,}32$ : un test positif ne signifie être malade qu’une fois sur trois environ.
:::

## Variable aléatoire : un exemple complet

:::exemple
Un jeu coûte $2$ dirhams. On lance un dé équilibré : on gagne $10$ dirhams si l’on obtient $6$, $2$ dirhams si l’on obtient $5$, rien sinon. Le gain net $X$ prend les valeurs $8$, $0$ et $-2$ :

- $p(X = 8) = \frac{1}{6}$, $p(X = 0) = \frac{1}{6}$, $p(X = -2) = \frac{4}{6}$ ;
- $E(X) = \frac{8 + 0 - 8}{6} = 0$ : le jeu est équitable ;
- $V(X) = \frac{64 + 0 + 4 \times 4}{6} - 0 = \frac{80}{6} = \frac{40}{3}$.
:::

:::attention
Dans une loi de probabilité, la somme des probabilités vaut $1$ : c’est la première vérification à faire. Et l’indépendance ($p(A \cap B) = p(A)p(B)$) n’est pas l’incompatibilité ($A \cap B = \varnothing$).
:::
