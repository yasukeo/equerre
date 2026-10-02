---
title: Série 3 : dérivation et économie
kind: serie
summary: Coût total, coût marginal et coût moyen, minimiser un coût moyen, maximiser un bénéfice, recette et prix optimal, avec les corrigés.
position: 40
visibility: enrolled
---

En économie, la dérivée mesure ce que coûte ou rapporte « une unité de plus » : c’est la grandeur **marginale**.

:::exercice Coût marginal et coût moyen
Une entreprise produit $q$ tonnes d’un produit ($0 < q \leq 20$), pour un coût total $C(q) = q^2 + 4q + 64$, en milliers de dirhams.

1. Calculer le **coût marginal** $C_m(q) = C'(q)$, et l’interpréter pour $q = 10$.
2. Le **coût moyen** est $C_M(q) = \dfrac{C(q)}{q}$. Étudier ses variations sur $]0 ; 20]$.
3. Pour quelle production le coût moyen est-il minimal ? Vérifier qu’en ce point, coût moyen et coût marginal sont égaux.

:::corrige
1. $C_m(q) = 2q + 4$. Pour $q = 10$, $C_m = 24$ : produire une tonne de plus coûte environ $24\,000$ dirhams.
2. $C_M(q) = q + 4 + \frac{64}{q}$ et $C_M'(q) = 1 - \frac{64}{q^2} = \frac{q^2 - 64}{q^2}$ : $C_M$ décroît sur $]0 ; 8]$ et croît sur $[8 ; 20]$.
3. Le minimum est atteint pour $q = 8$ tonnes : $C_M(8) = 8 + 4 + 8 = 20$, et $C_m(8) = 20$ : ils sont égaux.
:::
:::

:::exercice Maximiser un bénéfice
Le produit précédent se vend $40$ milliers de dirhams la tonne. Toute la production est vendue.

1. Exprimer la recette $R(q)$ et le bénéfice $B(q) = R(q) - C(q)$.
2. Pour quelle production le bénéfice est-il maximal ? Quel est ce bénéfice ?
3. Pour quelles productions l’entreprise est-elle rentable ($B(q) > 0$) ?

:::corrige
1. $R(q) = 40q$ et $B(q) = -q^2 + 36q - 64$.
2. $B'(q) = -2q + 36$ s’annule en $q = 18$ : $B$ croît sur $]0 ; 18]$ et décroît ensuite. $B(18) = -324 + 648 - 64 = 260$, soit $260\,000$ dirhams.
3. $-q^2 + 36q - 64 > 0 \iff q^2 - 36q + 64 < 0$ ; les racines sont $q = 18 \pm \sqrt{260} \approx 1{,}88$ et $34{,}1$. Sur $]0 ; 20]$, l’entreprise est rentable pour $q > 18 - \sqrt{260} \approx 1{,}88$ tonne.
:::
:::

:::exercice Demande et recette
La demande d’un produit au prix $p$ (en dirhams, $0 < p < 50$) est $D(p) = 1\,000 - 20p$ unités.

1. Exprimer la recette $R(p) = p \times D(p)$.
2. Quel prix rend la recette maximale ?

:::corrige
1. $R(p) = 1\,000p - 20p^2$.
2. $R'(p) = 1\,000 - 40p$ s’annule en $p = 25$, où $R$ passe de croissante à décroissante : le prix optimal est $25$ dirhams, pour une recette de $12\,500$ dirhams.
:::
:::
