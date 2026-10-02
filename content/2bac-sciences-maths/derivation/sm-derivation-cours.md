---
title: Dérivation — partie 1 : dérivabilité et calcul des dérivées
kind: cours
summary: Dérivabilité en un point, à droite et à gauche, tangente et demi-tangentes, approximation affine, dérivées usuelles, opérations, dérivée d’une composée, d’une racine n-ième et d’une fonction réciproque.
position: 10
visibility: public
---

## Dérivabilité

### Dérivabilité en un point

:::definition
Soit $f$ une fonction définie sur un intervalle ouvert contenant $a$. On dit que $f$ est **dérivable en** $a$ si le taux d’accroissement $\frac{f(x) - f(a)}{x - a}$ a une limite finie quand $x$ tend vers $a$. Cette limite est le **nombre dérivé** de $f$ en $a$, noté $f'(a)$ :

$$
f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a} = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}
$$
:::

:::definition
$f$ est **dérivable à droite** en $a$ si $\lim_{x \to a^+} \frac{f(x) - f(a)}{x - a}$ est un réel, noté $f'_d(a)$, et **dérivable à gauche** si $\lim_{x \to a^-} \frac{f(x) - f(a)}{x - a}$ est un réel, noté $f'_g(a)$.
:::

:::propriete
$f$ est dérivable en $a$ si et seulement si elle est dérivable à droite et à gauche en $a$ avec $f'_d(a) = f'_g(a)$.
:::

:::propriete
Si $f$ est dérivable en $a$, alors $f$ est continue en $a$. La réciproque est fausse : $x \mapsto |x|$ est continue en $0$ mais pas dérivable en $0$, car $f'_d(0) = 1$ et $f'_g(0) = -1$.
:::

### Interprétation géométrique

:::propriete
Si $f$ est dérivable en $a$, sa courbe $(C_f)$ admet au point $A(a ; f(a))$ une **tangente** de coefficient directeur $f'(a)$, d’équation :

$$
y = f'(a)(x - a) + f(a)
$$
:::

- Si $f'_d(a) \neq f'_g(a)$, $(C_f)$ a en $A$ deux demi-tangentes : $A$ est un **point anguleux**.
- Si $\lim_{x \to a^+} \frac{f(x) - f(a)}{x - a} = \pm\infty$, $(C_f)$ a en $A$ une **demi-tangente verticale**.

:::exemple
$f(x) = \sqrt{x}$ en $0$ : $\frac{\sqrt{x} - 0}{x - 0} = \frac{1}{\sqrt{x}} \to +\infty$ quand $x \to 0^+$. $f$ n’est pas dérivable à droite en $0$ et sa courbe a une demi-tangente verticale à l’origine.
:::

### Approximation affine

Si $f$ est dérivable en $a$, pour $h$ proche de $0$ : $f(a + h) \approx f(a) + h f'(a)$.

:::exemple
Avec $f(x) = \sqrt{x}$ en $a = 4$ : $f'(4) = \frac{1}{4}$, donc $\sqrt{4{,}02} \approx 2 + 0{,}02 \times \frac{1}{4} = 2{,}005$.
:::

## Fonctions dérivées

### Dérivées usuelles

:::propriete
- $(k)' = 0$ ($k$ constante) ; $(x)' = 1$ ; $(x^n)' = n x^{n - 1}$ pour $n \in \mathbb{Z}^*$ ($x \neq 0$ si $n < 0$).
- $\left(\frac{1}{x}\right)' = -\frac{1}{x^2}$ sur $\mathbb{R}^*$ ; $(\sqrt{x})' = \frac{1}{2\sqrt{x}}$ sur $]0 ; +\infty[$.
- $(\sin x)' = \cos x$ ; $(\cos x)' = -\sin x$ ; $(\tan x)' = 1 + \tan^2 x = \frac{1}{\cos^2 x}$.
- $\left(x^r\right)' = r x^{r - 1}$ sur $]0 ; +\infty[$ pour $r$ rationnel.
:::

### Opérations

:::propriete
Si $u$ et $v$ sont dérivables sur un intervalle $I$ et $k$ est un réel :

- $(u + v)' = u' + v'$ et $(k u)' = k u'$ ;
- $(u v)' = u' v + u v'$ ;
- $\left(\frac{1}{v}\right)' = -\frac{v'}{v^2}$ et $\left(\frac{u}{v}\right)' = \frac{u' v - u v'}{v^2}$, là où $v$ ne s’annule pas ;
- $(u^n)' = n u' u^{n - 1}$ ;
- $(\sqrt{u})' = \frac{u'}{2\sqrt{u}}$, là où $u > 0$.
:::

### Dérivée d’une composée

