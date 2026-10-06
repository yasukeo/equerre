---
title: Série 1 — partie 2 : inéquations trigonométriques
kind: serie
summary: Inéquations avec cosinus, sinus et tangente lues sur le cercle trigonométrique, dans différents intervalles, et une inéquation produit, avec les corrigés.
position: 20
visibility: enrolled
---

Trois exercices sur la deuxième partie du cours.

:::exercice Cosinus et sinus
Résoudre :

1. $\cos x < \frac{\sqrt{2}}{2}$ sur $]-\pi ; \pi]$
2. $\sin x \geq -\frac{1}{2}$ sur $]-\pi ; \pi]$
3. $\sin x > 0$ sur $[0 ; 2\pi[$

:::corrige
1. $\cos x = \frac{\sqrt{2}}{2}$ en $\pm\frac{\pi}{4}$ ; l’abscisse est plus petite sur l’arc de gauche : $S = \left]-\pi ; -\frac{\pi}{4}\right[ \cup \left]\frac{\pi}{4} ; \pi\right]$.
2. $\sin x = -\frac{1}{2}$ en $-\frac{\pi}{6}$ et $-\frac{5\pi}{6}$ ; l’ordonnée est plus grande sur l’arc qui passe par le haut : $S = \left]-\pi ; -\frac{5\pi}{6}\right] \cup \left[-\frac{\pi}{6} ; \pi\right]$.
3. Points au-dessus de l’axe des abscisses : $S = ]0 ; \pi[$.
:::
:::

:::exercice Tangente
Résoudre :

1. $\tan x > \sqrt{3}$ sur $\left]-\frac{\pi}{2} ; \frac{\pi}{2}\right[$
2. $\tan x \leq -1$ sur $\left]-\frac{\pi}{2} ; \frac{\pi}{2}\right[$

:::corrige
1. La tangente est croissante sur cet intervalle et vaut $\sqrt{3}$ en $\frac{\pi}{3}$ : $S = \left]\frac{\pi}{3} ; \frac{\pi}{2}\right[$.
2. Elle vaut $-1$ en $-\frac{\pi}{4}$ : $S = \left]-\frac{\pi}{2} ; -\frac{\pi}{4}\right]$.
:::
:::

:::exercice Inéquation produit
Résoudre sur $[0 ; 2\pi[$ : $(2\sin x - 1)\cos x \leq 0$.

:::corrige
- $2\sin x - 1 \geq 0 \iff \sin x \geq \frac{1}{2} \iff x \in \left[\frac{\pi}{6} ; \frac{5\pi}{6}\right]$.
- $\cos x \geq 0 \iff x \in \left[0 ; \frac{\pi}{2}\right] \cup \left[\frac{3\pi}{2} ; 2\pi\right[$.

Le produit est négatif ou nul quand les facteurs ont des signes contraires ou que l’un est nul. On parcourt $[0 ; 2\pi[$ :

- sur $\left[0 ; \frac{\pi}{6}\right]$ : premier facteur $\leq 0$, second $\geq 0$ : oui ;
- sur $\left]\frac{\pi}{6} ; \frac{\pi}{2}\right[$ : les deux positifs : non ;
- sur $\left[\frac{\pi}{2} ; \frac{5\pi}{6}\right]$ : premier $\geq 0$, second $\leq 0$ : oui ;
- sur $\left]\frac{5\pi}{6} ; \frac{3\pi}{2}\right[$ : les deux négatifs : non ;
- sur $\left[\frac{3\pi}{2} ; 2\pi\right[$ : premier négatif, second $\geq 0$ : oui.

$S = \left[0 ; \frac{\pi}{6}\right] \cup \left[\frac{\pi}{2} ; \frac{5\pi}{6}\right] \cup \left[\frac{3\pi}{2} ; 2\pi\right[$.
:::
:::
