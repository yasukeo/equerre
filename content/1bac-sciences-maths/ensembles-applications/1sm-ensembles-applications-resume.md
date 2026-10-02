---
title: Ensembles et applications : l’essentiel
kind: resume
summary: Opérations sur les ensembles, lois de Morgan, injections, surjections, bijections, réciproque et images, sur une page.
position: 10
visibility: public
---

## Ensembles

:::propriete
- $A = B \iff A \subset B$ et $B \subset A$.
- $A \setminus B = A \cap \overline{B}$ ; $A \Delta B = (A \setminus B) \cup (B \setminus A)$.
- Morgan : $\overline{A \cap B} = \overline{A} \cup \overline{B}$, $\overline{A \cup B} = \overline{A} \cap \overline{B}$.
- Distributivité de $\cap$ sur $\cup$ et de $\cup$ sur $\cap$.
- $\operatorname{card} E = n \Rightarrow \operatorname{card} \mathcal{P}(E) = 2^n$.
:::

## Applications

:::definition
- Injective : $f(x) = f(x') \Rightarrow x = x'$ (au plus un antécédent).
- Surjective : tout $y$ a au moins un antécédent.
- Bijective : exactement un antécédent ; réciproque $f^{-1}$, avec $y = f(x) \iff x = f^{-1}(y)$.
:::

Composée : $(g \circ f)(x) = g(f(x))$ ; $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$. Images : $f(A) = \{f(x) : x \in A\}$, $f^{-1}(B) = \{x : f(x) \in B\}$.

:::attention
La bijectivité dépend des ensembles de départ et d’arrivée : $x \mapsto x^2$ est bijective de $[0 ; +\infty[$ sur $[0 ; +\infty[$, pas de $\mathbb{R}$ dans $\mathbb{R}$.
:::
