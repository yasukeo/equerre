---
title: Série 1 — partie 1 : espaces et sous-espaces
kind: serie
summary: Reconnaître un sous-espace vectoriel de ℝ², ℝ³, des matrices ou des fonctions, écrire un vecteur comme combinaison linéaire, décrire un sous-espace par des paramètres, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Sous-espace ou pas ?
Dire si chaque ensemble est un sous-espace vectoriel, en justifiant.

1. $F_1 = \{(x ; y) \in \mathbb{R}^2 : 2x - 3y = 0\}$
2. $F_2 = \{(x ; y) \in \mathbb{R}^2 : x^2 = y\}$
3. $F_3 = \{(x ; y ; z) \in \mathbb{R}^3 : x = y = z\}$
4. $F_4 = \{(x ; y ; z) \in \mathbb{R}^3 : x + y + z = 2\}$

:::corrige
1. Oui : $(0 ; 0) \in F_1$, et si $2x - 3y = 0$ et $2x' - 3y' = 0$, alors $2(\alpha x + \beta x') - 3(\alpha y + \beta y') = 0$.
2. Non : $(1 ; 1) \in F_2$ mais $2(1 ; 1) = (2 ; 2) \notin F_2$, car $4 \neq 2$.
3. Oui : $F_3 = \{a(1 ; 1 ; 1) : a \in \mathbb{R}\} = \operatorname{Vect}\big((1 ; 1 ; 1)\big)$.
4. Non : $(0 ; 0 ; 0) \notin F_4$.
:::
:::

:::exercice Matrices et fonctions
1. Montrer que l’ensemble $S$ des matrices symétriques $\begin{pmatrix} a & b \\ b & c \end{pmatrix}$ est un sous-espace de $\mathcal{M}_2(\mathbb{R})$.
2. Montrer que l’ensemble des fonctions $f$ dérivables sur $\mathbb{R}$ telles que $f' = 2f$ est un sous-espace de l’espace des fonctions de $\mathbb{R}$ dans $\mathbb{R}$.

:::corrige
1. La matrice nulle est symétrique ; et $\alpha\begin{pmatrix} a & b \\ b & c \end{pmatrix} + \beta\begin{pmatrix} a' & b' \\ b' & c' \end{pmatrix} = \begin{pmatrix} \alpha a + \beta a' & \alpha b + \beta b' \\ \alpha b + \beta b' & \alpha c + \beta c' \end{pmatrix}$ est symétrique.
2. La fonction nulle convient. Si $f' = 2f$ et $g' = 2g$, alors $(\alpha f + \beta g)' = \alpha f' + \beta g' = 2(\alpha f + \beta g)$.
:::
:::

:::exercice Combinaisons linéaires
Dans $\mathbb{R}^3$, on pose $\vec{u} = (1 ; 2 ; -1)$ et $\vec{v} = (0 ; 1 ; 1)$.

1. Le vecteur $\vec{a} = (2 ; 7 ; 1)$ est-il combinaison linéaire de $\vec{u}$ et $\vec{v}$ ?
2. Même question pour $\vec{b} = (1 ; 0 ; 0)$.

:::corrige
1. On cherche $\alpha$, $\beta$ avec $\alpha = 2$, $2\alpha + \beta = 7$, $-\alpha + \beta = 1$ : $\alpha = 2$, $\beta = 3$, et la troisième équation donne $-2 + 3 = 1$. Oui : $\vec{a} = 2\vec{u} + 3\vec{v}$.
2. $\alpha = 1$, $2 + \beta = 0$ donne $\beta = -2$, mais alors $-1 - 2 = -3 \neq 0$ : non.
:::
:::

:::exercice Décrire un sous-espace par des paramètres
Soit $F = \{(x ; y ; z) \in \mathbb{R}^3 : x - y + z = 0 \text{ et } x + 2y = 0\}$.

1. Montrer que $F$ est un sous-espace de $\mathbb{R}^3$.
2. Exprimer $x$ et $z$ en fonction de $y$, et en déduire un vecteur $\vec{w}$ tel que $F = \operatorname{Vect}(\vec{w})$.

:::corrige
1. $(0 ; 0 ; 0) \in F$, et les deux équations, linéaires et sans terme constant, sont conservées par les combinaisons linéaires.
2. $x = -2y$, puis $z = y - x = 3y$. Donc $(x ; y ; z) = y(-2 ; 1 ; 3)$ et $F = \operatorname{Vect}\big((-2 ; 1 ; 3)\big)$ : c’est une droite vectorielle.
:::
:::
