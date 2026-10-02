---
title: Structures algébriques — partie 2 : morphismes, anneaux et corps
kind: cours
summary: Morphisme et isomorphisme de groupes, transport de structure, anneaux, anneaux commutatifs et unitaires, diviseurs de zéro, corps, l’anneau des matrices carrées d’ordre 2 et ℤ/nℤ.
position: 20
visibility: public
---

## Morphismes de groupes

:::definition
Soit $(G, *)$ et $(H, \top)$ deux groupes. Une application $f : G \to H$ est un **morphisme** si pour tous $x$, $y$ de $G$ :

$$
f(x * y) = f(x) \top f(y)
$$

Si de plus $f$ est bijective, c’est un **isomorphisme**.
:::

:::exemple
- $\ln : (]0 ; +\infty[, \times) \to (\mathbb{R}, +)$ est un isomorphisme : $\ln(xy) = \ln x + \ln y$, et $\ln$ est bijective.
- $\theta \mapsto e^{i\theta}$ est un morphisme de $(\mathbb{R}, +)$ dans $(\mathbb{U}, \times)$, non injectif ($e^{2i\pi} = e^{0}$).
:::

:::propriete
Si $f$ est un morphisme de $(G, *)$ dans $(H, \top)$, alors $f(e_G) = e_H$ et $f(x') = f(x)'$. L’image $f(G)$ est un sous-groupe de $H$.
:::

:::theoreme
**Transport de structure.** Si $(G, *)$ est un groupe et $f$ une bijection de $G$ sur un ensemble $H$ muni d’une loi $\top$ telle que $f(x * y) = f(x) \top f(y)$, alors $(H, \top)$ est un groupe, commutatif si $(G, *)$ l’est.
:::

:::exemple
Sur $I = ]1 ; +\infty[$, on pose $x \top y = (x - 1)(y - 1) + 1$. L’application $f : x \mapsto x + 1$ est une bijection de $]0 ; +\infty[$ sur $I$ et $f(xy) = xy + 1 = (f(x) - 1)(f(y) - 1) + 1 = f(x) \top f(y)$. Comme $(]0 ; +\infty[, \times)$ est un groupe commutatif, $(I, \top)$ aussi, de neutre $f(1) = 2$.
:::

## Anneaux

:::definition
Un **anneau** est un ensemble $A$ muni de deux lois internes, notées $+$ et $\times$, telles que :

- $(A, +)$ est un groupe commutatif (de neutre noté $0$) ;
- $\times$ est associative ;
- $\times$ est distributive par rapport à $+$ : $x(y + z) = xy + xz$ et $(y + z)x = yx + zx$.

L’anneau est **commutatif** si $\times$ l’est, **unitaire** si $\times$ a un neutre (noté $1$).
:::

:::exemple
$(\mathbb{Z}, +, \times)$, $(\mathbb{R}, +, \times)$ et $(\mathbb{C}, +, \times)$ sont des anneaux commutatifs unitaires.
:::

:::definition
Dans un anneau, $a \neq 0$ est un **diviseur de zéro** s’il existe $b \neq 0$ tel que $ab = 0$ ou $ba = 0$. Un anneau commutatif unitaire sans diviseur de zéro est dit **intègre**.
:::

### L’anneau des matrices carrées d’ordre 2

L’ensemble $\mathcal{M}_2(\mathbb{R})$ des matrices $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, muni de l’addition et du produit des matrices, est un anneau unitaire, de neutre $I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ pour le produit. Il n’est **pas commutatif** et a des **diviseurs de zéro** :

$$
\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}\begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}
$$

:::propriete
Une matrice $M = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ est inversible si et seulement si $\det M = ad - bc \neq 0$, et alors $M^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
:::

## Corps

:::definition
Un **corps** est un anneau commutatif unitaire $(K, +, \times)$, avec $1 \neq 0$, dans lequel tout élément non nul a un inverse pour $\times$ : $(K \setminus \{0\}, \times)$ est un groupe commutatif.
:::

:::exemple
$\mathbb{Q}$, $\mathbb{R}$ et $\mathbb{C}$ sont des corps ; $\mathbb{Z}$ n’en est pas un.
:::

:::exemple
L’ensemble $E = \left\{\begin{pmatrix} a & -b \\ b & a \end{pmatrix} : a, b \in \mathbb{R}\right\}$ est stable pour l’addition et le produit, et l’application $a + ib \mapsto \begin{pmatrix} a & -b \\ b & a \end{pmatrix}$ transporte la structure de corps de $\mathbb{C}$ : $(E, +, \times)$ est un corps.
:::

### L’anneau ℤ/nℤ

Pour $n \geq 2$, on note $\bar{a}$ la classe de $a$ modulo $n$, et $\mathbb{Z}/n\mathbb{Z} = \left\{\bar{0}, \bar{1}, \ldots, \overline{n - 1}\right\}$. Avec $\bar{a} + \bar{b} = \overline{a + b}$ et $\bar{a} \times \bar{b} = \overline{ab}$, c’est un anneau commutatif unitaire.

:::theoreme
$\mathbb{Z}/n\mathbb{Z}$ est un corps si et seulement si $n$ est premier. Plus précisément, $\bar{a}$ est inversible si et seulement si $a \wedge n = 1$.
:::

:::exemple
Dans $\mathbb{Z}/6\mathbb{Z}$, $\bar{2} \times \bar{3} = \bar{0}$ : $\bar{2}$ est un diviseur de zéro. Dans $\mathbb{Z}/7\mathbb{Z}$, $\bar{3} \times \bar{5} = \overline{15} = \bar{1}$ : $\bar{5}$ est l’inverse de $\bar{3}$.
:::
