---
title: La droite dans le plan — partie 1 : équation d’une droite
kind: cours
summary: Équation réduite d’une droite, pente et ordonnée à l’origine, droite passant par deux points, droites parallèles aux axes, vérifier qu’un point est sur une droite.
position: 10
visibility: public
---

## Équation réduite

:::propriete
Dans un repère, toute droite non parallèle à l’axe des ordonnées a une équation de la forme :

$$
y = mx + p
$$

- $m$ est la **pente** (ou coefficient directeur) : quand $x$ augmente de $1$, $y$ augmente de $m$ ;
- $p$ est l’**ordonnée à l’origine** : la droite coupe l’axe des ordonnées au point $(0 ; p)$.
:::

:::exemple
La droite $y = -3x + 2$ a pour pente $-3$ et coupe l’axe des ordonnées en $(0 ; 2)$. Pour la tracer, on place deux points : $(0 ; 2)$ et, pour $x = 1$, $(1 ; -1)$.
:::

## Droites parallèles aux axes

:::propriete
- Une droite parallèle à l’axe des abscisses a une équation $y = k$ (pente nulle).
- Une droite parallèle à l’axe des ordonnées a une équation $x = k$ ; elle n’a pas de pente.
:::

## Droite passant par deux points

:::propriete
Si $A(x_A ; y_A)$ et $B(x_B ; y_B)$, avec $x_A \neq x_B$, la pente de $(AB)$ est :

$$
m = \frac{y_B - y_A}{x_B - x_A}
$$

On trouve ensuite $p$ en remplaçant les coordonnées de $A$ dans $y = mx + p$.
:::

:::exemple
$A(1 ; 3)$ et $B(3 ; 7)$ : $m = \frac{7 - 3}{3 - 1} = 2$. Puis $3 = 2 \times 1 + p$, donc $p = 1$ : $(AB) : y = 2x + 1$.
:::

## Un point est-il sur la droite ?

:::propriete
Le point $M(x_0 ; y_0)$ est sur la droite $y = mx + p$ si et seulement si $y_0 = mx_0 + p$.
:::

:::exemple
$C(5 ; 11)$ est sur la droite $y = 2x + 1$, car $2 \times 5 + 1 = 11$. Les points $A$, $B$, $C$ sont donc alignés.
:::

:::attention
Si $x_A = x_B$, on ne peut pas calculer la pente : la droite $(AB)$ est verticale, d’équation $x = x_A$.
:::
