---
title: Série 1 — partie 2 : les systèmes
kind: serie
summary: Méthode de Cramer, systèmes sans solution ou avec une infinité, changement d’inconnues, système de trois équations, mise en équation et régionnement du plan, avec les corrigés.
position: 20
visibility: enrolled
---

Cinq exercices sur la deuxième partie du cours.

:::exercice Méthode de Cramer
Résoudre les systèmes :

$$
(S_1) \begin{cases} 3x - 2y = 4 \\ x + 4y = 6 \end{cases} \qquad (S_2) \begin{cases} 2x - 4y = 3 \\ -x + 2y = 1 \end{cases} \qquad (S_3) \begin{cases} x - 2y = 1 \\ 3x - 6y = 3 \end{cases}
$$

:::corrige
1. $D = 3 \times 4 - 1 \times (-2) = 14$, $D_x = 4 \times 4 - 6 \times (-2) = 28$, $D_y = 3 \times 6 - 1 \times 4 = 14$ : $x = 2$, $y = 1$.
2. $D = 4 - 4 = 0$. En multipliant la deuxième équation par $-2$ : $2x - 4y = -2$, ce qui contredit $2x - 4y = 3$ : pas de solution.
3. $D = -6 + 6 = 0$. La deuxième équation est la première multipliée par $3$ : une infinité de solutions, les couples $(1 + 2y ; y)$ avec $y$ réel.
:::
:::

:::exercice Changement d’inconnues
Résoudre, pour $x \neq 0$ et $y \neq 0$ :

$$
\begin{cases} \dfrac{2}{x} + \dfrac{3}{y} = 2 \\ \dfrac{4}{x} - \dfrac{1}{y} = -3 \end{cases}
$$

:::corrige
On pose $X = \frac{1}{x}$ et $Y = \frac{1}{y}$ : $2X + 3Y = 2$ et $4X - Y = -3$. $D = -2 - 12 = -14$, $D_X = 2 \times (-1) - (-3) \times 3 = 7$, $D_Y = 2 \times (-3) - 4 \times 2 = -14$ : $X = -\frac{1}{2}$ et $Y = 1$. Donc $x = -2$ et $y = 1$.
:::
:::

:::exercice Trois inconnues
Résoudre :

$$
\begin{cases} x + y - z = 2 \\ 2x + y + z = 6 \\ x - y + 2z = 3 \end{cases}
$$

:::corrige
La deuxième équation moins deux fois la première : $-y + 3z = 2$. La troisième moins la première : $-2y + 3z = 1$. En soustrayant ces deux équations : $y = 1$, puis $3z = 3$, $z = 1$, et $x = 2 - 1 + 1 = 2$. La solution est $(2 ; 1 ; 1)$.
:::
:::

:::exercice Mise en équation
Un cinéma vend des billets à $40$ dirhams pour les adultes et à $25$ dirhams pour les enfants. Un soir, il vend $120$ billets pour une recette de $4\,050$ dirhams. Combien d’adultes et d’enfants ?

:::corrige
$x + y = 120$ et $40x + 25y = 4\,050$. Avec $y = 120 - x$ : $40x + 3\,000 - 25x = 4\,050$, soit $15x = 1\,050$, $x = 70$ et $y = 50$ : $70$ adultes et $50$ enfants.
:::
:::

:::exercice Régionnement
1. Représenter l’ensemble des points $M(x ; y)$ tels que $x \geq 0$, $y \geq 0$, $x + y \leq 6$ et $x + 3y \leq 12$, et donner ses sommets.
2. Les points $A(2 ; 3)$ et $B(5 ; 2)$ sont-ils dans cette région ?

:::corrige
1. C’est le quadrilatère de sommets $(0 ; 0)$, $(6 ; 0)$, $(3 ; 3)$ et $(0 ; 4)$ ; le point $(3 ; 3)$ vient de $x + y = 6$ et $x + 3y = 12$ (on soustrait : $2y = 6$).
2. $A$ : $2 + 3 = 5 \leq 6$ et $2 + 9 = 11 \leq 12$ : oui. $B$ : $5 + 2 = 7 > 6$ : non.
:::
:::
