---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : démontrer qu’un quadrilatère est un carré avec les vecteurs et les distances, puis un cercle, un diamètre et un triangle rectangle dans un repère, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un carré
Dans un repère orthonormé, on donne $A(-2 ; 1)$, $B(2 ; 3)$, $C(4 ; -1)$ et $D(0 ; -3)$.

1. Calculer $\overrightarrow{AB}$ et $\overrightarrow{DC}$. Que peut-on en déduire ?
2. Vérifier que les diagonales $[AC]$ et $[BD]$ ont le même milieu.
3. Calculer $AB$ et $BC$. Que peut-on dire de $ABCD$ ?
4. Calculer $AC$ et $BD$, et conclure sur la nature de $ABCD$.

:::corrige
1. $\overrightarrow{AB}(4 ; 2)$ et $\overrightarrow{DC}(4 ; 2)$ : ils sont égaux, $ABCD$ est un parallélogramme.
2. Milieu de $[AC]$ : $(1 ; 0)$ ; milieu de $[BD]$ : $(1 ; 0)$.
3. $AB = \sqrt{16 + 4} = \sqrt{20}$ et $BC = \sqrt{4 + 16} = \sqrt{20}$ : deux côtés consécutifs égaux, c’est un losange.
4. $AC = \sqrt{36 + 4} = \sqrt{40}$ et $BD = \sqrt{4 + 36} = \sqrt{40}$ : un losange aux diagonales égales est un carré.
:::
:::

:::exercice Problème 2 : un cercle et un triangle rectangle
Dans un repère orthonormé, $\mathcal{C}$ est le cercle de centre $\Omega(1 ; 2)$ et de rayon $5$.

1. Vérifier que $A(4 ; 6)$ et $B(-2 ; -2)$ sont sur $\mathcal{C}$.
2. Montrer que $[AB]$ est un diamètre de $\mathcal{C}$.
3. Vérifier que $C(5 ; -1)$ est sur $\mathcal{C}$.
4. Calculer $AC^2$, $BC^2$ et $AB^2$, et en déduire la nature du triangle $ABC$.

:::corrige
1. $\Omega A = \sqrt{9 + 16} = 5$ et $\Omega B = \sqrt{9 + 16} = 5$.
2. Le milieu de $[AB]$ est $\left(\frac{4 - 2}{2} ; \frac{6 - 2}{2}\right) = (1 ; 2) = \Omega$.
3. $\Omega C = \sqrt{16 + 9} = 5$.
4. $AC^2 = 1 + 49 = 50$, $BC^2 = 49 + 1 = 50$ et $AB^2 = 36 + 64 = 100 = AC^2 + BC^2$ : le triangle est rectangle et isocèle en $C$.
:::
:::
