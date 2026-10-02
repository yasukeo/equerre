---
title: Calcul intégral : l’essentiel
kind: resume
summary: Définition, propriétés, intégration par parties, aires et volumes sur une page, pour réviser avant un contrôle ou l’examen.
position: 110
visibility: public
---

## Définition

$\int_a^b f(x)\,dx = \big[F(x)\big]_a^b = F(b) - F(a)$, où $F$ est une primitive de $f$ continue. $x \mapsto \int_a^x f(t)\,dt$ est la primitive de $f$ qui s’annule en $a$.

## Propriétés

:::propriete
- $\int_b^a f = -\int_a^b f$ ; **Chasles** : $\int_a^c f = \int_a^b f + \int_b^c f$ ; **linéarité**.
- Pour $a \leq b$ : $f \geq 0 \Rightarrow \int_a^b f \geq 0$ ; $f \leq g \Rightarrow \int_a^b f \leq \int_a^b g$ ; $m \leq f \leq M \Rightarrow m(b - a) \leq \int_a^b f \leq M(b - a)$.
- Valeur moyenne : $\mu = \frac{1}{b - a}\int_a^b f$.
- Sur $[-a ; a]$ : $f$ paire, $\int_{-a}^a f = 2\int_0^a f$ ; $f$ impaire, $\int_{-a}^a f = 0$.
:::

## Intégration par parties

:::theoreme
$\int_a^b uv' = \big[uv\big]_a^b - \int_a^b u'v$. On prend pour $u$ ce qui se simplifie en dérivant ($\ln x$, polynôme), pour $v'$ ce dont on connaît une primitive ($e^x$, $\sin$, $\cos$).
:::

## Aires et volumes

:::propriete
- Aire entre $(C_f)$, l’axe des abscisses, $x = a$ et $x = b$ : $\int_a^b |f(x)|\,dx$ (couper là où $f$ change de signe).
- Aire entre deux courbes : $\int_a^b |f(x) - g(x)|\,dx$.
- Volume de révolution autour de l’axe des abscisses : $V = \int_a^b \pi f(x)^2\,dx$.
:::

:::attention
Le résultat est en unités d’aire : avec une unité graphique de $2$ cm sur chaque axe, $1$ u.a. $= 4$ cm². Une aire est toujours positive.
:::
