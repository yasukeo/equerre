---
summary: Structures algébriques (une loi sur ℂ, groupe, sous-groupe, isomorphisme vers des matrices), nombres complexes (équation du second degré, projeté orthogonal), arithmétique (avec le nombre premier 2969) et analyse (étude de fonction, Rolle, intégrale, suite récurrente).
---

## Exercice 1 : structures algébriques (3,5 points)

La loi est $(x + yi) * (a + bi) = xa + (x^2 b + a^2 y)i$.

**1. a)** $(a + bi) * (x + yi) = ax + (a^2 y + x^2 b)i = (x + yi) * (a + bi)$ : la loi $*$ est commutative.

**1. b)** D’une part :

$$\big((x + yi) * (a + bi)\big) * (c + di) = xac + \left(x^2 a^2 d + c^2 x^2 b + c^2 a^2 y\right)i$$

D’autre part, $(a + bi) * (c + di) = ac + (a^2 d + c^2 b)i$, donc :

$$(x + yi) * \big((a + bi) * (c + di)\big) = xac + \left(x^2 a^2 d + x^2 c^2 b + a^2 c^2 y\right)i$$

Les deux résultats sont égaux : la loi $*$ est associative.

**1. c)** $(x + yi) * (1 + 0i) = x + (x^2 \cdot 0 + 1 \cdot y)i = x + yi$, et la loi est commutative : $e = 1$ est l’élément neutre.

**1. d)** Pour $x \neq 0$ :

$$(x + yi) * \left(\frac{1}{x} - \frac{y}{x^4}i\right) = 1 + \left(x^2 \cdot \frac{-y}{x^4} + \frac{1}{x^2}\,y\right)i = 1$$

Avec la commutativité, $\frac{1}{x} - \frac{y}{x^4}i$ est le symétrique de $x + yi$.

**2. a)** Si $x > 0$ et $a > 0$, alors $xa > 0$ : le produit de deux éléments de $E$ est dans $E$, qui est donc stable.

**2. b)** La loi est associative et commutative sur $\mathbb{C}$, donc sur $E$ ; $e = 1 \in E$ ; et pour $x + yi \in E$, son symétrique $\frac{1}{x} - \frac{y}{x^4}i$ a pour partie réelle $\frac{1}{x} > 0$, il est donc dans $E$. $(E, *)$ est un groupe commutatif.

**3.** $G \subset E$ et $1 \in G$. Le symétrique de $1 + bi$ est $1 - bi$, et pour $1 + yi$ et $1 + bi$ dans $G$ :

$$(1 + yi) * (1 - bi) = 1 + (-b + y)i \in G$$

$G$ est donc un sous-groupe de $(E, *)$.

**4. a)** $M(x, y) \times M(a, b) = \begin{pmatrix} xa & xb + ya \\ 0 & xa \end{pmatrix} = M(xa, xb + ay)$, avec $xa > 0$ : $F$ est stable pour la multiplication.

**4. b)** D’une part, $\varphi\big((x + yi) * (a + bi)\big) = \varphi\big(xa + (x^2 b + a^2 y)i\big) = M\left(x^2 a^2, x^2 b + a^2 y\right)$. D’autre part, d’après 4. a), $\varphi(x + yi) \times \varphi(a + bi) = M(x^2, y) \times M(a^2, b) = M\left(x^2 a^2, x^2 b + a^2 y\right)$. $\varphi$ est donc un morphisme. Pour $M(X, Y) \in F$ ($X > 0$), l’unique antécédent dans $E$ est $\sqrt{X} + Yi$, car $x > 0$ impose $x = \sqrt{X}$ : $\varphi$ est bijective. C’est un isomorphisme de $(E, *)$ sur $(F, \times)$.

**4. c)** L’image d’un groupe commutatif par un isomorphisme est un groupe commutatif : $(F, \times)$ est un groupe commutatif.

## Exercice 2 : nombres complexes (3,5 points)

### Partie I

