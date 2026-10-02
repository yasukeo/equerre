---
title: Notions de logique — partie 2 : quantificateurs et raisonnements
kind: cours
summary: Les quantificateurs « pour tout » et « il existe », leur négation, puis cinq raisonnements : direct, contre-exemple, disjonction des cas, contraposée et absurde.
position: 20
visibility: public
---

## Les quantificateurs

:::definition
- $\forall$ se lit « **pour tout** » : « $\forall x \in \mathbb{R}, \; x^2 \geq 0$ » signifie que tout réel a un carré positif ou nul.
- $\exists$ se lit « **il existe (au moins un)** » : « $\exists x \in \mathbb{R}, \; x^2 = 9$ » signifie qu’au moins un réel a pour carré $9$.
:::

:::exemple
- « $\forall x \in \mathbb{R}, \; x + 1 > x$ » est vraie.
- « $\forall x \in \mathbb{R}, \; x^2 > 0$ » est fausse : pour $x = 0$, $x^2 = 0$.
- « $\exists n \in \mathbb{N}, \; 2n = 7$ » est fausse : $7$ est impair.
:::

## Négation d’une proposition avec quantificateur

:::propriete
- La négation de « $\forall x, \; P(x)$ » est « $\exists x, \; \overline{P(x)}$ ».
- La négation de « $\exists x, \; P(x)$ » est « $\forall x, \; \overline{P(x)}$ ».
:::

:::exemple
- Négation de « $\forall x \in \mathbb{R}, \; x^2 \geq 1$ » : « $\exists x \in \mathbb{R}, \; x^2 < 1$ ».
- Négation de « $\exists n \in \mathbb{N}, \; n > 100$ » : « $\forall n \in \mathbb{N}, \; n \leq 100$ ».
:::

## Les raisonnements

:::propriete
**Raisonnement direct.** On part de l’hypothèse et on enchaîne des propriétés connues jusqu’à la conclusion.
:::

:::exemple
Montrons que la somme de deux nombres pairs est paire. Si $a = 2k$ et $b = 2k'$, alors $a + b = 2(k + k')$ : c’est un nombre pair.
:::

:::propriete
**Contre-exemple.** Pour montrer qu’une proposition « pour tout » est fausse, il suffit de trouver **un seul** cas où elle est fausse.
:::

:::exemple
« Pour tout réel $x$, $x^2 > x$ » est fausse : pour $x = \frac{1}{2}$, $x^2 = \frac{1}{4} < \frac{1}{2}$.
:::

:::propriete
**Disjonction des cas.** On sépare l’étude en plusieurs cas qui couvrent toutes les possibilités.
:::

:::exemple
Montrons que $n(n + 1)$ est pair pour tout entier $n$. Si $n$ est pair, le produit est pair. Si $n$ est impair, $n + 1$ est pair, et le produit est encore pair.
:::

:::propriete
**Contraposée.** $P \Rightarrow Q$ a la même valeur de vérité que $\bar{Q} \Rightarrow \bar{P}$. On peut donc démontrer l’une à la place de l’autre.
:::

:::exemple
Montrons : « si $n^2$ est pair, alors $n$ est pair ». Contraposée : « si $n$ est impair, alors $n^2$ est impair ». Si $n = 2k + 1$, alors $n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$ est impair.
:::

:::propriete
**Raisonnement par l’absurde.** On suppose le contraire de ce qu’on veut démontrer, et on aboutit à une contradiction.
:::

:::exemple
Montrons qu’il n’existe pas de plus grand entier naturel. Supposons qu’il en existe un, $N$. Alors $N + 1$ est un entier plus grand que $N$ : c’est une contradiction.
:::

:::attention
Un exemple ne démontre pas une proposition « pour tout » : vérifier que $n^2 + n + 41$ est premier pour $n = 1, 2, 3$ ne prouve rien pour tous les $n$ (pour $n = 40$, on obtient $1\,681 = 41^2$).
:::
