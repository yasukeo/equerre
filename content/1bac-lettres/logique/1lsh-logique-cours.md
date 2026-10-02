---
title: Notions de logique — partie 1 : propositions et connecteurs
kind: cours
summary: Proposition et valeur de vérité, négation, « et », « ou », implication et équivalence, avec des exemples tirés des mathématiques et de la vie courante, et les lois de Morgan.
position: 10
visibility: public
---

## Propositions

:::definition
Une **proposition** est une phrase dont on peut dire, sans ambiguïté, si elle est **vraie** ou **fausse**. Ce caractère vrai ou faux est sa **valeur de vérité**.
:::

:::exemple
- « $7$ est un nombre premier » est une proposition vraie.
- « $2 + 3 = 6$ » est une proposition fausse.
- « Quelle heure est-il ? » n’est pas une proposition : on ne peut pas dire qu’elle est vraie ou fausse.
- « $x > 2$ » n’est pas une proposition tant qu’on ne sait pas qui est $x$.
:::

## La négation

:::definition
La **négation** d’une proposition $P$, notée $\bar{P}$ ou « non $P$ », est vraie quand $P$ est fausse, et fausse quand $P$ est vraie.
:::

:::exemple
- $P$ : « $5 > 3$ » (vraie). $\bar{P}$ : « $5 \leq 3$ » (fausse).
- $Q$ : « tous les élèves sont présents ». $\bar{Q}$ : « au moins un élève est absent ».
:::

:::attention
La négation de « $x > 3$ » est « $x \leq 3$ », et non « $x < 3$ ».
:::

## Les connecteurs « et » et « ou »

:::definition
Soit $P$ et $Q$ deux propositions.

- « $P$ et $Q$ », noté $P \wedge Q$, est vraie **seulement** quand $P$ et $Q$ sont toutes les deux vraies.
- « $P$ ou $Q$ », noté $P \vee Q$, est vraie quand **au moins une** des deux est vraie. Elle n’est fausse que si $P$ et $Q$ sont toutes les deux fausses.
:::

:::exemple
- « $4$ est pair et $9$ est pair » est fausse, car la seconde partie est fausse.
- « $4$ est pair ou $9$ est pair » est vraie, car la première partie est vraie.
:::

:::attention
En mathématiques, le « ou » est **inclusif** : « $P$ ou $Q$ » est vraie aussi quand les deux sont vraies. Ce n’est pas le « ou » de « fromage ou dessert ».
:::

## Implication et équivalence

:::definition
- L’**implication** $P \Rightarrow Q$ se lit « si $P$, alors $Q$ ». Elle n’est fausse que dans un cas : quand $P$ est vraie et $Q$ fausse.
- L’**équivalence** $P \Leftrightarrow Q$ se lit « $P$ si et seulement si $Q$ ». Elle est vraie quand $P$ et $Q$ ont la même valeur de vérité.
:::

:::exemple
- « $x = 2 \Rightarrow x^2 = 4$ » est vraie. Mais la **réciproque** « $x^2 = 4 \Rightarrow x = 2$ » est fausse : $x$ peut valoir $-2$.
- « $2x = 6 \Leftrightarrow x = 3$ » est vraie : les deux implications sont vraies.
:::

:::propriete
$P \Leftrightarrow Q$ signifie que $P \Rightarrow Q$ **et** $Q \Rightarrow P$ sont vraies toutes les deux.
:::

## Lois de Morgan

:::propriete
- La négation de « $P$ et $Q$ » est « $\bar{P}$ ou $\bar{Q}$ ».
- La négation de « $P$ ou $Q$ » est « $\bar{P}$ et $\bar{Q}$ ».
- La négation de « $P \Rightarrow Q$ » est « $P$ et $\bar{Q}$ ».
:::

:::exemple
La négation de « il pleut et il fait froid » est « il ne pleut pas ou il ne fait pas froid ». La négation de « $x \geq 0$ ou $y \geq 0$ » est « $x < 0$ et $y < 0$ ».
:::
