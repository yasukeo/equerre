---
title: Espaces vectoriels — partie 1 : espaces et sous-espaces
kind: cours
summary: Espace vectoriel réel, exemples (ℝ², ℝ³, ℂ, matrices, fonctions), règles de calcul, sous-espace vectoriel et caractérisation, combinaisons linéaires et sous-espace engendré.
position: 10
visibility: public
---

## Espace vectoriel réel

:::definition
Un **espace vectoriel réel** est un ensemble $E$ muni :

- d’une loi interne $+$ telle que $(E, +)$ soit un groupe commutatif (de neutre $\vec{0}$) ;
- d’une loi externe qui à tout réel $\alpha$ et tout $\vec{u} \in E$ associe $\alpha\vec{u} \in E$, telle que pour tous réels $\alpha$, $\beta$ et tous $\vec{u}$, $\vec{v}$ de $E$ :

$$
\alpha(\vec{u} + \vec{v}) = \alpha\vec{u} + \alpha\vec{v} \qquad (\alpha + \beta)\vec{u} = \alpha\vec{u} + \beta\vec{u} \qquad \alpha(\beta\vec{u}) = (\alpha\beta)\vec{u} \qquad 1\vec{u} = \vec{u}
$$

Les éléments de $E$ sont appelés **vecteurs**, les réels **scalaires**.
:::

:::exemple
- $\mathbb{R}^2$ et $\mathbb{R}^3$, avec les opérations coordonnée par coordonnée.
- $\mathbb{C}$, avec l’addition et le produit d’un complexe par un réel.
- $\mathcal{M}_2(\mathbb{R})$, avec l’addition des matrices et le produit par un réel.
- L’ensemble des fonctions de $\mathbb{R}$ dans $\mathbb{R}$, avec $(f + g)(x) = f(x) + g(x)$ et $(\alpha f)(x) = \alpha f(x)$.
:::

:::propriete
Pour tout réel $\alpha$ et tout vecteur $\vec{u}$ : $0\vec{u} = \vec{0}$, $\alpha\vec{0} = \vec{0}$, $(-1)\vec{u} = -\vec{u}$, et $\alpha\vec{u} = \vec{0} \iff \alpha = 0$ ou $\vec{u} = \vec{0}$.
:::

## Sous-espaces vectoriels

:::definition
Une partie $F$ d’un espace vectoriel $E$ est un **sous-espace vectoriel** si, munie des lois de $E$, elle est elle-même un espace vectoriel.
:::

:::theoreme
$F$ est un sous-espace vectoriel de $E$ si et seulement si :

- $\vec{0} \in F$ ;
- pour tous $\vec{u}$, $\vec{v}$ de $F$ et tous réels $\alpha$, $\beta$, $\alpha\vec{u} + \beta\vec{v} \in F$.
:::

:::exemple
$F = \{(x ; y ; z) \in \mathbb{R}^3 : x + y - 2z = 0\}$ est un sous-espace de $\mathbb{R}^3$ : $(0 ; 0 ; 0) \in F$, et si $\vec{u}$, $\vec{v} \in F$, les coordonnées de $\alpha\vec{u} + \beta\vec{v}$ vérifient $(\alpha x + \beta x') + (\alpha y + \beta y') - 2(\alpha z + \beta z') = \alpha \times 0 + \beta \times 0 = 0$.
:::

:::exemple
$G = \{(x ; y) \in \mathbb{R}^2 : x + y = 1\}$ n’est pas un sous-espace de $\mathbb{R}^2$ : il ne contient pas $(0 ; 0)$.
:::

:::attention
Le vecteur nul appartient à tout sous-espace : s’il manque, ce n’est pas un sous-espace. Une équation avec un terme constant non nul ou un carré ($x^2 + y = 0$) ne définit en général pas un sous-espace.
:::

## Combinaisons linéaires

:::definition
Une **combinaison linéaire** des vecteurs $\vec{u}_1, \ldots, \vec{u}_n$ est un vecteur de la forme $\alpha_1\vec{u}_1 + \cdots + \alpha_n\vec{u}_n$, avec $\alpha_1, \ldots, \alpha_n$ réels.
:::

:::theoreme
L’ensemble des combinaisons linéaires de $\vec{u}_1, \ldots, \vec{u}_n$ est un sous-espace vectoriel de $E$ : c’est le **sous-espace engendré** par ces vecteurs, noté $\operatorname{Vect}(\vec{u}_1, \ldots, \vec{u}_n)$.
:::

:::exemple
Dans $\mathbb{R}^3$, $(3 ; 1 ; 2) = (1 ; 1 ; 1) + (2 ; 0 ; 1)$ : il appartient à $\operatorname{Vect}\big((1 ; 1 ; 1), (2 ; 0 ; 1)\big)$.
:::

:::exemple
Le sous-espace $F$ de l’exemple précédent s’écrit avec des paramètres : $x = -y + 2z$, donc $(x ; y ; z) = y(-1 ; 1 ; 0) + z(2 ; 0 ; 1)$, et $F = \operatorname{Vect}\big((-1 ; 1 ; 0), (2 ; 0 ; 1)\big)$.
:::
