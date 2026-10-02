---
title: Suites numériques : l’essentiel
kind: resume
summary: Les formules des suites arithmétiques et géométriques et les méthodes du chapitre, sur une page.
position: 10
visibility: public
---

## Généralités

Suite définie par une formule ($u_n = \ldots$) ou par récurrence ($u_0$ et $u_{n + 1} = \ldots$). Sens de variation : signe de $u_{n + 1} - u_n$.

## Arithmétique et géométrique

:::propriete
- **Arithmétique** de raison $r$ : $u_{n + 1} = u_n + r$ ; $u_n = u_0 + nr$ ; somme $=$ nombre de termes $\times \frac{\text{premier} + \text{dernier}}{2}$.
- **Géométrique** de raison $q$ : $u_{n + 1} = qu_n$ ; $u_n = u_0 q^n$ ; somme $=$ premier terme $\times \frac{1 - q^{\text{nombre de termes}}}{1 - q}$.
:::

## Méthodes

- Arithmétique ? Calculer $u_{n + 1} - u_n$ : ce doit être un nombre fixe.
- Géométrique ? Calculer $\frac{u_{n + 1}}{u_n}$ : ce doit être un nombre fixe.
- Pourcentage : $+t\,\%$ revient à multiplier par $1 + \frac{t}{100}$.
- Suite auxiliaire $v_n = u_n - \ell$ : montrer que $v_{n + 1} = qv_n$, écrire $v_n = v_0 q^n$, puis $u_n = v_n + \ell$.

:::attention
Le nombre de termes de $u_0 + \cdots + u_n$ est $n + 1$, pas $n$.
:::
