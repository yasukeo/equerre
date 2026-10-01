---
title: Dérivation et étude des fonctions
kind: cours
summary: Dérivabilité, tangente, dérivées usuelles et opérations, dérivée d’une composée et d’une réciproque, variations, extremums, concavité, branches infinies et plan d’étude d’une fonction.
position: 20
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

## Dérivée et variations

:::theoreme
Soit $f$ dérivable sur un intervalle $I$.

- Si $f' > 0$ sur $I$ (sauf peut-être en des points isolés où elle s’annule), $f$ est strictement croissante sur $I$.
- Si $f' < 0$ sur $I$ (sauf en des points isolés), $f$ est strictement décroissante sur $I$.
- Si $f' = 0$ sur $I$, $f$ est constante sur $I$.
:::

### Extremums

:::propriete
Si $f$ est dérivable sur un intervalle ouvert $I$ et admet un extremum en $a \in I$, alors $f'(a) = 0$. Réciproquement, si $f'$ s’annule en $a$ **en changeant de signe**, $f$ admet un extremum local en $a$.
:::

:::exemple
$f(x) = x^3$ : $f'(0) = 0$ mais $f' \geq 0$ ne change pas de signe, et $0$ n’est pas un extremum. La condition de changement de signe est indispensable.
:::

## Concavité et points d’inflexion

:::definition
Soit $f$ deux fois dérivable sur $I$.

- Si $f'' \geq 0$ sur $I$, $(C_f)$ est **convexe** : elle est au-dessus de ses tangentes.
- Si $f'' \leq 0$ sur $I$, $(C_f)$ est **concave** : elle est au-dessous de ses tangentes.
- Si $f''$ s’annule en $a$ en changeant de signe, le point $A(a ; f(a))$ est un **point d’inflexion** : la courbe y traverse sa tangente.
:::

:::exemple
$f(x) = x^3 - 3x$ : $f''(x) = 6x$ change de signe en $0$. La courbe est concave sur $]-\infty ; 0]$, convexe sur $[0 ; +\infty[$, et $O(0 ; 0)$ est un point d’inflexion.
:::

## Branches infinies

:::propriete
- **Asymptote verticale** : si $\lim_{x \to a} f(x) = \pm\infty$, la droite $x = a$ est asymptote à $(C_f)$.
- **Asymptote horizontale** : si $\lim_{x \to \pm\infty} f(x) = b$, la droite $y = b$ est asymptote à $(C_f)$ en $\pm\infty$.
- **Asymptote oblique** : si $\lim_{x \to \pm\infty} \left(f(x) - (ax + b)\right) = 0$, la droite $y = ax + b$ est asymptote à $(C_f)$ en $\pm\infty$.
:::

Quand $\lim_{x \to +\infty} f(x) = \pm\infty$, on étudie $\lim_{x \to +\infty} \frac{f(x)}{x}$ :

- si elle vaut $\pm\infty$, $(C_f)$ a une **branche parabolique de direction l’axe des ordonnées** ;
- si elle vaut $0$, une **branche parabolique de direction l’axe des abscisses** ;
- si elle vaut un réel $a \neq 0$, on étudie $\lim_{x \to +\infty} \left(f(x) - ax\right)$ : si elle vaut un réel $b$, la droite $y = ax + b$ est asymptote oblique ; si elle vaut $\pm\infty$, $(C_f)$ a une **branche parabolique de direction la droite** $y = ax$.

:::exemple
$f(x) = \frac{x^2 + 1}{x}$ : $f(x) - x = \frac{1}{x} \to 0$ en $\pm\infty$, donc la droite $y = x$ est asymptote oblique. Comme $f(x) - x$ a le signe de $x$, la courbe est au-dessus de l’asymptote sur $]0 ; +\infty[$ et au-dessous sur $]-\infty ; 0[$.
:::

## Éléments de symétrie

:::propriete
On suppose que pour tout $x \in D_f$, $2a - x \in D_f$. Alors :

- la droite $x = a$ est **axe de symétrie** de $(C_f)$ si, pour tout $x \in D_f$, $f(2a - x) = f(x)$ ;
- le point $\Omega(a ; b)$ est **centre de symétrie** de $(C_f)$ si, pour tout $x \in D_f$, $f(2a - x) + f(x) = 2b$.
:::

## Plan d’étude d’une fonction

1. Domaine de définition, et parité ou périodicité s’il y en a, pour réduire le domaine d’étude.
2. Limites aux bornes du domaine et branches infinies.
3. Continuité et dérivabilité ; calcul de $f'$.
4. Signe de $f'$ et tableau de variations, avec les extremums.
5. Concavité et points d’inflexion si l’énoncé le demande.
6. Points particuliers : intersections avec les axes, tangentes utiles.
7. Tracé de la courbe, en commençant par les asymptotes et les tangentes.
