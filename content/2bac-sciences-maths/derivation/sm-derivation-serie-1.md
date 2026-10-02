---
title: Série 1 — partie 1 : dérivabilité et calcul des dérivées
kind: serie
summary: Dérivabilité en un point, point anguleux et demi-tangente verticale, calculs de dérivées, tangente, dérivée d’une réciproque et approximation affine, avec les corrigés.
position: 10
visibility: public
---

Sept exercices sur la première partie du cours.

:::exercice Dérivabilité en un point
Soit $f$ définie sur $\mathbb{R}$ par $f(x) = x|x - 1|$.

1. Étudier la dérivabilité de $f$ à droite et à gauche en $1$.
2. $f$ est-elle dérivable en $1$ ? Interpréter géométriquement.

:::corrige
1. Pour $x > 1$, $f(x) = x(x - 1)$, donc $\frac{f(x) - f(1)}{x - 1} = x \to 1$ quand $x \to 1^+$ : $f'_d(1) = 1$. Pour $x < 1$, $f(x) = -x(x - 1)$, donc $\frac{f(x) - f(1)}{x - 1} = -x \to -1$ quand $x \to 1^-$ : $f'_g(1) = -1$.
2. $f'_d(1) \neq f'_g(1)$ : $f$ n’est pas dérivable en $1$. La courbe a au point $A(1 ; 0)$ deux demi-tangentes de coefficients directeurs $1$ et $-1$ : c’est un point anguleux.
:::
:::

:::exercice Calculs de dérivées
Calculer la dérivée de chaque fonction sur l’intervalle indiqué.

1. $f(x) = (2x^2 - 3)^4$ sur $\mathbb{R}$.
2. $g(x) = \dfrac{x^2 + 1}{x - 2}$ sur $]2 ; +\infty[$.
3. $h(x) = \sqrt{x^2 + x + 1}$ sur $\mathbb{R}$.
4. $k(x) = \sin^2(2x)$ sur $\mathbb{R}$.

:::corrige
1. $f'(x) = 4 \times 4x \times (2x^2 - 3)^3 = 16x(2x^2 - 3)^3$.
2. $g'(x) = \dfrac{2x(x - 2) - (x^2 + 1)}{(x - 2)^2} = \dfrac{x^2 - 4x - 1}{(x - 2)^2}$.
3. $x^2 + x + 1 > 0$ pour tout $x$ (discriminant $-3 < 0$), donc $h'(x) = \dfrac{2x + 1}{2\sqrt{x^2 + x + 1}}$.
4. $k'(x) = 2 \times 2\cos(2x) \times \sin(2x) = 4 \sin(2x)\cos(2x) = 2\sin(4x)$.
:::
:::

:::exercice Tangente
Soit $f(x) = \dfrac{2x - 1}{x + 1}$ sur $]-1 ; +\infty[$.

1. Déterminer l’équation de la tangente $(T)$ à la courbe de $f$ au point d’abscisse $0$.
2. Étudier la position de la courbe par rapport à $(T)$.

:::corrige
1. $f'(x) = \dfrac{2(x + 1) - (2x - 1)}{(x + 1)^2} = \dfrac{3}{(x + 1)^2}$, donc $f(0) = -1$ et $f'(0) = 3$ : $(T) : y = 3x - 1$.
2. $f(x) - (3x - 1) = \dfrac{2x - 1 - (3x - 1)(x + 1)}{x + 1} = \dfrac{-3x^2}{x + 1}$. Sur $]-1 ; +\infty[$, $x + 1 > 0$, donc cette différence est négative ou nulle : la courbe est au-dessous de $(T)$, et la touche seulement au point d’abscisse $0$.
:::
:::

:::exercice Demi-tangente verticale
Soit $f(x) = \sqrt{1 - x}$ sur $]-\infty ; 1]$.

1. Étudier la dérivabilité de $f$ à gauche en $1$.
2. Interpréter géométriquement le résultat.
3. Calculer $f'(x)$ pour $x < 1$.

