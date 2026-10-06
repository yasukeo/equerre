---
title: Théorème de Thalès — partie 1 : calculer des longueurs
kind: cours
summary: Le théorème de Thalès dans un triangle et dans la configuration en papillon, et son utilisation pour calculer des longueurs, avec une application à la mesure d’une hauteur.
position: 10
visibility: public
---

## Le théorème

:::theoreme
Soit $ABC$ un triangle, $M$ un point de la droite $(AB)$ et $N$ un point de la droite $(AC)$. Si les droites $(MN)$ et $(BC)$ sont **parallèles**, alors :

$$
\frac{AM}{AB} = \frac{AN}{AC} = \frac{MN}{BC}
$$
:::

On écrit toujours les trois rapports dans le même ordre : les longueurs du « petit » triangle $AMN$ en haut, celles du « grand » triangle $ABC$ en bas.

:::exemple
Dans un triangle $ABC$, $M \in [AB]$ et $N \in [AC]$ avec $(MN) \parallel (BC)$. On donne $AM = 2$, $AB = 5$, $AC = 7{,}5$ et $BC = 6$. Alors $\frac{2}{5} = \frac{AN}{7{,}5} = \frac{MN}{6}$, donc $AN = \frac{2 \times 7{,}5}{5} = 3$ et $MN = \frac{2 \times 6}{5} = 2{,}4$.
:::

## La configuration en papillon

:::propriete
Le théorème reste vrai quand $M$ et $N$ sont de l’autre côté de $A$ : les droites $(BM)$ et $(CN)$ se coupent en $A$, et $(MN) \parallel (BC)$.
:::

:::exemple
Les droites $(BM)$ et $(CN)$ se coupent en $A$, avec $(BC) \parallel (MN)$. On donne $AB = 4$, $AC = 6$, $AM = 6$ et $BC = 5$. Le rapport vaut $\frac{AM}{AB} = 1{,}5$ : $AN = 1{,}5 \times 6 = 9$ et $MN = 1{,}5 \times 5 = 7{,}5$.
:::

## Une application : mesurer une hauteur

:::exemple
Au même moment, un bâton vertical de $1{,}5$ m a une ombre de $2$ m, et un arbre a une ombre de $12$ m. Les rayons du soleil sont parallèles, donc on a une configuration de Thalès : $\frac{h}{1{,}5} = \frac{12}{2}$, et la hauteur de l’arbre est $h = 9$ m.
:::

:::attention
Le théorème de Thalès ne s’applique que si les droites sont **parallèles** : il faut le vérifier dans l’énoncé avant de l’utiliser.
:::
