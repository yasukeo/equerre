---
title: Nombres complexes (1re partie) : l’essentiel
kind: resume
summary: Les formes d’un nombre complexe, les règles sur le module et l’argument, la formule de Moivre et les outils géométriques sur une page.
position: 10
visibility: public
---

## Forme algébrique

$z = a + ib$, $a = \operatorname{Re}(z)$, $b = \operatorname{Im}(z)$, $i^2 = -1$. Quotient : multiplier par le conjugué du dénominateur. Puissances de $i$ : cycle de longueur $4$.

**Conjugué** $\bar{z} = a - ib$ : $z + \bar{z} = 2a$, $z - \bar{z} = 2ib$, $z\bar{z} = a^2 + b^2$ ; $z$ réel $\iff \bar{z} = z$, imaginaire pur $\iff \bar{z} = -z$.

## Module et argument

:::propriete
- $|z| = \sqrt{a^2 + b^2}$ ; $AB = |z_B - z_A|$ ; $|zz'| = |z||z'|$, $\left|\frac{z}{z'}\right| = \frac{|z|}{|z'|}$.
- $\arg(zz') \equiv \arg z + \arg z'$, $\arg\frac{z}{z'} \equiv \arg z - \arg z'$, $\arg(z^n) \equiv n\arg z$ $[2\pi]$.
- $\left(\overrightarrow{AB}, \overrightarrow{AC}\right) \equiv \arg\frac{z_C - z_A}{z_B - z_A}$ $[2\pi]$.
:::

## Forme trigonométrique

$z = r(\cos\theta + i\sin\theta) = [r, \theta]$ avec $r = |z|$, $\cos\theta = \frac{a}{r}$, $\sin\theta = \frac{b}{r}$. **Moivre** : $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$.

## Géométrie

:::propriete
Avec $Z = \frac{z_C - z_A}{z_B - z_A}$ :

- $A$, $B$, $C$ alignés $\iff Z$ réel ;
- $(AB) \perp (AC) \iff Z$ imaginaire pur ;
- $ABC$ isocèle en $A \iff |Z| = 1$ ; rectangle isocèle en $A \iff Z = \pm i$ ;
- $|z - a| = r$ : cercle de centre $A$ et de rayon $r$ ; $|z - a| = |z - b|$ : médiatrice de $[AB]$.
:::

:::attention
$0$ est à la fois réel et imaginaire pur. Un argument n’est défini que pour $z \neq 0$, et seulement à $2\pi$ près.
:::