**1. a)** Avec $(1 + i)^2 = 2i$ :

$$\Delta = 2i(1 + m)^2 - 8im = 2i\left((1 + m)^2 - 4m\right) = 2i(1 - m)^2$$

Comme $m$ n’est pas réel, $m \neq 1$, donc $\Delta \neq 0$.

**1. b)** $\Delta = \left((1 + i)(1 - m)\right)^2$, donc les solutions sont :

$$z_1 = \frac{(1 + i)(1 + m) + (1 + i)(1 - m)}{2} = 1 + i \qquad z_2 = \frac{(1 + i)(1 + m) - (1 + i)(1 - m)}{2} = (1 + i)m$$

**2. a)** $z_1 + z_2 = (1 + i)(1 + m)$, avec $1 + i = \sqrt{2}\,e^{i\frac{\pi}{4}}$ et $1 + e^{i\theta} = e^{i\frac{\theta}{2}}\left(e^{-i\frac{\theta}{2}} + e^{i\frac{\theta}{2}}\right) = 2\cos\frac{\theta}{2}\,e^{i\frac{\theta}{2}}$. Donc :

$$z_1 + z_2 = 2\sqrt{2}\cos\frac{\theta}{2}\; e^{i\left(\frac{\pi}{4} + \frac{\theta}{2}\right)}$$

Comme $0 < \frac{\theta}{2} < \frac{\pi}{2}$, $\cos\frac{\theta}{2} > 0$ : le module est $2\sqrt{2}\cos\frac{\theta}{2}$ et un argument est $\frac{\pi}{4} + \frac{\theta}{2}$.

**2. b)** $z_1 z_2 = 2im = 2e^{i\left(\theta + \frac{\pi}{2}\right)}$ est réel si et seulement si $\theta + \frac{\pi}{2} \equiv 0 \; [\pi]$, c’est-à-dire, avec $0 < \theta < \pi$, $\theta = \frac{\pi}{2}$. Alors $m = i$ et $z_1 + z_2 = (1 + i)(1 + i) = 2i$.

### Partie II

**1. a)** $d = ib = i(1 + i)m = (i - 1)m$, donc :

$$\omega = \frac{c + d}{2} = \frac{(1 - i) - (1 - i)m}{2} = \frac{(1 - i)(1 - m)}{2}$$

**1. b)** $b - a = (1 + i)(m - 1)$ et $\omega \neq 0$ (car $m \neq 1$). Comme $\frac{1 + i}{1 - i} = i$ :

$$\frac{b - a}{\omega} = \frac{2(1 + i)(m - 1)}{(1 - i)(1 - m)} = -2\,\frac{1 + i}{1 - i} = -2i$$

**1. c)** $\frac{b - a}{\omega - 0} = -2i$ est imaginaire pur : $(O\Omega) \perp (AB)$. Et $|b - a| = 2|\omega|$ : $AB = 2\,O\Omega$.

**2. a)** $H$ est sur $(AB)$ et $A \neq B$ : $\frac{h - a}{b - a}$ est réel. $H$ est sur $(O\Omega)$ : $h = t\omega$ avec $t$ réel, donc $\frac{h}{b - a} = t\,\frac{\omega}{b - a} = \frac{t}{-2i} = \frac{t}{2}\,i$ est imaginaire pur.

**2. b)** Écrivons $h = a + \mu(b - a)$ avec $\mu$ réel. Comme $\frac{a}{b - a} = \frac{1 + i}{(1 + i)(m - 1)} = \frac{1}{m - 1}$ :

$$\frac{h}{b - a} = \frac{1}{m - 1} + \mu$$

Ce nombre est imaginaire pur, donc $\mu = -\mathrm{Re}\left(\frac{1}{m - 1}\right)$ et $h = (b - a) \cdot i\,\mathrm{Im}\left(\frac{1}{m - 1}\right)$. Avec $i\,\mathrm{Im}(w) = \frac{w - \bar{w}}{2}$ :

