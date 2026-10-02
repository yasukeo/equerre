---
title: Suites numériques — partie 1 : récurrence, monotonie, suites usuelles
kind: cours
summary: Raisonnement par récurrence, suites majorées, minorées et bornées, sens de variation, suites arithmétiques et géométriques, sommes de termes et suites auxiliaires.
position: 10
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

:::exemple
Soit $(u_n)$ définie par $u_0 = 1$ et $u_{n + 1} = 2u_n - 3$ pour tout $n$. Elle n’est ni arithmétique ni géométrique. On pose $v_n = u_n - 3$ (on cherche $\ell$ tel que $\ell = 2\ell - 3$, soit $\ell = 3$).

$v_{n + 1} = u_{n + 1} - 3 = 2u_n - 6 = 2(u_n - 3) = 2v_n$ : $(v_n)$ est géométrique de raison $2$ et de premier terme $v_0 = -2$. Donc $v_n = -2 \times 2^n = -2^{n + 1}$ et $u_n = 3 - 2^{n + 1}$.
:::

### Méthode : la suite auxiliaire

Pour une suite définie par $u_{n + 1} = a u_n + b$ avec $a \neq 1$, on cherche le réel $\ell$ tel que $\ell = a\ell + b$, puis on montre que $v_n = u_n - \ell$ est géométrique de raison $a$. On en déduit $v_n$, puis $u_n = v_n + \ell$.

:::exemple
**Somme des premiers entiers, par récurrence.** Montrons que pour tout $n \geq 1$, $1 + 2 + \cdots + n = \dfrac{n(n + 1)}{2}$.

- Pour $n = 1$ : $1 = \frac{1 \times 2}{2}$.
- Si l’égalité est vraie au rang $n$, alors $1 + \cdots + n + (n + 1) = \frac{n(n + 1)}{2} + (n + 1) = \frac{(n + 1)(n + 2)}{2}$ : elle est vraie au rang $n + 1$.
:::

:::exemple
**Sens de variation.** $u_n = \dfrac{n}{n + 1}$ : $u_{n + 1} - u_n = \frac{n + 1}{n + 2} - \frac{n}{n + 1} = \frac{(n + 1)^2 - n(n + 2)}{(n + 1)(n + 2)} = \frac{1}{(n + 1)(n + 2)} > 0$. La suite est strictement croissante, et majorée par $1$ car $u_n = 1 - \frac{1}{n + 1} < 1$.
:::

## Applications en économie

:::propriete
- **Intérêts simples** au taux $t$ : chaque période rapporte $t$ fois le capital initial $C_0$ ; le capital est une suite arithmétique, $C_n = C_0(1 + nt)$.
- **Intérêts composés** au taux $t$ : les intérêts s’ajoutent au capital ; c’est une suite géométrique de raison $1 + t$, $C_n = C_0(1 + t)^n$.
- Une **hausse** de $t\,\%$ multiplie par $1 + \frac{t}{100}$, une **baisse** de $t\,\%$ par $1 - \frac{t}{100}$.
:::

:::exemple
$5\,000$ dirhams placés à $3\,\%$ par an, à intérêts composés, deviennent $5\,000 \times 1{,}03^{n}$ dirhams après $n$ ans. Le capital dépasse $6\,000$ dirhams quand $1{,}03^n > 1{,}2$, c’est-à-dire dès $n = 7$ (car $1{,}03^6 \approx 1{,}194$ et $1{,}03^7 \approx 1{,}230$).
:::
