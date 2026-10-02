---
title: Devoir surveillé : notions de logique
kind: devoir
summary: Un devoir d’une heure sur 20 points : connecteurs et négations, quantificateurs, trois raisonnements à choisir, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : connecteurs et négations
1. Donner la valeur de vérité de : « $(2 > 5) \Rightarrow (\sqrt{2} > 1)$ » et « $(2 > 1)$ et $(\sqrt{16} = 8)$ ». (2 pts)
2. Écrire la négation de : « $x \geq 2$ ou $y < 0$ » et de « si $a = 0$, alors $ab = 0$ ». (2 pts)
3. Montrer, par une table de vérité, que $\overline{P \vee Q}$ et $\bar{P} \wedge \bar{Q}$ sont équivalentes. (2 pts)

:::corrige
1. Vraie (hypothèse fausse) ; fausse ($\sqrt{16} = 4$).
2. « $x < 2$ et $y \geq 0$ » ; « $a = 0$ et $ab \neq 0$ ».
3. $P \vee Q$ vaut V, V, V, F pour (V ; V), (V ; F), (F ; V), (F ; F), donc sa négation vaut F, F, F, V, comme $\bar{P} \wedge \bar{Q}$.
:::
:::

:::exercice Exercice 2 (5 points) : quantificateurs
Pour chaque proposition, dire si elle est vraie ou fausse et écrire sa négation.

1. $(\forall x \in \mathbb{R}) \; x^2 + 4x + 4 > 0$ (2,5 pts)
2. $(\exists n \in \mathbb{N}) \; n^2 = 2n$ (2,5 pts)

:::corrige
1. Fausse : $x^2 + 4x + 4 = (x + 2)^2$ s’annule en $-2$. Négation : $(\exists x \in \mathbb{R}) \; x^2 + 4x + 4 \leq 0$.
2. Vraie ($n = 0$ ou $n = 2$). Négation : $(\forall n \in \mathbb{N}) \; n^2 \neq 2n$.
:::
:::

:::exercice Exercice 3 (9 points) : raisonnements
1. Montrer par contraposée que, pour $x$ réel, si $x^3 \neq 8$ alors $x \neq 2$. (2 pts)
2. Montrer par disjonction des cas que pour tout entier $n$, $n^2 - n$ est pair. (3 pts)
3. Montrer par récurrence que pour tout $n \geq 1$, $1 \times 2 + 2 \times 3 + \cdots + n(n + 1) = \dfrac{n(n + 1)(n + 2)}{3}$. (4 pts)

:::corrige
1. Contraposée : si $x = 2$, alors $x^3 = 8$, ce qui est vrai.
2. Si $n$ est pair, $n^2 - n = n(n - 1)$ est pair ; si $n$ est impair, $n - 1$ est pair, donc $n(n - 1)$ est pair.
3. Pour $n = 1$ : $2 = \frac{1 \times 2 \times 3}{3}$. Si vrai au rang $n$ : la somme jusqu’au rang $n + 1$ vaut $\frac{n(n + 1)(n + 2)}{3} + (n + 1)(n + 2) = \frac{(n + 1)(n + 2)(n + 3)}{3}$.
:::
:::
