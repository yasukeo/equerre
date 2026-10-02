---
title: Dénombrement — partie 1 : cardinaux et principe multiplicatif
kind: cours
summary: Cardinal d’un ensemble fini, cardinal d’une réunion et du complémentaire, principe multiplicatif, cardinal d’un produit cartésien, p-listes et nombre d’applications.
position: 10
visibility: public
---

## Cardinal d’un ensemble fini

:::definition
Le **cardinal** d’un ensemble fini $E$, noté $\operatorname{card}(E)$, est le nombre de ses éléments. $\operatorname{card}(\varnothing) = 0$.
:::

:::propriete
Pour deux parties finies $A$ et $B$ d’un ensemble $E$ fini :

- $\operatorname{card}(A \cup B) = \operatorname{card}(A) + \operatorname{card}(B) - \operatorname{card}(A \cap B)$ ;
- si $A$ et $B$ sont **disjointes**, $\operatorname{card}(A \cup B) = \operatorname{card}(A) + \operatorname{card}(B)$ ;
- $\operatorname{card}(\overline{A}) = \operatorname{card}(E) - \operatorname{card}(A)$.
:::

:::exemple
Dans une classe de $35$ élèves, $20$ font du football, $12$ du basket et $5$ les deux. Le nombre d’élèves qui pratiquent au moins un des deux sports est $20 + 12 - 5 = 27$ ; $35 - 27 = 8$ n’en pratiquent aucun.
:::

## Principe multiplicatif

:::propriete
Si une situation se décompose en $p$ choix successifs, avec $n_1$ possibilités pour le premier, $n_2$ pour le deuxième (quel que soit le premier choix), …, $n_p$ pour le dernier, le nombre total de possibilités est $n_1 \times n_2 \times \cdots \times n_p$.

En particulier, $\operatorname{card}(E \times F) = \operatorname{card}(E) \times \operatorname{card}(F)$.
:::

:::exemple
Une plaque comporte $2$ lettres (parmi $26$) puis $3$ chiffres : $26^2 \times 10^3 = 676\,000$ plaques.
:::

## p-listes

:::definition
Une **$p$-liste** (ou $p$-uplet) d’éléments d’un ensemble $E$ est une suite ordonnée $(x_1, \ldots, x_p)$ d’éléments de $E$, les répétitions étant permises.
:::

:::propriete
Si $\operatorname{card}(E) = n$, il y a $n^p$ $p$-listes d’éléments de $E$. C’est aussi le nombre d’applications d’un ensemble à $p$ éléments dans $E$.
:::

:::exemple
- On lance $3$ fois un dé : $6^3 = 216$ résultats ordonnés.
- On range $5$ lettres dans $3$ boîtes (sans contrainte) : chaque lettre a $3$ choix, soit $3^5 = 243$ rangements.
- Un ensemble à $n$ éléments a $2^n$ parties : choisir une partie revient à dire, pour chaque élément, « dedans » ou « dehors ».
:::

:::attention
Le principe multiplicatif suppose que le nombre de possibilités à chaque étape ne dépend pas des choix précédents. Sinon, on fait un arbre et on compte branche par branche.
:::
