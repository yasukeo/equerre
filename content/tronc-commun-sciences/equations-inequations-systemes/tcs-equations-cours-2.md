---
title: Équations, inéquations et systèmes — partie 2 : les systèmes
kind: cours
summary: Systèmes de deux équations à deux inconnues par substitution, par combinaison et par le déterminant, cas où le déterminant est nul, inéquations à deux inconnues et régionnement du plan.
position: 20
visibility: public
---

## Résoudre un système de deux équations

:::propriete
- **Substitution** : on exprime une inconnue en fonction de l’autre dans une équation, puis on remplace dans l’autre.
- **Combinaison** : on multiplie les équations par des nombres bien choisis et on les additionne pour éliminer une inconnue.
:::

:::exemple
$$
\begin{cases} x + 2y = 7 \\ 3x - y = 7 \end{cases}
$$

De la première : $x = 7 - 2y$. Dans la seconde : $21 - 6y - y = 7$, donc $y = 2$, puis $x = 3$. La solution est $(3 ; 2)$.
:::

## La méthode du déterminant

:::theoreme
Le déterminant du système $ax + by = c$, $a'x + b'y = c'$ est $D = ab' - a'b$.

- Si $D \neq 0$ : une unique solution $x = \frac{D_x}{D}$ et $y = \frac{D_y}{D}$, avec $D_x = cb' - c'b$ et $D_y = ac' - a'c$.
- Si $D = 0$ : soit aucune solution, soit une infinité de solutions.
:::

:::exemple
$$
\begin{cases} 2x + 3y = 1 \\ 5x + 4y = 6 \end{cases}
$$

$D = 8 - 15 = -7$, $D_x = 4 - 18 = -14$, $D_y = 12 - 5 = 7$ : $x = 2$, $y = -1$.
:::

:::exemple
$2x - y = 3$ et $-4x + 2y = -6$ : $D = 4 - 4 = 0$, et la seconde équation est la première multipliée par $-2$ : une infinité de solutions, les couples $(x ; 2x - 3)$. Avec $-4x + 2y = 1$ à la place, les équations se contredisent : aucune solution.
:::

## Inéquations à deux inconnues

:::propriete
Dans un repère, la droite $ax + by + c = 0$ partage le plan en deux demi-plans : l’un où $ax + by + c > 0$, l’autre où $ax + by + c < 0$. On détermine le bon en testant un point, souvent l’origine.
:::

:::exemple
**Régionnement.** Les points dont les coordonnées vérifient $x \geq 0$, $y \geq 0$, $x + 2y \leq 8$ et $3x + y \leq 9$ forment le quadrilatère de sommets $(0 ; 0)$, $(3 ; 0)$, $(2 ; 3)$ et $(0 ; 4)$. Le sommet $(2 ; 3)$ est la solution du système $x + 2y = 8$, $3x + y = 9$.
:::

:::attention
Vérifiez toujours une solution en la remplaçant dans les **deux** équations du système.
:::
