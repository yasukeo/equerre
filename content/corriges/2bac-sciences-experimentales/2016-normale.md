---
summary: Une suite homographique et une suite géométrique associée, une sphère coupée par un plan, des nombres complexes (rotation), une loi de probabilité, et un problème sur 2x − 2 + e^(2x) − 4eˣ avec une aire, une équation différentielle et une fonction réciproque.
---

## Exercice 1 : suites numériques (2,5 points)

**1.** $u_{n+1} - 3 = \frac{3 + u_n - 3(5 - u_n)}{5 - u_n} = \frac{4(u_n - 3)}{5 - u_n} = \frac{4(u_n - 3)}{2 + (3 - u_n)}$. Par récurrence : $u_0 = 2 < 3$ ; si $u_n < 3$, le numérateur $4(u_n - 3)$ est négatif et le dénominateur $2 + (3 - u_n)$ positif, donc $u_{n+1} < 3$.

**2. a)** $u_{n+1} - 1 = \frac{2(u_n - 1)}{5 - u_n}$ et $3 - u_{n+1} = \frac{4(3 - u_n)}{5 - u_n}$, donc $v_{n+1} = \frac{2(u_n - 1)}{4(3 - u_n)} = \frac{1}{2}v_n$. La suite $(v_n)$ est géométrique de raison $\frac{1}{2}$, de premier terme $v_0 = \frac{2 - 1}{3 - 2} = 1$ : $v_n = \left(\frac{1}{2}\right)^n$.

**2. b)** $v_n(3 - u_n) = u_n - 1$ donne $1 + 3v_n = u_n(1 + v_n)$, soit $u_n = \frac{1 + 3v_n}{1 + v_n}$. Donc :

$$u_n = \frac{1 + 3\left(\frac{1}{2}\right)^n}{1 + \left(\frac{1}{2}\right)^n} = \frac{2^n + 3}{2^n + 1}$$

**2. c)** $v_n \to 0$, donc $\lim_{n \to +\infty} u_n = 1$.

## Exercice 2 : géométrie dans l’espace (3 points)

**1. a)** $\overrightarrow{AB}(1 ; 0 ; -2)$ et $\overrightarrow{AC}(0 ; 1 ; -2)$, donc $\overrightarrow{AB} \wedge \overrightarrow{AC} = (0 \times (-2) - (-2) \times 1)\,\vec{i} + ((-2) \times 0 - 1 \times (-2))\,\vec{j} + (1 \times 1 - 0)\,\vec{k} = 2\vec{i} + 2\vec{j} + \vec{k}$.

**1. b)** Ce vecteur est normal au plan $(ABC)$, qui a donc une équation $2x + 2y + z + d = 0$. Avec $A$ : $4 + 2 + 3 + d = 0$, d’où $d = -9$.

**2. a)** $x^2 - 2x + y^2 + 2y + z^2 = 34$ s’écrit $(x - 1)^2 + (y + 1)^2 + z^2 = 36$ : centre $\Omega(1 ; -1 ; 0)$ et rayon $6$.

**2. b)** $d(\Omega, (ABC)) = \frac{|2 - 2 + 0 - 9|}{\sqrt{4 + 4 + 1}} = \frac{9}{3} = 3 < 6$ : le plan coupe la sphère suivant un cercle $(\Gamma)$, de rayon $\sqrt{36 - 9} = 3\sqrt{3}$.

**3. a)** $(\Delta)$ passe par $\Omega$ et est dirigée par $2\vec{i} + 2\vec{j} + \vec{k}$ : $x = 1 + 2t$, $y = -1 + 2t$, $z = t$, avec $t \in \mathbb{R}$.

**3. b)** Le centre de $(\Gamma)$ est le point d’intersection de $(\Delta)$ et du plan : $2(1 + 2t) + 2(-1 + 2t) + t - 9 = 0$ donne $9t = 9$, soit $t = 1$, et le point $(3 ; 1 ; 1)$, qui est $B$.

## Exercice 3 : nombres complexes (3 points)

**1.** $\Delta = 16 - 116 = -100 = (10i)^2$ : les solutions sont $2 + 5i$ et $2 - 5i$.

**2. a)** $u = 5 + 8i - 2 - 5i = 3 + 3i = 3\sqrt{2}\,e^{i\frac{\pi}{4}}$, donc $\arg u \equiv \frac{\pi}{4} \; [2\pi]$.

**2. b)** $\arg \bar{u} \equiv -\frac{\pi}{4} \; [2\pi]$.

**2. c)** $a - \omega = 3 - 3i = \bar{u}$. Donc $\Omega A = |\bar{u}| = |u| = \Omega B$, et $\arg\left(\frac{b - \omega}{a - \omega}\right) = \arg u - \arg \bar{u} \equiv \frac{\pi}{4} + \frac{\pi}{4} = \frac{\pi}{2} \; [2\pi]$.

**2. d)** L’image de $A$ a pour affixe $\omega + i(a - \omega) = 2 + 5i + i(3 - 3i) = 5 + 8i = b$ : c’est le point $B$.

## Exercice 4 : probabilités (3 points)

**1.** Il y a $\binom{10}{2} = 45$ tirages équiprobables, dont $\binom{4}{2} = 6$ donnent deux rouges : $p(A) = \frac{6}{45} = \frac{2}{15}$.

