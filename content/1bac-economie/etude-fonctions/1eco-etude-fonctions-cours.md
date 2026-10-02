---
title: Représentation graphique — partie 1 : branches infinies, concavité, symétries
kind: cours
summary: Asymptotes verticales, horizontales et obliques, branches paraboliques, concavité et points d’inflexion, axes et centres de symétrie.
position: 10
visibility: public
---

## Asymptotes

:::propriete
- Si $\lim_{x \to a} f(x) = \pm\infty$ (à droite ou à gauche), la droite $x = a$ est **asymptote verticale**.
- Si $\lim_{x \to \pm\infty} f(x) = b$, la droite $y = b$ est **asymptote horizontale** en $\pm\infty$.
- Si $\lim_{x \to \pm\infty} \left(f(x) - (ax + b)\right) = 0$, la droite $y = ax + b$ est **asymptote oblique** en $\pm\infty$.
:::

:::exemple
$f(x) = \frac{x^2 + 1}{x}$ : $f(x) = x + \frac{1}{x}$, et $\frac{1}{x} \to 0$ en $\pm\infty$ : la droite $y = x$ est asymptote oblique. Comme $\lim_{0^\pm} f = \pm\infty$, la droite $x = 0$ est asymptote verticale.
:::

## Branches paraboliques

Quand $\lim_{x \to +\infty} f(x) = \pm\infty$, on étudie $\lim_{x \to +\infty} \frac{f(x)}{x}$ :

:::propriete
- si elle vaut $\pm\infty$ : **branche parabolique de direction l’axe des ordonnées** ;
- si elle vaut $0$ : **branche parabolique de direction l’axe des abscisses** ;
- si elle vaut un réel $a \neq 0$, on étudie $\lim_{x \to +\infty} (f(x) - ax)$ : si c’est un réel $b$, la droite $y = ax + b$ est asymptote oblique ; si c’est $\pm\infty$, **branche parabolique de direction la droite $y = ax$**.
:::

:::exemple
- $f(x) = x^2$ : $\frac{f(x)}{x} = x \to +\infty$ : direction l’axe des ordonnées.
- $g(x) = \sqrt{x}$ : $\frac{g(x)}{x} = \frac{1}{\sqrt{x}} \to 0$ : direction l’axe des abscisses.
- $h(x) = x + \sqrt{x}$ : $\frac{h(x)}{x} \to 1$ et $h(x) - x = \sqrt{x} \to +\infty$ : direction la droite $y = x$.
:::

## Position par rapport à une asymptote

On étudie le signe de $f(x) - (ax + b)$ : positif, la courbe est **au-dessus** de l’asymptote ; négatif, **au-dessous**.

## Concavité et points d’inflexion

:::definition
Soit $f$ deux fois dérivable sur $I$.

- Si $f'' \geq 0$ sur $I$, la courbe est **convexe** : au-dessus de ses tangentes.
- Si $f'' \leq 0$ sur $I$, la courbe est **concave** : au-dessous de ses tangentes.
- Si $f''$ s’annule en $a$ en changeant de signe, le point $A(a ; f(a))$ est un **point d’inflexion** : la courbe traverse sa tangente.
:::

:::exemple
$f(x) = x^3 - 3x^2$ : $f''(x) = 6x - 6$ change de signe en $1$ : $I(1 ; -2)$ est un point d’inflexion.
:::

## Symétries

:::propriete
- Axe de symétrie $x = a$ : $f(2a - x) = f(x)$ pour tout $x$ de $D_f$ (avec $2a - x \in D_f$).
- Centre de symétrie $\Omega(a ; b)$ : $f(2a - x) + f(x) = 2b$.
:::

:::exemple
- $f(x) = x^2 - 4x + 1$ : $f(4 - x) = 16 - 8x + x^2 - 16 + 4x + 1 = x^2 - 4x + 1 = f(x)$ : la droite $x = 2$ est axe de symétrie.
- $g(x) = 2 + \frac{1}{x - 1}$ : $g(2 - x) + g(x) = 2 + \frac{1}{1 - x} + 2 + \frac{1}{x - 1} = 4$ : le point $\Omega(1 ; 2)$ est centre de symétrie.
:::
