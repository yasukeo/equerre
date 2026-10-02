---
title: Le produit scalaire : l’essentiel
kind: resume
summary: Définitions, propriétés, Al-Kashi, médiane, droites, distances et cercles, sur une page.
position: 10
visibility: public
---

## Définitions

:::propriete
- $\vec{u} \cdot \vec{v} = \|\vec{u}\|\|\vec{v}\|\cos(\vec{u}, \vec{v})$ ; par projection : $\overrightarrow{AB} \cdot \overrightarrow{AC} = \pm AB \times AH$.
- Repère orthonormé : $\vec{u} \cdot \vec{v} = xx' + yy'$, $\|\vec{u}\| = \sqrt{x^2 + y^2}$.
- $\vec{u} \perp \vec{v} \iff \vec{u} \cdot \vec{v} = 0$.
:::

## Théorèmes

- **Al-Kashi** : $a^2 = b^2 + c^2 - 2bc\cos\hat{A}$.
- **Médiane** ($I$ milieu de $[AB]$) : $MA^2 + MB^2 = 2MI^2 + \frac{AB^2}{2}$ ; $\overrightarrow{MA} \cdot \overrightarrow{MB} = MI^2 - \frac{AB^2}{4}$.

## Droites et cercles

:::propriete
- Vecteur normal $\vec{n}(a ; b)$ : droite $ax + by + c = 0$ ; vecteur directeur $(-b ; a)$.
- $d(A, (D)) = \frac{|ax_A + by_A + c|}{\sqrt{a^2 + b^2}}$.
- Cercle : $(x - a)^2 + (y - b)^2 = r^2$ ; de diamètre $[AB]$ : $\overrightarrow{MA} \cdot \overrightarrow{MB} = 0$.
- Droite et cercle : comparer $d(\Omega, (D))$ et $r$ ; tangente en $A$ : vecteur normal $\overrightarrow{\Omega A}$.
:::

:::attention
Pour reconnaître un cercle dans $x^2 + y^2 - 2ax - 2by + c = 0$, on vérifie que $a^2 + b^2 - c > 0$.
:::
