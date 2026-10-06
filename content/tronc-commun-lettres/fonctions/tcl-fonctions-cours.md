---
title: Fonctions numériques — partie 1 : notion de fonction et lectures
kind: cours
summary: Fonction, image et antécédent, ensemble de définition, courbe représentative, lecture graphique, sens de variation, maximum et minimum, lecture d’un tableau de variations.
position: 10
visibility: public
---

## Fonction, image, antécédent

:::definition
Une **fonction** $f$ associe à chaque nombre $x$ d’un ensemble $D_f$ un **unique** nombre $f(x)$, appelé **image** de $x$. Si $f(a) = b$, on dit que $a$ est **un antécédent** de $b$.
:::

:::exemple
$f(x) = 2x^2 - 3$ : l’image de $-1$ est $f(-1) = 2 - 3 = -1$, celle de $2$ est $f(2) = 8 - 3 = 5$. Les antécédents de $5$ vérifient $2x^2 - 3 = 5$, soit $x^2 = 4$ : ce sont $2$ et $-2$.
:::

## Ensemble de définition

:::propriete
- Une fraction n’existe que si son dénominateur n’est pas nul.
- Une racine carrée n’existe que si le nombre sous la racine est positif ou nul.
:::

:::exemple
$f(x) = \frac{1}{x - 2}$ est définie pour $x \neq 2$ ; $g(x) = \sqrt{x + 1}$ est définie pour $x \geq -1$.
:::

## Courbe représentative

:::definition
Dans un repère, la **courbe** de $f$ est l’ensemble des points de coordonnées $(x ; f(x))$. Lire l’image de $a$, c’est lire l’ordonnée du point de la courbe d’abscisse $a$ ; lire les antécédents de $b$, c’est lire les abscisses des points de la courbe d’ordonnée $b$.
:::

## Sens de variation

:::definition
- $f$ est **croissante** sur un intervalle si, quand $x$ augmente, $f(x)$ augmente : pour $a < b$, $f(a) \leq f(b)$.
- $f$ est **décroissante** si, quand $x$ augmente, $f(x)$ diminue : pour $a < b$, $f(a) \geq f(b)$.
:::

:::exemple
$f(x) = -3x + 1$ : si $a < b$, alors $-3a > -3b$, donc $f(a) > f(b)$ : $f$ est décroissante.
:::

## Tableau de variations, maximum et minimum

Un tableau de variations résume le sens de variation. Par exemple : « $f$ est définie sur $[-4 ; 6]$ ; elle croît de $f(-4) = -1$ jusqu’à $f(1) = 3$, puis décroît jusqu’à $f(6) = -2$ ».

:::propriete
- Le **maximum** de $f$ est sa plus grande valeur, le **minimum** sa plus petite.
- Dans l’exemple, le maximum est $3$ (atteint en $1$) et le minimum est $-2$ (atteint en $6$).
- Sur un intervalle où $f$ est croissante, l’ordre est conservé : $f(-2) < f(0)$.
:::

:::attention
Un nombre a une seule image, mais il peut avoir plusieurs antécédents, ou aucun.
:::
