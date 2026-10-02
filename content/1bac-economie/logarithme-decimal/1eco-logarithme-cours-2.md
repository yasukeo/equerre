---
title: Le logarithme décimal — partie 2 : équations, inéquations et applications
kind: cours
summary: Sens de variation et signe de log, équations et inéquations avec log, trouver un exposant inconnu, nombre de chiffres d’un entier, intérêts composés et durée de doublement.
position: 20
visibility: public
---

## Sens de variation et signe

:::propriete
La fonction $x \mapsto \log x$ est **strictement croissante** sur $]0 ; +\infty[$. Pour tous $a > 0$ et $b > 0$ :

- $\log a = \log b \iff a = b$ ;
- $\log a < \log b \iff a < b$.

En particulier, $\log x > 0 \iff x > 1$ et $\log x < 0 \iff 0 < x < 1$.
:::

## Équations et inéquations

:::propriete
**Méthode.** On écrit d’abord le **domaine** (tout ce qui est sous un $\log$ doit être strictement positif), on se ramène à $\log A = \log B$ ou $\log A < \log B$, on résout $A = B$ ou $A < B$, puis on garde les solutions qui sont dans le domaine.
:::

:::exemple
$\log(2x - 1) = \log(x + 3)$ : domaine $x > \frac{1}{2}$. $2x - 1 = x + 3$ donne $x = 4$, qui est dans le domaine : $S = \{4\}$.
:::

:::exemple
$\log x + \log(x - 3) = 1$ : domaine $x > 3$. $\log(x(x - 3)) = \log 10$, soit $x^2 - 3x - 10 = 0$, donc $x = 5$ ou $x = -2$. Seul $5$ est dans le domaine : $S = \{5\}$.
:::

:::exemple
$\log(x - 1) \leq 1$ : domaine $x > 1$. $\log(x - 1) \leq \log 10 \iff x - 1 \leq 10 \iff x \leq 11$ : $S = ]1 ; 11]$.
:::

## Trouver un exposant

:::propriete
Pour $a > 0$ et $b > 0$ : $a^n = b \iff n\log a = \log b$.
:::

:::exemple
Plus petit entier $n$ tel que $2^n \geq 1\,000$ : $n\log 2 \geq 3$, et comme $\log 2 > 0$, $n \geq \frac{3}{\log 2} \approx 9{,}97$. Donc $n = 10$ ; en effet $2^9 = 512$ et $2^{10} = 1\,024$.
:::

:::attention
Si $0 < a < 1$, alors $\log a < 0$ : en divisant par $\log a$, on **change le sens** de l’inégalité. Par exemple $0{,}9^n \leq 0{,}5 \iff n\log 0{,}9 \leq \log 0{,}5 \iff n \geq \frac{\log 0{,}5}{\log 0{,}9} \approx 6{,}58$, donc $n \geq 7$.
:::

## Nombre de chiffres d’un entier

:::propriete
Un entier $N \geq 1$ a $k$ chiffres si et seulement si $10^{k - 1} \leq N < 10^k$, c’est-à-dire $k - 1 \leq \log N < k$.
:::

:::exemple
$\log(2^{100}) = 100\log 2 \approx 30{,}10$ : donc $30 \leq \log(2^{100}) < 31$, et $2^{100}$ a $31$ chiffres.
:::

## Intérêts composés

:::exemple
Un capital $C_0$ placé à $5\,\%$ par an vaut $C_0 \times 1{,}05^n$ après $n$ ans. Il double quand $1{,}05^n \geq 2$, soit $n \geq \frac{\log 2}{\log 1{,}05} \approx \frac{0{,}30103}{0{,}02119} \approx 14{,}2$ : il faut $15$ ans.
:::
