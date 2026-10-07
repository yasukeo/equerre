---
summary: Un plan tangent à une sphère et son point de contact, une rotation et un triangle équilatéral dans le plan complexe, des tirages successifs sans remise, une suite majorée par (1/7)^n, et l’étude de x − 1 + (x − 1 + ln x)/x² avec une intégration par parties et une aire.
---

## Exercice 1 : géométrie dans l’espace (3 points)

**1.** $x^2 - 2x + y^2 - 4y + z^2 - 6z = 11$ s’écrit $(x - 1)^2 + (y - 2)^2 + (z - 3)^2 = 11 + 1 + 4 + 9 = 25$ : $(S)$ est la sphère de centre $\Omega(1 ; 2 ; 3)$ et de rayon $5$.

**2. a)** $\overrightarrow{AB}(1 ; 3 ; -4)$ et $\overrightarrow{AC}(0 ; 3 ; -4)$, donc :

$$\overrightarrow{AB} \wedge \overrightarrow{AC} = (3 \times (-4) - (-4) \times 3)\,\vec{i} + ((-4) \times 0 - 1 \times (-4))\,\vec{j} + (1 \times 3 - 3 \times 0)\,\vec{k} = 4\vec{j} + 3\vec{k}$$

Ce vecteur non nul est normal à $(ABC)$, qui a une équation $4y + 3z + d = 0$. Avec $A$ : $-8 + d = 0$, d’où $(ABC) : 4y + 3z + 8 = 0$.

**2. b)** $d(\Omega, (ABC)) = \frac{|8 + 9 + 8|}{\sqrt{16 + 9}} = \frac{25}{5} = 5$. La distance est égale au rayon : le plan $(ABC)$ est tangent à $(S)$.

**3. a)** $(\Delta)$ passe par $\Omega(1 ; 2 ; 3)$ et est dirigée par $4\vec{j} + 3\vec{k}$ : $x = 1$, $y = 2 + 4t$, $z = 3 + 3t$, avec $t \in \mathbb{R}$.

**3. b)** Dans l’équation du plan : $4(2 + 4t) + 3(3 + 3t) + 8 = 25 + 25t = 0$, soit $t = -1$. Le point d’intersection est $H(1 ; -2 ; 0)$.

**3. c)** $H$ appartient à $(ABC)$, et $\Omega H = \sqrt{0 + 16 + 9} = 5$ : $H$ appartient aussi à $(S)$. Comme le plan est tangent à la sphère, ils n’ont qu’un point commun : $H$ est le point de contact.

## Exercice 2 : nombres complexes (3 points)

**1.** $\Delta = (8\sqrt{3})^2 - 4 \times 64 = 192 - 256 = -64 = (8i)^2$ : les solutions sont $4\sqrt{3} + 4i$ et $4\sqrt{3} - 4i$.

**2. a)** La rotation de centre $O$ et d’angle $\frac{4\pi}{3}$ s’écrit $z' = e^{i\frac{4\pi}{3}}z$, et $e^{i\frac{4\pi}{3}} = \cos\frac{4\pi}{3} + i\sin\frac{4\pi}{3} = -\frac{1}{2} - i\frac{\sqrt{3}}{2}$.

**2. b)** $\left(-\frac{1}{2} - i\frac{\sqrt{3}}{2}\right) \times 8i = -4i + 4\sqrt{3} = b$ : $B$ est l’image de $A$ par $R$.

**2. c)** $a - b = -4\sqrt{3} + 12i$ et $c - b = 4\sqrt{3} + 12i$. Donc :

$$\frac{a - b}{c - b} = \frac{-\sqrt{3} + 3i}{\sqrt{3} + 3i} = \frac{(-\sqrt{3} + 3i)(\sqrt{3} - 3i)}{3 + 9} = \frac{6 + 6\sqrt{3}\,i}{12} = \frac{1}{2} + i\frac{\sqrt{3}}{2}$$

Sous forme trigonométrique : $\frac{a - b}{c - b} = \cos\frac{\pi}{3} + i\sin\frac{\pi}{3}$.

