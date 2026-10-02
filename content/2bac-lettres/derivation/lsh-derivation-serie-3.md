---
title: Série 2 : exercices type examen
kind: serie
summary: Deux études de fonctions comme à l’examen national de Lettres et sciences humaines, d’un polynôme puis d’une fonction rationnelle, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Exercice 1 : un polynôme du troisième degré
Soit $f(x) = -x^3 + 3x^2$ sur $\mathbb{R}$, et $(C)$ sa courbe.

1. Calculer les limites de $f$ en $-\infty$ et en $+\infty$.
2. Calculer $f'(x)$ et vérifier que $f'(x) = 3x(2 - x)$.
3. Dresser le tableau de variations de $f$.
4. Résoudre $f(x) = 0$ et donner les points d’intersection de $(C)$ avec l’axe des abscisses.
5. Donner l’équation de la tangente à $(C)$ au point d’abscisse $1$.

:::corrige
1. $f$ a la limite de $-x^3$ : $+\infty$ en $-\infty$ et $-\infty$ en $+\infty$.
2. $f'(x) = -3x^2 + 6x = 3x(2 - x)$.
3. $f'$ est négative sur $]-\infty ; 0[$, positive sur $]0 ; 2[$, négative sur $]2 ; +\infty[$ : $f$ décroît jusqu’au minimum $f(0) = 0$, croît jusqu’au maximum $f(2) = 4$, puis décroît.
4. $f(x) = x^2(3 - x) = 0 \iff x = 0$ ou $x = 3$ : les points $(0 ; 0)$ et $(3 ; 0)$.
5. $f(1) = 2$ et $f'(1) = 3$ : $y = 3(x - 1) + 2$, soit $y = 3x - 1$.
:::
:::

:::exercice Exercice 2 : une fonction rationnelle
Soit $f(x) = \dfrac{x - 1}{x + 2}$ sur $]-2 ; +\infty[$.

1. Calculer $\lim_{x \to -2^+} f(x)$ et $\lim_{x \to +\infty} f(x)$, et en déduire les asymptotes.
2. Calculer $f'(x)$ et étudier le sens de variation de $f$.
3. Dresser le tableau de variations.
4. Déterminer le point où la courbe coupe l’axe des abscisses, et la tangente en ce point.

:::corrige
1. En $-2^+$ : le numérateur tend vers $-3$ et le dénominateur vers $0^+$, donc $f(x) \to -\infty$ (asymptote $x = -2$). En $+\infty$ : $f(x) \to 1$ (asymptote $y = 1$).
2. $f'(x) = \frac{(x + 2) - (x - 1)}{(x + 2)^2} = \frac{3}{(x + 2)^2} > 0$ : $f$ est strictement croissante.
3. $f$ croît de $-\infty$ à $1$ sur $]-2 ; +\infty[$.
4. $f(x) = 0 \iff x = 1$ ; $f'(1) = \frac{3}{9} = \frac{1}{3}$ : tangente $y = \frac{1}{3}(x - 1)$.
:::
:::
