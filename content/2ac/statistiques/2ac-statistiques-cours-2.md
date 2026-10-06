---
title: Statistiques — partie 2 : moyenne, médiane, mode et étendue
kind: cours
summary: Moyenne simple et moyenne pondérée, moyenne d’une série en classes, médiane, mode et étendue, et l’effet d’une valeur extrême.
position: 20
visibility: public
---

## La moyenne

:::propriete
- Moyenne simple : la somme des valeurs divisée par leur nombre.
- Moyenne pondérée par les effectifs : $\bar{x} = \frac{n_1x_1 + n_2x_2 + \cdots + n_px_p}{N}$.
- Pour une série en classes, on remplace chaque classe par son **centre**.
:::

:::exemple
Notes de $25$ élèves : $8$ (×$3$), $10$ (×$5$), $12$ (×$8$), $14$ (×$6$), $16$ (×$3$). Moyenne : $\frac{24 + 50 + 96 + 84 + 48}{25} = \frac{302}{25} = 12{,}08$.
:::

## La médiane

:::definition
La **médiane** partage la série rangée dans l’ordre en deux groupes de même effectif.

- Si $N$ est impair, c’est la valeur de rang $\frac{N + 1}{2}$.
- Si $N$ est pair, c’est la moyenne des valeurs de rangs $\frac{N}{2}$ et $\frac{N}{2} + 1$.
:::

:::exemple
Pour les $25$ notes : la médiane est la valeur de rang $13$. Les effectifs cumulés sont $3$, $8$, $16$… : le rang $13$ correspond à la note $12$. La médiane vaut $12$.
:::

## Mode et étendue

:::definition
- Le **mode** est la valeur qui a le plus grand effectif.
- L’**étendue** est la différence entre la plus grande et la plus petite valeur.
:::

:::exemple
Pour les notes : mode $12$, étendue $16 - 8 = 8$.
:::

## Une valeur extrême

:::exemple
Salaires de cinq employés, en dirhams : $3\,000$, $3\,200$, $3\,500$, $3\,800$ et $15\,000$. Moyenne : $\frac{28\,500}{5} = 5\,700$. Médiane : $3\,500$. Le salaire très élevé fait monter la moyenne, mais pas la médiane.
:::

:::attention
Pour la médiane, on range d’abord les valeurs dans l’ordre croissant.
:::
