---
title: Limites et continuité
kind: cours
summary: Rappels sur les limites, continuité en un point et sur un intervalle, théorème des valeurs intermédiaires, fonction réciproque et fonction racine n-ième.
position: 20
visibility: public
---

## Rappels sur les limites

### Limites usuelles

Pour tout entier $n \geq 1$ :

- $\lim_{x \to +\infty} x^n = +\infty$ ; $\lim_{x \to -\infty} x^n = +\infty$ si $n$ est pair, $-\infty$ si $n$ est impair ;
- $\lim_{x \to \pm\infty} \frac{1}{x^n} = 0$ ;
- $\lim_{x \to +\infty} \sqrt{x} = +\infty$ et $\lim_{x \to 0^+} \frac{1}{\sqrt{x}} = +\infty$.

:::propriete
En $+\infty$ ou en $-\infty$, un polynôme a la même limite que son terme de plus haut degré, et une fonction rationnelle a la même limite que le quotient des termes de plus haut degré de son numérateur et de son dénominateur.
:::

:::exemple
$\lim_{x \to -\infty} \frac{2x^3 - x + 5}{4x^2 + 1} = \lim_{x \to -\infty} \frac{2x^3}{4x^2} = \lim_{x \to -\infty} \frac{x}{2} = -\infty$.
:::

### Limites trigonométriques

:::propriete
$$
\lim_{x \to 0} \frac{\sin x}{x} = 1 \qquad \lim_{x \to 0} \frac{\tan x}{x} = 1 \qquad \lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}
$$
:::

### Opérations et formes indéterminées

Les limites d’une somme, d’un produit et d’un quotient se déduisent de celles de chaque terme, sauf dans quatre cas où l’on ne peut pas conclure directement :

$$
+\infty - \infty \qquad 0 \times \infty \qquad \frac{\infty}{\infty} \qquad \frac{0}{0}
$$

Pour lever une forme indéterminée, on transforme l’expression : factorisation par le terme dominant, simplification d’une fraction, multiplication par la quantité conjuguée, ou changement de variable pour se ramener à une limite usuelle.

:::exemple
En $+\infty$, $\sqrt{x + 1} - \sqrt{x}$ est de la forme $+\infty - \infty$. Avec la quantité conjuguée :

$$
\sqrt{x + 1} - \sqrt{x} = \frac{(x + 1) - x}{\sqrt{x + 1} + \sqrt{x}} = \frac{1}{\sqrt{x + 1} + \sqrt{x}}
$$

donc $\lim_{x \to +\infty} \left(\sqrt{x + 1} - \sqrt{x}\right) = 0$.
:::

### Limites et ordre

:::theoreme
Soient $f$, $g$ et $h$ trois fonctions définies au voisinage de $a$ ($a$ réel ou $\pm\infty$), et $\ell$ un réel.

- Si $f \leq g$ au voisinage de $a$ et $\lim_{a} f = +\infty$, alors $\lim_{a} g = +\infty$.
- Si $f \leq g$ au voisinage de $a$ et $\lim_{a} g = -\infty$, alors $\lim_{a} f = -\infty$.
- Si $g \leq f \leq h$ au voisinage de $a$ et $\lim_{a} g = \lim_{a} h = \ell$, alors $\lim_{a} f = \ell$.
- Si $|f(x) - \ell| \leq g(x)$ au voisinage de $a$ et $\lim_{a} g = 0$, alors $\lim_{a} f = \ell$.
:::

:::exemple
Pour tout $x > 0$, $-\frac{1}{x} \leq \frac{\sin x}{x} \leq \frac{1}{x}$, et les deux encadrants tendent vers $0$ en $+\infty$ : donc $\lim_{x \to +\infty} \frac{\sin x}{x} = 0$.
:::

## Continuité

### Continuité en un point

:::definition
Soit $f$ une fonction définie sur un intervalle ouvert contenant $a$. On dit que $f$ est **continue en** $a$ si $\lim_{x \to a} f(x) = f(a)$.
:::

:::definition
$f$ est **continue à droite** en $a$ si $\lim_{x \to a^+} f(x) = f(a)$, et **continue à gauche** en $a$ si $\lim_{x \to a^-} f(x) = f(a)$.
:::

