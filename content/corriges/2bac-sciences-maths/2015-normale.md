---
summary: Nombres complexes (rotation, homothétie, cercle circonscrit), arithmétique (congruences modulo 2015 et petit théorème de Fermat), structures algébriques (un corps de matrices), analyse (la fonction x(1 + ln²x), une suite, une intégrale) et une fonction définie par une intégrale.
---

## Exercice 1 : nombres complexes (3 points)

**1. a)** $\Delta = (5 + i\sqrt{3})^2 - 4(4 + 4i\sqrt{3}) = 25 + 10i\sqrt{3} - 3 - 16 - 16i\sqrt{3} = 6 - 6i\sqrt{3}$. Et $(3 - i\sqrt{3})^2 = 9 - 6i\sqrt{3} - 3 = 6 - 6i\sqrt{3}$.

**1. b)** Les solutions sont $\frac{(5 + i\sqrt{3}) \pm (3 - i\sqrt{3})}{2}$, soit $4$ et $1 + i\sqrt{3}$. Comme $b$ est réel : $b = 4$ et $a = 1 + i\sqrt{3}$.

**1. c)** $(1 - i\sqrt{3})a = (1 - i\sqrt{3})(1 + i\sqrt{3}) = 1 + 3 = 4 = b$.

**2. a)** La rotation de centre $A$ et d’angle $\frac{\pi}{2}$ envoie $O$ sur $B_1$ : $b_1 - a = i(0 - a)$, donc :

$$b_1 = (1 - i)a = (1 - i)(1 + i\sqrt{3}) = (1 + \sqrt{3}) + i(\sqrt{3} - 1)$$

**2. b)** L’image de $B_1$ par l’homothétie de centre $A$ et de rapport $\sqrt{3}$ a pour affixe $a + \sqrt{3}(b_1 - a) = a - i\sqrt{3}\,a = (1 - i\sqrt{3})a = b$ : c’est $B$.

**2. c)** D’après 2. b), $b - a = -i\sqrt{3}\,a$, donc :

$$\frac{b}{b - a} = \frac{(1 - i\sqrt{3})a}{-i\sqrt{3}\,a} = \frac{(1 - i\sqrt{3})\,i}{\sqrt{3}} = 1 + \frac{i}{\sqrt{3}} = \frac{2}{\sqrt{3}}\,e^{i\frac{\pi}{6}}$$

Ainsi $\arg\left(\frac{b}{b - a}\right) \equiv \frac{\pi}{6} \; [2\pi]$.

**2. d)** Les points $O$, $A$, $B$ et $C$ sont distincts et cocycliques, donc le quotient $\frac{0 - c}{a - c} \div \frac{0 - b}{a - b}$ est réel. Or $\frac{0 - c}{a - c} = \frac{c}{c - a}$ et $\frac{0 - b}{a - b} = \frac{b}{b - a}$. Donc :

$$\arg\left(\frac{c}{c - a}\right) \equiv \frac{\pi}{6} \; [\pi]$$

Un argument est $\frac{\pi}{6}$ si $C$ est sur le même arc $OA$ que $B$, et $\frac{7\pi}{6}$ sinon.

## Exercice 2 : arithmétique (3 points)

**1.** $1436 \times 1051 - 2015 \times 749 = 1$ : d’après le théorème de Bézout, $1436$ et $2015$ sont premiers entre eux.

**2. a)** $x^{1439} = 1436 + 2015k$ avec $k \in \mathbb{Z}$, donc $1436 = x^{1439} - 2015k$. Si $d$ divise $x$ et $2015$, il divise $1436$.

**2. b)** $d$ divise alors $1436$ et $2015$, qui sont premiers entre eux : $d = \pm 1$. Donc $x$ et $2015$ sont premiers entre eux.