$$h = \frac{(1 + i)(m - 1)}{2}\left(\frac{1}{m - 1} - \frac{1}{\bar{m} - 1}\right) = \frac{(1 + i)(\bar{m} - m)}{2(\bar{m} - 1)}$$

Vérification avec $m = i$ : $B(-1 + i)$, la droite $(AB)$ est horizontale d’ordonnée $1$, et la formule donne $h = i$, le projeté de $O$ sur cette droite.

## Exercice 3 : arithmétique (3 points)

**1. a)** $2969$ est premier et ne divise pas $n$, donc $n$ et $2969$ sont premiers entre eux. D’après le théorème de Bézout, il existe des entiers $u$ et $v$ tels que $un + 2969v = 1$, d’où $un \equiv 1 \; [2969]$.

**1. b)** En multipliant $n^8 + m^8 \equiv 0 \; [2969]$ par $u^8$ : $(un)^8 + (um)^8 \equiv 0$, donc $1 + (um)^8 \equiv 0$ et $(um)^8 \equiv -1 \; [2969]$. Comme $2968 = 8 \times 371$ :

$$(um)^{2968} = \left((um)^8\right)^{371} \equiv (-1)^{371} = -1 \; [2969]$$

**1. c)** Si $2969$ divisait $um$, on aurait $(um)^8 \equiv 0$, donc $-1 \equiv 0 \; [2969]$ : c’est faux. $2969$ ne divise pas $um$.

**1. d)** $2969$ est premier et ne divise pas $um$ : d’après le petit théorème de Fermat, $(um)^{2968} \equiv 1 \; [2969]$.

**2. a)** Si $2969$ ne divisait pas $n$, les questions 1. b) et 1. d) donneraient $1 \equiv -1 \; [2969]$, donc $2969$ diviserait $2$ : c’est impossible. Donc $2969$ divise $n$.

**2. b)** Si $n^8 + m^8 \equiv 0 \; [2969]$, alors $2969$ divise $n$ d’après 2. a), donc $m^8 \equiv 0 \; [2969]$ ; $2969$ étant premier, il divise $m$. Réciproquement, si $n \equiv 0$ et $m \equiv 0 \; [2969]$, alors $n^8 + m^8 \equiv 0 \; [2969]$.

## Exercice 4 : analyse (10 points)

### Partie I

Ici $f(x) = 4x\left(e^{-x} + \frac{1}{2}x - 1\right) = 4xe^{-x} + 2x^2 - 4x$.

**1.** En $-\infty$ : $e^{-x} + \frac{x}{2} - 1 = e^{-x}\left(1 + \left(\frac{x}{2} - 1\right)e^{x}\right)$, et $\lim_{x \to -\infty} xe^x = 0$, donc ce facteur tend vers $+\infty$, et $\lim_{x \to -\infty} f(x) = -\infty$. En $+\infty$ : $e^{-x} \to 0$ et $\frac{x}{2} - 1 \to +\infty$, donc $\lim_{x \to +\infty} f(x) = +\infty$.

**2. a)** $f$ est dérivable sur $\mathbb{R}$ (produit et somme de fonctions dérivables), et :

$$f'(x) = 4e^{-x} - 4xe^{-x} + 4x - 4 = 4(1 - x)e^{-x} - 4(1 - x) = 4\left(e^{-x} - 1\right)(1 - x)$$

