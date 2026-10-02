---
title: Dérivation — partie 1 : nombre dérivé et tangente
kind: cours
summary: Dérivabilité en un point, nombre dérivé, dérivabilité à droite et à gauche, interprétation géométrique, tangente et demi-tangentes, approximation affine.
position: 10
visibility: public
---

## Dérivabilité en un point

:::definition
Soit $f$ définie sur un intervalle ouvert contenant $a$. On dit que $f$ est **dérivable en $a$** si la limite

$$
\lim_{x \to a} \frac{f(x) - f(a)}{x - a} \qquad \left(\text{ou } \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}\right)
$$

existe et est un réel. Ce réel, noté $f'(a)$, est le **nombre dérivé** de $f$ en $a$.
:::

:::exemple
$f(x) = x^2$ en $a = 2$ : $\frac{x^2 - 4}{x - 2} = x + 2 \to 4$, donc $f'(2) = 4$.
:::

:::exemple
$g(x) = \sqrt{x}$ en $a = 0$ : $\frac{\sqrt{x}}{x} = \frac{1}{\sqrt{x}} \to +\infty$ quand $x \to 0^+$ : $g$ n’est pas dérivable en $0$.
:::

## Dérivabilité à droite et à gauche

:::definition
$f$ est **dérivable à droite** en $a$ si $\lim_{x \to a^+} \frac{f(x) - f(a)}{x - a}$ est un réel $f'_d(a)$, et **à gauche** si $\lim_{x \to a^-} \frac{f(x) - f(a)}{x - a}$ est un réel $f'_g(a)$. $f$ est dérivable en $a$ si et seulement si $f'_d(a)$ et $f'_g(a)$ existent et sont égaux.
:::

:::exemple
$f(x) = |x|$ en $0$ : à droite, $\frac{x}{x} = 1$ ; à gauche, $\frac{-x}{x} = -1$. $f'_d(0) = 1 \neq f'_g(0) = -1$ : $f$ n’est pas dérivable en $0$.
:::

## Interprétation géométrique

:::propriete
Si $f$ est dérivable en $a$, sa courbe a au point $A(a ; f(a))$ une **tangente** de coefficient directeur $f'(a)$, d’équation :

$$
y = f'(a)(x - a) + f(a)
$$
:::

:::propriete
- Si $f'_d(a) \neq f'_g(a)$, la courbe a deux **demi-tangentes** de directions différentes : c’est un **point anguleux**.
- Si le taux de variation tend vers $\pm\infty$, la courbe a une tangente (ou demi-tangente) **verticale**.
:::

:::exemple
Tangente à la courbe de $f(x) = x^2$ en $2$ : $y = 4(x - 2) + 4 = 4x - 4$.
:::

## Approximation affine

:::propriete
Si $f$ est dérivable en $a$, pour $h$ proche de $0$ : $f(a + h) \approx f(a) + f'(a)h$.
:::

:::exemple
$\sqrt{1 + h} \approx 1 + \frac{h}{2}$ (car la dérivée de $\sqrt{x}$ en $1$ vaut $\frac{1}{2}$) : $\sqrt{1{,}02} \approx 1{,}01$.
:::
