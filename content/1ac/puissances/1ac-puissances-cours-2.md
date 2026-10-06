---
title: Puissances — partie 2 : puissances de 10 et calculs
kind: cours
summary: Les puissances de 10, la multiplication d’un décimal par une puissance de 10, et la place des puissances dans les priorités opératoires.
position: 20
visibility: public
---

## Puissances de 10

:::propriete
Pour un entier naturel $n$, $10^n$ s’écrit avec un $1$ suivi de $n$ zéros.
:::

:::exemple
- $10^1 = 10$ ; $10^2 = 100$ ; $10^3 = 1\,000$ ; $10^6 = 1\,000\,000$ (un million).
- $10^0 = 1$.
:::

:::propriete
Multiplier un nombre décimal par $10^n$, c’est déplacer la virgule de $n$ rangs vers la **droite**, en ajoutant des zéros si nécessaire.
:::

:::exemple
- $3{,}75 \times 10^2 = 375$.
- $0{,}042 \times 10^3 = 42$.
- $6{,}1 \times 10^4 = 61\,000$.
:::

:::exemple
Une distance de $150\,000\,000$ km s’écrit $1{,}5 \times 10^8$ km : c’est plus court à écrire et à lire.
:::

## Priorités opératoires avec des puissances

:::propriete
Dans un calcul, on effectue dans l’ordre :

1. les calculs entre **parenthèses** ;
2. les **puissances** ;
3. les **multiplications et divisions** ;
4. les **additions et soustractions**.
:::

:::exemple
$A = 3 + 2 \times 4^2$.

Puissance d’abord : $4^2 = 16$. Puis $2 \times 16 = 32$. Donc $A = 3 + 32 = 35$.
:::

:::exemple
$B = (3 + 2)^2 - 2^3$.

Parenthèses : $3 + 2 = 5$. Puissances : $5^2 = 25$ et $2^3 = 8$. Donc $B = 25 - 8 = 17$.
:::

:::attention
$(3 + 2)^2 = 25$ n’est pas égal à $3^2 + 2^2 = 9 + 4 = 13$.
:::
