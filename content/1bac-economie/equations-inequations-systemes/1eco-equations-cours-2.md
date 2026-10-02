---
title: Équations, inéquations et systèmes — partie 2 : les systèmes
kind: cours
summary: Équations du premier degré à deux inconnues, systèmes de deux équations par le déterminant, la substitution ou la combinaison, systèmes de trois équations, inéquations à deux inconnues et régionnement du plan.
position: 20
visibility: public
---

## Équation du premier degré à deux inconnues

:::propriete
Dans un repère, l’ensemble des points $M(x ; y)$ tels que $ax + by + c = 0$, avec $(a ; b) \neq (0 ; 0)$, est une **droite**.
:::

## Systèmes de deux équations à deux inconnues

:::definition
Le **déterminant** du système suivant est le réel $D = \begin{vmatrix} a & b \\ a' & b' \end{vmatrix} = ab' - a'b$.

$$
\begin{cases} ax + by = c \\ a'x + b'y = c' \end{cases}
$$
:::

:::theoreme
**Méthode de Cramer.**

- Si $D \neq 0$, le système a une **unique solution** : $x = \frac{D_x}{D}$ et $y = \frac{D_y}{D}$, avec $D_x = \begin{vmatrix} c & b \\ c' & b' \end{vmatrix} = cb' - c'b$ et $D_y = \begin{vmatrix} a & c \\ a' & c' \end{vmatrix} = ac' - a'c$.
- Si $D = 0$, le système n’a aucune solution ou en a une infinité : les deux droites sont parallèles ou confondues.
:::

:::exemple
$$
\begin{cases} 2x + 3y = 8 \\ 5x - y = 3 \end{cases}
$$

$D = 2 \times (-1) - 5 \times 3 = -17$, $D_x = 8 \times (-1) - 3 \times 3 = -17$ et $D_y = 2 \times 3 - 5 \times 8 = -34$ : $x = 1$ et $y = 2$. Vérification : $2 + 6 = 8$ et $5 - 2 = 3$.
:::

:::propriete
On peut aussi résoudre par **substitution** (exprimer une inconnue en fonction de l’autre dans une équation, puis remplacer dans l’autre) ou par **combinaison** (ajouter des multiples des deux équations pour éliminer une inconnue).
:::

## Systèmes de trois équations à trois inconnues

:::propriete
**Méthode du pivot.** On garde une équation, on s’en sert pour éliminer une inconnue des deux autres, puis on résout le système de deux équations obtenu.
:::

:::exemple
$$
\begin{cases} x + y + z = 6 \\ 2x - y + z = 3 \\ x + 2y - z = 2 \end{cases}
$$

On élimine $x$ : la deuxième équation moins deux fois la première donne $-3y - z = -9$ ; la troisième moins la première donne $y - 2z = -4$. Alors $y = 2z - 4$, et $-3(2z - 4) - z = -9$, soit $-7z = -21$ : $z = 3$, puis $y = 2$ et $x = 6 - 2 - 3 = 1$. La solution est $(1 ; 2 ; 3)$.
:::

## Inéquations du premier degré à deux inconnues

:::propriete
La droite $(D) : ax + by + c = 0$ partage le plan en deux **demi-plans** : dans l’un, $ax + by + c > 0$ ; dans l’autre, $ax + by + c < 0$. Pour savoir lequel est le bon, on teste un point qui n’est pas sur $(D)$, souvent l’origine.
:::

:::exemple
$2x + y - 4 \leq 0$ : on trace la droite $y = -2x + 4$. Pour $O(0 ; 0)$ : $2 \times 0 + 0 - 4 = -4 \leq 0$. Les solutions sont les points du demi-plan qui contient $O$, droite comprise.
:::

## Systèmes d’inéquations : régionnement du plan

:::exemple
Un artisan fabrique $x$ tables et $y$ chaises par semaine. Il dispose de $40$ heures ; une table demande $4$ heures et une chaise $2$ heures ; il ne peut pas vendre plus de $12$ chaises. Les contraintes sont :

$$
\begin{cases} x \geq 0 \quad \text{et} \quad y \geq 0 \\ 4x + 2y \leq 40 \\ y \leq 12 \end{cases}
$$

Les productions possibles sont les points à coordonnées entières de la région commune aux demi-plans : le quadrilatère de sommets $(0 ; 0)$, $(10 ; 0)$, $(4 ; 12)$ et $(0 ; 12)$. Le sommet $(4 ; 12)$ est l’intersection des droites $4x + 2y = 40$ et $y = 12$.
:::

:::attention
Pour une inégalité stricte, la droite frontière n’appartient pas à la région : on la trace en pointillés.
:::
