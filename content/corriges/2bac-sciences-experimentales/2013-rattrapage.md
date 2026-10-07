---
summary: Un plan tangent à une sphère et une droite qui la traverse, une translation et un argument dans le plan complexe, une suite arithmético-géométrique, un tirage de trois jetons, et l’étude de x² − 1 − (ln x)² avec deux intégrales et une aire.
---

## Exercice 1 : géométrie dans l’espace (3 points)

**1.** La sphère de centre $\Omega(1 ; -1 ; 0)$ et de rayon $\sqrt{3}$ a pour équation $(x - 1)^2 + (y + 1)^2 + z^2 = 3$, soit $x^2 + y^2 + z^2 - 2x + 2y - 1 = 0$. Pour $A(0 ; 0 ; 1)$ : $0 + 0 + 1 - 0 + 0 - 1 = 0$, donc $A \in (S)$.

**2. a)** $\overrightarrow{AB}(1 ; 1 ; 0)$ et $\overrightarrow{AC}(2 ; 1 ; 1)$, donc :

$$\overrightarrow{AB} \wedge \overrightarrow{AC} = (1 \times 1 - 0 \times 1)\,\vec{i} + (0 \times 2 - 1 \times 1)\,\vec{j} + (1 \times 1 - 1 \times 2)\,\vec{k} = \vec{i} - \vec{j} - \vec{k}$$

Ce vecteur non nul est normal à $(ABC)$, qui a une équation $x - y - z + d = 0$. Avec $A$ : $-1 + d = 0$, d’où $(ABC) : x - y - z + 1 = 0$.

**2. b)** $d(\Omega, (ABC)) = \frac{|1 + 1 - 0 + 1|}{\sqrt{3}} = \frac{3}{\sqrt{3}} = \sqrt{3}$. La distance est égale au rayon : le plan est tangent à la sphère. Comme $A$ appartient au plan et à la sphère, le point de contact est $A$.

**3. a)** $(\Delta)$ passe par $\Omega(1 ; -1 ; 0)$ et est dirigée par $\vec{i} - \vec{j} - \vec{k}$ : $x = 1 + t$, $y = -1 - t$, $z = -t$, avec $t \in \mathbb{R}$.

**3. b)** Dans l’équation $(x - 1)^2 + (y + 1)^2 + z^2 = 3$ : $t^2 + t^2 + t^2 = 3$, soit $t = 1$ ou $t = -1$. Les points d’intersection sont $(2 ; -2 ; -1)$ et $(0 ; 0 ; 1)$, c’est-à-dire $A$.

## Exercice 2 : nombres complexes (3 points)

**1.** $\Delta = 64 - 100 = -36 = (6i)^2$ : les solutions sont $4 + 3i$ et $4 - 3i$.

**2. a)** Le vecteur $\overrightarrow{BC}$ a pour affixe $c - b = 6 + 6i$. Donc $d = a + 6 + 6i = 10 + 9i$.

**2. b)** $b - a = -6i$ et $d - a = 6 + 6i$, donc :

$$\frac{b - a}{d - a} = \frac{-i}{1 + i} = \frac{-i(1 - i)}{2} = \frac{-1 - i}{2} = -\frac{1}{2}(1 + i)$$

Son module vaut $\frac{\sqrt{2}}{2}$ et $-\frac{1}{2}(1 + i) = \frac{\sqrt{2}}{2}\left(-\frac{\sqrt{2}}{2} - i\frac{\sqrt{2}}{2}\right) = \frac{\sqrt{2}}{2}\left(\cos\frac{5\pi}{4} + i\sin\frac{5\pi}{4}\right)$.

**2. c)** $(\overrightarrow{AD}, \overrightarrow{AB}) \equiv \arg\left(\frac{b - a}{d - a}\right) \equiv \frac{5\pi}{4} \; [2\pi]$.

## Exercice 3 : suites numériques (3 points)

**1.** $u_{n+1} - 1 = \frac{1}{5}u_n + \frac{4}{5} - 1 = \frac{1}{5}(u_n - 1)$.

**2. a)** Par récurrence : $u_0 = 2 > 1$ ; si $u_n > 1$, alors $u_{n+1} - 1 = \frac{1}{5}(u_n - 1) > 0$.

**2. b)** $u_{n+1} - u_n = -\frac{4}{5}u_n + \frac{4}{5} = -\frac{4}{5}(u_n - 1) < 0$ : la suite est décroissante.

**2. c)** Elle est décroissante et minorée par $1$, donc elle converge.

**3. a)** $v_{n+1} = u_{n+1} - 1 = \frac{1}{5}(u_n - 1) = \frac{1}{5}v_n$ : $(v_n)$ est géométrique de raison $\frac{1}{5}$, de premier terme $v_0 = 1$, et $v_n = \left(\frac{1}{5}\right)^n$.

**3. b)** $u_n = v_n + 1 = \left(\frac{1}{5}\right)^n + 1$. Comme $\left(\frac{1}{5}\right)^n \to 0$, $\lim_{n \to +\infty} u_n = 1$.

## Exercice 4 : probabilités (3 points)

On tire simultanément $3$ jetons parmi $9$ ($4$ blancs, $3$ noirs, $2$ verts) : il y a $\binom{9}{3} = 84$ tirages équiprobables.

