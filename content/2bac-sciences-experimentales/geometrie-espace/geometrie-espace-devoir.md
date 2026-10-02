---
title: Devoir surveillé : géométrie dans l’espace
kind: devoir
summary: Un devoir d’une heure sur 20 points : plan défini par trois points, sphère et plan tangent, droite et sphère, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. L’espace est muni d’un repère orthonormé direct $(O, \vec{i}, \vec{j}, \vec{k})$.

:::exercice Exercice 1 (7 points) : un plan défini par trois points
On considère $A(1 ; 1 ; 0)$, $B(2 ; 0 ; 1)$ et $C(0 ; 2 ; 2)$.

1. Calculer $\overrightarrow{AB} \wedge \overrightarrow{AC}$ et en déduire que $A$, $B$, $C$ ne sont pas alignés. (3 pts)
2. Donner une équation du plan $(ABC)$. (2 pts)
3. Calculer l’aire du triangle $ABC$ et la distance de $O$ au plan $(ABC)$. (2 pts)

:::corrige
1. $\overrightarrow{AB}(1 ; -1 ; 1)$, $\overrightarrow{AC}(-1 ; 1 ; 2)$ : $\overrightarrow{AB} \wedge \overrightarrow{AC} = (-2 - 1)\vec{i} - (2 + 1)\vec{j} + (1 - 1)\vec{k} = -3\vec{i} - 3\vec{j}$, non nul : les points ne sont pas alignés.
2. Vecteur normal $(1 ; 1 ; 0)$ : $x + y + d = 0$ avec $A$, donc $(ABC) : x + y - 2 = 0$.
3. Aire : $\frac{1}{2}\sqrt{9 + 9} = \frac{3\sqrt{2}}{2}$. Distance : $\frac{|-2|}{\sqrt{2}} = \sqrt{2}$.
:::
:::

:::exercice Exercice 2 (7 points) : sphère et plan
Soit $(S) : x^2 + y^2 + z^2 - 4x + 2y - 4 = 0$ et $(P) : 2x - y + 2z + 4 = 0$.

1. Déterminer le centre $\Omega$ et le rayon $R$ de $(S)$. (2 pts)
2. Montrer que $(P)$ est tangent à $(S)$. (2 pts)
3. Déterminer le point de contact $H$. (3 pts)

:::corrige
1. $(x - 2)^2 + (y + 1)^2 + z^2 = 4 + 1 + 4 = 9$ : $\Omega(2 ; -1 ; 0)$, $R = 3$.
2. $d(\Omega, (P)) = \frac{|4 + 1 + 0 + 4|}{3} = 3 = R$.
3. $H(2 + 2t ; -1 - t ; 2t)$ et $2(2 + 2t) - (-1 - t) + 2(2t) + 4 = 9t + 9 = 0$, donc $t = -1$ et $H(0 ; 0 ; -2)$. On vérifie que $H \in (S)$ : $4 - 4 = 0$.
:::
:::

:::exercice Exercice 3 (6 points) : droite et sphère
On garde la sphère $(S)$ de l’exercice 2. Soit $(D)$ la droite de représentation paramétrique $x = 2 + t$, $y = -1 + 2t$, $z = 2t$ ($t \in \mathbb{R}$).

1. Vérifier que $\Omega \in (D)$. (1 pt)
2. Déterminer les points d’intersection de $(D)$ et de $(S)$. (4 pts)
3. Que représente le segment qui les joint ? (1 pt)

:::corrige
1. Pour $t = 0$, on obtient $(2 ; -1 ; 0) = \Omega$.
2. $(x - 2)^2 + (y + 1)^2 + z^2 = t^2 + 4t^2 + 4t^2 = 9t^2 = 9$, donc $t = 1$ ou $t = -1$ : les points $E(3 ; 1 ; 2)$ et $F(1 ; -3 ; -2)$.
3. La droite passe par le centre : $[EF]$ est un diamètre de $(S)$ ($EF = 6 = 2R$).
:::
:::
