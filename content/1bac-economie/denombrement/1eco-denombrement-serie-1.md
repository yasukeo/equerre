---
title: Série 1 — partie 1 : cardinaux et principe multiplicatif
kind: serie
summary: Cardinal d’une réunion et du complémentaire, principe multiplicatif, p-listes, nombre de parties, avec les corrigés.
position: 10
visibility: public
---

Quatre exercices sur la première partie du cours.

:::exercice Cardinal d’une réunion
Sur $200$ élèves, $120$ étudient l’anglais, $90$ l’espagnol et $40$ les deux langues.

1. Combien étudient au moins une des deux langues ?
2. Combien n’en étudient aucune ?
3. Combien étudient exactement une langue ?

:::corrige
1. $120 + 90 - 40 = 170$.
2. $200 - 170 = 30$.
3. $170 - 40 = 130$.
:::
:::

:::exercice Principe multiplicatif
1. Combien de nombres de $4$ chiffres (le premier non nul) existe-t-il ?
2. Combien d’entre eux sont pairs ?
3. Combien ont leurs $4$ chiffres distincts ?

:::corrige
1. $9 \times 10 \times 10 \times 10 = 9\,000$.
2. Dernier chiffre parmi $0, 2, 4, 6, 8$ : $9 \times 10 \times 10 \times 5 = 4\,500$.
3. $9 \times 9 \times 8 \times 7 = 4\,536$ (premier chiffre : $9$ choix sans $0$ ; deuxième : $9$ choix, $0$ permis mais pas le premier ; puis $8$ et $7$).
:::
:::

:::exercice p-listes
1. Combien de mots de $4$ lettres (ayant un sens ou non) peut-on écrire avec l’alphabet de $26$ lettres ?
2. Un questionnaire compte $3$ questions, avec $4$ réponses possibles chacune. De combien de façons peut-on y répondre ?
3. Combien de parties a un ensemble à $6$ éléments ?

:::corrige
1. $26^4 = 456\,976$.
2. $4^3 = 64$.
3. $2^6 = 64$.
:::
:::

:::exercice Arbre de dénombrement
On lance une pièce jusqu’à obtenir « pile » ou jusqu’à $3$ lancers. Combien y a-t-il de résultats possibles ? Les écrire.

:::corrige
P ; FP ; FFP ; FFF : $4$ résultats. Le principe multiplicatif ne s’applique pas directement (le nombre de lancers dépend des résultats) : on compte les branches de l’arbre.
:::
:::
