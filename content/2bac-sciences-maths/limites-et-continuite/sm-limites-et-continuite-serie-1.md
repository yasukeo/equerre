---
title: Série 1 — partie 1 : limites et continuité
kind: serie
summary: Limites usuelles, formes indéterminées, limites trigonométriques, comparaison, continuité, prolongement, image d’un intervalle et valeurs intermédiaires, avec les corrigés.
position: 10
visibility: enrolled
---

Huit exercices dans l’ordre de la première partie du cours. Cherchez chaque exercice avant d’ouvrir son corrigé.

:::exercice Limites de fonctions rationnelles
Calculer les limites suivantes.

1. $\displaystyle \lim_{x \to +\infty} \frac{3x^2 - x + 1}{x^2 + 2}$
2. $\displaystyle \lim_{x \to 2} \frac{x^2 - 4}{x - 2}$
3. $\displaystyle \lim_{x \to 1^+} \frac{x + 1}{x - 1}$
4. $\displaystyle \lim_{x \to -\infty} \frac{x^3 - 2x}{5x^2 + 1}$

:::corrige
1. On factorise par $x^2$ : $\frac{3x^2 - x + 1}{x^2 + 2} = \frac{3 - \frac{1}{x} + \frac{1}{x^2}}{1 + \frac{2}{x^2}}$, qui tend vers $3$ en $+\infty$.
2. Pour $x \neq 2$, $\frac{x^2 - 4}{x - 2} = \frac{(x - 2)(x + 2)}{x - 2} = x + 2$, donc la limite vaut $4$.
3. Quand $x \to 1^+$, $x + 1 \to 2$ et $x - 1 \to 0^+$ : la limite vaut $+\infty$.
4. En $-\infty$, la fonction a la limite du quotient des termes de plus haut degré : $\frac{x^3}{5x^2} = \frac{x}{5}$, qui tend vers $-\infty$.
:::
:::

:::exercice Forme indéterminée avec une racine
Calculer les limites suivantes.

1. $\displaystyle \lim_{x \to +\infty} \left(\sqrt{x^2 + x} - x\right)$
2. $\displaystyle \lim_{x \to 4} \frac{\sqrt{x} - 2}{x - 4}$
3. $\displaystyle \lim_{x \to +\infty} \left(\sqrt{x + 3} - \sqrt{x}\right)$

:::corrige
1. C’est une forme « $\infty - \infty$ ». On multiplie par la quantité conjuguée : pour $x > 0$,

$$
\sqrt{x^2 + x} - x = \frac{x}{\sqrt{x^2 + x} + x} = \frac{1}{\sqrt{1 + \frac{1}{x}} + 1}
$$

donc la limite vaut $\frac{1}{2}$.

2. Pour $x \geq 0$, $x \neq 4$ : $\frac{\sqrt{x} - 2}{x - 4} = \frac{\sqrt{x} - 2}{(\sqrt{x} - 2)(\sqrt{x} + 2)} = \frac{1}{\sqrt{x} + 2}$, donc la limite vaut $\frac{1}{4}$.
3. $\sqrt{x + 3} - \sqrt{x} = \frac{3}{\sqrt{x + 3} + \sqrt{x}}$ : le dénominateur tend vers $+\infty$, donc la limite vaut $0$.
:::
:::

:::exercice Limites trigonométriques
Calculer les limites suivantes.

1. $\displaystyle \lim_{x \to 0} \frac{\sin 3x}{x}$
2. $\displaystyle \lim_{x \to 0} \frac{\tan 2x}{\sin 5x}$
3. $\displaystyle \lim_{x \to 0} \frac{1 - \cos x}{x \sin x}$

:::corrige
1. $\frac{\sin 3x}{x} = 3 \times \frac{\sin 3x}{3x}$ et $\lim_{x \to 0} \frac{\sin 3x}{3x} = 1$ (on pose $X = 3x$) : la limite vaut $3$.
2. $\frac{\tan 2x}{\sin 5x} = \frac{\tan 2x}{2x} \times \frac{5x}{\sin 5x} \times \frac{2}{5}$, donc la limite vaut $\frac{2}{5}$.
3. $\frac{1 - \cos x}{x \sin x} = \frac{1 - \cos x}{x^2} \times \frac{x}{\sin x}$, donc la limite vaut $\frac{1}{2} \times 1 = \frac{1}{2}$.
:::
:::

