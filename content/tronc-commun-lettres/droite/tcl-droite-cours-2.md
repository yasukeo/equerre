---
title: La droite dans le plan — partie 2 : positions relatives et intersections
kind: cours
summary: Droites parallèles et droites sécantes, parallèle à une droite passant par un point, point d’intersection de deux droites par un système, et utilisation dans des problèmes concrets.
position: 20
visibility: public
---

## Droites parallèles

:::propriete
Deux droites d’équations $y = mx + p$ et $y = m'x + p'$ sont **parallèles** si et seulement si elles ont la **même pente** : $m = m'$. Sinon, elles sont **sécantes** : elles se coupent en un seul point.
:::

:::exemple
- $y = 3x - 1$ et $y = 3x + 4$ sont parallèles.
- $y = -2x + 5$ et $y = 2x + 5$ sont sécantes : elles se coupent en $(0 ; 5)$.
:::

:::exemple
**Parallèle passant par un point.** La parallèle à $y = 2x + 1$ passant par $D(0 ; -4)$ a la pente $2$ et passe par $(0 ; -4)$ : $y = 2x - 4$.
:::

## Point d’intersection

:::propriete
Les coordonnées du point d’intersection de deux droites sécantes sont la solution du système formé par leurs deux équations.
:::

:::exemple
$y = 2x + 1$ et $y = -x + 7$ : on égale les deux expressions de $y$, $2x + 1 = -x + 7$, donc $3x = 6$ et $x = 2$, puis $y = 5$. Le point d’intersection est $(2 ; 5)$.
:::

## Dans un problème

:::exemple
Deux bougies sont allumées en même temps. La première mesure $20$ cm et diminue de $2$ cm par heure ; la seconde mesure $15$ cm et diminue de $1$ cm par heure. Après $t$ heures, leurs hauteurs sont $h_1 = 20 - 2t$ et $h_2 = 15 - t$ : ce sont deux droites. Elles ont la même hauteur quand $20 - 2t = 15 - t$, soit $t = 5$ h ; elles mesurent alors $10$ cm.
:::

:::attention
Pour l’intersection, on vérifie le point trouvé dans les **deux** équations.
:::
