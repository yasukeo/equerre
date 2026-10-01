---
title: Limites et continuité : l’essentiel
kind: resume
summary: Les définitions, théorèmes et méthodes du chapitre sur une page, pour réviser avant un contrôle.
position: 10
visibility: public
---

## Limites

- Formes indéterminées : $+\infty - \infty$, $0 \times \infty$, $\frac{\infty}{\infty}$, $\frac{0}{0}$.
- En $\pm\infty$, un polynôme se comporte comme son terme de plus haut degré ; une fonction rationnelle comme le quotient des termes de plus haut degré.
- $\lim_{x \to 0} \frac{\sin x}{x} = 1$, $\lim_{x \to 0} \frac{\tan x}{x} = 1$, $\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}$.
- Racines : on lève $+\infty - \infty$ ou $\frac{0}{0}$ avec la quantité conjuguée.

:::theoreme
**Comparaison.** Si $f \leq g$ près de $a$ et $\lim_a f = +\infty$, alors $\lim_a g = +\infty$.

**Gendarmes.** Si $g \leq f \leq h$ près de $a$ et $\lim_a g = \lim_a h = \ell$, alors $\lim_a f = \ell$.
:::

## Continuité

:::definition
$f$ est continue en $a$ si $\lim_{x \to a} f(x) = f(a)$, c’est-à-dire si elle est continue à droite et à gauche en $a$.
:::

- Si $\lim_{x \to a} f(x) = \ell$ (réel) et $f$ n’est pas définie en $a$, on prolonge $f$ par continuité en posant $f(a) = \ell$.
- Polynômes, $\sin$, $\cos$ : continus sur $\mathbb{R}$. Fonctions rationnelles, $\tan$ : continues sur chaque intervalle de leur domaine. $\sqrt{\ }$ : continue sur $[0 ; +\infty[$.
- Sommes, produits, quotients, composées de fonctions continues : continues.
- Si $\lim_a u = b$ et $\lim_b v = \ell$, alors $\lim_a v \circ u = \ell$.

## Théorème des valeurs intermédiaires

:::theoreme
$f$ continue sur $[a ; b]$ : tout réel $k$ entre $f(a)$ et $f(b)$ est atteint, $f(x) = k$ a au moins une solution dans $[a ; b]$.

$f$ continue et **strictement monotone** sur $[a ; b]$ avec $f(a) f(b) < 0$ : $f(x) = 0$ a une **unique** solution dans $]a ; b[$.
:::

:::attention
Pour l’unicité, citez les deux hypothèses : la continuité **et** la stricte monotonie sur l’intervalle.
:::

- Image d’un intervalle par $f$ continue strictement croissante : $f([a ; b]) = [f(a) ; f(b)]$ ; strictement décroissante : $[f(b) ; f(a)]$. Borne ouverte : on prend la limite.
- Dichotomie : on coupe l’intervalle en deux et on garde la moitié où $f$ change de signe.

## Fonction réciproque

:::propriete
$f$ continue et strictement monotone sur $I$ réalise une bijection de $I$ sur $J = f(I)$. Sa réciproque $f^{-1}$ est continue sur $J$, de même sens de variation que $f$, et sa courbe est la symétrique de celle de $f$ par rapport à la droite $y = x$.
:::

## Racine n-ième

- Pour $x \geq 0$, $y \geq 0$ : $\sqrt[n]{x} = y \iff y^n = x$.
- $\sqrt[n]{xy} = \sqrt[n]{x} \sqrt[n]{y}$, $\sqrt[n]{\sqrt[p]{x}} = \sqrt[np]{x}$, $x^{\frac{p}{q}} = \sqrt[q]{x^p}$ pour $x > 0$.
- $\lim_{x \to +\infty} \sqrt[n]{x} = +\infty$ ; si $\lim_a u = \ell \geq 0$, alors $\lim_a \sqrt[n]{u} = \sqrt[n]{\ell}$.
