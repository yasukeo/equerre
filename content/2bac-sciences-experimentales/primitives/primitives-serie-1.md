---
title: Série 1 — partie 1 : définition et primitives usuelles
kind: serie
summary: Vérifier une primitive, primitives usuelles, primitive qui prend une valeur donnée, sens de variation d’une primitive, avec les corrigés.
position: 10
visibility: public
---

Cinq exercices sur la première partie du cours.

:::exercice Vérifier une primitive
1. Montrer que $F(x) = \dfrac{x^2}{x + 1}$ est une primitive de $f(x) = \dfrac{x^2 + 2x}{(x + 1)^2}$ sur $]-1 ; +\infty[$.
2. Montrer que $G(x) = x\sin x + \cos x$ est une primitive de $g(x) = x\cos x$ sur $\mathbb{R}$.

:::corrige
1. $F'(x) = \frac{2x(x + 1) - x^2}{(x + 1)^2} = \frac{x^2 + 2x}{(x + 1)^2} = f(x)$.
2. $G'(x) = \sin x + x\cos x - \sin x = x\cos x = g(x)$.
:::
:::

:::exercice Primitives usuelles
Déterminer une primitive de chaque fonction sur l’intervalle indiqué.

1. $f(x) = 4x^3 - 6x + 5$ sur $\mathbb{R}$.
2. $g(x) = \dfrac{1}{x^2} + \dfrac{1}{\sqrt{x}}$ sur $]0 ; +\infty[$.
3. $h(x) = \cos(2x) - 3\sin x$ sur $\mathbb{R}$.
4. $k(x) = x^2\sqrt{x}$ sur $]0 ; +\infty[$.
5. $m(x) = 1 + \tan^2 x$ sur $\left]-\frac{\pi}{2} ; \frac{\pi}{2}\right[$.

:::corrige
1. $F(x) = x^4 - 3x^2 + 5x$.
2. $G(x) = -\dfrac{1}{x} + 2\sqrt{x}$.
3. $H(x) = \dfrac{1}{2}\sin(2x) + 3\cos x$.
4. $k(x) = x^{\frac{5}{2}}$, donc $K(x) = \frac{2}{7}x^{\frac{7}{2}} = \frac{2}{7}x^3\sqrt{x}$.
5. $M(x) = \tan x$.
:::
:::

:::exercice Primitive qui prend une valeur donnée
1. Déterminer la primitive $F$ de $f(x) = 2x - \sin x$ sur $\mathbb{R}$ telle que $F(0) = 3$.
2. Déterminer la primitive $G$ de $g(x) = \dfrac{1}{x^2} - x$ sur $]0 ; +\infty[$ telle que $G(1) = 0$.

:::corrige
1. Les primitives de $f$ sont $x^2 + \cos x + c$. $F(0) = 1 + c = 3$ donne $c = 2$ : $F(x) = x^2 + \cos x + 2$.
2. Les primitives de $g$ sont $-\frac{1}{x} - \frac{x^2}{2} + c$. $G(1) = -1 - \frac{1}{2} + c = 0$ donne $c = \frac{3}{2}$ : $G(x) = -\frac{1}{x} - \frac{x^2}{2} + \frac{3}{2}$.
:::
:::

:::exercice Primitives d’une fonction affine composée
Déterminer une primitive de chaque fonction.

1. $f(x) = (2x - 1)^3$ sur $\mathbb{R}$.
2. $g(x) = \sin\left(3x + \frac{\pi}{4}\right)$ sur $\mathbb{R}$.
3. $h(x) = \dfrac{1}{(x + 2)^2}$ sur $]-2 ; +\infty[$.

:::corrige
1. $F(x) = \frac{1}{2} \times \frac{(2x - 1)^4}{4} = \frac{(2x - 1)^4}{8}$ (on vérifie : $F'(x) = \frac{4 \times 2(2x - 1)^3}{8} = (2x - 1)^3$).
2. $G(x) = -\frac{1}{3}\cos\left(3x + \frac{\pi}{4}\right)$.
3. $H(x) = -\frac{1}{x + 2}$.
:::
:::

:::exercice Sens de variation d’une primitive
Soit $f(x) = x^2 - 4$ et $F$ la primitive de $f$ sur $\mathbb{R}$ qui s’annule en $0$.

1. Sans calculer $F$, étudier le sens de variation de $F$.
2. Calculer $F(x)$ et vérifier.

:::corrige
1. $F' = f = (x - 2)(x + 2)$ : $F$ est croissante sur $]-\infty ; -2]$, décroissante sur $[-2 ; 2]$ et croissante sur $[2 ; +\infty[$.
2. $F(x) = \frac{x^3}{3} - 4x$ (la constante est nulle car $F(0) = 0$). On retrouve $F'(x) = x^2 - 4$.
:::
:::
