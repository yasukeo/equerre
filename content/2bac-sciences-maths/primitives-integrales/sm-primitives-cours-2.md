---
title: Fonctions primitives — partie 2 : opérations et méthodes
kind: cours
summary: Primitives d’une somme et d’un produit par un réel, formes u′uⁿ, u′/u², u′/√u et u′·v′∘u, linéarisation des puissances de sinus et cosinus, fonctions rationnelles et méthodes.
position: 20
visibility: public
---
## Opérations

:::propriete
Si $F$ et $G$ sont des primitives de $f$ et $g$ sur $I$, et $k$ un réel, alors $F + G$ est une primitive de $f + g$ et $kF$ une primitive de $kf$.
:::

:::attention
Il n’y a pas de règle pour le produit ni pour le quotient : on cherche à reconnaître une dérivée connue.
:::

:::propriete
Si $u$ est dérivable sur $I$ :

- $u' u^n$ ($n \in \mathbb{N}$) a pour primitives $\frac{u^{n + 1}}{n + 1} + c$ ;
- $\frac{u'}{u^2}$ a pour primitives $-\frac{1}{u} + c$, là où $u$ ne s’annule pas ;
- $u' u^r$ ($r$ rationnel, $r \neq -1$) a pour primitives $\frac{u^{r + 1}}{r + 1} + c$, là où $u > 0$ ;
- $\frac{u'}{\sqrt{u}}$ a pour primitives $2\sqrt{u} + c$, là où $u > 0$ ;
- $u' \times v' \circ u$ a pour primitives $v \circ u + c$.
:::

:::exemple
- $f(x) = x(x^2 + 1)^3$ : avec $u(x) = x^2 + 1$, $f = \frac{1}{2} u' u^3$, donc $F(x) = \frac{1}{8}(x^2 + 1)^4$.
- $g(x) = \frac{2x}{\sqrt{x^2 + 3}}$ : c’est $\frac{u'}{\sqrt{u}}$ avec $u(x) = x^2 + 3 > 0$, donc $G(x) = 2\sqrt{x^2 + 3}$.
- $h(x) = \sin x \cos^2 x$ : avec $u = \cos$, $h = -u' u^2$, donc $H(x) = -\frac{1}{3}\cos^3 x$.
:::

## Méthode

Pour trouver une primitive :

1. on écrit la fonction comme une somme de termes simples ;
2. pour chaque terme, on reconnaît une forme du tableau, quitte à multiplier et diviser par une constante ;
3. on vérifie en dérivant le résultat.

## Linéarisation

Pour trouver une primitive de $\cos^2 x$ ou de $\sin^2 x$, on transforme le carré en somme grâce aux formules de duplication :

:::propriete
$$
\cos^2 x = \frac{1 + \cos 2x}{2} \qquad \sin^2 x = \frac{1 - \cos 2x}{2}
$$
:::

:::exemple
- Une primitive de $\cos^2 x$ est $\frac{x}{2} + \frac{\sin 2x}{4}$.
- Une primitive de $\sin^2 x$ est $\frac{x}{2} - \frac{\sin 2x}{4}$.
- $\sin x \cos x = \frac{1}{2}\sin 2x$ a pour primitive $-\frac{1}{4}\cos 2x$ ; c’est aussi $u'u$ avec $u = \sin$, d’où la primitive $\frac{1}{2}\sin^2 x$ (les deux diffèrent d’une constante).
:::

## Fonctions rationnelles

Pour une fraction rationnelle, on cherche à l’écrire comme une somme de termes de la forme $ax + b$ et $\frac{a}{(x + b)^2}$, dont on connaît des primitives.

:::exemple
$f(x) = \frac{x^2 + 2x + 2}{(x + 1)^2}$ sur $]-1 ; +\infty[$ : comme $x^2 + 2x + 2 = (x + 1)^2 + 1$, on a $f(x) = 1 + \frac{1}{(x + 1)^2}$, donc $F(x) = x - \frac{1}{x + 1}$.
:::

:::exemple
Trouver $a$ et $b$ tels que $\frac{2x + 3}{(x + 1)^2} = \frac{a}{x + 1} + \frac{b}{(x + 1)^2}$ : on obtient $2x + 3 = a(x + 1) + b$, donc $a = 2$ et $b = 1$. Le terme $\frac{2}{x + 1}$ demande la fonction logarithme, vue au chapitre suivant ; $\frac{1}{(x + 1)^2}$ a pour primitive $-\frac{1}{x + 1}$.
:::

## Primitive avec une condition

:::exemple
Déterminer la primitive $F$ de $f(x) = \frac{x}{\sqrt{x^2 + 9}}$ sur $\mathbb{R}$ telle que $F(4) = 1$. On a $f = \frac{1}{2} \times \frac{u'}{\sqrt{u}}$ avec $u(x) = x^2 + 9 > 0$, donc $F(x) = \sqrt{x^2 + 9} + c$. $F(4) = 5 + c = 1$ donne $c = -4$, donc $F(x) = \sqrt{x^2 + 9} - 4$.
:::
