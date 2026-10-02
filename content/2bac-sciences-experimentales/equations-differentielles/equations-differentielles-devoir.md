---
title: Devoir surveillé : équations différentielles
kind: devoir
summary: Un devoir d’une heure sur 20 points : une équation du premier ordre, deux du second ordre avec conditions initiales et l’étude de la solution, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice non autorisée.

:::exercice Exercice 1 (5 points) : premier ordre
Résoudre l’équation $2y' - y = 3$, puis déterminer la solution $f$ telle que $f(0) = 1$.

:::corrige
$y' = \frac{1}{2}y + \frac{3}{2}$ ($a = \frac{1}{2}$, $b = \frac{3}{2}$, $-\frac{b}{a} = -3$) : $y(x) = Ce^{\frac{x}{2}} - 3$. $f(0) = C - 3 = 1$, donc $f(x) = 4e^{\frac{x}{2}} - 3$.
:::
:::

:::exercice Exercice 2 (7 points) : racines complexes
Résoudre $y'' - 2y' + 5y = 0$, puis déterminer la solution $g$ telle que $g(0) = 0$ et $g'(0) = 2$.

:::corrige
$r^2 - 2r + 5 = 0$ : $\Delta = -16$, racines $1 \pm 2i$. Solutions : $y(x) = e^x\left(\alpha\cos 2x + \beta\sin 2x\right)$. $g(0) = \alpha = 0$ ; $g(x) = \beta e^x\sin 2x$, $g'(x) = \beta e^x(\sin 2x + 2\cos 2x)$, $g'(0) = 2\beta = 2$. Donc $g(x) = e^x\sin 2x$.
:::
:::

:::exercice Exercice 3 (8 points) : racine double et étude
1. Résoudre $y'' - 4y' + 4y = 0$. (2 pts)
2. Déterminer la solution $h$ telle que $h(0) = 1$ et $h'(0) = 0$. (2 pts)
3. Calculer $h'(x)$ et dresser le tableau de variations de $h$, avec ses limites en $-\infty$ et $+\infty$. (4 pts)

:::corrige
1. Racine double $2$ : $y(x) = (\alpha x + \beta)e^{2x}$.
2. $\beta = 1$ et $h'(0) = \alpha + 2\beta = 0$, donc $\alpha = -2$ : $h(x) = (1 - 2x)e^{2x}$.
3. $h'(x) = -2e^{2x} + 2(1 - 2x)e^{2x} = -4xe^{2x}$ : $h$ croît sur $]-\infty ; 0]$ et décroît sur $[0 ; +\infty[$, de maximum $h(0) = 1$. En $-\infty$ : $h(x) = e^{2x} - 2xe^{2x} \to 0$ (car $xe^{2x} \to 0$). En $+\infty$ : $1 - 2x \to -\infty$ et $e^{2x} \to +\infty$, donc $h(x) \to -\infty$.
:::
:::
