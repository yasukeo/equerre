---
title: Série 1 — partie 2 : les applications
kind: serie
summary: Injectivité, surjectivité, bijectivité, réciproque, composition, images directes et réciproques, avec les corrigés.
position: 20
visibility: enrolled
---

Quatre exercices sur la deuxième partie du cours.

:::exercice Injective, surjective ?
Étudier l’injectivité et la surjectivité de :

1. $f : \mathbb{R} \to \mathbb{R}$, $f(x) = 3x - 5$ ;
2. $g : \mathbb{R} \to \mathbb{R}$, $g(x) = x^2 + 1$ ;
3. $h : \mathbb{N} \to \mathbb{N}$, $h(n) = 2n$.

:::corrige
1. $3x - 5 = y \iff x = \frac{y + 5}{3}$ : un unique antécédent, $f$ est bijective.
2. $g(1) = g(-1)$ : non injective ; $0$ n’a pas d’antécédent ($x^2 + 1 \geq 1$) : non surjective.
3. $2n = 2m \Rightarrow n = m$ : injective ; $1$ n’a pas d’antécédent : non surjective.
:::
:::

:::exercice Une bijection et sa réciproque
Soit $f : ]1 ; +\infty[ \to ]2 ; +\infty[$, $f(x) = \dfrac{2x}{x - 1}$.

1. Vérifier que $f(x) = 2 + \dfrac{2}{x - 1}$, et en déduire que $f$ est bien à valeurs dans $]2 ; +\infty[$.
2. Montrer que $f$ est bijective et déterminer $f^{-1}$.

:::corrige
1. $2 + \frac{2}{x - 1} = \frac{2(x - 1) + 2}{x - 1} = \frac{2x}{x - 1}$. Pour $x > 1$, $\frac{2}{x - 1} > 0$, donc $f(x) > 2$.
2. Pour $y > 2$ : $2 + \frac{2}{x - 1} = y \iff x - 1 = \frac{2}{y - 2} \iff x = 1 + \frac{2}{y - 2}$, qui est bien dans $]1 ; +\infty[$. Un unique antécédent : $f$ est bijective et $f^{-1}(y) = 1 + \frac{2}{y - 2}$.
:::
:::

:::exercice Composition
Soit $f(x) = 2x + 1$ et $g(x) = x^2$ de $\mathbb{R}$ dans $\mathbb{R}$.

1. Calculer $g \circ f$ et $f \circ g$. Sont-elles égales ?
2. $g \circ f$ est-elle injective ?

:::corrige
1. $(g \circ f)(x) = (2x + 1)^2$ et $(f \circ g)(x) = 2x^2 + 1$ : différentes (en $0$ : $1$ et $1$, mais en $1$ : $9$ et $3$).
2. $(g \circ f)(0) = 1 = (g \circ f)(-1)$ : non injective.
:::
:::

:::exercice Images directes et réciproques
Soit $f : \mathbb{R} \to \mathbb{R}$, $f(x) = x^2 - 2x$.

1. Déterminer $f([0 ; 3])$.
2. Déterminer $f^{-1}(\{3\})$ et $f^{-1}([-1 ; 0])$.

:::corrige
1. $f(x) = (x - 1)^2 - 1$ : sur $[0 ; 3]$, minimum $-1$ en $1$, maximum $f(3) = 3$ : $f([0 ; 3]) = [-1 ; 3]$.
2. $x^2 - 2x = 3 \iff x = 3$ ou $x = -1$ : $\{-1 ; 3\}$. $-1 \leq (x - 1)^2 - 1 \leq 0 \iff (x - 1)^2 \leq 1 \iff 0 \leq x \leq 2$ : $[0 ; 2]$.
:::
:::
