---
title: Structures algébriques — partie 1 : lois et groupes
kind: cours
summary: Loi de composition interne, partie stable, associativité, commutativité, élément neutre et symétrique, groupe, groupe commutatif, sous-groupe et caractérisation.
position: 10
visibility: public
---

## Loi de composition interne

:::definition
Une **loi de composition interne** sur un ensemble $E$ est une application qui à tout couple $(x ; y)$ d’éléments de $E$ associe un élément de $E$, noté $x * y$.
:::

:::exemple
- L’addition et la multiplication sont des lois internes sur $\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$.
- La soustraction est interne sur $\mathbb{Z}$ mais pas sur $\mathbb{N}$ ($2 - 5 \notin \mathbb{N}$).
- Sur $\mathbb{R}$, $x * y = x + y - xy$ est une loi interne.
:::

:::definition
Une partie $F$ de $E$ est **stable** pour $*$ si pour tous $x$, $y$ de $F$, $x * y \in F$. La loi $*$ induit alors une loi interne sur $F$.
:::

:::exemple
$\mathbb{U} = \{z \in \mathbb{C} : |z| = 1\}$ est stable pour la multiplication : $|zz'| = |z||z'| = 1$.
:::

## Propriétés d’une loi

:::definition
Soit $*$ une loi interne sur $E$.

- $*$ est **commutative** si $x * y = y * x$ pour tous $x$, $y$.
- $*$ est **associative** si $(x * y) * z = x * (y * z)$ pour tous $x$, $y$, $z$.
- $e \in E$ est un **élément neutre** si $x * e = e * x = x$ pour tout $x$. S’il existe, il est unique.
- Si $*$ a un neutre $e$, $x$ a un **symétrique** $x'$ si $x * x' = x' * x = e$.
:::

:::exemple
Sur $\mathbb{R}$, $x * y = x + y - xy$ :

- commutative, car $x + y - xy = y + x - yx$ ;
- associative : $(x * y) * z = x + y + z - xy - xz - yz + xyz$, expression symétrique en $x$, $y$, $z$, égale à $x * (y * z)$ ;
- $0$ est neutre : $x * 0 = x$ ;
- $x$ a un symétrique $x'$ si $x + x' - xx' = 0$, soit $x'(1 - x) = -x$ : pour $x \neq 1$, $x' = \frac{x}{x - 1}$ ; $1$ n’a pas de symétrique.
:::

## Groupes

:::definition
Un **groupe** est un ensemble $G$ muni d’une loi interne $*$ :

- associative ;
- qui admet un élément neutre $e$ ;
- pour laquelle tout élément de $G$ a un symétrique dans $G$.

Si de plus $*$ est commutative, le groupe est **commutatif** (ou abélien).
:::

:::exemple
$(\mathbb{Z}, +)$, $(\mathbb{R}, +)$, $(\mathbb{R}^*, \times)$, $(\mathbb{C}^*, \times)$ et $(\mathbb{U}, \times)$ sont des groupes commutatifs. $(\mathbb{N}, +)$ n’est pas un groupe : $1$ n’a pas d’opposé dans $\mathbb{N}$. $(\mathbb{Z}, \times)$ n’est pas un groupe : $2$ n’a pas d’inverse dans $\mathbb{Z}$.
:::

:::exemple
Avec la loi $x * y = x + y - xy$, $(\mathbb{R} \setminus \{1\}, *)$ est un groupe commutatif : $\mathbb{R} \setminus \{1\}$ est stable, car $1 - x * y = (1 - x)(1 - y) \neq 0$ si $x \neq 1$ et $y \neq 1$ ; et tout élément $x \neq 1$ a pour symétrique $\frac{x}{x - 1}$, qui est différent de $1$.
:::

:::propriete
Dans un groupe $(G, *)$ :

- le symétrique de $x$ est unique, et le symétrique de $x * y$ est $y' * x'$ ;
- tout élément est **régulier** : $a * x = a * y \Rightarrow x = y$ ;
- l’équation $a * x = b$ a une unique solution $x = a' * b$.
:::

## Sous-groupes

:::definition
Une partie $H$ d’un groupe $(G, *)$ est un **sous-groupe** si $H$ est stable pour $*$ et si $(H, *)$ est un groupe.
:::

:::theoreme
$H$ est un sous-groupe de $(G, *)$ si et seulement si :

- $H$ est non vide (il contient $e$) ;
- pour tous $x$, $y$ de $H$, $x * y' \in H$.
:::

:::exemple
Pour $n \in \mathbb{N}$, $n\mathbb{Z} = \{nk : k \in \mathbb{Z}\}$ est un sous-groupe de $(\mathbb{Z}, +)$ : $0 \in n\mathbb{Z}$ et $nk - nk' = n(k - k') \in n\mathbb{Z}$.
:::

:::exemple
$\mathbb{U}$ est un sous-groupe de $(\mathbb{C}^*, \times)$ : $1 \in \mathbb{U}$, et pour $z$, $z'$ dans $\mathbb{U}$, $\left|\frac{z}{z'}\right| = 1$.
:::
