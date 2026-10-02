---
title: Série 1 — partie 2 : quantificateurs et raisonnements
kind: serie
summary: Lire et nier des propositions avec quantificateurs, réfuter par un contre-exemple, raisonner par disjonction des cas, par contraposée et par l’absurde, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Quantificateurs
Dire si chaque proposition est vraie ou fausse, puis écrire sa négation.

1. $\forall x \in \mathbb{R}, \; x^2 + 1 > 0$
2. $\exists x \in \mathbb{R}, \; 2x + 3 = 0$
3. $\forall n \in \mathbb{N}, \; n \geq 1$

:::corrige
1. Vraie. Négation : $\exists x \in \mathbb{R}, \; x^2 + 1 \leq 0$.
2. Vraie, avec $x = -\frac{3}{2}$. Négation : $\forall x \in \mathbb{R}, \; 2x + 3 \neq 0$.
3. Fausse, car $0 < 1$. Négation : $\exists n \in \mathbb{N}, \; n < 1$.
:::
:::

:::exercice Contre-exemples
Montrer que chaque proposition est fausse.

1. « Tout nombre impair est premier. »
2. « Pour tout réel $x$, $(x + 1)^2 = x^2 + 1$. »
3. « Pour tous réels $a$ et $b$, $\sqrt{a^2 + b^2} = a + b$. »

:::corrige
1. $9$ est impair mais n’est pas premier ($9 = 3 \times 3$).
2. Pour $x = 1$ : $(1 + 1)^2 = 4$ alors que $1^2 + 1 = 2$.
3. Pour $a = 3$ et $b = 4$ : $\sqrt{9 + 16} = 5$ alors que $a + b = 7$.
:::
:::

:::exercice Disjonction des cas
1. Montrer que pour tout réel $x$, $|x - 2| + x \geq 2$.
2. Montrer que pour tout entier $n$, $n^2 + n + 1$ est impair.

:::corrige
1. Si $x \geq 2$ : $|x - 2| + x = x - 2 + x = 2x - 2 \geq 2$, car $x \geq 2$. Si $x < 2$ : $|x - 2| + x = 2 - x + x = 2 \geq 2$.
2. $n^2 + n = n(n + 1)$ est pair dans les deux cas ($n$ pair, ou $n$ impair et $n + 1$ pair). Donc $n^2 + n + 1$ est impair.
:::
:::

:::exercice Contraposée et absurde
1. Montrer, par contraposée : « si $n^2$ est impair, alors $n$ est impair ».
2. Montrer, par l’absurde : « si $x \neq -1$, alors $\dfrac{2x}{x + 1} \neq 2$ ».

:::corrige
1. Contraposée : « si $n$ est pair, alors $n^2$ est pair ». Si $n = 2k$, $n^2 = 4k^2 = 2(2k^2)$ est pair.
2. Supposons $\frac{2x}{x + 1} = 2$. Alors $2x = 2x + 2$, soit $0 = 2$ : c’est impossible. Donc $\frac{2x}{x + 1} \neq 2$.
:::
:::
