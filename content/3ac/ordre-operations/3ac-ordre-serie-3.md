---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes : comparer la moyenne de deux nombres et la racine de leur produit, avec une application aux rectangles, puis encadrer le périmètre et l’aire d’un disque, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : deux moyennes
Soit $a$ et $b$ deux nombres strictement positifs.

1. Développer $\left(\sqrt{a} - \sqrt{b}\right)^2$.
2. En déduire que $\frac{a + b}{2} \geq \sqrt{ab}$.
3. Vérifier cette inégalité avec $a = 4$ et $b = 9$.
4. Un rectangle a un périmètre de $20$ cm. On note $a$ et $b$ ses dimensions. Montrer que son aire est au plus $25$ cm². Pour quel rectangle vaut-elle $25$ cm² ?

:::corrige
1. $a - 2\sqrt{ab} + b$.
2. Ce carré est positif ou nul : $a + b \geq 2\sqrt{ab}$, d’où le résultat.
3. $\frac{13}{2} = 6{,}5$ et $\sqrt{36} = 6$ : on a bien $6{,}5 \geq 6$.
4. $a + b = 10$, donc $\sqrt{ab} \leq 5$ et $ab \leq 25$. L’égalité a lieu quand $\sqrt{a} = \sqrt{b}$, c’est-à-dire pour le carré de côté $5$ cm.
:::
:::

:::exercice Problème 2 : un disque
On sait que $3{,}14 < \pi < 3{,}15$. Un disque a un rayon de $5$ cm.

1. Encadrer son périmètre $P = 2\pi r$.
2. Encadrer son aire $A = \pi r^2$.
3. Donner l’arrondi au dixième du périmètre, sachant que $\pi = 3{,}141\,59\ldots$

:::corrige
1. $P = 10\pi$ : $31{,}4 < P < 31{,}5$ cm.
2. $A = 25\pi$ : $78{,}5 < A < 78{,}75$ cm².
3. $10\pi = 31{,}415\,9\ldots$ : arrondi au dixième $31{,}4$ cm.
:::
:::
