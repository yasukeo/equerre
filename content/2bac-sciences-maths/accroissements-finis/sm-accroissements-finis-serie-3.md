---
title: Série 2 : problèmes type examen
kind: serie
summary: Deux problèmes comme à l’examen national de Sciences mathématiques : la méthode de Héron pour approcher √2, et la série harmonique comparée au logarithme, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : approcher √2
Soit $f(x) = \dfrac{1}{2}\left(x + \dfrac{2}{x}\right)$ sur $I = \left[\sqrt{2} ; 2\right]$, et $(u_n)$ définie par $u_0 = 2$ et $u_{n + 1} = f(u_n)$.

1. Étudier les variations de $f$ sur $I$ et montrer que $f(I) \subset I$.
2. Montrer que $0 \leq f'(x) \leq \frac{1}{4}$ pour tout $x \in I$.
3. Montrer que $u_n \in I$ pour tout $n$ et que $|u_{n + 1} - \sqrt{2}| \leq \frac{1}{4}|u_n - \sqrt{2}|$.
4. En déduire que $|u_n - \sqrt{2}| \leq \left(\frac{1}{4}\right)^n\left(2 - \sqrt{2}\right)$, puis la limite de $(u_n)$.
5. Calculer $u_1$ et $u_2$. À partir de quel rang $n$ est-on sûr que $u_n$ approche $\sqrt{2}$ à $10^{-6}$ près ?

:::corrige
1. $f'(x) = \frac{1}{2}\left(1 - \frac{2}{x^2}\right) = \frac{x^2 - 2}{2x^2} \geq 0$ sur $I$ : $f$ est croissante, $f\left(\sqrt{2}\right) = \sqrt{2}$ et $f(2) = \frac{3}{2}$, donc $f(I) = \left[\sqrt{2} ; \frac{3}{2}\right] \subset I$.
2. $f'(x) = \frac{1}{2} - \frac{1}{x^2}$ est croissante sur $I$, de $0$ à $\frac{1}{2} - \frac{1}{4} = \frac{1}{4}$.
3. Par récurrence, $u_0 = 2 \in I$, et $u_n \in I$ entraîne $u_{n + 1} \in I$. Comme $f\left(\sqrt{2}\right) = \sqrt{2}$, les accroissements finis entre $u_n$ et $\sqrt{2}$ donnent l’inégalité.
4. Par récurrence, $|u_n - \sqrt{2}| \leq \left(\frac{1}{4}\right)^n|u_0 - \sqrt{2}|$. Comme $\left(\frac{1}{4}\right)^n \to 0$, $\lim u_n = \sqrt{2}$.
5. $u_1 = \frac{3}{2}$, $u_2 = \frac{1}{2}\left(\frac{3}{2} + \frac{4}{3}\right) = \frac{17}{12}$. Il suffit que $\left(\frac{1}{4}\right)^n(2 - \sqrt{2}) \leq 10^{-6}$ ; comme $2 - \sqrt{2} < 1$, il suffit que $4^n \geq 10^6$, soit $n \geq \frac{6\ln 10}{\ln 4} \approx 9{,}97$ : dès $n = 10$.
:::
:::

:::exercice Problème 2 : la série harmonique
Pour $n \geq 1$, on pose $H_n = 1 + \dfrac{1}{2} + \cdots + \dfrac{1}{n}$.

1. Montrer que pour tout réel $x > 0$, $\dfrac{1}{x + 1} \leq \ln(x + 1) - \ln x \leq \dfrac{1}{x}$.
2. En déduire que pour tout entier $k \geq 1$, $\ln(k + 1) - \ln k \leq \dfrac{1}{k}$, et que pour $k \geq 2$, $\dfrac{1}{k} \leq \ln k - \ln(k - 1)$.
3. En sommant, montrer que $\ln(n + 1) \leq H_n \leq 1 + \ln n$.
4. En déduire $\lim H_n$ et $\lim \dfrac{H_n}{\ln n}$.

:::corrige
1. Accroissements finis pour $\ln$ sur $[x ; x + 1]$ : $\frac{1}{x + 1} \leq \frac{1}{t} \leq \frac{1}{x}$.
2. La première avec $x = k$ ; la seconde avec $x = k - 1 \geq 1$ : $\frac{1}{k} \leq \ln k - \ln(k - 1)$.
3. En sommant la première pour $k = 1, \ldots, n$ (somme télescopique) : $\ln(n + 1) - \ln 1 \leq H_n$. En sommant la seconde pour $k = 2, \ldots, n$ : $H_n - 1 \leq \ln n$.
4. $\ln(n + 1) \to +\infty$ donc $H_n \to +\infty$. Pour $n \geq 2$ : $\frac{\ln(n + 1)}{\ln n} \leq \frac{H_n}{\ln n} \leq \frac{1}{\ln n} + 1$ ; le membre de gauche vaut $1 + \frac{\ln\left(1 + \frac{1}{n}\right)}{\ln n} \to 1$, et celui de droite tend vers $1$ : la limite vaut $1$.
:::
:::
