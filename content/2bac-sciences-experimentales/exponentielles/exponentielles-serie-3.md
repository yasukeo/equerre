---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux problèmes d’étude de fonction comme à l’examen national : fonction auxiliaire et prolongement par continuité, puis asymptotes obliques et centre de symétrie, avec les corrigés.
position: 30
visibility: enrolled
---

Deux problèmes complets sur l’exponentielle.

:::exercice Problème 1 : fonction auxiliaire et prolongement
**Partie A.** Soit $g(x) = (x - 1)e^x + 1$ sur $\mathbb{R}$.

1. Calculer $g'(x)$ et étudier les variations de $g$.
2. En déduire que $g(x) \geq 0$ pour tout réel $x$.

**Partie B.** Soit $f$ définie sur $\mathbb{R}$ par $f(x) = \dfrac{e^x - 1}{x}$ si $x \neq 0$ et $f(0) = 1$.

1. Montrer que $f$ est continue en $0$.
2. Calculer $\lim_{x \to -\infty} f(x)$ et $\lim_{x \to +\infty} f(x)$ ; interpréter la première.
3. Calculer $\lim_{x \to +\infty} \frac{f(x)}{x}$ et interpréter.
4. Montrer que pour $x \neq 0$, $f'(x) = \dfrac{g(x)}{x^2}$, et en déduire le sens de variation de $f$.
5. Montrer que l’équation $f(x) = 2$ admet une unique solution $\alpha$, et que $1 < \alpha < 2$ (on donne $e \approx 2{,}72$ et $e^2 \approx 7{,}39$).

:::corrige
**Partie A.**

1. $g'(x) = e^x + (x - 1)e^x = xe^x$, du signe de $x$ : $g$ décroît sur $]-\infty ; 0]$ et croît sur $[0 ; +\infty[$.
2. Son minimum est $g(0) = -1 + 1 = 0$, donc $g(x) \geq 0$.

**Partie B.**

1. $\lim_{x \to 0} \frac{e^x - 1}{x} = 1 = f(0)$.
2. En $-\infty$ : $e^x - 1 \to -1$ et $x \to -\infty$, donc $f(x) \to 0$ ; la droite $y = 0$ est asymptote en $-\infty$. En $+\infty$ : $f(x) = \frac{e^x}{x} - \frac{1}{x} \to +\infty$.
3. $\frac{f(x)}{x} = \frac{e^x}{x^2} - \frac{1}{x^2} \to +\infty$ : branche parabolique de direction l’axe des ordonnées.
4. $f'(x) = \frac{xe^x - (e^x - 1)}{x^2} = \frac{g(x)}{x^2}$. D’après la partie A, $g$ ne s’annule qu’en $0$, donc $f'(x) > 0$ pour tout $x \neq 0$ : $f$ est strictement croissante sur $]-\infty ; 0[$ et sur $]0 ; +\infty[$. Comme elle est continue en $0$, elle est strictement croissante sur $\mathbb{R}$.
5. $f$ est continue et strictement croissante sur $\mathbb{R}$, de limites $0$ et $+\infty$ : elle prend la valeur $2$ une seule fois. $f(1) = e - 1 \approx 1{,}72 < 2$ et $f(2) = \frac{e^2 - 1}{2} \approx 3{,}19 > 2$, donc $1 < \alpha < 2$.
:::
:::

:::exercice Problème 2 : deux asymptotes obliques et un centre de symétrie
Soit $f(x) = x - 1 + \dfrac{2}{e^x + 1}$ sur $\mathbb{R}$, et $(C)$ sa courbe.

1. Montrer que la droite $(D_1) : y = x - 1$ est asymptote à $(C)$ en $+\infty$.
2. Vérifier que $f(x) = x + 1 - \dfrac{2e^x}{e^x + 1}$, et en déduire que $(D_2) : y = x + 1$ est asymptote à $(C)$ en $-\infty$.
3. Montrer que $f'(x) = \dfrac{e^{2x} + 1}{\left(e^x + 1\right)^2}$ et en déduire le sens de variation de $f$.
4. Montrer que pour tout réel $x$, $f(-x) = -f(x)$. Que peut-on en déduire pour $(C)$ ?
5. Étudier la position de $(C)$ par rapport à $(D_1)$ et à $(D_2)$.

:::corrige
1. $f(x) - (x - 1) = \frac{2}{e^x + 1} \to 0$ en $+\infty$.
2. $x + 1 - \frac{2e^x}{e^x + 1} = x - 1 + \frac{2(e^x + 1) - 2e^x}{e^x + 1} = x - 1 + \frac{2}{e^x + 1}$. Puis $f(x) - (x + 1) = -\frac{2e^x}{e^x + 1} \to 0$ en $-\infty$.
3. $f'(x) = 1 - \frac{2e^x}{(e^x + 1)^2} = \frac{e^{2x} + 2e^x + 1 - 2e^x}{(e^x + 1)^2} = \frac{e^{2x} + 1}{(e^x + 1)^2} > 0$ : $f$ est strictement croissante sur $\mathbb{R}$.
4. $f(-x) = -x - 1 + \frac{2}{e^{-x} + 1} = -x - 1 + \frac{2e^x}{1 + e^x}$, et d’après la question 2, $-f(x) = -x - 1 + \frac{2e^x}{e^x + 1}$. Donc $f(-x) = -f(x)$ : $f$ est impaire et $O$ est centre de symétrie de $(C)$.
5. $f(x) - (x - 1) = \frac{2}{e^x + 1} > 0$ : $(C)$ est au-dessus de $(D_1)$. $f(x) - (x + 1) = -\frac{2e^x}{e^x + 1} < 0$ : $(C)$ est au-dessous de $(D_2)$.
:::
:::
