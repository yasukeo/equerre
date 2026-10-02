---
title: Suites numériques — partie 2 : suites géométriques
kind: cours
summary: Suites géométriques, raison, terme général, sens de variation, somme de termes consécutifs, pourcentages d’évolution, et suites qui se ramènent à une suite géométrique.
position: 20
visibility: public
---

## Suites géométriques

:::definition
Une suite est **géométrique** de **raison** $q$ si l’on passe d’un terme au suivant en multipliant toujours par le même nombre $q$ :

$$
u_{n + 1} = q \times u_n \quad \text{pour tout } n
$$
:::

:::propriete
Si $(u_n)$ est géométrique de raison $q$ : $u_n = u_0 \times q^n$, et plus généralement $u_n = u_p \times q^{n - p}$.
:::

:::exemple
$u_0 = 3$ et $q = 2$ : $u_n = 3 \times 2^n$, donc $u_5 = 96$.
:::

:::exemple
Pour montrer qu’une suite de termes non nuls est géométrique, on calcule $\frac{u_{n + 1}}{u_n}$ : si le résultat ne dépend pas de $n$, c’est la raison. Avec $u_n = 5 \times 3^n$ : $\frac{u_{n + 1}}{u_n} = \frac{5 \times 3^{n + 1}}{5 \times 3^n} = 3$.
:::

### Sens de variation

:::propriete
Si $u_0 > 0$ : la suite géométrique de raison $q$ est croissante si $q > 1$, décroissante si $0 < q < 1$.
:::

### Somme de termes consécutifs

:::propriete
Pour $q \neq 1$ :

$$
S = \text{premier terme} \times \frac{1 - q^{\text{nombre de termes}}}{1 - q}
$$

En particulier, $1 + q + q^2 + \cdots + q^n = \frac{1 - q^{n + 1}}{1 - q}$.
:::

:::exemple
$1 + 2 + 4 + \cdots + 2^{9} = \frac{1 - 2^{10}}{1 - 2} = 1023$.
:::

## Pourcentages

:::propriete
- Augmenter de $t\,\%$, c’est multiplier par $1 + \frac{t}{100}$.
- Diminuer de $t\,\%$, c’est multiplier par $1 - \frac{t}{100}$.

Une quantité qui évolue chaque année du même pourcentage forme donc une suite géométrique.
:::

:::exemple
Une ville de $40\,000$ habitants gagne $3\,\%$ d’habitants par an. Après $n$ années, elle en compte $P_n = 40\,000 \times 1{,}03^n$ ; après $5$ ans, environ $46\,371$.
:::

## Se ramener à une suite géométrique

Une suite définie par $u_{n + 1} = au_n + b$ n’est en général ni arithmétique ni géométrique. On utilise alors une **suite auxiliaire** donnée par l’énoncé.

:::exemple
$u_0 = 5$ et $u_{n + 1} = \frac{1}{2}u_n + 2$. On pose $v_n = u_n - 4$. Alors $v_{n + 1} = u_{n + 1} - 4 = \frac{1}{2}u_n - 2 = \frac{1}{2}(u_n - 4) = \frac{1}{2}v_n$ : $(v_n)$ est géométrique de raison $\frac{1}{2}$, avec $v_0 = 1$. Donc $v_n = \left(\frac{1}{2}\right)^n$ et $u_n = 4 + \left(\frac{1}{2}\right)^n$.
:::