:::propriete
$f$ est continue en $a$ si et seulement si elle est continue à droite et à gauche en $a$.
:::

:::exemple
Soit $f$ définie par $f(x) = x^2 + 1$ si $x \leq 1$ et $f(x) = 3x - 1$ si $x > 1$. On a $f(1) = 2$, $\lim_{x \to 1^-} f(x) = 2$ et $\lim_{x \to 1^+} f(x) = 2$ : $f$ est continue en $1$.
:::

### Prolongement par continuité

:::definition
Soit $f$ une fonction définie sur un intervalle $I$ privé d’un point $a$ de $I$, telle que $\lim_{x \to a} f(x) = \ell$ avec $\ell$ réel. La fonction $g$ définie sur $I$ par $g(x) = f(x)$ si $x \neq a$ et $g(a) = \ell$ est continue en $a$ : c’est le **prolongement par continuité** de $f$ en $a$.
:::

:::exemple
$f(x) = \frac{\sin x}{x}$ est définie sur $\mathbb{R}^*$ et $\lim_{x \to 0} f(x) = 1$. Son prolongement par continuité en $0$ vaut $1$ en $0$.
:::

### Continuité sur un intervalle

:::definition
$f$ est **continue sur un intervalle ouvert** $]a ; b[$ si elle est continue en tout point de cet intervalle. Elle est **continue sur** $[a ; b]$ si elle est continue sur $]a ; b[$, continue à droite en $a$ et continue à gauche en $b$.
:::

:::propriete
- Les fonctions polynômes, $x \mapsto \sin x$ et $x \mapsto \cos x$ sont continues sur $\mathbb{R}$.
- Les fonctions rationnelles et $x \mapsto \tan x$ sont continues sur chaque intervalle de leur domaine de définition.
- $x \mapsto \sqrt{x}$ est continue sur $[0 ; +\infty[$.
- La somme, le produit et le quotient (dénominateur non nul) de fonctions continues sur un intervalle sont continus sur cet intervalle.
- Si $f$ est continue sur $I$ et positive sur $I$, alors $\sqrt{f}$ est continue sur $I$.
:::

### Composition

:::theoreme
Si $f$ est continue sur un intervalle $I$, $g$ continue sur un intervalle $J$ et $f(I) \subset J$, alors $g \circ f$ est continue sur $I$.
:::

:::propriete
Si $\lim_{x \to a} u(x) = b$ et $\lim_{X \to b} v(X) = \ell$, alors $\lim_{x \to a} v(u(x)) = \ell$ ($a$, $b$, $\ell$ réels ou infinis).
:::

:::exemple
$\lim_{x \to +\infty} \sin\left(\frac{\pi x + 1}{2x}\right)$ : on a $\lim_{x \to +\infty} \frac{\pi x + 1}{2x} = \frac{\pi}{2}$ et $\sin$ est continue en $\frac{\pi}{2}$, donc la limite vaut $\sin \frac{\pi}{2} = 1$.
:::

## Image d’un intervalle et théorème des valeurs intermédiaires

### Image d’un intervalle

:::theoreme
L’image d’un intervalle par une fonction continue est un intervalle. L’image d’un segment $[a ; b]$ par une fonction continue est un segment $[m ; M]$, où $m$ et $M$ sont le minimum et le maximum de $f$ sur $[a ; b]$.
:::

:::propriete
Si $f$ est continue et strictement croissante sur $[a ; b]$, alors $f([a ; b]) = [f(a) ; f(b)]$. Si elle est continue et strictement décroissante, $f([a ; b]) = [f(b) ; f(a)]$.

Sur un intervalle ouvert ou semi-ouvert, on remplace les valeurs aux bornes ouvertes par les limites : par exemple, si $f$ est continue et strictement croissante sur $]a ; b[$, alors $f(]a ; b[) = \left]\lim_{a^+} f ; \lim_{b^-} f\right[$.
:::

### Théorème des valeurs intermédiaires

:::theoreme
Si $f$ est continue sur $[a ; b]$, alors pour tout réel $k$ compris entre $f(a)$ et $f(b)$, l’équation $f(x) = k$ admet au moins une solution dans $[a ; b]$.
:::

:::propriete
Si $f$ est continue et **strictement monotone** sur $[a ; b]$ et si $f(a) \times f(b) < 0$, alors l’équation $f(x) = 0$ admet une **unique** solution dans $]a ; b[$.
:::

:::exemple
Soit $f(x) = x^3 + x - 1$. $f$ est continue et strictement croissante sur $[0 ; 1]$ (somme de fonctions strictement croissantes), $f(0) = -1 < 0$ et $f(1) = 1 > 0$ : l’équation $f(x) = 0$ a une unique solution $\alpha$ dans $]0 ; 1[$.
:::

### Méthode de dichotomie

Pour encadrer la solution $\alpha$ de $f(x) = 0$ sur $[a ; b]$, on calcule $f$ au milieu $m = \frac{a + b}{2}$ :

- si $f(a) \times f(m) < 0$, la solution est dans $]a ; m[$ ;
- sinon, elle est dans $[m ; b[$.

On recommence sur le nouvel intervalle, dont l’amplitude est divisée par $2$ à chaque étape.

:::exemple
Pour $f(x) = x^3 + x - 1$ : $f(0{,}5) = -0{,}375 < 0$, donc $\alpha \in ]0{,}5 ; 1[$ ; $f(0{,}75) \approx 0{,}17 > 0$, donc $\alpha \in ]0{,}5 ; 0{,}75[$.
:::

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

## Fonction racine n-ième

:::definition
Soit $n$ un entier, $n \geq 2$. La fonction $x \mapsto x^n$ est continue et strictement croissante sur $[0 ; +\infty[$ ; sa fonction réciproque est la fonction **racine n-ième**, notée $x \mapsto \sqrt[n]{x}$. Pour $x \geq 0$ et $y \geq 0$ :

$$
\sqrt[n]{x} = y \iff y^n = x
$$
:::

:::propriete
Pour tous réels positifs $x$ et $y$ et tous entiers $n, p \geq 2$ :

- $\left(\sqrt[n]{x}\right)^n = x$ et $\sqrt[n]{x^n} = x$ ;
- $\sqrt[n]{xy} = \sqrt[n]{x} \times \sqrt[n]{y}$ et, pour $y > 0$, $\sqrt[n]{\frac{x}{y}} = \frac{\sqrt[n]{x}}{\sqrt[n]{y}}$ ;
- $\sqrt[n]{\sqrt[p]{x}} = \sqrt[np]{x}$ ;
- $\sqrt[n]{x} = \sqrt[n]{y} \iff x = y$ et $\sqrt[n]{x} < \sqrt[n]{y} \iff x < y$.
:::

:::propriete
$x \mapsto \sqrt[n]{x}$ est continue et strictement croissante sur $[0 ; +\infty[$, et $\lim_{x \to +\infty} \sqrt[n]{x} = +\infty$. Si $u$ est continue et positive sur $I$, alors $\sqrt[n]{u}$ est continue sur $I$ ; si $\lim_{a} u = \ell \geq 0$, alors $\lim_{a} \sqrt[n]{u} = \sqrt[n]{\ell}$.
:::

### Puissance rationnelle

:::definition
Pour $x > 0$ et $r = \frac{p}{q}$ avec $p \in \mathbb{Z}$ et $q \in \mathbb{N}^*$, on pose $x^r = \sqrt[q]{x^p}$.
:::

Les règles de calcul sur les puissances entières restent vraies : pour $x, y > 0$ et $r, r'$ rationnels, $x^r \times x^{r'} = x^{r + r'}$, $\left(x^r\right)^{r'} = x^{r r'}$, $(xy)^r = x^r y^r$ et $\frac{x^r}{x^{r'}} = x^{r - r'}$.

:::exemple
$\sqrt[3]{8} = 2$ car $2^3 = 8$, et $16^{\frac{3}{4}} = \sqrt[4]{16^3} = \left(\sqrt[4]{16}\right)^3 = 2^3 = 8$.
:::

:::attention
$\sqrt[n]{x}$ n’est définie ici que pour $x \geq 0$. Pour résoudre $x^3 = -8$, on remarque que $x^3 = -8 \iff (-x)^3 = 8 \iff -x = 2$, donc $x = -2$.
:::