**2. d)** Le module vaut $1$, donc $BA = BC$ ; l’argument vaut $\frac{\pi}{3}$, donc $(\overrightarrow{BC}, \overrightarrow{BA}) \equiv \frac{\pi}{3} \; [2\pi]$. Un triangle isocèle dont l’angle au sommet mesure $\frac{\pi}{3}$ est équilatéral : $ABC$ est équilatéral.

## Exercice 3 : probabilités (3 points)

La boîte contient trois boules « 1 », trois boules « 2 » et deux boules « 3 ». On tire successivement sans remise deux boules : il y a $8 \times 7 = 56$ tirages équiprobables.

**1.** $A$ : $3 \times 2 = 6$ tirages, donc $P(A) = \frac{6}{56} = \frac{3}{28}$. L’événement contraire de $B$ est « aucune boule ne porte 3 » : $6 \times 5 = 30$ tirages. Donc $P(B) = 1 - \frac{30}{56} = \frac{26}{56} = \frac{13}{28}$.

**2. a)** Il y a $5$ boules portant un nombre impair et $3$ portant un nombre pair : $X$ prend les valeurs $0$, $1$ et $2$.

**2. b)** $X = 1$ : impaire puis paire, ou paire puis impaire. $P(X = 1) = \frac{5 \times 3 + 3 \times 5}{56} = \frac{30}{56} = \frac{15}{28}$.

**2. c)** $P(X = 0) = \frac{3 \times 2}{56} = \frac{3}{28}$ et $P(X = 2) = \frac{5 \times 4}{56} = \frac{10}{28} = \frac{5}{14}$. La loi de $X$ est : $P(X = 0) = \frac{3}{28}$, $P(X = 1) = \frac{15}{28}$, $P(X = 2) = \frac{5}{14}$. On vérifie : $3 + 15 + 10 = 28$.

## Exercice 4 : suites numériques (3 points)

**1.** Par récurrence : $u_0 = 1 > 0$ ; si $u_n > 0$, alors $3u_n > 0$ et $21 + u_n > 0$, donc $u_{n+1} > 0$.

**2.** Comme $u_n > 0$, $21 + u_n > 21$, donc $u_{n+1} = \frac{3u_n}{21 + u_n} < \frac{3u_n}{21} = \frac{1}{7}u_n$.

**3.** $u_{n+1} < \frac{1}{7}u_n < u_n$ (car $u_n > 0$) : la suite est décroissante. Elle est minorée par $0$, donc elle converge.

**4. a)** Par récurrence : $u_0 = 1 = \left(\frac{1}{7}\right)^0$. Si $u_n \leq \left(\frac{1}{7}\right)^n$, alors $u_{n+1} < \frac{1}{7}u_n \leq \left(\frac{1}{7}\right)^{n+1}$.

**4. b)** $0 < u_n \leq \left(\frac{1}{7}\right)^n$ et $\left(\frac{1}{7}\right)^n \to 0$ : par encadrement, $\lim_{n \to +\infty} u_n = 0$.

## Exercice 5 : étude d’une fonction et calcul intégral (8 points)

### Partie I

**1. a)** $(x - 1)(3x^2 + 3x + 2) = 3x^3 + 3x^2 + 2x - 3x^2 - 3x - 2 = 3x^3 - x - 2$.

**1. b)** $g'(x) = 3x^2 - 1 - \frac{2}{x} = \frac{3x^3 - x - 2}{x} = \frac{(x - 1)(3x^2 + 3x + 2)}{x}$.

**2. a)** Pour $x > 0$, $3x^2 + 3x + 2 > 0$ et $x > 0$, donc $\frac{3x^2 + 3x + 2}{x} > 0$.

**2. b)** $g'(x) = (x - 1) \times \frac{3x^2 + 3x + 2}{x}$ a donc le signe de $x - 1$.

