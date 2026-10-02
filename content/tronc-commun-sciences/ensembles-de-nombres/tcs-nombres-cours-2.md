---
title: Les ensembles de nombres — partie 2 : le calcul dans ℝ
kind: cours
summary: Puissances et écriture scientifique, racines carrées et leurs règles, dénominateur sans racine, identités remarquables du second et du troisième degré, développer et factoriser.
position: 20
visibility: public
---

## Puissances

:::propriete
Pour $a$ et $b$ non nuls et $m$, $n$ entiers relatifs :

- $a^m \times a^n = a^{m + n}$ ; $\frac{a^m}{a^n} = a^{m - n}$ ; $(a^m)^n = a^{mn}$ ;
- $(ab)^n = a^n b^n$ ; $\left(\frac{a}{b}\right)^n = \frac{a^n}{b^n}$ ;
- $a^0 = 1$ et $a^{-n} = \frac{1}{a^n}$.
:::

:::exemple
$\frac{2^5 \times 3^4}{6^3} = \frac{2^5 \times 3^4}{2^3 \times 3^3} = 2^2 \times 3 = 12$.
:::

:::propriete
**Écriture scientifique.** Tout décimal non nul s’écrit $a \times 10^n$ avec $1 \leq |a| < 10$ et $n \in \mathbb{Z}$.
:::

:::exemple
$0{,}000\,45 = 4{,}5 \times 10^{-4}$ et $3\,200\,000 = 3{,}2 \times 10^6$.
:::

## Racines carrées

:::propriete
Pour $a \geq 0$, $\sqrt{a}$ est le réel positif dont le carré vaut $a$. Pour $a \geq 0$ et $b > 0$ :

- $\left(\sqrt{a}\right)^2 = a$ et $\sqrt{a^2} = a$ ; plus généralement, pour tout réel $x$, $\sqrt{x^2} = |x|$ ;
- $\sqrt{ab} = \sqrt{a}\sqrt{b}$ et $\sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}}$.
:::

:::exemple
- $\sqrt{50} = \sqrt{25 \times 2} = 5\sqrt{2}$.
- $\sqrt{12} + \sqrt{27} = 2\sqrt{3} + 3\sqrt{3} = 5\sqrt{3}$.
:::

:::attention
$\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}$ en général : $\sqrt{9 + 16} = 5$, alors que $\sqrt{9} + \sqrt{16} = 7$.
:::

## Dénominateur sans racine

:::exemple
- $\frac{3}{\sqrt{6}} = \frac{3\sqrt{6}}{6} = \frac{\sqrt{6}}{2}$.
- $\frac{1}{\sqrt{3} - 1} = \frac{\sqrt{3} + 1}{\left(\sqrt{3} - 1\right)\left(\sqrt{3} + 1\right)} = \frac{\sqrt{3} + 1}{3 - 1} = \frac{\sqrt{3} + 1}{2}$ : on multiplie par l’**expression conjuguée**.
:::

## Identités remarquables

:::propriete
- $(a + b)^2 = a^2 + 2ab + b^2$ ; $(a - b)^2 = a^2 - 2ab + b^2$ ; $(a - b)(a + b) = a^2 - b^2$.
- $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$ ; $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$.
- $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$ ; $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$.
:::

:::exemple
- Développer : $\left(2 - \sqrt{3}\right)^2 = 4 - 4\sqrt{3} + 3 = 7 - 4\sqrt{3}$.
- Factoriser : $x^3 - 8 = (x - 2)(x^2 + 2x + 4)$.
- Factoriser : $9x^2 - 12x + 4 = (3x - 2)^2$.
:::
