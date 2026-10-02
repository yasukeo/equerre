---
title: Généralités sur les fonctions — partie 2 : fonctions de référence et lectures graphiques
kind: cours
summary: Fonctions affines, carré, trinôme et sommet de la parabole, inverse, racine carrée et cube, puis résolution graphique d’équations et d’inéquations et position relative de deux courbes.
position: 20
visibility: public
---

## Les fonctions de référence

:::propriete
- **Affine** $x \mapsto ax + b$ : une droite ; croissante si $a > 0$, décroissante si $a < 0$.
- **Carré** $x \mapsto x^2$ : une parabole ; paire ; décroissante sur $]-\infty ; 0]$, croissante sur $[0 ; +\infty[$ ; minimum $0$ en $0$.
- **Inverse** $x \mapsto \frac{1}{x}$ : une hyperbole ; impaire ; décroissante sur $]-\infty ; 0[$ et sur $]0 ; +\infty[$.
- **Racine carrée** $x \mapsto \sqrt{x}$ : croissante sur $[0 ; +\infty[$.
- **Cube** $x \mapsto x^3$ : impaire ; croissante sur $\mathbb{R}$.
:::

:::exemple
Sans calculer : $1{,}2^2 < 1{,}3^2$, car la fonction carré est croissante sur $[0 ; +\infty[$ ; et $\frac{1}{2{,}5} > \frac{1}{3{,}1}$, car la fonction inverse est décroissante sur $]0 ; +\infty[$.
:::

## La fonction trinôme

:::propriete
La courbe de $f(x) = ax^2 + bx + c$ ($a \neq 0$) est une **parabole** de sommet $S(\alpha ; f(\alpha))$, avec $\alpha = -\frac{b}{2a}$, et d’axe de symétrie la droite $x = \alpha$.

- Si $a > 0$ : $f$ décroît sur $]-\infty ; \alpha]$, croît sur $[\alpha ; +\infty[$, et $f(\alpha)$ est son **minimum**.
- Si $a < 0$ : $f$ croît sur $]-\infty ; \alpha]$, décroît sur $[\alpha ; +\infty[$, et $f(\alpha)$ est son **maximum**.
:::

:::exemple
- $f(x) = x^2 - 4x + 3$ : $\alpha = \frac{4}{2} = 2$ et $f(2) = -1$. Sommet $S(2 ; -1)$ ; $f$ décroît puis croît ; minimum $-1$.
- $g(x) = -2x^2 + 4x + 1$ : $\alpha = \frac{-4}{-4} = 1$ et $g(1) = 3$. $g$ croît puis décroît ; maximum $3$.
:::

## Résolution graphique

:::propriete
- Les solutions de $f(x) = k$ sont les **abscisses** des points d’intersection de $C_f$ avec la droite horizontale $y = k$.
- Les solutions de $f(x) = g(x)$ sont les abscisses des points d’intersection de $C_f$ et $C_g$.
- Les solutions de $f(x) > g(x)$ sont les abscisses des points où $C_f$ est **au-dessus** de $C_g$.
:::

## Position relative de deux courbes

:::propriete
Pour comparer $C_f$ et $C_g$, on étudie le signe de $f(x) - g(x)$ : positif, $C_f$ est au-dessus ; négatif, $C_f$ est au-dessous ; nul, les courbes se coupent.
:::

:::exemple
$f(x) = x^2$ et $g(x) = x + 2$ : $f(x) - g(x) = x^2 - x - 2 = (x - 2)(x + 1)$.

- Les courbes se coupent aux points d’abscisses $-1$ et $2$, soit $(-1 ; 1)$ et $(2 ; 4)$.
- Sur $]-1 ; 2[$, le produit est négatif : $C_f$ est au-dessous de $C_g$.
- Sur $]-\infty ; -1[$ et sur $]2 ; +\infty[$, il est positif : $C_f$ est au-dessus.
:::

:::attention
Une lecture graphique donne des valeurs approchées : quand c’est possible, on confirme par le calcul.
:::
