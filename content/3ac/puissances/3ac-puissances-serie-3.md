---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : des molécules dans une goutte d’eau, puis les grains de riz sur un échiquier et l’approximation de 2 puissance 10 par mille, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : une goutte d’eau
Une goutte d’eau a un volume de $0{,}05$ cm³ et contient environ $1{,}7 \times 10^{21}$ molécules d’eau.

1. Écrire $0{,}05$ en écriture scientifique.
2. Combien de molécules y a-t-il dans $1$ cm³ d’eau ?
3. Un verre contient $200$ cm³. Donner l’ordre de grandeur du nombre de molécules qu’il contient.

:::corrige
1. $5 \times 10^{-2}$.
2. $\frac{1{,}7 \times 10^{21}}{5 \times 10^{-2}} = 0{,}34 \times 10^{23} = 3{,}4 \times 10^{22}$ molécules.
3. $3{,}4 \times 10^{22} \times 2 \times 10^2 = 6{,}8 \times 10^{24}$ : de l’ordre de $10^{25}$ molécules.
:::
:::

:::exercice Problème 2 : l’échiquier
Selon une légende, on pose $1$ grain de riz sur la première case d’un échiquier, $2$ sur la deuxième, $4$ sur la troisième, et ainsi de suite en doublant à chaque case.

1. Combien de grains y a-t-il sur la $5^{\text{e}}$ case ? Sur la $n^{\text{e}}$ case ?
2. Calculer $2^{10}$. En déduire que $2^{10} \approx 10^3$.
3. Donner un ordre de grandeur de $2^{20}$, puis de $2^{60}$.
4. L’échiquier a $64$ cases. Donner un ordre de grandeur du nombre de grains sur la dernière case.

:::corrige
1. $2^4 = 16$ grains ; sur la $n^{\text{e}}$ case, $2^{n - 1}$ grains.
2. $2^{10} = 1\,024 \approx 1\,000 = 10^3$.
3. $2^{20} = (2^{10})^2 \approx 10^6$ ; $2^{60} = (2^{10})^6 \approx 10^{18}$.
4. $2^{63} = 2^3 \times 2^{60} \approx 8 \times 10^{18}$ grains.
:::
:::
