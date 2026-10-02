---
title: Dérivation — partie 1 : nombre dérivé et calcul des dérivées
kind: cours
summary: Nombre dérivé et taux de variation, tangente à une courbe, dérivées des fonctions usuelles, dérivée d’une somme, d’un produit, d’un quotient.
position: 10
visibility: public
---

## Nombre dérivé

:::definition
Soit $f$ une fonction définie autour de $a$. Si le **taux de variation** $\frac{f(a + h) - f(a)}{h}$ a une limite finie $\ell$ quand $h$ tend vers $0$, on dit que $f$ est **dérivable** en $a$ et que $\ell$ est le **nombre dérivé** de $f$ en $a$, noté $f'(a)$.
:::

:::exemple
$f(x) = x^2$ en $a = 3$ : $\frac{(3 + h)^2 - 9}{h} = \frac{6h + h^2}{h} = 6 + h$, qui tend vers $6$. Donc $f'(3) = 6$.
:::

## Tangente

:::propriete
Si $f$ est dérivable en $a$, la courbe de $f$ a au point $A(a ; f(a))$ une **tangente** de coefficient directeur $f'(a)$, d’équation :

$$
y = f'(a)(x - a) + f(a)
$$
:::

:::exemple
Pour $f(x) = x^2$ en $a = 3$ : $f(3) = 9$, $f'(3) = 6$, donc la tangente a pour équation $y = 6(x - 3) + 9$, soit $y = 6x - 9$.
:::

## Dérivées usuelles

:::propriete
- $(k)' = 0$ pour une constante $k$ ;
- $(x)' = 1$ ; $(x^2)' = 2x$ ; $(x^n)' = nx^{n - 1}$ ;
- $\left(\frac{1}{x}\right)' = -\frac{1}{x^2}$ pour $x \neq 0$ ;
- $(\sqrt{x})' = \frac{1}{2\sqrt{x}}$ pour $x > 0$.
:::

## Opérations

:::propriete
Si $u$ et $v$ sont dérivables et $k$ est un réel :

- $(u + v)' = u' + v'$ et $(ku)' = ku'$ ;
- $(uv)' = u'v + uv'$ ;
- $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$ là où $v$ ne s’annule pas.
:::

:::exemple
- $f(x) = 3x^4 - 5x^2 + 2x - 7$ : $f'(x) = 12x^3 - 10x + 2$.
- $g(x) = (2x + 1)(x^2 - 3)$ : $g'(x) = 2(x^2 - 3) + (2x + 1) \times 2x = 6x^2 + 2x - 6$.
- $h(x) = \frac{x + 1}{x - 2}$ pour $x \neq 2$ : $h'(x) = \frac{1 \times (x - 2) - (x + 1) \times 1}{(x - 2)^2} = \frac{-3}{(x - 2)^2}$.
:::

:::attention
La dérivée d’un produit n’est pas le produit des dérivées : $(x \times x)' = 2x$, et non $1 \times 1$.
:::
