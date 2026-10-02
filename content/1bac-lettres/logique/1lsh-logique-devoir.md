---
title: Devoir surveillé : notions de logique
kind: devoir
summary: Un devoir d’une heure sur 20 points : valeurs de vérité, négations, quantificateurs et raisonnements, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : valeurs de vérité
Donner la valeur de vérité de chaque proposition, en justifiant.

1. « $\sqrt{16} = 4$ et $16$ est impair » (2 pts)
2. « $\sqrt{16} = 4$ ou $16$ est impair » (2 pts)
3. « $\forall x \in \mathbb{R}, \; x^2 \geq x$ » (2 pts)

:::corrige
1. Fausse : « $16$ est impair » est fausse.
2. Vraie : « $\sqrt{16} = 4$ » est vraie.
3. Fausse : pour $x = \frac{1}{2}$, $x^2 = \frac{1}{4} < \frac{1}{2}$.
:::
:::

:::exercice Exercice 2 (6 points) : négations
Écrire la négation de :

1. « $x < 0$ ou $x > 5$ » (2 pts)
2. « $\exists n \in \mathbb{N}, \; n^2 = 10$ » (2 pts)
3. « Si un nombre se termine par $0$, alors il est divisible par $5$ » (2 pts)

:::corrige
1. « $0 \leq x \leq 5$ », c’est-à-dire « $x \geq 0$ et $x \leq 5$ ».
2. « $\forall n \in \mathbb{N}, \; n^2 \neq 10$ ».
3. « Il existe un nombre qui se termine par $0$ et qui n’est pas divisible par $5$ ».
:::
:::

:::exercice Exercice 3 (8 points) : raisonnements
1. Montrer par un contre-exemple que « pour tout réel $x$, $\sqrt{x^2} = x$ » est fausse. (2 pts)
2. Montrer par disjonction des cas que pour tout entier $n$, $n(n + 3)$ est pair. (3 pts)
3. Montrer par contraposée : « si $x^2 \neq 4$, alors $x \neq 2$ ». (3 pts)

:::corrige
1. Pour $x = -2$ : $\sqrt{(-2)^2} = \sqrt{4} = 2 \neq -2$.
2. Si $n$ est pair, le produit est pair. Si $n$ est impair, $n + 3$ est pair, et le produit est pair.
3. Contraposée : « si $x = 2$, alors $x^2 = 4$ », qui est vraie. Donc la proposition est vraie.
:::
:::
