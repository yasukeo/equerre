---
title: Arithmétique dans ℤ : l’essentiel
kind: resume
summary: Divisibilité, division euclidienne, congruences, nombres premiers, PGCD et PPCM, sur une page.
position: 10
visibility: public
---

## Divisibilité et congruences

$b \mid a \iff a = kb$ ; si $d \mid a$ et $d \mid b$, alors $d \mid au + bv$. Division euclidienne : $a = bq + r$, $0 \leq r < b$. $a \equiv b \ [n] \iff n \mid a - b$ ; on peut additionner, multiplier et élever à une puissance.

## Nombres premiers

Tester les premiers $p$ tels que $p^2 \leq n$. Décomposition unique $n = \prod p_i^{\alpha_i}$ ; nombre de diviseurs $\prod(\alpha_i + 1)$.

## PGCD et PPCM

:::propriete
- Euclide : $a \wedge b = b \wedge r$ ; le PGCD est le dernier reste non nul.
- $a \wedge b$ : facteurs communs, plus petits exposants ; $a \vee b$ : tous les facteurs, plus grands exposants.
- $(a \wedge b)(a \vee b) = ab$ (pour $a, b > 0$).
- Premiers entre eux : $a \wedge b = 1$ ; fraction irréductible.
:::

:::attention
Le reste d’une division euclidienne est toujours positif ou nul, même quand on divise un nombre négatif.
:::
