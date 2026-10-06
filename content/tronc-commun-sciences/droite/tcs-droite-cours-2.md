---
title: La droite dans le plan — partie 2 : équations de droites
kind: cours
summary: Vecteur directeur et représentation paramétrique, équation cartésienne, équation réduite et pente, droites parallèles, perpendiculaires et sécantes, point d’intersection.
position: 20
visibility: public
---

## Représentation paramétrique

:::propriete
La droite $(D)$ passant par $A(x_A ; y_A)$ et de **vecteur directeur** $\vec{u}(a ; b)$ non nul est l’ensemble des points $M(x ; y)$ tels que $\overrightarrow{AM} = t\vec{u}$, avec $t$ réel :

$$
\begin{cases} x = x_A + at \\ y = y_A + bt \end{cases} \qquad t \in \mathbb{R}
$$
:::

## Équation cartésienne

:::propriete
- $M(x ; y) \in (D) \iff \det\left(\overrightarrow{AM}, \vec{u}\right) = 0$. On obtient une équation de la forme $\alpha x + \beta y + \gamma = 0$.
- Réciproquement, $\alpha x + \beta y + \gamma = 0$, avec $(\alpha ; \beta) \neq (0 ; 0)$, est l’équation d’une droite de vecteur directeur $\vec{u}(-\beta ; \alpha)$.
:::

:::exemple
Droite passant par $A(1 ; 2)$ de vecteur directeur $\vec{u}(3 ; -1)$ : $\overrightarrow{AM}(x - 1 ; y - 2)$, et $\det\left(\overrightarrow{AM}, \vec{u}\right) = (x - 1)(-1) - 3(y - 2) = -x - 3y + 7$. Une équation est $x + 3y - 7 = 0$.
:::

## Équation réduite et pente

:::propriete
Toute droite non parallèle à l’axe des ordonnées a une **équation réduite** $y = mx + p$ : $m$ est la **pente** (ou coefficient directeur) et $p$ l’ordonnée à l’origine. Les droites parallèles à l’axe des ordonnées ont une équation $x = k$.

Si $A$ et $B$ sont sur la droite, avec $x_A \neq x_B$ : $m = \frac{y_B - y_A}{x_B - x_A}$.
:::

:::exemple
Droite passant par $A(1 ; 2)$ et $B(3 ; 8)$ : $m = \frac{8 - 2}{3 - 1} = 3$, et $2 = 3 \times 1 + p$ donne $p = -1$ : $y = 3x - 1$.
:::

## Positions relatives de deux droites

:::propriete
- Deux droites sont **parallèles** si et seulement si leurs vecteurs directeurs sont colinéaires, ou si elles ont la même pente.
- $\alpha x + \beta y + \gamma = 0$ et $\alpha' x + \beta' y + \gamma' = 0$ sont parallèles si et seulement si $\alpha\beta' - \alpha'\beta = 0$ ; sinon, elles sont **sécantes**.
- Dans un repère orthonormé, deux droites de pentes $m$ et $m'$ sont **perpendiculaires** si et seulement si $mm' = -1$.
:::

:::exemple
- Intersection de $x + 3y - 7 = 0$ et $y = 3x - 1$ : on remplace $y$, $x + 9x - 3 - 7 = 0$, donc $x = 1$ et $y = 2$. Le point d’intersection est $(1 ; 2)$.
- $2x - y + 1 = 0$ et $-4x + 2y + 5 = 0$ : $2 \times 2 - (-4) \times (-1) = 0$, les droites sont parallèles.
- $y = 3x - 1$ et $y = -\frac{1}{3}x + 2$ : $3 \times \left(-\frac{1}{3}\right) = -1$, elles sont perpendiculaires.
:::

:::attention
Pour trouver le point d’intersection de deux droites sécantes, on résout le système formé par leurs deux équations.
:::
