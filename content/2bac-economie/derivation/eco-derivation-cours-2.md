---
title: Dérivation — partie 2 : étude des fonctions
kind: cours
summary: Dérivée et variations, extremums, concavité et points d’inflexion, branches infinies et asymptotes, éléments de symétrie, plan d’étude et étude complète d’une fonction.
position: 20
visibility: public
---
## Dérivée et variations

:::theoreme
Soit $f$ dérivable sur un intervalle $I$.

- Si $f' > 0$ sur $I$ (sauf peut-être en des points isolés où elle s’annule), $f$ est strictement croissante sur $I$.
- Si $f' < 0$ sur $I$ (sauf en des points isolés), $f$ est strictement décroissante sur $I$.
- Si $f' = 0$ sur $I$, $f$ est constante sur $I$.
:::

### Extremums

:::propriete
Si $f$ est dérivable sur un intervalle ouvert $I$ et admet un extremum en $a \in I$, alors $f'(a) = 0$. Réciproquement, si $f'$ s’annule en $a$ **en changeant de signe**, $f$ admet un extremum local en $a$.
:::

:::exemple
$f(x) = x^3$ : $f'(0) = 0$ mais $f' \geq 0$ ne change pas de signe, et $0$ n’est pas un extremum. La condition de changement de signe est indispensable.
:::

## Concavité et points d’inflexion

:::definition
Soit $f$ deux fois dérivable sur $I$.

- Si $f'' \geq 0$ sur $I$, $(C_f)$ est **convexe** : elle est au-dessus de ses tangentes.
- Si $f'' \leq 0$ sur $I$, $(C_f)$ est **concave** : elle est au-dessous de ses tangentes.
- Si $f''$ s’annule en $a$ en changeant de signe, le point $A(a ; f(a))$ est un **point d’inflexion** : la courbe y traverse sa tangente.
:::

