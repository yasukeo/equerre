---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux problèmes comme à l’examen national : une équation du second ordre dont la solution est ensuite étudiée et intégrée, puis une équation du premier ordre avec une solution particulière, avec les corrigés.
position: 30
visibility: enrolled
---

À l’examen, l’équation différentielle est souvent la première partie d’un problème : on trouve une fonction, puis on l’étudie.

:::exercice Problème 1 : de l’équation à l’étude de la fonction
**Partie A.** On considère l’équation $(E) : y'' + 2y' + y = 0$.

1. Résoudre $(E)$.
2. Déterminer la solution $f$ de $(E)$ telle que $f(0) = 1$ et $f'(0) = 0$.

**Partie B.** Soit $f(x) = (x + 1)e^{-x}$ sur $\mathbb{R}$, et $(C)$ sa courbe.

1. Calculer les limites de $f$ en $-\infty$ et en $+\infty$.
2. Calculer $f'(x)$ et dresser le tableau de variations de $f$.
3. Calculer, à l’aide d’une intégration par parties, $\displaystyle \int_{-1}^{0} f(x)\,dx$, et interpréter le résultat comme une aire.

:::corrige
**Partie A.**

1. $r^2 + 2r + 1 = (r + 1)^2$, racine double $-1$ : $y(x) = (\alpha x + \beta)e^{-x}$.
2. $f(0) = \beta = 1$ ; $f'(x) = \alpha e^{-x} - (\alpha x + \beta)e^{-x}$, donc $f'(0) = \alpha - \beta = 0$ et $\alpha = 1$ : $f(x) = (x + 1)e^{-x}$.

**Partie B.**

1. En $-\infty$ : $x + 1 \to -\infty$ et $e^{-x} \to +\infty$, donc $f(x) \to -\infty$. En $+\infty$ : $f(x) = \frac{x}{e^x} + e^{-x} \to 0$ ; asymptote $y = 0$.
2. $f'(x) = e^{-x} - (x + 1)e^{-x} = -xe^{-x}$ : $f$ croît sur $]-\infty ; 0]$, décroît sur $[0 ; +\infty[$, de maximum $f(0) = 1$.
3. Avec $u = x + 1$, $v' = e^{-x}$, $v = -e^{-x}$ : $\int_{-1}^0 f(x)\,dx = \big[-(x + 1)e^{-x}\big]_{-1}^0 + \int_{-1}^0 e^{-x}\,dx = -1 + \big[-e^{-x}\big]_{-1}^0 = -1 + (e - 1) = e - 2$. Sur $[-1 ; 0]$, $f \geq 0$ : c’est l’aire, en unités d’aire, du domaine limité par $(C)$, l’axe des abscisses et les droites $x = -1$ et $x = 0$.
:::
:::

:::exercice Problème 2 : premier ordre avec second membre
On considère l’équation $(E) : y' + y = 2e^{-x}$.

1. Vérifier que $u(x) = 2xe^{-x}$ est une solution de $(E)$.
2. Montrer que $y$ est solution de $(E)$ si et seulement si $y - u$ est solution de $(E_0) : y' + y = 0$.
3. Résoudre $(E_0)$, puis $(E)$.
4. Déterminer la solution $g$ de $(E)$ telle que $g(0) = 1$, et étudier ses variations.

:::corrige
1. $u'(x) = 2e^{-x} - 2xe^{-x}$, donc $u' + u = 2e^{-x}$.
2. $(y - u)' + (y - u) = (y' + y) - (u' + u) = (y' + y) - 2e^{-x}$, nul si et seulement si $y$ est solution de $(E)$.
3. $(E_0) : y' = -y$ a pour solutions $Ce^{-x}$. Les solutions de $(E)$ sont donc $y(x) = Ce^{-x} + 2xe^{-x} = (2x + C)e^{-x}$.
4. $g(0) = C = 1$ : $g(x) = (2x + 1)e^{-x}$. $g'(x) = 2e^{-x} - (2x + 1)e^{-x} = (1 - 2x)e^{-x}$ : $g$ croît sur $\left]-\infty ; \frac{1}{2}\right]$ et décroît ensuite, de maximum $g\left(\frac{1}{2}\right) = 2e^{-\frac{1}{2}} = \frac{2}{\sqrt{e}}$.
:::
:::