**3. a)** $2015 = 5 \times 13 \times 31$, et $x$ est premier avec chacun de ces nombres premiers. D’après le petit théorème de Fermat : $x^4 \equiv 1 \; [5]$, $x^{12} \equiv 1 \; [13]$ et $x^{30} \equiv 1 \; [31]$. Comme $1440 = 4 \times 360 = 12 \times 120 = 30 \times 48$, on obtient $x^{1440} \equiv 1$ modulo $5$, $13$ et $31$.

**3. b)** $5$ et $13$ divisent $x^{1440} - 1$ et sont premiers entre eux, donc $65$ le divise. Puis $65$ et $31$ sont premiers entre eux, donc $65 \times 31 = 2015$ divise $x^{1440} - 1$ : $x^{1440} \equiv 1 \; [2015]$.

**4.** $x^{1440} = x \cdot x^{1439} \equiv 1436x \; [2015]$, donc $1436x \equiv 1 \; [2015]$. En multipliant par $1051$ et avec $1436 \times 1051 = 1 + 2015 \times 749 \equiv 1 \; [2015]$ : $x \equiv 1051 \; [2015]$.

## Exercice 3 : structures algébriques (4 points)

**1. a)** $\varphi(x) \mathbin{T} \varphi(y) = M(x - 1) \mathbin{T} M(y - 1) = M(x - 1 + y - 1 + 1) = M(x + y - 1) = \varphi(x + y)$ : $\varphi$ est un morphisme de $(\mathbb{R}, +)$ vers $(E, T)$.

**1. b)** $\varphi$ est bijective : tout $M(t)$ est $\varphi(t + 1)$, et $M(x) = M(y)$ impose $x = y$ (coefficient en haut à droite). L’image du groupe commutatif $(\mathbb{R}, +)$ par ce morphisme est $E$ : $(E, T)$ est un groupe commutatif, de neutre $\varphi(0) = M(-1)$, et le symétrique de $M(x)$ est $M(-x - 2)$.

**2. a)** Avec $s = x + y + xy$, on calcule $M(x) \times M(y)$ :

- coefficient $(1, 1)$ : $(1 - x)(1 - y) - 2xy = 1 - s$ ;
- coefficient $(1, 2)$ : $(1 - x)y + x(1 + 2y) = s$ ;
- coefficient $(2, 1)$ : $-2x(1 - y) - 2y(1 + 2x) = -2s$ ;
- coefficient $(2, 2)$ : $-2xy + (1 + 2x)(1 + 2y) = 1 + 2s$.

C’est $M(x + y + xy)$.

**2. b)** Le produit de deux éléments de $E$ est donc dans $E$ : $E$ est stable pour la multiplication. Et comme $x + y + xy = y + x + yx$, la multiplication est commutative dans $E$.

**2. c)** D’une part, $M(x) \times \big(M(y) \mathbin{T} M(z)\big) = M(x) \times M(y + z + 1) = M(2x + y + z + 1 + xy + xz)$. D’autre part :

$$\big(M(x) \times M(y)\big) \mathbin{T} \big(M(x) \times M(z)\big) = M(x + y + xy) \mathbin{T} M(x + z + xz) = M(2x + y + z + 1 + xy + xz)$$

Avec la commutativité de la multiplication dans $E$, elle est distributive par rapport à $T$.

**2. d)** $M(-1) \mathbin{T} M(x) = M(-1 + x + 1) = M(x)$ : $M(-1)$ est le neutre de $(E, T)$. $I = M(0) \in E$ et $M(0) \times M(x) = M(x)$ : $I$ est le neutre de $(E, \times)$.

**3. a)** Pour $x \neq -1$ : $x - \frac{x}{1 + x} - \frac{x^2}{1 + x} = \frac{x + x^2 - x - x^2}{1 + x} = 0$, donc $M(x) \times M\left(\frac{-x}{1 + x}\right) = M(0) = I$.

**3. b)** $(E, T)$ est un groupe commutatif de neutre $M(-1)$. Sur $E - \{M(-1)\}$ :

