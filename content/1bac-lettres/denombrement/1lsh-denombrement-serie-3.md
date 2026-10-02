---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets : former un comité avec des conditions, puis compter des codes d’immeuble formés de lettres et de chiffres, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : un comité
Un club compte $15$ membres : $9$ filles et $6$ garçons. On forme un comité de $4$ personnes, sans rôle particulier.

1. Combien de comités sont possibles ?
2. Combien comptent exactement $2$ filles et $2$ garçons ?
3. Combien ne comptent que des filles ?
4. Combien comptent au moins un garçon ?

:::corrige
1. $C_{15}^4 = \frac{15 \times 14 \times 13 \times 12}{24} = 1\,365$.
2. $C_9^2 \times C_6^2 = 36 \times 15 = 540$.
3. $C_9^4 = \frac{9 \times 8 \times 7 \times 6}{24} = 126$.
4. Le contraire de « au moins un garçon » est « que des filles » : $1\,365 - 126 = 1\,239$.
:::
:::

:::exercice Problème 2 : le code d’un immeuble
Le code d’un immeuble est formé de $2$ lettres choisies parmi A, B, C, D, suivies de $3$ chiffres de $0$ à $9$. Les répétitions sont permises.

1. Combien de codes sont possibles ?
2. Combien de codes ont deux lettres différentes ?
3. Combien de codes ont trois chiffres tous différents ?
4. Combien de codes se terminent par un chiffre pair ?

:::corrige
1. $4^2 \times 10^3 = 16 \times 1\,000 = 16\,000$.
2. $A_4^2 \times 10^3 = 12 \times 1\,000 = 12\,000$.
3. $4^2 \times A_{10}^3 = 16 \times 720 = 11\,520$.
4. Le dernier chiffre a $5$ possibilités ($0$, $2$, $4$, $6$, $8$) : $16 \times 10 \times 10 \times 5 = 8\,000$.
:::
:::
