---
summary: Structures algébriques (un corps isomorphe à ℝ), nombres complexes (rotations, parallélogramme, points cocycliques), arithmétique (aucun n > 1 ne divise 3ⁿ − 2ⁿ) et un problème d’analyse (une fonction définie par une intégrale, une suite récurrente).
---

## Exercice 1 : structures algébriques (3,5 points)

**1. a)** $x * y = x + y - 2 = y * x$, et $(x * y) * z = x + y + z - 4 = x * (y * z)$ : la loi est commutative et associative.

**1. b)** $x * 2 = x$ pour tout réel $x$ : $2$ est l’élément neutre.

**1. c)** Pour tout $x$, $x * (4 - x) = 2$ : tout élément a un symétrique. $(\mathbb{R}, *)$ est un groupe commutatif.

**2. a)** $f$ est une bijection de $\mathbb{R}$ sur $\mathbb{R}$, et :

$$f(x) \mathbin{T} f(y) = (x + 2)(y + 2) - 2(x + 2) - 2(y + 2) + 6 = xy + 2 = f(xy)$$

$f$ est un isomorphisme de $(\mathbb{R}, \times)$ sur $(\mathbb{R}, T)$.

**2. b)** $(x * y) \mathbin{T} z = (x + y - 2)z - 2(x + y - 2) - 2z + 6 = xz + yz - 2x - 2y - 4z + 10$, et $(x \mathbin{T} z) * (y \mathbin{T} z) = (xz - 2x - 2z + 6) + (yz - 2y - 2z + 6) - 2$, qui donne la même chose.

**3.** $(\mathbb{R}, *)$ est un groupe commutatif. La loi $T$ est associative et commutative, avec le neutre $f(1) = 3$, puisque l’isomorphisme $f$ transporte ces propriétés de $(\mathbb{R}, \times)$. Elle est distributive par rapport à $*$ (question 2. b) et commutativité). $(\mathbb{R}, *, T)$ est un anneau commutatif et unitaire.

**4. a)** $x \mathbin{T} y = 2 \iff xy - 2x - 2y + 4 = 0 \iff (x - 2)(y - 2) = 0 \iff x = 2$ ou $y = 2$.

**4. b)** Le zéro de cet anneau est le neutre de $*$, c’est-à-dire $2$. D’après 4. a), un produit $x \mathbin{T} y$ n’est nul que si l’un des facteurs l’est : l’anneau est intègre.

**4. c)** Oui. On remarque aussi que $f(x + y) = x + y + 2 = f(x) * f(y)$ : $f$ est un isomorphisme de l’anneau $(\mathbb{R}, +, \times)$, qui est un corps, sur $(\mathbb{R}, *, T)$. Concrètement, tout $x \neq 2$ s’écrit $f(u)$ avec $u = x - 2 \neq 0$, et a pour inverse $f\left(\frac{1}{u}\right) = 2 + \frac{1}{x - 2}$, puisque $f(u) \mathbin{T} f\left(\frac{1}{u}\right) = f(1) = 3$. $(\mathbb{R}, *, T)$ est un corps commutatif.

## Exercice 2 : nombres complexes (3,5 points)

### Partie I

**1.** $\Delta = (3 + i\sqrt{3})^2a^2 - 8(1 + i\sqrt{3})a^2 = (6 + 6i\sqrt{3} - 8 - 8i\sqrt{3})a^2 = (-2 - 2i\sqrt{3})a^2$, et $(-1 + i\sqrt{3})^2 = 1 - 2i\sqrt{3} - 3 = -2 - 2i\sqrt{3}$.

**2.** Les solutions sont $\frac{(3 + i\sqrt{3})a \pm (-1 + i\sqrt{3})a}{4}$, soit $\frac{1 + i\sqrt{3}}{2}\,a = e^{i\frac{\pi}{3}}a$ et $a$.

### Partie II

**1.** $b - 0 = e^{i\frac{\pi}{3}}(a - 0)$ : $OB = OA$ et $(\overrightarrow{OA}, \overrightarrow{OB}) \equiv \frac{\pi}{3} \; [2\pi]$. Le triangle $OAB$ est équilatéral.

