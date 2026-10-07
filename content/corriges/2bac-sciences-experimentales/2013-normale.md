---
summary: Un plan coupant une sphère suivant un cercle, une rotation et un alignement dans le plan complexe, un tirage simultané de quatre boules, une suite homographique rendue arithmétique, et l’étude de (x − 2)²eˣ avec deux points d’inflexion, une aire et une équation résolue graphiquement.
---

## Exercice 1 : géométrie dans l’espace (3 points)

**1. a)** $\overrightarrow{OA}(-1 ; 1 ; 0)$ et $\overrightarrow{OB}(1 ; 0 ; 1)$, donc :

$$\overrightarrow{OA} \wedge \overrightarrow{OB} = (1 \times 1 - 0 \times 0)\,\vec{i} + (0 \times 1 - (-1) \times 1)\,\vec{j} + ((-1) \times 0 - 1 \times 1)\,\vec{k} = \vec{i} + \vec{j} - \vec{k}$$

Ce vecteur non nul est normal au plan $(OAB)$, qui passe par $O$ : une équation est $x + y - z = 0$. On vérifie avec $A$ : $-1 + 1 - 0 = 0$, et avec $B$ : $1 + 0 - 1 = 0$.

**1. b)** $d(\Omega, (OAB)) = \frac{|1 + 1 + 1|}{\sqrt{1 + 1 + 1}} = \frac{3}{\sqrt{3}} = \sqrt{3}$. Comme $\sqrt{3} < 3$, le plan coupe la sphère suivant un cercle $(\Gamma)$ de rayon $\sqrt{3^2 - 3} = \sqrt{6}$.

**2. a)** $(\Delta)$ passe par $\Omega(1 ; 1 ; -1)$ et est dirigée par $\vec{i} + \vec{j} - \vec{k}$ : $x = 1 + t$, $y = 1 + t$, $z = -1 - t$, avec $t \in \mathbb{R}$.

**2. b)** Le centre de $(\Gamma)$ est le point d’intersection de $(\Delta)$ et de $(OAB)$ : $(1 + t) + (1 + t) - (-1 - t) = 3 + 3t = 0$, soit $t = -1$. Le centre est le point $(0 ; 0 ; 0)$, c’est-à-dire $O$.

## Exercice 2 : nombres complexes (3 points)

**1. a)** $c - a = -9 + 3i$ et $b - a = -3 + 6i$. Or $(1 + i)(-3 + 6i) = -3 + 6i - 3i - 6 = -9 + 3i$, donc $\frac{c - a}{b - a} = 1 + i$.

**1. b)** $|1 + i| = \sqrt{2}$, donc $AC = \sqrt{2}\,AB$. Et $1 + i = \sqrt{2}\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right)$, donc $(\overrightarrow{AB}, \overrightarrow{AC}) \equiv \frac{\pi}{4} \; [2\pi]$.

**2. a)** $R$ s’écrit $z' - b = i(z - b)$. Donc $d = b + i(a - b) = 4 + 8i + i(3 - 6i) = 4 + 8i + 3i + 6 = 10 + 11i$.

**2. b)** $\frac{d - c}{b - c} = \frac{12 + 6i}{6 + 3i} = 2$. Ce nombre est réel : les points $B$, $C$ et $D$ sont alignés.

## Exercice 3 : probabilités (3 points)

On tire simultanément $4$ boules parmi $10$ ($5$ rouges, $3$ vertes, $2$ blanches) : il y a $\binom{10}{4} = 210$ tirages équiprobables.

**1.** $P(A) = \frac{\binom{5}{2}\binom{3}{2}}{210} = \frac{10 \times 3}{210} = \frac{1}{7}$ et $P(B) = \frac{\binom{8}{4}}{210} = \frac{70}{210} = \frac{1}{3}$.

**2. a)** Il n’y a que $2$ boules blanches, et $8$ boules non blanches permettent de n’en tirer aucune : $X$ prend les valeurs $0$, $1$ et $2$.

**2. b)** $P(X = 1) = \frac{\binom{2}{1}\binom{8}{3}}{210} = \frac{2 \times 56}{210} = \frac{8}{15}$. De plus $P(X = 0) = P(B) = \frac{1}{3} = \frac{5}{15}$ et $P(X = 2) = \frac{\binom{8}{2}}{210} = \frac{28}{210} = \frac{2}{15}$. La loi de $X$ est : $P(X = 0) = \frac{5}{15}$, $P(X = 1) = \frac{8}{15}$, $P(X = 2) = \frac{2}{15}$.

## Exercice 4 : suites numériques (3 points)

**1.** $5 - u_{n+1} = 5 - \frac{25}{10 - u_n} = \frac{25 - 5u_n}{10 - u_n} = \frac{5(5 - u_n)}{5 + (5 - u_n)}$. Par récurrence : $5 - u_1 = 5 > 0$ ; si $5 - u_n > 0$, le numérateur $5(5 - u_n)$ et le dénominateur $5 + (5 - u_n)$ sont positifs, donc $5 - u_{n+1} > 0$. En particulier $10 - u_n \neq 0$ et la suite est bien définie.

