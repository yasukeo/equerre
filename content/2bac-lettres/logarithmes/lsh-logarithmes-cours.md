---
title: Fonctions logarithmiques — partie 1 : le logarithme népérien et ses règles
kind: cours
summary: La fonction ln, son ensemble de définition, son signe et son sens de variation, le nombre e, les règles de calcul, et la résolution d’équations et d’inéquations simples.
position: 10
visibility: public
---

## La fonction ln

:::definition
La fonction **logarithme népérien**, notée $\ln$, est définie sur $]0 ; +\infty[$ : $\ln x$ n’existe que pour $x > 0$. Elle vérifie $\ln 1 = 0$, et sa dérivée est $(\ln x)' = \frac{1}{x}$.
:::

:::propriete
- $\ln$ est **strictement croissante** sur $]0 ; +\infty[$ (car $\frac{1}{x} > 0$).
- $\ln x < 0$ pour $0 < x < 1$, $\ln 1 = 0$, et $\ln x > 0$ pour $x > 1$.
- Le nombre $e \approx 2{,}718$ est le réel tel que $\ln e = 1$.
:::

## Règles de calcul

:::propriete
Pour tous réels $a > 0$ et $b > 0$, et tout entier $n$ :

$$
\ln(ab) = \ln a + \ln b \qquad \ln\frac{a}{b} = \ln a - \ln b \qquad \ln\frac{1}{a} = -\ln a \qquad \ln\left(a^n\right) = n\ln a
$$

et $\ln\sqrt{a} = \frac{1}{2}\ln a$.
:::

:::exemple
- $\ln 6 = \ln 2 + \ln 3$ ; $\ln 8 = 3\ln 2$ ; $\ln\frac{1}{4} = -2\ln 2$.
- $\ln\left(e^3\right) = 3\ln e = 3$ et $\ln\sqrt{e} = \frac{1}{2}$.
- $\ln 18 - \ln 2 = \ln 9 = 2\ln 3$.
:::

:::attention
$\ln(a + b)$ n’est pas égal à $\ln a + \ln b$ : par exemple $\ln 2 \neq \ln 1 + \ln 1 = 0$.
:::

## Équations et inéquations

Pour $a > 0$ et $b > 0$ :

$$
\ln a = \ln b \iff a = b \qquad \ln a < \ln b \iff a < b
$$

### Méthode

1. Chercher pour quelles valeurs de $x$ l’équation a un sens (ce qui est dans $\ln$ doit être strictement positif).
2. Se ramener à $\ln A = \ln B$ (ou $<$), puis résoudre $A = B$ (ou $A < B$).
3. Garder seulement les solutions qui conviennent.

:::exemple
$\ln(2x - 4) = \ln 6$ : il faut $2x - 4 > 0$, soit $x > 2$. Alors $2x - 4 = 6$, donc $x = 5$, qui convient : $S = \{5\}$.
:::

:::exemple
$\ln x = 2 \iff x = e^2$ (car $2 = \ln\left(e^2\right)$) et $\ln x \leq 0 \iff 0 < x \leq 1$.
:::

:::exemple
$\ln(x - 1) < \ln 3$ : il faut $x > 1$, et $x - 1 < 3$, soit $x < 4$. $S = ]1 ; 4[$.
:::
