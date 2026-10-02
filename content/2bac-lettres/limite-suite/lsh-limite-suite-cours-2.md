---
title: Limite d’une suite — partie 2 : suites géométriques et convergence
kind: cours
summary: Limite de qⁿ selon la valeur de q, limites des suites géométriques et de leurs sommes, suites qui se ramènent à une suite géométrique, comparaison des suites.
position: 20
visibility: public
---

## Limite de qⁿ

:::propriete
- Si $q > 1$ : $\lim q^n = +\infty$.
- Si $q = 1$ : $q^n = 1$ pour tout $n$.
- Si $-1 < q < 1$ : $\lim q^n = 0$.
- Si $q \leq -1$ : la suite $(q^n)$ n’a pas de limite.
:::

:::exemple
$\lim 2^n = +\infty$, $\lim \left(\frac{1}{2}\right)^n = 0$, $\lim (0{,}99)^n = 0$, $\lim \left(-\frac{1}{3}\right)^n = 0$, et $(-2)^n$ n’a pas de limite.
:::

## Suites géométriques

:::propriete
Si $u_n = u_0 q^n$ avec $u_0 \neq 0$ :

- si $-1 < q < 1$, $\lim u_n = 0$ ;
- si $q > 1$, $\lim u_n = +\infty$ si $u_0 > 0$ et $-\infty$ si $u_0 < 0$.
:::

:::exemple
$u_n = 5 \times 0{,}8^n$ tend vers $0$ ; $v_n = -3 \times 1{,}1^n$ tend vers $-\infty$.
:::

### Somme des termes

:::exemple
$S_n = 1 + \frac{1}{2} + \frac{1}{4} + \cdots + \left(\frac{1}{2}\right)^n = \frac{1 - \left(\frac{1}{2}\right)^{n + 1}}{1 - \frac{1}{2}} = 2\left(1 - \left(\frac{1}{2}\right)^{n + 1}\right)$. Comme $\left(\frac{1}{2}\right)^{n + 1} \to 0$, $\lim S_n = 2$.
:::

## Limite d’une suite définie avec une suite auxiliaire

Quand $u_n = \ell + v_n$ avec $(v_n)$ géométrique de raison $q$, $-1 < q < 1$, alors $v_n \to 0$ et $u_n \to \ell$.

:::exemple
$u_n = 4 + \left(\frac{1}{2}\right)^n$ tend vers $4$. Une population qui suit $P_n = 1\,000 - 600 \times 0{,}9^n$ se rapproche de $1\,000$.
:::

## Comparer pour conclure

:::propriete
- Si $u_n \geq v_n$ pour tout $n$ et $\lim v_n = +\infty$, alors $\lim u_n = +\infty$.
- Si $v_n \leq u_n \leq w_n$ pour tout $n$ et $\lim v_n = \lim w_n = \ell$, alors $\lim u_n = \ell$ (théorème des gendarmes).
:::

:::exemple
$u_n = \frac{(-1)^n}{n}$ ($n \geq 1$) : $-\frac{1}{n} \leq u_n \leq \frac{1}{n}$, et les deux bornes tendent vers $0$, donc $\lim u_n = 0$.
:::

:::attention
« $u_n$ diminue » ne veut pas dire « $u_n$ tend vers $0$ » : $u_n = 3 + \frac{1}{n}$ diminue mais tend vers $3$.
:::
