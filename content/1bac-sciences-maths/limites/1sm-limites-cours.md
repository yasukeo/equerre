---
title: Limites — partie 1 : limites usuelles et opérations
kind: cours
summary: Limite finie ou infinie en un point et à l’infini, limites à droite et à gauche, limites des fonctions usuelles, opérations sur les limites et formes indéterminées.
position: 10
visibility: public
---

## Notion de limite

:::definition
- $\lim_{x \to a} f(x) = \ell$ : $f(x)$ devient aussi proche de $\ell$ qu’on le veut quand $x$ est assez proche de $a$.
- $\lim_{x \to +\infty} f(x) = \ell$ : $f(x)$ devient aussi proche de $\ell$ qu’on le veut quand $x$ est assez grand.
- $\lim_{x \to +\infty} f(x) = +\infty$ : $f(x)$ dépasse n’importe quel nombre quand $x$ est assez grand.
:::

:::definition
La **limite à droite** en $a$, notée $\lim_{x \to a^+} f(x)$, ne regarde que les $x > a$ ; la **limite à gauche** $\lim_{x \to a^-} f(x)$, que les $x < a$. $f$ a une limite en $a$ si et seulement si ses limites à droite et à gauche existent et sont égales.
:::

## Limites usuelles

:::propriete
Pour tout entier $n \geq 1$ :

- $\lim_{x \to +\infty} x^n = +\infty$ ; $\lim_{x \to -\infty} x^n = +\infty$ si $n$ est pair, $-\infty$ si $n$ est impair ;
- $\lim_{x \to \pm\infty} \frac{1}{x^n} = 0$ ;
- $\lim_{x \to 0^+} \frac{1}{x} = +\infty$ et $\lim_{x \to 0^-} \frac{1}{x} = -\infty$ ; $\lim_{x \to 0} \frac{1}{x^2} = +\infty$ ;
- $\lim_{x \to +\infty} \sqrt{x} = +\infty$ ;
- pour un polynôme ou une fonction rationnelle définie en $a$ : $\lim_{x \to a} f(x) = f(a)$.
:::

## Opérations

:::propriete
Les limites d’une somme, d’un produit et d’un quotient se calculent à partir de celles des termes, sauf dans quatre cas, les **formes indéterminées** :

$$
+\infty - \infty \qquad 0 \times \infty \qquad \frac{\infty}{\infty} \qquad \frac{0}{0}
$$

Règles utiles : $\ell + \infty = +\infty$ ; $\ell \times \infty = \pm\infty$ si $\ell \neq 0$ (signe par la règle des signes) ; $\frac{\ell}{\pm\infty} = 0$ ; $\frac{\ell}{0^+} = \pm\infty$ si $\ell \neq 0$.
:::

:::exemple
- $\lim_{x \to +\infty} \left(x^2 + \frac{1}{x}\right) = +\infty$.
- $\lim_{x \to 2^+} \frac{3}{x - 2} = +\infty$ et $\lim_{x \to 2^-} \frac{3}{x - 2} = -\infty$.
:::

## Polynômes et fonctions rationnelles à l’infini

:::propriete
En $+\infty$ et en $-\infty$ :

- un polynôme a la même limite que son terme de plus haut degré ;
- une fonction rationnelle a la même limite que le quotient des termes de plus haut degré du numérateur et du dénominateur.
:::

:::exemple
- $\lim_{x \to -\infty} (2x^3 - 5x + 1) = \lim_{x \to -\infty} 2x^3 = -\infty$.
- $\lim_{x \to +\infty} \frac{3x^2 + 1}{x^2 - 4x} = \lim_{x \to +\infty} \frac{3x^2}{x^2} = 3$.
- $\lim_{x \to +\infty} \frac{x + 1}{x^2} = \lim_{x \to +\infty} \frac{1}{x} = 0$.
:::
