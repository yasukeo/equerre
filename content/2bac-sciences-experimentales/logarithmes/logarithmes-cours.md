---
title: Fonctions logarithmiques — partie 1 : le logarithme népérien et ses règles
kind: cours
summary: Définition du logarithme népérien, sens de variation, signe, le nombre e, propriétés algébriques, équations et inéquations avec ln, y compris celles qui se ramènent au second degré.
position: 10
visibility: public
---

## Le logarithme népérien

:::definition
La fonction $x \mapsto \frac{1}{x}$ est continue sur $]0 ; +\infty[$. La **fonction logarithme népérien**, notée $\ln$, est sa primitive sur $]0 ; +\infty[$ qui s’annule en $1$ :

$$
\ln 1 = 0 \qquad \text{et} \qquad (\ln x)' = \frac{1}{x} \text{ pour } x > 0
$$
:::

:::propriete
- $\ln$ est définie, continue et strictement croissante sur $]0 ; +\infty[$.
- Pour $a > 0$ et $b > 0$ : $\ln a = \ln b \iff a = b$ et $\ln a < \ln b \iff a < b$.
- $\ln x > 0 \iff x > 1$ et $\ln x < 0 \iff 0 < x < 1$.
- Le nombre $e$ est l’unique réel tel que $\ln e = 1$ ; $e \approx 2{,}718$.
:::

## Propriétés algébriques

:::propriete
Pour tous réels $a > 0$, $b > 0$ et tout rationnel $r$ :

$$
\ln(ab) = \ln a + \ln b \qquad \ln\frac{1}{a} = -\ln a \qquad \ln\frac{a}{b} = \ln a - \ln b \qquad \ln\left(a^r\right) = r \ln a
$$

En particulier, $\ln\sqrt{a} = \frac{1}{2}\ln a$.
:::

:::exemple
$\ln 8 - 2\ln 2 = 3\ln 2 - 2\ln 2 = \ln 2$ et $\ln\frac{e^2}{\sqrt{e}} = 2 - \frac{1}{2} = \frac{3}{2}$.
:::

:::attention
$\ln(a + b)$ n’est pas $\ln a + \ln b$. Et $\ln(ab) = \ln a + \ln b$ demande $a > 0$ et $b > 0$ : si $ab > 0$ avec $a, b < 0$, on écrit $\ln(ab) = \ln|a| + \ln|b|$.
:::

### Équations et inéquations

Pour résoudre une équation ou une inéquation avec $\ln$ :

1. on détermine l’ensemble où elle a un sens (arguments strictement positifs) ;
2. on se ramène à $\ln A = \ln B$ ou $\ln A < \ln B$, et on utilise $A = B$ ou $A < B$ ;
3. on garde les solutions qui sont dans l’ensemble de départ.

:::exemple
$\ln(x - 1) + \ln(x + 1) = \ln 3$ n’a de sens que pour $x > 1$. Elle s’écrit $\ln(x^2 - 1) = \ln 3$, soit $x^2 = 4$, donc $x = 2$ ou $x = -2$. Seul $x = 2$ convient.
:::

:::exemple
Résoudre $\ln(x + 2) < \ln(2x - 1)$ : elle a un sens pour $x > \frac{1}{2}$, et équivaut à $x + 2 < 2x - 1$, soit $x > 3$. Donc $S = ]3 ; +\infty[$.
:::

### Équations qui se ramènent au second degré

Quand $\ln x$ apparaît au carré, on pose $X = \ln x$.

:::exemple
Résoudre $(\ln x)^2 - \ln x - 2 = 0$ sur $]0 ; +\infty[$. Avec $X = \ln x$ : $X^2 - X - 2 = 0$, donc $X = 2$ ou $X = -1$. Ainsi $\ln x = 2$, soit $x = e^2$, ou $\ln x = -1$, soit $x = \frac{1}{e}$. $S = \left\{\frac{1}{e} ; e^2\right\}$.
:::

### Écrire un nombre avec $e$

Pour tout rationnel $r$, $\ln\left(e^r\right) = r$. Ainsi $\ln x = r \iff x = e^r$ : par exemple $\ln x = 3 \iff x = e^3$, et $\ln x \geq -2 \iff x \geq e^{-2}$.

:::exemple
Simplifier $A = \ln\left(\frac{1}{e^3}\right) + \ln\sqrt{e} - 2\ln e$ : $A = -3 + \frac{1}{2} - 2 = -\frac{9}{2}$.
:::
