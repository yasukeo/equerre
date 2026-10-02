---
title: Série 1 — partie 1 : lois et groupes
kind: serie
summary: Étudier une loi interne, reconnaître un groupe, symétriques, sous-groupes de (ℝ, +), de (ℝ*₊, ×) et de (𝕌, ×), équations dans un groupe, avec les corrigés.
position: 10
visibility: public
---

Cinq exercices sur la première partie du cours.

:::exercice Étudier une loi
Sur $\mathbb{R}_+ = [0 ; +\infty[$, on pose $x * y = \sqrt{x^2 + y^2}$.

1. Montrer que $*$ est une loi interne, commutative et associative.
2. Montrer que $*$ a un élément neutre.
3. Quels éléments ont un symétrique ? $(\mathbb{R}_+, *)$ est-il un groupe ?

:::corrige
1. $\sqrt{x^2 + y^2} \in \mathbb{R}_+$ ; l’expression est symétrique en $x$ et $y$ ; $(x * y) * z = \sqrt{x^2 + y^2 + z^2} = x * (y * z)$.
2. $x * 0 = \sqrt{x^2} = x$ car $x \geq 0$ : $0$ est neutre.
3. $x * x' = 0 \iff x^2 + x'^2 = 0 \iff x = x' = 0$ : seul $0$ a un symétrique. Ce n’est pas un groupe.
:::
:::

:::exercice Un groupe sur ℤ
Sur $\mathbb{Z}$, on pose $x \top y = x + y + 3$. Montrer que $(\mathbb{Z}, \top)$ est un groupe commutatif.

:::corrige
- Loi interne et commutative : $x + y + 3 \in \mathbb{Z}$ et $x + y + 3 = y + x + 3$.
- Associative : $(x \top y) \top z = x + y + z + 6 = x \top (y \top z)$.
- Neutre : $x \top e = x \iff e = -3$.
- Symétrique : $x \top x' = -3 \iff x' = -x - 6 \in \mathbb{Z}$.
:::
:::

:::exercice Un groupe sur ℝ privé d’un point
Sur $\mathbb{R}$, on pose $x * y = x + y - 2xy$, et $G = \mathbb{R} \setminus \left\{\frac{1}{2}\right\}$.

1. Vérifier que $1 - 2(x * y) = (1 - 2x)(1 - 2y)$, et en déduire que $G$ est stable pour $*$.
2. Montrer que $(G, *)$ est un groupe commutatif.

:::corrige
1. $(1 - 2x)(1 - 2y) = 1 - 2x - 2y + 4xy = 1 - 2(x + y - 2xy)$. Si $x$, $y \in G$, les deux facteurs sont non nuls, donc $1 - 2(x * y) \neq 0$ et $x * y \neq \frac{1}{2}$.
2. Commutative (expression symétrique). Associative : $(x * y) * z$ et $x * (y * z)$ valent toutes deux $x + y + z - 2(xy + yz + zx) + 4xyz$. Neutre : $0$. Symétrique de $x \in G$ : $x + x' - 2xx' = 0$ donne $x' = \frac{x}{2x - 1}$, défini car $x \neq \frac{1}{2}$, et $x' \neq \frac{1}{2}$ (sinon $2x = 2x - 1$).
:::
:::

:::exercice Sous-groupes
Montrer que :

1. $H = \left\{a + b\sqrt{2} : a, b \in \mathbb{Z}\right\}$ est un sous-groupe de $(\mathbb{R}, +)$ ;
2. $K = \left\{2^n : n \in \mathbb{Z}\right\}$ est un sous-groupe de $(]0 ; +\infty[, \times)$ ;
3. $\mathbb{U}_n = \{z \in \mathbb{C} : z^n = 1\}$ est un sous-groupe de $(\mathbb{U}, \times)$.

:::corrige
1. $0 = 0 + 0\sqrt{2} \in H$, et $(a + b\sqrt{2}) - (c + d\sqrt{2}) = (a - c) + (b - d)\sqrt{2} \in H$.
2. $1 = 2^0 \in K$, et $\frac{2^n}{2^m} = 2^{n - m} \in K$.
3. $1 \in \mathbb{U}_n$ ; si $z^n = 1$, alors $|z|^n = 1$ et $|z| = 1$, donc $\mathbb{U}_n \subset \mathbb{U}$ ; et si $z^n = z'^n = 1$, $\left(\frac{z}{z'}\right)^n = 1$.
:::
:::

:::exercice Équations dans un groupe
Dans le groupe $(\mathbb{R} \setminus \{1\}, *)$ du cours, où $x * y = x + y - xy$, résoudre l’équation $2 * x = 5$.

:::corrige
Le symétrique de $2$ est $\frac{2}{2 - 1} = 2$. Donc $x = 2 * 5 = 2 + 5 - 10 = -3$. Vérification : $2 * (-3) = 2 - 3 + 6 = 5$.
:::
:::
