---
summary: Analyse (la fonction ln(1 − x) et sa réciproque, une suite définie par une équation polynomiale), une fonction définie par une intégrale et une somme de Riemann, nombres complexes (équation du second degré, orthogonalité) et arithmétique (diviseurs premiers de 1 + a + … + a⁶).
---

## Exercice 1 : analyse (8 points)

### Partie I

Ici $f(x) = \ln(1 - x)$ sur $I = ]-\infty ; 1[$.

**1. a)** $x \mapsto 1 - x$ est continue et strictement positive sur $I$, et $\ln$ est continue sur $]0 ; +\infty[$ : par composition, $f$ est continue sur $I$.

**1. b)** $f$ est dérivable sur $I$ et $f'(x) = \frac{-1}{1 - x} < 0$ : $f$ est strictement décroissante sur $I$.

**1. c)** Quand $x \to 1^-$, $1 - x \to 0^+$, donc $\lim_{x \to 1^-} f(x) = -\infty$. Quand $x \to -\infty$, $1 - x \to +\infty$, donc $\lim_{x \to -\infty} f(x) = +\infty$. Enfin, en posant $t = 1 - x$ :

$$\frac{f(x)}{x} = \frac{\ln(1 - x)}{1 - x} \cdot \frac{1 - x}{x}$$

Quand $x \to -\infty$, $t \to +\infty$ et $\frac{\ln t}{t} \to 0$, tandis que $\frac{1 - x}{x} \to -1$. Donc $\lim_{x \to -\infty} \frac{f(x)}{x} = 0$.

**1. d)** La droite d’équation $x = 1$ est asymptote verticale à $(C)$. En $-\infty$, $f(x) \to +\infty$ et $\frac{f(x)}{x} \to 0$ : $(C)$ admet une branche parabolique de direction l’axe des abscisses.

**1. e)** $f$ est strictement décroissante sur $I$ : elle décroît de $+\infty$ (en $-\infty$) à $-\infty$ (en $1$), et s’annule en $0$.

**2. a)** $f''(x) = \frac{-1}{(1 - x)^2} < 0$ sur $I$ : la courbe $(C)$ est concave.

**2. b)** Éléments pour le tracé : $(C)$ passe par $O(0 ; 0)$ avec la tangente $y = -x$ (car $f'(0) = -1$), par le point d’abscisse $1 - e \approx -1{,}72$ et d’ordonnée $1$, et par le point d’abscisse $1 - \frac{1}{e} \approx 0{,}63$ et d’ordonnée $-1$. Elle est concave, admet l’asymptote $x = 1$ et une branche parabolique de direction $(Ox)$ en $-\infty$.

**3. a)** $f$ est continue et strictement décroissante sur $I$ : c’est une bijection de $I$ sur $f(I) = \left]\lim_{x \to 1^-} f(x) ; \lim_{x \to -\infty} f(x)\right[ = \mathbb{R}$.

**3. b)** Pour $x \in \mathbb{R}$ et $y \in I$ : $f(y) = x \iff \ln(1 - y) = x \iff 1 - y = e^x \iff y = 1 - e^x$. Donc :

$$f^{-1}(x) = 1 - e^x$$

**3. c)** $f^{-1}(-1) = 1 - e^{-1}$.

### Partie II

Ici $P_n(x) = x + \frac{x^2}{2} + \cdots + \frac{x^n}{n}$, pour $n \geq 2$.

**1.** $P_n$ est continue et dérivable sur $[0 ; 1]$, et $P_n'(x) = 1 + x + \cdots + x^{n-1} > 0$ : $P_n$ est strictement croissante. De plus $P_n(0) = 0 < 1$ et $P_n(1) = 1 + \frac{1}{2} + \cdots + \frac{1}{n} \geq 1 + \frac{1}{2} > 1$. D’après le théorème des valeurs intermédiaires, l’équation $P_n(x) = 1$ admet une solution dans $]0 ; 1[$, unique par stricte croissance : c’est $x_n$.

**2.** $P_2(x) = 1 \iff x + \frac{x^2}{2} = 1 \iff x^2 + 2x - 2 = 0$, dont les racines sont $-1 - \sqrt{3}$ et $-1 + \sqrt{3}$. Seule la seconde est dans $]0 ; 1[$ : $\alpha = x_2 = \sqrt{3} - 1$. Comme $1 < \sqrt{3} < 2$, on a bien $0 < \alpha < 1$.

**3. a)** $P_{n+1}(x_n) = P_n(x_n) + \frac{x_n^{n+1}}{n + 1} = 1 + \frac{x_n^{n+1}}{n + 1} > 1$, car $x_n > 0$.

**3. b)** $P_{n+1}(x_{n+1}) = 1 < P_{n+1}(x_n)$ et $P_{n+1}$ est strictement croissante sur $[0 ; 1]$, donc $x_{n+1} < x_n$ : la suite $(x_n)_{n \geq 2}$ est strictement décroissante.

