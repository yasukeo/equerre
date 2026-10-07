---
summary: Une sphère de diamètre [AB] coupée par un plan et l’aire d’un triangle, la forme trigonométrique de 2 + √2 + i√2 par l’angle moitié, deux urnes, et un problème sur 1/(x(1 − ln x)) avec une fonction auxiliaire lue sur un graphique, une aire et une suite récurrente.
---

## Exercice 1 : géométrie dans l’espace (3 points)

**1.** $\vec{u}$ est normal à $(P)$, qui a une équation $x + y - z + d = 0$. Avec $A(2 ; 1 ; 0)$ : $3 + d = 0$, d’où $(P) : x + y - z - 3 = 0$.

**2.** $\overrightarrow{MA}(2 - x ; 1 - y ; -z)$ et $\overrightarrow{MB}(-4 - x ; 1 - y ; -z)$, donc :

$$\overrightarrow{MA} \cdot \overrightarrow{MB} = (x - 2)(x + 4) + (y - 1)^2 + z^2 = (x + 1)^2 - 9 + (y - 1)^2 + z^2$$

$\overrightarrow{MA} \cdot \overrightarrow{MB} = 0 \iff (x + 1)^2 + (y - 1)^2 + z^2 = 9$ : $(S)$ est la sphère de centre $\Omega(-1 ; 1 ; 0)$ et de rayon $3$ (la sphère de diamètre $[AB]$).

**3. a)** $d(\Omega, (P)) = \frac{|-1 + 1 - 0 - 3|}{\sqrt{3}} = \frac{3}{\sqrt{3}} = \sqrt{3}$. Comme $\sqrt{3} < 3$, $(P)$ coupe $(S)$ suivant un cercle $(C)$, de rayon $\sqrt{9 - 3} = \sqrt{6}$.

**3. b)** Le centre de $(C)$ est le projeté orthogonal de $\Omega$ sur $(P)$. La droite passant par $\Omega$ et dirigée par $\vec{u}$ s’écrit $x = -1 + t$, $y = 1 + t$, $z = -t$. Dans l’équation de $(P)$ : $(-1 + t) + (1 + t) + t - 3 = 3t - 3 = 0$, soit $t = 1$. Le centre est $H(0 ; 2 ; -1)$.

**4.** $\overrightarrow{OH}(0 ; 2 ; -1)$ et $\overrightarrow{OB}(-4 ; 1 ; 0)$, donc :

$$\overrightarrow{OH} \wedge \overrightarrow{OB} = (2 \times 0 - (-1) \times 1)\,\vec{i} + ((-1) \times (-4) - 0 \times 0)\,\vec{j} + (0 \times 1 - 2 \times (-4))\,\vec{k} = \vec{i} + 4\vec{j} + 8\vec{k}$$

L’aire du triangle $OHB$ vaut $\frac{1}{2}\|\overrightarrow{OH} \wedge \overrightarrow{OB}\| = \frac{1}{2}\sqrt{1 + 16 + 64} = \frac{9}{2}$.

## Exercice 2 : nombres complexes (3 points)

### Partie I

**1.** $|a|^2 = (2 + \sqrt{2})^2 + 2 = 8 + 4\sqrt{2} = 4(2 + \sqrt{2})$, donc $|a| = 2\sqrt{2 + \sqrt{2}}$.

**2.** $\cos\frac{\pi}{4} = \sin\frac{\pi}{4} = \frac{\sqrt{2}}{2}$, donc $2\left(1 + \cos\frac{\pi}{4}\right) + 2i\sin\frac{\pi}{4} = 2 + \sqrt{2} + i\sqrt{2} = a$.

**3. a)** $\cos 2\theta = 2\cos^2\theta - 1$, donc $1 + \cos 2\theta = 2\cos^2\theta$.

**3. b)** Avec $\theta = \frac{\pi}{8}$ : $1 + \cos\frac{\pi}{4} = 2\cos^2\frac{\pi}{8}$ et $\sin\frac{\pi}{4} = 2\cos\frac{\pi}{8}\sin\frac{\pi}{8}$. D’après 2., $a = 4\cos^2\frac{\pi}{8} + 4i\cos\frac{\pi}{8}\sin\frac{\pi}{8}$.