:::exemple
$f(x) = x^3 - 3x$ : $f''(x) = 6x$ change de signe en $0$. La courbe est concave sur $]-\infty ; 0]$, convexe sur $[0 ; +\infty[$, et $O(0 ; 0)$ est un point d’inflexion.
:::

## Branches infinies

:::propriete
- **Asymptote verticale** : si $\lim_{x \to a} f(x) = \pm\infty$, la droite $x = a$ est asymptote à $(C_f)$.
- **Asymptote horizontale** : si $\lim_{x \to \pm\infty} f(x) = b$, la droite $y = b$ est asymptote à $(C_f)$ en $\pm\infty$.
- **Asymptote oblique** : si $\lim_{x \to \pm\infty} \left(f(x) - (ax + b)\right) = 0$, la droite $y = ax + b$ est asymptote à $(C_f)$ en $\pm\infty$.
:::

Quand $\lim_{x \to +\infty} f(x) = \pm\infty$, on étudie $\lim_{x \to +\infty} \frac{f(x)}{x}$ :

- si elle vaut $\pm\infty$, $(C_f)$ a une **branche parabolique de direction l’axe des ordonnées** ;
- si elle vaut $0$, une **branche parabolique de direction l’axe des abscisses** ;
- si elle vaut un réel $a \neq 0$, on étudie $\lim_{x \to +\infty} \left(f(x) - ax\right)$ : si elle vaut un réel $b$, la droite $y = ax + b$ est asymptote oblique ; si elle vaut $\pm\infty$, $(C_f)$ a une **branche parabolique de direction la droite** $y = ax$.

:::exemple
$f(x) = \frac{x^2 + 1}{x}$ : $f(x) - x = \frac{1}{x} \to 0$ en $\pm\infty$, donc la droite $y = x$ est asymptote oblique. Comme $f(x) - x$ a le signe de $x$, la courbe est au-dessus de l’asymptote sur $]0 ; +\infty[$ et au-dessous sur $]-\infty ; 0[$.
:::

## Éléments de symétrie

:::propriete
On suppose que pour tout $x \in D_f$, $2a - x \in D_f$. Alors :

- la droite $x = a$ est **axe de symétrie** de $(C_f)$ si, pour tout $x \in D_f$, $f(2a - x) = f(x)$ ;
- le point $\Omega(a ; b)$ est **centre de symétrie** de $(C_f)$ si, pour tout $x \in D_f$, $f(2a - x) + f(x) = 2b$.
:::

## Plan d’étude d’une fonction

1. Domaine de définition, et parité ou périodicité s’il y en a, pour réduire le domaine d’étude.
2. Limites aux bornes du domaine et branches infinies.
3. Continuité et dérivabilité ; calcul de $f'$.
4. Signe de $f'$ et tableau de variations, avec les extremums.
5. Concavité et points d’inflexion si l’énoncé le demande.
6. Points particuliers : intersections avec les axes, tangentes utiles.
7. Tracé de la courbe, en commençant par les asymptotes et les tangentes.

## Exemple d’étude complète

Étudions $f(x) = \dfrac{x^2 - x + 4}{x - 1}$ sur $D_f = \mathbb{R} \setminus \{1\}$.

**Limites.** En $\pm\infty$, $f$ a la limite de $\frac{x^2}{x} = x$ : $\lim_{-\infty} f = -\infty$ et $\lim_{+\infty} f = +\infty$. En $1$, le numérateur tend vers $4$ : $\lim_{x \to 1^-} f(x) = -\infty$ et $\lim_{x \to 1^+} f(x) = +\infty$. La droite $x = 1$ est asymptote verticale.

**Asymptote oblique.** La division donne $f(x) = x + \dfrac{4}{x - 1}$, donc $f(x) - x = \dfrac{4}{x - 1} \to 0$ en $\pm\infty$ : la droite $(\Delta) : y = x$ est asymptote oblique. La courbe est au-dessus de $(\Delta)$ sur $]1 ; +\infty[$ et au-dessous sur $]-\infty ; 1[$.

**Variations.** $f'(x) = 1 - \dfrac{4}{(x - 1)^2} = \dfrac{(x - 1)^2 - 4}{(x - 1)^2} = \dfrac{(x + 1)(x - 3)}{(x - 1)^2}$.

Le signe de $f'(x)$ est celui de $(x + 1)(x - 3)$ :

- sur $]-\infty ; -1]$, $f' \geq 0$ : $f$ croît de $-\infty$ à $f(-1) = -3$ ;
- sur $[-1 ; 1[$, $f' \leq 0$ : $f$ décroît de $-3$ à $-\infty$ ;
- sur $]1 ; 3]$, $f' \leq 0$ : $f$ décroît de $+\infty$ à $f(3) = 5$ ;
- sur $[3 ; +\infty[$, $f' \geq 0$ : $f$ croît de $5$ à $+\infty$.

$f$ admet un maximum local $f(-1) = -3$ et un minimum local $f(3) = 5$.

**Symétrie.** Pour $x \neq 1$, $f(2 - x) + f(x) = (2 - x) + \frac{4}{1 - x} + x + \frac{4}{x - 1} = 2$ : le point $\Omega(1 ; 1)$, intersection des deux asymptotes, est centre de symétrie de la courbe.

## Applications en économie

Soit $C(q)$ le coût total de production d’une quantité $q$ et $R(q)$ la recette.

:::definition
- Le **coût marginal** est $C_m(q) = C'(q)$ : c’est, à peu près, le coût de production d’une unité supplémentaire.
- Le **coût moyen** est $C_M(q) = \frac{C(q)}{q}$ : le coût d’une unité, en moyenne.
- Le **bénéfice** est $B(q) = R(q) - C(q)$.
:::

:::propriete
- Le coût moyen est minimal là où il est égal au coût marginal : $C_M'(q) = \frac{qC'(q) - C(q)}{q^2}$ s’annule quand $C'(q) = \frac{C(q)}{q}$.
- Le bénéfice est maximal là où $B'(q) = 0$ en changeant de signe, c’est-à-dire là où la recette marginale égale le coût marginal.
:::

:::exemple
$C(q) = q^2 + 16$ ($q > 0$) : $C_M(q) = q + \frac{16}{q}$ et $C_M'(q) = 1 - \frac{16}{q^2}$, nul pour $q = 4$. Le coût moyen minimal est $C_M(4) = 8$, égal au coût marginal $C'(4) = 2 \times 4 = 8$.
:::
