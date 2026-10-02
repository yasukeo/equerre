---
title: Calcul intégral — partie 1 : intégrale et propriétés
kind: cours
summary: Intégrale d’une fonction continue, lien avec les primitives, relation de Chasles, linéarité, positivité et ordre, encadrement, valeur moyenne, fonction définie par une intégrale.
position: 10
visibility: public
---

## Intégrale d’une fonction continue

:::definition
Soit $f$ une fonction continue sur un intervalle $I$, $F$ une primitive de $f$ sur $I$, et $a$, $b$ deux éléments de $I$. L’**intégrale** de $f$ de $a$ à $b$ est le réel :

$$
\int_a^b f(x) \, dx = \big[F(x)\big]_a^b = F(b) - F(a)
$$

Ce réel ne dépend pas de la primitive choisie.
:::

:::exemple
$\int_0^1 (3x^2 + 1) \, dx = \big[x^3 + x\big]_0^1 = 2$ et $\int_0^{\frac{\pi}{2}} \cos x \, dx = \big[\sin x\big]_0^{\frac{\pi}{2}} = 1$.
:::

:::propriete
Si $f$ est continue sur $I$ et $a \in I$, la fonction $x \mapsto \int_a^x f(t) \, dt$ est la primitive de $f$ sur $I$ qui s’annule en $a$.
:::

## Propriétés

:::propriete
Pour $f$ et $g$ continues sur $I$, $a$, $b$, $c$ dans $I$ et $\alpha$, $\beta$ réels :

- $\int_a^a f(x)\,dx = 0$ et $\int_b^a f(x)\,dx = -\int_a^b f(x)\,dx$ ;
- **Chasles** : $\int_a^c f(x)\,dx = \int_a^b f(x)\,dx + \int_b^c f(x)\,dx$ ;
- **Linéarité** : $\int_a^b \left(\alpha f(x) + \beta g(x)\right)dx = \alpha\int_a^b f(x)\,dx + \beta\int_a^b g(x)\,dx$.
:::

:::propriete
Soit $a \leq b$.

- **Positivité** : si $f \geq 0$ sur $[a ; b]$, alors $\int_a^b f(x)\,dx \geq 0$.
- **Ordre** : si $f \leq g$ sur $[a ; b]$, alors $\int_a^b f(x)\,dx \leq \int_a^b g(x)\,dx$.
- Si $m \leq f \leq M$ sur $[a ; b]$, alors $m(b - a) \leq \int_a^b f(x)\,dx \leq M(b - a)$.
:::

:::definition
La **valeur moyenne** de $f$ sur $[a ; b]$ ($a < b$) est $\mu = \frac{1}{b - a}\int_a^b f(x)\,dx$.
:::

:::exemple
**Avec une valeur absolue.** $\int_0^3 |x - 1| \, dx = \int_0^1 (1 - x)\,dx + \int_1^3 (x - 1)\,dx = \frac{1}{2} + 2 = \frac{5}{2}$ (relation de Chasles, en coupant là où $x - 1$ change de signe).
:::

:::propriete
Si $f$ est continue sur $[-a ; a]$ :

- si $f$ est **paire**, $\int_{-a}^a f(x)\,dx = 2\int_0^a f(x)\,dx$ ;
- si $f$ est **impaire**, $\int_{-a}^a f(x)\,dx = 0$.
:::

:::exemple
$\int_{-1}^{1} x^3 e^{x^2} \, dx = 0$, car la fonction intégrée est impaire.
:::

## Encadrer une intégrale

:::exemple
Pour $n \in \mathbb{N}$, soit $I_n = \int_0^1 \frac{x^n}{1 + x} \, dx$. Pour $x \in [0 ; 1]$, $0 \leq \frac{x^n}{1 + x} \leq x^n$, donc $0 \leq I_n \leq \int_0^1 x^n \, dx = \frac{1}{n + 1}$. Par les gendarmes, $\lim I_n = 0$.
:::

## Fonction définie par une intégrale

Soit $F(x) = \int_a^x f(t)\,dt$ avec $f$ continue. Alors $F$ est dérivable et $F' = f$ : le **signe de $f$** donne le sens de variation de $F$, et $F(a) = 0$.

:::exemple
$F(x) = \int_1^x \frac{dt}{t}$ pour $x > 0$ : c’est la primitive de $\frac{1}{x}$ qui s’annule en $1$, donc $F(x) = \ln x$.
:::
