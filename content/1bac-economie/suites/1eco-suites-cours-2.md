---
title: Les suites numériques — partie 2 : suites arithmétiques et géométriques
kind: cours
summary: Suites arithmétiques et géométriques, terme général, sens de variation, sommes de termes consécutifs, moyennes, suites auxiliaires et applications.
position: 20
visibility: public
---

## Suites arithmétiques

:::definition
$(u_n)$ est **arithmétique** de raison $r$ si $u_{n + 1} = u_n + r$ pour tout $n$.
:::

:::propriete
- $u_n = u_0 + nr$ et, plus généralement, $u_n = u_p + (n - p)r$.
- Croissante si $r > 0$, décroissante si $r < 0$.
- Trois réels $a$, $b$, $c$ sont des termes consécutifs d’une suite arithmétique si et seulement si $2b = a + c$ ($b$ est la **moyenne arithmétique** de $a$ et $c$).
- $u_p + u_{p + 1} + \cdots + u_n = (n - p + 1) \times \frac{u_p + u_n}{2}$, et $1 + 2 + \cdots + n = \frac{n(n + 1)}{2}$.
:::

:::exemple
$u_3 = 10$ et $u_8 = 25$ : $5r = 15$, $r = 3$, $u_0 = 1$ et $u_n = 1 + 3n$. Somme $u_0 + \cdots + u_{19} = 20 \times \frac{1 + 58}{2} = 590$.
:::

## Suites géométriques

:::definition
$(u_n)$ est **géométrique** de raison $q$ si $u_{n + 1} = q u_n$ pour tout $n$.
:::

:::propriete
- $u_n = u_0 q^n$ et, plus généralement, $u_n = u_p q^{n - p}$.
- Si $u_0 > 0$ : croissante si $q > 1$, décroissante si $0 < q < 1$.
- Trois réels non nuls $a$, $b$, $c$ sont des termes consécutifs d’une suite géométrique si et seulement si $b^2 = ac$.
- Pour $q \neq 1$ : $u_p + \cdots + u_n = u_p \times \frac{1 - q^{n - p + 1}}{1 - q}$, et $1 + q + \cdots + q^n = \frac{1 - q^{n + 1}}{1 - q}$.
:::

:::exemple
$u_0 = 3$, $q = 2$ : $u_n = 3 \times 2^n$, et $u_0 + \cdots + u_9 = 3 \times \frac{1 - 2^{10}}{1 - 2} = 3 \times 1023 = 3069$.
:::

## Suites auxiliaires

Pour une suite $u_{n + 1} = au_n + b$ ($a \neq 1$), on cherche le réel $\ell$ tel que $\ell = a\ell + b$ ; la suite $v_n = u_n - \ell$ est alors géométrique de raison $a$.

:::exemple
$u_0 = 0$ et $u_{n + 1} = \frac{1}{2}u_n + 1$ : $\ell = \frac{1}{2}\ell + 1$ donne $\ell = 2$. Avec $v_n = u_n - 2$ : $v_{n + 1} = \frac{1}{2}u_n - 1 = \frac{1}{2}v_n$, géométrique de raison $\frac{1}{2}$ et de premier terme $v_0 = -2$. Donc $u_n = 2 - 2\left(\frac{1}{2}\right)^n$.
:::

:::exemple
Une suite $u_{n + 1} = \frac{u_n}{u_n + 1}$ se ramène à une suite **arithmétique** en posant $w_n = \frac{1}{u_n}$ : $w_{n + 1} = \frac{u_n + 1}{u_n} = w_n + 1$.
:::

## Applications

:::exemple
Un capital $C_0$ placé à intérêts composés au taux annuel $t$ vaut $C_n = C_0(1 + t)^n$ après $n$ ans : c’est une suite géométrique de raison $1 + t$. À $5\,\%$, $10\,000$ dirhams deviennent $10\,000 \times 1{,}05^{10} \approx 16\,289$ dirhams en $10$ ans.
:::

:::attention
Le nombre de termes de $u_p + \cdots + u_n$ est $n - p + 1$.
:::
