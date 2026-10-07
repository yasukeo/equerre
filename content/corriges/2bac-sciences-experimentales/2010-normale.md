---
summary: Une sphère coupée par une droite perpendiculaire à un plan, une rotation dans le plan complexe, un tirage simultané de quatre boules, une suite récurrente avec une suite géométrique associée, et l’étude de (2x − 1)e^(2x) + x + 1 avec une asymptote oblique et une aire.
---

## Exercice 1 : géométrie dans l’espace (3 points)

**1.** $\overrightarrow{AB}(4 ; 0 ; -3)$ et $\overrightarrow{AC}(8 ; 1 ; -6)$, donc :

$$\overrightarrow{AB} \wedge \overrightarrow{AC} = (0 \times (-6) - (-3) \times 1)\,\vec{i} + ((-3) \times 8 - 4 \times (-6))\,\vec{j} + (4 \times 1 - 0 \times 8)\,\vec{k} = 3\vec{i} + 4\vec{k}$$

Ce vecteur non nul est normal au plan $(ABC)$, qui a une équation $3x + 4z + d = 0$. Avec $A$ : $-3 + 12 + d = 0$, d’où $d = -9$ et $(ABC) : 3x + 4z - 9 = 0$.

**2.** $x^2 - 6x + y^2 - 2y + z^2 = 15$ s’écrit $(x - 3)^2 + (y - 1)^2 + z^2 = 15 + 9 + 1 = 25$ : $(S)$ a pour centre $\Omega(3 ; 1 ; 0)$ et pour rayon $5$.

**3. a)** $(\Delta)$ passe par $\Omega(3 ; 1 ; 0)$ et est dirigée par le vecteur normal $3\vec{i} + 4\vec{k}$ : $x = 3 + 3t$, $y = 1$, $z = 4t$, avec $t \in \mathbb{R}$.

**3. b)** On remplace dans l’équation réduite de $(S)$ : $(3t)^2 + 0^2 + (4t)^2 = 25$, soit $25t^2 = 25$ et $t = 1$ ou $t = -1$. Pour $t = 1$ on obtient $E(6 ; 1 ; 4)$, pour $t = -1$ on obtient $F(0 ; 1 ; -4)$.

## Exercice 2 : nombres complexes (3 points)

**1.** $\Delta = 36 - 40 = -4 = (2i)^2$ : les solutions sont $3 + i$ et $3 - i$.

**2. a)** $z' - a = e^{i\frac{\pi}{2}}(z - a) = i(z - a)$, donc $z' = iz + (1 - i)a = iz + (1 - i)(3 - i) = iz + 3 - i - 3i - 1 = iz + 2 - 4i$.

**2. b)** $c' = i(7 - 3i) + 2 - 4i = 7i + 3 + 2 - 4i = 5 + 3i$.

**2. c)** $c' - b = 2 + 2i$ et $c - b = 4 - 4i$, donc :

$$\frac{c' - b}{c - b} = \frac{2(1 + i)}{4(1 - i)} = \frac{(1 + i)^2}{2 \times 2} = \frac{2i}{4} = \frac{1}{2}i$$

Ce quotient a pour argument $\frac{\pi}{2}$ : $(\overrightarrow{BC}, \overrightarrow{BC'}) \equiv \frac{\pi}{2} \; [2\pi]$, le triangle $BCC'$ est rectangle en $B$. Son module vaut $\frac{1}{2}$ : $BC' = \frac{1}{2}BC$, soit $BC = 2BC'$.

## Exercice 3 : probabilités (3 points)

On tire simultanément $4$ boules parmi $10$ ($5$ blanches, $3$ rouges, $2$ noires) : il y a $\binom{10}{4} = 210$ tirages équiprobables.

**1.** $A$ : une rouge et trois boules non rouges, $\binom{3}{1}\binom{7}{3} = 3 \times 35 = 105$ tirages, donc $P(A) = \frac{105}{210} = \frac{1}{2}$. L’événement contraire de $B$ est « aucune blanche » : $\binom{5}{4} = 5$ tirages. Donc $P(B) = 1 - \frac{5}{210} = \frac{205}{210} = \frac{41}{42}$.

**2. a)** Il n’y a que $3$ boules rouges, et $7$ boules non rouges permettent de n’en tirer aucune : $X$ prend les valeurs $0$, $1$, $2$ et $3$.

**2. b)** $P(X = 0) = \frac{\binom{7}{4}}{210} = \frac{35}{210} = \frac{1}{6}$ et $P(X = 2) = \frac{\binom{3}{2}\binom{7}{2}}{210} = \frac{3 \times 21}{210} = \frac{3}{10}$.

**2. c)** $P(X = 1) = P(A) = \frac{1}{2}$ et $P(X = 3) = \frac{\binom{3}{3}\binom{7}{1}}{210} = \frac{7}{210} = \frac{1}{30}$. La loi de $X$ est donc :

