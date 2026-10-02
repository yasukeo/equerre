---
title: Série 1 — partie 2 : coplanarité et positions relatives
kind: serie
summary: Vecteurs coplanaires, décomposition dans une base, points coplanaires, positions relatives de droites et de plans dans un cube, avec les corrigés.
position: 20
visibility: enrolled
---

Trois exercices sur la deuxième partie du cours. $ABCDEFGH$ est un cube (face $ABCD$ en bas, $E$ au-dessus de $A$).

:::exercice Décomposer dans une base
On prend la base $\left(\overrightarrow{AB}, \overrightarrow{AD}, \overrightarrow{AE}\right)$.

1. Donner les coordonnées de $\overrightarrow{AG}$, $\overrightarrow{BH}$ et $\overrightarrow{CE}$.
2. Les vecteurs $\overrightarrow{AC}$, $\overrightarrow{AF}$ et $\overrightarrow{AH}$ sont-ils coplanaires ?

:::corrige
1. $\overrightarrow{AG} = (1 ; 1 ; 1)$ ; $\overrightarrow{BH} = \overrightarrow{BA} + \overrightarrow{AD} + \overrightarrow{DH} = (-1 ; 1 ; 1)$ ; $\overrightarrow{CE} = (-1 ; -1 ; 1)$.
2. $\overrightarrow{AC} = (1 ; 1 ; 0)$, $\overrightarrow{AF} = (1 ; 0 ; 1)$, $\overrightarrow{AH} = (0 ; 1 ; 1)$. Cherchons $a$, $b$ avec $\overrightarrow{AH} = a\overrightarrow{AC} + b\overrightarrow{AF}$ : $a + b = 0$, $a = 1$, $b = 1$ : impossible. Ils ne sont pas coplanaires.
:::
:::

:::exercice Points coplanaires
Soit $I$ le milieu de $[EH]$ et $J$ le milieu de $[FG]$. Montrer que les points $A$, $B$, $J$, $I$ sont coplanaires.

:::corrige
$\overrightarrow{IJ} = \overrightarrow{IE} + \overrightarrow{EF} + \overrightarrow{FJ} = -\frac{1}{2}\overrightarrow{AD} + \overrightarrow{AB} + \frac{1}{2}\overrightarrow{AD} = \overrightarrow{AB}$. Donc $ABJI$ est un parallélogramme : les quatre points sont coplanaires.
:::
:::

:::exercice Positions relatives
Dans le cube :

1. Les droites $(AG)$ et $(BH)$ sont-elles sécantes ?
2. Les droites $(AF)$ et $(CH)$ sont-elles coplanaires ?
3. La droite $(EG)$ est-elle parallèle au plan $(ABC)$ ? Au plan $(ACF)$ ?

:::corrige
1. Oui : $ABGH$ est un rectangle (ses côtés $[AB]$ et $[HG]$ sont parallèles et égaux), et $(AG)$, $(BH)$ en sont les diagonales, qui se coupent en leur milieu.
2. $\overrightarrow{AF} = (1 ; 0 ; 1)$ et $\overrightarrow{CH} = (-1 ; 0 ; 1)$ ne sont pas colinéaires ; si elles étaient coplanaires elles seraient sécantes. Or en coordonnées ($A$ origine), $(AF)$ : $(t ; 0 ; t)$ et $(CH)$ : $(1 - s ; 1 ; s)$ ; l’égalité impose $0 = 1$ : pas de point commun. Elles ne sont pas coplanaires.
3. $(EG)$ est parallèle à $(AC)$, incluse dans $(ABC)$ : oui. $(AC)$ est aussi dans le plan $(ACF)$ : $(EG)$ est parallèle à $(ACF)$.
:::
:::
