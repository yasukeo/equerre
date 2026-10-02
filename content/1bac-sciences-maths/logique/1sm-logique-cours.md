---
title: Notions de logique — partie 1 : propositions, connecteurs, quantificateurs
kind: cours
summary: Proposition et valeur de vérité, négation, conjonction, disjonction, implication et équivalence, tables de vérité, lois de Morgan, quantificateurs et leur négation.
position: 10
visibility: public
---

## Propositions

:::definition
Une **proposition** est un énoncé mathématique qui est soit **vrai**, soit **faux** (c’est sa **valeur de vérité**).
:::

:::exemple
« $3 > 2$ » est une proposition vraie ; « $\sqrt{4} = 3$ » est une proposition fausse ; « $x > 2$ » n’est pas une proposition tant qu’on ne sait pas qui est $x$ : c’est une **fonction propositionnelle**.
:::

## Connecteurs logiques

Soit $P$ et $Q$ deux propositions.

:::definition
- La **négation** de $P$, notée $\bar{P}$ ou « non $P$ », est vraie quand $P$ est fausse, et fausse quand $P$ est vraie.
- La **conjonction** « $P$ et $Q$ », notée $P \wedge Q$, est vraie seulement quand $P$ et $Q$ sont toutes les deux vraies.
- La **disjonction** « $P$ ou $Q$ », notée $P \vee Q$, est vraie quand l’une au moins des deux est vraie.
- L’**implication** « $P \Rightarrow Q$ » est fausse seulement quand $P$ est vraie et $Q$ fausse ; elle a la même valeur que « $\bar{P}$ ou $Q$ ».
- L’**équivalence** « $P \Leftrightarrow Q$ » est vraie quand $P$ et $Q$ ont la même valeur de vérité ; c’est « $(P \Rightarrow Q)$ et $(Q \Rightarrow P)$ ».
:::

:::exemple
- « $2 < 3$ et $5$ est pair » est fausse ; « $2 < 3$ ou $5$ est pair » est vraie.
- « $2 = 3 \Rightarrow 4 > 1$ » est vraie : une implication dont l’hypothèse est fausse est toujours vraie.
:::

:::attention
Le « ou » mathématique est **inclusif** : « $P$ ou $Q$ » est vraie aussi quand $P$ et $Q$ sont vraies toutes les deux.
:::

### Lois logiques

:::propriete
Pour toutes propositions $P$ et $Q$ :

- $\overline{\bar{P}} \Leftrightarrow P$ ;
- **Lois de Morgan** : $\overline{P \wedge Q} \Leftrightarrow \bar{P} \vee \bar{Q}$ et $\overline{P \vee Q} \Leftrightarrow \bar{P} \wedge \bar{Q}$ ;
- **Contraposée** : $(P \Rightarrow Q) \Leftrightarrow (\bar{Q} \Rightarrow \bar{P})$ ;
- **Négation d’une implication** : $\overline{P \Rightarrow Q} \Leftrightarrow (P \wedge \bar{Q})$.
:::

On démontre ces lois avec une **table de vérité** : on écrit toutes les combinaisons de valeurs de $P$ et $Q$ (vrai-vrai, vrai-faux, faux-vrai, faux-faux) et on compare les deux membres.

:::exemple
La négation de « $x \geq 0$ et $x \leq 1$ » est « $x < 0$ ou $x > 1$ ».
:::

## Quantificateurs

:::definition
- Le quantificateur **universel** $\forall$ se lit « pour tout » : « $(\forall x \in \mathbb{R}) \; x^2 \geq 0$ » est vraie.
- Le quantificateur **existentiel** $\exists$ se lit « il existe (au moins un) » : « $(\exists x \in \mathbb{R}) \; x^2 = 4$ » est vraie.
- $\exists!$ se lit « il existe un unique ».
:::

:::propriete
- La négation de « $(\forall x \in E) \; P(x)$ » est « $(\exists x \in E) \; \overline{P(x)}$ ».
- La négation de « $(\exists x \in E) \; P(x)$ » est « $(\forall x \in E) \; \overline{P(x)}$ ».
:::

:::exemple
La négation de « $(\forall x \in \mathbb{R}) \; x^2 + 1 > 0$ » est « $(\exists x \in \mathbb{R}) \; x^2 + 1 \leq 0$ » (elle est fausse, donc la première est vraie).
:::

:::attention
L’ordre des quantificateurs compte : « $(\forall x \in \mathbb{R})(\exists y \in \mathbb{R}) \; y > x$ » est vraie (on prend $y = x + 1$), mais « $(\exists y \in \mathbb{R})(\forall x \in \mathbb{R}) \; y > x$ » est fausse (aucun réel n’est plus grand que tous les réels).
:::
