---
title: Série 1 — partie 1 : définitions
kind: serie
summary: Produits scalaires dans un carré par projection, avec le cosinus dans un triangle, angle entre deux vecteurs, orthogonalité des diagonales d’un rectangle, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Dans un carré
Soit $ABCD$ un carré de côté $3$ et de centre $O$. Calculer :

1. $\overrightarrow{AB} \cdot \overrightarrow{AD}$ et $\overrightarrow{AB} \cdot \overrightarrow{AC}$
2. $\overrightarrow{AB} \cdot \overrightarrow{CD}$
3. $\overrightarrow{AO} \cdot \overrightarrow{AB}$
4. $\overrightarrow{DA} \cdot \overrightarrow{DB}$

:::corrige
1. $0$ (vecteurs orthogonaux) ; le projeté de $C$ sur $(AB)$ est $B$ : $9$.
2. $\overrightarrow{CD} = -\overrightarrow{AB}$ : $-9$.
3. Le projeté de $O$ sur $(AB)$ est le milieu de $[AB]$ : $\frac{3}{2} \times 3 = \frac{9}{2}$.
4. Le projeté de $B$ sur $(DA)$ est $A$ : $DA \times DA = 9$.
:::
:::

:::exercice Avec le cosinus
1. Dans un triangle $ABC$, $AB = 4$, $AC = 6$ et $\widehat{BAC} = 120°$. Calculer $\overrightarrow{AB} \cdot \overrightarrow{AC}$.
2. Dans un triangle équilatéral $ABC$ de côté $2$, calculer $\overrightarrow{AB} \cdot \overrightarrow{BC}$.

:::corrige
1. $4 \times 6 \times \cos 120° = 24 \times \left(-\frac{1}{2}\right) = -12$.
2. L’angle entre $\overrightarrow{AB}$ et $\overrightarrow{BC}$ vaut $180° - 60° = 120°$ : $2 \times 2 \times \left(-\frac{1}{2}\right) = -2$.
:::
:::

:::exercice Trouver un angle
On sait que $\|\vec{u}\| = 2$, $\|\vec{v}\| = 3$ et $\vec{u} \cdot \vec{v} = 3\sqrt{3}$. Quel angle forment $\vec{u}$ et $\vec{v}$ ?

:::corrige
$\cos\theta = \frac{3\sqrt{3}}{2 \times 3} = \frac{\sqrt{3}}{2}$, donc $\theta = 30°$, soit $\frac{\pi}{6}$.
:::
:::

:::exercice Les diagonales d’un rectangle
Soit $ABCD$ un rectangle avec $AB = 4$ et $AD = 2$.

1. Exprimer $\overrightarrow{AC}$ et $\overrightarrow{BD}$ en fonction de $\overrightarrow{AB}$ et $\overrightarrow{AD}$.
2. Calculer $\overrightarrow{AC} \cdot \overrightarrow{BD}$. Les diagonales sont-elles perpendiculaires ?
3. Pour quel rectangle le seraient-elles ?

:::corrige
1. $\overrightarrow{AC} = \overrightarrow{AB} + \overrightarrow{AD}$ et $\overrightarrow{BD} = \overrightarrow{AD} - \overrightarrow{AB}$.
2. $\overrightarrow{AC} \cdot \overrightarrow{BD} = AD^2 - AB^2 = 4 - 16 = -12 \neq 0$ (car $\overrightarrow{AB} \cdot \overrightarrow{AD} = 0$) : non.
3. Il faudrait $AD = AB$ : un carré.
:::
:::
