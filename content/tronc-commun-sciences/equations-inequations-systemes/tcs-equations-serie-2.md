---
title: Série 1 — partie 2 : les systèmes
kind: serie
summary: Systèmes par substitution et par le déterminant, déterminant nul, mise en équation et régionnement du plan, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Substitution et déterminant
Résoudre :

$$
(S_1) \begin{cases} x + 2y = 7 \\ 3x - y = 7 \end{cases} \qquad (S_2) \begin{cases} 2x + 3y = 1 \\ 5x + 4y = 6 \end{cases}
$$

:::corrige
- $(S_1)$ : $x = 7 - 2y$, puis $21 - 7y = 7$, donc $y = 2$ et $x = 3$.
- $(S_2)$ : $D = -7$, $D_x = -14$, $D_y = 7$ : $x = 2$ et $y = -1$.
:::
:::

:::exercice Déterminant nul
Résoudre :

$$
(S_3) \begin{cases} 2x - y = 3 \\ -4x + 2y = -6 \end{cases} \qquad (S_4) \begin{cases} 2x - y = 3 \\ -4x + 2y = 1 \end{cases}
$$

:::corrige
Les deux systèmes ont $D = 4 - 4 = 0$.

- $(S_3)$ : la seconde équation est la première multipliée par $-2$ : une infinité de solutions, les couples $(x ; 2x - 3)$.
- $(S_4)$ : en multipliant la première par $-2$, on obtient $-4x + 2y = -6$, ce qui contredit $-4x + 2y = 1$ : aucune solution.
:::
:::

:::exercice Mise en équation
Un rectangle a un périmètre de $34$ cm, et sa longueur dépasse sa largeur de $5$ cm. Trouver ses dimensions.

:::corrige
$2(L + \ell) = 34$ et $L - \ell = 5$, soit $L + \ell = 17$ et $L - \ell = 5$. En additionnant : $2L = 22$, donc $L = 11$ cm et $\ell = 6$ cm.
:::
:::

:::exercice Régionnement
1. Représenter les points $M(x ; y)$ tels que $x \geq 0$, $y \geq 0$, $x + 2y \leq 8$ et $3x + y \leq 9$.
2. Déterminer les sommets de cette région.
3. Le point $(1 ; 3)$ est-il dans la région ? Et $(3 ; 1)$ ?

:::corrige
1. C’est l’intersection de quatre demi-plans ; l’origine vérifie les deux dernières inégalités.
2. $(0 ; 0)$, $(3 ; 0)$, $(0 ; 4)$, et l’intersection de $x + 2y = 8$ et $3x + y = 9$ : $D = 1 - 6 = -5$, $D_x = 8 - 18 = -10$, $D_y = 9 - 24 = -15$, soit $(2 ; 3)$.
3. $(1 ; 3)$ : $1 + 6 = 7 \leq 8$ et $3 + 3 = 6 \leq 9$, oui. $(3 ; 1)$ : $9 + 1 = 10 > 9$, non.
:::
:::
