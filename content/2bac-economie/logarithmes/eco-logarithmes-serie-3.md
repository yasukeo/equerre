---
title: Série 2 : problèmes type examen
kind: serie
summary: Un problème complet comme à l’examen national, avec une fonction auxiliaire, une asymptote oblique et une tangente, puis un problème sur l’inégalité ln x ≤ x − 1, avec les corrigés.
position: 30
visibility: enrolled
---

Le premier problème suit le schéma le plus fréquent à l’examen : on étudie d’abord une fonction auxiliaire $g$, dont le signe donne celui de $f'$.

:::exercice Problème 1 : fonction auxiliaire et étude de f
**Partie A.** Soit $g$ la fonction définie sur $]0 ; +\infty[$ par $g(x) = x^2 - 1 + \ln x$.

1. Calculer $g'(x)$ et montrer que $g$ est strictement croissante sur $]0 ; +\infty[$.
2. Calculer $g(1)$ et en déduire le signe de $g(x)$ sur $]0 ; +\infty[$.

**Partie B.** Soit $f$ la fonction définie sur $]0 ; +\infty[$ par $f(x) = x - 1 - \dfrac{\ln x}{x}$, et $(C)$ sa courbe.

1. Calculer $\lim_{x \to 0^+} f(x)$ et interpréter graphiquement.
2. Calculer $\lim_{x \to +\infty} f(x)$, puis montrer que la droite $(\Delta) : y = x - 1$ est asymptote à $(C)$ en $+\infty$.
3. Étudier la position de $(C)$ par rapport à $(\Delta)$.
4. Montrer que $f'(x) = \dfrac{g(x)}{x^2}$ et dresser le tableau de variations de $f$.
5. En déduire que $f(x) \geq 0$ pour tout $x > 0$.
6. Déterminer le point de $(C)$ où la tangente est parallèle à $(\Delta)$.

:::corrige
**Partie A.**

1. $g'(x) = 2x + \frac{1}{x} > 0$ sur $]0 ; +\infty[$ : $g$ est strictement croissante.
2. $g(1) = 0$. Comme $g$ est strictement croissante, $g(x) < 0$ sur $]0 ; 1[$ et $g(x) > 0$ sur $]1 ; +\infty[$.

**Partie B.**

1. En $0^+$, $\ln x \to -\infty$ et $\frac{1}{x} \to +\infty$, donc $\frac{\ln x}{x} \to -\infty$ et $f(x) \to +\infty$. La droite $x = 0$ est asymptote verticale.
2. $\frac{\ln x}{x} \to 0$ en $+\infty$, donc $f(x) \to +\infty$, et $f(x) - (x - 1) = -\frac{\ln x}{x} \to 0$ : $(\Delta)$ est asymptote oblique en $+\infty$.
3. $f(x) - (x - 1) = -\frac{\ln x}{x}$ a le signe de $-\ln x$ : $(C)$ est au-dessus de $(\Delta)$ sur $]0 ; 1[$, au-dessous sur $]1 ; +\infty[$, et la coupe au point $(1 ; 0)$.
4. $f'(x) = 1 - \frac{\frac{1}{x} \times x - \ln x}{x^2} = \frac{x^2 - 1 + \ln x}{x^2} = \frac{g(x)}{x^2}$. D’après la partie A, $f$ est décroissante sur $]0 ; 1]$ et croissante sur $[1 ; +\infty[$, avec un minimum $f(1) = 0$.
5. Le minimum de $f$ est $0$, donc $f(x) \geq 0$ pour tout $x > 0$.
6. La tangente est parallèle à $(\Delta)$ quand $f'(x) = 1$, soit $g(x) = x^2$, c’est-à-dire $\ln x = 1$, donc $x = e$. Le point est $\left(e ; e - 1 - \frac{1}{e}\right)$.
:::
:::

:::exercice Problème 2 : autour de ln x ≤ x − 1
1. Soit $h(x) = \ln x - x + 1$ sur $]0 ; +\infty[$. Étudier les variations de $h$ et en déduire que $\ln x \leq x - 1$ pour tout $x > 0$.
2. En appliquant cette inégalité à $\frac{1}{x}$, montrer que $1 - \frac{1}{x} \leq \ln x$ pour tout $x > 0$.
3. En déduire que pour tout entier $n \geq 1$ : $\dfrac{1}{n + 1} \leq \ln\left(1 + \dfrac{1}{n}\right) \leq \dfrac{1}{n}$.
4. En déduire $\lim_{n \to +\infty} n\ln\left(1 + \frac{1}{n}\right)$.

:::corrige
1. $h'(x) = \frac{1}{x} - 1 = \frac{1 - x}{x}$ : $h$ est croissante sur $]0 ; 1]$, décroissante sur $[1 ; +\infty[$, de maximum $h(1) = 0$. Donc $h(x) \leq 0$, c’est-à-dire $\ln x \leq x - 1$.
2. Avec $\frac{1}{x} > 0$ : $\ln\frac{1}{x} \leq \frac{1}{x} - 1$, soit $-\ln x \leq \frac{1}{x} - 1$, donc $\ln x \geq 1 - \frac{1}{x}$.
3. On prend $x = 1 + \frac{1}{n} = \frac{n + 1}{n}$ : $1 - \frac{n}{n + 1} = \frac{1}{n + 1} \leq \ln\left(1 + \frac{1}{n}\right) \leq \frac{1}{n}$.
4. En multipliant par $n > 0$ : $\frac{n}{n + 1} \leq n\ln\left(1 + \frac{1}{n}\right) \leq 1$. Le membre de gauche tend vers $1$ : par les gendarmes, la limite vaut $1$.
:::
:::