**2. a)** $r^{-1}$ est la rotation de centre $M$ et d’angle $-\frac{\pi}{3}$ : $a_1 - z = e^{-i\frac{\pi}{3}}(a - z)$, donc $a_1 = e^{-i\frac{\pi}{3}}a + \left(1 - e^{-i\frac{\pi}{3}}\right)z$, avec $e^{-i\frac{\pi}{3}} = \frac{1}{2} - i\frac{\sqrt{3}}{2}$ et $1 - e^{-i\frac{\pi}{3}} = \frac{1}{2} + i\frac{\sqrt{3}}{2}$. De même, $b_1 - z = e^{i\frac{\pi}{3}}(b - z)$, donc $b_1 = e^{i\frac{2\pi}{3}}a + \left(1 - e^{i\frac{\pi}{3}}\right)z$, avec $e^{i\frac{2\pi}{3}} = -\frac{1}{2} + i\frac{\sqrt{3}}{2}$ et $1 - e^{i\frac{\pi}{3}} = \frac{1}{2} - i\frac{\sqrt{3}}{2}$. Ce sont les égalités demandées.

**2. b)** En additionnant : $a_1 + b_1 = 0 \cdot a + 1 \cdot z = z = 0 + z$. Les diagonales $[A_1B_1]$ et $[OM]$ ont le même milieu : $OA_1MB_1$ est un parallélogramme.

**3. a)** D’après 2. a), $z - a_1 = e^{-i\frac{\pi}{3}}(z - a)$ et $z - b_1 = e^{i\frac{\pi}{3}}(z - b)$, donc :

$$\frac{z - b_1}{z - a_1} = e^{i\frac{2\pi}{3}}\,\frac{z - b}{z - a} \qquad \text{et} \qquad -\frac{z - b}{z - a} \times \frac{a}{b} = e^{i\pi}e^{-i\frac{\pi}{3}}\,\frac{z - b}{z - a} = e^{i\frac{2\pi}{3}}\,\frac{z - b}{z - a}$$

**3. b)** Comme $M \neq A$ et $M \neq B$, on a $z \neq a_1$ et $z \neq b_1$. $M$, $A_1$, $B_1$ sont alignés si et seulement si $\frac{z - b_1}{z - a_1}$ est réel. D’après 3. a), ce nombre vaut $-\frac{z - b}{z - a} \div \frac{0 - b}{0 - a}$. Il est réel si et seulement si $M$, $O$, $A$, $B$ sont cocycliques ou alignés. Comme $O$, $A$, $B$ ne sont pas alignés (triangle équilatéral), cela équivaut à : $M$, $O$, $A$ et $B$ sont cocycliques.

## Exercice 3 : arithmétique (3 points)

**1. a)** $p$ divise $n$, qui divise $3^n - 2^n$ : $3^n - 2^n \equiv 0 \; [p]$. $p \neq 2$, car $3^n - 2^n$ est impair ; $p \neq 3$, car $3^n - 2^n \equiv -2^n \; [3]$ et $3$ ne divise pas $2^n$. Donc $p \geq 5$.

**1. b)** $p$ est premier et ne divise ni $2$ ni $3$ : d’après le petit théorème de Fermat, $2^{p-1} \equiv 1$ et $3^{p-1} \equiv 1 \; [p]$.

**1. c)** Tout diviseur premier de $p - 1$ est strictement inférieur à $p$, donc ne divise pas $n$ ($p$ est le plus petit diviseur premier de $n$). Ainsi $n$ et $p - 1$ sont premiers entre eux, et le théorème de Bézout donne $(a, b) \in \mathbb{Z}^2$ tel que $an - b(p - 1) = 1$.

**1. d)** $rn = an - qn(p - 1) = 1 + (b - qn)(p - 1)$. Posons $k = b - qn \in \mathbb{Z}$. Comme $rn \geq 0$, $k(p - 1) \geq -1$ avec $p - 1 \geq 4$, donc $k \geq 0$ : $k$ est un entier naturel et $rn = 1 + k(p - 1)$.

