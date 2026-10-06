---
title: Pythagore et cosinus — partie 1 : le théorème de Pythagore
kind: cours
summary: Le théorème de Pythagore pour calculer l’hypoténuse ou un côté de l’angle droit, valeurs approchées à la calculatrice, et la réciproque pour reconnaître un triangle rectangle.
position: 10
visibility: public
---

## Le théorème

:::theoreme
Si un triangle $ABC$ est rectangle en $A$, alors :

$$
BC^2 = AB^2 + AC^2
$$

Le côté $[BC]$, opposé à l’angle droit, est l’**hypoténuse** : c’est le plus long côté.
:::

## Calculer une longueur

:::exemple
- $ABC$ rectangle en $A$, $AB = 6$ cm, $AC = 8$ cm : $BC^2 = 36 + 64 = 100$, donc $BC = 10$ cm.
- $DEF$ rectangle en $E$, $DF = 26$ cm, $DE = 10$ cm : $EF^2 = 676 - 100 = 576$, donc $EF = 24$ cm.
- Côtés de l’angle droit de $3$ cm et $5$ cm : l’hypoténuse vérifie $h^2 = 34$, et la calculatrice donne $h \approx 5{,}83$ cm.
:::

## La réciproque

:::propriete
Dans un triangle, si le carré du plus long côté est égal à la somme des carrés des deux autres côtés, alors le triangle est **rectangle**. Sinon, il n’est pas rectangle.
:::

:::exemple
- Côtés $7$, $24$, $25$ : $25^2 = 625$ et $49 + 576 = 625$ : rectangle.
- Côtés $6$, $7$, $9$ : $81$ et $36 + 49 = 85$ : pas rectangle.
:::

:::attention
On calcule séparément le carré du plus long côté et la somme des deux autres carrés, puis on compare.
:::
