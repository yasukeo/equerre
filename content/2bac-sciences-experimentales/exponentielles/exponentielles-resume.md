---
title: Fonctions exponentielles : l’essentiel
kind: resume
summary: Les règles de calcul, les limites, les dérivées et les méthodes du chapitre sur une page, pour réviser avant un contrôle ou l’examen.
position: 10
visibility: public
---

## Définition

$\exp$ est la réciproque de $\ln$ : $y = e^x \iff x = \ln y$ ($y > 0$). Elle est strictement croissante, $e^x > 0$, $e^0 = 1$, $\ln\left(e^x\right) = x$ et $e^{\ln y} = y$.

## Règles de calcul

:::propriete
$e^{a + b} = e^a e^b$, $e^{-a} = \frac{1}{e^a}$, $e^{a - b} = \frac{e^a}{e^b}$, $\left(e^a\right)^r = e^{ra}$.
:::

**Équations et inéquations** : $e^a = e^b \iff a = b$ ; $e^x = k \iff x = \ln k$ si $k > 0$ (aucune solution si $k \leq 0$) ; avec $e^{2x}$ et $e^x$, poser $X = e^x > 0$.

## Limites

:::propriete
- $\lim_{+\infty} e^x = +\infty$, $\lim_{-\infty} e^x = 0$.
- $\lim_{+\infty} \frac{e^x}{x^n} = +\infty$, $\lim_{-\infty} x^n e^x = 0$.
- $\lim_{x \to 0} \frac{e^x - 1}{x} = 1$.
:::

$e^x \geq x + 1$ pour tout $x$ : la courbe est au-dessus de sa tangente en $0$.

## Dérivées et primitives

:::propriete
- $\left(e^x\right)' = e^x$ ; $\left(e^u\right)' = u'e^u$.
- Les primitives de $u'e^u$ sont $e^u + c$ ; celles de $e^{ax + b}$ sont $\frac{1}{a}e^{ax + b} + c$.
:::

## Base a

$a^x = e^{x\ln a}$ ($a > 0$) ; $\left(a^x\right)' = (\ln a)a^x$ ; croissante si $a > 1$, décroissante si $0 < a < 1$.

:::attention
$e^a + e^b$ ne se simplifie pas. Pour une forme indéterminée en $\pm\infty$, on factorise par le terme qui l’emporte (l’exponentielle l’emporte sur les puissances).
:::