$P(X = 0) = \frac{1}{6}$, $P(X = 1) = \frac{1}{2}$, $P(X = 2) = \frac{3}{10}$, $P(X = 3) = \frac{1}{30}$. On vérifie : $35 + 105 + 63 + 7 = 210$.

## Exercice 4 : suites numériques (3 points)

**1.** $u_{n+1} - 1 = \frac{3u_n - 1 - 2u_n}{2u_n} = \frac{u_n - 1}{2u_n}$. Par récurrence : $u_0 = 2 > 1$ ; si $u_n > 1$, alors $u_n - 1 > 0$ et $2u_n > 0$, donc $u_{n+1} > 1$.

**2. a)** Comme $u_n > 1$, $2u_n - 1 > 0$ et $v_n$ est bien défini. On a $u_{n+1} - 1 = \frac{u_n - 1}{2u_n}$ et $2u_{n+1} - 1 = \frac{3u_n - 1}{u_n} - 1 = \frac{2u_n - 1}{u_n}$, donc :

$$v_{n+1} = \frac{u_n - 1}{2u_n} \times \frac{u_n}{2u_n - 1} = \frac{1}{2} \times \frac{u_n - 1}{2u_n - 1} = \frac{1}{2}v_n$$

$(v_n)$ est géométrique de raison $\frac{1}{2}$ et de premier terme $v_0 = \frac{2 - 1}{4 - 1} = \frac{1}{3}$ : $v_n = \frac{1}{3}\left(\frac{1}{2}\right)^n$.

**2. b)** $v_n(2u_n - 1) = u_n - 1$ donne $u_n(2v_n - 1) = v_n - 1$. Or $v_n \leq \frac{1}{3}$, donc $2v_n - 1 \neq 0$ et $u_n = \frac{v_n - 1}{2v_n - 1}$. Comme $\lim_{n \to +\infty} v_n = 0$, $\lim_{n \to +\infty} u_n = \frac{-1}{-1} = 1$.

**3.** $\ln$ est continue en $1$ et $u_n \to 1$, donc $\lim_{n \to +\infty} w_n = \ln 1 = 0$.

## Exercice 5 : étude d’une fonction et calcul intégral (8 points)

### Partie I

**1.** $g'(x) = 4e^{2x} + 4x \times 2e^{2x} = 4(2x + 1)e^{2x}$.

**2.** $e^{2x} > 0$, donc $g'(x)$ a le signe de $2x + 1$ : $g$ est décroissante sur $\left]-\infty ; -\frac{1}{2}\right]$ et croissante sur $\left[-\frac{1}{2} ; +\infty\right[$.

**3. a)** $g\left(-\frac{1}{2}\right) = 1 + 4 \times \left(-\frac{1}{2}\right)e^{-1} = 1 - \frac{2}{e}$. Comme $e > 2$, $\frac{2}{e} < 1$ et $g\left(-\frac{1}{2}\right) > 0$.

**3. b)** D’après 2., $g\left(-\frac{1}{2}\right)$ est le minimum de $g$ sur $\mathbb{R}$ ; il est strictement positif, donc $g(x) > 0$ pour tout $x \in \mathbb{R}$.