**2.** En élevant $3^n \equiv 2^n \; [p]$ à la puissance $r$ : $3^{rn} \equiv 2^{rn} \; [p]$. Or $3^{rn} = 3 \cdot (3^{p-1})^k \equiv 3$ et $2^{rn} = 2 \cdot (2^{p-1})^k \equiv 2 \; [p]$. Donc $3 \equiv 2 \; [p]$ : $p$ divise $1$, ce qui est impossible. Tout entier $n > 1$ ayant un plus petit diviseur premier, aucun entier $n > 1$ ne vérifie $(R)$.

## Problème : analyse (10 points)

### Première partie

**1. a)** $\lim_{x \to 1^+} \frac{\ln x}{x - 1} = 1$, donc $h(x) = \frac{1}{x} \cdot \frac{x - 1}{\ln x} \to 1 = h(1)$ : $h$ est continue à droite en $1$.

**1. b)** $\varphi(x) = x - 1 - \ln x$ vérifie $\varphi'(x) = 1 - \frac{1}{x} > 0$ sur $]1 ; +\infty[$ et $\varphi(1) = 0$, donc $\ln x < x - 1$ pour $x > 1$. Puis :

$$h'(x) = \frac{x\ln x - (x - 1)(\ln x + 1)}{(x\ln x)^2} = \frac{\ln x - x + 1}{(x\ln x)^2} < 0$$

$h$ est strictement décroissante sur $]1 ; +\infty[$.

**2. a)** $h(x) = \frac{1 - \frac{1}{x}}{\ln x} \to 0$ quand $x \to +\infty$. $h$ décroît de $h(1) = 1$ à $0$ (limite en $+\infty$).

**2. b)** Pour $x > 1$, $h(x) > 0$ ; avec la décroissance, $0 < h(x) \leq 1$ pour tout $x \geq 1$.

### Deuxième partie

**1. a)** $\int_x^{x^2} \frac{dt}{t\ln t} = \Big[\ln(\ln t)\Big]_x^{x^2} = \ln(2\ln x) - \ln(\ln x) = \ln 2$.

**1. b)** $\frac{1}{\sqrt{t}\ln t} - \frac{1}{t\ln t} = \frac{\sqrt{t} - 1}{t\ln t}$, donc $g(x) - \ln 2 = \int_x^{x^2} \frac{\sqrt{t} - 1}{t\ln t}\,dt$.

**1. c)** Avec $t = s^2$ ($dt = 2s\,ds$, $s$ allant de $\sqrt{x}$ à $x$) :

$$g(x) - \ln 2 = \int_{\sqrt{x}}^{x} \frac{s - 1}{s^2 \cdot 2\ln s} \cdot 2s\,ds = \int_{\sqrt{x}}^{x} \frac{s - 1}{s\ln s}\,ds = \int_{\sqrt{x}}^{x} h(s)\,ds$$

**2. a)** Pour $x > 1$, $\sqrt{x} < x$ et $h$ est décroissante : $h(x) \leq h(s) \leq h(\sqrt{x})$ sur $[\sqrt{x} ; x]$. En intégrant sur cet intervalle de longueur $x - \sqrt{x}$ : $(x - \sqrt{x})h(x) \leq g(x) - \ln 2 \leq (x - \sqrt{x})h(\sqrt{x})$.

**2. b)** $\frac{x - \sqrt{x}}{x - 1} = \frac{\sqrt{x}}{\sqrt{x} + 1} \to \frac{1}{2}$, et $h(x) \to 1$, $h(\sqrt{x}) \to 1$ quand $x \to 1^+$. En divisant 2. a) par $x - 1 > 0$, on obtient $\lim_{x \to 1^+} \frac{g(x) - g(1)}{x - 1} = \frac{1}{2}$ : $g$ est dérivable à droite en $1$ et $g'_d(1) = \frac{1}{2}$.

