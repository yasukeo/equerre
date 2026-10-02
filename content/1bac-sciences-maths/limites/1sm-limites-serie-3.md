---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets : limites aux bornes d’une fonction rationnelle et asymptotes, puis une fonction avec racine définie par morceaux, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : une fonction rationnelle
Soit $f(x) = \dfrac{x^2 - x - 2}{x - 1}$.

1. Déterminer l’ensemble de définition de $f$.
2. Calculer les limites de $f$ aux bornes de cet ensemble.
3. Vérifier que $f(x) = x - \dfrac{2}{x - 1}$, et en déduire $\lim_{x \to \pm\infty} \left(f(x) - x\right)$. Interpréter graphiquement.

:::corrige
1. $D_f = \mathbb{R} \setminus \{1\}$.
2. En $\pm\infty$ : $\frac{x^2}{x} = x$, donc $\pm\infty$. En $1$ : le numérateur tend vers $-2$ ; à droite $x - 1 \to 0^+$ donc $-\infty$ ; à gauche $+\infty$.
3. $x - \frac{2}{x - 1} = \frac{x^2 - x - 2}{x - 1}$. $f(x) - x = -\frac{2}{x - 1} \to 0$ en $\pm\infty$ : la courbe se rapproche de la droite $y = x$ (asymptote oblique).
:::
:::

:::exercice Problème 2 : une fonction avec racine
Soit $f$ définie sur $[-1 ; +\infty[$ par $f(x) = \dfrac{\sqrt{x + 1} - 1}{x}$ si $x \neq 0$ et $f(0) = \dfrac{1}{2}$.

1. Calculer $\lim_{x \to 0} f(x)$. Comparer avec $f(0)$.
2. Calculer $\lim_{x \to +\infty} f(x)$.
3. Calculer $f(-1)$.

:::corrige
1. Quantité conjuguée : $f(x) = \frac{1}{\sqrt{x + 1} + 1} \to \frac{1}{2} = f(0)$.
2. $\frac{1}{\sqrt{x + 1} + 1} \to 0$.
3. $f(-1) = \frac{0 - 1}{-1} = 1$.
:::
:::
