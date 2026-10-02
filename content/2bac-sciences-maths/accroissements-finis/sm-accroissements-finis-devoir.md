---
title: Devoir surveillé : accroissements finis
kind: devoir
summary: Un devoir d’une heure sur 20 points : Rolle et accroissements finis, une inégalité avec ln, une suite récurrente, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice non autorisée.

:::exercice Exercice 1 (6 points) : les théorèmes
1. Soit $f(x) = x^2 - 2x$ sur $[0 ; 2]$. Vérifier les hypothèses du théorème de Rolle et trouver le réel $c$ correspondant. (2 pts)
2. Soit $g(x) = x^3$ sur $[-1 ; 2]$. Trouver les réels $c$ donnés par le théorème des accroissements finis. (2 pts)
3. Montrer que l’équation $x^3 + 2x + 1 = 0$ a une seule solution réelle. (2 pts)

:::corrige
1. Polynôme continu et dérivable, $f(0) = f(2) = 0$ ; $f'(c) = 2c - 2 = 0$ donne $c = 1$.
2. $\frac{g(2) - g(-1)}{3} = \frac{8 + 1}{3} = 3 = 3c^2$, donc $c = 1$ ou $c = -1$ ; seul $c = 1$ est dans $]-1 ; 2[$.
3. $h(x) = x^3 + 2x + 1$ : $h'(x) = 3x^2 + 2 > 0$, donc au plus une solution (sinon Rolle donnerait un zéro de $h'$). $h(-1) = -2 < 0$ et $h(0) = 1 > 0$ : il y en a une dans $]-1 ; 0[$.
:::
:::

:::exercice Exercice 2 (6 points) : une inégalité
1. Montrer que pour tout $x > 0$ : $\dfrac{1}{x + 1} \leq \ln\left(1 + \dfrac{1}{x}\right) \leq \dfrac{1}{x}$. (3 pts)
2. En déduire $\lim_{x \to +\infty} x\ln\left(1 + \dfrac{1}{x}\right)$. (3 pts)

:::corrige
1. $\ln\left(1 + \frac{1}{x}\right) = \ln(x + 1) - \ln x$, et les accroissements finis pour $\ln$ sur $[x ; x + 1]$ donnent l’encadrement.
2. En multipliant par $x > 0$ : $\frac{x}{x + 1} \leq x\ln\left(1 + \frac{1}{x}\right) \leq 1$, et la limite vaut $1$.
:::
:::

:::exercice Exercice 3 (8 points) : une suite récurrente
Soit $f(x) = \dfrac{1}{3}x^2 + \dfrac{1}{3}$ et $(u_n)$ définie par $u_0 = 0$ et $u_{n + 1} = f(u_n)$. On pose $I = \left[0 ; \dfrac{1}{2}\right]$.

1. Montrer que $f(I) \subset I$. (2 pts)
2. Montrer que l’équation $f(x) = x$ a une unique solution $\ell$ dans $I$, et la calculer. (2 pts)
3. Montrer que $|f'(x)| \leq \dfrac{1}{3}$ pour tout $x \in I$. (1 pt)
4. En déduire que $|u_n - \ell| \leq \left(\dfrac{1}{3}\right)^n \ell$ et la limite de $(u_n)$. (3 pts)

:::corrige
1. $f$ est croissante sur $I$, $f(0) = \frac{1}{3}$ et $f\left(\frac{1}{2}\right) = \frac{1}{12} + \frac{1}{3} = \frac{5}{12}$ : $f(I) = \left[\frac{1}{3} ; \frac{5}{12}\right] \subset I$.
2. $f(x) = x \iff x^2 - 3x + 1 = 0 \iff x = \frac{3 \pm \sqrt{5}}{2}$. Seul $\ell = \frac{3 - \sqrt{5}}{2} \approx 0{,}38$ est dans $I$.
3. $f'(x) = \frac{2x}{3} \in \left[0 ; \frac{1}{3}\right]$ sur $I$.
4. Les termes sont dans $I$ (récurrence avec la question 1). Les accroissements finis donnent $|u_{n + 1} - \ell| \leq \frac{1}{3}|u_n - \ell|$, puis $|u_n - \ell| \leq \left(\frac{1}{3}\right)^n|u_0 - \ell| = \left(\frac{1}{3}\right)^n \ell$. Donc $\lim u_n = \ell = \frac{3 - \sqrt{5}}{2}$.
:::
:::