**3. c)** $a = 4\cos\frac{\pi}{8}\left(\cos\frac{\pi}{8} + i\sin\frac{\pi}{8}\right)$, et $4\cos\frac{\pi}{8} > 0$ car $\frac{\pi}{8} \in \left]0 ; \frac{\pi}{2}\right[$ : c’est une forme trigonométrique de $a$, de module $4\cos\frac{\pi}{8} = 2\sqrt{2 + \sqrt{2}}$ et d’argument $\frac{\pi}{8}$. Par la formule de Moivre :

$$a^4 = \left(2\sqrt{2 + \sqrt{2}}\right)^4\left(\cos\frac{\pi}{2} + i\sin\frac{\pi}{2}\right) = \left(2\sqrt{2 + \sqrt{2}}\right)^4 i$$

### Partie II

**1.** $b = \omega + i(a - \omega) = \sqrt{2} + i(2 + i\sqrt{2}) = \sqrt{2} + 2i - \sqrt{2} = 2i$.

**2.** $|z - 2i| = 2 \iff BM = 2$ : l’ensemble cherché est le cercle de centre $B$ et de rayon $2$.

## Exercice 3 : probabilités (3 points)

**I.** On tire simultanément $3$ boules parmi les $7$ de $U_1$ : $\binom{7}{3} = 35$ tirages équiprobables. $A$ : une rouge parmi $4$ et deux vertes parmi $3$, $4 \times 3 = 12$ tirages, donc $p(A) = \frac{12}{35}$. $B$ : trois rouges ou trois vertes, $\binom{4}{3} + \binom{3}{3} = 5$ tirages, donc $p(B) = \frac{5}{35} = \frac{1}{7}$.

**II.** $C$ est réalisé si l’on tire deux rouges de $U_1$, de probabilité $\frac{\binom{4}{2}}{\binom{7}{2}} = \frac{6}{21} = \frac{2}{7}$, puis une rouge de $U_2$, de probabilité $\frac{3}{5}$. Les deux tirages sont indépendants : $p(C) = \frac{2}{7} \times \frac{3}{5} = \frac{6}{35}$.

## Problème (11 points)

### Partie I

**1.** $f(x)$ existe si et seulement si $x > 0$ et $1 - \ln x \neq 0$, c’est-à-dire $x \neq e$. Donc $D_f = ]0 ; e[ \cup ]e ; +\infty[$.

**2. a)** Quand $x \to e^-$, $\ln x < 1$ et $1 - \ln x \to 0^+$, donc $\lim_{x \to e^-} f(x) = +\infty$. Quand $x \to e^+$, $1 - \ln x \to 0^-$, donc $\lim_{x \to e^+} f(x) = -\infty$. La droite $x = e$ est asymptote verticale à $(C_f)$.

**2. b)** Quand $x \to +\infty$, $x(1 - \ln x) \to -\infty$, donc $\lim_{x \to +\infty} f(x) = 0$ : l’axe des abscisses est asymptote horizontale à $(C_f)$ au voisinage de $+\infty$.

**2. c)** $x(1 - \ln x) = x - x\ln x \to 0$ quand $x \to 0^+$, en restant positif : $\lim_{x \to 0^+} f(x) = +\infty$. L’axe des ordonnées est asymptote verticale.

**3. a)** Posons $D(x) = x - x\ln x$ : $D'(x) = 1 - \ln x - 1 = -\ln x$. Donc :

$$f'(x) = -\frac{D'(x)}{D(x)^2} = \frac{\ln x}{x^2(1 - \ln x)^2}$$

**3. b)** $f'(x)$ a le signe de $\ln x$ : $f$ est décroissante sur $]0 ; 1]$ et croissante sur $[1 ; e[$ et sur $]e ; +\infty[$.

**3. c)** Sur $]0 ; e[$, $f$ décroît de $+\infty$ à $f(1) = 1$ puis croît jusqu’à $+\infty$ ; sur $]e ; +\infty[$, elle croît de $-\infty$ à $0$.

### Partie II

**1. a)** D’après le graphique, $(C_g)$ coupe l’axe des abscisses en deux points : l’équation $(E)$ a deux solutions, $1$ (car $g(1) = 1 - 1 = 0$) et un nombre $\alpha$ voisin de $2{,}2$.