- la multiplication est associative et commutative ;
- elle est stable, car $x + y + xy = -1$ équivaut à $(1 + x)(1 + y) = 0$ ;
- son neutre est $I = M(0)$ ;
- tout $M(x)$ a pour inverse $M\left(\frac{-x}{1 + x}\right)$, qui est dans $E - \{M(-1)\}$, car $\frac{-x}{1 + x} = -1$ est impossible.

Avec la distributivité, $(E, T, \times)$ est un corps commutatif.

## Exercice 4 : analyse (6,5 points)

### Première partie

**1.** $\lim_{x \to +\infty} f(x) = +\infty$ et $\frac{f(x)}{x} = 1 + \ln^2 x \to +\infty$ : $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**2. a)** $x\ln^2 x = \left(\sqrt{x}\,\ln x\right)^2$ et $\lim_{x \to 0^+} \sqrt{x}\,\ln x = 0$, donc $\lim_{x \to 0^+} f(x) = 0 = f(0)$ : $f$ est continue à droite en $0$.

**2. b)** $\frac{f(x)}{x} = 1 + \ln^2 x \to +\infty$ quand $x \to 0^+$ : $f$ n’est pas dérivable à droite en $0$, et $(C)$ admet en $O$ une demi-tangente verticale.

**2. c)** Pour $x > 0$ : $f'(x) = 1 + \ln^2 x + x \cdot \frac{2\ln x}{x} = (1 + \ln x)^2$. Cette dérivée est positive et ne s’annule qu’en $\frac{1}{e}$ ; avec la continuité en $0$, $f$ est strictement croissante sur $[0 ; +\infty[$.

**3. a)** $f''(x) = \frac{2(1 + \ln x)}{x}$ a le signe de $1 + \ln x$ : elle change de signe en $\frac{1}{e}$. Le point $I\left(\frac{1}{e} ; \frac{2}{e}\right)$ est un point d’inflexion (avec une tangente horizontale, car $f'\left(\frac{1}{e}\right) = 0$).

**3. b)** $f(x) - x = x\ln^2 x \geq 0$ : $(C)$ est au-dessus de la droite $y = x$, et la touche en $O$ et au point $(1 ; 1)$, où elle lui est tangente car $f'(1) = 1$.

**3. c)** Éléments pour le tracé : départ en $O$ avec une demi-tangente verticale, montée concave jusqu’à $I(0{,}4 ; 0{,}8)$ où la tangente est horizontale, puis montée convexe ; tangente à $y = x$ en $(1 ; 1)$, au-dessus de cette droite, avec une branche parabolique verticale.

### Deuxième partie

**1.** Par récurrence : $e^{-1} \leq u_0 < 1$. Si $e^{-1} \leq u_n < 1$, $f$ étant croissante, $f(e^{-1}) \leq u_{n+1} < f(1)$, soit $\frac{2}{e} \leq u_{n+1} < 1$, et $\frac{2}{e} \geq e^{-1}$.

**2.** $u_{n+1} - u_n = u_n\ln^2 u_n > 0$, car $u_n \in [e^{-1} ; 1[$ et $\ln u_n \neq 0$. La suite est strictement croissante et majorée par $1$ : elle converge.

**3. a)** Par passage à la limite dans $e^{-1} \leq u_n < 1$ : $e^{-1} \leq l \leq 1$.

**3. b)** $f$ est continue sur $[e^{-1} ; 1]$, donc $l = f(l)$, soit $l\ln^2 l = 0$. Comme $l > 0$, $\ln l = 0$ : $l = 1$.

### Troisième partie

**1. a)** $H'(x) = -\frac{x}{2} + x\ln x + \frac{x^2}{2} \cdot \frac{1}{x} = x\ln x$ : $H$ est une primitive de $h$.

**1. b)** On intègre par parties avec $u(t) = \ln^2 t$ et $v'(t) = t$, donc $u'(t) = \frac{2\ln t}{t}$ et $v(t) = \frac{t^2}{2}$ :

