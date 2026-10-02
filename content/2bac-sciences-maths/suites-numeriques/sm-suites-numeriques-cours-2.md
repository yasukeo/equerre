---
title: Suites numériques — partie 2 : limites et convergence
kind: cours
summary: Limites de suites, opérations, comparaison et gendarmes, convergence des suites monotones, limite de f(u(n)), suites définies par u(n+1) = f(u(n)).
position: 20
visibility: public
---
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

## Limites : exemples et méthodes

:::exemple
- $u_n = n^2 - 3n$ : forme $+\infty - \infty$ ; $u_n = n^2\left(1 - \frac{3}{n}\right) \to +\infty$.
- $u_n = \dfrac{2n + 1}{n + 3} = \dfrac{2 + \frac{1}{n}}{1 + \frac{3}{n}} \to 2$.
- $u_n = \sqrt{n + 1} - \sqrt{n} = \dfrac{1}{\sqrt{n + 1} + \sqrt{n}} \to 0$.
- $u_n = 3^n - 2^n = 3^n\left(1 - \left(\frac{2}{3}\right)^n\right) \to +\infty$, car $\left(\frac{2}{3}\right)^n \to 0$.
:::

:::exemple
$u_n = \dfrac{(-1)^n}{n}$ pour $n \geq 1$ : $-\frac{1}{n} \leq u_n \leq \frac{1}{n}$ et les deux suites encadrantes tendent vers $0$, donc $\lim u_n = 0$ (gendarmes).
:::

:::propriete
Si $\lim u_n = \ell$ et si $f$ est continue en $\ell$, alors $\lim f(u_n) = f(\ell)$. En particulier, si $u_n = f(n)$ et $\lim_{x \to +\infty} f(x) = \ell$, alors $\lim u_n = \ell$.
:::

:::exemple
$\lim \sqrt{\dfrac{4n + 1}{n + 2}} = \sqrt{4} = 2$, car $\dfrac{4n + 1}{n + 2} \to 4$ et $x \mapsto \sqrt{x}$ est continue en $4$. De même $\lim \cos\left(\dfrac{\pi n}{3n + 1}\right) = \cos\dfrac{\pi}{3} = \dfrac{1}{2}$.
:::

### Méthode : étudier une suite $u_{n + 1} = f(u_n)$

1. Montrer par récurrence que tous les termes restent dans un intervalle $I$ (avec $f(I) \subset I$).
2. Étudier le signe de $u_{n + 1} - u_n$, ou utiliser le sens de variation de $f$ sur $I$ (si $f$ est croissante sur $I$, la suite est monotone : il suffit de comparer $u_0$ et $u_1$).
3. Conclure à la convergence avec le théorème des suites monotones.
4. Trouver la limite $\ell$ parmi les solutions de $f(x) = x$ qui sont dans $I$.

:::attention
Si $f$ est croissante sur $I$, la suite $(u_n)$ est monotone mais **pas forcément croissante** : elle est croissante si $u_1 \geq u_0$, décroissante si $u_1 \leq u_0$.
:::

## Suites adjacentes

:::definition
Deux suites $(u_n)$ et $(v_n)$ sont **adjacentes** si l’une est croissante, l’autre décroissante, et si $\lim (v_n - u_n) = 0$.
:::

:::theoreme
Deux suites adjacentes convergent vers la même limite $\ell$. Si $(u_n)$ est croissante et $(v_n)$ décroissante, alors $u_n \leq \ell \leq v_n$ pour tout $n$.
:::

:::exemple
$u_n = \sum_{k = 1}^{n} \frac{1}{k^2}$ et $v_n = u_n + \frac{1}{n}$ ($n \geq 1$). $(u_n)$ est croissante. $v_{n + 1} - v_n = \frac{1}{(n + 1)^2} + \frac{1}{n + 1} - \frac{1}{n} = \frac{n - (n + 1)}{n(n + 1)^2} = -\frac{1}{n(n + 1)^2} < 0$ : $(v_n)$ est décroissante. Et $v_n - u_n = \frac{1}{n} \to 0$. Les suites sont adjacentes : elles convergent vers la même limite (qui vaut $\frac{\pi^2}{6}$, résultat hors programme).
:::

## Suites et accroissements finis

Pour une suite $u_{n + 1} = f(u_n)$ qui converge vers $\ell = f(\ell)$, l’inégalité des accroissements finis (voir le chapitre suivant) donne souvent une majoration de l’écart : si $|f'(x)| \leq k < 1$ sur un intervalle stable $I$ contenant les termes, alors $|u_{n + 1} - \ell| \leq k|u_n - \ell|$, puis par récurrence $|u_n - \ell| \leq k^n |u_0 - \ell|$, qui tend vers $0$.
