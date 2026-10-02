---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : une équation du second degré avec paramètre, puis un problème de production résolu par régionnement du plan, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : une équation avec paramètre
Pour tout réel $m$, on considère l’équation $(E_m) : x^2 - 2mx + m + 2 = 0$.

1. Montrer que le discriminant réduit de $(E_m)$ vaut $\Delta' = (m - 2)(m + 1)$.
2. Discuter, selon $m$, le nombre de solutions de $(E_m)$.
3. Pour $m > 2$, montrer que les deux solutions sont positives.
4. Déterminer $m$ pour que $3$ soit solution, puis trouver l’autre solution.

:::corrige
1. $\Delta' = m^2 - (m + 2) = m^2 - m - 2 = (m - 2)(m + 1)$.
2. Si $m < -1$ ou $m > 2$ : $\Delta' > 0$, deux solutions. Si $m = -1$ ou $m = 2$ : une solution double, $x = m$. Si $-1 < m < 2$ : aucune solution.
3. La somme vaut $2m > 0$ et le produit $m + 2 > 0$ : les deux solutions sont de même signe, et ce signe est positif.
4. $9 - 6m + m + 2 = 0$, soit $m = \frac{11}{5}$. Le produit des solutions vaut $m + 2 = \frac{21}{5}$, donc l’autre solution est $\frac{21}{5} \div 3 = \frac{7}{5}$. Vérification : $3 + \frac{7}{5} = \frac{22}{5} = 2m$.
:::
:::

:::exercice Problème 2 : maximiser un bénéfice
Une coopérative produit deux jus, $A$ et $B$, en centaines de litres : $x$ pour $A$ et $y$ pour $B$. Une centaine de litres de $A$ demande $2$ caisses d’oranges et $1$ heure de travail ; une centaine de litres de $B$ demande $1$ caisse et $2$ heures. La coopérative dispose de $16$ caisses et de $14$ heures. Le bénéfice est de $300$ dirhams par centaine de litres de $A$ et de $200$ dirhams pour $B$.

1. Écrire le système d’inéquations que vérifient $x$ et $y$.
2. Représenter la région des productions possibles et déterminer ses sommets.
3. Exprimer le bénéfice $b(x ; y)$.
4. On admet que le bénéfice maximal est atteint en un sommet de la région. Quelle production faut-il choisir ?

:::corrige
1. $x \geq 0$, $y \geq 0$, $2x + y \leq 16$ et $x + 2y \leq 14$.
2. Les sommets sont $(0 ; 0)$, $(8 ; 0)$, $(0 ; 7)$ et l’intersection de $2x + y = 16$ et $x + 2y = 14$ : $D = 4 - 1 = 3$, $D_x = 32 - 14 = 18$, $D_y = 28 - 16 = 12$, soit $(6 ; 4)$.
3. $b(x ; y) = 300x + 200y$.
4. $b(0 ; 0) = 0$, $b(8 ; 0) = 2\,400$, $b(6 ; 4) = 1\,800 + 800 = 2\,600$ et $b(0 ; 7) = 1\,400$. Il faut produire $600$ litres de $A$ et $400$ litres de $B$, pour un bénéfice de $2\,600$ dirhams.
:::
:::
