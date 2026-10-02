---
title: Série 1 — partie 1 : Rolle et accroissements finis
kind: serie
summary: Appliquer Rolle et les accroissements finis, trouver le réel c, compter les solutions d’une équation, démontrer des inégalités, avec les corrigés.
position: 10
visibility: public
---

Cinq exercices sur la première partie du cours.

:::exercice Appliquer le théorème de Rolle
Soit $f(x) = x^3 - 3x$ sur $\left[-\sqrt{3} ; \sqrt{3}\right]$.

1. Vérifier que $f$ satisfait les hypothèses du théorème de Rolle.
2. Déterminer les réels $c$ dont le théorème garantit l’existence.

:::corrige
1. $f$ est un polynôme, donc continue et dérivable sur $\mathbb{R}$. Et $f\left(\pm\sqrt{3}\right) = \pm\left(3\sqrt{3} - 3\sqrt{3}\right) = 0$, donc $f\left(-\sqrt{3}\right) = f\left(\sqrt{3}\right)$.
2. $f'(c) = 3c^2 - 3 = 0 \iff c = 1$ ou $c = -1$, tous deux dans $\left]-\sqrt{3} ; \sqrt{3}\right[$.
:::
:::

:::exercice Trouver le réel des accroissements finis
Pour chaque fonction, vérifier les hypothèses du théorème des accroissements finis sur l’intervalle donné, et trouver un réel $c$ qui convient.

1. $f(x) = \sqrt{x}$ sur $[1 ; 4]$.
2. $g(x) = \ln x$ sur $[1 ; e]$.

:::corrige
1. $f$ est continue sur $[1 ; 4]$ et dérivable sur $]1 ; 4[$. $\frac{f(4) - f(1)}{4 - 1} = \frac{1}{3}$ et $f'(c) = \frac{1}{2\sqrt{c}} = \frac{1}{3}$ donne $c = \frac{9}{4}$.
2. $\frac{g(e) - g(1)}{e - 1} = \frac{1}{e - 1}$ et $g'(c) = \frac{1}{c}$, donc $c = e - 1 \approx 1{,}72 \in ]1 ; e[$.
:::
:::

:::exercice Compter les solutions
1. Montrer que l’équation $x^5 + x - 1 = 0$ a exactement une solution réelle.
2. Soit $P$ un polynôme de degré $3$ qui a trois racines réelles distinctes. Montrer que $P'$ a deux racines réelles distinctes.

:::corrige
1. $f(x) = x^5 + x - 1$ : $f'(x) = 5x^4 + 1 > 0$, donc $f$ est strictement croissante et l’équation a au plus une solution. $f(0) = -1 < 0$ et $f(1) = 1 > 0$ : par les valeurs intermédiaires, elle en a une dans $]0 ; 1[$.
2. Si $a < b < c$ sont les racines de $P$, Rolle sur $[a ; b]$ et sur $[b ; c]$ donne un zéro de $P'$ dans $]a ; b[$ et un autre dans $]b ; c[$ : ils sont distincts.
:::
:::

:::exercice Inégalités
1. Montrer que pour tous réels $a$ et $b$, $|\sin b - \sin a| \leq |b - a|$.
2. Montrer que pour $0 < a < b$ : $\dfrac{b - a}{1 + b^2} \leq \arctan b - \arctan a \leq \dfrac{b - a}{1 + a^2}$.
3. En déduire un encadrement de $\arctan 2 - \frac{\pi}{4}$.

:::corrige
1. $|\sin'| = |\cos| \leq 1$ : l’inégalité des accroissements finis donne le résultat (si $a = b$, il est évident).
2. Sur $[a ; b]$, $\arctan'(t) = \frac{1}{1 + t^2}$ est décroissante pour $t > 0$ : $\frac{1}{1 + b^2} \leq \frac{1}{1 + t^2} \leq \frac{1}{1 + a^2}$. On conclut par l’inégalité des accroissements finis.
3. Avec $a = 1$, $b = 2$ : $\frac{1}{5} \leq \arctan 2 - \frac{\pi}{4} \leq \frac{1}{2}$.
:::
:::

:::exercice Une fonction constante
Montrer que pour tout réel $x$, $\arctan x + \arctan\left(\dfrac{1 - x}{1 + x}\right)$ est constante sur $]-1 ; +\infty[$, et donner sa valeur.

:::corrige
Soit $h(x) = \arctan x + \arctan u(x)$ avec $u(x) = \frac{1 - x}{1 + x}$. $u'(x) = \frac{-(1 + x) - (1 - x)}{(1 + x)^2} = \frac{-2}{(1 + x)^2}$ et $1 + u^2 = \frac{(1 + x)^2 + (1 - x)^2}{(1 + x)^2} = \frac{2(1 + x^2)}{(1 + x)^2}$. Donc $\frac{u'}{1 + u^2} = -\frac{1}{1 + x^2}$ et $h'(x) = 0$ : $h$ est constante sur l’intervalle $]-1 ; +\infty[$, égale à $h(0) = \arctan 1 = \frac{\pi}{4}$.
:::
:::
