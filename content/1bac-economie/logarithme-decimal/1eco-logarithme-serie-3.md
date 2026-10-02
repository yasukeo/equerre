---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes d’économie : un placement à intérêts composés et la dépréciation d’une machine, résolus avec les suites géométriques et le logarithme décimal, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un placement
On place $20\,000$ dirhams à intérêts composés au taux annuel de $5\,\%$. On note $C_n$ le capital après $n$ années.

1. Exprimer $C_{n + 1}$ en fonction de $C_n$, puis $C_n$ en fonction de $n$.
2. Calculer $C_{10}$ à un dirham près.
3. Au bout de combien d’années le capital dépasse-t-il $40\,000$ dirhams ?
4. Quel taux annuel faudrait-il pour que le capital double en $10$ ans ? On donnera un pourcentage à $0{,}1$ près.

:::corrige
1. $C_{n + 1} = 1{,}05\,C_n$ : $(C_n)$ est géométrique de raison $1{,}05$, et $C_n = 20\,000 \times 1{,}05^n$.
2. $C_{10} = 20\,000 \times 1{,}05^{10} \approx 20\,000 \times 1{,}628\,89 \approx 32\,578$ dirhams.
3. $1{,}05^n \geq 2 \iff n \geq \frac{\log 2}{\log 1{,}05} \approx 14{,}2$ : au bout de $15$ ans.
4. $(1 + t)^{10} = 2 \iff \log(1 + t) = \frac{\log 2}{10} \approx 0{,}0301$, donc $1 + t = 10^{0{,}0301} \approx 1{,}072$ : un taux d’environ $7{,}2\,\%$.
:::
:::

:::exercice Problème 2 : la dépréciation d’une machine
Une entreprise achète une machine $150\,000$ dirhams. Sa valeur baisse de $15\,\%$ par an. On note $V_n$ sa valeur après $n$ années.

1. Exprimer $V_n$ en fonction de $n$.
2. Calculer la valeur de la machine après $3$ ans.
3. À partir de combien d’années la valeur devient-elle inférieure à $50\,000$ dirhams ?

:::corrige
1. Baisser de $15\,\%$, c’est multiplier par $0{,}85$ : $V_n = 150\,000 \times 0{,}85^n$.
2. $V_3 = 150\,000 \times 0{,}614\,125 \approx 92\,119$ dirhams.
3. $0{,}85^n < \frac{1}{3} \iff n\log 0{,}85 < -\log 3$. Comme $\log 0{,}85 < 0$, cela donne $n > \frac{\log 3}{-\log 0{,}85} \approx \frac{0{,}4771}{0{,}0706} \approx 6{,}76$ : à partir de $7$ ans.
:::
:::
