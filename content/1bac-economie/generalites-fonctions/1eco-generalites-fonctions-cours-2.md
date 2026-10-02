---
title: Généralités sur les fonctions — partie 2 : fonctions de référence et courbes
kind: cours
summary: Fonction trinôme et forme canonique, fonction homographique, fonctions x³ et √(x + a), axe et centre de symétrie, courbes obtenues par translation, résolution graphique d’équations et d’inéquations.
position: 20
visibility: public
---

## La fonction trinôme x ↦ ax² + bx + c

:::propriete
Pour $a \neq 0$, $ax^2 + bx + c = a(x - \alpha)^2 + \beta$ avec $\alpha = -\frac{b}{2a}$ et $\beta = f(\alpha)$ : c’est la **forme canonique**. La courbe est une **parabole** de sommet $S(\alpha ; \beta)$ et d’axe de symétrie la droite $x = \alpha$.

- Si $a > 0$ : $f$ décroît sur $]-\infty ; \alpha]$, croît sur $[\alpha ; +\infty[$, minimum $\beta$.
- Si $a < 0$ : $f$ croît puis décroît, maximum $\beta$.
:::

:::exemple
$f(x) = 2x^2 - 8x + 5 = 2(x - 2)^2 - 3$ : parabole de sommet $S(2 ; -3)$, minimum $-3$.
:::

## La fonction homographique x ↦ (ax + b)/(cx + d)

:::propriete
Pour $c \neq 0$ et $ad - bc \neq 0$, $f(x) = \frac{ax + b}{cx + d}$ est définie sur $\mathbb{R} \setminus \left\{-\frac{d}{c}\right\}$. On peut l’écrire $f(x) = \beta + \frac{k}{x - \alpha}$, avec $\alpha = -\frac{d}{c}$ et $\beta = \frac{a}{c}$. Sa courbe est une **hyperbole** de centre de symétrie $\Omega(\alpha ; \beta)$, avec deux asymptotes : $x = \alpha$ et $y = \beta$.

$f$ est monotone sur chacun des intervalles $]-\infty ; \alpha[$ et $]\alpha ; +\infty[$ : décroissante si $k > 0$, croissante si $k < 0$.
:::

:::exemple
$f(x) = \frac{2x + 1}{x - 1} = 2 + \frac{3}{x - 1}$ : centre $\Omega(1 ; 2)$, $k = 3 > 0$, donc $f$ est décroissante sur $]-\infty ; 1[$ et sur $]1 ; +\infty[$.
:::

## Les fonctions x ↦ x³ et x ↦ √(x + a)

:::propriete
- $x \mapsto x^3$ est définie sur $\mathbb{R}$, impaire et strictement croissante ; sa courbe passe par l’origine, centre de symétrie.
- $x \mapsto \sqrt{x + a}$ est définie sur $[-a ; +\infty[$ et strictement croissante ; sa courbe est celle de $\sqrt{x}$ translatée de $a$ vers la gauche.
:::

## Éléments de symétrie

:::propriete
Soit $f$ définie sur $D$.

- La droite $x = a$ est un **axe de symétrie** de la courbe si, pour tout $x \in D$, $2a - x \in D$ et $f(2a - x) = f(x)$.
- Le point $\Omega(a ; b)$ est un **centre de symétrie** si, pour tout $x \in D$, $2a - x \in D$ et $f(2a - x) + f(x) = 2b$.
:::

:::exemple
$f(x) = x^2 - 6x + 1$ : $f(6 - x) = (6 - x)^2 - 6(6 - x) + 1 = x^2 - 6x + 1 = f(x)$ : la droite $x = 3$ est axe de symétrie.
:::

## Courbes et translations

:::propriete
- La courbe de $x \mapsto f(x) + b$ s’obtient en translatant celle de $f$ de $b$ verticalement.
- La courbe de $x \mapsto f(x - a)$ s’obtient en translatant celle de $f$ de $a$ horizontalement.
:::

## Résolution graphique

- Les solutions de $f(x) = k$ sont les abscisses des points d’intersection de la courbe de $f$ avec la droite $y = k$.
- Les solutions de $f(x) = g(x)$ sont les abscisses des points d’intersection des deux courbes ; celles de $f(x) < g(x)$, les abscisses où la courbe de $f$ est au-dessous de celle de $g$.

:::attention
Une lecture graphique donne des valeurs approchées : pour une valeur exacte, on résout par le calcul.
:::
