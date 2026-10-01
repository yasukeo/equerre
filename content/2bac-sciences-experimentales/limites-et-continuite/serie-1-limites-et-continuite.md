---
title: Série 1 : limites et continuité
kind: serie
summary: Limites usuelles, formes indéterminées, prolongement par continuité et théorème des valeurs intermédiaires, avec les corrigés.
position: 10
visibility: enrolled
---

Quatre exercices dans l’ordre du chapitre : limites usuelles, formes indéterminées, prolongement par continuité, puis théorème des valeurs intermédiaires.

:::exercice Limites de fonctions rationnelles
Calculer les limites suivantes.

1. $\displaystyle \lim_{x \to +\infty} \frac{3x^2 - x + 1}{x^2 + 2}$
2. $\displaystyle \lim_{x \to 2} \frac{x^2 - 4}{x - 2}$
3. $\displaystyle \lim_{x \to 1^+} \frac{x + 1}{x - 1}$

:::corrige
1. On factorise par $x^2$ : $\frac{3x^2 - x + 1}{x^2 + 2} = \frac{3 - \frac{1}{x} + \frac{1}{x^2}}{1 + \frac{2}{x^2}}$, qui tend vers $3$ en $+\infty$.
2. Pour $x \neq 2$, $\frac{x^2 - 4}{x - 2} = \frac{(x - 2)(x + 2)}{x - 2} = x + 2$, donc la limite vaut $4$.
3. Quand $x \to 1^+$, $x + 1 \to 2$ et $x - 1 \to 0^+$ : la limite vaut $+\infty$.
:::
:::

:::exercice Forme indéterminée avec une racine
Calculer $\displaystyle \lim_{x \to +\infty} \left(\sqrt{x^2 + x} - x\right)$.

:::corrige
C’est une forme « $\infty - \infty$ ». On multiplie par la quantité conjuguée : pour $x > 0$,

$$
\sqrt{x^2 + x} - x = \frac{x}{\sqrt{x^2 + x} + x} = \frac{1}{\sqrt{1 + \frac{1}{x}} + 1}
$$

donc la limite vaut $\frac{1}{2}$.
:::
:::

:::exercice Prolongement par continuité
Soit $f$ la fonction définie sur $[-1 ; 0[ \cup ]0 ; +\infty[$ par $f(x) = \dfrac{\sqrt{x + 1} - 1}{x}$.

Montrer que $f$ admet un prolongement par continuité en $0$.

:::corrige
Pour $x \neq 0$, on multiplie par la quantité conjuguée :

$$
f(x) = \frac{(x + 1) - 1}{x\left(\sqrt{x + 1} + 1\right)} = \frac{1}{\sqrt{x + 1} + 1}
$$

donc $\lim_{x \to 0} f(x) = \frac{1}{2}$. Cette limite est finie : $f$ se prolonge par continuité en $0$ en posant $f(0) = \frac{1}{2}$.
:::
:::

:::exercice Théorème des valeurs intermédiaires
On considère $g(x) = x^3 + 2x - 1$ sur $\mathbb{R}$.

1. Montrer que l’équation $g(x) = 0$ admet une unique solution $\alpha$ dans $]0 ; 1[$.
2. Donner un encadrement de $\alpha$ d’amplitude $0{,}25$.

:::corrige
1. $g$ est continue sur $[0 ; 1]$ (polynôme) et strictement croissante (somme de fonctions strictement croissantes). De plus $g(0) = -1 < 0$ et $g(1) = 2 > 0$. D’après le théorème des valeurs intermédiaires et la stricte monotonie, l’équation admet une unique solution $\alpha \in ]0 ; 1[$.
2. $g(0{,}5) = 0{,}125 > 0$ et $g(0{,}25) \approx -0{,}48 < 0$, donc $0{,}25 < \alpha < 0{,}5$.
:::
:::
