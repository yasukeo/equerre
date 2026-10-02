---
title: Calcul trigonométrique — partie 1 : formules
kind: cours
summary: Rappels sur le cercle trigonométrique et les valeurs remarquables, formules d’addition, de duplication, de linéarisation, formules en fonction de tan, transformation de a cos x + b sin x, transformation de sommes en produits.
position: 10
visibility: public
---

## Rappels

:::propriete
Pour tout réel $x$ : $\cos^2 x + \sin^2 x = 1$, $-1 \leq \cos x \leq 1$, $-1 \leq \sin x \leq 1$, et $\cos(x + 2\pi) = \cos x$, $\sin(x + 2\pi) = \sin x$.

$\cos(-x) = \cos x$, $\sin(-x) = -\sin x$ ; $\cos(\pi - x) = -\cos x$, $\sin(\pi - x) = \sin x$ ; $\cos\left(\frac{\pi}{2} - x\right) = \sin x$, $\sin\left(\frac{\pi}{2} - x\right) = \cos x$.
:::

Valeurs remarquables : $\cos\frac{\pi}{6} = \frac{\sqrt{3}}{2}$, $\cos\frac{\pi}{4} = \frac{\sqrt{2}}{2}$, $\cos\frac{\pi}{3} = \frac{1}{2}$, et $\sin\frac{\pi}{6} = \frac{1}{2}$, $\sin\frac{\pi}{4} = \frac{\sqrt{2}}{2}$, $\sin\frac{\pi}{3} = \frac{\sqrt{3}}{2}$.

## Formules d’addition

:::propriete
Pour tous réels $a$ et $b$ :

$$
\cos(a - b) = \cos a\cos b + \sin a\sin b \qquad \cos(a + b) = \cos a\cos b - \sin a\sin b
$$

$$
\sin(a + b) = \sin a\cos b + \cos a\sin b \qquad \sin(a - b) = \sin a\cos b - \cos a\sin b
$$
:::

:::exemple
$\cos\frac{\pi}{12} = \cos\left(\frac{\pi}{3} - \frac{\pi}{4}\right) = \frac{1}{2} \times \frac{\sqrt{2}}{2} + \frac{\sqrt{3}}{2} \times \frac{\sqrt{2}}{2} = \frac{\sqrt{2} + \sqrt{6}}{4}$.
:::

:::propriete
Quand les tangentes existent : $\tan(a + b) = \frac{\tan a + \tan b}{1 - \tan a\tan b}$ et $\tan(a - b) = \frac{\tan a - \tan b}{1 + \tan a\tan b}$.
:::

## Formules de duplication

:::propriete
$$
\sin 2a = 2\sin a\cos a \qquad \cos 2a = \cos^2 a - \sin^2 a = 2\cos^2 a - 1 = 1 - 2\sin^2 a
$$

D’où les formules de **linéarisation** : $\cos^2 a = \frac{1 + \cos 2a}{2}$ et $\sin^2 a = \frac{1 - \cos 2a}{2}$.
:::

:::exemple
$\cos^2\frac{\pi}{8} = \frac{1 + \cos\frac{\pi}{4}}{2} = \frac{2 + \sqrt{2}}{4}$, donc $\cos\frac{\pi}{8} = \frac{\sqrt{2 + \sqrt{2}}}{2}$ (positif).
:::

## Formules en fonction de tan(x/2)

:::propriete
Si $t = \tan\frac{x}{2}$ existe : $\cos x = \frac{1 - t^2}{1 + t^2}$, $\sin x = \frac{2t}{1 + t^2}$, et $\tan x = \frac{2t}{1 - t^2}$ (si $t^2 \neq 1$).
:::

## Transformation de a cos x + b sin x

:::propriete
Si $(a ; b) \neq (0 ; 0)$, on pose $r = \sqrt{a^2 + b^2}$ et on choisit $\varphi$ tel que $\cos\varphi = \frac{a}{r}$ et $\sin\varphi = \frac{b}{r}$. Alors :

$$
a\cos x + b\sin x = r\cos(x - \varphi)
$$
:::

:::exemple
$\cos x + \sqrt{3}\sin x$ : $r = 2$, $\cos\varphi = \frac{1}{2}$, $\sin\varphi = \frac{\sqrt{3}}{2}$, donc $\varphi = \frac{\pi}{3}$ et $\cos x + \sqrt{3}\sin x = 2\cos\left(x - \frac{\pi}{3}\right)$.
:::

:::attention
Avant d’appliquer une formule, vérifiez les signes : c’est $\cos(a + b) = \cos a\cos b \mathbf{-} \sin a\sin b$, avec un moins.
:::

## Transformer une somme en produit

:::propriete
Pour tous réels $p$ et $q$ :

$$
\cos p + \cos q = 2\cos\frac{p + q}{2}\cos\frac{p - q}{2} \qquad \cos p - \cos q = -2\sin\frac{p + q}{2}\sin\frac{p - q}{2}
$$

$$
\sin p + \sin q = 2\sin\frac{p + q}{2}\cos\frac{p - q}{2} \qquad \sin p - \sin q = 2\cos\frac{p + q}{2}\sin\frac{p - q}{2}
$$
:::

Ces formules s’obtiennent en ajoutant ou en soustrayant les formules d’addition, puis en posant $p = a + b$ et $q = a - b$. Elles servent à **factoriser**, donc à résoudre des équations.

:::exemple
Résoudre $\cos 3x + \cos x = 0$ : $2\cos 2x\cos x = 0$, donc $\cos 2x = 0$ ou $\cos x = 0$, soit $x = \frac{\pi}{4} + \frac{k\pi}{2}$ ou $x = \frac{\pi}{2} + k\pi$.
:::
