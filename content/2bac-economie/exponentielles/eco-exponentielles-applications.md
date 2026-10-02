---
title: Série 3 : exponentielle, logarithme et économie
kind: serie
summary: Croissance à taux constant, temps de doublement, demande exponentielle et recette, coût moyen avec un logarithme, avec les corrigés.
position: 40
visibility: enrolled
---

:::exercice Croissance continue et doublement
Le chiffre d’affaires d’une entreprise, en millions de dirhams, est $f(t) = 2e^{0{,}06t}$, où $t$ est le temps en années.

1. Calculer $f(0)$ et $f(10)$.
2. Montrer que $f'(t) = 0{,}06f(t)$ : quel est le taux de croissance instantané ?
3. Au bout de combien de temps le chiffre d’affaires double-t-il ?

:::corrige
1. $f(0) = 2$ et $f(10) = 2e^{0{,}6} \approx 3{,}64$ millions.
2. $f'(t) = 2 \times 0{,}06e^{0{,}06t} = 0{,}06f(t)$ : il croît de $6\,\%$ par an, en continu.
3. $2e^{0{,}06t} = 4 \iff 0{,}06t = \ln 2 \iff t = \frac{\ln 2}{0{,}06} \approx 11{,}6$ ans.
:::
:::

:::exercice Demande exponentielle
La demande d’un produit au prix $p$ dirhams ($p > 0$) est $D(p) = 500e^{-0{,}1p}$.

1. Étudier les variations de $D$ et calculer $\lim_{p \to +\infty} D(p)$.
2. La recette est $R(p) = pD(p)$. Étudier ses variations et trouver le prix qui la rend maximale.

:::corrige
1. $D'(p) = -50e^{-0{,}1p} < 0$ : la demande baisse quand le prix monte, et tend vers $0$.
2. $R(p) = 500pe^{-0{,}1p}$, $R'(p) = 500e^{-0{,}1p}(1 - 0{,}1p)$ : $R$ croît sur $]0 ; 10]$ et décroît ensuite. Le prix optimal est $10$ dirhams, pour une recette $R(10) = 5\,000e^{-1} \approx 1\,839$ dirhams.
:::
:::

:::exercice Coût moyen avec un logarithme
Le coût total de production de $x$ centaines d’unités ($x \geq 1$) est $C(x) = x^2 - 2\ln x + 3$, en milliers de dirhams.

1. Calculer le coût marginal $C'(x)$ et montrer que $C$ est croissant sur $[1 ; +\infty[$.
2. Le coût moyen est $C_M(x) = \dfrac{C(x)}{x}$. Calculer $C_M'(x)$ et montrer qu’il a le signe de $g(x) = x^2 + 2\ln x - 5$.
3. Montrer que $g$ est croissante sur $[1 ; +\infty[$, que $g(1) < 0$ et $g(2) > 0$, et en déduire que le coût moyen est minimal pour une production $\alpha$ comprise entre $100$ et $200$ unités.

:::corrige
1. $C'(x) = 2x - \frac{2}{x} = \frac{2(x^2 - 1)}{x} \geq 0$ sur $[1 ; +\infty[$.
2. $C_M'(x) = \frac{xC'(x) - C(x)}{x^2} = \frac{2x^2 - 2 - x^2 + 2\ln x - 3}{x^2} = \frac{x^2 + 2\ln x - 5}{x^2}$. Comme $x^2 > 0$, il a le signe de $g(x) = x^2 + 2\ln x - 5$.
3. $g'(x) = 2x + \frac{2}{x} > 0$ ; $g(1) = -4 < 0$ et $g(2) = 2\ln 2 - 1 > 0$. Par les valeurs intermédiaires, $g$ s’annule une seule fois en $\alpha \in ]1 ; 2[$ : $C_M$ décroît sur $[1 ; \alpha]$ et croît ensuite, et son minimum est atteint pour $\alpha$ centaines d’unités, entre $100$ et $200$.
:::
:::
