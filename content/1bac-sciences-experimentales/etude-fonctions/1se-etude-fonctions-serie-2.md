---
title: Série 1 — partie 2 : études complètes
kind: serie
summary: Trois études de fonctions guidées : une fonction polynôme, une fonction avec racine et une fonction trigonométrique, avec les corrigés.
position: 20
visibility: enrolled
---

Trois exercices sur la deuxième partie du cours.

:::exercice Une fonction polynôme
Soit $f(x) = \dfrac{1}{4}x^4 - 2x^2$.

1. Étudier la parité de $f$ et en déduire l’intervalle d’étude.
2. Calculer $f'(x)$ et dresser le tableau de variations sur $[0 ; +\infty[$.
3. Étudier la concavité et déterminer les points d’inflexion.
4. Résoudre $f(x) = 0$.

:::corrige
1. $f(-x) = f(x)$ : paire, on l’étudie sur $[0 ; +\infty[$ et on complète par symétrie par rapport à l’axe des ordonnées.
2. $f'(x) = x^3 - 4x = x(x - 2)(x + 2)$ : sur $[0 ; +\infty[$, décroissante sur $[0 ; 2]$, croissante ensuite ; $f(0) = 0$, minimum $f(2) = 4 - 8 = -4$ ; $\lim_{+\infty} f = +\infty$.
3. $f''(x) = 3x^2 - 4$ s’annule en $\pm\frac{2}{\sqrt{3}}$ en changeant de signe : points d’inflexion d’abscisses $\pm\frac{2}{\sqrt{3}}$ (concave entre les deux, convexe à l’extérieur).
4. $x^2\left(\frac{1}{4}x^2 - 2\right) = 0 \iff x = 0$ ou $x^2 = 8$ : $x \in \left\{0 ; 2\sqrt{2} ; -2\sqrt{2}\right\}$.
:::
:::

:::exercice Une fonction avec racine
Soit $g(x) = \sqrt{x^2 - 4}$ sur $]-\infty ; -2] \cup [2 ; +\infty[$.

1. Étudier la parité de $g$.
2. Étudier la dérivabilité de $g$ à droite en $2$ et interpréter.
3. Étudier les variations de $g$ sur $[2 ; +\infty[$.
4. Montrer que la droite $y = x$ est asymptote à la courbe en $+\infty$, et préciser la position.

:::corrige
1. Le domaine est symétrique et $g(-x) = g(x)$ : paire.
2. $\frac{\sqrt{x^2 - 4}}{x - 2} = \frac{\sqrt{(x - 2)(x + 2)}}{x - 2} = \sqrt{\frac{x + 2}{x - 2}} \to +\infty$ : demi-tangente verticale au point $(2 ; 0)$.
3. $g'(x) = \frac{x}{\sqrt{x^2 - 4}} > 0$ sur $]2 ; +\infty[$ : croissante.
4. $g(x) - x = \frac{-4}{\sqrt{x^2 - 4} + x} \to 0$ ; ce terme est négatif : la courbe est au-dessous de la droite $y = x$.
:::
:::

:::exercice Une fonction trigonométrique
Soit $h(x) = \sin x + \frac{1}{2}\sin 2x$ sur $\mathbb{R}$.

1. Montrer que $h$ est impaire et $2\pi$-périodique. Sur quel intervalle suffit-il de l’étudier ?
2. Montrer que $h'(x) = (\cos x + 1)(2\cos x - 1)$.
3. Dresser le tableau de variations de $h$ sur $[0 ; \pi]$.

:::corrige
1. $h(-x) = -h(x)$ et $h(x + 2\pi) = h(x)$ : on l’étudie sur $[0 ; \pi]$, puis on complète par symétrie par rapport à $O$ et par translations.
2. $h'(x) = \cos x + \cos 2x = \cos x + 2\cos^2 x - 1 = 2\cos^2 x + \cos x - 1 = (\cos x + 1)(2\cos x - 1)$.
3. Sur $[0 ; \pi]$, $\cos x + 1 \geq 0$ ; $2\cos x - 1 \geq 0 \iff x \leq \frac{\pi}{3}$. $h$ croît sur $\left[0 ; \frac{\pi}{3}\right]$ de $0$ à $h\left(\frac{\pi}{3}\right) = \frac{\sqrt{3}}{2} + \frac{\sqrt{3}}{4} = \frac{3\sqrt{3}}{4}$, puis décroît jusqu’à $h(\pi) = 0$.
:::
:::
