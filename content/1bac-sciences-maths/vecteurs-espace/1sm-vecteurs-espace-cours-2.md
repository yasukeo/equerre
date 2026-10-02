---
title: Vecteurs de l’espace — partie 2 : coplanarité et positions relatives
kind: cours
summary: Vecteurs coplanaires, plan défini par un point et deux vecteurs, bases de l’espace et décomposition, positions relatives de droites et de plans, parallélisme d’une droite et d’un plan.
position: 20
visibility: public
---

## Vecteurs coplanaires

:::definition
Trois vecteurs $\vec{u}$, $\vec{v}$, $\vec{w}$ sont **coplanaires** si, représentés à partir d’un même point $O$, leurs extrémités et $O$ sont dans un même plan.
:::

:::propriete
Si $\vec{u}$ et $\vec{v}$ ne sont pas colinéaires, alors $\vec{u}$, $\vec{v}$, $\vec{w}$ sont coplanaires si et seulement s’il existe des réels $a$ et $b$ tels que $\vec{w} = a\vec{u} + b\vec{v}$.
:::

:::propriete
Quatre points $A$, $B$, $C$, $D$ sont coplanaires si et seulement si $\overrightarrow{AB}$, $\overrightarrow{AC}$, $\overrightarrow{AD}$ sont coplanaires.
:::

## Plan de l’espace

:::definition
Le plan $(P)$ passant par $A$ et dirigé par deux vecteurs $\vec{u}$ et $\vec{v}$ non colinéaires est l’ensemble des points $M$ tels que $\overrightarrow{AM} = a\vec{u} + b\vec{v}$, avec $a$ et $b$ réels.
:::

## Bases de l’espace

:::theoreme
Si $\vec{i}$, $\vec{j}$, $\vec{k}$ ne sont pas coplanaires, tout vecteur $\vec{u}$ s’écrit de façon unique $\vec{u} = x\vec{i} + y\vec{j} + z\vec{k}$. $(\vec{i}, \vec{j}, \vec{k})$ est une **base** de l’espace, et $(x ; y ; z)$ sont les **coordonnées** de $\vec{u}$ dans cette base.
:::

:::exemple
Dans le cube $ABCDEFGH$, $\left(\overrightarrow{AB}, \overrightarrow{AD}, \overrightarrow{AE}\right)$ est une base, et $\overrightarrow{AG} = \overrightarrow{AB} + \overrightarrow{AD} + \overrightarrow{AE}$ a pour coordonnées $(1 ; 1 ; 1)$.
:::

## Positions relatives

:::propriete
**Deux droites** de l’espace sont soit **coplanaires** (alors sécantes, parallèles ou confondues), soit **non coplanaires** (elles n’ont aucun point commun et ne sont pas parallèles).

**Une droite et un plan** sont soit sécants en un point, soit parallèles (la droite est incluse dans le plan ou n’a aucun point commun avec lui).

**Deux plans** sont soit sécants selon une droite, soit parallèles (strictement ou confondus).
:::

:::propriete
- Une droite $(D)$ de vecteur directeur $\vec{w}$ est parallèle au plan dirigé par $\vec{u}$ et $\vec{v}$ si et seulement si $\vec{u}$, $\vec{v}$, $\vec{w}$ sont coplanaires.
- Si une droite est parallèle à une droite d’un plan, elle est parallèle à ce plan.
- Deux plans sont parallèles si deux droites sécantes de l’un sont parallèles à l’autre.
:::

:::exemple
Dans le cube, les droites $(AB)$ et $(EH)$ ne sont pas coplanaires : elles ne se coupent pas et ne sont pas parallèles. Les droites $(AB)$ et $(HG)$ sont parallèles. La droite $(EG)$ est parallèle au plan $(ABC)$, car elle est parallèle à $(AC)$, qui est dans ce plan.
:::

:::attention
Dans l’espace, deux droites qui ne se coupent pas ne sont pas forcément parallèles : il faut qu’elles soient aussi coplanaires.
:::
