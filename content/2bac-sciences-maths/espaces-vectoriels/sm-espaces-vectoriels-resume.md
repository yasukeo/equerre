---
title: Espaces vectoriels : l’essentiel
kind: resume
summary: Espace et sous-espace vectoriel, combinaisons linéaires, familles libres et génératrices, bases et dimension, sur une page.
position: 10
visibility: public
---

## Espaces et sous-espaces

- Espace vectoriel réel : $(E, +)$ groupe commutatif et produit par un réel qui vérifie les quatre règles de distributivité et d’associativité, avec $1\vec{u} = \vec{u}$.
- **Sous-espace** $F$ : $\vec{0} \in F$ et $\alpha\vec{u} + \beta\vec{v} \in F$ pour tous $\vec{u}$, $\vec{v} \in F$, $\alpha$, $\beta$ réels.
- $\operatorname{Vect}(\vec{u}_1, \ldots, \vec{u}_n)$ : ensemble des combinaisons linéaires, c’est un sous-espace.

## Familles

:::definition
- **Génératrice** : tout vecteur est combinaison linéaire de la famille.
- **Libre** : $\sum \alpha_i\vec{u}_i = \vec{0} \Rightarrow$ tous les $\alpha_i$ sont nuls. Deux vecteurs : libres $\iff$ non colinéaires.
- **Base** : libre et génératrice ; coordonnées uniques.
:::

## Dimension

Toutes les bases ont le même nombre $n$ de vecteurs. En dimension $n$, $n$ vecteurs libres (ou générateurs) forment une base. $\dim \mathbb{R}^2 = 2$, $\dim \mathbb{R}^3 = 3$, $\dim \mathbb{C} = 2$, $\dim \mathcal{M}_2(\mathbb{R}) = 4$.

**Déterminant** : dans $\mathbb{R}^2$, base $\iff ad - bc \neq 0$ ; dans $\mathbb{R}^3$, base $\iff (\vec{u} \wedge \vec{v}) \cdot \vec{w} \neq 0$.

:::attention
Un ensemble qui ne contient pas le vecteur nul n’est pas un sous-espace. Pour montrer qu’une famille est libre, on résout le système $\sum \alpha_i\vec{u}_i = \vec{0}$ jusqu’au bout.
:::
