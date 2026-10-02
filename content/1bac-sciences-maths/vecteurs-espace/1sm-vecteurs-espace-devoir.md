---
title: Devoir surveillé : vecteurs de l’espace
kind: devoir
summary: Un devoir d’une heure sur 20 points : calculs dans un cube, colinéarité, coplanarité et positions relatives, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. $ABCDEFGH$ est un cube (face $ABCD$ en bas, $E$ au-dessus de $A$).

:::exercice Exercice 1 (6 points) : calcul vectoriel
Simplifier : $\overrightarrow{AD} + \overrightarrow{HG} + \overrightarrow{CG}$, puis $\overrightarrow{EH} - \overrightarrow{BF} + \overrightarrow{AB}$.

:::corrige
$\overrightarrow{AD} + \overrightarrow{DC} + \overrightarrow{CG} = \overrightarrow{AG}$ (car $\overrightarrow{HG} = \overrightarrow{DC}$). $\overrightarrow{EH} - \overrightarrow{BF} + \overrightarrow{AB} = \overrightarrow{AD} - \overrightarrow{AE} + \overrightarrow{AB} = \overrightarrow{EB} + \overrightarrow{AD}$, soit $\overrightarrow{EB} + \overrightarrow{BC} = \overrightarrow{EC}$.
:::
:::

:::exercice Exercice 2 (7 points) : coplanarité
Dans la base $\left(\overrightarrow{AB}, \overrightarrow{AD}, \overrightarrow{AE}\right)$ :

1. Donner les coordonnées de $\overrightarrow{AC}$, $\overrightarrow{AH}$ et $\overrightarrow{AG}$. (3 pts)
2. Ces trois vecteurs sont-ils coplanaires ? (4 pts)

:::corrige
1. $(1 ; 1 ; 0)$, $(0 ; 1 ; 1)$, $(1 ; 1 ; 1)$.
2. $a(1 ; 1 ; 0) + b(0 ; 1 ; 1) = (1 ; 1 ; 1)$ donne $a = 1$, $b = 1$, puis $a + b = 1$ : impossible. Ils ne sont pas coplanaires.
:::
:::

:::exercice Exercice 3 (7 points) : positions relatives
1. Les droites $(AE)$ et $(CG)$ sont-elles parallèles ? (2 pts)
2. Les droites $(AB)$ et $(CG)$ sont-elles coplanaires ? (3 pts)
3. La droite $(FH)$ est-elle parallèle au plan $(ABD)$ ? (2 pts)

:::corrige
1. Oui : $\overrightarrow{AE} = \overrightarrow{CG}$.
2. Non. Elles ne sont pas parallèles ($\overrightarrow{CG} = \overrightarrow{AE}$ n’est pas colinéaire à $\overrightarrow{AB}$). Elles ne sont pas sécantes : $(AB)$ est dans le plan $(ABC)$, que $(CG)$ ne coupe qu’au point $C$, et $C$ n’est pas sur $(AB)$. Deux droites ni parallèles ni sécantes ne sont pas coplanaires.
3. Oui : $(FH)$ est parallèle à $(BD)$, incluse dans le plan $(ABD)$.
:::
:::
