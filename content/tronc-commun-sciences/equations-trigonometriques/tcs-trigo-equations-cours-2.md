---
title: Équations trigonométriques — partie 2 : inéquations
kind: cours
summary: Résoudre graphiquement sur le cercle trigonométrique des inéquations du type cos x ≥ a, sin x < a et tan x ≤ a sur un intervalle, puis des inéquations produit.
position: 20
visibility: public
---

## La méthode du cercle

:::propriete
Pour résoudre $\cos x \geq a$ sur un intervalle :

1. on résout d’abord l’équation $\cos x = a$ sur cet intervalle ;
2. on place les points correspondants sur le cercle trigonométrique ;
3. on repère l’arc où l’**abscisse** des points est supérieure ou égale à $a$ (pour le sinus, on regarde l’**ordonnée**) ;
4. on écrit cet arc avec les abscisses curvilignes de l’intervalle.
:::

## Inéquations avec cosinus et sinus

:::exemple
$\cos x \geq \frac{1}{2}$ sur $]-\pi ; \pi]$. L’équation donne $-\frac{\pi}{3}$ et $\frac{\pi}{3}$. Les points d’abscisse au moins $\frac{1}{2}$ forment l’arc de droite, entre ces deux points : $S = \left[-\frac{\pi}{3} ; \frac{\pi}{3}\right]$.
:::

:::exemple
$\sin x < \frac{1}{2}$ sur $[0 ; 2\pi[$. L’équation donne $\frac{\pi}{6}$ et $\frac{5\pi}{6}$. Les points d’ordonnée inférieure à $\frac{1}{2}$ sont ceux de l’arc du bas, de $\frac{5\pi}{6}$ à $\frac{\pi}{6} + 2\pi$ : sur $[0 ; 2\pi[$, $S = \left[0 ; \frac{\pi}{6}\right[ \cup \left]\frac{5\pi}{6} ; 2\pi\right[$.
:::

:::attention
Sur $[0 ; 2\pi[$, un arc qui « passe par $I$ » se coupe en deux intervalles : c’est le cas de l’exemple précédent.
:::

## Inéquations avec la tangente

:::exemple
$\tan x \leq 1$ sur $\left]-\frac{\pi}{2} ; \frac{\pi}{2}\right[$. Sur cet intervalle, la tangente est croissante et $\tan \frac{\pi}{4} = 1$ : $S = \left]-\frac{\pi}{2} ; \frac{\pi}{4}\right]$.
:::

## Inéquations produit

:::exemple
$(2\cos x - 1)\sin x \geq 0$ sur $[0 ; 2\pi[$.

- $2\cos x - 1 \geq 0 \iff \cos x \geq \frac{1}{2} \iff x \in \left[0 ; \frac{\pi}{3}\right] \cup \left[\frac{5\pi}{3} ; 2\pi\right[$.
- $\sin x \geq 0 \iff x \in [0 ; \pi]$.

Le produit est positif ou nul quand les deux facteurs ont le même signe (ou l’un est nul) : sur $\left[0 ; \frac{\pi}{3}\right]$ (les deux positifs), et sur $\left[\pi ; \frac{5\pi}{3}\right]$ (les deux négatifs ou nuls). Donc $S = \left[0 ; \frac{\pi}{3}\right] \cup \left[\pi ; \frac{5\pi}{3}\right]$.
:::
