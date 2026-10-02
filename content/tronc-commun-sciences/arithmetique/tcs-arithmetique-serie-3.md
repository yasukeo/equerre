---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes concrets : faire des bouquets et carreler une pièce avec le PGCD, puis synchroniser des bus et des roues dentées avec le PPCM, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : partager le plus possible
1. Un fleuriste a $84$ roses et $60$ tulipes. Il veut faire des bouquets tous identiques, en utilisant toutes les fleurs. Combien de bouquets au maximum ? Que contient chaque bouquet ?
2. Une pièce rectangulaire mesure $4{,}20$ m sur $3{,}60$ m. On la couvre de carreaux carrés identiques, les plus grands possible, sans en couper. Quel est le côté d’un carreau, et combien en faut-il ?

:::corrige
1. Le nombre de bouquets divise $84$ et $60$ : au maximum $\operatorname{PGCD}(84 ; 60) = 12$ bouquets, chacun avec $7$ roses et $5$ tulipes.
2. En centimètres : $420 = 2^2 \times 3 \times 5 \times 7$ et $360 = 2^3 \times 3^2 \times 5$, donc $\operatorname{PGCD} = 2^2 \times 3 \times 5 = 60$. Carreaux de $60$ cm de côté : $7 \times 6 = 42$ carreaux.
:::
:::

:::exercice Problème 2 : se retrouver ensemble
1. Deux bus partent ensemble de la gare à $8$ h. Le premier repasse toutes les $12$ min, le second toutes les $18$ min. À quelle heure repartiront-ils ensemble pour la première fois ?
2. Deux roues dentées s’engrènent : l’une a $24$ dents, l’autre $40$. Deux dents marquées sont en contact. Combien de tours fait chaque roue avant que ces deux dents se retrouvent en contact ?

:::corrige
1. $\operatorname{PPCM}(12 ; 18) = 36$ : ils repartent ensemble à $8$ h $36$.
2. Il faut qu’un même nombre de dents soit passé sur chaque roue, multiple de $24$ et de $40$ : $\operatorname{PPCM}(24 ; 40) = 120$. La première roue fait $\frac{120}{24} = 5$ tours, la seconde $\frac{120}{40} = 3$ tours.
:::
:::