:::corrige
1. Pour $x < 1$ : $\frac{f(x) - f(1)}{x - 1} = \frac{\sqrt{1 - x}}{x - 1} = -\frac{\sqrt{1 - x}}{1 - x} = -\frac{1}{\sqrt{1 - x}}$, qui tend vers $-\infty$ quand $x \to 1^-$. $f$ n’est pas dérivable à gauche en $1$.
2. La courbe admet au point $A(1 ; 0)$ une demi-tangente verticale.
3. Avec $u(x) = 1 - x > 0$ : $f'(x) = \frac{u'(x)}{2\sqrt{u(x)}} = \frac{-1}{2\sqrt{1 - x}}$.
:::
:::

:::exercice Racines n-ièmes et puissances
Calculer la dérivée de chaque fonction sur l’intervalle indiqué.

1. $f(x) = \sqrt[3]{x^2 + 1}$ sur $\mathbb{R}$.
2. $g(x) = x\sqrt[4]{x}$ sur $]0 ; +\infty[$.
3. $h(x) = \left(2x + 1\right)^{\frac{3}{2}}$ sur $\left]-\frac{1}{2} ; +\infty\right[$.

:::corrige
1. $x^2 + 1 > 0$, donc $f'(x) = \dfrac{2x}{3\sqrt[3]{\left(x^2 + 1\right)^2}}$.
2. $g(x) = x^{1 + \frac{1}{4}} = x^{\frac{5}{4}}$, donc $g'(x) = \frac{5}{4}x^{\frac{1}{4}} = \frac{5}{4}\sqrt[4]{x}$.
3. $h'(x) = \frac{3}{2} \times 2 \times (2x + 1)^{\frac{1}{2}} = 3\sqrt{2x + 1}$.
:::
:::

:::exercice Dérivée d’une fonction réciproque
Soit $f(x) = x + \sqrt{x}$ sur $[0 ; +\infty[$.

1. Montrer que $f$ est une bijection de $[0 ; +\infty[$ sur un intervalle $J$ à préciser.
2. Calculer $f(1)$ et $f(4)$, puis $\left(f^{-1}\right)'(2)$ et $\left(f^{-1}\right)'(6)$.
3. $f^{-1}$ est-elle dérivable en $0$ ?

:::corrige
1. $f$ est continue sur $[0 ; +\infty[$ et strictement croissante (somme de deux fonctions strictement croissantes). $f(0) = 0$ et $\lim_{x \to +\infty} f(x) = +\infty$, donc $J = [0 ; +\infty[$.
2. $f(1) = 2$ et $f(4) = 6$. Pour $x > 0$, $f'(x) = 1 + \frac{1}{2\sqrt{x}}$ ; $f'(1) = \frac{3}{2}$ et $f'(4) = \frac{5}{4}$, non nuls. Donc $\left(f^{-1}\right)'(2) = \frac{1}{f'(1)} = \frac{2}{3}$ et $\left(f^{-1}\right)'(6) = \frac{1}{f'(4)} = \frac{4}{5}$.
3. En $0$, $\frac{f(x) - f(0)}{x} = 1 + \frac{1}{\sqrt{x}} \to +\infty$ : la courbe de $f$ a une demi-tangente verticale en $O$. Par symétrie par rapport à la droite $y = x$, celle de $f^{-1}$ a une demi-tangente horizontale en $O$ : $f^{-1}$ est dérivable à droite en $0$ et $\left(f^{-1}\right)'_d(0) = 0$.
:::
:::

:::exercice Approximation affine
1. Donner l’approximation affine de $\sqrt{4 + h}$ pour $h$ proche de $0$, puis une valeur approchée de $\sqrt{4{,}1}$.
2. Même question pour $(1 + h)^3$ et $1{,}002^3$.

:::corrige
1. Avec $f(x) = \sqrt{x}$, $f(4) = 2$ et $f'(4) = \frac{1}{4}$ : $\sqrt{4 + h} \approx 2 + \frac{h}{4}$. Donc $\sqrt{4{,}1} \approx 2 + \frac{0{,}1}{4} = 2{,}025$.
2. Avec $g(x) = x^3$, $g(1) = 1$ et $g'(1) = 3$ : $(1 + h)^3 \approx 1 + 3h$. Donc $1{,}002^3 \approx 1{,}006$.
:::
:::
