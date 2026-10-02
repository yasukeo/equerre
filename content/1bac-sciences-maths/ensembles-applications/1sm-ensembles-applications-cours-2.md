---
title: Ensembles et applications — partie 2 : les applications
kind: cours
summary: Application, image et antécédent, égalité, restriction, composition, injection, surjection, bijection et application réciproque, image directe et image réciproque d’une partie.
position: 20
visibility: public
---

## Applications

:::definition
Une **application** $f$ d’un ensemble $E$ dans un ensemble $F$ associe à **chaque** élément $x$ de $E$ **un unique** élément $f(x)$ de $F$, son **image**. Si $y = f(x)$, $x$ est **un antécédent** de $y$.
:::

:::exemple
$f : \mathbb{R} \to \mathbb{R}$, $x \mapsto x^2$ est une application ; $4$ a deux antécédents, $2$ et $-2$ ; $-1$ n’en a aucun.
:::

:::definition
- La **composée** de $f : E \to F$ et $g : F \to G$ est $g \circ f : E \to G$, $x \mapsto g(f(x))$.
- La **restriction** de $f$ à une partie $A$ de $E$ est l’application $A \to F$, $x \mapsto f(x)$.
:::

## Injections, surjections, bijections

:::definition
Soit $f : E \to F$.

- $f$ est **injective** si deux éléments distincts ont des images distinctes : $f(x) = f(x') \Rightarrow x = x'$. Tout élément de $F$ a **au plus** un antécédent.
- $f$ est **surjective** si tout élément de $F$ a **au moins** un antécédent : $(\forall y \in F)(\exists x \in E) \; y = f(x)$.
- $f$ est **bijective** si elle est injective et surjective : tout élément de $F$ a **exactement** un antécédent.
:::

:::exemple
- $x \mapsto x^2$ de $\mathbb{R}$ dans $\mathbb{R}$ n’est ni injective ($f(-1) = f(1)$) ni surjective ($-1$ n’a pas d’antécédent).
- De $[0 ; +\infty[$ dans $[0 ; +\infty[$, elle est bijective.
- $x \mapsto 2x + 3$ de $\mathbb{R}$ dans $\mathbb{R}$ est bijective : $y = 2x + 3 \iff x = \frac{y - 3}{2}$.
:::

:::definition
Si $f : E \to F$ est bijective, son **application réciproque** $f^{-1} : F \to E$ associe à chaque $y$ son unique antécédent : $y = f(x) \iff x = f^{-1}(y)$. Alors $f^{-1} \circ f = \mathrm{Id}_E$ et $f \circ f^{-1} = \mathrm{Id}_F$.
:::

:::propriete
La composée de deux injections est une injection, de deux surjections une surjection, de deux bijections une bijection, et $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$.
:::

## Image directe et image réciproque

:::definition
Soit $f : E \to F$, $A \subset E$ et $B \subset F$.

- **Image directe** : $f(A) = \{f(x) : x \in A\}$.
- **Image réciproque** : $f^{-1}(B) = \{x \in E : f(x) \in B\}$ (cette notation a un sens même si $f$ n’est pas bijective).
:::

:::exemple
$f(x) = x^2$ : $f([-1 ; 2]) = [0 ; 4]$ et $f^{-1}([1 ; 4]) = [-2 ; -1] \cup [1 ; 2]$.
:::

:::attention
Pour montrer qu’une application est surjective, on part d’un $y$ quelconque de l’ensemble d’arrivée et on **construit** un antécédent ; pour montrer qu’elle n’est pas injective, un seul couple $x \neq x'$ avec $f(x) = f(x')$ suffit.
:::
