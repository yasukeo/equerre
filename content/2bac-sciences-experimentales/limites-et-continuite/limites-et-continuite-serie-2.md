---
title: Série 1 — partie 2 : fonction réciproque et racine n-ième
kind: serie
summary: Bijections et fonctions réciproques, calculs avec les racines n-ièmes et les puissances rationnelles, équations et limites avec des racines, avec les corrigés.
position: 20
visibility: enrolled
---

Six exercices sur la deuxième partie du cours.

:::exercice Une réciproque avec une racine carrée
Soit $f$ la fonction définie sur $I = [-1 ; +\infty[$ par $f(x) = x^2 + 2x$.

1. Montrer que $f$ réalise une bijection de $I$ sur un intervalle $J$ à déterminer.
2. Déterminer $f^{-1}(x)$ pour tout $x \in J$.
3. Calculer $f^{-1}(0)$ et $f^{-1}(3)$.

:::corrige
1. $f(x) = (x + 1)^2 - 1$ : $f$ est continue et strictement croissante sur $I$, $f(-1) = -1$ et $\lim_{x \to +\infty} f(x) = +\infty$. Donc $f$ est une bijection de $I$ sur $J = [-1 ; +\infty[$.
2. Pour $y \in J$ et $x \in I$ : $(x + 1)^2 - 1 = y \iff (x + 1)^2 = y + 1 \iff x + 1 = \sqrt{y + 1}$, car $x + 1 \geq 0$. Donc $f^{-1}(x) = -1 + \sqrt{x + 1}$.
3. $f^{-1}(0) = -1 + 1 = 0$ (en effet $f(0) = 0$) et $f^{-1}(3) = -1 + 2 = 1$ (en effet $f(1) = 3$).
:::
:::

:::exercice Une réciproque homographique
Soit $g(x) = \dfrac{2x - 1}{x + 1}$ sur $I = ]-1 ; +\infty[$.

1. Vérifier que $g(x) = 2 - \dfrac{3}{x + 1}$ et en déduire le sens de variation de $g$ sur $I$.
2. Montrer que $g$ est une bijection de $I$ sur un intervalle $J$ à déterminer.
3. Déterminer $g^{-1}(x)$ pour $x \in J$.

:::corrige
1. $2 - \frac{3}{x + 1} = \frac{2(x + 1) - 3}{x + 1} = \frac{2x - 1}{x + 1}$. Sur $I$, $x \mapsto x + 1$ est strictement croissante et positive, donc $x \mapsto \frac{3}{x + 1}$ est strictement décroissante et $g$ est strictement croissante.
2. $g$ est continue sur $I$ ; $\lim_{x \to -1^+} g(x) = -\infty$ (car $\frac{3}{x + 1} \to +\infty$) et $\lim_{x \to +\infty} g(x) = 2$. Donc $g$ est une bijection de $I$ sur $J = ]-\infty ; 2[$.
3. Pour $y < 2$ : $\frac{2x - 1}{x + 1} = y \iff 2x - 1 = yx + y \iff x(2 - y) = 1 + y \iff x = \frac{1 + y}{2 - y}$. Donc $g^{-1}(x) = \dfrac{x + 1}{2 - x}$ sur $]-\infty ; 2[$.
:::
:::

:::exercice Calculs avec des racines
Simplifier les nombres suivants.

$$
A = \sqrt[3]{54} \times \sqrt[3]{4} \qquad B = \sqrt[4]{81} - \sqrt[3]{125} + \sqrt[5]{32} \qquad C = \frac{27^{\frac{2}{3}} \times 4^{\frac{1}{2}}}{8^{\frac{1}{3}}} \qquad D = \sqrt[3]{\sqrt{64}}
$$

:::corrige
- $A = \sqrt[3]{216} = 6$.
- $B = 3 - 5 + 2 = 0$.
- $C = \frac{9 \times 2}{2} = 9$.
- $D = \sqrt[6]{64} = 2$, car $2^6 = 64$.
:::
:::

:::exercice Comparer des racines
Comparer, sans calculatrice :

1. $\sqrt[3]{3}$ et $\sqrt{2}$ ;
2. $\sqrt[3]{2}$ et $\sqrt[4]{3}$.

:::corrige
1. $\sqrt[3]{3} = \sqrt[6]{9}$ et $\sqrt{2} = \sqrt[6]{8}$ ; comme $9 > 8$, $\sqrt[3]{3} > \sqrt{2}$.
2. $\sqrt[3]{2} = \sqrt[12]{2^4} = \sqrt[12]{16}$ et $\sqrt[4]{3} = \sqrt[12]{3^3} = \sqrt[12]{27}$ ; comme $16 < 27$, $\sqrt[3]{2} < \sqrt[4]{3}$.
:::
:::

:::exercice Équations
Résoudre dans $\mathbb{R}$ :

1. $x^3 = 27$ ;
2. $x^4 = 16$ ;
3. $x^3 = -8$ ;
4. $x^6 = -1$ ;
5. $\sqrt[3]{x - 1} = 2$ ;
6. $\sqrt[4]{2x + 1} = \sqrt[4]{x + 5}$.

:::corrige
1. $x = 3$ ($3$ est impair, une seule solution).
2. $x = 2$ ou $x = -2$.
3. $x = -2$.
4. Aucune solution : une puissance paire est positive.
5. Pour $x \geq 1$, $x - 1 = 8$, donc $x = 9$.
6. Il faut $2x + 1 \geq 0$ et $x + 5 \geq 0$, soit $x \geq -\frac{1}{2}$. Alors l’équation équivaut à $2x + 1 = x + 5$, soit $x = 4$, qui convient.
:::
:::

:::exercice Limites avec des racines n-ièmes
Calculer les limites suivantes.

1. $\displaystyle \lim_{x \to 0} \frac{\sqrt[3]{1 + x} - 1}{x}$
2. $\displaystyle \lim_{x \to +\infty} \left(\sqrt[3]{x^3 + 1} - x\right)$
3. $\displaystyle \lim_{x \to +\infty} \frac{\sqrt[3]{8x^3 + 1}}{x + 2}$
4. $\displaystyle \lim_{x \to +\infty} \frac{\sqrt[3]{x}}{x}$

:::corrige
1. Avec $a = \sqrt[3]{1 + x}$ : $a^3 - 1 = x$ et $a - 1 = \frac{x}{a^2 + a + 1}$. Donc le quotient vaut $\frac{1}{a^2 + a + 1}$, qui tend vers $\frac{1}{3}$.
2. Avec $a = \sqrt[3]{x^3 + 1}$ et $b = x$ : $a^3 - b^3 = 1$, donc $a - b = \frac{1}{a^2 + ab + b^2}$. Le dénominateur tend vers $+\infty$ : la limite vaut $0$.
3. Pour $x > 0$, $\sqrt[3]{8x^3 + 1} = x\sqrt[3]{8 + \frac{1}{x^3}}$, donc le quotient vaut $\frac{\sqrt[3]{8 + \frac{1}{x^3}}}{1 + \frac{2}{x}}$, qui tend vers $2$.
4. Pour $x > 0$, $\frac{\sqrt[3]{x}}{x} = \frac{1}{\sqrt[3]{x^2}}$, qui tend vers $0$.
:::
:::
