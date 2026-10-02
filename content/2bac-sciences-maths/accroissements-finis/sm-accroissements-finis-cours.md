---
title: Accroissements finis — partie 1 : Rolle et accroissements finis
kind: cours
summary: Théorème de Rolle, théorème des accroissements finis et leur interprétation géométrique, conséquences sur le sens de variation, inégalité des accroissements finis.
position: 10
visibility: public
---

## Théorème de Rolle

:::theoreme
Soit $f$ une fonction **continue** sur $[a ; b]$ ($a < b$) et **dérivable** sur $]a ; b[$, telle que $f(a) = f(b)$. Alors il existe au moins un réel $c \in ]a ; b[$ tel que $f'(c) = 0$.
:::

Géométriquement : si les extrémités de la courbe sont à la même hauteur, la courbe a au moins une tangente horizontale entre elles.

:::exemple
$f(x) = x^2 - 4x$ sur $[0 ; 4]$ : $f$ est continue et dérivable, $f(0) = f(4) = 0$. Il existe $c \in ]0 ; 4[$ tel que $f'(c) = 0$ : ici $2c - 4 = 0$, soit $c = 2$.
:::

:::attention
Les trois hypothèses sont nécessaires. $f(x) = |x|$ sur $[-1 ; 1]$ vérifie $f(-1) = f(1)$ et est continue, mais elle n’est pas dérivable en $0$ et $f'$ ne s’annule jamais.
:::

:::exemple
**Application : nombre de solutions.** Si $f$ est dérivable sur un intervalle et si $f'$ ne s’annule pas, alors $f(x) = 0$ a au plus une solution : sinon, entre deux solutions, Rolle donnerait un zéro de $f'$.
:::

## Théorème des accroissements finis

:::theoreme
Soit $f$ continue sur $[a ; b]$ et dérivable sur $]a ; b[$. Alors il existe au moins un réel $c \in ]a ; b[$ tel que :

$$
f(b) - f(a) = f'(c)(b - a)
$$
:::

Géométriquement : il existe un point de la courbe, d’abscisse entre $a$ et $b$, où la tangente est parallèle à la corde qui joint $A(a ; f(a))$ et $B(b ; f(b))$.

:::exemple
$f(x) = x^3$ sur $[0 ; 3]$ : $\frac{f(3) - f(0)}{3} = 9$, et $f'(c) = 3c^2 = 9$ donne $c = \sqrt{3} \in ]0 ; 3[$.
:::

:::exemple
**Démonstration à partir de Rolle.** On pose $g(x) = f(x) - \frac{f(b) - f(a)}{b - a}(x - a)$. Alors $g(a) = g(b) = f(a)$, et $g$ vérifie les hypothèses de Rolle : il existe $c$ tel que $g'(c) = f'(c) - \frac{f(b) - f(a)}{b - a} = 0$.
:::

## Conséquences sur le sens de variation

:::propriete
Soit $f$ dérivable sur un intervalle $I$.

- Si $f' = 0$ sur $I$, $f$ est constante sur $I$.
- Si $f' \geq 0$ sur $I$, $f$ est croissante ; si $f' > 0$ sauf en des points isolés, $f$ est strictement croissante.
:::

C’est le théorème des accroissements finis qui le justifie : pour $x < y$ dans $I$, $f(y) - f(x) = f'(c)(y - x)$ a le signe de $f'(c)$.

## Inégalité des accroissements finis

:::theoreme
Soit $f$ continue sur $[a ; b]$ et dérivable sur $]a ; b[$.

- S’il existe des réels $m$ et $M$ tels que $m \leq f'(x) \leq M$ pour tout $x \in ]a ; b[$, alors $m(b - a) \leq f(b) - f(a) \leq M(b - a)$.
- S’il existe un réel $k$ tel que $|f'(x)| \leq k$ pour tout $x \in ]a ; b[$, alors $|f(b) - f(a)| \leq k(b - a)$.
:::

:::exemple
Pour $0 < a < b$ : sur $[a ; b]$, $\ln' = \frac{1}{x}$ vérifie $\frac{1}{b} \leq \frac{1}{x} \leq \frac{1}{a}$. Donc $\frac{b - a}{b} \leq \ln b - \ln a \leq \frac{b - a}{a}$.
:::
