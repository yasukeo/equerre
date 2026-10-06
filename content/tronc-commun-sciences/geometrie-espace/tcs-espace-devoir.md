---
title: Devoir surveillé : géométrie dans l’espace
kind: devoir
summary: Un devoir d’une heure sur 20 points : positions relatives dans un cube, intersection de plans dans un tétraèdre, orthogonalité et volumes, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. $ABCDEFGH$ est un cube : $ABCD$ en bas, $EFGH$ en haut, $E$ au-dessus de $A$, $F$ de $B$, $G$ de $C$, $H$ de $D$.

:::exercice Exercice 1 (6 points) : positions relatives
Préciser, en justifiant, la position relative de (2 pts chacune) :

1. les droites $(AF)$ et $(DG)$ ;
2. les droites $(AC)$ et $(BF)$ ;
3. la droite $(FG)$ et le plan $(ABC)$.

:::corrige
1. Parallèles : $ADGF$ est un rectangle ($\overrightarrow{AD} = \overrightarrow{FG}$), dont $(AF)$ et $(DG)$ sont deux côtés opposés.
2. Non coplanaires : elles ne se coupent pas ($(BF)$ ne rencontre le plan $(ABC)$ qu’en $B$, qui n’est pas sur $(AC)$) et ne sont pas parallèles.
3. Parallèles : $(FG) \parallel (BC)$, droite du plan $(ABC)$, et $F$ n’est pas dans ce plan.
:::
:::

:::exercice Exercice 2 (7 points) : dans un tétraèdre
Soit $SABC$ un tétraèdre, $I$ le milieu de $[SB]$ et $J$ le milieu de $[SC]$.

1. Montrer que $(IJ)$ est parallèle au plan $(ABC)$. (3 pts)
2. Déterminer l’intersection des plans $(AIJ)$ et $(ABC)$. (4 pts)

:::corrige
1. Dans le triangle $SBC$, $(IJ) \parallel (BC)$, et $(BC)$ est dans le plan $(ABC)$.
2. Les plans ont $A$ en commun et contiennent les droites parallèles $(IJ)$ et $(BC)$ : leur intersection est la parallèle à $(BC)$ passant par $A$.
:::
:::

:::exercice Exercice 3 (7 points) : orthogonalité et volumes
1. Montrer que $(BF)$ est orthogonale au plan $(ABC)$, et en déduire que $(BF) \perp (BD)$. (3 pts)
2. Le cube a une arête de $3$ cm. Calculer $FD$. (2 pts)
3. Un cône a un rayon de $3$ cm et une hauteur de $4$ cm. Calculer son volume et la longueur de sa génératrice. (2 pts)

:::corrige
1. $(BF) \perp (BA)$ et $(BF) \perp (BC)$, deux droites sécantes du plan $(ABC)$. Comme $(BD)$ est dans ce plan, $(BF) \perp (BD)$.
2. Le triangle $FBD$ est rectangle en $B$ : $FD^2 = 9 + 18 = 27$, donc $FD = 3\sqrt{3}$ cm.
3. $V = \frac{1}{3}\pi \times 9 \times 4 = 12\pi \approx 37{,}7$ cm³ ; génératrice $\sqrt{9 + 16} = 5$ cm.
:::
:::
