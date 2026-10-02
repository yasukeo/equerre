---
title: Arithmétique dans ℤ — partie 1 : divisibilité, congruences, nombres premiers
kind: cours
summary: Divisibilité dans ℤ, division euclidienne, congruences modulo n et leurs règles de calcul, critères de divisibilité, nombres premiers, décomposition en facteurs premiers.
position: 10
visibility: public
---

## Divisibilité

:::definition
Soit $a$ et $b$ deux entiers relatifs, $b \neq 0$. On dit que $b$ **divise** $a$, et on note $b \mid a$, s’il existe un entier $k$ tel que $a = kb$. On dit aussi que $a$ est un **multiple** de $b$.
:::

:::propriete
- Si $a \mid b$ et $b \mid c$, alors $a \mid c$.
- Si $a \mid b$ et $a \mid c$, alors $a \mid (bu + cv)$ pour tous entiers $u$ et $v$.
- Si $a \mid b$ et $b \mid a$, alors $a = b$ ou $a = -b$.
:::

:::exemple
Trouver les entiers $n$ tels que $n + 2 \mid 2n + 7$ : comme $n + 2 \mid 2(n + 2)$, il divise la différence $2n + 7 - 2(n + 2) = 3$. Donc $n + 2 \in \{-3 ; -1 ; 1 ; 3\}$, soit $n \in \{-5 ; -3 ; -1 ; 1\}$ (on vérifie que chacun convient).
:::

## Division euclidienne

:::theoreme
Pour tout entier relatif $a$ et tout entier naturel non nul $b$, il existe un unique couple d’entiers $(q ; r)$ tel que :

$$
a = bq + r \qquad \text{et} \qquad 0 \leq r < b
$$

$q$ est le **quotient** et $r$ le **reste** de la division euclidienne de $a$ par $b$.
:::

:::exemple
$-17 = 5 \times (-4) + 3$ : le quotient est $-4$ et le reste $3$ (et non $-2$, car le reste doit être positif).
:::

## Congruences

:::definition
Soit $n \geq 2$. Deux entiers $a$ et $b$ sont **congrus modulo $n$**, et on note $a \equiv b \ [n]$, si $n$ divise $a - b$. Cela revient à dire que $a$ et $b$ ont le même reste dans la division par $n$.
:::

:::propriete
Si $a \equiv b \ [n]$ et $c \equiv d \ [n]$, alors :

- $a + c \equiv b + d \ [n]$ et $ac \equiv bd \ [n]$ ;
- $a^k \equiv b^k \ [n]$ pour tout entier naturel $k$.
:::

:::exemple
Reste de $2^{100}$ dans la division par $7$ : $2^3 = 8 \equiv 1 \ [7]$. Comme $100 = 3 \times 33 + 1$, $2^{100} = \left(2^3\right)^{33} \times 2 \equiv 1 \times 2 \ [7]$. Le reste est $2$.
:::

:::exemple
**Critères de divisibilité.** $10 \equiv 1 \ [9]$, donc $10^k \equiv 1 \ [9]$ : un entier est congru modulo $9$ à la somme de ses chiffres. De même $10 \equiv -1 \ [11]$ : un entier est congru modulo $11$ à la somme alternée de ses chiffres (en partant des unités).
:::

### Tableau de congruences

Pour étudier une propriété qui dépend du reste de $n$ modulo $k$, on fait un tableau avec les $k$ restes possibles.

:::exemple
Montrer que $n^2 + n$ est pair pour tout $n$ : modulo $2$, si $n \equiv 0$, $n^2 + n \equiv 0$ ; si $n \equiv 1$, $n^2 + n \equiv 1 + 1 \equiv 0$. Dans tous les cas, $n^2 + n \equiv 0 \ [2]$.
:::

## Nombres premiers

:::definition
Un entier naturel $p \geq 2$ est **premier** s’il a exactement deux diviseurs positifs : $1$ et $p$.
:::

:::propriete
- Tout entier $n \geq 2$ a au moins un diviseur premier.
- Si $n \geq 2$ n’est divisible par aucun nombre premier $p$ tel que $p^2 \leq n$, alors $n$ est premier.
- Il y a une infinité de nombres premiers.
:::

:::exemple
$127$ est-il premier ? $\sqrt{127} \approx 11{,}3$ : on teste $2$, $3$, $5$, $7$, $11$. Aucun ne divise $127$, donc $127$ est premier.
:::

:::theoreme
**Décomposition en facteurs premiers.** Tout entier $n \geq 2$ s’écrit de façon unique (à l’ordre près) comme un produit de nombres premiers : $n = p_1^{\alpha_1} p_2^{\alpha_2} \cdots p_k^{\alpha_k}$. Le nombre de ses diviseurs positifs est $(\alpha_1 + 1)(\alpha_2 + 1)\cdots(\alpha_k + 1)$.
:::

:::exemple
$360 = 2^3 \times 3^2 \times 5$ a $(3 + 1)(2 + 1)(1 + 1) = 24$ diviseurs positifs.
:::