**3. a)** $g' < 0$ sur $]0 ; 1[$ et $g' > 0$ sur $]1 ; +\infty[$ : $g$ est décroissante sur $]0 ; 1]$ et croissante sur $[1 ; +\infty[$.

**3. b)** $g$ admet en $1$ un minimum $g(1) = 1 - 1 - 0 + 3 = 3 > 0$. Donc $g(x) > 0$ pour tout $x > 0$.

### Partie II

**1.** La dérivée de $\frac{x - 1 + \ln x}{x^2}$ est $\frac{\left(1 + \frac{1}{x}\right)x^2 - 2x(x - 1 + \ln x)}{x^4} = \frac{-x^2 + 3x - 2x\ln x}{x^4} = \frac{-x + 3 - 2\ln x}{x^3}$. Donc :

$$f'(x) = 1 + \frac{-x + 3 - 2\ln x}{x^3} = \frac{x^3 - x - 2\ln x + 3}{x^3} = \frac{g(x)}{x^3}$$

$g(x) > 0$ et $x^3 > 0$ : $f$ est strictement croissante sur $]0 ; +\infty[$.

**2. a)** Quand $x \to 0^+$, $x - 1 + \ln x \to -\infty$ et $x^2 \to 0^+$, donc $\frac{x - 1 + \ln x}{x^2} \to -\infty$ et $\lim_{x \to 0^+} f(x) = -\infty$. L’axe des ordonnées est asymptote verticale à $(C)$.

**2. b)** $\frac{x - 1 + \ln x}{x^2} = \frac{1}{x} - \frac{1}{x^2} + \frac{\ln x}{x^2} \to 0$ quand $x \to +\infty$. Comme $x - 1 \to +\infty$, $\lim_{x \to +\infty} f(x) = +\infty$.

**2. c)** $f(x) - (x - 1) = \frac{x - 1 + \ln x}{x^2} \to 0$ en $+\infty$ : la droite $(\Delta) : y = x - 1$ est asymptote oblique à $(C)$ au voisinage de $+\infty$.

**3.** $f(1) = 0$ et $f'(1) = \frac{g(1)}{1} = 3$ : la tangente au point $(1 ; 0)$ a pour équation $y = 3(x - 1)$.

**4.** Éléments pour le tracé (unité $1$ cm) : $f(x) - (x - 1)$ a le signe de $x - 1 + \ln x$, fonction croissante nulle en $1$. Donc $(C)$ est au-dessous de $(\Delta)$ sur $]0 ; 1[$, la coupe en $(1 ; 0)$ avec une tangente de pente $3$, puis reste au-dessus en s’en rapprochant. Quelques valeurs : $f(0{,}5) \approx -5{,}27$, $f(2) \approx 1{,}42$, $f(e) = e - 1 + \frac{1}{e} \approx 2{,}09$.

**5. a)** On intègre par parties avec $u'(x) = \frac{1}{x^2}$, $u(x) = -\frac{1}{x}$, et $v(x) = \ln x$, $v'(x) = \frac{1}{x}$ :

$$\int_1^e \frac{\ln x}{x^2}\,dx = \left[-\frac{\ln x}{x}\right]_1^e + \int_1^e \frac{dx}{x^2} = -\frac{1}{e} + \left[-\frac{1}{x}\right]_1^e = -\frac{1}{e} - \frac{1}{e} + 1 = 1 - \frac{2}{e}$$

**5. b)** Sur $[1 ; e]$, $(C)$ est au-dessus de $(\Delta)$, et $f(x) - (x - 1) = \frac{1}{x} - \frac{1}{x^2} + \frac{\ln x}{x^2}$. L’aire vaut :

$$\int_1^e \left(\frac{1}{x} - \frac{1}{x^2}\right)dx + 1 - \frac{2}{e} = \left[\ln x + \frac{1}{x}\right]_1^e + 1 - \frac{2}{e} = \frac{1}{e} + 1 - \frac{2}{e} = 1 - \frac{1}{e}$$

Avec une unité de $1$ cm, l’aire est $\left(1 - \frac{1}{e}\right)$ cm².
