---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets dans un repère de l’espace : un plan et une droite qui le coupe, puis deux plans sécants et leur droite d’intersection, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un plan et une droite
On considère $A(1 ; 1 ; 0)$, $B(0 ; 2 ; 1)$, $C(2 ; 0 ; 2)$ et $E(1 ; 3 ; 2)$.

1. Montrer que $A$, $B$, $C$ ne sont pas alignés.
2. Montrer qu’une équation du plan $(ABC)$ est $x + y - 2 = 0$.
3. Le point $E$ est-il dans le plan $(ABC)$ ?
4. Soit $(D)$ la droite passant par $E$ et de vecteur directeur $\vec{u}(1 ; 1 ; 0)$. Déterminer le point d’intersection $H$ de $(D)$ et $(ABC)$.

:::corrige
1. $\overrightarrow{AB}(-1 ; 1 ; 1)$ et $\overrightarrow{AC}(1 ; -1 ; 2)$ ne sont pas proportionnels ($\frac{1}{-1} = -1$ mais $\frac{2}{1} = 2$).
2. $A$ : $1 + 1 - 2 = 0$ ; $B$ : $0 + 2 - 2 = 0$ ; $C$ : $2 + 0 - 2 = 0$. Les trois points non alignés sont dans ce plan, qui est donc $(ABC)$.
3. $1 + 3 - 2 = 2 \neq 0$ : non.
4. $(D)$ : $x = 1 + t$, $y = 3 + t$, $z = 2$. $(1 + t) + (3 + t) - 2 = 2t + 2 = 0$, $t = -1$ : $H(0 ; 2 ; 2)$.
:::
:::

:::exercice Problème 2 : deux plans sécants
Soit $(P) : x + y + z - 3 = 0$ et $(Q) : x - y + 2z - 2 = 0$.

1. Montrer que $(P)$ et $(Q)$ sont sécants.
2. En posant $z = t$, résoudre le système formé par les deux équations et en déduire une représentation paramétrique de leur droite d’intersection $(\Delta)$.
3. Vérifier que le point $(1 ; 1 ; 1)$ appartient à $(\Delta)$, puis donner un vecteur directeur de $(\Delta)$.

:::corrige
1. $(1 ; 1 ; 1)$ et $(1 ; -1 ; 2)$ ne sont pas proportionnels.
2. Avec $z = t$ : $x + y = 3 - t$ et $x - y = 2 - 2t$. En additionnant : $2x = 5 - 3t$, $x = \frac{5}{2} - \frac{3}{2}t$ ; en soustrayant : $2y = 1 + t$, $y = \frac{1}{2} + \frac{1}{2}t$. $(\Delta)$ : $x = \frac{5}{2} - \frac{3}{2}t$, $y = \frac{1}{2} + \frac{1}{2}t$, $z = t$.
3. Pour $t = 1$ : $(1 ; 1 ; 1)$. Un vecteur directeur est $\left(-\frac{3}{2} ; \frac{1}{2} ; 1\right)$, ou $(-3 ; 1 ; 2)$.
:::
:::
