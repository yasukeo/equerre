---
title: Opérations dans ℝ — partie 1 : nombres, fractions et puissances
kind: cours
summary: Les ensembles de nombres, calcul avec les fractions (simplifier, additionner, multiplier, diviser), puissances, puissances de 10 et écriture scientifique.
position: 10
visibility: public
---

## Les ensembles de nombres

:::definition
- $\mathbb{N}$ : les entiers naturels $0$, $1$, $2$, … ;
- $\mathbb{Z}$ : les entiers relatifs, positifs ou négatifs ;
- $\mathbb{D}$ : les nombres décimaux, comme $2{,}75$ ;
- $\mathbb{Q}$ : les nombres rationnels, qui s’écrivent comme une fraction $\frac{a}{b}$ ;
- $\mathbb{R}$ : tous les nombres réels, y compris $\sqrt{2}$ ou $\pi$.

On a $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{D} \subset \mathbb{Q} \subset \mathbb{R}$.
:::

## Les fractions

:::propriete
Pour $b$, $d$ non nuls :

- **simplifier** : $\frac{ka}{kb} = \frac{a}{b}$ ;
- **additionner** : on met au même dénominateur, $\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$ ;
- **multiplier** : $\frac{a}{b} \times \frac{c}{d} = \frac{ac}{bd}$ ;
- **diviser** : diviser par $\frac{c}{d}$ (avec $c \neq 0$), c’est multiplier par $\frac{d}{c}$.
:::

:::exemple
- $\frac{2}{3} + \frac{5}{4} = \frac{8}{12} + \frac{15}{12} = \frac{23}{12}$.
- $\frac{3}{4} \times \frac{8}{9} = \frac{24}{36} = \frac{2}{3}$.
- $\frac{2}{5} \div \frac{4}{15} = \frac{2}{5} \times \frac{15}{4} = \frac{30}{20} = \frac{3}{2}$.
:::

:::attention
On n’additionne pas les dénominateurs : $\frac{1}{2} + \frac{1}{3} = \frac{5}{6}$, et non $\frac{2}{5}$.
:::

## Les puissances

:::propriete
Pour $a \neq 0$ et $m$, $n$ entiers relatifs :

- $a^m \times a^n = a^{m + n}$ ; $\frac{a^m}{a^n} = a^{m - n}$ ; $(a^m)^n = a^{mn}$ ;
- $a^0 = 1$ et $a^{-n} = \frac{1}{a^n}$.
:::

:::exemple
$2^3 \times 2^4 = 2^7 = 128$ ; $(10^2)^3 = 10^6$ ; $5^{-2} = \frac{1}{25}$ ; $\frac{3^5}{3^3} = 3^2 = 9$.
:::

## Écriture scientifique

:::propriete
Tout nombre décimal non nul s’écrit $a \times 10^n$, avec $1 \leq a < 10$ (au signe près) et $n$ entier relatif : c’est son **écriture scientifique**.
:::

:::exemple
- $45\,000\,000 = 4{,}5 \times 10^7$.
- $0{,}000\,32 = 3{,}2 \times 10^{-4}$.
- $(3 \times 10^4) \times (2 \times 10^{-6}) = 6 \times 10^{-2}$.
:::
