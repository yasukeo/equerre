---
title: Série 1 — partie 2 : études complètes
kind: serie
summary: Trois études de fonctions guidées : une fonction polynôme, une fonction avec racine et un coût moyen, avec les corrigés.
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

:::exercice Un coût moyen
Une entreprise produit $x$ centaines d’articles ($x > 0$) pour un coût total $C(x) = x^2 + 2x + 36$ (en milliers de dirhams). Le coût moyen est $M(x) = \dfrac{C(x)}{x}$.

1. Écrire $M(x)$ sous la forme $x + 2 + \dfrac{36}{x}$ et calculer les limites de $M$ en $0^+$ et en $+\infty$.
2. Montrer que la droite $y = x + 2$ est asymptote oblique et donner la position de la courbe.
3. Étudier les variations de $M$.
4. Pour quelle production le coût moyen est-il minimal ? Quel est ce coût ?

:::corrige
1. $M(x) = \frac{x^2 + 2x + 36}{x} = x + 2 + \frac{36}{x}$. En $0^+$, $\frac{36}{x} \to +\infty$ : $M \to +\infty$ (asymptote verticale $x = 0$) ; en $+\infty$, $M \to +\infty$.
2. $M(x) - (x + 2) = \frac{36}{x} \to 0$ ; ce reste est positif : la courbe est au-dessus de l’asymptote.
3. $M'(x) = 1 - \frac{36}{x^2} = \frac{(x - 6)(x + 6)}{x^2}$ : $M$ décroît sur $]0 ; 6]$ et croît sur $[6 ; +\infty[$.
4. Le minimum est $M(6) = 6 + 2 + 6 = 14$ : pour $600$ articles, le coût moyen minimal est de $14$ milliers de dirhams par centaine d’articles, soit $140$ dirhams par article.
:::
:::