**2. a)** D’après 1., $v_{n+1} = \frac{5}{5 - u_{n+1}} = \frac{5(10 - u_n)}{5(5 - u_n)} = \frac{10 - u_n}{5 - u_n}$. Donc $v_{n+1} - v_n = \frac{10 - u_n - 5}{5 - u_n} = 1$.

**2. b)** $(v_n)$ est arithmétique de raison $1$ et de premier terme $v_1 = \frac{5}{5 - 0} = 1$ : $v_n = 1 + (n - 1) = n$. Alors $5 - u_n = \frac{5}{v_n} = \frac{5}{n}$, soit $u_n = 5 - \frac{5}{n}$.

**2. c)** $\lim_{n \to +\infty} u_n = 5$.

## Exercice 5 : étude d’une fonction et calcul intégral (8 points)

**1. a)** $(x - 2)^2 \to +\infty$ et $e^x \to +\infty$ : $\lim_{x \to +\infty} f(x) = +\infty$.

**1. b)** $\frac{f(x)}{x} = \frac{(x - 2)^2}{x}\,e^x$, et $\frac{(x - 2)^2}{x} = x - 4 + \frac{4}{x} \to +\infty$ : $\lim_{x \to +\infty} \frac{f(x)}{x} = +\infty$. $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**2. a)** $(x - 2)^2 = x^2 - 4x + 4$, donc $f(x) = x^2e^x - 4xe^x + 4e^x$.

**2. b)** Quand $x \to -\infty$, $x^2e^x \to 0$, $xe^x \to 0$ et $e^x \to 0$ : $\lim_{x \to -\infty} f(x) = 0$. L’axe des abscisses est asymptote horizontale à $(C)$ au voisinage de $-\infty$.

**3. a)** $f'(x) = 2(x - 2)e^x + (x - 2)^2e^x = (x - 2)(2 + x - 2)e^x = x(x - 2)e^x$.

**3. b)** $f'(x)$ a le signe de $x(x - 2)$ : positif sur $]-\infty ; 0[$ et sur $]2 ; +\infty[$, négatif sur $]0 ; 2[$. Donc $f$ est croissante sur $]-\infty ; 0]$ et sur $[2 ; +\infty[$, décroissante sur $[0 ; 2]$.

**3. c)** $f$ croît de $0$ (en $-\infty$) à $f(0) = 4$, décroît jusqu’à $f(2) = 0$, puis croît jusqu’à $+\infty$.

**4. a)** $f'(x) = (x^2 - 2x)e^x$, donc $f''(x) = (2x - 2)e^x + (x^2 - 2x)e^x = (x^2 - 2)e^x$. $f''$ s’annule en $-\sqrt{2}$ et en $\sqrt{2}$ en changeant de signe : $(C)$ a deux points d’inflexion, d’abscisses $-\sqrt{2}$ et $\sqrt{2}$.

**4. b)** Éléments pour le tracé (unité $1$ cm) : asymptote $y = 0$ en $-\infty$, maximum local $(0 ; 4)$ et minimum $(2 ; 0)$ avec des tangentes horizontales, inflexions vers $(-1{,}41 ; 2{,}83)$ et $(1{,}41 ; 1{,}41)$, branche parabolique verticale en $+\infty$. Quelques valeurs : $f(-4) \approx 0{,}66$, $f(-2) \approx 2{,}17$, $f(1) = e \approx 2{,}72$, $f(3) = e^3 \approx 20{,}1$.

**5. a)** $H'(x) = e^x + (x - 1)e^x = xe^x = h(x)$. Donc $\int_0^1 xe^x\,dx = H(1) - H(0) = 0 - (-1) = 1$.

**5. b)** On intègre par parties avec $u(x) = x^2$ et $v'(x) = e^x$ :

$$\int_0^1 x^2e^x\,dx = \Big[x^2e^x\Big]_0^1 - \int_0^1 2xe^x\,dx = e - 2 \times 1 = e - 2$$

**5. c)** $f \geq 0$, donc l’aire vaut, en unités d’aire :

$$\int_0^1 f(x)\,dx = \int_0^1 x^2e^x\,dx - 4\int_0^1 xe^x\,dx + 4\int_0^1 e^x\,dx = (e - 2) - 4 + 4(e - 1) = 5e - 10$$

Avec une unité de $1$ cm, l’aire est $5(e - 2)$ cm².

**6.** $x^2 = e^{-x} + 4x - 4 \iff (x - 2)^2 = e^{-x} \iff (x - 2)^2e^x = 1 \iff f(x) = 1$. Les solutions sont les abscisses des points d’intersection de $(C)$ avec la droite $y = 1$. D’après les variations, $f$ prend une fois la valeur $1$ sur $]-\infty ; 0]$ (elle croît de $0$ à $4$), une fois sur $[0 ; 2]$ (elle décroît de $4$ à $0$) et une fois sur $[2 ; +\infty[$ (elle croît de $0$ à $+\infty$). L’équation a donc trois solutions.
