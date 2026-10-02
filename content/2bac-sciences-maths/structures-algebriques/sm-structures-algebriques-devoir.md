---
title: Devoir surveillé : structures algébriques
kind: devoir
summary: Un devoir d’une heure sur 20 points : un groupe sur ℝ privé d’un point, des sous-groupes, calculs dans ℤ/5ℤ, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (8 points) : un groupe
Sur $\mathbb{R}$, on pose $x * y = x + y + xy$, et $G = \mathbb{R} \setminus \{-1\}$.

1. Vérifier que $1 + x * y = (1 + x)(1 + y)$, et en déduire que $G$ est stable pour $*$. (2 pts)
2. Montrer que $*$ est associative et commutative. (2 pts)
3. Déterminer l’élément neutre et le symétrique de tout $x \in G$. (2 pts)
4. Montrer que $f : x \mapsto 1 + x$ est un isomorphisme de $(G, *)$ sur $(\mathbb{R}^*, \times)$. (2 pts)

:::corrige
1. $(1 + x)(1 + y) = 1 + x + y + xy$. Si $x$, $y \neq -1$, le produit est non nul, donc $x * y \neq -1$.
2. Commutative : expression symétrique. Associative : $1 + (x * y) * z = (1 + x)(1 + y)(1 + z) = 1 + x * (y * z)$.
3. Neutre $0$. $x * x' = 0 \iff (1 + x)(1 + x') = 1 \iff x' = \frac{1}{1 + x} - 1 = \frac{-x}{1 + x}$, qui est dans $G$.
4. $f(x * y) = (1 + x)(1 + y) = f(x)f(y)$, et $f$ est une bijection de $G$ sur $\mathbb{R}^*$.
:::
:::

:::exercice Exercice 2 (5 points) : sous-groupes
1. Montrer que $3\mathbb{Z}$ est un sous-groupe de $(\mathbb{Z}, +)$. (2 pts)
2. Montrer que $H = \left\{3^n : n \in \mathbb{Z}\right\}$ est un sous-groupe de $(]0 ; +\infty[, \times)$. (3 pts)

:::corrige
1. $0 \in 3\mathbb{Z}$, et $3a - 3b = 3(a - b) \in 3\mathbb{Z}$.
2. $1 = 3^0 \in H$, et $\frac{3^n}{3^m} = 3^{n - m} \in H$.
:::
:::

:::exercice Exercice 3 (7 points) : ℤ/5ℤ
1. Dresser la table de multiplication de $\mathbb{Z}/5\mathbb{Z}$ privé de $\bar{0}$, et en déduire l’inverse de chaque élément non nul. (3 pts)
2. Résoudre dans $\mathbb{Z}/5\mathbb{Z}$ : $\bar{2}x + \bar{3} = \bar{1}$, puis $x^2 = \bar{4}$. (4 pts)

:::corrige
1. Produits : $\bar{2} \times \bar{3} = \bar{1}$, $\bar{4} \times \bar{4} = \bar{1}$, $\bar{1} \times \bar{1} = \bar{1}$ ; inverses : $\bar{1}^{-1} = \bar{1}$, $\bar{2}^{-1} = \bar{3}$, $\bar{3}^{-1} = \bar{2}$, $\bar{4}^{-1} = \bar{4}$. ($\mathbb{Z}/5\mathbb{Z}$ est un corps car $5$ est premier.)
2. $\bar{2}x = \bar{1} - \bar{3} = \bar{3}$, donc $x = \bar{3} \times \bar{3} = \bar{9} = \bar{4}$. Pour $x^2 = \bar{4}$ : les carrés de $\bar{0}, \ldots, \bar{4}$ sont $\bar{0}, \bar{1}, \bar{4}, \bar{4}, \bar{1}$, donc $x = \bar{2}$ ou $x = \bar{3}$.
:::
:::
