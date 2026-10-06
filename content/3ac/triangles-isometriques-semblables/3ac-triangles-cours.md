---
title: Triangles isométriques et semblables — partie 1 : triangles isométriques
kind: cours
summary: Définition des triangles isométriques, les trois cas d’isométrie (trois côtés, deux côtés et l’angle compris, un côté et les deux angles adjacents), et leur utilisation pour démontrer.
position: 10
visibility: public
---

## Définition

:::definition
Deux triangles sont **isométriques** (ou égaux) quand leurs côtés sont deux à deux de même longueur. On peut alors les superposer : leurs angles correspondants sont aussi égaux.
:::

## Les trois cas d’isométrie

:::propriete
Deux triangles sont isométriques si l’une de ces conditions est vérifiée :

- **trois côtés** : leurs trois côtés sont deux à deux égaux ;
- **deux côtés et l’angle compris** : deux côtés égaux deux à deux, et les angles formés par ces côtés égaux ;
- **un côté et les deux angles adjacents** : un côté égal, et les deux angles qui lui sont adjacents égaux deux à deux.
:::

:::exemple
- $ABC$ avec $AB = 5$, $BC = 7$, $AC = 6$, et $DEF$ avec $DE = 5$, $EF = 7$, $DF = 6$ : isométriques (trois côtés).
- $AB = 4$, $AC = 6$, $\widehat{A} = 50°$, et $DE = 4$, $DF = 6$, $\widehat{D} = 50°$ : isométriques (deux côtés et l’angle compris).
:::

:::attention
Deux triangles qui ont les mêmes angles ne sont pas forcément isométriques : l’un peut être un agrandissement de l’autre.
:::

## Démontrer avec des triangles isométriques

:::exemple
Dans un parallélogramme $ABCD$, les triangles $ABC$ et $CDA$ ont $AB = CD$, $BC = DA$ et le côté $[AC]$ en commun : ils sont isométriques. On en déduit que $\widehat{ABC} = \widehat{CDA}$ : les angles opposés d’un parallélogramme sont égaux.
:::

:::exemple
Soit $ABC$ un triangle isocèle en $A$ et $H$ le milieu de $[BC]$. Les triangles $ABH$ et $ACH$ ont $AB = AC$, $BH = CH$ et $[AH]$ en commun : ils sont isométriques. Donc $\widehat{AHB} = \widehat{AHC}$, et comme ces angles sont supplémentaires, chacun vaut $90°$ : la médiane $(AH)$ est aussi une hauteur.
:::
