---
title: Théorème de Thalès — partie 2 : la réciproque
kind: cours
summary: La réciproque du théorème de Thalès pour démontrer que deux droites sont parallèles, la conséquence pour montrer qu’elles ne le sont pas, et le partage d’un segment.
position: 20
visibility: public
---

## La réciproque

:::theoreme
Soit $ABC$ un triangle, $M$ un point de $(AB)$ et $N$ un point de $(AC)$. Si $\frac{AM}{AB} = \frac{AN}{AC}$ **et** si les points $A$, $M$, $B$ sont dans le même ordre que les points $A$, $N$, $C$, alors $(MN)$ et $(BC)$ sont parallèles.
:::

:::exemple
$M \in [AB]$ et $N \in [AC]$ avec $AM = 3$, $AB = 7{,}5$, $AN = 4$ et $AC = 10$. On calcule séparément : $\frac{AM}{AB} = \frac{3}{7{,}5} = 0{,}4$ et $\frac{AN}{AC} = \frac{4}{10} = 0{,}4$. Les rapports sont égaux et les points sont dans le même ordre : $(MN) \parallel (BC)$.
:::

## Montrer que deux droites ne sont pas parallèles

:::propriete
Si $\frac{AM}{AB} \neq \frac{AN}{AC}$, alors $(MN)$ et $(BC)$ ne sont **pas** parallèles : sinon le théorème de Thalès donnerait des rapports égaux.
:::

:::exemple
Avec $AM = 3$, $AB = 7{,}5$, $AN = 4{,}2$ et $AC = 10$ : $\frac{3}{7{,}5} = 0{,}4$ et $\frac{4{,}2}{10} = 0{,}42$. Les rapports sont différents : les droites ne sont pas parallèles.
:::

## Partager un segment

:::exemple
Pour partager un segment $[AB]$ en cinq parties égales : on trace une demi-droite $[Ax)$, on y reporte cinq fois la même longueur avec le compas (points $U_1$ à $U_5$), on trace $(U_5B)$, puis les parallèles à $(U_5B)$ passant par $U_1$, $U_2$, $U_3$ et $U_4$. Elles coupent $[AB]$ en quatre points qui le partagent en cinq parties égales, d’après le théorème de Thalès.
:::

:::attention
Pour la réciproque, on calcule les deux rapports **séparément**, puis on les compare ; on n’écrit pas l’égalité avant de l’avoir vérifiée.
:::
