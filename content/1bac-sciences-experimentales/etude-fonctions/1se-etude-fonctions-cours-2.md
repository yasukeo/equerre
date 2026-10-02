---
title: Représentation graphique — partie 2 : études complètes
kind: cours
summary: Plan d’étude d’une fonction, puis trois études complètes rédigées : une fonction rationnelle avec asymptote oblique, une fonction avec racine, une fonction trigonométrique périodique.
position: 20
visibility: public
---

## Plan d’étude

1. Ensemble de définition ; parité ou périodicité pour réduire l’étude.
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

## Exemple 3 : une fonction trigonométrique

$h(x) = \cos 2x - 2\cos x$ sur $\mathbb{R}$.

- **Réduction** : $h$ est paire et $2\pi$-périodique : on l’étudie sur $[0 ; \pi]$.
- **Dérivée** : $h'(x) = -2\sin 2x + 2\sin x = 2\sin x(1 - 2\cos x)$. Sur $[0 ; \pi]$, $\sin x \geq 0$, et $1 - 2\cos x \geq 0 \iff x \geq \frac{\pi}{3}$ : $h$ décroît sur $\left[0 ; \frac{\pi}{3}\right]$ et croît sur $\left[\frac{\pi}{3} ; \pi\right]$.
- **Valeurs** : $h(0) = -1$, $h\left(\frac{\pi}{3}\right) = -\frac{1}{2} - 1 = -\frac{3}{2}$ (minimum), $h(\pi) = 1 + 2 = 3$ (maximum).
- **Tracé** : on trace sur $[0 ; \pi]$, on complète par symétrie par rapport à l’axe des ordonnées sur $[-\pi ; 0]$, puis par translations de $2\pi$.

:::attention
Une asymptote ne se « devine » pas sur une figure : on la justifie toujours par une limite.
:::
