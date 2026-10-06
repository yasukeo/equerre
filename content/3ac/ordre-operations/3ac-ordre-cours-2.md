---
title: Ordre et opérations — partie 2 : carrés, racines, inverses et valeurs approchées
kind: cours
summary: Comparer des carrés, des racines carrées et des inverses de nombres positifs, encadrer et donner des valeurs approchées par troncature et par arrondi.
position: 20
visibility: public
---

## Carrés, racines et inverses

:::propriete
Pour deux nombres **strictement positifs** $a$ et $b$ :

- $a < b \iff a^2 < b^2$ ;
- $a < b \iff \sqrt{a} < \sqrt{b}$ ;
- $a < b \iff \frac{1}{a} > \frac{1}{b}$ (le sens change).
:::

:::exemple
- Comparer $2\sqrt{5}$ et $3\sqrt{2}$ : ce sont des positifs, de carrés $20$ et $18$. Donc $2\sqrt{5} > 3\sqrt{2}$.
- $\sqrt{3} > \sqrt{2}$, donc $\frac{1}{\sqrt{3}} < \frac{1}{\sqrt{2}}$.
- Comparer $\sqrt{5}$ et $2{,}2$ : $2{,}2^2 = 4{,}84 < 5$, donc $\sqrt{5} > 2{,}2$.
:::

## Encadrer

:::exemple
Si $2 \leq x \leq 5$ : $4 \leq x^2 \leq 25$, $\sqrt{2} \leq \sqrt{x} \leq \sqrt{5}$, et $\frac{1}{5} \leq \frac{1}{x} \leq \frac{1}{2}$.
:::

## Valeurs approchées

:::definition
- La **troncature** d’un nombre à $10^{-n}$ s’obtient en supprimant les chiffres après le $n^{\text{e}}$ chiffre après la virgule.
- L’**arrondi** à $10^{-n}$ est la valeur à $10^{-n}$ la plus proche : on regarde le chiffre suivant, et on augmente de $1$ le dernier chiffre gardé s’il vaut $5$ ou plus.
:::

:::exemple
$\pi = 3{,}141\,59\ldots$ : troncature à $10^{-3}$ : $3{,}141$ ; arrondi à $10^{-3}$ : $3{,}142$. Et $\sqrt{2} = 1{,}414\,21\ldots$ : arrondi à $10^{-2}$ : $1{,}41$.
:::

:::exemple
Sachant que $1{,}414 < \sqrt{2} < 1{,}415$ : $4{,}242 < 3\sqrt{2} < 4{,}245$, puis $5{,}242 < 3\sqrt{2} + 1 < 5{,}245$.
:::

:::attention
Les règles sur les carrés et les inverses supposent des nombres **positifs** : $-3 < 2$, mais $(-3)^2 > 2^2$.
:::
