---
title: Statistiques — partie 1 : vocabulaire, effectifs et représentations
kind: cours
summary: Population, individu, caractère qualitatif ou quantitatif, discret ou continu, effectifs et fréquences, effectifs et fréquences cumulés, et les représentations graphiques usuelles.
position: 10
visibility: public
---

## Vocabulaire

:::definition
- La **population** est l’ensemble étudié ; chacun de ses éléments est un **individu**. Le nombre d’individus est l’**effectif total** $N$.
- Le **caractère** est ce qu’on observe sur chaque individu. Il est **qualitatif** (couleur, filière…) ou **quantitatif** (note, taille…).
- Un caractère quantitatif est **discret** s’il prend des valeurs isolées (nombre d’enfants), **continu** s’il peut prendre toutes les valeurs d’un intervalle (taille) ; on regroupe alors les valeurs en **classes** $[a ; b[$.
:::

## Effectifs et fréquences

:::definition
- L’**effectif** $n_i$ d’une valeur $x_i$ est le nombre d’individus qui ont cette valeur.
- Sa **fréquence** est $f_i = \frac{n_i}{N}$ ; la somme des fréquences vaut $1$ (ou $100\,\%$).
- L’**effectif cumulé croissant** d’une valeur est la somme des effectifs des valeurs inférieures ou égales à elle.
:::

:::exemple
Notes de $20$ élèves : la note $8$ est obtenue $2$ fois, $10$ : $5$ fois, $12$ : $7$ fois, $14$ : $4$ fois, $16$ : $2$ fois.

- Fréquences : $0{,}10$ ; $0{,}25$ ; $0{,}35$ ; $0{,}20$ ; $0{,}10$.
- Effectifs cumulés croissants : $2$ ; $7$ ; $14$ ; $18$ ; $20$.
- Fréquences cumulées croissantes : $0{,}10$ ; $0{,}35$ ; $0{,}70$ ; $0{,}90$ ; $1$.
:::

## Représentations graphiques

:::propriete
- **Diagramme en bâtons** (caractère discret) : un bâton de hauteur $n_i$ au-dessus de chaque valeur $x_i$.
- **Histogramme** (caractère continu) : sur chaque classe, un rectangle dont l’**aire** est proportionnelle à l’effectif.
- **Diagramme circulaire** : chaque valeur occupe un secteur d’angle $360° \times f_i$.
- **Polygone des effectifs cumulés croissants** : on relie les points dont l’abscisse est la borne supérieure de chaque classe et l’ordonnée l’effectif cumulé.
:::

:::exemple
Dans le diagramme circulaire des notes précédentes, la note $12$ occupe un secteur de $360° \times 0{,}35 = 126°$.
:::

:::attention
Dans un histogramme à classes d’amplitudes différentes, c’est l’aire des rectangles, et non leur hauteur, qui représente l’effectif.
:::
