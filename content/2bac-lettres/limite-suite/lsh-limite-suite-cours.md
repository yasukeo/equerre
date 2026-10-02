---
title: Limite d’une suite — partie 1 : limites usuelles et opérations
kind: cours
summary: Ce que signifie qu’une suite tend vers un réel ou vers l’infini, limites des suites usuelles, opérations sur les limites, formes indéterminées et méthode pour les lever.
position: 10
visibility: public
---

## Idée de limite

:::definition
- Une suite $(u_n)$ **tend vers un réel $\ell$** (on dit qu’elle **converge** vers $\ell$) si ses termes deviennent aussi proches de $\ell$ qu’on le veut quand $n$ devient grand. On note $\lim u_n = \ell$.
- Elle **tend vers $+\infty$** si ses termes finissent par dépasser n’importe quel nombre, aussi grand soit-il.
- Une suite qui ne converge pas est dite **divergente**.
:::

:::exemple
- $u_n = \frac{1}{n}$ ($n \geq 1$) : $u_{10} = 0{,}1$, $u_{1000} = 0{,}001$… La suite tend vers $0$.
- $u_n = n^2$ : $u_{100} = 10\,000$… La suite tend vers $+\infty$.
- $u_n = (-1)^n$ vaut alternativement $1$ et $-1$ : elle n’a pas de limite.
:::

## Limites usuelles

:::propriete
Pour tout entier $p \geq 1$ :

$$
\lim n^p = +\infty \qquad \lim \sqrt{n} = +\infty \qquad \lim \frac{1}{n^p} = 0 \qquad \lim \frac{1}{\sqrt{n}} = 0
$$
:::

## Opérations sur les limites

Les règles sont naturelles quand les limites sont finies : la limite d’une somme est la somme des limites, celle d’un produit est le produit, celle d’un quotient est le quotient (si le dénominateur ne tend pas vers $0$).

:::propriete
Avec des limites infinies :

- $+\infty + \ell = +\infty$ et $+\infty + (+\infty) = +\infty$ ;
- $\ell \times (+\infty) = +\infty$ si $\ell > 0$, et $-\infty$ si $\ell < 0$ ;
- $\frac{\ell}{\pm\infty} = 0$.
:::

:::exemple
- $\lim\left(3 + \frac{2}{n}\right) = 3$.
- $\lim\left(n^2 + 5n\right) = +\infty$.
- $\lim\left(-2n^3\right) = -\infty$.
:::

## Formes indéterminées

Dans quatre cas, on ne peut pas conclure directement :

$$
+\infty - \infty \qquad 0 \times \infty \qquad \frac{\infty}{\infty} \qquad \frac{0}{0}
$$

### Méthode : factoriser par le terme le plus fort

:::exemple
$u_n = n^2 - 3n$ : forme $+\infty - \infty$. On factorise : $u_n = n^2\left(1 - \frac{3}{n}\right)$, et $1 - \frac{3}{n} \to 1$, donc $\lim u_n = +\infty$.
:::

:::exemple
$v_n = \dfrac{2n + 1}{n + 3}$ : forme $\frac{\infty}{\infty}$. On factorise par $n$ en haut et en bas : $v_n = \dfrac{2 + \frac{1}{n}}{1 + \frac{3}{n}}$, donc $\lim v_n = 2$.
:::

:::propriete
Pour une fraction de deux polynômes en $n$, la limite est celle du quotient des termes de plus haut degré.
:::

:::exemple
$\lim \dfrac{3n^2 - 1}{n^2 + n} = \lim \dfrac{3n^2}{n^2} = 3$ et $\lim \dfrac{n + 4}{n^2 + 1} = \lim \dfrac{n}{n^2} = \lim \dfrac{1}{n} = 0$.
:::
