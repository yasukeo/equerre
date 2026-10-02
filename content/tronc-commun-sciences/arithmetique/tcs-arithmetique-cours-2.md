---
title: Arithmétique dans ℕ — partie 2 : décomposition, PGCD et PPCM
kind: cours
summary: Décomposition en produit de facteurs premiers, nombre de diviseurs, PGCD et PPCM à partir des décompositions, nombres premiers entre eux, fractions irréductibles et problèmes concrets.
position: 20
visibility: public
---

## Décomposition en facteurs premiers

:::theoreme
Tout entier naturel supérieur ou égal à $2$ s’écrit comme un produit de nombres premiers, et cette écriture est unique à l’ordre près des facteurs.
:::

:::exemple
On divise par les nombres premiers dans l’ordre : $360 = 2 \times 180 = 2^2 \times 90 = 2^3 \times 45 = 2^3 \times 3 \times 15 = 2^3 \times 3^2 \times 5$.
:::

:::propriete
Si $n = p_1^{a_1} \times p_2^{a_2} \times \cdots \times p_k^{a_k}$, le nombre de diviseurs de $n$ est $(a_1 + 1)(a_2 + 1) \cdots (a_k + 1)$.
:::

:::exemple
$360 = 2^3 \times 3^2 \times 5$ a $(3 + 1)(2 + 1)(1 + 1) = 24$ diviseurs.
:::

## PGCD et PPCM

:::definition
- Le **PGCD** de $a$ et $b$ est le plus grand de leurs diviseurs communs.
- Le **PPCM** de $a$ et $b$ est le plus petit de leurs multiples communs non nuls.
:::

:::propriete
À partir des décompositions :

- le PGCD est le produit des facteurs premiers **communs**, chacun avec son **plus petit** exposant ;
- le PPCM est le produit de **tous** les facteurs premiers, chacun avec son **plus grand** exposant.

De plus, $\operatorname{PGCD}(a ; b) \times \operatorname{PPCM}(a ; b) = a \times b$.
:::

:::exemple
$360 = 2^3 \times 3^2 \times 5$ et $84 = 2^2 \times 3 \times 7$.

- $\operatorname{PGCD}(360 ; 84) = 2^2 \times 3 = 12$.
- $\operatorname{PPCM}(360 ; 84) = 2^3 \times 3^2 \times 5 \times 7 = 2\,520$.
- Vérification : $12 \times 2\,520 = 30\,240 = 360 \times 84$.
:::

## Nombres premiers entre eux et fractions

:::definition
Deux entiers sont **premiers entre eux** si leur PGCD vaut $1$.
:::

:::propriete
Pour rendre une fraction irréductible, on divise le numérateur et le dénominateur par leur PGCD. Pour additionner deux fractions, le plus petit dénominateur commun est le PPCM des dénominateurs.
:::

:::exemple
- $\frac{84}{360} = \frac{84 \div 12}{360 \div 12} = \frac{7}{30}$, et $7$ et $30$ sont premiers entre eux.
- $\frac{1}{84} + \frac{1}{360} = \frac{30}{2\,520} + \frac{7}{2\,520} = \frac{37}{2\,520}$.
:::

## Problèmes

:::exemple
**Avec le PGCD.** On veut découper une plaque de $84$ cm sur $60$ cm en carrés identiques, les plus grands possible, sans perte. Le côté du carré doit diviser $84$ et $60$ : c’est $\operatorname{PGCD}(84 ; 60) = 12$ cm, et on obtient $7 \times 5 = 35$ carrés.
:::

:::exemple
**Avec le PPCM.** Deux feux clignotent toutes les $12$ s et toutes les $18$ s. Ils clignotent ensemble à l’instant $0$, puis à nouveau après $\operatorname{PPCM}(12 ; 18) = 36$ s.
:::
