---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux problèmes rédigés comme à l’examen national, qui mêlent limites, continuité, valeurs intermédiaires et fonction réciproque, avec les corrigés détaillés.
position: 30
visibility: enrolled
---

Ces problèmes reprennent tout le chapitre. Rédigez chaque réponse comme sur une copie d’examen : chaque affirmation est justifiée.

:::exercice Problème 1 : une fonction polynôme et sa réciproque
Soit $f$ la fonction définie sur $\mathbb{R}$ par $f(x) = x^3 + x + 1$.

1. Calculer $\lim_{x \to -\infty} f(x)$ et $\lim_{x \to +\infty} f(x)$.
2. Montrer que $f$ est strictement croissante sur $\mathbb{R}$.
3. Montrer que $f$ admet une fonction réciproque $f^{-1}$ définie sur $\mathbb{R}$, et préciser son sens de variation.
4. Montrer que l’équation $f(x) = 0$ admet une unique solution $\alpha$, et que $-0{,}75 < \alpha < -0{,}5$.
5. Calculer $f^{-1}(1)$, $f^{-1}(3)$ et $f^{-1}(-1)$.
6. Résoudre dans $\mathbb{R}$ l’inéquation $f^{-1}(x) > 0$.

:::corrige
1. En $\pm\infty$, $f$ a la limite de son terme de plus haut degré $x^3$ : $\lim_{x \to -\infty} f(x) = -\infty$ et $\lim_{x \to +\infty} f(x) = +\infty$.
2. $x \mapsto x^3$ et $x \mapsto x + 1$ sont strictement croissantes sur $\mathbb{R}$ ; leur somme $f$ l’est aussi.
3. $f$ est continue (polynôme) et strictement croissante sur $\mathbb{R}$, donc c’est une bijection de $\mathbb{R}$ sur $f(\mathbb{R}) = ]-\infty ; +\infty[ = \mathbb{R}$, d’après les limites de la question 1. Sa réciproque $f^{-1}$ est définie sur $\mathbb{R}$, continue et strictement croissante.
4. $0 \in f(\mathbb{R})$ et $f$ est bijective : l’équation $f(x) = 0$ a une unique solution $\alpha$. De plus $f(-0{,}75) = -0{,}421875 - 0{,}75 + 1 = -0{,}171875 < 0$ et $f(-0{,}5) = -0{,}125 - 0{,}5 + 1 = 0{,}375 > 0$ ; $f$ étant continue et strictement croissante, $-0{,}75 < \alpha < -0{,}5$.
5. $f(0) = 1$, $f(1) = 3$ et $f(-1) = -1$, donc $f^{-1}(1) = 0$, $f^{-1}(3) = 1$ et $f^{-1}(-1) = -1$.
6. $f$ est strictement croissante, donc $f^{-1}(x) > 0 \iff x > f(0) = 1$. L’ensemble des solutions est $]1 ; +\infty[$.
:::
:::

:::exercice Problème 2 : une racine et sa réciproque
Soit $g$ la fonction définie sur $\mathbb{R}$ par $g(x) = \sqrt{x^2 + 1} - x$.

1. Montrer que $g(x) > 0$ pour tout réel $x$.
2. Calculer $\lim_{x \to -\infty} g(x)$, puis montrer que $\lim_{x \to +\infty} g(x) = 0$.
3. Montrer que $g$ est strictement décroissante sur $]-\infty ; 0]$, puis, en écrivant $g(x) = \dfrac{1}{\sqrt{x^2 + 1} + x}$, sur $[0 ; +\infty[$.
4. En déduire que $g$ est une bijection de $\mathbb{R}$ sur un intervalle $J$ à déterminer.
5. Déterminer $g^{-1}(x)$ pour tout $x \in J$.

:::corrige
1. $\sqrt{x^2 + 1} > \sqrt{x^2} = |x| \geq x$, donc $g(x) > 0$.
2. En $-\infty$, $\sqrt{x^2 + 1} \to +\infty$ et $-x \to +\infty$ : $\lim_{x \to -\infty} g(x) = +\infty$. En $+\infty$, avec la quantité conjuguée, $g(x) = \frac{(x^2 + 1) - x^2}{\sqrt{x^2 + 1} + x} = \frac{1}{\sqrt{x^2 + 1} + x}$, et le dénominateur tend vers $+\infty$ : $\lim_{x \to +\infty} g(x) = 0$.
3. Sur $]-\infty ; 0]$, $x \mapsto x^2 + 1$ est strictement décroissante et positive, donc $x \mapsto \sqrt{x^2 + 1}$ aussi ; $x \mapsto -x$ est strictement décroissante ; leur somme $g$ est strictement décroissante. Sur $[0 ; +\infty[$, le dénominateur $\sqrt{x^2 + 1} + x$ est strictement croissant et strictement positif, donc son inverse $g$ est strictement décroissant.
4. $g$ est continue et strictement décroissante sur $\mathbb{R}$, donc bijective de $\mathbb{R}$ sur $J = \left]\lim_{+\infty} g ; \lim_{-\infty} g\right[ = ]0 ; +\infty[$.
5. Pour $y > 0$ : $\sqrt{x^2 + 1} - x = y \iff \sqrt{x^2 + 1} = x + y$. Cela impose $x + y \geq 0$ et, en élevant au carré, $x^2 + 1 = x^2 + 2xy + y^2$, d’où $x = \frac{1 - y^2}{2y}$. On vérifie que $x + y = \frac{1 + y^2}{2y} > 0$ : la condition est remplie. Donc $g^{-1}(x) = \dfrac{1 - x^2}{2x}$ pour $x > 0$. (Contrôle : $g(0) = 1$ et $g^{-1}(1) = 0$.)
:::
:::