**3. c)** Elle est décroissante, donc $x_n \leq x_2 = \alpha$ ; et $x_n > 0$. Ainsi $x_n \in ]0 ; \alpha]$.

**3. d)** $(x_n)$ est décroissante et minorée par $0$ : elle converge.

**4. a)** Pour $x \in I$, $f_n'(x) = \frac{-1}{1 - x} + 1 + x + \cdots + x^{n-1}$. Comme $x \neq 1$, la somme géométrique vaut $\frac{1 - x^n}{1 - x}$, donc :

$$f_n'(x) = \frac{-1 + 1 - x^n}{1 - x} = \frac{-x^n}{1 - x}$$

**4. b)** Pour $x \in [0 ; \alpha]$ : $0 \leq x^n \leq \alpha^n$ et $1 - x \geq 1 - \alpha > 0$, donc $|f_n'(x)| = \frac{x^n}{1 - x} \leq \frac{\alpha^n}{1 - \alpha}$.

**4. c)** $f_n(0) = \ln 1 + 0 = 0$. Pour $x \in [0 ; \alpha]$, l’inégalité des accroissements finis sur $[0 ; x]$ donne $|f_n(x) - f_n(0)| \leq \frac{\alpha^n}{1 - \alpha} \cdot x$. Comme $0 \leq x \leq \alpha < 1$ : $|f_n(x)| \leq \frac{\alpha^n}{1 - \alpha}$.

**4. d)** $x_n \in [0 ; \alpha]$ et $f_n(x_n) = f(x_n) + P_n(x_n) = f(x_n) + 1$. D’après 4. c) : $|f(x_n) + 1| \leq \frac{\alpha^n}{1 - \alpha}$.

**4. e)** Comme $0 < \alpha < 1$, $\lim_{n \to +\infty} \alpha^n = 0$, donc $\lim_{n \to +\infty} f(x_n) = -1$. Soit $\ell$ la limite de $(x_n)$ : $\ell \in [0 ; \alpha]$, donc $\ell \in I$ et $f$ est continue en $\ell$. Ainsi $f(\ell) = -1$, et d’après la partie I, 3. c) :

$$\lim_{n \to +\infty} x_n = f^{-1}(-1) = 1 - \frac{1}{e}$$

## Exercice 2 : analyse (4 points)

Ici $F(x) = \int_0^x e^{t - \frac{t^2}{2}}\,dt$.

**1. a)** La fonction $g : t \mapsto e^{t - \frac{t^2}{2}}$ est continue et strictement positive sur $\mathbb{R}$. Pour $x > 0$, $F(x) > 0$ ; pour $x < 0$, $F(x) = -\int_x^0 g(t)\,dt < 0$ ; et $F(0) = 0$. Donc $F(x)$ a le signe de $x$.

**1. b)** $g$ est continue sur $\mathbb{R}$, et $F$ est sa primitive qui s’annule en $0$ : $F$ est dérivable sur $\mathbb{R}$ et $F'(x) = e^{x - \frac{x^2}{2}}$.

**2. a)** On intègre par parties avec $u(x) = F(x)$ et $v(x) = x - 1$ (donc $v'(x) = 1$) :

$$\int_0^1 F(x)\,dx = \Big[(x - 1)F(x)\Big]_0^1 - \int_0^1 (x - 1)F'(x)\,dx$$

Le crochet vaut $0 \cdot F(1) - (-1)F(0) = 0$, car $F(0) = 0$. Donc $\int_0^1 F(x)\,dx = \int_0^1 (1 - x)e^{x - \frac{x^2}{2}}\,dx$.

**2. b)** La dérivée de $x - \frac{x^2}{2}$ est $1 - x$, donc $(1 - x)e^{x - \frac{x^2}{2}}$ est la dérivée de $e^{x - \frac{x^2}{2}}$ :

$$\int_0^1 F(x)\,dx = \left[e^{x - \frac{x^2}{2}}\right]_0^1 = e^{\frac{1}{2}} - 1 = \sqrt{e} - 1$$

**3. a)** D’après la relation de Chasles, $\int_{\frac{k}{n}}^{\frac{k+1}{n}} e^{x - \frac{x^2}{2}}\,dx = F\left(\frac{k+1}{n}\right) - F\left(\frac{k}{n}\right)$. En reportant dans $u_n$ et en séparant la somme, on obtient l’égalité demandée.

**3. b)** Dans la première somme, on pose $j = k + 1$ ($j$ va de $1$ à $n$) : elle devient $\sum_{j=1}^{n} (n - j + 1)F\left(\frac{j}{n}\right)$. Dans la seconde, le terme $k = 0$ est $nF(0) = 0$ : elle vaut $\sum_{j=1}^{n-1} (n - j)F\left(\frac{j}{n}\right)$. Pour $1 \leq j \leq n - 1$, la différence des coefficients est $(n - j + 1) - (n - j) = 1$, et le terme $j = n$ de la première somme est $F(1)$. Donc :

