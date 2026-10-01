---
title: Fonctions logarithmiques : l’essentiel
kind: resume
summary: Les règles de calcul, les limites, les dérivées et les méthodes du chapitre sur une page, pour réviser avant un contrôle ou l’examen.
position: 10
visibility: public
---

## Définition et sens de variation

$\ln$ est la primitive de $x \mapsto \frac{1}{x}$ sur $]0 ; +\infty[$ qui s’annule en $1$ : $\ln 1 = 0$, $\ln e = 1$, $(\ln x)' = \frac{1}{x}$. Elle est strictement croissante : $\ln a < \ln b \iff a < b$ ; $\ln x > 0 \iff x > 1$.

## Règles de calcul

:::propriete
Pour $a, b > 0$ et $r$ rationnel : $\ln(ab) = \ln a + \ln b$, $\ln\frac{a}{b} = \ln a - \ln b$, $\ln\frac{1}{a} = -\ln a$, $\ln\left(a^r\right) = r\ln a$, $\ln\sqrt{a} = \frac{1}{2}\ln a$.
:::

**Équations et inéquations** : domaine d’abord (arguments $> 0$), puis $\ln A = \ln B \iff A = B$ ; avec $(\ln x)^2$, poser $X = \ln x$.

## Limites

:::propriete
- $\lim_{+\infty} \ln x = +\infty$ et $\lim_{0^+} \ln x = -\infty$.
- $\lim_{+\infty} \frac{\ln x}{x} = 0$ ; $\lim_{0^+} x\ln x = 0$ ; plus généralement $\frac{\ln x}{x^n} \to 0$ et $x^n \ln x \to 0$.
- $\lim_{x \to 1} \frac{\ln x}{x - 1} = 1$ et $\lim_{x \to 0} \frac{\ln(1 + x)}{x} = 1$.
:::

$\ln x \leq x - 1$ pour tout $x > 0$ : la courbe est au-dessous de sa tangente en $1$.

## Dérivées et primitives

:::propriete
- $(\ln u)' = \frac{u'}{u}$ si $u > 0$ ; $(\ln|u|)' = \frac{u'}{u}$ si $u \neq 0$.
- Les primitives de $\frac{u'}{u}$ sont $\ln|u| + c$.
:::

## Logarithme de base a

$\log_a x = \frac{\ln x}{\ln a}$ ($a > 0$, $a \neq 1$) ; $\log = \log_{10}$, $\log\left(10^n\right) = n$.

:::attention
$\ln(a + b) \neq \ln a + \ln b$. Toujours vérifier que les solutions trouvées sont dans le domaine.
:::
