---
title: Généralités sur les fonctions — partie 2 : paraboles, hyperboles et lectures graphiques
kind: cours
summary: Les fonctions x ↦ ax², trinôme et forme canonique, sommet de la parabole, fonction a/x et fonctions homographiques avec centre et asymptotes, résolutions graphiques et position relative.
position: 20
visibility: public
---

## Les fonctions $x \mapsto ax^2$ et $x \mapsto ax^2 + bx + c$

:::propriete
- La courbe de $x \mapsto ax^2$ ($a \neq 0$) est une **parabole** de sommet $O$, d’axe l’axe des ordonnées, tournée vers le haut si $a > 0$, vers le bas si $a < 0$.
- Tout trinôme s’écrit sous **forme canonique** $f(x) = a(x - \alpha)^2 + \beta$, avec $\alpha = -\frac{b}{2a}$ et $\beta = f(\alpha)$. Sa courbe est l’image de celle de $x \mapsto ax^2$ par la translation de vecteur $\alpha\vec{i} + \beta\vec{j}$ : c’est une parabole de sommet $S(\alpha ; \beta)$ et d’axe la droite $x = \alpha$.
- Si $a > 0$, $f$ décroît sur $]-\infty ; \alpha]$ et croît sur $[\alpha ; +\infty[$ ; si $a < 0$, c’est l’inverse.
:::

:::exemple
$f(x) = 2x^2 - 8x + 5 = 2(x^2 - 4x) + 5 = 2(x - 2)^2 - 8 + 5 = 2(x - 2)^2 - 3$. Sommet $S(2 ; -3)$, $a = 2 > 0$ : minimum $-3$ en $2$.
:::

## Les fonctions $x \mapsto \frac{a}{x}$ et les fonctions homographiques

:::propriete
- La courbe de $x \mapsto \frac{a}{x}$ ($a \neq 0$) est une **hyperbole** de centre $O$, d’asymptotes les deux axes. Si $a > 0$, la fonction est décroissante sur $]-\infty ; 0[$ et sur $]0 ; +\infty[$ ; si $a < 0$, croissante sur chacun.
- Une **fonction homographique** $f(x) = \frac{ax + b}{cx + d}$ ($c \neq 0$, $ad - bc \neq 0$) s’écrit $f(x) = \beta + \frac{k}{x - \alpha}$. Sa courbe est une hyperbole de centre $\Omega(\alpha ; \beta)$ et d’asymptotes les droites $x = \alpha$ et $y = \beta$.
:::

:::exemple
$g(x) = \frac{2x + 1}{x - 1} = \frac{2(x - 1) + 3}{x - 1} = 2 + \frac{3}{x - 1}$. Centre $\Omega(1 ; 2)$, asymptotes $x = 1$ et $y = 2$. Comme $k = 3 > 0$, $g$ est décroissante sur $]-\infty ; 1[$ et sur $]1 ; +\infty[$.
:::

## Résolutions graphiques

:::propriete
- Les solutions de $f(x) = g(x)$ sont les abscisses des points d’intersection des courbes $C_f$ et $C_g$.
- Les solutions de $f(x) > g(x)$ sont les abscisses des points où $C_f$ est au-dessus de $C_g$.
- Par le calcul, on étudie le signe de $f(x) - g(x)$.
:::

:::exemple
$f(x) = x^2 - 2x$ et $g(x) = x - 2$ : $f(x) - g(x) = x^2 - 3x + 2 = (x - 1)(x - 2)$. Les courbes se coupent en $(1 ; -1)$ et $(2 ; 0)$ ; la parabole est au-dessous de la droite sur $]1 ; 2[$ et au-dessus ailleurs.
:::

:::attention
Dans $f(x) = \beta + \frac{k}{x - \alpha}$, c’est le signe de $k$ qui donne le sens de variation, pas celui de $a$.
:::
