---
title: Espaces vectoriels — partie 2 : familles libres, bases, dimension
kind: cours
summary: Famille génératrice, famille libre et liée, base et coordonnées d’un vecteur, dimension d’un espace vectoriel, bases de ℝ², ℝ³, ℂ et des matrices d’ordre 2, critère du déterminant.
position: 20
visibility: public
---

## Familles génératrices

:::definition
La famille $(\vec{u}_1, \ldots, \vec{u}_n)$ est **génératrice** de $E$ si tout vecteur de $E$ est une combinaison linéaire de $\vec{u}_1, \ldots, \vec{u}_n$, c’est-à-dire si $E = \operatorname{Vect}(\vec{u}_1, \ldots, \vec{u}_n)$.
:::

## Familles libres

:::definition
La famille $(\vec{u}_1, \ldots, \vec{u}_n)$ est **libre** si :

$$
\alpha_1\vec{u}_1 + \cdots + \alpha_n\vec{u}_n = \vec{0} \implies \alpha_1 = \cdots = \alpha_n = 0
$$

Sinon, elle est **liée** : l’un des vecteurs est combinaison linéaire des autres.
:::

:::propriete
- Deux vecteurs forment une famille liée si et seulement s’ils sont colinéaires.
- Une famille qui contient le vecteur nul est liée.
:::

:::exemple
Dans $\mathbb{R}^3$, $\vec{u} = (1 ; 0 ; 1)$, $\vec{v} = (0 ; 1 ; 1)$, $\vec{w} = (1 ; 1 ; 0)$ : $\alpha\vec{u} + \beta\vec{v} + \gamma\vec{w} = \vec{0}$ donne $\alpha + \gamma = 0$, $\beta + \gamma = 0$, $\alpha + \beta = 0$. On en tire $\alpha = \beta = -\gamma$ et $2\alpha = 0$, donc tout est nul : la famille est libre.
:::

## Bases et dimension

:::definition
Une **base** de $E$ est une famille libre et génératrice. Tout vecteur $\vec{x}$ s’écrit alors de façon **unique** $\vec{x} = x_1\vec{u}_1 + \cdots + x_n\vec{u}_n$ : $(x_1, \ldots, x_n)$ sont les **coordonnées** de $\vec{x}$ dans cette base.
:::

:::theoreme
Si $E$ a une base de $n$ vecteurs, toutes ses bases ont $n$ vecteurs : $n$ est la **dimension** de $E$. Dans un espace de dimension $n$ :

- une famille libre a au plus $n$ vecteurs, une famille génératrice au moins $n$ ;
- une famille de $n$ vecteurs est une base dès qu’elle est libre, ou dès qu’elle est génératrice.
:::

:::exemple
- $\mathbb{R}^2$ : base canonique $\big((1 ; 0), (0 ; 1)\big)$, dimension $2$. $\mathbb{R}^3$ : dimension $3$.
- $\mathbb{C}$, comme espace vectoriel réel : base $(1, i)$, dimension $2$ ; les coordonnées de $a + ib$ sont $(a, b)$.
- $\mathcal{M}_2(\mathbb{R})$ : base des quatre matrices élémentaires $E_{11}$, $E_{12}$, $E_{21}$, $E_{22}$, dimension $4$.
:::

### Critère du déterminant

:::propriete
Dans $\mathbb{R}^2$, $\big((a ; c), (b ; d)\big)$ est une base si et seulement si $ad - bc \neq 0$.

Dans $\mathbb{R}^3$, trois vecteurs $\vec{u}$, $\vec{v}$, $\vec{w}$ forment une base si et seulement si leur déterminant est non nul ; on peut le calculer par $\det(\vec{u}, \vec{v}, \vec{w}) = \left(\vec{u} \wedge \vec{v}\right) \cdot \vec{w}$.
:::

:::exemple
Pour $\vec{u} = (1 ; 0 ; 1)$, $\vec{v} = (0 ; 1 ; 1)$, $\vec{w} = (1 ; 1 ; 0)$ : $\vec{u} \wedge \vec{v} = (0 \times 1 - 1 \times 1 ; -(1 \times 1 - 1 \times 0) ; 1 \times 1 - 0) = (-1 ; -1 ; 1)$, et $(\vec{u} \wedge \vec{v}) \cdot \vec{w} = -1 - 1 + 0 = -2 \neq 0$ : c’est une base de $\mathbb{R}^3$.
:::

## Méthode : trouver une base d’un sous-espace

1. Écrire les conditions qui définissent le sous-espace, puis exprimer certaines coordonnées en fonction des autres (paramètres).
2. Écrire le vecteur général comme combinaison linéaire de vecteurs fixes : ils forment une famille génératrice.
3. Vérifier qu’elle est libre : c’est une base, et le nombre de paramètres est la dimension.

:::exemple
$F = \{(x ; y ; z) : x + y - 2z = 0\} = \operatorname{Vect}\big((-1 ; 1 ; 0), (2 ; 0 ; 1)\big)$ ; ces deux vecteurs ne sont pas colinéaires : ils forment une base de $F$, qui est de dimension $2$ (un plan vectoriel).
:::