$$u_n = \frac{1}{n}\sum_{k=1}^{n} F\left(\frac{k}{n}\right)$$

**3. c)** $F$ est continue sur $[0 ; 1]$ : $u_n$ est une somme de Riemann de $F$ sur $[0 ; 1]$. Elle converge donc vers $\int_0^1 F(x)\,dx = \sqrt{e} - 1$.

## Exercice 3 : nombres complexes (4 points)

**1. a)** $\Delta = (m - i)^2 + 4im = m^2 - 2im - 1 + 4im = m^2 + 2im - 1 = (m + i)^2$.

**1. b)** Une racine carrée de $\Delta$ est $m + i$, donc :

$$z_1 = \frac{(m - i) + (m + i)}{2} = m \qquad z_2 = \frac{(m - i) - (m + i)}{2} = -i$$

**1. c)** $z_1 + z_2 = m - i = e^{i\frac{\pi}{8}} + e^{-i\frac{\pi}{2}}$. On factorise par l’angle moitié $e^{-i\frac{3\pi}{16}}$ :

$$z_1 + z_2 = e^{-i\frac{3\pi}{16}}\left(e^{i\frac{5\pi}{16}} + e^{-i\frac{5\pi}{16}}\right) = 2\cos\frac{5\pi}{16}\, e^{-i\frac{3\pi}{16}}$$

Comme $0 < \frac{5\pi}{16} < \frac{\pi}{2}$, $\cos\frac{5\pi}{16} > 0$ : c’est bien la forme exponentielle.

**2. a)** La symétrie par rapport à l’axe imaginaire envoie $x + iy$ sur $-x + iy$, c’est-à-dire $z$ sur $-\bar{z}$. Donc $m' = -\bar{m}$.

**2. b)** $ANM'B$ est un parallélogramme si et seulement si ses diagonales $[AM']$ et $[NB]$ ont le même milieu, soit $a + m' = n + b$. Donc :

$$n = a + m' - b = 2 - \bar{m} + i$$

**2. c)** $M \neq A$ (car $m \neq 2$) et $M' \neq B$ (car $m' = -i$ équivaut à $m = -i$). Les droites $(AM)$ et $(BM')$ sont perpendiculaires si et seulement si $\mathrm{Re}\left((m - 2)\overline{(m' + i)}\right) = 0$. Or $\overline{m' + i} = \overline{-\bar{m} + i} = -m - i$, et :

$$(m - 2)(-m - i) = -m^2 + (2 - i)m + 2i$$

Sa partie réelle est $-\mathrm{Re}(m^2) + \mathrm{Re}\left((2 - i)m\right)$. Les droites sont donc perpendiculaires si et seulement si $\mathrm{Re}\left((2 - i)m\right) = \mathrm{Re}(m^2)$.

## Exercice 4 : arithmétique (4 points)

**1. a)** $(a - 1)A = a^7 - 1$. Comme $p$ divise $A$, il divise $a^7 - 1$ : $a^7 \equiv 1 \; [p]$. Pour tout $n \in \mathbb{N}$, $a^{7n} = (a^7)^n \equiv 1 \; [p]$.

**1. b)** Si $p$ divisait $a$, on aurait $A = 1 + a(1 + a + \cdots + a^5) \equiv 1 \; [p]$, et $p$ diviserait $1$ : c’est impossible. Comme $p$ est premier et ne divise pas $a$, $a$ et $p$ sont premiers entre eux. D’après le petit théorème de Fermat, $a^{p-1} \equiv 1 \; [p]$, donc $a^{(p-1)m} = (a^{p-1})^m \equiv 1 \; [p]$ pour tout $m \in \mathbb{N}$.

**2. a)** $7$ est premier et ne divise pas $p - 1$, donc $7$ et $p - 1$ sont premiers entre eux. D’après Bézout, il existe des entiers $u_0, v_0$ tels que $7u_0 + (p - 1)v_0 = 1$. Pour tout entier $t$, $u = u_0 + (p - 1)t$ et $v = -v_0 + 7t$ vérifient $7u - (p - 1)v = 1$ ; en prenant $t$ assez grand, $u$ et $v$ sont des entiers naturels. Alors $a^{7u} = a^{1 + (p - 1)v} = a \cdot a^{(p-1)v}$, et d’après 1. a) et 1. b), $1 \equiv a \cdot 1 \; [p]$ : $a \equiv 1 \; [p]$.

**2. b)** Avec $a \equiv 1 \; [p]$, $A \equiv 1 + 1 + \cdots + 1 = 7 \; [p]$. Comme $p$ divise $A$, $p$ divise $7$, et $p$ étant premier, $p = 7$.

**3.** Soit $p$ un nombre premier impair qui divise $A$. Si $7$ divise $p - 1$, alors $p \equiv 1 \; [7]$. Sinon, d’après la question 2, $p = 7$. Donc $p = 7$ ou $p \equiv 1 \; [7]$.
