---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : encadrer une expression rationnelle en la transformant, puis encadrer le nombre d’or et étudier ses propriétés, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : encadrer une fraction
Soit $x \in [1 ; 3]$ et $f(x) = \dfrac{2x - 1}{x + 1}$.

1. Montrer que $f(x) = 2 - \dfrac{3}{x + 1}$.
2. Encadrer $x + 1$, puis $\dfrac{1}{x + 1}$, puis $\dfrac{3}{x + 1}$.
3. En déduire un encadrement de $f(x)$.
4. Pourquoi ne pas encadrer séparément le numérateur et le dénominateur ? Comparer avec l’encadrement obtenu ainsi.

:::corrige
1. $2 - \frac{3}{x + 1} = \frac{2x + 2 - 3}{x + 1} = \frac{2x - 1}{x + 1}$.
2. $x + 1 \in [2 ; 4]$, donc $\frac{1}{x + 1} \in \left[\frac{1}{4} ; \frac{1}{2}\right]$ et $\frac{3}{x + 1} \in \left[\frac{3}{4} ; \frac{3}{2}\right]$.
3. $-\frac{3}{x + 1} \in \left[-\frac{3}{2} ; -\frac{3}{4}\right]$, donc $f(x) \in \left[\frac{1}{2} ; \frac{5}{4}\right]$. Ces bornes sont atteintes : $f(1) = \frac{1}{2}$ et $f(3) = \frac{5}{4}$.
4. Avec $2x - 1 \in [1 ; 5]$ et $\frac{1}{x + 1} \in \left[\frac{1}{4} ; \frac{1}{2}\right]$, on obtient seulement $f(x) \in \left[\frac{1}{4} ; \frac{5}{2}\right]$ : c’est vrai mais beaucoup moins précis, car $x$ apparaît deux fois.
:::
:::

:::exercice Problème 2 : le nombre d’or
On pose $\varphi = \dfrac{1 + \sqrt{5}}{2}$.

1. Montrer que $2{,}23 < \sqrt{5} < 2{,}24$.
2. En déduire un encadrement de $\varphi$ d’amplitude $0{,}005$.
3. Montrer que $\varphi^2 = \varphi + 1$, puis que $\frac{1}{\varphi} = \varphi - 1$.
4. En déduire un encadrement de $\frac{1}{\varphi}$.
5. Montrer que $|\varphi - 1{,}618| < 0{,}003$.

:::corrige
1. $2{,}23^2 = 4{,}972\,9 < 5$ et $2{,}24^2 = 5{,}017\,6 > 5$ ; les nombres sont positifs, donc $2{,}23 < \sqrt{5} < 2{,}24$.
2. $3{,}23 < 1 + \sqrt{5} < 3{,}24$, donc $1{,}615 < \varphi < 1{,}62$.
3. $\varphi^2 = \frac{1 + 2\sqrt{5} + 5}{4} = \frac{3 + \sqrt{5}}{2} = 1 + \frac{1 + \sqrt{5}}{2} = 1 + \varphi$. Donc $\varphi(\varphi - 1) = 1$, et $\frac{1}{\varphi} = \varphi - 1$.
4. $0{,}615 < \frac{1}{\varphi} < 0{,}62$.
5. $1{,}615 - 1{,}618 = -0{,}003$ et $1{,}62 - 1{,}618 = 0{,}002$ : $-0{,}003 < \varphi - 1{,}618 < 0{,}002$, donc $|\varphi - 1{,}618| < 0{,}003$.
:::
:::
