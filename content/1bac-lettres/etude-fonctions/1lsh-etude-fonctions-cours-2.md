---
title: Étude de fonctions — partie 2 : fonctions homographiques et nombre de solutions
kind: cours
summary: Étude complète d’une fonction homographique avec ses deux asymptotes et son centre de symétrie, puis utiliser un tableau de variations pour compter les solutions d’une équation.
position: 20
visibility: public
---

## Les fonctions homographiques

:::definition
Une fonction **homographique** s’écrit $f(x) = \frac{ax + b}{cx + d}$, avec $c \neq 0$ et $ad - bc \neq 0$. Elle est définie pour $x \neq -\frac{d}{c}$.
:::

:::propriete
- La droite $y = \frac{a}{c}$ est asymptote horizontale ; la droite $x = -\frac{d}{c}$ est asymptote verticale.
- $f'(x) = \frac{ad - bc}{(cx + d)^2}$ : $f$ est croissante sur chacun des deux intervalles si $ad - bc > 0$, décroissante si $ad - bc < 0$.
- La courbe, une **hyperbole**, est symétrique par rapport au point d’intersection des deux asymptotes.
:::

## Exemple : une étude complète

$f(x) = \dfrac{2x + 1}{x - 1}$.

- **Domaine** : $D_f = \mathbb{R} \setminus \{1\}$.
- **À l’infini** : comme $\frac{2x}{x} = 2$, $f(x) \to 2$ en $\pm\infty$ : asymptote horizontale $y = 2$.
- **En $1$** : le numérateur tend vers $3$ ; à droite $x - 1 \to 0^+$ et $f(x) \to +\infty$ ; à gauche $x - 1 \to 0^-$ et $f(x) \to -\infty$ : asymptote verticale $x = 1$.
- **Dérivée** : $f'(x) = \frac{2(x - 1) - (2x + 1)}{(x - 1)^2} = \frac{-3}{(x - 1)^2} < 0$.
- **Variations** : $f$ est décroissante sur $]-\infty ; 1[$ et sur $]1 ; +\infty[$.
- **Axes** : $f(x) = 0 \iff 2x + 1 = 0 \iff x = -\frac{1}{2}$ ; et $f(0) = -1$.
- **Tracé** : deux branches d’hyperbole, symétriques par rapport au point $\Omega(1 ; 2)$ où se croisent les asymptotes.

:::attention
On ne dit pas que $f$ est décroissante « sur $\mathbb{R} \setminus \{1\}$ » : par exemple $f(0) = -1 < f(2) = 5$. Elle est décroissante sur chacun des deux intervalles, séparément.
:::

## Compter les solutions d’une équation

:::propriete
Sur un intervalle où $f$ est strictement monotone, l’équation $f(x) = k$ a **au plus une** solution ; elle en a exactement une si $k$ est compris entre les valeurs (ou limites) de $f$ aux bornes de l’intervalle.
:::

:::exemple
Pour $g(x) = -x^3 + 3x^2$ (étudiée dans la partie 1), combien de solutions a l’équation $g(x) = 2$ ?

- Sur $]-\infty ; 0]$, $g$ décroît de $+\infty$ à $0$ : $2$ est atteint une fois.
- Sur $[0 ; 2]$, $g$ croît de $0$ à $4$ : une fois.
- Sur $[2 ; +\infty[$, $g$ décroît de $4$ à $-\infty$ : une fois.

L’équation a donc $3$ solutions. En revanche, $g(x) = 5$ n’a qu’une solution, dans $]-\infty ; 0]$, car sur $[0 ; +\infty[$ les valeurs de $g$ ne dépassent pas $4$.
:::
