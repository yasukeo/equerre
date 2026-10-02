---
title: Série 1 — partie 2 : droites et plans
kind: serie
summary: Représentations paramétriques, équation cartésienne d’un plan par le déterminant, intersection d’une droite et d’un plan, positions relatives de deux plans et de deux droites, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours. L’espace est muni d’un repère.

:::exercice Représentations paramétriques
1. Donner une représentation paramétrique de la droite $(AB)$, avec $A(1 ; -2 ; 0)$ et $B(3 ; 0 ; 1)$.
2. Le point $C(5 ; 2 ; 2)$ est-il sur $(AB)$ ? Et $D(0 ; -3 ; 1)$ ?

:::corrige
1. $\overrightarrow{AB}(2 ; 2 ; 1)$ : $x = 1 + 2t$, $y = -2 + 2t$, $z = t$.
2. Pour $C$ : $t = 2$ convient pour les trois coordonnées, $C \in (AB)$. Pour $D$ : $z = 1$ donne $t = 1$, mais alors $x = 3 \neq 0$ : $D \notin (AB)$.
:::
:::

:::exercice Équation d’un plan
Déterminer une équation cartésienne du plan $(ABC)$, avec $A(1 ; 0 ; 1)$, $B(2 ; 1 ; 1)$ et $C(1 ; 2 ; 3)$.

:::corrige
$\overrightarrow{AB}(1 ; 1 ; 0)$, $\overrightarrow{AC}(0 ; 2 ; 2)$, $\overrightarrow{AM}(x - 1 ; y ; z - 1)$. On développe selon la première colonne :

$$
(x - 1)\begin{vmatrix} 1 & 2 \\ 0 & 2 \end{vmatrix} - y\begin{vmatrix} 1 & 0 \\ 0 & 2 \end{vmatrix} + (z - 1)\begin{vmatrix} 1 & 0 \\ 1 & 2 \end{vmatrix} = 2(x - 1) - 2y + 2(z - 1)
$$

Équation : $x - y + z - 2 = 0$. Vérification avec $B$ : $2 - 1 + 1 - 2 = 0$ ; avec $C$ : $1 - 2 + 3 - 2 = 0$.
:::
:::

:::exercice Droite et plan
Soit $(P) : 2x - y + z - 3 = 0$ et la droite $(D) : x = 1 + t$, $y = 2 - t$, $z = 3t$.

1. Déterminer l’intersection de $(D)$ et $(P)$.
2. La droite $(\Delta) : x = t$, $y = 1 + 2t$, $z = 5$ est-elle parallèle à $(P)$ ?

:::corrige
1. $2(1 + t) - (2 - t) + 3t - 3 = 6t - 3 = 0$, donc $t = \frac{1}{2}$ : le point $\left(\frac{3}{2} ; \frac{3}{2} ; \frac{3}{2}\right)$.
2. $2t - (1 + 2t) + 5 - 3 = 1 \neq 0$ pour tout $t$ : aucun point commun, $(\Delta)$ est strictement parallèle à $(P)$.
:::
:::

:::exercice Positions relatives
1. Les plans $(P_1) : x + 2y - z + 1 = 0$ et $(P_2) : -2x - 4y + 2z + 5 = 0$ sont-ils parallèles ?
2. Les droites $(D_1) : x = 1 + t$, $y = t$, $z = 2$ et $(D_2) : x = 2s$, $y = 1 - s$, $z = 1 + s$ sont-elles sécantes ?

:::corrige
1. $(-2 ; -4 ; 2) = -2(1 ; 2 ; -1)$ : parallèles ; et $-2 \times 1 \neq 5$, donc les équations ne sont pas proportionnelles : strictement parallèles.
2. Vecteurs directeurs $(1 ; 1 ; 0)$ et $(2 ; -1 ; 1)$ non colinéaires. $z$ : $2 = 1 + s$, donc $s = 1$ ; puis $x$ : $1 + t = 2$, $t = 1$ ; et $y$ : $t = 1 - s = 0 \neq 1$ : contradiction. Pas de point commun : elles ne sont pas coplanaires.
:::
:::
