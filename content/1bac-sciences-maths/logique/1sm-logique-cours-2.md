---
title: Notions de logique — partie 2 : les raisonnements
kind: cours
summary: Raisonnement direct, par contraposée, par l’absurde, par disjonction des cas, par équivalences successives, par contre-exemple et par récurrence, avec un exemple rédigé pour chacun.
position: 20
visibility: public
---

## Raisonnement direct

Pour montrer $P \Rightarrow Q$, on suppose $P$ vraie et on en déduit $Q$ par une suite d’étapes justifiées.

:::exemple
Montrer que si $x \geq 1$, alors $x^2 + x \geq 2$ : si $x \geq 1$, alors $x^2 \geq 1$ et $x \geq 1$, donc $x^2 + x \geq 2$.
:::

## Raisonnement par contraposée

Pour montrer $P \Rightarrow Q$, on peut montrer $\bar{Q} \Rightarrow \bar{P}$, qui lui est équivalente.

:::exemple
Montrer que si $n^2$ est pair, alors $n$ est pair. Contraposée : si $n$ est impair, alors $n^2$ est impair. Or si $n = 2k + 1$, $n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$, qui est impair.
:::

## Raisonnement par l’absurde

Pour montrer que $P$ est vraie, on suppose que $P$ est fausse et on aboutit à une contradiction.

:::exemple
Montrer que $\sqrt{2}$ n’est pas un rationnel. Supposons $\sqrt{2} = \frac{p}{q}$, fraction irréductible. Alors $p^2 = 2q^2$ est pair, donc $p$ est pair (exemple précédent) : $p = 2k$, puis $4k^2 = 2q^2$, $q^2 = 2k^2$ est pair et $q$ est pair. La fraction n’était donc pas irréductible : contradiction.
:::

## Raisonnement par disjonction des cas

Pour montrer une propriété, on la montre dans plusieurs cas qui couvrent toutes les possibilités.

:::exemple
Montrer que pour tout entier $n$, $n(n + 1)$ est pair : si $n$ est pair, $n(n + 1)$ est pair ; si $n$ est impair, $n + 1$ est pair, donc $n(n + 1)$ est pair.
:::

:::exemple
Résoudre $|x - 1| = 3$ : si $x \geq 1$, $x - 1 = 3$, donc $x = 4$ ; si $x < 1$, $1 - x = 3$, donc $x = -2$. $S = \{-2 ; 4\}$.
:::

## Raisonnement par équivalences successives

On transforme une proposition en une autre qui lui est équivalente, jusqu’à une proposition dont on connaît la valeur.

:::exemple
Pour $a, b > 0$ : $\frac{a + b}{2} \geq \sqrt{ab} \iff a + b - 2\sqrt{ab} \geq 0 \iff \left(\sqrt{a} - \sqrt{b}\right)^2 \geq 0$, ce qui est vrai.
:::

## Contre-exemple

Pour montrer qu’une proposition « $(\forall x \in E) \; P(x)$ » est **fausse**, il suffit de trouver **un** $x$ de $E$ pour lequel $P(x)$ est fausse.

:::exemple
« Pour tout réel $x$, $x^2 > x$ » est fausse : pour $x = \frac{1}{2}$, $x^2 = \frac{1}{4} < \frac{1}{2}$.
:::

## Raisonnement par récurrence

:::theoreme
Soit $P(n)$ une propriété qui dépend de l’entier naturel $n$, et $n_0$ un entier. Si $P(n_0)$ est vraie et si, pour tout $n \geq n_0$, $P(n) \Rightarrow P(n + 1)$, alors $P(n)$ est vraie pour tout $n \geq n_0$.
:::

:::exemple
Montrer que pour tout $n \geq 1$, $1 + 3 + 5 + \cdots + (2n - 1) = n^2$. Pour $n = 1$ : $1 = 1^2$. Si l’égalité est vraie au rang $n$, alors $1 + \cdots + (2n - 1) + (2n + 1) = n^2 + 2n + 1 = (n + 1)^2$ : elle est vraie au rang $n + 1$.
:::

:::attention
Un exemple ne démontre pas une propriété générale ; un seul contre-exemple suffit à la réfuter.
:::
