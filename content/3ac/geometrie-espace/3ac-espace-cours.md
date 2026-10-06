---
title: Géométrie dans l’espace — partie 1 : pyramide, cône et sphère
kind: cours
summary: La pyramide et le cône de révolution, leurs volumes, la longueur d’une arête ou d’une génératrice avec Pythagore, la sphère et la boule, aire et volume.
position: 10
visibility: public
---

## La pyramide

:::definition
Une **pyramide** a pour base un polygone et pour faces latérales des triangles qui ont un sommet commun $S$. Sa **hauteur** est la distance de $S$ au plan de la base. Une pyramide est **régulière** si sa base est un polygone régulier de centre $O$ et si $(SO)$ est la hauteur.
:::

:::propriete
$$
V = \frac{1}{3} \times \mathcal{B} \times h
$$

où $\mathcal{B}$ est l’aire de la base et $h$ la hauteur.
:::

:::exemple
Une pyramide a pour base un carré de $6$ cm de côté et pour hauteur $8$ cm : $V = \frac{1}{3} \times 36 \times 8 = 96$ cm³.
:::

:::exemple
Dans une pyramide régulière $SABCD$ à base carrée de côté $6$ cm, de centre $O$, avec $SO = 4$ cm : $OA = \frac{6\sqrt{2}}{2} = 3\sqrt{2}$ et le triangle $SOA$ est rectangle en $O$, donc $SA^2 = 16 + 18 = 34$ et $SA = \sqrt{34} \approx 5{,}83$ cm.
:::

## Le cône de révolution

:::definition
Un **cône de révolution** est engendré par un triangle rectangle qui tourne autour d’un côté de l’angle droit. Sa base est un disque de rayon $r$, sa hauteur est $h$, et le segment qui joint le sommet à un point du cercle de base est une **génératrice**.
:::

:::propriete
$$
V = \frac{1}{3} \times \pi r^2 \times h
$$

Et la génératrice $g$ vérifie $g^2 = r^2 + h^2$.
:::

:::exemple
Un cône de rayon $3$ cm et de hauteur $4$ cm : $V = \frac{1}{3}\pi \times 9 \times 4 = 12\pi \approx 37{,}7$ cm³, et $g = \sqrt{9 + 16} = 5$ cm.
:::

## La sphère et la boule

:::propriete
Pour une sphère de rayon $r$ : aire $= 4\pi r^2$. Pour la boule de rayon $r$ : volume $= \frac{4}{3}\pi r^3$.
:::

:::exemple
Pour $r = 6$ cm : aire $4\pi \times 36 = 144\pi \approx 452{,}4$ cm², volume $\frac{4}{3}\pi \times 216 = 288\pi \approx 904{,}8$ cm³.
:::

:::attention
Le volume de la pyramide et du cône contient un facteur $\frac{1}{3}$, celui du prisme et du cylindre non.
:::
