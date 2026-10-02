---
title: Notions de logique : l’essentiel
kind: resume
summary: Connecteurs, lois de Morgan, quantificateurs et leurs négations, et les sept raisonnements, sur une page.
position: 10
visibility: public
---

## Connecteurs

:::propriete
- $P \wedge Q$ vraie si les deux le sont ; $P \vee Q$ vraie si l’une au moins l’est (ou inclusif).
- $P \Rightarrow Q$ fausse seulement si $P$ vraie et $Q$ fausse ; $P \Leftrightarrow Q$ : même valeur.
- Morgan : $\overline{P \wedge Q} = \bar{P} \vee \bar{Q}$, $\overline{P \vee Q} = \bar{P} \wedge \bar{Q}$.
- $\overline{P \Rightarrow Q} = P \wedge \bar{Q}$ ; contraposée : $(P \Rightarrow Q) \Leftrightarrow (\bar{Q} \Rightarrow \bar{P})$.
:::

## Quantificateurs

Négation : $\forall$ devient $\exists$, $\exists$ devient $\forall$, et on nie la propriété. L’ordre des quantificateurs change le sens.

## Raisonnements

- **Direct** : de $P$ vers $Q$.
- **Contraposée** : montrer $\bar{Q} \Rightarrow \bar{P}$.
- **Absurde** : supposer le contraire, trouver une contradiction.
- **Disjonction des cas** : traiter tous les cas possibles.
- **Équivalences successives** : transformer jusqu’à une proposition connue.
- **Contre-exemple** : un seul suffit pour réfuter un « pour tout ».
- **Récurrence** : initialisation, puis hérédité $P(n) \Rightarrow P(n + 1)$.

:::attention
La réciproque de $P \Rightarrow Q$ est $Q \Rightarrow P$ : elle n’a pas forcément la même valeur. C’est la **contraposée** qui est équivalente.
:::