**2. c)** $g(x) \geq \ln 2 + \frac{(x - \sqrt{x})(x - 1)}{x\ln x}$, et ce minorant tend vers $+\infty$ (il se comporte comme $\frac{x}{\ln x}$) : $\lim_{x \to +\infty} g(x) = +\infty$. Par ailleurs $0 < \frac{g(x)}{x} \leq \frac{\ln 2}{x} + h(\sqrt{x})$, et $h(\sqrt{x}) \to 0$ : $\lim_{x \to +\infty} \frac{g(x)}{x} = 0$.

**3. a)** Soit $G$ une primitive sur $]1 ; +\infty[$ de la fonction continue $t \mapsto \frac{1}{\sqrt{t}\ln t}$. Alors $g(x) = G(x^2) - G(x)$ est dérivable sur $]1 ; +\infty[$ et :

$$g'(x) = \frac{2x}{x\ln(x^2)} - \frac{1}{\sqrt{x}\ln x} = \frac{1}{\ln x} - \frac{1}{\sqrt{x}\ln x} = \frac{\sqrt{x} - 1}{\sqrt{x}\ln x} = \frac{1}{2}\cdot\frac{\sqrt{x} - 1}{\sqrt{x}\ln\sqrt{x}} = \frac{1}{2}h(\sqrt{x})$$

**3. b)** D’après la première partie, $0 < h(\sqrt{x}) \leq 1$, donc $0 < g'(x) \leq \frac{1}{2}$ pour $x > 1$, et $g'_d(1) = \frac{1}{2}$. $g$ est strictement croissante sur $[1 ; +\infty[$, de $\ln 2$ à $+\infty$.

**3. c)** Éléments pour le tracé : $(C)$ part du point $(1 ; \ln 2)$ avec une demi-tangente de coefficient directeur $\frac{1}{2}$ ; elle est croissante et concave ($g'$ décroît, car $h$ décroît et $\sqrt{x}$ croît) ; elle admet en $+\infty$ une branche parabolique de direction l’axe des abscisses.

### Troisième partie

**I. 1.** $k'(x) = g'(x) - 1 \leq -\frac{1}{2} < 0$ : $k$ est continue et strictement décroissante sur $[1 ; +\infty[$. $k(1) = \ln 2$ et $k(x) = x\left(\frac{g(x)}{x} - 1 + \frac{1}{x}\right) \to -\infty$. $k$ est une bijection de $[1 ; +\infty[$ sur $]-\infty ; \ln 2]$.

**I. 2.** $0 \in ]-\infty ; \ln 2]$ a un unique antécédent $\alpha$ : $k(\alpha) = 0$, c’est-à-dire $1 + g(\alpha) = \alpha$. Comme $k(1) = \ln 2 \neq 0$, $\alpha > 1$.

**II. 1. a)** Par récurrence : $1 \leq u_0 < \alpha$. Si $1 \leq u_n < \alpha$, $g$ étant croissante, $1 + \ln 2 \leq u_{n+1} < 1 + g(\alpha) = \alpha$.

**II. 1. b)** $u_{n+1} - u_n = k(u_n) > k(\alpha) = 0$, car $u_n < \alpha$ et $k$ est strictement décroissante.

**II. 1. c)** La suite est croissante et majorée par $\alpha$ : elle converge vers $l \in [1 ; \alpha]$. La fonction $x \mapsto 1 + g(x)$ est continue sur $[1 ; +\infty[$, donc $l = 1 + g(l)$, soit $k(l) = 0$, et $l = \alpha$.

**II. 2. a)** $g$ est dérivable sur $[1 ; +\infty[$ (à droite en $1$) avec $0 < g' \leq \frac{1}{2}$. D’après l’inégalité des accroissements finis, $|g(u_n) - g(\alpha)| \leq \frac{1}{2}|u_n - \alpha|$, c’est-à-dire $|u_{n+1} - \alpha| \leq \frac{1}{2}|u_n - \alpha|$.

**II. 2. b)** Par récurrence, à partir de l’égalité au rang $0$ et de 2. a) : $|u_n - \alpha| \leq \left(\frac{1}{2}\right)^n|u_0 - \alpha|$.

**II. 2. c)** $\left(\frac{1}{2}\right)^n \to 0$, donc par encadrement $\lim_{n \to +\infty} u_n = \alpha$.