**1. b)** $g$ est continue sur $[2{,}2 ; 2{,}3]$, avec $g(2{,}2) \approx -0{,}02 < 0$ et $g(2{,}3) \approx 0{,}12 > 0$ : d’après le théorème des valeurs intermédiaires, $(E)$ a une solution $\alpha$ telle que $2{,}2 < \alpha < 2{,}3$.

**2. a)** $f(x) - x = \frac{1 - x^2(1 - \ln x)}{x(1 - \ln x)} = \frac{g(x)}{x(1 - \ln x)}$.

**2. b)** Pour $x \in D_f$, $f(x) = x \iff g(x) = 0 \iff x = 1$ ou $x = \alpha$, et ces deux nombres sont dans $D_f$ ($\alpha < 2{,}3 < e$). $(\Delta)$ coupe $(C_f)$ aux points d’abscisses $1$ et $\alpha$.

**2. c)** D’après le graphique, $g(x) \leq 0$ sur $[1 ; \alpha]$. Sur cet intervalle, inclus dans $]0 ; e[$, $x(1 - \ln x) > 0$ : donc $f(x) - x \leq 0$.

**3.** Éléments pour le tracé (unité $2$ cm) : asymptotes $x = 0$, $x = e$ et $y = 0$ (en $+\infty$). Sur $]0 ; e[$, $(C_f)$ descend jusqu’au minimum $(1 ; 1)$, situé sur $(\Delta)$, où la tangente est horizontale, reste au-dessous de $(\Delta)$ jusqu’au point $(\alpha ; \alpha)$ avec $\alpha \approx 2{,}22$, puis monte vers $+\infty$. Sur $]e ; +\infty[$, elle monte de $-\infty$ vers $0$ en restant négative. Quelques valeurs : $f(0{,}5) \approx 1{,}18$, $f(2) \approx 1{,}63$, $f(4) \approx -0{,}65$.

**4. a)** $\frac{1}{x(1 - \ln x)} = \frac{\frac{1}{x}}{1 - \ln x} = -\frac{u'(x)}{u(x)}$ avec $u(x) = 1 - \ln x > 0$ sur $[1 ; \sqrt{e}]$. Donc :

$$\int_1^{\sqrt{e}} \frac{dx}{x(1 - \ln x)} = \Big[-\ln(1 - \ln x)\Big]_1^{\sqrt{e}} = -\ln\frac{1}{2} + \ln 1 = \ln 2$$

**4. b)** $\sqrt{e} \approx 1{,}65 < \alpha$, donc $f(x) \leq x$ sur $[1 ; \sqrt{e}]$ d’après 2. c). L’aire vaut :

$$\int_1^{\sqrt{e}} \big(x - f(x)\big)\,dx = \left[\frac{x^2}{2}\right]_1^{\sqrt{e}} - \ln 2 = \frac{e - 1}{2} - \ln 2$$

en unités d’aire. Une unité d’aire vaut $4$ cm² : l’aire est $\big(2(e - 1) - 4\ln 2\big)$ cm², soit environ $0{,}66$ cm².

### Partie III

**1.** Par récurrence : $1 \leq u_0 = 2 \leq \alpha$ car $\alpha > 2{,}2$. Si $1 \leq u_n \leq \alpha$, comme $f$ est croissante sur $[1 ; e[$, qui contient $[1 ; \alpha]$ : $f(1) \leq f(u_n) \leq f(\alpha)$, soit $1 \leq u_{n+1} \leq \alpha$, car $f(1) = 1$ et $f(\alpha) = \alpha$.

**2.** $u_n \in [1 ; \alpha]$, donc d’après II. 2. c), $u_{n+1} - u_n = f(u_n) - u_n \leq 0$ : la suite est décroissante.

**3.** Elle est décroissante et minorée par $1$, donc elle converge vers un réel $\ell \in [1 ; \alpha]$. $f$ est continue sur $[1 ; \alpha]$, donc $\ell = f(\ell)$, soit $\ell = 1$ ou $\ell = \alpha$. Comme la suite décroît, $\ell \leq u_0 = 2 < \alpha$. Donc $\lim_{n \to +\infty} u_n = 1$.
