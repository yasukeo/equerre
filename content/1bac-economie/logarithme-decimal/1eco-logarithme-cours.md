---
title: Le logarithme décimal — partie 1 : définition et propriétés
kind: cours
summary: Définition du logarithme décimal à partir des puissances de 10, valeurs remarquables, propriétés algébriques (produit, quotient, inverse, puissance, racine) et calculs.
position: 10
visibility: public
---

## Définition

On admet que pour tout réel $x > 0$, il existe un unique réel $y$ tel que $10^y = x$, et que les règles de calcul sur les puissances de $10$ restent vraies pour des exposants réels.

:::definition
Pour tout réel $x > 0$, le **logarithme décimal** de $x$, noté $\log x$, est l’unique réel $y$ tel que $10^y = x$ :

$$
y = \log x \iff x = 10^y \qquad (x > 0)
$$
:::

:::attention
$\log x$ n’existe que pour $x > 0$ : $\log 0$ et $\log(-5)$ n’ont pas de sens.
:::

## Valeurs remarquables

:::propriete
- $\log 1 = 0$ et $\log 10 = 1$.
- Pour tout entier relatif $n$ : $\log 10^n = n$. Par exemple $\log 1\,000 = 3$ et $\log 0{,}01 = -2$.
- Pour tout $x > 0$ : $10^{\log x} = x$ ; pour tout réel $y$ : $\log 10^y = y$.
:::

## Propriétés algébriques

:::propriete
Pour tous réels $a > 0$ et $b > 0$, et tout entier relatif $n$ :

- $\log(ab) = \log a + \log b$ ;
- $\log \frac{1}{b} = -\log b$ et $\log \frac{a}{b} = \log a - \log b$ ;
- $\log(a^n) = n\log a$ ;
- $\log \sqrt{a} = \frac{1}{2}\log a$.
:::

:::exemple
**Pourquoi le produit devient une somme.** $10^{\log a + \log b} = 10^{\log a} \times 10^{\log b} = ab$. Donc $\log a + \log b$ est le réel dont la puissance de $10$ vaut $ab$ : c’est $\log(ab)$.
:::

## Calculer avec $\log$

:::exemple
- $\log 200 = \log 2 + \log 100 = \log 2 + 2$.
- $\log 50 = \log 100 - \log 2 = 2 - \log 2$, et $\log 5 = \log 10 - \log 2 = 1 - \log 2$.
- $\log 12 = \log(2^2 \times 3) = 2\log 2 + \log 3$.
- $\log 8 + \log 125 = \log 1\,000 = 3$.
- $\log \sqrt{1\,000} = \frac{1}{2} \times 3 = \frac{3}{2}$.
:::

:::propriete
**Valeurs approchées utiles** : $\log 2 \approx 0{,}301$, $\log 3 \approx 0{,}477$, $\log 5 \approx 0{,}699$, $\log 7 \approx 0{,}845$.
:::

:::attention
$\log(a + b)$ n’est pas $\log a + \log b$ : par exemple $\log(1 + 1) = \log 2 \approx 0{,}301$, alors que $\log 1 + \log 1 = 0$.
:::
