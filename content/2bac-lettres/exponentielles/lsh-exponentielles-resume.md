---
title: Fonctions exponentielles : l’essentiel
kind: resume
summary: Les règles de calcul, les limites, la dérivée et les méthodes du chapitre sur une page.
position: 10
visibility: public
---

## Définition

$y = e^x \iff x = \ln y$. $e^0 = 1$, $e^1 = e$, $e^x > 0$, $\exp$ strictement croissante ; $\ln(e^x) = x$, $e^{\ln x} = x$.

## Règles

:::propriete
$e^{a + b} = e^a e^b$ ; $e^{a - b} = \frac{e^a}{e^b}$ ; $e^{-a} = \frac{1}{e^a}$ ; $(e^a)^n = e^{na}$.
:::

## Équations

$e^a = e^b \iff a = b$ ; $e^x = k \iff x = \ln k$ si $k > 0$, aucune solution si $k \leq 0$.

## Limites et dérivée

:::propriete
- $e^x \to +\infty$ en $+\infty$ ; $e^x \to 0$ en $-\infty$.
- $\frac{e^x}{x} \to +\infty$ en $+\infty$ ; $xe^x \to 0$ en $-\infty$.
- $(e^x)' = e^x$.
:::

:::attention
$e^a + e^b \neq e^{a + b}$. Le signe de $u(x)e^x$ est celui de $u(x)$.
:::