$$\int_1^x t\ln^2 t\,dt = \left[\frac{t^2}{2}\ln^2 t\right]_1^x - \int_1^x t\ln t\,dt = \frac{x^2}{2}\ln^2 x - \int_1^x t\ln t\,dt$$

**1. c)** $F(x) = \int_1^x t\,dt + \int_1^x t\ln^2 t\,dt = \frac{x^2 - 1}{2} + \frac{x^2}{2}\ln^2 x - \big(H(x) - H(1)\big)$, avec $H(x) - H(1) = -\frac{x^2}{4} + \frac{x^2}{2}\ln x + \frac{1}{4}$. Donc :

$$F(x) = -\frac{3}{4} + \frac{3x^2}{4} - \frac{x^2}{2}\ln x + \frac{x^2}{2}\ln^2 x$$

**2. a)** $f$ est continue sur $[0 ; +\infty[$ (question 2. a) de la première partie), donc $F$, sa primitive qui s’annule en $1$, est dérivable, et en particulier continue, sur $[0 ; +\infty[$.

**2. b)** $\lim_{x \to 0^+} x^2\ln x = 0$ et $\lim_{x \to 0^+} x^2\ln^2 x = 0$, donc $\lim_{x \to 0^+} F(x) = -\frac{3}{4}$. Par continuité, $F(0) = \int_1^0 f(t)\,dt = -\frac{3}{4}$, d’où :

$$\int_0^1 f(x)\,dx = \frac{3}{4}$$

## Exercice 5 : analyse (3,5 points)

**1. a)** $t \mapsto e^{-t}$ est décroissante : pour $t \in [x ; 2x]$, $e^{-2x} \leq e^{-t} \leq e^{-x}$.

**1. b)** En divisant par $t > 0$ et en intégrant de $x$ à $2x$, avec $\int_x^{2x} \frac{dt}{t} = \ln(2x) - \ln x = \ln 2$ :

$$e^{-2x}\ln 2 \leq g(x) \leq e^{-x}\ln 2$$

**1. c)** Les deux bornes tendent vers $\ln 2$ quand $x \to 0^+$ : $\lim_{x \to 0^+} g(x) = \ln 2 = g(0)$, et $g$ est continue à droite en $0$.

**2.** Soit $G$ une primitive sur $]0 ; +\infty[$ de la fonction continue $t \mapsto \frac{e^{-t}}{t}$. Alors $g(x) = G(2x) - G(x)$ est dérivable, et :

$$g'(x) = 2\,\frac{e^{-2x}}{2x} - \frac{e^{-x}}{x} = \frac{e^{-2x} - e^{-x}}{x}$$

**3. a)** Pour $t > 0$, le théorème des accroissements finis appliqué à $u \mapsto e^{-u}$ sur $[0 ; t]$ donne $c \in ]0 ; t[$ tel que $e^{-t} - 1 = -e^{-c}\,t$. Comme $e^{-t} < e^{-c} < 1$ :

$$-1 \leq \frac{e^{-t} - 1}{t} = -e^{-c} \leq -e^{-t}$$

**3. b)** $g(x) - \ln 2 = \int_x^{2x} \frac{e^{-t} - 1}{t}\,dt$. En intégrant 3. a) sur $[x ; 2x]$, de longueur $x$ : $-x \leq g(x) - \ln 2 \leq \int_x^{2x} -e^{-t}\,dt = e^{-2x} - e^{-x}$. En divisant par $x > 0$ :

$$-1 \leq \frac{g(x) - \ln 2}{x} \leq \frac{e^{-2x} - e^{-x}}{x}$$

**3. c)** $\frac{e^{-2x} - e^{-x}}{x} = \frac{e^{-2x} - 1}{x} - \frac{e^{-x} - 1}{x} \to -2 - (-1) = -1$ quand $x \to 0^+$. Par encadrement, $\lim_{x \to 0^+} \frac{g(x) - g(0)}{x} = -1$ : $g$ est dérivable à droite en $0$ et $g'_d(0) = -1$.
