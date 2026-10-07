---
summary: Structures algébriques (un groupe sur ]0, 1[ et un sous-groupe), arithmétique (10ˣ ≡ 2 modulo 19), nombres complexes (équation du troisième degré, deux rotations), analyse (la fonction x + ln x et sa réciproque, une suite) et une suite définie par une équation polynomiale.
---

## Exercice 1 : structures algébriques (3,5 points)

Notons $u(x) = \frac{1 - x}{x}$ : c’est une bijection de $]0 ; 1[$ sur $]0 ; +\infty[$, de réciproque $v \mapsto \frac{1}{1 + v}$.

**1. a)** Pour $x, y \in ]0 ; 1[$, $xy > 0$ et $(1 - x)(1 - y) > 0$, donc le dénominateur est strictement supérieur à $xy > 0$ : $0 < x * y < 1$. La loi est interne dans $I$.

**1. b)** La commutativité est claire. De plus $\frac{1}{x * y} = 1 + \frac{(1 - x)(1 - y)}{xy}$, donc $u(x * y) = u(x)\,u(y)$. Ainsi $u\big((x * y) * z\big) = u(x)u(y)u(z) = u\big(x * (y * z)\big)$, et comme $u$ est injective, la loi est associative.

**1. c)** $x * e = x \iff u(x)u(e) = u(x) \iff u(e) = 1 \iff e = \frac{1}{2}$. L’élément neutre est $\frac{1}{2}$.

**2.** Pour $x \in I$, $x' = 1 - x \in I$ vérifie $u(x') = \frac{x}{1 - x} = \frac{1}{u(x)}$, donc $x * x' = \frac{1}{2}$. $(I, *)$ est un groupe commutatif.

**3. a)** $H$ contient $1 = 2^0$, et $2^m \times (2^n)^{-1} = 2^{m - n} \in H$ : $H$ est un sous-groupe de $(\mathbb{R}_+^*, \times)$.

**3. b)** $1 - \varphi(x) = \frac{x}{1 + x}$, donc :

$$\varphi(x) * \varphi(y) = \frac{\frac{1}{(1 + x)(1 + y)}}{\frac{1}{(1 + x)(1 + y)} + \frac{xy}{(1 + x)(1 + y)}} = \frac{1}{1 + xy} = \varphi(xy)$$

$\varphi$ est un morphisme de $(H, \times)$ vers $(I, *)$.

**3. c)** $K = \varphi(H)$ est l’image d’un groupe par un morphisme : c’est un sous-groupe de $(I, *)$.

## Exercice 2 : arithmétique (2,5 points)

**1. a)** $10^{x+1} = 10 \times 10^x \equiv 20 \equiv 1 \; [19]$.

**1. b)** $19$ est premier et ne divise pas $10$ : d’après le petit théorème de Fermat, $10^{18} \equiv 1 \; [19]$.

**2. a)** D’après le théorème de Bézout, il existe des entiers naturels $u$ et $v$ tels que $18u = d + (x + 1)v$ (on peut toujours choisir $u$ et $v$ positifs en ajoutant des multiples convenables). Alors $10^{18u} = 10^d \times 10^{(x+1)v}$, et d’après 1. a) et 1. b) : $1 \equiv 10^d \times 1 \; [19]$, soit $10^d \equiv 1 \; [19]$.

**2. b)** $d$ divise $18$, donc $d \in \{1, 2, 3, 6, 9, 18\}$. Modulo $19$ : $10^1 \equiv 10$, $10^2 = 100 \equiv 5$, $10^3 \equiv 50 \equiv 12$, $10^6 \equiv 12^2 = 144 \equiv 11$, $10^9 \equiv 11 \times 12 = 132 \equiv 18$. Aucun ne vaut $1$, donc $d = 18$.

**2. c)** $18$ divise $x + 1$, donc $x \equiv -1 \equiv 17 \; [18]$.

## Exercice 3 : nombres complexes (4 points)

### Première partie

**1.** Avec $z = -2i$ : $z^2 = -4$ et $z^3 = 8i$, donc :

$$8i + 4(1 + 2i) - 6i(1 + i) - 10(1 + i) = (4 + 6 - 10) + i(8 + 8 - 6 - 10) = 0$$

**2.** $(z + 2i)(z^2 + \alpha z + \beta) = z^3 + (\alpha + 2i)z^2 + (\beta + 2i\alpha)z + 2i\beta$. Par identification : $\alpha + 2i = -1 - 2i$, donc $\alpha = -1 - 4i$ ; $2i\beta = -10(1 + i)$, donc $\beta = 5i(1 + i) = -5 + 5i$. On vérifie que $\beta + 2i\alpha = -5 + 5i - 2i + 8 = 3 + 3i$.

