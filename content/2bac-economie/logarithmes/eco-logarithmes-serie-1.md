---
title: Série 1 — partie 1 : le logarithme népérien et ses règles
kind: serie
summary: Simplifications, ensembles de définition, équations et inéquations avec ln, équations du second degré en ln x et un système, avec les corrigés.
position: 10
visibility: public
---

Cinq exercices sur la première partie du cours.

:::exercice Équations et inéquations
Résoudre dans $\mathbb{R}$ :

1. $\ln(2x - 1) = \ln(x + 3)$
2. $\ln(x) + \ln(x - 2) = \ln 3$
3. $\ln(3 - x) \leq 0$

:::corrige
1. L’équation a un sens pour $x > \frac{1}{2}$ et $x > -3$, soit $x > \frac{1}{2}$. Elle équivaut à $2x - 1 = x + 3$, soit $x = 4$, qui convient : $S = \{4\}$.
2. Elle a un sens pour $x > 2$. Elle s’écrit $\ln(x^2 - 2x) = \ln 3$, soit $x^2 - 2x - 3 = 0$, donc $x = 3$ ou $x = -1$. Seul $3$ convient : $S = \{3\}$.
3. Elle a un sens pour $x < 3$. $\ln(3 - x) \leq 0 = \ln 1 \iff 3 - x \leq 1 \iff x \geq 2$. Donc $S = [2 ; 3[$.
:::
:::

:::exercice Simplifier
Écrire chaque nombre en fonction de $\ln 2$ et $\ln 3$, ou le calculer.

$$
A = \ln 12 \qquad B = \ln\frac{9}{8} \qquad C = \ln\sqrt{18} \qquad D = \ln\left(e^2\right) - \ln\frac{1}{e} \qquad E = \ln\left(\sqrt{2} + 1\right) + \ln\left(\sqrt{2} - 1\right)
$$

:::corrige
- $A = \ln(4 \times 3) = 2\ln 2 + \ln 3$.
- $B = \ln 9 - \ln 8 = 2\ln 3 - 3\ln 2$.
- $C = \frac{1}{2}\ln(2 \times 9) = \frac{1}{2}\ln 2 + \ln 3$.
- $D = 2 + 1 = 3$.
- $E = \ln\left((\sqrt{2} + 1)(\sqrt{2} - 1)\right) = \ln(2 - 1) = 0$.
:::
:::

:::exercice Ensemble de définition
Déterminer l’ensemble de définition de chaque fonction.

1. $f(x) = \ln(4 - x^2)$
2. $g(x) = \ln\left(\dfrac{x - 1}{x + 2}\right)$
3. $h(x) = \dfrac{1}{\ln x}$

:::corrige
1. $4 - x^2 > 0 \iff -2 < x < 2$ : $D_f = ]-2 ; 2[$.
2. $\frac{x - 1}{x + 2} > 0 \iff x < -2$ ou $x > 1$ : $D_g = ]-\infty ; -2[ \cup ]1 ; +\infty[$.
3. Il faut $x > 0$ et $\ln x \neq 0$, soit $x \neq 1$ : $D_h = ]0 ; 1[ \cup ]1 ; +\infty[$.
:::
:::

:::exercice Équations du second degré en ln x
Résoudre dans $]0 ; +\infty[$ :

1. $(\ln x)^2 - \ln x - 2 = 0$
2. $2(\ln x)^2 + \ln x - 1 \geq 0$

:::corrige
1. Avec $X = \ln x$ : $X^2 - X - 2 = 0$, donc $X = 2$ ou $X = -1$. $S = \left\{e^{-1} ; e^2\right\}$.
2. $2X^2 + X - 1 = (2X - 1)(X + 1) \geq 0 \iff X \leq -1$ ou $X \geq \frac{1}{2}$. Donc $\ln x \leq -1$ ou $\ln x \geq \frac{1}{2}$, soit $S = \left]0 ; e^{-1}\right] \cup \left[\sqrt{e} ; +\infty\right[$.
:::
:::

:::exercice Un système
Résoudre dans $\mathbb{R}^2$ le système $\begin{cases} x + y = 5 \\ \ln x + \ln y = \ln 6 \end{cases}$.

:::corrige
Il faut $x > 0$ et $y > 0$. La seconde équation donne $xy = 6$. $x$ et $y$ sont donc les solutions de $t^2 - 5t + 6 = 0$, soit $2$ et $3$. Les solutions sont $(2 ; 3)$ et $(3 ; 2)$.
:::
:::
