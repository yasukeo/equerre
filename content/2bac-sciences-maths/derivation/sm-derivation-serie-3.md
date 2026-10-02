---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux problèmes d’étude de fonction rédigés comme à l’examen national, avec asymptotes, variations, symétrie, tangente, discussion graphique et fonction réciproque, et leurs corrigés.
position: 30
visibility: enrolled
---

Deux problèmes complets. Le premier suit le plan d’étude d’une fonction ; le second ajoute la fonction réciproque et sa dérivée.

:::exercice Problème 1 : une fonction rationnelle
Soit $f$ la fonction définie sur $D = \mathbb{R} \setminus \{-1\}$ par $f(x) = \dfrac{x^2 + 3}{x + 1}$, et $(C)$ sa courbe dans un repère orthonormé.

1. Vérifier que pour tout $x \in D$, $f(x) = x - 1 + \dfrac{4}{x + 1}$.
2. Calculer les limites de $f$ aux bornes de $D$ et interpréter graphiquement les limites en $-1$.
3. Montrer que la droite $(\Delta) : y = x - 1$ est asymptote oblique à $(C)$ en $+\infty$ et en $-\infty$, et étudier la position de $(C)$ par rapport à $(\Delta)$.
4. Montrer que $f'(x) = \dfrac{(x + 3)(x - 1)}{(x + 1)^2}$ et dresser le tableau de variations de $f$.
5. Montrer que le point $\Omega(-1 ; -2)$ est un centre de symétrie de $(C)$.
6. Déterminer l’équation de la tangente $(T)$ à $(C)$ au point d’abscisse $0$.
7. Discuter, selon les valeurs du réel $m$, le nombre de solutions de l’équation $f(x) = m$.

:::corrige
1. $x - 1 + \frac{4}{x + 1} = \frac{(x - 1)(x + 1) + 4}{x + 1} = \frac{x^2 + 3}{x + 1}$.
2. En $\pm\infty$, $f$ a la limite de $\frac{x^2}{x} = x$ : $\lim_{-\infty} f = -\infty$, $\lim_{+\infty} f = +\infty$. En $-1$, le numérateur tend vers $4$ : $\lim_{x \to -1^-} f(x) = -\infty$ et $\lim_{x \to -1^+} f(x) = +\infty$. La droite $x = -1$ est asymptote verticale à $(C)$.
3. $f(x) - (x - 1) = \frac{4}{x + 1}$ tend vers $0$ en $\pm\infty$ : $(\Delta)$ est asymptote oblique. Ce terme est positif pour $x > -1$ et négatif pour $x < -1$ : $(C)$ est au-dessus de $(\Delta)$ sur $]-1 ; +\infty[$ et au-dessous sur $]-\infty ; -1[$.
4. $f'(x) = 1 - \frac{4}{(x + 1)^2} = \frac{(x + 1)^2 - 4}{(x + 1)^2} = \frac{(x + 1 - 2)(x + 1 + 2)}{(x + 1)^2} = \frac{(x - 1)(x + 3)}{(x + 1)^2}$. Le signe est celui de $(x + 3)(x - 1)$ :

- $f$ est croissante sur $]-\infty ; -3]$, de $-\infty$ à $f(-3) = \frac{12}{-2} = -6$ ;
- décroissante sur $[-3 ; -1[$, de $-6$ à $-\infty$ ;
- décroissante sur $]-1 ; 1]$, de $+\infty$ à $f(1) = 2$ ;
- croissante sur $[1 ; +\infty[$, de $2$ à $+\infty$.

5. Si $x \in D$, alors $-2 - x \in D$, et $f(-2 - x) + f(x) = (-3 - x) + \frac{4}{-1 - x} + (x - 1) + \frac{4}{x + 1} = -4 = 2 \times (-2)$. Donc $\Omega(-1 ; -2)$ est centre de symétrie (c’est le point d’intersection des deux asymptotes).
6. $f(0) = 3$ et $f'(0) = \frac{3 \times (-1)}{1} = -3$ : $(T) : y = -3x + 3$.
7. On lit le nombre de points d’intersection de $(C)$ avec la droite horizontale $y = m$, à l’aide du tableau de variations :

- si $m < -6$ : deux solutions, une dans $]-\infty ; -3[$ et une dans $]-3 ; -1[$ ;
- si $m = -6$ : une solution, $x = -3$ ;
- si $-6 < m < 2$ : aucune solution ;
- si $m = 2$ : une solution, $x = 1$ ;
- si $m > 2$ : deux solutions, une dans $]-1 ; 1[$ et une dans $]1 ; +\infty[$.
:::
:::

:::exercice Problème 2 : une bijection et sa réciproque
Soit $h$ la fonction définie sur $\mathbb{R}$ par $h(x) = \dfrac{x}{\sqrt{x^2 + 1}}$.

1. Calculer $\lim_{x \to +\infty} h(x)$ et $\lim_{x \to -\infty} h(x)$.
2. Montrer que $h'(x) = \dfrac{1}{\left(x^2 + 1\right)\sqrt{x^2 + 1}}$ et en déduire le sens de variation de $h$.
3. Montrer que $h$ est impaire. Que peut-on en déduire pour sa courbe ?
4. Montrer que $h$ est une bijection de $\mathbb{R}$ sur un intervalle $J$ à déterminer.
5. Calculer $\left(h^{-1}\right)'(0)$.
6. Déterminer $h^{-1}(x)$ pour tout $x \in J$.

:::corrige
1. Pour $x > 0$, $\sqrt{x^2 + 1} = x\sqrt{1 + \frac{1}{x^2}}$, donc $h(x) = \frac{1}{\sqrt{1 + \frac{1}{x^2}}} \to 1$. Pour $x < 0$, $\sqrt{x^2 + 1} = -x\sqrt{1 + \frac{1}{x^2}}$, donc $h(x) = \frac{-1}{\sqrt{1 + \frac{1}{x^2}}} \to -1$.
2. $h'(x) = \frac{\sqrt{x^2 + 1} - x \times \frac{x}{\sqrt{x^2 + 1}}}{x^2 + 1} = \frac{(x^2 + 1) - x^2}{(x^2 + 1)\sqrt{x^2 + 1}} = \frac{1}{(x^2 + 1)\sqrt{x^2 + 1}} > 0$ : $h$ est strictement croissante sur $\mathbb{R}$.
3. $h(-x) = \frac{-x}{\sqrt{x^2 + 1}} = -h(x)$ : $h$ est impaire, sa courbe est symétrique par rapport à l’origine.
4. $h$ est continue et strictement croissante sur $\mathbb{R}$, donc une bijection de $\mathbb{R}$ sur $J = ]-1 ; 1[$.
5. $h(0) = 0$ et $h'(0) = 1 \neq 0$, donc $\left(h^{-1}\right)'(0) = \frac{1}{h'(0)} = 1$.
6. Pour $y \in ]-1 ; 1[$ : $\frac{x}{\sqrt{x^2 + 1}} = y$ impose que $x$ ait le signe de $y$, et en élevant au carré $x^2 = y^2(x^2 + 1)$, soit $x^2(1 - y^2) = y^2$, donc $x^2 = \frac{y^2}{1 - y^2}$. Avec le signe, $x = \frac{y}{\sqrt{1 - y^2}}$. Donc $h^{-1}(x) = \dfrac{x}{\sqrt{1 - x^2}}$ sur $]-1 ; 1[$.
:::
:::
