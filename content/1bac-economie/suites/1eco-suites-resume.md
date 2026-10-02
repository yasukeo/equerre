---
title: Les suites numériques : l’essentiel
kind: resume
summary: Vocabulaire, sens de variation, suites arithmétiques et géométriques, sommes et suites auxiliaires, sur une page.
position: 10
visibility: public
---

## Généralités

Suite explicite ($u_n = f(n)$) ou récurrente ($u_{n + 1} = f(u_n)$). Majorée, minorée, bornée. Variations : signe de $u_{n + 1} - u_n$, ou $\frac{u_{n + 1}}{u_n}$ comparé à $1$ (termes positifs), ou sens de $f$ si $u_n = f(n)$.

## Suites usuelles

:::propriete
- **Arithmétique** : $u_{n + 1} = u_n + r$ ; $u_n = u_p + (n - p)r$ ; $2b = a + c$ ; somme $=$ nombre de termes $\times \frac{\text{premier} + \text{dernier}}{2}$.
- **Géométrique** : $u_{n + 1} = qu_n$ ; $u_n = u_p q^{n - p}$ ; $b^2 = ac$ ; somme $=$ premier $\times \frac{1 - q^{\text{nombre de termes}}}{1 - q}$.
:::

## Suites auxiliaires

$u_{n + 1} = au_n + b$ : $\ell = a\ell + b$, puis $v_n = u_n - \ell$ géométrique de raison $a$.

:::attention
Pour montrer qu’une suite est arithmétique (ou géométrique), on montre que $u_{n + 1} - u_n$ (ou $\frac{u_{n + 1}}{u_n}$) est **constant**, indépendant de $n$.
:::
