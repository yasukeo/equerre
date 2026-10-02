---
title: Devoir surveillé : le logarithme décimal
kind: devoir
summary: Un devoir d’une heure sur 20 points : calculs, équations et inéquations, durée de doublement d’un capital et nombre de chiffres, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. On donne $\log 2 \approx 0{,}3010$, $\log 3 \approx 0{,}4771$ et $\log 1{,}04 \approx 0{,}0170$.

:::exercice Exercice 1 (6 points) : calculs
1. Calculer $\log 0{,}001$ et $\log 4 + \log 25$. (2 pts)
2. On pose $a = \log 2$ et $b = \log 3$. Exprimer $\log 72$ et $\log 2{,}5$ en fonction de $a$ et $b$. (4 pts)

:::corrige
1. $\log 0{,}001 = -3$ ; $\log 4 + \log 25 = \log 100 = 2$.
2. $72 = 2^3 \times 3^2$, donc $\log 72 = 3a + 2b$. $2{,}5 = \frac{10}{4}$, donc $\log 2{,}5 = 1 - 2a$.
:::
:::

:::exercice Exercice 2 (8 points) : équations et inéquations
Résoudre :

1. $\log(x - 2) + \log(x + 1) = 1$ (3 pts)
2. $\log(2x + 1) \leq \log(x + 4)$ (3 pts)
3. $10^{x + 1} = 0{,}01$ (2 pts)

:::corrige
1. Domaine $x > 2$ ; $(x - 2)(x + 1) = 10$, soit $x^2 - x - 12 = 0$, $x = 4$ ou $x = -3$. Seul $4$ convient : $S = \{4\}$.
2. Domaine $x > -\frac{1}{2}$ ; $2x + 1 \leq x + 4 \iff x \leq 3$ : $S = \left]-\frac{1}{2} ; 3\right]$.
3. $x + 1 = \log 0{,}01 = -2$, donc $x = -3$.
:::
:::

:::exercice Exercice 3 (6 points) : applications
1. Un capital est placé à $4\,\%$ par an, à intérêts composés. Au bout de combien d’années aura-t-il doublé ? (3 pts)
2. Combien de chiffres a le nombre $3^{40}$ ? (3 pts)

:::corrige
1. $1{,}04^n \geq 2 \iff n \geq \frac{\log 2}{\log 1{,}04} \approx \frac{0{,}3010}{0{,}0170} \approx 17{,}7$ : au bout de $18$ ans.
2. $\log(3^{40}) = 40\log 3 \approx 19{,}08$ : $19 \leq \log(3^{40}) < 20$, donc $3^{40}$ a $20$ chiffres.
:::
:::
