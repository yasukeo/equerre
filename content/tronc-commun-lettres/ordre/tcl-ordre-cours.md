---
title: L’ordre dans ℝ — partie 1 : comparer et encadrer
kind: cours
summary: Comparer deux nombres, ordre et addition, ordre et multiplication, comparer des racines et des fractions, encadrements et valeurs arrondies.
position: 10
visibility: public
---

## Comparer deux nombres

:::propriete
Pour comparer $a$ et $b$, on étudie le signe de $a - b$ : si $a - b > 0$, alors $a > b$ ; si $a - b < 0$, alors $a < b$.
:::

:::exemple
- $\frac{3}{7}$ et $\frac{2}{5}$ : au même dénominateur, $\frac{15}{35}$ et $\frac{14}{35}$, donc $\frac{3}{7} > \frac{2}{5}$.
- $\sqrt{10}$ et $3$ : deux nombres positifs, de carrés $10$ et $9$. Comme $10 > 9$, $\sqrt{10} > 3$.
:::

## Ordre et opérations

:::propriete
- On peut **ajouter** ou **soustraire** un même nombre aux deux membres d’une inégalité : le sens ne change pas.
- On peut **multiplier** ou **diviser** les deux membres par un même nombre **positif** : le sens ne change pas.
- Si on multiplie ou divise par un nombre **négatif**, le sens de l’inégalité **change**.
:::

:::exemple
Si $x < 3$, alors $x + 2 < 5$, $4x < 12$, et $-2x > -6$.
:::

## Encadrements

:::propriete
Si $a \leq x \leq b$, alors $a + c \leq x + c \leq b + c$ ; pour $k > 0$, $ka \leq kx \leq kb$ ; et $-b \leq -x \leq -a$.
:::

:::exemple
Si $2 \leq x \leq 5$ : $5 \leq x + 3 \leq 8$, $4 \leq 2x \leq 10$, $-5 \leq -x \leq -2$, et donc $-2 \leq 3 - x \leq 1$.
:::

## Valeurs approchées et arrondis

:::definition
Si $a \leq x \leq b$, $a$ et $b$ sont des **valeurs approchées** de $x$, par défaut et par excès. L’**arrondi** de $x$ à $10^{-n}$ près est la valeur approchée à $10^{-n}$ la plus proche de $x$.
:::

:::exemple
- $1{,}41 < \sqrt{2} < 1{,}42$, donc $2{,}82 < 2\sqrt{2} < 2{,}84$ et $3{,}41 < 2 + \sqrt{2} < 3{,}42$.
- $\pi = 3{,}141\,59\ldots$ : son arrondi à $10^{-2}$ près est $3{,}14$, et à $10^{-3}$ près $3{,}142$.
:::

:::attention
Multiplier une inégalité par $-1$ change son sens : de $2 \leq x$, on déduit $-x \leq -2$.
:::
