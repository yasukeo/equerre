---
title: Probabilités — partie 2 : calculer des probabilités
kind: cours
summary: Expérience aléatoire, univers et événements, probabilité en cas d’équiprobabilité, événement contraire, réunion et intersection, événements indépendants, épreuves répétées.
position: 20
visibility: public
---

## Vocabulaire

:::definition
- Une **expérience aléatoire** a plusieurs résultats possibles, qu’on ne peut pas prévoir : ce sont les **issues**.
- L’**univers** $\Omega$ est l’ensemble de toutes les issues.
- Un **événement** est un ensemble d’issues. L’événement **contraire** de $A$, noté $\bar{A}$, est formé des issues qui ne sont pas dans $A$.
:::

## Équiprobabilité

:::propriete
Si toutes les issues ont la même chance de se produire (dé équilibré, tirage au hasard…) :

$$
p(A) = \frac{\text{nombre d’issues favorables à } A}{\text{nombre total d’issues}} = \frac{\operatorname{card}(A)}{\operatorname{card}(\Omega)}
$$
:::

:::exemple
On lance un dé équilibré. $A$ : « obtenir un nombre pair » : $p(A) = \frac{3}{6} = \frac{1}{2}$.
:::

:::exemple
Une urne contient $4$ boules rouges et $6$ boules blanches. On tire simultanément $2$ boules. Il y a $C_{10}^2 = 45$ tirages. $B$ : « deux boules rouges » : $C_4^2 = 6$ tirages, donc $p(B) = \frac{6}{45} = \frac{2}{15}$.
:::

## Règles de calcul

:::propriete
- $0 \leq p(A) \leq 1$, $p(\Omega) = 1$, $p(\varnothing) = 0$.
- $p(\bar{A}) = 1 - p(A)$.
- $p(A \cup B) = p(A) + p(B) - p(A \cap B)$ ; si $A$ et $B$ n’ont aucune issue commune, $p(A \cup B) = p(A) + p(B)$.
:::

:::exemple
Dans l’urne précédente, $C$ : « au moins une boule blanche » est le contraire de « deux rouges » : $p(C) = 1 - \frac{2}{15} = \frac{13}{15}$.
:::

## Indépendance et épreuves répétées

:::definition
Deux événements $A$ et $B$ sont **indépendants** si $p(A \cap B) = p(A) \times p(B)$ : la réalisation de l’un ne change pas la chance de l’autre.
:::

Quand on répète une expérience dans les mêmes conditions (lancers successifs d’une pièce, tirages **avec remise**), les résultats sont indépendants : on multiplie les probabilités.

:::exemple
On lance deux fois une pièce équilibrée. La probabilité d’obtenir deux fois « pile » est $\frac{1}{2} \times \frac{1}{2} = \frac{1}{4}$, et celle d’obtenir au moins un « face » est $1 - \frac{1}{4} = \frac{3}{4}$.
:::

:::exemple
On lance trois fois un dé équilibré. La probabilité de n’obtenir aucun $6$ est $\left(\frac{5}{6}\right)^3 = \frac{125}{216}$, et celle d’obtenir au moins un $6$ est $1 - \frac{125}{216} = \frac{91}{216}$.
:::