**1.** Trois jetons de même couleur : trois blancs ou trois noirs, $\binom{4}{3} + \binom{3}{3} = 5$ tirages, donc $P(A) = \frac{5}{84}$. Trois couleurs différentes : $4 \times 3 \times 2 = 24$ tirages, donc $P(B) = \frac{24}{84} = \frac{2}{7}$.

**2. a)** Il y a $3$ jetons noirs et $6$ autres : $X$ prend les valeurs $0$, $1$, $2$ et $3$.

**2. b)** $P(X = 2) = \frac{\binom{3}{2}\binom{6}{1}}{84} = \frac{18}{84} = \frac{3}{14}$ et $P(X = 1) = \frac{\binom{3}{1}\binom{6}{2}}{84} = \frac{45}{84} = \frac{15}{28}$.

**2. c)** $P(X = 0) = \frac{\binom{6}{3}}{84} = \frac{20}{84} = \frac{5}{21}$ et $P(X = 3) = \frac{1}{84}$. La loi de $X$ est : $P(X = 0) = \frac{5}{21}$, $P(X = 1) = \frac{15}{28}$, $P(X = 2) = \frac{3}{14}$, $P(X = 3) = \frac{1}{84}$. On vérifie : $20 + 45 + 18 + 1 = 84$.

## Exercice 5 : étude d’une fonction et calcul intégral (8 points)

### Partie I

**1. a)** $(2x + 1)(x - 1) = 2x^2 - 2x + x - 1 = 2x^2 - x - 1$.

**1. b)** $g'(x) = 2x - 1 - \frac{1}{x} = \frac{2x^2 - x - 1}{x} = \frac{(2x + 1)(x - 1)}{x}$. Pour $x > 0$, $2x + 1 > 0$ : $g'(x)$ a le signe de $x - 1$. Donc $g$ est décroissante sur $]0 ; 1]$ et croissante sur $[1 ; +\infty[$.

**2.** $g$ admet en $1$ un minimum $g(1) = 1 - 1 - 0 = 0$ : $g(x) \geq 0$ pour tout $x > 0$.

### Partie II

**1. a)** Quand $x \to 0^+$, $x^2 - 1 \to -1$ et $(\ln x)^2 \to +\infty$ : $\lim_{x \to 0^+} f(x) = -\infty$. L’axe des ordonnées est asymptote verticale à $(C)$.

**1. b)** $f(x) = x^2\left(1 - \frac{1}{x^2} - \left(\frac{\ln x}{x}\right)^2\right)$ et $\frac{\ln x}{x} \to 0$ en $+\infty$ : le facteur entre parenthèses tend vers $1$, donc $\lim_{x \to +\infty} f(x) = +\infty$ et $\frac{f(x)}{x} = x\left(1 - \frac{1}{x^2} - \left(\frac{\ln x}{x}\right)^2\right) \to +\infty$.

**1. c)** $(C)$ admet donc en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**2. a)** $f'(x) = 2x - 2\ln x \times \frac{1}{x} = 2\left(\frac{x^2 - \ln x}{x}\right)$.

**2. b)** $\frac{g(x)}{x} + 1 = \frac{x^2 - x - \ln x + x}{x} = \frac{x^2 - \ln x}{x}$. Donc $f'(x) = 2\left(\frac{g(x)}{x} + 1\right) \geq 2 > 0$ : $f$ est strictement croissante sur $]0 ; +\infty[$.

**3. a)** $f(1) = 0$ et $f'(1) = 2 \times \frac{1 - 0}{1} = 2$ : la tangente en $A(1 ; 0)$ a pour équation $y = 2(x - 1) = 2x - 2$.

**3. b)** Éléments pour le tracé (unité $1$ cm) : asymptote verticale $x = 0$, courbe croissante qui traverse $(T)$ en son point d’inflexion $A(1 ; 0)$, branche parabolique verticale en $+\infty$. Quelques valeurs : $f(0{,}2) \approx -3{,}55$, $f(0{,}5) \approx -1{,}23$, $f(2) \approx 2{,}52$, $f(e) = e^2 - 2 \approx 5{,}39$.

**4. a)** $H'(x) = \ln x - 1 + x \times \frac{1}{x} = \ln x$ : $H$ est une primitive de $\ln$. Donc $\int_1^e \ln x\,dx = H(e) - H(1) = 0 - (-1) = 1$.

**4. b)** On intègre par parties avec $u(x) = (\ln x)^2$ et $v'(x) = 1$, donc $u'(x) = \frac{2\ln x}{x}$ et $v(x) = x$ :

$$\int_1^e (\ln x)^2\,dx = \Big[x(\ln x)^2\Big]_1^e - \int_1^e 2\ln x\,dx = e - 2$$

**4. c)** $f$ est croissante et $f(1) = 0$, donc $f \geq 0$ sur $[1 ; e]$. L’aire vaut :

$$\int_1^e (x^2 - 1)\,dx - \int_1^e (\ln x)^2\,dx = \left[\frac{x^3}{3} - x\right]_1^e - (e - 2) = \frac{e^3}{3} - e + \frac{2}{3} - e + 2 = \frac{1}{3}\left(e^3 - 6e + 8\right)$$

Avec une unité de $1$ cm, l’aire est $\frac{1}{3}\left(e^3 - 6e + 8\right)$ cm².
