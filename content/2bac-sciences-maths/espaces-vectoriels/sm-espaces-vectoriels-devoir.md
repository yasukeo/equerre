---
title: Devoir surveillé : espaces vectoriels
kind: devoir
summary: Un devoir d’une heure sur 20 points : sous-espaces, famille libre et base de ℝ³, coordonnées, dimension d’un sous-espace de matrices, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure.

:::exercice Exercice 1 (6 points) : sous-espaces
1. $F = \{(x ; y ; z) \in \mathbb{R}^3 : x - 2y + z = 0\}$ est-il un sous-espace de $\mathbb{R}^3$ ? Si oui, en donner une base. (4 pts)
2. $G = \{(x ; y) \in \mathbb{R}^2 : xy = 0\}$ est-il un sous-espace de $\mathbb{R}^2$ ? (2 pts)

:::corrige
1. Oui (équation linéaire sans terme constant). $x = 2y - z$ : $(x ; y ; z) = y(2 ; 1 ; 0) + z(-1 ; 0 ; 1)$, deux vecteurs non colinéaires : base, et $\dim F = 2$.
2. Non : $(1 ; 0)$ et $(0 ; 1)$ sont dans $G$, mais leur somme $(1 ; 1)$ n’y est pas.
:::
:::

:::exercice Exercice 2 (8 points) : une base de ℝ³
Soit $\vec{u} = (1 ; 2 ; 0)$, $\vec{v} = (0 ; 1 ; 2)$ et $\vec{w} = (1 ; 0 ; 1)$.

1. Montrer que $(\vec{u}, \vec{v}, \vec{w})$ est libre. (3 pts)
2. En déduire que c’est une base de $\mathbb{R}^3$. (1 pt)
3. Déterminer les coordonnées de $\vec{x} = (2 ; 3 ; 3)$ dans cette base. (4 pts)

:::corrige
1. $\alpha\vec{u} + \beta\vec{v} + \gamma\vec{w} = \vec{0}$ : $\alpha + \gamma = 0$, $2\alpha + \beta = 0$, $2\beta + \gamma = 0$. Donc $\gamma = -\alpha$, $\beta = -2\alpha$, puis $-4\alpha - \alpha = 0$, soit $\alpha = 0$ et tout est nul.
2. Famille libre de $3$ vecteurs dans un espace de dimension $3$.
3. $\alpha + \gamma = 2$, $2\alpha + \beta = 3$, $2\beta + \gamma = 3$. Avec $\gamma = 2 - \alpha$ et $\beta = 3 - 2\alpha$ : $6 - 4\alpha + 2 - \alpha = 3$, donc $\alpha = 1$, $\beta = 1$, $\gamma = 1$. Les coordonnées sont $(1 ; 1 ; 1)$ ; on vérifie $\vec{u} + \vec{v} + \vec{w} = (2 ; 3 ; 3)$.
:::
:::

:::exercice Exercice 3 (6 points) : matrices
Soit $T$ l’ensemble des matrices $\begin{pmatrix} a & b \\ 0 & c \end{pmatrix}$, $a$, $b$, $c$ réels.

1. Montrer que $T$ est un sous-espace de $\mathcal{M}_2(\mathbb{R})$. (2 pts)
2. En donner une base et la dimension. (2 pts)
3. Montrer que $T$ est stable pour le produit des matrices. (2 pts)

:::corrige
1. Il contient la matrice nulle, et toute combinaison linéaire de matrices de $T$ a un coefficient nul en bas à gauche.
2. $aE_{11} + bE_{12} + cE_{22}$ avec les matrices élémentaires ; ces trois matrices sont libres : base, $\dim T = 3$.
3. $\begin{pmatrix} a & b \\ 0 & c \end{pmatrix}\begin{pmatrix} a' & b' \\ 0 & c' \end{pmatrix} = \begin{pmatrix} aa' & ab' + bc' \\ 0 & cc' \end{pmatrix} \in T$.
:::
:::
