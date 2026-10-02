---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets : l’étude d’un polynôme du troisième degré avec ses tangentes, puis le volume maximal d’une boîte, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un polynôme du troisième degré
Soit $f(x) = x^3 - 6x^2 + 9x + 1$ sur $\mathbb{R}$.

1. Montrer que $f'(x) = 3(x - 1)(x - 3)$.
2. Étudier le signe de $f'(x)$ et donner les variations de $f$.
3. Calculer le maximum local et le minimum local.
4. Donner l’équation de la tangente au point d’abscisse $0$.
5. En quels points la courbe a-t-elle une tangente horizontale ?

:::corrige
1. $f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3)$.
2. $f'(x)$ est positive à l’extérieur de $1$ et $3$, négative entre eux : $f$ est croissante sur $]-\infty ; 1]$, décroissante sur $[1 ; 3]$, croissante sur $[3 ; +\infty[$.
3. Maximum local $f(1) = 1 - 6 + 9 + 1 = 5$ ; minimum local $f(3) = 27 - 54 + 27 + 1 = 1$.
4. $f(0) = 1$ et $f'(0) = 9$ : $y = 9x + 1$.
5. Là où $f'(x) = 0$ : aux points $(1 ; 5)$ et $(3 ; 1)$.
:::
:::

:::exercice Problème 2 : la boîte la plus grande
Dans une feuille carrée de $12$ cm de côté, on découpe aux quatre coins un carré de côté $x$ cm, puis on replie les bords pour obtenir une boîte sans couvercle. On a $0 < x < 6$.

1. Expliquer pourquoi le volume de la boîte est $V(x) = x(12 - 2x)^2$, puis montrer que $V(x) = 4x^3 - 48x^2 + 144x$.
2. Montrer que $V'(x) = 12(x - 2)(x - 6)$.
3. Étudier les variations de $V$ sur $]0 ; 6[$.
4. Pour quelle valeur de $x$ le volume est-il maximal ? Quel est ce volume ?

:::corrige
1. Le fond est un carré de côté $12 - 2x$ et la hauteur vaut $x$. En développant : $(12 - 2x)^2 = 144 - 48x + 4x^2$, donc $V(x) = 4x^3 - 48x^2 + 144x$.
2. $V'(x) = 12x^2 - 96x + 144 = 12(x^2 - 8x + 12) = 12(x - 2)(x - 6)$.
3. Sur $]0 ; 6[$, $x - 6 < 0$ ; donc $V'(x) > 0$ pour $x < 2$ et $V'(x) < 0$ pour $x > 2$. $V$ est croissante sur $]0 ; 2]$ et décroissante sur $[2 ; 6[$.
4. Le maximum est $V(2) = 2 \times 8^2 = 128$ : en découpant des carrés de $2$ cm, on obtient une boîte de $128$ cm³.
:::
:::
