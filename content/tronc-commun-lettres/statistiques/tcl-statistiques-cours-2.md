---
title: Statistiques — partie 2 : paramètres de position et de dispersion
kind: cours
summary: Mode, moyenne et médiane, cas des données regroupées en classes, étendue, variance et écart-type, avec un exemple complet.
position: 20
visibility: public
---

## Paramètres de position

:::definition
- Le **mode** est la valeur (ou la classe) de plus grand effectif.
- La **moyenne** est $\bar{x} = \frac{n_1x_1 + n_2x_2 + \cdots + n_px_p}{N}$.
- La **médiane** $Me$ partage la série ordonnée en deux parties de même effectif : au moins la moitié des valeurs lui sont inférieures ou égales, et au moins la moitié supérieures ou égales.
:::

:::propriete
Pour trouver la médiane d’une série de $N$ valeurs rangées dans l’ordre : si $N$ est impair, c’est la valeur de rang $\frac{N + 1}{2}$ ; si $N$ est pair, c’est la moyenne des valeurs de rangs $\frac{N}{2}$ et $\frac{N}{2} + 1$. Les effectifs cumulés aident à repérer ces rangs.
:::

:::exemple
Notes de $20$ élèves ($8$ : $2$ fois, $10$ : $5$, $12$ : $7$, $14$ : $4$, $16$ : $2$).

- Mode : $12$.
- Moyenne : $\bar{x} = \frac{16 + 50 + 84 + 56 + 32}{20} = \frac{238}{20} = 11{,}9$.
- Médiane : les effectifs cumulés sont $2$, $7$, $14$, $18$, $20$ ; les valeurs de rangs $10$ et $11$ valent $12$, donc $Me = 12$.
:::

## Données regroupées en classes

:::propriete
On remplace chaque classe par son **centre** pour calculer la moyenne. La médiane s’estime sur le polygone des effectifs cumulés, ou par interpolation linéaire dans la classe qui contient le rang $\frac{N}{2}$.
:::

:::exemple
Tailles de $30$ élèves : $[150 ; 160[$ : $4$, $[160 ; 170[$ : $10$, $[170 ; 180[$ : $12$, $[180 ; 190[$ : $4$.

- Classe modale : $[170 ; 180[$.
- Moyenne : $\frac{4 \times 155 + 10 \times 165 + 12 \times 175 + 4 \times 185}{30} = \frac{5\,110}{30} \approx 170{,}3$ cm.
- Médiane : les effectifs cumulés sont $4$, $14$, $26$, $30$ ; le rang $15$ est dans $[170 ; 180[$, et par interpolation $Me \approx 170 + 10 \times \frac{15 - 14}{12} \approx 170{,}8$ cm.
:::

## Paramètres de dispersion

:::definition
- L’**étendue** est la différence entre la plus grande et la plus petite valeur.
- La **variance** est $V = \frac{n_1(x_1 - \bar{x})^2 + \cdots + n_p(x_p - \bar{x})^2}{N}$, qu’on calcule souvent par $V = \frac{n_1x_1^2 + \cdots + n_px_p^2}{N} - \bar{x}^2$.
- L’**écart-type** est $\sigma = \sqrt{V}$ : il mesure la dispersion des valeurs autour de la moyenne.
:::

:::exemple
Pour les notes : étendue $16 - 8 = 8$. $\frac{2 \times 64 + 5 \times 100 + 7 \times 144 + 4 \times 196 + 2 \times 256}{20} = \frac{2\,932}{20} = 146{,}6$, donc $V = 146{,}6 - 11{,}9^2 = 146{,}6 - 141{,}61 = 4{,}99$ et $\sigma \approx 2{,}23$.
:::

:::attention
La médiane ne dépend pas des valeurs extrêmes, contrairement à la moyenne : une seule note très basse fait baisser la moyenne, pas forcément la médiane.
:::
