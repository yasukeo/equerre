---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes de dénombrement : une urne avec les trois types de tirages, puis des mots et des chemins sur un quadrillage, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : une urne, trois tirages
Une urne contient $3$ boules rouges, $2$ vertes et $1$ noire. On tire $3$ boules.

1. **Simultanément** : combien de tirages ? Combien avec trois couleurs différentes ? Combien avec au moins une rouge ?
2. **Successivement sans remise** : combien de tirages ? Combien commencent par une rouge ?
3. **Successivement avec remise** : combien de tirages ? Combien ne contiennent aucune verte ?

:::corrige
1. $C_6^3 = 20$ ; trois couleurs : $3 \times 2 \times 1 = 6$ ; au moins une rouge : $20 - C_3^3 = 19$.
2. $A_6^3 = 120$ ; commencent par une rouge : $3 \times A_5^2 = 3 \times 20 = 60$.
3. $6^3 = 216$ ; aucune verte : $4^3 = 64$.
:::
:::

:::exercice Problème 2 : chemins sur un quadrillage
On se déplace sur un quadrillage de l’origine $(0 ; 0)$ au point $(5 ; 3)$, uniquement vers la droite (D) ou vers le haut (H), d’une case à la fois.

1. Combien de déplacements comporte un chemin ? Combien de D et de H ?
2. Combien y a-t-il de chemins ?
3. Combien de chemins passent par le point $(2 ; 1)$ ?

:::corrige
1. $8$ déplacements : $5$ D et $3$ H.
2. Un chemin est un mot de $8$ lettres avec $3$ H : on choisit leurs places, $C_8^3 = 56$.
3. De $(0 ; 0)$ à $(2 ; 1)$ : $C_3^1 = 3$ chemins ; de $(2 ; 1)$ à $(5 ; 3)$ : $C_5^2 = 10$. Total : $30$.
:::
:::
