---
title: Série d’applications : intégrales et économie
kind: serie
summary: Retrouver un coût total à partir du coût marginal, valeur moyenne d’un prix ou d’une production, surplus du consommateur, avec les corrigés.
position: 140
visibility: enrolled
---

:::exercice Du coût marginal au coût total
Le coût marginal de production de $q$ tonnes est $C'(q) = 3q^2 - 12q + 20$ (en milliers de dirhams par tonne), et les coûts fixes sont $C(0) = 50$.

1. Déterminer le coût total $C(q)$.
2. Calculer le coût de production des tonnes comprises entre $q = 2$ et $q = 5$, sous forme d’une intégrale.

:::corrige
1. $C$ est la primitive de $C'$ qui vaut $50$ en $0$ : $C(q) = q^3 - 6q^2 + 20q + 50$.
2. $\int_2^5 C'(q)\,dq = C(5) - C(2) = (125 - 150 + 100 + 50) - (8 - 24 + 40 + 50) = 125 - 74 = 51$, soit $51\,000$ dirhams.
:::
:::

:::exercice Valeur moyenne
Le prix d’une matière première, en dirhams, est modélisé par $p(t) = 20 + 6\sqrt{t}$, où $t \in [0 ; 9]$ est le temps en mois.

1. Calculer le prix moyen sur les $9$ premiers mois.
2. Une production journalière, en tonnes, vaut $f(t) = 4te^{-t}$ pour $t \in [0 ; 3]$ (en jours). Calculer la production moyenne sur ces trois jours, à l’aide d’une intégration par parties.

:::corrige
1. $\mu = \frac{1}{9}\int_0^9 \left(20 + 6t^{\frac{1}{2}}\right)dt = \frac{1}{9}\left[20t + 4t^{\frac{3}{2}}\right]_0^9 = \frac{1}{9}(180 + 108) = 32$ dirhams.
2. $\int_0^3 4te^{-t}\,dt = \big[-4te^{-t}\big]_0^3 + 4\int_0^3 e^{-t}\,dt = -12e^{-3} + 4\left(1 - e^{-3}\right) = 4 - 16e^{-3}$. La moyenne vaut $\frac{4 - 16e^{-3}}{3} \approx 1{,}07$ tonne par jour.
:::
:::

:::exercice Surplus du consommateur
La demande d’un produit au prix $p$ est $q = D(p)$ ; on l’écrit aussi sous la forme d’un prix de demande $p = d(q) = 100 - q^2$, pour $0 \leq q \leq 10$. Le marché s’établit à la quantité $q_0 = 6$.

1. Calculer le prix d’équilibre $p_0 = d(q_0)$.
2. Le **surplus du consommateur** est $\int_0^{q_0} d(q)\,dq - p_0 q_0$ : c’est ce que les acheteurs étaient prêts à payer en plus. Le calculer.

:::corrige
1. $p_0 = 100 - 36 = 64$.
2. $\int_0^6 \left(100 - q^2\right)dq = \left[100q - \frac{q^3}{3}\right]_0^6 = 600 - 72 = 528$, et $p_0 q_0 = 384$. Le surplus vaut $528 - 384 = 144$.
:::
:::
