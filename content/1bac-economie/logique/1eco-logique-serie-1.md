---
title: Série 1 — partie 1 : propositions, connecteurs, quantificateurs
kind: serie
summary: Valeurs de vérité, tables de vérité, lois de Morgan, implication et contraposée, quantificateurs et négations, avec les corrigés.
position: 10
visibility: public
---

Cinq exercices sur la première partie du cours.

:::exercice Valeurs de vérité
Donner la valeur de vérité de chaque proposition.

1. $\sqrt{9} = 3$ et $2^3 = 6$.
2. $\sqrt{9} = 3$ ou $2^3 = 6$.
3. $(1 > 2) \Rightarrow (5 < 3)$.
4. $(2^2 = 4) \Leftrightarrow (3^2 = 6)$.

:::corrige
1. Fausse ($2^3 = 8$).
2. Vraie (la première est vraie).
3. Vraie (l’hypothèse est fausse).
4. Fausse (vraie d’un côté, fausse de l’autre).
:::
:::

:::exercice Table de vérité
1. Dresser la table de vérité de $\bar{P} \vee Q$ et la comparer à celle de $P \Rightarrow Q$.
2. Montrer à l’aide d’une table de vérité que $\overline{P \wedge Q} \Leftrightarrow \bar{P} \vee \bar{Q}$.

:::corrige
1. Pour $(P ; Q)$ = (V ; V), (V ; F), (F ; V), (F ; F), $\bar{P} \vee Q$ vaut V, F, V, V, exactement comme $P \Rightarrow Q$ : elles sont équivalentes.
2. $P \wedge Q$ vaut V, F, F, F, donc sa négation vaut F, V, V, V ; et $\bar{P} \vee \bar{Q}$ vaut F, V, V, V : mêmes valeurs.
:::
:::

:::exercice Négations
Écrire la négation de chaque proposition.

1. $x > 0$ et $y \leq 2$.
2. $n$ est pair ou $n$ est multiple de $3$.
3. Si $x = 2$, alors $x^2 = 4$.

:::corrige
1. $x \leq 0$ ou $y > 2$.
2. $n$ est impair et $n$ n’est pas multiple de $3$.
3. $x = 2$ et $x^2 \neq 4$.
:::
:::

:::exercice Quantificateurs
Dire si chaque proposition est vraie ou fausse, puis écrire sa négation.

1. $(\forall x \in \mathbb{R}) \; x^2 - 2x + 1 \geq 0$
2. $(\exists x \in \mathbb{R}) \; x^2 = -1$
3. $(\forall n \in \mathbb{N}) \; n^2 \geq n$
4. $(\exists x \in \mathbb{R}) \; 2x + 1 = 0$

:::corrige
1. Vraie : $x^2 - 2x + 1 = (x - 1)^2$. Négation : $(\exists x \in \mathbb{R}) \; x^2 - 2x + 1 < 0$.
2. Fausse. Négation : $(\forall x \in \mathbb{R}) \; x^2 \neq -1$.
3. Vraie : $n^2 - n = n(n - 1) \geq 0$ pour $n$ entier naturel. Négation : $(\exists n \in \mathbb{N}) \; n^2 < n$.
4. Vraie ($x = -\frac{1}{2}$). Négation : $(\forall x \in \mathbb{R}) \; 2x + 1 \neq 0$.
:::
:::

:::exercice Implication, réciproque, contraposée
Soit $P$ : « $x = 3$ » et $Q$ : « $x^2 = 9$ ».

1. L’implication $P \Rightarrow Q$ est-elle vraie ? Et sa réciproque ?
2. Écrire la contraposée de $P \Rightarrow Q$.

:::corrige
1. $P \Rightarrow Q$ est vraie. La réciproque $Q \Rightarrow P$ est fausse : pour $x = -3$, $x^2 = 9$ mais $x \neq 3$.
2. Si $x^2 \neq 9$, alors $x \neq 3$.
:::
:::