**2. b)** $e^{-x} - 1$ est positif sur $]-\infty ; 0]$ et négatif sur $[0 ; +\infty[$ ; $1 - x$ est positif avant $1$ et négatif après. Donc $f' \geq 0$ sur $]-\infty ; 0]$, $f' \leq 0$ sur $[0 ; 1]$ et $f' \geq 0$ sur $[1 ; +\infty[$. $f$ est croissante sur $]-\infty ; 0]$, de $-\infty$ à $f(0) = 0$ ; décroissante sur $[0 ; 1]$, jusqu’à $f(1) = \frac{4}{e} - 2 \approx -0{,}5$ ; croissante sur $[1 ; +\infty[$, jusqu’à $+\infty$.

**2. c)** $f$ est continue et strictement croissante sur $\left[\frac{3}{2} ; 2\right]$. $f\left(\frac{3}{2}\right) = 6\left(e^{-\frac{3}{2}} - \frac{1}{4}\right)$, avec $e^{-\frac{3}{2}} = \frac{1}{4{,}5} < \frac{1}{4}$, donc $f\left(\frac{3}{2}\right) < 0$ ; et $f(2) = 8e^{-2} > 0$. D’après le théorème des valeurs intermédiaires, il existe un unique $\alpha \in \left]\frac{3}{2} ; 2\right[$ tel que $f(\alpha) = 0$.

**2. d)** $f(\alpha) = 0$ et $\alpha \neq 0$, donc $e^{-\alpha} + \frac{\alpha}{2} - 1 = 0$, soit $e^{-\alpha} = 1 - \frac{\alpha}{2}$.

**3. a)** $f'$ est continue sur $[0 ; 1]$, dérivable sur $]0 ; 1[$, et $f'(0) = f'(1) = 0$. D’après le théorème de Rolle, il existe $x_0 \in ]0 ; 1[$ tel que $f''(x_0) = 0$.

**3. b)** En dérivant $f'(x) = 4\left((1 - x)e^{-x} - 1 + x\right)$ : $f''(x) = 4\left(1 - (2 - x)e^{-x}\right)$ et $f'''(x) = 4(3 - x)e^{-x}$, qui est strictement positive sur $[0 ; 1]$. Pour $x \in [0 ; 1]$, $x \neq x_0$, le théorème des accroissements finis appliqué à $f''$ entre $x_0$ et $x$ donne un réel $c$ entre eux tel que :

