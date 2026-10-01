---
title: Suites numériques
kind: cours
summary: Raisonnement par récurrence, suites majorées, minorées, monotones, suites arithmétiques et géométriques, limites de suites et suites de la forme u(n+1) = f(u(n)).
position: 20
visibility: public
---

## Raisonnement par récurrence

:::theoreme
Soit $P(n)$ une propriété qui dépend d’un entier naturel $n$, et $n_0$ un entier. Si :

- $P(n_0)$ est vraie (**initialisation**),
- et, pour tout $n \geq n_0$, $P(n)$ vraie entraîne $P(n + 1)$ vraie (**hérédité**),

alors $P(n)$ est vraie pour tout $n \geq n_0$.
:::

:::exemple
Montrons que pour tout $n \in \mathbb{N}$, $3^n \geq 1 + 2n$.

- Pour $n = 0$ : $3^0 = 1 \geq 1$.
- Supposons $3^n \geq 1 + 2n$ pour un entier $n$. Alors $3^{n + 1} = 3 \times 3^n \geq 3 + 6n \geq 1 + 2(n + 1)$, car $3 + 6n - (3 + 2n) = 4n \geq 0$.

La propriété est donc vraie pour tout entier naturel $n$.
:::

## Suites majorées, minorées, monotones

:::definition
Une suite $(u_n)$ est :

- **majorée** s’il existe un réel $M$ tel que $u_n \leq M$ pour tout $n$ ;
- **minorée** s’il existe un réel $m$ tel que $u_n \geq m$ pour tout $n$ ;
- **bornée** si elle est majorée et minorée.
:::

:::definition
$(u_n)$ est **croissante** si $u_{n + 1} \geq u_n$ pour tout $n$, **décroissante** si $u_{n + 1} \leq u_n$ pour tout $n$ ; strictement, avec des inégalités strictes. Elle est **monotone** si elle est croissante ou décroissante.
:::

Pour étudier le sens de variation, on étudie le signe de $u_{n + 1} - u_n$, ou, si tous les termes sont strictement positifs, on compare $\frac{u_{n + 1}}{u_n}$ à $1$. Si $u_n = f(n)$, la suite a le sens de variation de $f$ sur $[0 ; +\infty[$.

## Suites arithmétiques et géométriques

:::definition
$(u_n)$ est **arithmétique** de raison $r$ si $u_{n + 1} = u_n + r$ pour tout $n$. Alors $u_n = u_p + (n - p) r$ et

$$
u_p + u_{p + 1} + \cdots + u_n = (n - p + 1) \times \frac{u_p + u_n}{2}
$$
:::

:::definition
$(u_n)$ est **géométrique** de raison $q$ si $u_{n + 1} = q \, u_n$ pour tout $n$. Alors $u_n = u_p \, q^{n - p}$ et, pour $q \neq 1$,

$$
u_p + u_{p + 1} + \cdots + u_n = u_p \times \frac{1 - q^{n - p + 1}}{1 - q}
$$
:::

## Limite d’une suite

:::definition
- $(u_n)$ **converge** vers un réel $\ell$ si tout intervalle ouvert contenant $\ell$ contient tous les termes à partir d’un certain rang ; on note $\lim u_n = \ell$.
- $(u_n)$ **tend vers** $+\infty$ si tout intervalle $]A ; +\infty[$ contient tous les termes à partir d’un certain rang.
- Une suite qui ne converge pas est **divergente**.
:::

:::propriete
- Pour $p$ entier, $p \geq 1$ : $\lim n^p = +\infty$, $\lim \sqrt{n} = +\infty$, $\lim \frac{1}{n^p} = 0$.
- Suite géométrique $(q^n)$ : si $q > 1$, $\lim q^n = +\infty$ ; si $-1 < q < 1$, $\lim q^n = 0$ ; si $q = 1$, elle est constante ; si $q \leq -1$, elle n’a pas de limite.
:::

Les règles d’opérations sur les limites et les formes indéterminées sont les mêmes que pour les fonctions.

:::theoreme
**Comparaison.** Si $u_n \leq v_n$ à partir d’un certain rang et $\lim u_n = +\infty$, alors $\lim v_n = +\infty$.

**Gendarmes.** Si $v_n \leq u_n \leq w_n$ à partir d’un certain rang et $\lim v_n = \lim w_n = \ell$, alors $\lim u_n = \ell$.

**Passage à la limite.** Si $u_n \leq v_n$ à partir d’un certain rang et si les deux suites convergent, alors $\lim u_n \leq \lim v_n$.
:::

:::theoreme
Toute suite **croissante et majorée** converge. Toute suite **décroissante et minorée** converge.
:::

:::attention
Ce théorème dit que la limite existe, pas ce qu’elle vaut : si $(u_n)$ est croissante et majorée par $M$, sa limite $\ell$ vérifie seulement $\ell \leq M$.
:::

:::propriete
Une suite croissante et non majorée tend vers $+\infty$ ; une suite décroissante et non minorée tend vers $-\infty$.
:::

## Suites de la forme $u_{n + 1} = f(u_n)$

:::theoreme
Soit $f$ une fonction continue sur un intervalle $I$ telle que $f(I) \subset I$, et $(u_n)$ définie par $u_0 \in I$ et $u_{n + 1} = f(u_n)$. Si $(u_n)$ converge vers $\ell$ et si $\ell \in I$, alors $\ell$ est solution de l’équation $f(x) = x$.
:::

:::exemple
Soit $u_0 = 1$ et $u_{n + 1} = \sqrt{u_n + 2}$.

- Par récurrence, $0 \leq u_n \leq 2$ : c’est vrai pour $n = 0$, et si $0 \leq u_n \leq 2$, alors $2 \leq u_n + 2 \leq 4$, donc $\sqrt{2} \leq u_{n + 1} \leq 2$.
- $u_{n + 1} - u_n = \sqrt{u_n + 2} - u_n = \dfrac{u_n + 2 - u_n^2}{\sqrt{u_n + 2} + u_n} = \dfrac{(2 - u_n)(1 + u_n)}{\sqrt{u_n + 2} + u_n} \geq 0$ : la suite est croissante.
- Croissante et majorée par $2$, elle converge vers $\ell \in [0 ; 2]$ ; $f(x) = \sqrt{x + 2}$ est continue sur $[0 ; 2]$ et $f([0 ; 2]) = [\sqrt{2} ; 2] \subset [0 ; 2]$, donc $\ell = \sqrt{\ell + 2}$, soit $\ell^2 - \ell - 2 = 0$ avec $\ell \geq 0$ : $\ell = 2$.
:::
