---
title: Arithmétique dans ℕ — partie 1 : parité, divisibilité, nombres premiers
kind: cours
summary: Nombres pairs et impairs, multiples et diviseurs, critères de divisibilité par 2, 3, 4, 5, 9 et 10, nombres premiers et méthode pour reconnaître un nombre premier.
position: 10
visibility: public
---

## Nombres pairs et impairs

:::definition
Un entier naturel $n$ est **pair** s’il s’écrit $n = 2k$ avec $k \in \mathbb{N}$, et **impair** s’il s’écrit $n = 2k + 1$ avec $k \in \mathbb{N}$.
:::

:::propriete
- La somme de deux pairs, ou de deux impairs, est paire ; la somme d’un pair et d’un impair est impaire.
- Le produit de deux entiers est pair dès que l’un des deux est pair.
- Le carré d’un pair est pair ; le carré d’un impair est impair.
:::

:::exemple
- Deux entiers consécutifs : $n + (n + 1) = 2n + 1$ est impair.
- $n(n + 1)$ est toujours pair : l’un des deux facteurs consécutifs est pair.
:::

## Multiples et diviseurs

:::definition
Soit $a$ et $b$ deux entiers naturels, $b \neq 0$. On dit que $b$ **divise** $a$, ou que $a$ est un **multiple** de $b$, s’il existe un entier naturel $k$ tel que $a = kb$.
:::

:::exemple
Les diviseurs de $36$ sont $1$, $2$, $3$, $4$, $6$, $9$, $12$, $18$ et $36$. On les trouve par paires : $1 \times 36$, $2 \times 18$, $3 \times 12$, $4 \times 9$, $6 \times 6$.
:::

:::propriete
Si $d$ divise $a$ et $b$, alors $d$ divise $a + b$, $a - b$ (si $a \geq b$) et $ka$ pour tout entier $k$.
:::

:::exemple
La somme de trois entiers consécutifs est un multiple de $3$ : $n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)$.
:::

## Critères de divisibilité

:::propriete
Un entier est divisible :

- par $2$ si son chiffre des unités est pair ;
- par $5$ si son chiffre des unités est $0$ ou $5$ ; par $10$ s’il est $0$ ;
- par $4$ si le nombre formé par ses deux derniers chiffres est divisible par $4$ ;
- par $3$ si la somme de ses chiffres est divisible par $3$ ;
- par $9$ si la somme de ses chiffres est divisible par $9$.
:::

:::exemple
$1\,236$ : le chiffre des unités est pair (divisible par $2$) ; $36$ est divisible par $4$ (divisible par $4$) ; $1 + 2 + 3 + 6 = 12$ (divisible par $3$, pas par $9$).
:::

## Nombres premiers

:::definition
Un entier naturel est **premier** s’il a exactement deux diviseurs : $1$ et lui-même. Ainsi $0$ et $1$ ne sont pas premiers.
:::

:::exemple
Les nombres premiers inférieurs à $50$ sont $2$, $3$, $5$, $7$, $11$, $13$, $17$, $19$, $23$, $29$, $31$, $37$, $41$, $43$ et $47$.
:::

:::propriete
**Pour savoir si $n$ est premier**, on le divise successivement par les nombres premiers $2$, $3$, $5$, $7$, … dont le carré est inférieur ou égal à $n$. Si aucun ne le divise, $n$ est premier.
:::

:::exemple
- $97$ : $\sqrt{97} \approx 9{,}8$ ; ni $2$, ni $3$, ni $5$, ni $7$ ne divisent $97$ : il est premier.
- $91 = 7 \times 13$ n’est pas premier.
:::

:::attention
$2$ est le seul nombre premier pair. Un nombre impair n’est pas forcément premier : $9$, $15$, $21$ ne le sont pas.
:::