$$\frac{f''(x) - f''(x_0)}{x - x_0} = f'''(c) > 0$$

Comme $f''(x_0) = 0$, on obtient $\frac{f''(x)}{x - x_0} > 0$.

**3. c)** D’après 3. b), $f''(x) < 0$ pour $x \in [0 ; x_0[$ et $f''(x) > 0$ pour $x \in ]x_0 ; 1]$ : $f''$ s’annule en changeant de signe en $x_0$, donc $I(x_0, f(x_0))$ est un point d’inflexion de $(C)$.

**4. a)** $\frac{f(x)}{x} = 4\left(e^{-x} + \frac{x}{2} - 1\right)$ tend vers $+\infty$ en $+\infty$ et en $-\infty$. $(C)$ admet donc, en $+\infty$ comme en $-\infty$, une branche parabolique de direction l’axe des ordonnées.

**4. b)** Éléments pour le tracé : $(C)$ passe par $O$ avec une tangente horizontale (maximum local), par le point $(1 ; -0{,}5)$ avec une tangente horizontale (minimum local), coupe l’axe des abscisses en $O$ et en $\alpha \approx 1{,}6$ ; elle monte depuis $-\infty$ à gauche et part vers $+\infty$ à droite, avec deux branches paraboliques verticales. Elle est concave avant $x_0$ et convexe après.

**5. a)** D’après les variations : sur $]-\infty ; 0]$, $f$ croît jusqu’à $f(0) = 0$, donc $f \leq 0$ ; sur $[0 ; 1]$, elle décroît depuis $0$, donc $f \leq 0$ ; sur $[1 ; \alpha]$, elle croît jusqu’à $f(\alpha) = 0$, donc $f \leq 0$. Ainsi $f(x) \leq 0$ pour tout $x \in ]-\infty ; \alpha]$.

**5. b)** Par parties, une primitive de $4xe^{-x}$ est $-4(x + 1)e^{-x}$. Donc :

$$\int_0^\alpha f(x)\,dx = \Big[-4(x + 1)e^{-x}\Big]_0^\alpha + \Big[\tfrac{2}{3}x^3 - 2x^2\Big]_0^\alpha = 4 - 4(\alpha + 1)e^{-\alpha} + \tfrac{2}{3}\alpha^3 - 2\alpha^2$$

Avec $e^{-\alpha} = 1 - \frac{\alpha}{2}$ : $4(\alpha + 1)\left(1 - \frac{\alpha}{2}\right) = 4 + 2\alpha - 2\alpha^2$. Il reste :

$$\int_0^\alpha f(x)\,dx = \tfrac{2}{3}\alpha^3 - 2\alpha = \tfrac{2}{3}\alpha\left(\alpha^2 - 3\right)$$

Comme $f \leq 0$ sur $[0 ; \alpha]$, cette intégrale est négative ou nulle ; avec $\alpha > 0$, on obtient $\alpha^2 \leq 3$, donc $\alpha \leq \sqrt{3}$. Avec 2. c) : $\frac{3}{2} < \alpha \leq \sqrt{3}$.

**5. c)** $f \leq 0$ sur $[0 ; \alpha]$, donc l’aire vaut :

$$\mathcal{A} = -\int_0^\alpha f(x)\,dx = \tfrac{2}{3}\alpha\left(3 - \alpha^2\right) = 2\alpha - \tfrac{2}{3}\alpha^3 \text{ cm}^2$$

### Partie II

Ici $u_0 < \alpha$ et $u_{n+1} = f(u_n) + u_n$.

**1. a)** Par récurrence : $u_0 < \alpha$. Si $u_n < \alpha$, alors $f(u_n) \leq 0$ d’après la partie I, 5. a), donc $u_{n+1} = u_n + f(u_n) \leq u_n < \alpha$.

**1. b)** $u_{n+1} - u_n = f(u_n) \leq 0$ : la suite $(u_n)$ est décroissante.

**2. a)** $g'(x) = -e^{-x} + \frac{1}{2}$ s’annule en $\ln 2$ ; $g$ décroît puis croît, et son minimum est :

$$g(\ln 2) = \frac{1}{2} + \frac{\ln 2}{2} - \frac{3}{4} = \frac{2\ln 2 - 1}{4} \approx \frac{1{,}38 - 1}{4} > 0$$

Donc $g(x) > 0$ pour tout réel $x$.

**2. b)** $f(x) + x = 4x\left(e^{-x} + \frac{x}{2} - 1 + \frac{1}{4}\right) = 4xg(x)$. Par récurrence : $u_0 \geq 0$, et si $u_n \geq 0$, alors $u_{n+1} = 4u_n g(u_n) \geq 0$.

**2. c)** $(u_n)$ est décroissante et minorée par $0$ : elle converge.

**2. d)** Soit $\ell$ sa limite : $0 \leq \ell \leq u_0 < \alpha$. La fonction $x \mapsto f(x) + x$ est continue, donc $\ell = f(\ell) + \ell$, c’est-à-dire $f(\ell) = 0$. D’après les variations, $f$ ne s’annule qu’en $0$ et en $\alpha$ ; comme $\ell < \alpha$, $\lim_{n \to +\infty} u_n = 0$.

**3. a)** La suite est décroissante, donc $u_n \leq u_0 < 0$. $f$ est croissante sur $]-\infty ; 0]$, donc $f(u_n) \leq f(u_0)$, c’est-à-dire $u_{n+1} - u_n \leq f(u_0)$.

**3. b)** Par récurrence : l’égalité a lieu pour $n = 0$, et si $u_n \leq u_0 + nf(u_0)$, alors $u_{n+1} \leq u_n + f(u_0) \leq u_0 + (n + 1)f(u_0)$.

**3. c)** $u_0 < 0$ et $f$ est strictement croissante sur $]-\infty ; 0]$ avec $f(0) = 0$, donc $f(u_0) < 0$. Ainsi $\lim_{n \to +\infty} \left(u_0 + nf(u_0)\right) = -\infty$, et par comparaison $\lim_{n \to +\infty} u_n = -\infty$.