### Partie II

**1.** En $+\infty$, $(2x - 1)e^{2x} \to +\infty$ et $x + 1 \to +\infty$ : $\lim_{x \to +\infty} f(x) = +\infty$. En $-\infty$, posons $u = 2x$ : $(2x - 1)e^{2x} = ue^u - e^{2x} \to 0 - 0 = 0$, et $x + 1 \to -\infty$, donc $\lim_{x \to -\infty} f(x) = -\infty$.

**2.** $f'(x) = 2e^{2x} + (2x - 1) \times 2e^{2x} + 1 = 4xe^{2x} + 1 = g(x)$. Comme $g > 0$, $f$ est strictement croissante sur $\mathbb{R}$.

**3. a)** $\frac{f(x)}{x} = \left(2 - \frac{1}{x}\right)e^{2x} + 1 + \frac{1}{x} \to +\infty$ quand $x \to +\infty$ : $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**3. b)** $f(x) - (x + 1) = (2x - 1)e^{2x} \to 0$ quand $x \to -\infty$ (question 1.) : la droite $(\Delta) : y = x + 1$ est asymptote à $(C)$ au voisinage de $-\infty$.

**3. c)** $f(x) - (x + 1) = (2x - 1)e^{2x}$ s’annule seulement pour $x = \frac{1}{2}$ : le point d’intersection est $\left(\frac{1}{2} ; \frac{3}{2}\right)$. Cette différence a le signe de $2x - 1$ : $(C)$ est au-dessous de $(\Delta)$ sur $\left]-\infty ; \frac{1}{2}\right[$ et au-dessus sur $\left]\frac{1}{2} ; +\infty\right[$.

**4. a)** $f(0) = -1 + 1 = 0$ et $f'(0) = g(0) = 1$ : la tangente en $O$ a pour équation $y = x$.

**4. b)** $f''(x) = g'(x) = 4(2x + 1)e^{2x}$ s’annule en $-\frac{1}{2}$ en changeant de signe : $(C)$ admet un point d’inflexion d’abscisse $-\frac{1}{2}$.

**5.** Éléments pour le tracé (unité $2$ cm) : $(\Delta)$ passe par $(-1 ; 0)$ et $(0 ; 1)$, $(T)$ est la première bissectrice. $(C)$ est croissante, proche de $(\Delta)$ en $-\infty$ (au-dessous), passe par $O$ où elle est tangente à $(T)$, coupe $(\Delta)$ en $\left(\frac{1}{2} ; \frac{3}{2}\right)$ puis monte très vite. Quelques valeurs : $f(-2) \approx -1{,}09$, $f(-1) \approx -0{,}41$, $f(1) = e^2 + 2 \approx 9{,}39$. En étudiant $f(x) - x$, dont la dérivée $4xe^{2x}$ a le signe de $x$, on voit que $(C)$ est au-dessus de $(T)$ sur $\mathbb{R}$.

**6. a)** On intègre par parties avec $u(x) = 2x - 1$ et $v'(x) = e^{2x}$, donc $u'(x) = 2$ et $v(x) = \frac{1}{2}e^{2x}$ :

$$\int_0^1 (2x - 1)e^{2x}\,dx = \left[\frac{(2x - 1)e^{2x}}{2}\right]_0^1 - \int_0^1 e^{2x}\,dx = \frac{e^2}{2} + \frac{1}{2} - \left(\frac{e^2}{2} - \frac{1}{2}\right) = 1$$

**6. b)** Sur $[0 ; 1]$, $(C)$ est au-dessus de $(T)$ (question 5.) et $f(x) - x = (2x - 1)e^{2x} + 1$. L’aire vaut :

$$\int_0^1 \left((2x - 1)e^{2x} + 1\right)dx = 1 + 1 = 2 \text{ unités d’aire}$$

Une unité d’aire vaut $2 \times 2 = 4$ cm² : l’aire est $8$ cm².