**2. a)** On tire $0$, $1$ ou $2$ boules rouges, donc il en reste $4$, $3$ ou $2$ : $X$ prend les valeurs $2$, $3$ et $4$.

**2. b)** $X = 3$ signifie qu’on a tiré une rouge et une verte : $p(X = 3) = \frac{4 \times 6}{45} = \frac{8}{15}$. De plus $p(X = 2) = p(A) = \frac{2}{15}$ et $p(X = 4) = \frac{\binom{6}{2}}{45} = \frac{15}{45} = \frac{1}{3}$. On vérifie : $\frac{2}{15} + \frac{8}{15} + \frac{5}{15} = 1$.

## Problème (8,5 points)

### Partie I

**1. a)** En $-\infty$, $e^{2x} \to 0$ et $e^x \to 0$, donc $\lim_{x \to -\infty} f(x) = -\infty$.

**1. b)** $f(x) - (2x - 2) = e^{2x} - 4e^x \to 0$ en $-\infty$ : la droite $(D)$ est asymptote à $(C_f)$ en $-\infty$.

**2. a)** $f(x) = e^{2x}(1 - 4e^{-x}) + 2x - 2 \to +\infty$ en $+\infty$.

**2. b)** $\frac{f(x)}{x} = 2 - \frac{2}{x} + \frac{e^x(e^x - 4)}{x} \to +\infty$ : $(C_f)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**3. a)** $f'(x) = 2 + 2e^{2x} - 4e^x = 2(e^{2x} - 2e^x + 1) = 2(e^x - 1)^2$.

**3. b)** $f' \geq 0$ et ne s’annule qu’en $0$ : $f$ est strictement croissante sur $\mathbb{R}$, de $-\infty$ à $+\infty$, avec $f(0) = -5$.

**3. c)** $f$ est continue et strictement croissante sur $[1 ; \ln 4]$, avec $f(1) = e^2 - 4e = e(e - 4) < 0$ et $f(\ln 4) = 2\ln 4 - 2 + 16 - 16 = 2(\ln 4 - 1) > 0$. Il existe un unique $\alpha \in ]1 ; \ln 4[$ tel que $f(\alpha) = 0$.

**4. a)** $f(x) - (2x - 2) = e^x(e^x - 4)$ est positif pour $x > \ln 4$ et négatif pour $x < \ln 4$ : $(C_f)$ est au-dessus de $(D)$ sur $]\ln 4 ; +\infty[$ et au-dessous sur $]-\infty ; \ln 4[$.

**4. b)** $f''(x) = 4(e^x - 1)e^x$ change de signe seulement en $0$ : $(C_f)$ a un unique point d’inflexion, $(0 ; -5)$.

**4. c)** Éléments pour le tracé : $(D)$ passe par $(0 ; -2)$ et $(1 ; 0)$. $(C_f)$ est croissante, au-dessous de $(D)$ jusqu’au point d’abscisse $\ln 4 \approx 1{,}4$ où elle la coupe. Elle a une tangente horizontale au point d’inflexion $(0 ; -5)$, coupe l’axe des abscisses en $\alpha \approx 1{,}3$, et part vers le haut avec une branche parabolique verticale.

**5. a)** $\int_0^{\ln 4}\left(e^{2x} - 4e^x\right)dx = \left[\frac{e^{2x}}{2} - 4e^x\right]_0^{\ln 4} = (8 - 16) - \left(\frac{1}{2} - 4\right) = -\frac{9}{2}$.

**5. b)** Sur $[0 ; \ln 4]$, $(C_f)$ est au-dessous de $(D)$ ; l’aire vaut $\int_0^{\ln 4}\left((2x - 2) - f(x)\right)dx = -\int_0^{\ln 4}\left(e^{2x} - 4e^x\right)dx = \frac{9}{2} \text{ cm}^2$.

### Partie II

**1. a)** L’équation caractéristique $r^2 - 3r + 2 = 0$ a pour racines $1$ et $2$ : les solutions sont $y(x) = \alpha e^x + \beta e^{2x}$, avec $\alpha, \beta \in \mathbb{R}$.

**1. b)** $g(0) = \alpha + \beta = -3$ et $g'(0) = \alpha + 2\beta = -2$ donnent $\beta = 1$ et $\alpha = -4$ : $g(x) = e^{2x} - 4e^x$.

**2. a)** Sur $]\ln 4 ; +\infty[$, $e^{2x} - 4e^x = e^x(e^x - 4) > 0$, et :

$$h'(x) = \frac{2e^{2x} - 4e^x}{e^{2x} - 4e^x} = \frac{2(e^x - 2)}{e^x - 4} > 0$$

$h$ est continue et strictement croissante. Quand $x \to \ln 4^+$, $e^{2x} - 4e^x \to 0^+$ et $h(x) \to -\infty$ ; quand $x \to +\infty$, $h(x) \to +\infty$. $h$ est donc une bijection de $]\ln 4 ; +\infty[$ sur $\mathbb{R}$, et $h^{-1}$ est définie sur $\mathbb{R}$.

**2. b)** $h(\ln 5) = \ln(25 - 20) = \ln 5$. Donc $h^{-1}(\ln 5) = \ln 5$ et :

$$\left(h^{-1}\right)'(\ln 5) = \frac{1}{h'(\ln 5)} = \frac{1}{\frac{2(5 - 2)}{5 - 4}} = \frac{1}{6}$$
