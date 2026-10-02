---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux exercices comme à l’examen national de Sciences mathématiques : un corps obtenu par transport de structure, puis un groupe de matrices isomorphe à (ℝ, +), avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un corps par transport de structure
Sur $\mathbb{R}$, on définit les lois $x \top y = x + y - 1$ et $x \perp y = xy - x - y + 2$. Soit $f : \mathbb{R} \to \mathbb{R}$, $f(x) = x + 1$.

1. Montrer que $f$ est une bijection et que pour tous réels $a$ et $b$ : $f(a + b) = f(a) \top f(b)$ et $f(ab) = f(a) \perp f(b)$.
2. En déduire que $(\mathbb{R}, \top, \perp)$ est un corps commutatif.
3. Préciser les éléments neutres des deux lois, le symétrique de $x$ pour $\top$ et l’inverse de $x$ pour $\perp$.

:::corrige
1. $f$ est bijective (de réciproque $y \mapsto y - 1$). $f(a) \top f(b) = (a + 1) + (b + 1) - 1 = a + b + 1 = f(a + b)$. $f(a) \perp f(b) = (a + 1)(b + 1) - (a + 1) - (b + 1) + 2 = ab + 1 = f(ab)$.
2. $(\mathbb{R}, +, \times)$ est un corps commutatif et $f$ transporte les deux lois : $(\mathbb{R}, \top, \perp)$ est un corps commutatif.
3. Neutre de $\top$ : $f(0) = 1$ ; neutre de $\perp$ : $f(1) = 2$. Le symétrique de $x = f(x - 1)$ pour $\top$ est $f(-(x - 1)) = 2 - x$. Pour $x \neq 1$ (le « zéro » de ce corps), l’inverse pour $\perp$ est $f\left(\frac{1}{x - 1}\right) = 1 + \frac{1}{x - 1} = \frac{x}{x - 1}$.
:::
:::

:::exercice Problème 2 : un groupe de matrices
Pour tout réel $x$, on pose $M(x) = \begin{pmatrix} 1 - x & x \\ -x & 1 + x \end{pmatrix}$, et $G = \{M(x) : x \in \mathbb{R}\}$.

1. Montrer que $M(x)M(y) = M(x + y)$ pour tous réels $x$ et $y$.
2. En déduire que $G$ est stable pour le produit, et que le produit y est commutatif.
3. Montrer que $\varphi : x \mapsto M(x)$ est un isomorphisme de $(\mathbb{R}, +)$ sur $(G, \times)$.
4. En déduire que $(G, \times)$ est un groupe commutatif, et préciser son neutre et l’inverse de $M(x)$.
5. Calculer $M(1)^n$ pour tout entier $n$.

:::corrige
1. Coefficient en haut à gauche : $(1 - x)(1 - y) - xy = 1 - x - y$. En haut à droite : $(1 - x)y + x(1 + y) = x + y$. En bas à gauche : $-x(1 - y) - y(1 + x) = -x - y$. En bas à droite : $-xy + (1 + x)(1 + y) = 1 + x + y$. C’est $M(x + y)$.
2. Le produit de deux éléments de $G$ est dans $G$, et $M(x)M(y) = M(x + y) = M(y + x) = M(y)M(x)$.
3. $\varphi(x + y) = \varphi(x)\varphi(y)$ : morphisme. Il est surjectif par définition de $G$, et injectif car $M(x) = M(y)$ donne (coefficient en haut à droite) $x = y$.
4. Transport de structure : $(G, \times)$ est un groupe commutatif, de neutre $M(0) = I$, et $M(x)^{-1} = M(-x)$.
5. $M(1)^n = M(n) = \begin{pmatrix} 1 - n & n \\ -n & 1 + n \end{pmatrix}$, pour tout $n \in \mathbb{Z}$.
:::
:::