**3. a)** $(x + iy)^2 = 5 - 12i$ donne $x^2 - y^2 = 5$, $x^2 + y^2 = 13$ et $xy < 0$ : $x^2 = 9$ et $y^2 = 4$. Les racines carrées sont $3 - 2i$ et $-3 + 2i$.

**3. b)** Le discriminant de $z^2 - (1 + 4i)z - 5 + 5i$ est $(1 + 4i)^2 + 20 - 20i = 5 - 12i$. Ses racines sont $\frac{(1 + 4i) \pm (3 - 2i)}{2}$, soit $2 + i$ et $-1 + 3i$. L’ensemble des solutions de $(E)$ est $\{-2i ; 2 + i ; -1 + 3i\}$.

### Deuxième partie

**1.** $\frac{a - c}{b - c} = \frac{-3 + 2i}{-2 - 3i} = -i$, car $-i(-2 - 3i) = 2i - 3$. Donc $CA = CB$ et $(\overrightarrow{CB}, \overrightarrow{CA}) \equiv -\frac{\pi}{2} \; [2\pi]$ : le triangle $ABC$ est rectangle et isocèle en $C$.

**2. a)** $z' - b = e^{i\frac{\pi}{3}}(z - b)$, avec $e^{i\frac{\pi}{3}} = \frac{1 + i\sqrt{3}}{2}$ et $b\left(1 - e^{i\frac{\pi}{3}}\right) = -2i\left(\frac{1}{2} - i\frac{\sqrt{3}}{2}\right) = -\sqrt{3} - i$. Donc $z' = \frac{1 + i\sqrt{3}}{2}\,z - \sqrt{3} - i$.

**2. b)** $z_2 - a = e^{-i\frac{2\pi}{3}}(z - a)$, avec $e^{-i\frac{2\pi}{3}} = -\frac{1}{2} - i\frac{\sqrt{3}}{2}$ et $a\left(1 - e^{-i\frac{2\pi}{3}}\right) = (-1 + 3i)\left(\frac{3}{2} + i\frac{\sqrt{3}}{2}\right) = -\frac{3 + 3\sqrt{3}}{2} + i\,\frac{9 - \sqrt{3}}{2}$. Donc :

$$z_2 = \left(-\frac{1}{2} - i\frac{\sqrt{3}}{2}\right)z - \frac{3 + 3\sqrt{3}}{2} + i\,\frac{9 - \sqrt{3}}{2}$$

**2. c)** Les coefficients de $z$ dans $z_1$ et $z_2$ sont opposés : $\frac{z_1 + z_2}{2}$ ne dépend pas de $z$. Le milieu $I$ de $[M_1M_2]$ est le point fixe d’affixe :

$$\frac{1}{2}\left(-\sqrt{3} - i - \frac{3 + 3\sqrt{3}}{2} + i\,\frac{9 - \sqrt{3}}{2}\right) = \frac{-3 - 5\sqrt{3}}{4} + i\,\frac{7 - \sqrt{3}}{4}$$

## Exercice 4 : analyse (6 points)

**1.** $\lim_{x \to +\infty} f(x) = +\infty$ et $\lim_{x \to 0^+} f(x) = -\infty$. $\frac{f(x)}{x} = 1 + \frac{\ln x}{x} \to 1$ et $f(x) - x = \ln x \to +\infty$ : $(C)$ admet en $+\infty$ une branche parabolique de direction la droite $y = x$.

**2. a)** $f'(x) = 1 + \frac{1}{x} > 0$ : $f$ est strictement croissante sur $]0 ; +\infty[$, de $-\infty$ à $+\infty$.

**2. b)** $f$ est continue et strictement croissante : c’est une bijection de $]0 ; +\infty[$ sur $J = \mathbb{R}$. $f^{-1}$ est strictement croissante sur $\mathbb{R}$, de limite $0$ en $-\infty$ et $+\infty$ en $+\infty$.

**3.** $f(1) = 1$ et $f(e) = e + 1$. Éléments pour le tracé : $(C)$ a pour asymptote l’axe des ordonnées, passe par $(1 ; 1)$ avec une tangente de coefficient directeur $2$, et par $(e ; e + 1)$. $(C')$ est la symétrique de $(C)$ par rapport à la droite $y = x$ : elle passe par $(1 ; 1)$ et $(e + 1 ; e)$, avec l’axe des abscisses pour asymptote en $-\infty$.

**4. a)** Avec $x = f(t) = t + \ln t$, $dx = \left(1 + \frac{1}{t}\right)dt$, et $t$ va de $1$ à $e$ :

$$\int_1^{e+1} f^{-1}(x)\,dx = \int_1^e t\left(1 + \frac{1}{t}\right)dt = \left[\frac{t^2}{2} + t\right]_1^e = \frac{e^2 + 2e - 3}{2}$$

**4. b)** Pour $x \geq 1$, $t = f^{-1}(x) \geq 1$, donc $x = t + \ln t \geq t$ : $(C')$ est au-dessous de la droite $y = x$. L’aire vaut :

$$\int_1^{e+1}\left(x - f^{-1}(x)\right)dx = \frac{(e + 1)^2 - 1}{2} - \frac{e^2 + 2e - 3}{2} = \frac{3}{2} \text{ cm}^2$$

**5. a)** $f$ est une bijection de $]0 ; +\infty[$ sur $\mathbb{R}$ : l’équation $f(x) = n$ a une unique solution $x_n = f^{-1}(n)$.

**5. b)** $f(1) = 1$, donc $x_1 = 1$. Et $x_n = f^{-1}(n) \to +\infty$, puisque $f^{-1}$ tend vers $+\infty$ en $+\infty$.

