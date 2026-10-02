---
title: Structures algébriques : l’essentiel
kind: resume
summary: Lois, groupes, sous-groupes, morphismes, anneaux et corps sur une page, avec les exemples à connaître.
position: 10
visibility: public
---

## Lois et groupes

:::definition
- Loi interne sur $E$ : $x * y \in E$ pour tous $x$, $y \in E$ ; partie stable $F$ : $x * y \in F$ pour $x$, $y \in F$.
- **Groupe** : loi associative, élément neutre, tout élément symétrisable ; commutatif si la loi l’est.
- **Sous-groupe** $H$ de $G$ : $H \neq \varnothing$ et $x * y' \in H$ pour tous $x$, $y \in H$.
:::

Exemples : $(\mathbb{Z}, +)$, $(\mathbb{R}^*, \times)$, $(\mathbb{C}^*, \times)$, $(\mathbb{U}, \times)$ ; $n\mathbb{Z}$ sous-groupe de $(\mathbb{Z}, +)$.

## Morphismes

$f(x * y) = f(x) \top f(y)$ ; alors $f(e) = e'$, $f(x') = f(x)'$, $f(G)$ est un sous-groupe. **Transport** : une bijection compatible avec les lois transporte la structure de groupe (exemple : $\ln$, de $(]0 ; +\infty[, \times)$ vers $(\mathbb{R}, +)$).

## Anneaux et corps

:::definition
- **Anneau** $(A, +, \times)$ : $(A, +)$ groupe commutatif, $\times$ associative et distributive sur $+$.
- **Corps** : anneau commutatif unitaire où tout élément non nul est inversible.
:::

- $\mathcal{M}_2(\mathbb{R})$ : anneau unitaire non commutatif, avec diviseurs de zéro ; $M$ inversible $\iff ad - bc \neq 0$.
- $\mathbb{Z}/n\mathbb{Z}$ : corps $\iff n$ premier ; $\bar{a}$ inversible $\iff a \wedge n = 1$.

:::attention
Pour montrer qu’un ensemble est un groupe, on vérifie d’abord que la loi est **interne** (stabilité) : c’est l’étape la plus souvent oubliée.
:::
