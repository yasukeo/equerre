---
title: Limites et continuité — partie 2
kind: cours
summary: Fonction réciproque d’une fonction continue strictement monotone, fonction racine n-ième, puissances rationnelles, équations et limites avec des racines.
position: 20
visibility: public
---

## Fonction réciproque

:::theoreme
Si $f$ est continue et strictement monotone sur un intervalle $I$, alors $f$ est une bijection de $I$ sur l’intervalle $J = f(I)$. Sa **fonction réciproque** $f^{-1}$, définie sur $J$, vérifie :

$$
\left( y = f(x) \text{ et } x \in I \right) \iff \left( x = f^{-1}(y) \text{ et } y \in J \right)
$$
:::

:::propriete
- $f^{-1}$ est continue sur $J$ et a le même sens de variation que $f$.
- Dans un repère orthonormé, les courbes de $f$ et de $f^{-1}$ sont symétriques par rapport à la droite d’équation $y = x$.
- Pour tout $x \in I$, $f^{-1}(f(x)) = x$ ; pour tout $y \in J$, $f(f^{-1}(y)) = y$.
:::

:::exemple
$f(x) = x^2$ est continue et strictement croissante sur $[0 ; +\infty[$, donc bijective de $[0 ; +\infty[$ sur $[0 ; +\infty[$. Sa réciproque est $f^{-1}(x) = \sqrt{x}$.
:::

### Méthode : déterminer une fonction réciproque

Pour montrer que $f$ réalise une bijection de $I$ sur un intervalle $J$ et trouver $f^{-1}$ :

1. on justifie que $f$ est continue et strictement monotone sur $I$ ;
2. on calcule $J = f(I)$ avec les valeurs ou les limites aux bornes de $I$ ;
3. on prend $y \in J$ et on résout l’équation $f(x) = y$ d’inconnue $x \in I$ : la solution unique est $x = f^{-1}(y)$ ;
4. on écrit $f^{-1}(x)$ en remplaçant $y$ par $x$.

:::exemple
Soit $f(x) = x^2 - 2x$ sur $I = [1 ; +\infty[$. On a $f(x) = (x - 1)^2 - 1$ : $f$ est continue et strictement croissante sur $I$, $f(1) = -1$ et $\lim_{x \to +\infty} f(x) = +\infty$, donc $J = [-1 ; +\infty[$.

Pour $y \in J$ et $x \in I$ : $(x - 1)^2 - 1 = y \iff (x - 1)^2 = y + 1 \iff x - 1 = \sqrt{y + 1}$, car $x - 1 \geq 0$. Donc $f^{-1}(x) = 1 + \sqrt{x + 1}$ pour tout $x \in [-1 ; +\infty[$.
:::

:::exemple
Soit $g(x) = \dfrac{x}{x + 1}$ sur $I = [0 ; +\infty[$. On écrit $g(x) = 1 - \dfrac{1}{x + 1}$ : $g$ est continue et strictement croissante sur $I$, $g(0) = 0$ et $\lim_{x \to +\infty} g(x) = 1$, donc $J = [0 ; 1[$.

Pour $y \in [0 ; 1[$ : $\dfrac{x}{x + 1} = y \iff x = y(x + 1) \iff x(1 - y) = y \iff x = \dfrac{y}{1 - y}$. Donc $g^{-1}(x) = \dfrac{x}{1 - x}$ sur $[0 ; 1[$.
:::

:::attention
La monotonie stricte est indispensable : $x \mapsto x^2$ n’est pas une bijection de $\mathbb{R}$ sur $[0 ; +\infty[$, car $(-2)^2 = 2^2$. Il faut restreindre l’intervalle de départ.
:::

## Fonction racine n-ième

:::definition
Soit $n$ un entier, $n \geq 2$. La fonction $x \mapsto x^n$ est continue et strictement croissante sur $[0 ; +\infty[$ ; sa fonction réciproque est la fonction **racine n-ième**, notée $x \mapsto \sqrt[n]{x}$. Pour $x \geq 0$ et $y \geq 0$ :

$$
\sqrt[n]{x} = y \iff y^n = x
$$
:::

On note $\sqrt[2]{x} = \sqrt{x}$ ; $\sqrt[3]{x}$ est la **racine cubique** de $x$.

:::propriete
Pour tous réels positifs $x$ et $y$ et tous entiers $n, p \geq 2$ :

- $\left(\sqrt[n]{x}\right)^n = x$ et $\sqrt[n]{x^n} = x$ ;
- $\sqrt[n]{xy} = \sqrt[n]{x} \times \sqrt[n]{y}$ et, pour $y > 0$, $\sqrt[n]{\frac{x}{y}} = \frac{\sqrt[n]{x}}{\sqrt[n]{y}}$ ;
- $\sqrt[n]{\sqrt[p]{x}} = \sqrt[np]{x}$ et $\sqrt[np]{x^p} = \sqrt[n]{x}$ ;
- $\sqrt[n]{x} = \sqrt[n]{y} \iff x = y$ et $\sqrt[n]{x} < \sqrt[n]{y} \iff x < y$.
:::

:::propriete
$x \mapsto \sqrt[n]{x}$ est continue et strictement croissante sur $[0 ; +\infty[$, et $\lim_{x \to +\infty} \sqrt[n]{x} = +\infty$. Si $u$ est continue et positive sur $I$, alors $\sqrt[n]{u}$ est continue sur $I$ ; si $\lim_{a} u = \ell \geq 0$, alors $\lim_{a} \sqrt[n]{u} = \sqrt[n]{\ell}$, et si $\lim_{a} u = +\infty$, alors $\lim_{a} \sqrt[n]{u} = +\infty$.
:::

:::exemple
- $\sqrt[3]{54} \times \sqrt[3]{4} = \sqrt[3]{216} = 6$, car $6^3 = 216$.
- $\dfrac{\sqrt[4]{32}}{\sqrt[4]{2}} = \sqrt[4]{16} = 2$.
- $\sqrt{\sqrt[3]{64}} = \sqrt[6]{64} = 2$.
:::

### Comparer deux racines

Pour comparer deux racines d’indices différents, on les écrit avec le même indice.

:::exemple
Comparer $\sqrt[3]{3}$ et $\sqrt{2}$ : $\sqrt[3]{3} = \sqrt[6]{3^2} = \sqrt[6]{9}$ et $\sqrt{2} = \sqrt[6]{2^3} = \sqrt[6]{8}$. Comme $9 > 8$ et que $\sqrt[6]{\cdot}$ est strictement croissante, $\sqrt[3]{3} > \sqrt{2}$.
:::

### Équations $x^n = a$

:::propriete
Soit $n \geq 2$ et $a$ un réel.

- Si $n$ est **impair**, l’équation $x^n = a$ a une seule solution : $\sqrt[n]{a}$ si $a \geq 0$, et $-\sqrt[n]{-a}$ si $a < 0$.
- Si $n$ est **pair** : pour $a > 0$, deux solutions $\sqrt[n]{a}$ et $-\sqrt[n]{a}$ ; pour $a = 0$, la seule solution $0$ ; pour $a < 0$, aucune solution.
:::

:::exemple
$x^3 = -27 \iff x = -3$ ; $\;x^4 = 81 \iff x = 3$ ou $x = -3$ ; $\;x^6 = -1$ n’a pas de solution réelle.
:::

:::exemple
Résoudre $\sqrt[3]{x - 1} = 2$ : on a $x \geq 1$ et l’équation équivaut à $x - 1 = 2^3 = 8$, donc $x = 9$.
:::

### Puissance rationnelle

:::definition
Pour $x > 0$ et $r = \frac{p}{q}$ avec $p \in \mathbb{Z}$ et $q \in \mathbb{N}^*$, on pose $x^r = \sqrt[q]{x^p}$.
:::

Les règles de calcul sur les puissances entières restent vraies : pour $x, y > 0$ et $r, r'$ rationnels, $x^r \times x^{r'} = x^{r + r'}$, $\left(x^r\right)^{r'} = x^{r r'}$, $(xy)^r = x^r y^r$ et $\frac{x^r}{x^{r'}} = x^{r - r'}$.

:::exemple
$\sqrt[3]{8} = 2$ car $2^3 = 8$, et $16^{\frac{3}{4}} = \sqrt[4]{16^3} = \left(\sqrt[4]{16}\right)^3 = 2^3 = 8$. De même $27^{\frac{2}{3}} = \left(\sqrt[3]{27}\right)^2 = 9$ et $8^{-\frac{1}{3}} = \frac{1}{2}$.
:::

:::attention
$\sqrt[n]{x}$ n’est définie ici que pour $x \geq 0$. Pour résoudre $x^3 = -8$, on remarque que $x^3 = -8 \iff (-x)^3 = 8 \iff -x = 2$, donc $x = -2$.
:::

## Limites avec des racines n-ièmes

### Quantité conjuguée pour une racine cubique

Pour lever une forme indéterminée avec une racine cubique, on utilise l’identité

$$
a^3 - b^3 = (a - b)\left(a^2 + ab + b^2\right)
$$

qui donne, quand $a^2 + ab + b^2 \neq 0$, $a - b = \dfrac{a^3 - b^3}{a^2 + ab + b^2}$.

:::exemple
$\lim_{x \to 0} \dfrac{\sqrt[3]{1 + x} - 1}{x}$ : avec $a = \sqrt[3]{1 + x}$ et $b = 1$, on a $a^3 - b^3 = x$, donc pour $x \neq 0$ (et $x > -1$)

$$
\frac{\sqrt[3]{1 + x} - 1}{x} = \frac{1}{\left(\sqrt[3]{1 + x}\right)^2 + \sqrt[3]{1 + x} + 1}
$$

et la limite vaut $\frac{1}{3}$.
:::

:::exemple
$\lim_{x \to +\infty} \left(\sqrt[3]{x^3 + x^2} - x\right)$ : avec $a = \sqrt[3]{x^3 + x^2}$ et $b = x$, $a^3 - b^3 = x^2$. Pour $x > 0$, $a = x\sqrt[3]{1 + \frac{1}{x}}$, donc

$$
\sqrt[3]{x^3 + x^2} - x = \frac{x^2}{x^2\left(\left(\sqrt[3]{1 + \frac{1}{x}}\right)^2 + \sqrt[3]{1 + \frac{1}{x}} + 1\right)}
$$

qui tend vers $\frac{1}{3}$.
:::

### Factoriser sous la racine

En $+\infty$, on factorise le terme dominant sous la racine : pour $x > 0$, $\sqrt[n]{x^n + \ldots} = x\sqrt[n]{1 + \ldots}$.

:::exemple
$\lim_{x \to +\infty} \dfrac{\sqrt[3]{8x^3 + 1}}{x + 2} = \lim_{x \to +\infty} \dfrac{x\sqrt[3]{8 + \frac{1}{x^3}}}{x\left(1 + \frac{2}{x}\right)} = \sqrt[3]{8} = 2$.
:::

:::propriete
Pour tous entiers $n \geq 2$, $\lim_{x \to +\infty} \dfrac{\sqrt[n]{x}}{x} = 0$ : la racine n-ième tend vers $+\infty$ moins vite que $x$.
:::