**6. a)** $f(n) = n + \ln n \geq n = f(x_n)$ et $f$ est croissante : $x_n \leq n$.

**6. b)** $0 < n - \ln n \leq n$, donc $\ln(n - \ln n) \leq \ln n$ et $f(n - \ln n) \leq n - \ln n + \ln n = n = f(x_n)$. Par croissance de $f$ : $n - \ln n \leq x_n$.

**6. c)** $-\frac{\ln n}{n} \leq \frac{x_n - n}{n} \leq 0$, donc $\lim_{n \to +\infty} \frac{x_n - n}{n} = 0$. Et $1 \leq \frac{x_n}{n - \ln n} \leq \frac{n}{n - \ln n} = \frac{1}{1 - \frac{\ln n}{n}}$, donc $\lim_{n \to +\infty} \frac{x_n}{n - \ln n} = 1$.

## Exercice 5 : analyse (4 points)

**1.** Pour $n \geq 2$, $f_n$ est continue sur $[0 ; 1]$ et $f_n'(x) = 1 + x + \cdots + x^{n-1} > 0$ : elle est strictement croissante. $f_n(0) = -1 < 0$ et $f_n(1) = \frac{1}{2} + \cdots + \frac{1}{n} > 0$. Il existe donc un unique $\alpha_n \in ]0 ; 1[$ tel que $f_n(\alpha_n) = 0$.

**2.** $f_{n+1}(\alpha_n) = f_n(\alpha_n) + \frac{\alpha_n^{n+1}}{n + 1} > 0 = f_{n+1}(\alpha_{n+1})$, et $f_{n+1}$ est strictement croissante sur $[0 ; 1]$, donc $\alpha_{n+1} < \alpha_n$. La suite est strictement décroissante et minorée par $0$ : elle converge vers $\ell$.

**3. a)** Pour $t \neq 1$, la somme géométrique vaut $\frac{1 - t^n}{1 - t} = \frac{1}{1 - t} - \frac{t^n}{1 - t}$.

**3. b)** On intègre 3. a) de $0$ à $\alpha_n < 1$ :

$$\alpha_n + \frac{\alpha_n^2}{2} + \cdots + \frac{\alpha_n^n}{n} = \Big[-\ln(1 - t)\Big]_0^{\alpha_n} - \int_0^{\alpha_n} \frac{t^n}{1 - t}\,dt = -\ln(1 - \alpha_n) - \int_0^{\alpha_n} \frac{t^n}{1 - t}\,dt$$

**4. a)** $f_n(\alpha_n) = 0$ signifie que le premier membre de 3. b) vaut $1$. Donc $1 + \ln(1 - \alpha_n) = -\int_0^{\alpha_n} \frac{t^n}{1 - t}\,dt$.

**4. b)** Pour $t \in [0 ; \alpha_n]$, $0 \leq \frac{t^n}{1 - t} \leq \frac{t^n}{1 - \alpha_n}$. En intégrant : $0 \leq \int_0^{\alpha_n} \frac{t^n}{1 - t}\,dt \leq \frac{\alpha_n^{n+1}}{(n + 1)(1 - \alpha_n)} \leq \frac{1}{(n + 1)(1 - \alpha_n)}$.

**4. c)** $\alpha_n \leq \alpha_2 < 1$, donc $\frac{1}{(n + 1)(1 - \alpha_n)} \leq \frac{1}{(n + 1)(1 - \alpha_2)} \to 0$. L’intégrale tend vers $0$, donc $\ln(1 - \alpha_n) \to -1$. Par continuité ($\ell \leq \alpha_2 < 1$), $\ln(1 - \ell) = -1$, soit $\ell = 1 - e^{-1}$.
