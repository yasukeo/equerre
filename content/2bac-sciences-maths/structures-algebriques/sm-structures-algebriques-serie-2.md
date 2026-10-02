---
title: Série 1 — partie 2 : morphismes, anneaux et corps
kind: serie
summary: Morphismes et isomorphismes, transport de structure, calculs dans l’anneau des matrices d’ordre 2, ℤ/nℤ et ses inverses, un sous-corps de ℝ, avec les corrigés.
position: 20
visibility: enrolled
---

Cinq exercices sur la deuxième partie du cours.

:::exercice Morphismes
1. Montrer que $f : x \mapsto 2^x$ est un isomorphisme de $(\mathbb{R}, +)$ sur $(]0 ; +\infty[, \times)$.
2. $g : z \mapsto |z|$ est-il un morphisme de $(\mathbb{C}^*, \times)$ dans $(\mathbb{R}^*, \times)$ ? Est-il injectif ?

:::corrige
1. $2^{x + y} = 2^x \times 2^y$ : c’est un morphisme. $2^x = e^{x\ln 2}$ est continue, strictement croissante, de limites $0$ et $+\infty$ : c’est une bijection de $\mathbb{R}$ sur $]0 ; +\infty[$.
2. $|zz'| = |z||z'|$ : oui. Il n’est pas injectif : $|1| = |-1|$.
:::
:::

:::exercice Transport de structure
Sur $\mathbb{R}$, on pose $x \perp y = \sqrt[3]{x^3 + y^3}$ (où $\sqrt[3]{t}$ désigne l’unique réel dont le cube est $t$).

1. Montrer que $f : x \mapsto x^3$ est une bijection de $\mathbb{R}$ sur $\mathbb{R}$ telle que $f(x \perp y) = f(x) + f(y)$.
2. En déduire que $(\mathbb{R}, \perp)$ est un groupe commutatif, et préciser son neutre et le symétrique de $x$.

:::corrige
1. $x \mapsto x^3$ est continue, strictement croissante, de limites $\pm\infty$ : bijective. Et $f(x \perp y) = x^3 + y^3 = f(x) + f(y)$.
2. $f^{-1}$ est un isomorphisme de $(\mathbb{R}, +)$ sur $(\mathbb{R}, \perp)$ : la structure de groupe commutatif se transporte. Neutre : $f^{-1}(0) = 0$. Symétrique de $x$ : $f^{-1}\left(-x^3\right) = -x$.
:::
:::

:::exercice Matrices
Soit $A = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}$ et $B = \begin{pmatrix} 1 & 0 \\ 3 & 1 \end{pmatrix}$.

1. Calculer $AB$ et $BA$. Que constate-t-on ?
2. Montrer que $A$ est inversible et calculer $A^{-1}$.
3. Calculer $A^n$ pour tout entier $n \geq 1$.

:::corrige
1. $AB = \begin{pmatrix} 7 & 2 \\ 3 & 1 \end{pmatrix}$ et $BA = \begin{pmatrix} 1 & 2 \\ 3 & 7 \end{pmatrix}$ : $AB \neq BA$, le produit n’est pas commutatif.
2. $\det A = 1 \neq 0$ : $A^{-1} = \begin{pmatrix} 1 & -2 \\ 0 & 1 \end{pmatrix}$.
3. Par récurrence, $A^n = \begin{pmatrix} 1 & 2n \\ 0 & 1 \end{pmatrix}$ : c’est vrai pour $n = 1$, et $A^{n + 1} = A^n A = \begin{pmatrix} 1 & 2 + 2n \\ 0 & 1 \end{pmatrix}$.
:::
:::

:::exercice Calculs dans ℤ/nℤ
1. Dresser la liste des éléments inversibles de $\mathbb{Z}/8\mathbb{Z}$ et de leurs inverses.
2. Résoudre dans $\mathbb{Z}/7\mathbb{Z}$ l’équation $\bar{3}x + \bar{2} = \bar{0}$.
3. Résoudre dans $\mathbb{Z}/8\mathbb{Z}$ l’équation $x^2 = \bar{1}$. Combien a-t-elle de solutions ?

:::corrige
1. Les $\bar{a}$ avec $a \wedge 8 = 1$ : $\bar{1}$, $\bar{3}$, $\bar{5}$, $\bar{7}$, chacun étant son propre inverse ($9$, $25$ et $49$ sont congrus à $1$ modulo $8$).
2. $\bar{3}x = -\bar{2} = \bar{5}$ ; l’inverse de $\bar{3}$ est $\bar{5}$ ; $x = \bar{5} \times \bar{5} = \overline{25} = \bar{4}$.
3. Les carrés modulo $8$ de $0, \ldots, 7$ sont $0, 1, 4, 1, 0, 1, 4, 1$ : $x \in \left\{\bar{1}, \bar{3}, \bar{5}, \bar{7}\right\}$, quatre solutions, ce qui ne peut pas arriver dans un corps.
:::
:::

:::exercice Un sous-corps de ℝ
Soit $K = \left\{a + b\sqrt{2} : a, b \in \mathbb{Q}\right\}$.

1. Montrer que $K$ est stable pour l’addition et la multiplication.
2. Sachant que $\sqrt{2}$ est irrationnel, montrer que si $a + b\sqrt{2} \neq 0$, alors $a^2 - 2b^2 \neq 0$.
3. Montrer que $(K, +, \times)$ est un corps.

:::corrige
1. $(a + b\sqrt{2}) + (c + d\sqrt{2}) = (a + c) + (b + d)\sqrt{2}$ et $(a + b\sqrt{2})(c + d\sqrt{2}) = (ac + 2bd) + (ad + bc)\sqrt{2}$, avec des coefficients rationnels.
2. Si $a^2 = 2b^2$ avec $b \neq 0$, alors $\sqrt{2} = \left|\frac{a}{b}\right|$ serait rationnel ; donc $b = 0$, puis $a = 0$, ce qui est exclu.
3. $K$ est un sous-anneau de $\mathbb{R}$ (stable, contient $0$ et $1$, et les opposés). L’inverse de $a + b\sqrt{2} \neq 0$ est $\frac{a - b\sqrt{2}}{a^2 - 2b^2} = \frac{a}{a^2 - 2b^2} - \frac{b}{a^2 - 2b^2}\sqrt{2} \in K$.
:::
:::
