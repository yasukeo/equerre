---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : un polynôme bicarré factorisé et son signe, puis un polynôme dont on impose deux racines pour trouver ses coefficients et la troisième racine, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un polynôme bicarré
Soit $P(x) = x^4 - 5x^2 + 4$.

1. En posant $X = x^2$, montrer que $P(x) = (x^2 - 1)(x^2 - 4)$.
2. Factoriser $P(x)$ en produit de quatre facteurs du premier degré.
3. Montrer que $P$ est pair.
4. Étudier le signe de $P(x)$ et résoudre $P(x) < 0$.

:::corrige
1. $X^2 - 5X + 4 = (X - 1)(X - 4)$, donc $P(x) = (x^2 - 1)(x^2 - 4)$.
2. $P(x) = (x - 1)(x + 1)(x - 2)(x + 2)$.
3. $P(-x) = x^4 - 5x^2 + 4 = P(x)$.
4. Les racines sont $-2$, $-1$, $1$, $2$. En partant de la droite, où tous les facteurs sont positifs, le signe change à chaque racine : positif sur $]2 ; +\infty[$, négatif sur $]1 ; 2[$, positif sur $]-1 ; 1[$, négatif sur $]-2 ; -1[$, positif sur $]-\infty ; -2[$. Donc $P(x) < 0 \iff x \in ]-2 ; -1[ \cup ]1 ; 2[$.
:::
:::

:::exercice Problème 2 : des racines imposées
Soit $P(x) = x^3 + ax^2 + bx - 6$, où $a$ et $b$ sont des réels.

1. Écrire les conditions pour que $1$ et $-2$ soient des racines de $P$.
2. En déduire $a$ et $b$.
3. Factoriser $P(x)$ et donner sa troisième racine.

:::corrige
1. $P(1) = 1 + a + b - 6 = 0$, soit $a + b = 5$ ; $P(-2) = -8 + 4a - 2b - 6 = 0$, soit $2a - b = 7$.
2. En additionnant : $3a = 12$, donc $a = 4$ et $b = 1$. Ainsi $P(x) = x^3 + 4x^2 + x - 6$.
3. $P(x) = (x - 1)(x + 2)(x + c)$ ; le terme constant vaut $(-1) \times 2 \times c = -6$, donc $c = 3$. Vérification : $(x^2 + x - 2)(x + 3) = x^3 + 4x^2 + x - 6$. La troisième racine est $-3$.
:::
:::
