---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux exercices comme à l’examen national de Sciences mathématiques : un sous-espace de matrices et sa structure, puis un sous-espace de ℝ³ avec base et coordonnées, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un ensemble de matrices
Pour $a$ et $b$ réels, on pose $M(a, b) = \begin{pmatrix} a & b \\ -b & a \end{pmatrix}$, et $E = \{M(a, b) : a, b \in \mathbb{R}\}$.

1. Montrer que $E$ est un sous-espace vectoriel de $\mathcal{M}_2(\mathbb{R})$, et en donner une base et la dimension.
2. Calculer $M(a, b) \times M(c, d)$ et montrer que $E$ est stable pour le produit des matrices.
3. Montrer que le produit est commutatif dans $E$.
4. Montrer que toute matrice non nulle de $E$ est inversible et que son inverse est dans $E$.
5. En déduire que $(E, +, \times)$ est un corps commutatif.

:::corrige
1. $M(a, b) = aI + bJ$ avec $I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ et $J = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$ : $E = \operatorname{Vect}(I, J)$ est un sous-espace. $I$ et $J$ ne sont pas colinéaires : $(I, J)$ est une base, $\dim E = 2$.
2. $M(a, b)M(c, d) = \begin{pmatrix} ac - bd & ad + bc \\ -(ad + bc) & ac - bd \end{pmatrix} = M(ac - bd, ad + bc) \in E$.
3. L’expression est symétrique : $M(c, d)M(a, b) = M(ca - db, cb + da)$, la même matrice.
4. $\det M(a, b) = a^2 + b^2 \neq 0$ si $(a ; b) \neq (0 ; 0)$, et $M(a, b)^{-1} = \frac{1}{a^2 + b^2}\begin{pmatrix} a & -b \\ b & a \end{pmatrix} = M\left(\frac{a}{a^2 + b^2}, \frac{-b}{a^2 + b^2}\right) \in E$.
5. $(E, +)$ est un groupe commutatif (sous-espace), le produit est associatif, distributif et commutatif dans $E$, de neutre $I \in E$, et tout élément non nul est inversible dans $E$ : $(E, +, \times)$ est un corps commutatif.
:::
:::

:::exercice Problème 2 : un sous-espace de ℝ³
Soit $F = \{(x ; y ; z) \in \mathbb{R}^3 : x + y + z = 0\}$, $\vec{u} = (1 ; -1 ; 0)$, $\vec{v} = (0 ; 1 ; -1)$ et $\vec{w} = (1 ; 1 ; 1)$.

1. Montrer que $F$ est un sous-espace de $\mathbb{R}^3$ et que $(\vec{u}, \vec{v})$ en est une base.
2. Montrer que $(\vec{u}, \vec{v}, \vec{w})$ est une base de $\mathbb{R}^3$.
3. Déterminer les coordonnées de $\vec{a} = (2 ; 3 ; 4)$ dans cette base.
4. En déduire la décomposition de $\vec{a}$ comme somme d’un vecteur de $F$ et d’un vecteur colinéaire à $\vec{w}$.

:::corrige
1. Équation linéaire sans terme constant : sous-espace. $z = -x - y$, donc $(x ; y ; z) = x(1 ; 0 ; -1) + y(0 ; 1 ; -1)$ ; or $(1 ; 0 ; -1) = \vec{u} + \vec{v}$, donc $F = \operatorname{Vect}(\vec{u}, \vec{v})$, et $\vec{u}$, $\vec{v}$ ne sont pas colinéaires : c’est une base.
2. $\vec{u} \wedge \vec{v} = \left((-1)(-1) - 0 \times 1 ; -(1 \times (-1) - 0 \times 0) ; 1 \times 1 - (-1) \times 0\right) = (1 ; 1 ; 1)$, et $(\vec{u} \wedge \vec{v}) \cdot \vec{w} = 3 \neq 0$ : c’est une base.
3. $\alpha\vec{u} + \beta\vec{v} + \gamma\vec{w} = (\alpha + \gamma ; -\alpha + \beta + \gamma ; -\beta + \gamma) = (2 ; 3 ; 4)$. En additionnant les trois équations : $3\gamma = 9$, $\gamma = 3$. Puis $\alpha = -1$ et $\beta = -1$.
4. $\vec{a} = (-\vec{u} - \vec{v}) + 3\vec{w}$, avec $-\vec{u} - \vec{v} = (-1 ; 0 ; 1) \in F$ et $3\vec{w} = (3 ; 3 ; 3)$.
:::
:::
