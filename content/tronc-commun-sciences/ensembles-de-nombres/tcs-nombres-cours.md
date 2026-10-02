---
title: Les ensembles de nombres — partie 1 : de ℕ à ℝ
kind: cours
summary: Les ensembles ℕ, ℤ, 𝔻, ℚ et ℝ, leurs inclusions, les symboles d’appartenance et d’inclusion, nombres décimaux et rationnels, développement décimal périodique, nombres irrationnels.
position: 10
visibility: public
---

## Les cinq ensembles

:::definition
- $\mathbb{N} = \{0 ; 1 ; 2 ; 3 ; \ldots\}$ est l’ensemble des **entiers naturels**.
- $\mathbb{Z} = \{\ldots ; -2 ; -1 ; 0 ; 1 ; 2 ; \ldots\}$ est l’ensemble des **entiers relatifs**.
- $\mathbb{D}$ est l’ensemble des **nombres décimaux** : les nombres de la forme $\frac{a}{10^n}$ avec $a \in \mathbb{Z}$ et $n \in \mathbb{N}$.
- $\mathbb{Q}$ est l’ensemble des **nombres rationnels** : les nombres de la forme $\frac{a}{b}$ avec $a \in \mathbb{Z}$ et $b \in \mathbb{Z}^*$.
- $\mathbb{R}$ est l’ensemble des **nombres réels** : tous les nombres qui repèrent les points d’une droite graduée.
:::

:::propriete
$$
\mathbb{N} \subset \mathbb{Z} \subset \mathbb{D} \subset \mathbb{Q} \subset \mathbb{R}
$$

Le symbole $\in$ se lit « appartient à » (pour un nombre), le symbole $\subset$ se lit « est inclus dans » (pour un ensemble).
:::

:::exemple
- $-3 \in \mathbb{Z}$ mais $-3 \notin \mathbb{N}$.
- $\frac{7}{4} = 1{,}75 = \frac{175}{10^2}$ : $\frac{7}{4} \in \mathbb{D}$.
- $\frac{1}{3} \in \mathbb{Q}$, mais $\frac{1}{3} \notin \mathbb{D}$ (voir plus bas).
- $\sqrt{2}$ et $\pi$ sont des réels qui ne sont pas rationnels : ce sont des **irrationnels**.
:::

## Nombres décimaux

:::propriete
Un rationnel écrit sous forme irréductible $\frac{a}{b}$ est décimal si et seulement si les seuls facteurs premiers de $b$ sont $2$ et $5$.
:::

:::exemple
**$\frac{1}{3}$ n’est pas décimal.** Si $\frac{1}{3} = \frac{a}{10^n}$, alors $10^n = 3a$, donc $3$ diviserait $10^n = 2^n \times 5^n$ : c’est impossible.
:::

## Développement décimal d’un rationnel

:::propriete
Un nombre rationnel a un développement décimal **fini** (s’il est décimal) ou **illimité périodique**. Un irrationnel a un développement illimité non périodique.
:::

:::exemple
- $\frac{3}{11} = 0{,}272727\ldots$ : la séquence « $27$ » se répète.
- Inversement, si $x = 0{,}272727\ldots$, alors $100x = 27{,}2727\ldots$, et $100x - x = 27$. Donc $99x = 27$ et $x = \frac{27}{99} = \frac{3}{11}$.
:::

:::attention
$\pi \approx 3{,}14$ et $\sqrt{2} \approx 1{,}414$ ne sont que des valeurs approchées : ces nombres ne sont pas décimaux.
:::

## Opérations et stabilité

:::propriete
- La somme et le produit de deux entiers naturels sont des entiers naturels ; mais $2 - 5 = -3 \notin \mathbb{N}$.
- La somme, la différence et le produit de deux rationnels sont rationnels ; le quotient d’un rationnel par un rationnel non nul est rationnel.
:::

:::exemple
La somme d’un rationnel $r$ et d’un irrationnel $x$ est irrationnelle : si $r + x$ était rationnel, alors $x = (r + x) - r$ serait rationnel, ce qui est faux.
:::