:::exercice Limites par comparaison
1. Montrer que pour tout $x > 0$, $\dfrac{x - 2}{x + 1} \leq \dfrac{x + 2\sin x}{x + 1} \leq \dfrac{x + 2}{x + 1}$.
2. En déduire $\displaystyle \lim_{x \to +\infty} \frac{x + 2\sin x}{x + 1}$.
3. Calculer $\displaystyle \lim_{x \to +\infty} \left(x + \cos x\right)$.

:::corrige
1. Pour tout réel $x$, $-1 \leq \sin x \leq 1$, donc $x - 2 \leq x + 2\sin x \leq x + 2$ ; on divise par $x + 1 > 0$.
2. Les deux encadrants tendent vers $1$ en $+\infty$ ; d’après le théorème des gendarmes, la limite vaut $1$.
3. Pour tout $x$, $x + \cos x \geq x - 1$ et $\lim_{x \to +\infty} (x - 1) = +\infty$ : par comparaison, la limite vaut $+\infty$.
:::
:::

:::exercice Continuité d’une fonction définie par morceaux
Soit $a$ un réel et $f$ la fonction définie sur $\mathbb{R}$ par

$$
f(x) = \frac{x^2 - 1}{x - 1} \text{ si } x < 1 \qquad \text{et} \qquad f(x) = ax + 3 \text{ si } x \geq 1
$$

Déterminer $a$ pour que $f$ soit continue en $1$, puis justifier que $f$ est alors continue sur $\mathbb{R}$.

:::corrige
Pour $x < 1$, $f(x) = \frac{(x - 1)(x + 1)}{x - 1} = x + 1$, donc $\lim_{x \to 1^-} f(x) = 2$. À droite, $f(1) = \lim_{x \to 1^+} f(x) = a + 3$. $f$ est continue en $1$ si et seulement si $a + 3 = 2$, soit $a = -1$.

Sur $]-\infty ; 1[$, $f(x) = x + 1$ et sur $]1 ; +\infty[$, $f(x) = -x + 3$ : ce sont des polynômes, continus. Avec la continuité en $1$, $f$ est continue sur $\mathbb{R}$.
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

:::exercice Image d’un intervalle
Soit $f(x) = x^2 - 4x + 1$.

1. Écrire $f(x)$ sous la forme $(x - \alpha)^2 + \beta$ et en déduire les variations de $f$.
2. Déterminer $f([0 ; 1])$, $f([3 ; +\infty[)$ et $f([1 ; 3])$.

:::corrige
1. $f(x) = (x - 2)^2 - 3$ : $f$ est strictement décroissante sur $]-\infty ; 2]$ et strictement croissante sur $[2 ; +\infty[$.
2. On utilise ces variations et la continuité de $f$.

- Sur $[0 ; 1]$, $f$ est continue et strictement décroissante : $f([0 ; 1]) = [f(1) ; f(0)] = [-2 ; 1]$.
- Sur $[3 ; +\infty[$, $f$ est continue et strictement croissante, $f(3) = -2$ et $\lim_{x \to +\infty} f(x) = +\infty$ : $f([3 ; +\infty[) = [-2 ; +\infty[$.
- Sur $[1 ; 3]$, $f$ n’est pas monotone : $f([1 ; 2]) = [-3 ; -2]$ et $f([2 ; 3]) = [-3 ; -2]$, donc $f([1 ; 3]) = [-3 ; -2]$.
:::
:::

:::exercice Théorème des valeurs intermédiaires
On considère $g(x) = x^3 + 2x - 1$ sur $\mathbb{R}$.

1. Montrer que l’équation $g(x) = 0$ admet une unique solution $\alpha$ dans $]0 ; 1[$.
2. Donner un encadrement de $\alpha$ d’amplitude $0{,}25$ par dichotomie.
3. En déduire le signe de $g(x)$ sur $\mathbb{R}$.

:::corrige
1. $g$ est continue sur $[0 ; 1]$ (polynôme) et strictement croissante sur $\mathbb{R}$ (somme de fonctions strictement croissantes). De plus $g(0) = -1 < 0$ et $g(1) = 2 > 0$. D’après le théorème des valeurs intermédiaires et la stricte monotonie, l’équation admet une unique solution $\alpha \in ]0 ; 1[$.
2. $g(0{,}5) = 0{,}125 > 0$, donc $\alpha \in ]0 ; 0{,}5[$ ; $g(0{,}25) \approx -0{,}48 < 0$, donc $0{,}25 < \alpha < 0{,}5$.
3. $g$ est strictement croissante et $g(\alpha) = 0$ : $g(x) < 0$ pour $x < \alpha$ et $g(x) > 0$ pour $x > \alpha$.
:::
:::
