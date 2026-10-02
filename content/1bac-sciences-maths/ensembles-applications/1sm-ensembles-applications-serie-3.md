---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets : une application homographique bijective et sa réciproque, puis la composition d’applications et ses conséquences sur l’injectivité et la surjectivité, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : une application homographique
Soit $f : \mathbb{R} \setminus \{2\} \to \mathbb{R}$, $f(x) = \dfrac{x + 1}{x - 2}$.

1. Montrer que $f$ est injective.
2. $f$ est-elle surjective ? Déterminer l’ensemble $F$ des réels qui ont un antécédent.
3. Montrer que $f$ réalise une bijection de $\mathbb{R} \setminus \{2\}$ sur $F$ et déterminer sa réciproque.
4. Comparer $f^{-1}$ et $f$. Que vaut $f \circ f$ ?

:::corrige
1. $\frac{x + 1}{x - 2} = \frac{x' + 1}{x' - 2} \Rightarrow (x + 1)(x' - 2) = (x' + 1)(x - 2) \Rightarrow -2x + x' = -2x' + x \Rightarrow 3x' = 3x$.
2. $\frac{x + 1}{x - 2} = y \iff x + 1 = yx - 2y \iff x(1 - y) = -1 - 2y$. Si $y = 1$ : $0 = -3$, impossible. Si $y \neq 1$ : $x = \frac{2y + 1}{y - 1}$, qui est différent de $2$ (sinon $2y + 1 = 2y - 2$). Donc $F = \mathbb{R} \setminus \{1\}$, et $f$ n’est pas surjective sur $\mathbb{R}$.
3. Tout $y \in F$ a un unique antécédent : $f^{-1}(y) = \frac{2y + 1}{y - 1}$.
4. $f^{-1}$ et $f$ ne sont pas égales ($f(0) = -\frac{1}{2}$ mais $f^{-1}(0) = -1$). $f \circ f$ n’est définie que là où $f(x) \neq 2$, et alors $f(f(x)) = \frac{\frac{x + 1}{x - 2} + 1}{\frac{x + 1}{x - 2} - 2} = \frac{2x - 1}{5 - x}$.
:::
:::

:::exercice Problème 2 : composition
Soit $f : E \to F$ et $g : F \to G$ deux applications.

1. Montrer que si $g \circ f$ est injective, alors $f$ est injective.
2. Montrer que si $g \circ f$ est surjective, alors $g$ est surjective.
3. Donner un exemple où $g \circ f$ est bijective mais où $g$ n’est pas injective.

:::corrige
1. Si $f(x) = f(x')$, alors $g(f(x)) = g(f(x'))$, et l’injectivité de $g \circ f$ donne $x = x'$.
2. Pour $z \in G$, il existe $x \in E$ tel que $g(f(x)) = z$ : $y = f(x)$ est un antécédent de $z$ par $g$.
3. $E = G = \{0\}$, $F = \{0 ; 1\}$, $f(0) = 0$, $g(0) = g(1) = 0$ : $g \circ f$ est la bijection de $\{0\}$ sur lui-même, mais $g$ n’est pas injective.
:::
:::
