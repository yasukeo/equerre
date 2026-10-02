---
title: Suites numériques : l’essentiel
kind: resume
summary: Les définitions, théorèmes et méthodes du chapitre sur une page, pour réviser avant un contrôle ou l’examen.
position: 10
visibility: public
---

## Récurrence

Pour montrer $P(n)$ pour tout $n \geq n_0$ : **initialisation** ($P(n_0)$ vraie), puis **hérédité** (si $P(n)$ est vraie pour un $n \geq n_0$, alors $P(n + 1)$ est vraie).

## Sens de variation

- Signe de $u_{n + 1} - u_n$ ; ou, si $u_n > 0$, comparer $\frac{u_{n + 1}}{u_n}$ à $1$.
- Si $u_n = f(n)$, la suite a le sens de variation de $f$ sur $[0 ; +\infty[$.
- Si $u_{n + 1} = f(u_n)$ avec $f$ croissante sur $I$ stable, la suite est monotone : on compare $u_0$ et $u_1$.

## Suites usuelles

:::propriete
- **Arithmétique** de raison $r$ : $u_n = u_p + (n - p)r$ ; somme de termes consécutifs $= \text{(nombre de termes)} \times \frac{\text{premier} + \text{dernier}}{2}$.
- **Géométrique** de raison $q$ : $u_n = u_p q^{n - p}$ ; pour $q \neq 1$, somme $= \text{premier terme} \times \frac{1 - q^{\text{nombre de termes}}}{1 - q}$.
:::

**Suite $u_{n + 1} = a u_n + b$** ($a \neq 1$) : on résout $\ell = a\ell + b$, puis $v_n = u_n - \ell$ est géométrique de raison $a$.

## Limites

:::propriete
- $\lim n^p = +\infty$, $\lim \sqrt{n} = +\infty$, $\lim \frac{1}{n^p} = 0$ ($p \geq 1$).
- $q > 1$ : $\lim q^n = +\infty$ ; $-1 < q < 1$ : $\lim q^n = 0$ ; $q \leq -1$ : pas de limite.
- Si $\lim u_n = \ell$ et $f$ continue en $\ell$, alors $\lim f(u_n) = f(\ell)$.
:::

:::theoreme
- **Comparaison** : $u_n \leq v_n$ et $\lim u_n = +\infty$ donnent $\lim v_n = +\infty$.
- **Gendarmes** : $v_n \leq u_n \leq w_n$ et $\lim v_n = \lim w_n = \ell$ donnent $\lim u_n = \ell$.
- **Monotone** : croissante et majorée, ou décroissante et minorée, la suite converge.
:::

## Suite $u_{n + 1} = f(u_n)$

1. Encadrer $u_n$ par récurrence dans un intervalle $I$ tel que $f(I) \subset I$.
2. Sens de variation, puis convergence (suite monotone et bornée).
3. Si $f$ est continue sur $I$ et $\ell \in I$, la limite vérifie $f(\ell) = \ell$.

:::attention
Le théorème des suites monotones donne l’existence de la limite, pas sa valeur. Et une limite trouvée par $f(\ell) = \ell$ doit être choisie parmi les solutions qui sont dans $I$.
:::
