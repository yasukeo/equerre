---
title: Représentation graphique — partie 2 : études complètes
kind: cours
summary: Plan d’étude d’une fonction, puis trois études complètes rédigées : une fonction rationnelle avec asymptote oblique, une fonction avec racine, une fonction polynôme de degré 3 avec un point d’inflexion.
position: 20
visibility: public
---

## Plan d’étude

1. Ensemble de définition ; parité ou symétrie pour réduire l’étude.
2. Limites aux bornes et branches infinies.
3. Dérivée, signe, tableau de variations.
4. Concavité et points d’inflexion si l’énoncé le demande.
5. Points remarquables : intersections avec les axes, tangentes.
6. Tracé : asymptotes et tangentes d’abord, puis la courbe.

## Exemple 1 : une fonction rationnelle

$f(x) = \dfrac{x^2 - 2x + 2}{x - 1}$ sur $\mathbb{R} \setminus \{1\}$.

- **Écriture utile** : $f(x) = x - 1 + \frac{1}{x - 1}$.
- **Limites** : $\lim_{\pm\infty} f = \pm\infty$ ; $\lim_{1^+} f = +\infty$ et $\lim_{1^-} f = -\infty$ : asymptote verticale $x = 1$.
- **Asymptote oblique** : $f(x) - (x - 1) = \frac{1}{x - 1} \to 0$ : la droite $y = x - 1$ ; la courbe est au-dessus pour $x > 1$, au-dessous pour $x < 1$.
- **Variations** : $f'(x) = 1 - \frac{1}{(x - 1)^2} = \frac{x(x - 2)}{(x - 1)^2}$ : croissante sur $]-\infty ; 0]$, décroissante sur $[0 ; 1[$ et sur $]1 ; 2]$, croissante sur $[2 ; +\infty[$ ; maximum local $f(0) = -2$, minimum local $f(2) = 2$.
- **Symétrie** : $f(2 - x) + f(x) = 0$ : le point $\Omega(1 ; 0)$ est centre de symétrie.

## Exemple 2 : une fonction avec racine

$g(x) = x - 2\sqrt{x}$ sur $[0 ; +\infty[$.

- **Limite** : $g(x) = \sqrt{x}\left(\sqrt{x} - 2\right) \to +\infty$ ; $\frac{g(x)}{x} = 1 - \frac{2}{\sqrt{x}} \to 1$ et $g(x) - x = -2\sqrt{x} \to -\infty$ : branche parabolique de direction la droite $y = x$.
- **Dérivée** : pour $x > 0$, $g'(x) = 1 - \frac{1}{\sqrt{x}} = \frac{\sqrt{x} - 1}{\sqrt{x}}$ : décroissante sur $[0 ; 1]$, croissante sur $[1 ; +\infty[$, minimum $g(1) = -1$.
- **En $0$** : $\frac{g(x)}{x} = 1 - \frac{2}{\sqrt{x}} \to -\infty$ : demi-tangente verticale en $O$.
- **Intersections** : $g(x) = 0 \iff \sqrt{x}(\sqrt{x} - 2) = 0 \iff x = 0$ ou $x = 4$.

## Exemple 3 : une fonction polynôme de degré 3

$h(x) = x^3 - 3x^2 + 4$ sur $\mathbb{R}$.

- **Limites** : $\lim_{-\infty} h = -\infty$ et $\lim_{+\infty} h = +\infty$ ; $\frac{h(x)}{x} \to +\infty$ : branches paraboliques de direction l’axe des ordonnées.
- **Variations** : $h'(x) = 3x^2 - 6x = 3x(x - 2)$ : $h$ croît sur $]-\infty ; 0]$, décroît sur $[0 ; 2]$, croît sur $[2 ; +\infty[$ ; maximum local $h(0) = 4$, minimum local $h(2) = 0$.
- **Inflexion** : $h''(x) = 6x - 6$ s’annule en $1$ en changeant de signe : $I(1 ; 2)$ est un point d’inflexion ; la courbe est concave avant, convexe après.
- **Symétrie** : $h(2 - x) = -x^3 + 3x^2$, donc $h(2 - x) + h(x) = 4 = 2 \times 2$ : $I(1 ; 2)$ est aussi centre de symétrie.
- **Intersections** : $h(x) = (x - 2)^2(x + 1)$ : la courbe coupe l’axe des abscisses en $-1$ et le touche en $2$, où la tangente est horizontale.

:::attention
Une asymptote ne se « devine » pas sur une figure : on la justifie toujours par une limite.
:::
