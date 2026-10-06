---
title: Fonction linéaire et fonction affine — partie 2 : la fonction affine
kind: cours
summary: Fonction affine, coefficient et ordonnée à l’origine, calcul du coefficient à partir de deux valeurs, représentation graphique, et comparaison de deux tarifs.
position: 20
visibility: public
---

## Définition

:::definition
Soit $a$ et $b$ deux nombres. La fonction $f : x \mapsto ax + b$ est une **fonction affine**. Le nombre $a$ est son **coefficient**, et $b = f(0)$ son **ordonnée à l’origine**.
:::

:::propriete
- Si $b = 0$, la fonction est linéaire : $x \mapsto ax$.
- Si $a = 0$, la fonction est constante : $x \mapsto b$.
:::

:::exemple
$g(x) = 2x - 3$ : $g(0) = -3$ et $g(4) = 5$. L’antécédent de $7$ vérifie $2x - 3 = 7$, donc $x = 5$.
:::

## Trouver une fonction affine

:::propriete
Si $f$ est affine, pour deux nombres $x_1 \neq x_2$ :

$$
a = \frac{f(x_2) - f(x_1)}{x_2 - x_1}
$$

Puis on trouve $b$ en remplaçant $x$ par une valeur connue.
:::

:::exemple
$f$ est affine, $f(1) = 4$ et $f(3) = 10$. Alors $a = \frac{10 - 4}{3 - 1} = 3$, et $f(1) = 3 + b = 4$ donne $b = 1$ : $f(x) = 3x + 1$.
:::

## Représentation graphique

:::propriete
La représentation graphique d’une fonction affine est une **droite**. Elle coupe l’axe des ordonnées au point $(0 ; b)$, et sa pente est $a$ : quand $x$ augmente de $1$, $f(x)$ augmente de $a$.
:::

:::exemple
Une droite passe par $(0 ; 2)$ et $(3 ; 8)$ : $b = 2$ et $a = \frac{8 - 2}{3} = 2$. C’est la représentation de $x \mapsto 2x + 2$.
:::

## Comparer deux tarifs

:::exemple
Une bibliothèque propose : tarif A, $15$ dirhams par livre ; tarif B, un abonnement de $60$ dirhams puis $5$ dirhams par livre. Pour $x$ livres : $A(x) = 15x$ (linéaire) et $B(x) = 5x + 60$ (affine). Les tarifs sont égaux quand $15x = 5x + 60$, soit $x = 6$ livres. En dessous, A est moins cher ; au-dessus, B l’est.
:::
