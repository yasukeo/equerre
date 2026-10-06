---
title: Théorème de Pythagore — partie 2 : la réciproque
kind: cours
summary: La réciproque du théorème de Pythagore pour démontrer qu’un triangle est rectangle, montrer qu’un triangle n’est pas rectangle, et quelques calculs classiques.
position: 20
visibility: public
---

## La réciproque

:::theoreme
Dans un triangle $ABC$, si $BC^2 = AB^2 + AC^2$, alors le triangle est **rectangle en $A$**.
:::

:::propriete
**Méthode.** On calcule séparément le carré du plus grand côté, puis la somme des carrés des deux autres, et on compare.
:::

:::exemple
Un triangle a pour côtés $9$, $12$ et $15$. Le plus grand côté donne $15^2 = 225$ ; les deux autres donnent $9^2 + 12^2 = 81 + 144 = 225$. Les résultats sont égaux : le triangle est rectangle, et l’angle droit est en face du côté de longueur $15$.
:::

## Montrer qu’un triangle n’est pas rectangle

:::propriete
Si le carré du plus grand côté n’est pas égal à la somme des carrés des deux autres, le triangle n’est **pas** rectangle (sinon, le théorème de Pythagore donnerait l’égalité).
:::

:::exemple
Côtés $5$, $7$ et $9$ : $9^2 = 81$ et $5^2 + 7^2 = 74$. Les résultats sont différents : le triangle n’est pas rectangle.
:::

## Calculs classiques

:::exemple
- **Diagonale d’un rectangle** de $5$ cm sur $12$ cm : $d^2 = 25 + 144 = 169$, $d = 13$ cm.
- **Hauteur d’un triangle équilatéral** de côté $6$ cm : la hauteur coupe le côté opposé en son milieu, donc $h^2 = 36 - 9 = 27$ et $h = \sqrt{27} = 3\sqrt{3} \approx 5{,}2$ cm.
:::

:::attention
On n’écrit pas « $BC^2 = AB^2 + AC^2$ » avant d’avoir vérifié l’égalité : on calcule les deux membres séparément.
:::