:::theoreme
Si $u$ est dérivable sur $I$, $v$ dérivable sur un intervalle $J$ et $u(I) \subset J$, alors $v \circ u$ est dérivable sur $I$ et :

$$
(v \circ u)'(x) = u'(x) \times v'(u(x))
$$
:::

:::exemple
$f(x) = \cos(3x^2 + 1)$ : avec $u(x) = 3x^2 + 1$ et $v = \cos$, $f'(x) = 6x \times \left(-\sin(3x^2 + 1)\right) = -6x \sin(3x^2 + 1)$.
:::

:::propriete
Pour $u$ dérivable et strictement positive sur $I$ et $n \geq 2$ : $\left(\sqrt[n]{u}\right)' = \frac{u'}{n \sqrt[n]{u^{n - 1}}}$.
:::

### Dérivée de la fonction réciproque

:::theoreme
Soit $f$ continue et strictement monotone sur $I$, dérivable en $a \in I$ avec $f'(a) \neq 0$. Alors $f^{-1}$ est dérivable en $b = f(a)$ et :

$$
\left(f^{-1}\right)'(b) = \frac{1}{f'(a)} = \frac{1}{f'\left(f^{-1}(b)\right)}
$$
:::

:::attention
Si $f'(a) = 0$, $f^{-1}$ n’est pas dérivable en $f(a)$ : sa courbe y a une tangente verticale.
:::

:::exemple
$f(x) = x^3 + x$ est continue et strictement croissante sur $\mathbb{R}$ (car $f'(x) = 3x^2 + 1 > 0$), donc bijective de $\mathbb{R}$ sur $\mathbb{R}$. On a $f(1) = 2$ et $f'(1) = 4 \neq 0$ : $f^{-1}$ est dérivable en $2$ et $\left(f^{-1}\right)'(2) = \frac{1}{f'(1)} = \frac{1}{4}$.
:::

:::exemple
Sur $]0 ; +\infty[$, $\sqrt[3]{x}$ est la réciproque de $x \mapsto x^3$. Avec $y = \sqrt[3]{x}$ : $\left(\sqrt[3]{x}\right)' = \frac{1}{3y^2} = \frac{1}{3\sqrt[3]{x^2}}$, ce qui est aussi $\left(x^{\frac{1}{3}}\right)' = \frac{1}{3}x^{-\frac{2}{3}}$. En $0$, la dérivée de $x \mapsto x^3$ est nulle : $\sqrt[3]{\cdot}$ n’est pas dérivable en $0$ et sa courbe y a une tangente verticale.
:::

### Méthode : étudier la dérivabilité en un point

Pour une fonction définie par morceaux ou avec une valeur absolue ou une racine, on revient au taux d’accroissement $\frac{f(x) - f(a)}{x - a}$ :

- si sa limite en $a$ est un réel $\ell$, $f$ est dérivable en $a$ et $f'(a) = \ell$ ;
- si les limites à droite et à gauche sont des réels différents, la courbe a un **point anguleux** ;
- si la limite est infinie, $f$ n’est pas dérivable en $a$ et la courbe a une **tangente** (ou demi-tangente) **verticale**.

:::exemple
$f(x) = \sqrt{x}$ en $0$ : $\frac{\sqrt{x} - 0}{x - 0} = \frac{1}{\sqrt{x}} \to +\infty$ quand $x \to 0^+$. $f$ n’est pas dérivable à droite en $0$ ; la courbe a en $O$ une demi-tangente verticale.
:::

### Dérivée de arc tangente

:::propriete
$\arctan$ est dérivable sur $\mathbb{R}$ et $\left(\arctan x\right)' = \dfrac{1}{1 + x^2}$. Si $u$ est dérivable sur $I$, $\left(\arctan u\right)' = \dfrac{u'}{1 + u^2}$.
:::

:::exemple
Avec $y = \arctan x$, $x = \tan y$ et $\tan'(y) = 1 + \tan^2 y = 1 + x^2 \neq 0$, donc $\left(\arctan\right)'(x) = \frac{1}{1 + x^2}$ par la dérivée de la fonction réciproque.

$f(x) = \arctan\left(\sqrt{x}\right)$ sur $]0 ; +\infty[$ : $f'(x) = \frac{\frac{1}{2\sqrt{x}}}{1 + x} = \frac{1}{2\sqrt{x}(1 + x)}$.
:::

:::exemple
Pour $x > 0$, $g(x) = \arctan x + \arctan\frac{1}{x}$ a pour dérivée $\frac{1}{1 + x^2} + \frac{-\frac{1}{x^2}}{1 + \frac{1}{x^2}} = \frac{1}{1 + x^2} - \frac{1}{x^2 + 1} = 0$ : $g$ est constante sur $]0 ; +\infty[$, égale à $g(1) = \frac{\pi}{2}$.
:::
