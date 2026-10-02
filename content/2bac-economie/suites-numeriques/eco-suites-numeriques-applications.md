---
title: Série 3 : suites et économie
kind: serie
summary: Intérêts simples et composés, comparaison de placements, évolution d’une population ou d’un prix en pourcentage, amortissement d’un bien, avec les corrigés.
position: 40
visibility: enrolled
---

Les suites arithmétiques et géométriques décrivent la plupart des placements et des évolutions en pourcentage.

:::exercice Intérêts simples et intérêts composés
On place $10\,000$ dirhams au taux annuel de $5\,\%$.

1. **Intérêts simples** : chaque année, on reçoit $5\,\%$ du capital **initial**. Soit $S_n$ le capital après $n$ années. Montrer que $(S_n)$ est arithmétique et exprimer $S_n$.
2. **Intérêts composés** : chaque année, les intérêts s’ajoutent au capital. Soit $C_n$ le capital après $n$ années. Montrer que $(C_n)$ est géométrique et exprimer $C_n$.
3. Calculer $S_{10}$ et $C_{10}$.
4. Au bout de combien d’années le capital à intérêts composés aura-t-il doublé ?

:::corrige
1. $S_{n + 1} = S_n + 500$ : arithmétique de raison $500$, $S_n = 10\,000 + 500n$.
2. $C_{n + 1} = 1{,}05\,C_n$ : géométrique de raison $1{,}05$, $C_n = 10\,000 \times 1{,}05^n$.
3. $S_{10} = 15\,000$ dirhams et $C_{10} = 10\,000 \times 1{,}05^{10} \approx 16\,289$ dirhams.
4. $1{,}05^n \geq 2 \iff n\ln 1{,}05 \geq \ln 2 \iff n \geq \frac{\ln 2}{\ln 1{,}05} \approx 14{,}2$ : au bout de $15$ ans.
:::
:::

:::exercice Évolutions en pourcentage
Le prix d’un article augmente de $20\,\%$, puis baisse de $20\,\%$.

1. Le prix final est-il égal au prix initial ?
2. Une population de $50\,000$ habitants augmente de $2\,\%$ par an. Exprimer la population $P_n$ après $n$ années et calculer $P_{20}$.
3. Quel taux annuel constant ferait passer une population de $50\,000$ à $60\,000$ habitants en $10$ ans ?

:::corrige
1. Non : le prix est multiplié par $1{,}2 \times 0{,}8 = 0{,}96$, soit une baisse de $4\,\%$.
2. $P_n = 50\,000 \times 1{,}02^n$ et $P_{20} \approx 74\,297$ habitants.
3. Il faut $(1 + t)^{10} = 1{,}2$, soit $1 + t = 1{,}2^{\frac{1}{10}} = e^{\frac{\ln 1{,}2}{10}} \approx 1{,}0184$ : environ $1{,}84\,\%$ par an.
:::
:::

:::exercice Amortissement d’une machine
Une entreprise achète une machine $200\,000$ dirhams. Sa valeur baisse de $15\,\%$ par an. On note $V_n$ sa valeur après $n$ années.

1. Exprimer $V_n$ en fonction de $n$ et calculer $\lim V_n$.
2. Au bout de combien d’années la machine vaudra-t-elle moins de $50\,000$ dirhams ?
3. Calculer la somme des pertes de valeur des cinq premières années.

:::corrige
1. $V_n = 200\,000 \times 0{,}85^n$ ; comme $0 < 0{,}85 < 1$, $\lim V_n = 0$.
2. $0{,}85^n < 0{,}25 \iff n > \frac{\ln 0{,}25}{\ln 0{,}85} \approx 8{,}53$ : au bout de $9$ ans.
3. La perte totale vaut $V_0 - V_5 = 200\,000\left(1 - 0{,}85^5\right) \approx 111\,259$ dirhams.
:::
:::

:::exercice Versements réguliers
Chaque 1er janvier, une personne place $1\,000$ dirhams sur un compte rémunéré à $4\,\%$ par an (intérêts composés). On note $A_n$ le capital juste après le $n$-ième versement, avec $A_1 = 1\,000$.

1. Justifier que $A_{n + 1} = 1{,}04\,A_n + 1\,000$.
2. On pose $B_n = A_n + 25\,000$. Montrer que $(B_n)$ est géométrique.
3. En déduire $A_n$ et calculer $A_{10}$.

:::corrige
1. Pendant l’année, le capital $A_n$ rapporte $4\,\%$, puis on ajoute un versement de $1\,000$.
2. $B_{n + 1} = 1{,}04A_n + 1\,000 + 25\,000 = 1{,}04A_n + 26\,000 = 1{,}04\left(A_n + 25\,000\right) = 1{,}04B_n$.
3. $B_1 = 26\,000$, donc $B_n = 26\,000 \times 1{,}04^{n - 1}$ et $A_n = 26\,000 \times 1{,}04^{n - 1} - 25\,000$. $A_{10} \approx 12\,006$ dirhams.
:::
:::
