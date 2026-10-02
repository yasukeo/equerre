---
title: Les suites numériques — partie 1 : généralités
kind: cours
summary: Définition d’une suite, suites définies par une formule ou par récurrence, représentation graphique, suites majorées, minorées et bornées, sens de variation et méthodes pour l’étudier.
position: 10
visibility: public
---

## Définition

:::definition
Une **suite numérique** est une fonction de $\mathbb{N}$ (ou d’une partie $\{n \in \mathbb{N} : n \geq n_0\}$) dans $\mathbb{R}$. On note $u_n$ l’image de $n$, appelée **terme d’indice $n$**, et $(u_n)$ la suite.
:::

:::exemple
- **Formule explicite** : $u_n = \frac{n}{n + 1}$ : $u_0 = 0$, $u_1 = \frac{1}{2}$, $u_9 = \frac{9}{10}$.
- **Récurrence** : $v_0 = 0$ et $v_{n + 1} = \frac{1}{2}v_n + 1$ : $v_1 = 1$, $v_2 = \frac{3}{2}$, $v_3 = \frac{7}{4}$. Pour calculer $v_{10}$, il faut d’abord calculer tous les termes précédents.
:::

## Représentation graphique

- Pour $u_n = f(n)$, on place les points $(n ; u_n)$ sur la courbe de $f$.
- Pour $u_{n + 1} = f(u_n)$, on trace la courbe de $f$ et la droite $y = x$ : en partant de $u_0$ sur l’axe des abscisses, on monte jusqu’à la courbe (ordonnée $u_1$), puis on revient sur l’axe en passant par la droite $y = x$, et on recommence. On voit ainsi l’évolution des termes.

## Suites majorées, minorées, bornées

:::definition
- $(u_n)$ est **majorée** s’il existe un réel $M$ tel que $u_n \leq M$ pour tout $n$.
- $(u_n)$ est **minorée** s’il existe un réel $m$ tel que $u_n \geq m$ pour tout $n$.
- $(u_n)$ est **bornée** si elle est majorée et minorée.
:::

:::exemple
$u_n = \frac{n}{n + 1} = 1 - \frac{1}{n + 1}$ : $0 \leq u_n < 1$ pour tout $n$. La suite est bornée.
:::

:::exemple
**Avec une récurrence.** $v_0 = 0$ et $v_{n + 1} = \frac{1}{2}v_n + 1$. Montrons que $v_n \leq 2$ pour tout $n$ : c’est vrai pour $n = 0$ ; si $v_n \leq 2$, alors $\frac{1}{2}v_n + 1 \leq 2$, donc $v_{n + 1} \leq 2$.
:::

## Sens de variation

:::definition
$(u_n)$ est **croissante** si $u_{n + 1} \geq u_n$ pour tout $n$, **décroissante** si $u_{n + 1} \leq u_n$ pour tout $n$, **constante** si $u_{n + 1} = u_n$. Elle est **monotone** si elle est croissante ou décroissante.
:::

### Méthodes

:::propriete
1. Étudier le signe de $u_{n + 1} - u_n$.
2. Si tous les termes sont strictement positifs, comparer $\frac{u_{n + 1}}{u_n}$ à $1$.
3. Si $u_n = f(n)$ et $f$ est monotone sur $[0 ; +\infty[$, la suite a le même sens de variation que $f$.
:::

:::exemple
- $u_n = n^2 - 5n$ : $u_{n + 1} - u_n = 2n - 4$, positif pour $n \geq 2$ : la suite est croissante à partir du rang $2$.
- $w_n = \frac{3^n}{4^n} = \left(\frac{3}{4}\right)^n$ : $w_n > 0$ et $\frac{w_{n + 1}}{w_n} = \frac{3}{4} < 1$ : la suite est décroissante.
- $t_n = \sqrt{n + 3}$ : $x \mapsto \sqrt{x + 3}$ est croissante, donc $(t_n)$ est croissante.
:::
