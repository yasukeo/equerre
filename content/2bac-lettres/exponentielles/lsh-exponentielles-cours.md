---
title: Fonctions exponentielles — partie 1 : la fonction exponentielle et ses règles
kind: cours
summary: La fonction exponentielle, lien avec ln, signe et sens de variation, règles de calcul, équations et inéquations simples.
position: 10
visibility: public
---

## La fonction exponentielle

:::definition
La fonction **exponentielle**, notée $x \mapsto e^x$ (ou $\exp$), est définie sur $\mathbb{R}$. Elle est liée au logarithme : pour tout réel $x$ et tout $y > 0$,

$$
y = e^x \iff x = \ln y
$$
:::

:::propriete
- $e^0 = 1$ et $e^1 = e \approx 2{,}718$.
- $e^x > 0$ pour tout réel $x$ : une exponentielle n’est jamais négative ni nulle.
- $\exp$ est strictement croissante sur $\mathbb{R}$.
- $\ln\left(e^x\right) = x$ pour tout réel $x$, et $e^{\ln x} = x$ pour tout $x > 0$.
:::

## Règles de calcul

:::propriete
Pour tous réels $a$ et $b$ et tout entier $n$ :

$$
e^{a + b} = e^a \times e^b \qquad e^{a - b} = \frac{e^a}{e^b} \qquad e^{-a} = \frac{1}{e^a} \qquad \left(e^a\right)^n = e^{na}
$$
:::

:::exemple
- $e^3 \times e^{-1} = e^2$ ; $\frac{e^5}{e^2} = e^3$ ; $\left(e^2\right)^3 = e^6$.
- $e^{\ln 5} = 5$ et $e^{2\ln 3} = \left(e^{\ln 3}\right)^2 = 9$.
:::

## Équations et inéquations

:::propriete
- $e^a = e^b \iff a = b$ et $e^a < e^b \iff a < b$.
- Pour $k > 0$ : $e^x = k \iff x = \ln k$, et $e^x > k \iff x > \ln k$.
- Pour $k \leq 0$, l’équation $e^x = k$ n’a pas de solution.
:::

:::exemple
- $e^{2x - 1} = e^{x + 3} \iff 2x - 1 = x + 3 \iff x = 4$.
- $e^x = 7 \iff x = \ln 7$.
- $e^x = -2$ n’a pas de solution.
- $e^{x} \geq 1 \iff e^x \geq e^0 \iff x \geq 0$.
:::

:::attention
$e^{a} + e^{b}$ n’est pas $e^{a + b}$ : c’est le **produit** qui se transforme en somme des exposants.
:::
