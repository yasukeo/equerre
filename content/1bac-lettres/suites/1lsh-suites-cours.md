---
title: Suites numériques — partie 1 : généralités et suites arithmétiques
kind: cours
summary: Ce qu’est une suite, ses termes et ses deux modes de définition, sens de variation, suites arithmétiques, terme général et somme de termes consécutifs, avec des exemples de la vie courante.
position: 10
visibility: public
---

## Qu’est-ce qu’une suite ?

:::definition
Une **suite numérique** $(u_n)$ associe à chaque entier naturel $n$ un réel $u_n$, appelé **terme de rang $n$**. Le premier terme est souvent $u_0$ (ou $u_1$).
:::

Une suite peut être définie de deux façons :

- **par une formule** (terme général) : $u_n = 2n + 3$ donne $u_0 = 3$, $u_1 = 5$, $u_{10} = 23$ ;
- **par récurrence** : on donne le premier terme et la façon de passer d’un terme au suivant, par exemple $u_0 = 1$ et $u_{n + 1} = 2u_n + 1$, d’où $u_1 = 3$, $u_2 = 7$, $u_3 = 15$.

:::attention
Avec une définition par récurrence, pour calculer $u_{10}$ il faut calculer tous les termes précédents ; avec une formule, on remplace directement $n$ par $10$.
:::

## Sens de variation

:::definition
La suite $(u_n)$ est **croissante** si $u_{n + 1} \geq u_n$ pour tout $n$, et **décroissante** si $u_{n + 1} \leq u_n$ pour tout $n$.
:::

Pour étudier le sens de variation, on calcule $u_{n + 1} - u_n$ et on étudie son signe.

:::exemple
$u_n = n^2 + 1$ : $u_{n + 1} - u_n = (n + 1)^2 + 1 - n^2 - 1 = 2n + 1 > 0$. La suite est croissante.
:::

## Suites arithmétiques

:::definition
Une suite est **arithmétique** de **raison** $r$ si l’on passe d’un terme au suivant en ajoutant toujours le même nombre $r$ :

$$
u_{n + 1} = u_n + r \quad \text{pour tout } n
$$
:::

:::propriete
Si $(u_n)$ est arithmétique de raison $r$ :

- $u_n = u_0 + nr$, et plus généralement $u_n = u_p + (n - p)r$ ;
- elle est croissante si $r > 0$, décroissante si $r < 0$, constante si $r = 0$.
:::

:::exemple
$u_0 = 5$ et $r = 3$ : $u_n = 5 + 3n$, donc $u_{20} = 65$.
:::

:::exemple
Pour montrer qu’une suite est arithmétique, on calcule $u_{n + 1} - u_n$ : si le résultat ne dépend pas de $n$, c’est la raison. Avec $u_n = 7 - 2n$ : $u_{n + 1} - u_n = 7 - 2(n + 1) - 7 + 2n = -2$, la suite est arithmétique de raison $-2$.
:::

### Somme de termes consécutifs

:::propriete
$$
S = \text{(nombre de termes)} \times \frac{\text{premier terme} + \text{dernier terme}}{2}
$$

En particulier, $1 + 2 + \cdots + n = \frac{n(n + 1)}{2}$.
:::

:::exemple
$S = u_0 + u_1 + \cdots + u_{20}$ avec $u_n = 5 + 3n$ : il y a $21$ termes, donc $S = 21 \times \frac{5 + 65}{2} = 735$.
:::

:::exemple
**Un salaire.** Un salaire de départ de $4\,000$ dirhams augmente de $150$ dirhams chaque année. Après $n$ années, il vaut $4\,000 + 150n$ : c’est une suite arithmétique de raison $150$. Après $10$ ans, il vaut $5\,500$ dirhams.
:::
