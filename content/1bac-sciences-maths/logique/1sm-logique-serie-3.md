---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes qui demandent de choisir le bon raisonnement : inégalités et quantificateurs, puis propriétés des entiers, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : inégalités et quantificateurs
1. Écrire avec des quantificateurs : « tout réel positif a une racine carrée », puis « le carré d’un réel n’est jamais négatif ».
2. Montrer que pour tout réel $x$, $\dfrac{x}{x^2 + 1} \leq \dfrac{1}{2}$.
3. La proposition « $(\exists x \in \mathbb{R}) \; \dfrac{x}{x^2 + 1} = \dfrac{1}{2}$ » est-elle vraie ?
4. Montrer par l’absurde que pour tout réel $x$, $\dfrac{x}{x^2 + 1} \neq 1$.

:::corrige
1. $(\forall x \in \mathbb{R}_+)(\exists y \in \mathbb{R}_+) \; y^2 = x$ ; $(\forall x \in \mathbb{R}) \; x^2 \geq 0$.
2. $\frac{x}{x^2 + 1} \leq \frac{1}{2} \iff 2x \leq x^2 + 1$ (car $x^2 + 1 > 0$) $\iff (x - 1)^2 \geq 0$, vrai.
3. Oui : il y a égalité quand $(x - 1)^2 = 0$, soit $x = 1$.
4. Si $\frac{x}{x^2 + 1} = 1$, alors $x^2 - x + 1 = 0$, dont le discriminant $-3$ est négatif : aucune solution réelle, contradiction. (On peut aussi utiliser la question 2 : la fraction est au plus $\frac{1}{2}$.)
:::
:::

:::exercice Problème 2 : propriétés des entiers
1. Montrer par disjonction des cas (selon le reste de $n$ dans la division par $3$) que $n(n + 1)(n + 2)$ est divisible par $3$ pour tout entier $n$.
2. Montrer par récurrence que pour tout $n \in \mathbb{N}$, $n^3 + 2n$ est divisible par $3$.
3. Montrer par contraposée que si $n^2$ n’est pas divisible par $3$, alors $n$ n’est pas divisible par $3$.

:::corrige
1. Si $n = 3k$, $n$ est divisible par $3$ ; si $n = 3k + 1$, $n + 2 = 3(k + 1)$ ; si $n = 3k + 2$, $n + 1 = 3(k + 1)$. Dans tous les cas, l’un des facteurs est multiple de $3$.
2. Pour $n = 0$ : $0$. Si $n^3 + 2n = 3k$, alors $(n + 1)^3 + 2(n + 1) = n^3 + 3n^2 + 3n + 1 + 2n + 2 = (n^3 + 2n) + 3(n^2 + n + 1) = 3(k + n^2 + n + 1)$.
3. Contraposée : si $n$ est divisible par $3$, alors $n^2$ l’est. Si $n = 3k$, $n^2 = 9k^2 = 3(3k^2)$.
:::
:::
