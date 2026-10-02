---
title: Fonctions exponentielles — partie 1 : la fonction exponentielle et ses règles
kind: cours
summary: Définition comme réciproque de ln, sens de variation et signe, règles de calcul, équations, inéquations et systèmes avec exp, y compris celles qui se ramènent au second degré.
position: 10
visibility: public
---

## L’exponentielle népérienne

:::definition
La fonction $\ln$ est continue et strictement croissante de $]0 ; +\infty[$ sur $\mathbb{R}$. Sa fonction réciproque est la **fonction exponentielle népérienne**, notée $\exp$ ou $x \mapsto e^x$. Pour tout réel $x$ et tout $y > 0$ :

$$
y = e^x \iff x = \ln y
$$
:::

:::propriete
- $\exp$ est définie, continue et strictement croissante sur $\mathbb{R}$, et $e^x > 0$ pour tout $x$.
- $e^0 = 1$, $e^1 = e$.
- $\ln\left(e^x\right) = x$ pour tout réel $x$, et $e^{\ln x} = x$ pour tout $x > 0$.
- $e^a = e^b \iff a = b$ et $e^a < e^b \iff a < b$.
- Les courbes de $\exp$ et de $\ln$ sont symétriques par rapport à la droite $y = x$.
:::

## Propriétés algébriques

:::propriete
Pour tous réels $a$ et $b$ et tout rationnel $r$ :

$$
e^{a + b} = e^a e^b \qquad e^{-a} = \frac{1}{e^a} \qquad e^{a - b} = \frac{e^a}{e^b} \qquad \left(e^a\right)^r = e^{ra}
$$
:::

:::exemple
$e^{2x} - 3e^x + 2 = 0$ : avec $X = e^x > 0$, l’équation devient $X^2 - 3X + 2 = 0$, soit $X = 1$ ou $X = 2$. Donc $e^x = 1$ ou $e^x = 2$, c’est-à-dire $x = 0$ ou $x = \ln 2$.
:::

:::exemple
- $e^{\ln 3 + 2\ln 2} = e^{\ln 3} \times \left(e^{\ln 2}\right)^2 = 3 \times 4 = 12$.
- $\frac{e^{2x + 1}}{e^{x - 1}} = e^{x + 2}$.
- $\left(e^x + e^{-x}\right)^2 = e^{2x} + 2 + e^{-2x}$.
:::

### Équations et inéquations

Pour résoudre une équation ou une inéquation avec $\exp$ :

- $e^a = e^b \iff a = b$ et $e^a < e^b \iff a < b$ ;
- pour $k > 0$, $e^x = k \iff x = \ln k$ et $e^x > k \iff x > \ln k$ ; pour $k \leq 0$, $e^x = k$ n’a pas de solution et $e^x > k$ est toujours vraie ;
- quand $e^{2x}$ et $e^x$ apparaissent, on pose $X = e^x > 0$.

:::exemple
$e^{2x} - e^x - 6 < 0$ : avec $X = e^x > 0$, $X^2 - X - 6 = (X - 3)(X + 2) < 0 \iff -2 < X < 3$. Comme $X > 0$, il reste $e^x < 3$, soit $x < \ln 3$. $S = ]-\infty ; \ln 3[$.
:::

:::exemple
$e^{x^2} = e^{x + 2} \iff x^2 = x + 2 \iff x = 2$ ou $x = -1$.
:::

:::attention
$e^{a + b} = e^a e^b$, mais $e^{a} + e^{b}$ ne se simplifie pas. Et $e^x$ n’est jamais négatif ni nul.
:::
