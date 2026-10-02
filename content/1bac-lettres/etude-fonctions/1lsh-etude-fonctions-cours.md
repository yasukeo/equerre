---
title: Étude de fonctions — partie 1 : la méthode et les polynômes
kind: cours
summary: Le plan d’étude d’une fonction, puis deux études complètes rédigées : un trinôme du second degré et un polynôme du troisième degré, jusqu’au tracé de la courbe.
position: 10
visibility: public
---

## Le plan d’étude

:::propriete
Pour étudier une fonction $f$ et tracer sa courbe :

1. Déterminer l’ensemble de définition $D_f$.
2. Calculer les limites aux bornes de $D_f$ et repérer les asymptotes.
3. Calculer $f'(x)$ et étudier son signe.
4. En déduire les variations de $f$ et ses extremums.
5. Chercher les points remarquables : intersections avec les axes, tangentes utiles.
6. Tracer : d’abord les asymptotes, les extremums et les tangentes, puis la courbe.
:::

## Exemple 1 : un trinôme

$f(x) = x^2 - 2x - 3$.

- **Domaine** : $D_f = \mathbb{R}$.
- **Limites** : comme $x^2$, $f(x) \to +\infty$ en $+\infty$ et en $-\infty$.
- **Dérivée** : $f'(x) = 2x - 2$, négative pour $x < 1$, positive pour $x > 1$.
- **Variations** : $f$ décroît sur $]-\infty ; 1]$ et croît sur $[1 ; +\infty[$ ; minimum $f(1) = 1 - 2 - 3 = -4$.
- **Axes** : $f(x) = (x - 3)(x + 1)$ s’annule en $-1$ et $3$ : la courbe coupe l’axe des abscisses en $(-1 ; 0)$ et $(3 ; 0)$. Elle coupe l’axe des ordonnées en $(0 ; f(0)) = (0 ; -3)$.
- **Tracé** : une parabole tournée vers le haut, de sommet $(1 ; -4)$, symétrique par rapport à la droite $x = 1$.

## Exemple 2 : un polynôme du troisième degré

$g(x) = -x^3 + 3x^2$.

- **Domaine** : $D_g = \mathbb{R}$.
- **Limites** : comme $-x^3$ : $g(x) \to -\infty$ en $+\infty$ et $g(x) \to +\infty$ en $-\infty$.
- **Dérivée** : $g'(x) = -3x^2 + 6x = -3x(x - 2)$. Ce trinôme a pour racines $0$ et $2$, et son coefficient $-3$ est négatif : il est positif entre $0$ et $2$, négatif ailleurs.
- **Variations** : $g$ décroît sur $]-\infty ; 0]$, croît sur $[0 ; 2]$, décroît sur $[2 ; +\infty[$. Minimum local $g(0) = 0$ ; maximum local $g(2) = -8 + 12 = 4$.
- **Axes** : $g(x) = x^2(3 - x)$ s’annule en $0$ et en $3$.
- **Tangente** en $3$ : $g'(3) = -27 + 18 = -9$, d’équation $y = -9(x - 3)$, soit $y = -9x + 27$.
- **Tracé** : la courbe descend jusqu’à $(0 ; 0)$, où elle touche l’axe des abscisses avec une tangente horizontale, monte jusqu’à $(2 ; 4)$, puis redescend en coupant l’axe en $(3 ; 0)$.

:::attention
Aux extremums, la tangente est horizontale : on la trace, elle guide le dessin de la courbe.
:::
