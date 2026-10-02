---
title: Arithmétique dans ℕ : l’essentiel
kind: resume
summary: Parité, critères de divisibilité, nombres premiers, décomposition, nombre de diviseurs, PGCD et PPCM, sur une page.
position: 10
visibility: public
---

## Parité et divisibilité

:::propriete
- Pair : $2k$ ; impair : $2k + 1$. $n(n + 1)$ est toujours pair.
- Divisible par $2$, $5$, $10$ : dernier chiffre ; par $4$ : deux derniers chiffres ; par $3$ ou $9$ : somme des chiffres.
- Si $d$ divise $a$ et $b$, il divise $a + b$ et $a - b$.
:::

## Nombres premiers

Premier : exactement deux diviseurs. Test : diviser par les premiers $p$ avec $p^2 \leq n$.

## Décomposition

:::propriete
- Unique décomposition en facteurs premiers. Nombre de diviseurs : $(a_1 + 1)(a_2 + 1) \cdots$.
- PGCD : facteurs communs, plus petits exposants. PPCM : tous les facteurs, plus grands exposants.
- $\operatorname{PGCD} \times \operatorname{PPCM} = a \times b$.
:::

:::attention
« Le plus grand… possible » dans un partage : PGCD. « La prochaine fois ensemble » : PPCM.
:::
