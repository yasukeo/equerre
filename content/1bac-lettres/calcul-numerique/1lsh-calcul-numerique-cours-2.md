---
title: Calcul numérique — partie 2 : les pourcentages
kind: cours
summary: Calculer et appliquer un pourcentage, coefficient multiplicateur d’une hausse ou d’une baisse, taux d’évolution, évolutions successives et réciproques, TVA et intérêts simples.
position: 20
visibility: public
---

## Calculer un pourcentage

:::propriete
- Prendre $t\,\%$ d’une quantité $Q$, c’est calculer $\frac{t}{100} \times Q$.
- La part d’une quantité $a$ dans un total $T$, en pourcentage, est $\frac{a}{T} \times 100$.
:::

:::exemple
- $15\,\%$ de $340$ dirhams : $0{,}15 \times 340 = 51$ dirhams.
- $18$ élèves sur $40$ : $\frac{18}{40} \times 100 = 45\,\%$.
:::

## Hausses et baisses

:::propriete
- Augmenter une quantité de $t\,\%$, c’est la **multiplier** par $1 + \frac{t}{100}$.
- Diminuer une quantité de $t\,\%$, c’est la **multiplier** par $1 - \frac{t}{100}$.

Ce nombre s’appelle le **coefficient multiplicateur**.
:::

:::exemple
- Un prix de $250$ dirhams augmente de $12\,\%$ : $250 \times 1{,}12 = 280$ dirhams.
- Un prix de $480$ dirhams baisse de $25\,\%$ : $480 \times 0{,}75 = 360$ dirhams.
- Multiplier par $0{,}92$, c’est baisser de $8\,\%$ ; multiplier par $1{,}5$, c’est augmenter de $50\,\%$.
:::

## Taux d’évolution

:::propriete
Quand une quantité passe de $V_D$ (valeur de départ) à $V_A$ (valeur d’arrivée), le **taux d’évolution** est :

$$
t = \frac{V_A - V_D}{V_D}
$$

Il est positif pour une hausse, négatif pour une baisse.
:::

:::exemple
Un loyer passe de $2\,500$ à $2\,650$ dirhams : $t = \frac{150}{2\,500} = 0{,}06$, soit une hausse de $6\,\%$.
:::

## Évolutions successives et réciproques

:::propriete
- Pour enchaîner plusieurs évolutions, on **multiplie** les coefficients multiplicateurs.
- Pour annuler une évolution de coefficient $c$, il faut une évolution de coefficient $\frac{1}{c}$.
:::

:::exemple
- Une hausse de $20\,\%$ suivie d’une baisse de $20\,\%$ : $1{,}2 \times 0{,}8 = 0{,}96$, soit une **baisse** de $4\,\%$, et non une évolution nulle.
- Après une hausse de $25\,\%$, pour revenir au prix de départ : $\frac{1}{1{,}25} = 0{,}8$, il faut une baisse de $20\,\%$.
- Un prix vaut $360$ dirhams après une hausse de $20\,\%$ : le prix de départ était $\frac{360}{1{,}2} = 300$ dirhams.
:::

:::attention
Les pourcentages successifs ne s’additionnent pas : deux hausses de $10\,\%$ donnent $1{,}1 \times 1{,}1 = 1{,}21$, soit $21\,\%$, et non $20\,\%$.
:::

## TVA et intérêts simples

:::exemple
**TVA.** Avec une TVA de $20\,\%$, prix TTC $=$ prix HT $\times 1{,}2$. Un article à $1\,500$ dirhams HT coûte $1\,800$ dirhams TTC ; un article à $2\,400$ dirhams TTC coûte $2\,000$ dirhams HT.
:::

:::exemple
**Intérêts simples.** Un capital $C$ placé à $t\,\%$ par an rapporte chaque année les mêmes intérêts $C \times \frac{t}{100}$. $10\,000$ dirhams à $4\,\%$ pendant $3$ ans rapportent $3 \times 400 = 1\,200$ dirhams.
:::
