---
summary: Une suite arithmético-géométrique, une sphère tangente à un plan, des nombres complexes (alignement, rotation), une loi binomiale, et un problème sur 3 − 3x + 2(x + 1) ln x avec un point d’inflexion, une intégration par parties et une aire.
---

## Exercice 1 : suites numériques (3 points)

**1. a)** $u_{n+1} - 1 = \frac{1}{16}u_n - \frac{1}{16} = \frac{1}{16}(u_n - 1)$. Par récurrence : $u_0 = 2 > 1$ ; si $u_n > 1$, alors $u_{n+1} - 1 = \frac{1}{16}(u_n - 1) > 0$, donc $u_{n+1} > 1$.

**1. b)** $u_{n+1} - u_n = \frac{1}{16}u_n + \frac{15}{16} - u_n = -\frac{15}{16}u_n + \frac{15}{16} = -\frac{15}{16}(u_n - 1)$. Comme $u_n > 1$, ce nombre est négatif : la suite $(u_n)$ est décroissante.

**1. c)** La suite est décroissante et minorée par $1$ : elle converge.

**2. a)** $v_{n+1} = u_{n+1} - 1 = \frac{1}{16}(u_n - 1) = \frac{1}{16}v_n$. La suite $(v_n)$ est géométrique de raison $\frac{1}{16}$, de premier terme $v_0 = u_0 - 1 = 1$ : $v_n = \left(\frac{1}{16}\right)^n$.

**2. b)** $u_n = 1 + v_n = 1 + \left(\frac{1}{16}\right)^n$. Comme $0 < \frac{1}{16} < 1$, $\left(\frac{1}{16}\right)^n \to 0$, donc $\lim_{n \to +\infty} u_n = 1$.

## Exercice 2 : géométrie dans l’espace (3 points)

**1. a)** $\overrightarrow{OA}(1 ; 3 ; 4)$ et $\overrightarrow{OB}(0 ; 1 ; 2)$, donc $\overrightarrow{OA} \wedge \overrightarrow{OB} = (3 \times 2 - 4 \times 1)\,\vec{i} + (4 \times 0 - 1 \times 2)\,\vec{j} + (1 \times 1 - 3 \times 0)\,\vec{k} = 2\vec{i} - 2\vec{j} + \vec{k}$.

**1. b)** Ce vecteur est non nul, donc $O$, $A$ et $B$ ne sont pas alignés, et il est normal au plan $(OAB)$. Ce plan passe par $O$ : une équation est $2x - 2y + z = 0$. On vérifie avec $A$ : $2 - 6 + 4 = 0$, et avec $B$ : $0 - 2 + 2 = 0$.

**2.** $x^2 - 6x + y^2 + 6y + z^2 - 6z + 2 = 0$ s’écrit $(x - 3)^2 + (y + 3)^2 + (z - 3)^2 = 9 + 9 + 9 - 2 = 25$ : $(S)$ a pour centre $\Omega(3 ; -3 ; 3)$ et pour rayon $5$.

**3. a)** $d(\Omega, (OAB)) = \frac{|6 + 6 + 3|}{\sqrt{4 + 4 + 1}} = \frac{15}{3} = 5$ : la distance est égale au rayon, le plan $(OAB)$ est tangent à $(S)$.

**3. b)** $H$ est le projeté orthogonal de $\Omega$ sur le plan. La droite passant par $\Omega$ et dirigée par $2\vec{i} - 2\vec{j} + \vec{k}$ a pour représentation $x = 3 + 2t$, $y = -3 - 2t$, $z = 3 + t$. Dans l’équation du plan : $2(3 + 2t) - 2(-3 - 2t) + 3 + t = 15 + 9t = 0$, soit $t = -\frac{5}{3}$. Donc $H\left(-\frac{1}{3} ; \frac{1}{3} ; \frac{4}{3}\right)$.

## Exercice 3 : nombres complexes (3 points)

**1.** $\Delta = 64 - 164 = -100 = (10i)^2$ : les solutions sont $4 + 5i$ et $4 - 5i$.

**2. a)** $\frac{c - b}{a - b} = \frac{3 + 3i}{1 + i} = 3$. Ce nombre est réel : les points $A$, $B$ et $C$ sont alignés.

**2. b)** $z' - \omega = e^{-i\frac{\pi}{2}}(z - \omega) = -i(z - \omega)$, donc $z' = -iz + (1 + i)\omega = -iz + (1 + i)(4 + 7i) = -iz + 4 + 7i + 4i - 7 = -iz - 3 + 11i$.

**2. c)** L’image de $C$ a pour affixe $-i(6 + 7i) - 3 + 11i = -6i + 7 - 3 + 11i = 4 + 5i = a$ : c’est le point $A$. Ainsi $a - \omega = -i(c - \omega)$, et :

$$\frac{a - \omega}{c - \omega} = -i = \cos\left(-\frac{\pi}{2}\right) + i\sin\left(-\frac{\pi}{2}\right)$$

## Exercice 4 : probabilités (3 points)

**1.** L’urne contient $6$ boules portant un nombre pair (deux « 2 » et quatre « 4 »). Il y a $10 \times 9 = 90$ tirages successifs sans remise équiprobables, dont $6 \times 5 = 30$ donnent deux nombres pairs : $p(A) = \frac{30}{90} = \frac{1}{3}$.

**2.** Les trois expériences sont identiques et indépendantes (on remet les boules), et $A$ a la probabilité $\frac{1}{3}$ à chaque fois : $X$ suit la loi binomiale de paramètres $3$ et $\frac{1}{3}$. Donc $p(X = 1) = \binom{3}{1} \times \frac{1}{3} \times \left(\frac{2}{3}\right)^2 = 3 \times \frac{4}{27} = \frac{4}{9}$. De même :

$p(X = 0) = \left(\frac{2}{3}\right)^3 = \frac{8}{27}$, $p(X = 1) = \frac{12}{27}$, $p(X = 2) = 3 \times \frac{1}{9} \times \frac{2}{3} = \frac{6}{27}$ et $p(X = 3) = \left(\frac{1}{3}\right)^3 = \frac{1}{27}$. On vérifie : $8 + 12 + 6 + 1 = 27$.

## Problème (8 points)

### Partie I

**1.** $g(1) = 2 - 1 + 2\ln 1 = 1$.

**2.** D’après le tableau, $g$ admet en $1$ un minimum égal à $g(1) = 1$. Donc $g(x) \geq 1 > 0$ pour tout $x \in ]0 ; +\infty[$.

### Partie II

**1.** Quand $x \to 0^+$, $\ln x \to -\infty$ et $2(x + 1) \to 2$, donc $2(x + 1)\ln x \to -\infty$ ; et $3 - 3x \to 3$. Ainsi $\lim_{x \to 0^+} f(x) = -\infty$ : l’axe des ordonnées (la droite $x = 0$) est asymptote verticale à $(C)$.

**2. a)** $f(x) = x\left[\frac{3}{x} - 3 + 2\left(1 + \frac{1}{x}\right)\ln x\right]$. Quand $x \to +\infty$, $\frac{3}{x} \to 0$, $1 + \frac{1}{x} \to 1$ et $\ln x \to +\infty$ : le crochet tend vers $+\infty$, donc $\lim_{x \to +\infty} f(x) = +\infty$.

**2. b)** $\frac{f(x)}{x} = \frac{3}{x} - 3 + 2\left(1 + \frac{1}{x}\right)\ln x \to +\infty$ : $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**3. a)** $f'(x) = -3 + 2\ln x + 2(x + 1) \times \frac{1}{x} = -3 + 2\ln x + 2 + \frac{2}{x} = \frac{2}{x} - 1 + 2\ln x = g(x)$.

**3. b)** $f'(x) = g(x) > 0$ : $f$ est strictement croissante sur $]0 ; +\infty[$, de $-\infty$ (en $0^+$) à $+\infty$, et $f(1) = 3 - 3 + 4\ln 1 = 0$.

**4. a)** $f''(x) = g'(x)$. D’après le tableau, $g'$ s’annule en $1$ en changeant de signe (négative avant, positive après) ; on le retrouve avec $g'(x) = -\frac{2}{x^2} + \frac{2}{x} = \frac{2(x - 1)}{x^2}$. Donc le point $I(1 ; f(1)) = I(1 ; 0)$ est un point d’inflexion de $(C)$.

**4. b)** La tangente en $I$ a pour équation $y = f'(1)(x - 1) + f(1) = g(1)(x - 1) = x - 1$.

**4. c)** Éléments pour le tracé (unité $2$ cm) : asymptote verticale $x = 0$, courbe croissante, concave sur $]0 ; 1]$ et convexe sur $[1 ; +\infty[$, passant par $I(1 ; 0)$ où elle traverse sa tangente $(T)$. Quelques valeurs : $f(0{,}5) \approx -0{,}58$, $f(2) = 6\ln 2 - 3 \approx 1{,}16$, $f(3) = 8\ln 3 - 6 \approx 2{,}79$. Branche parabolique verticale en $+\infty$.

**5. a)** $\int_1^2 \left(1 + \frac{x}{2}\right)dx = \left[x + \frac{x^2}{4}\right]_1^2 = (2 + 1) - \left(1 + \frac{1}{4}\right) = \frac{7}{4}$.

**5. b)** On intègre par parties avec $u(x) = \ln x$ et $v'(x) = x + 1$, donc $u'(x) = \frac{1}{x}$ et $v(x) = \frac{x^2}{2} + x$ :

$$\int_1^2 (x + 1)\ln x\,dx = \left[\left(\frac{x^2}{2} + x\right)\ln x\right]_1^2 - \int_1^2 \left(\frac{x}{2} + 1\right)dx = 4\ln 2 - \frac{7}{4}$$

**5. c)** Sur $[1 ; 2]$, $f$ est croissante et $f(1) = 0$, donc $f \geq 0$. L’aire vaut $\int_1^2 f(x)\,dx$ unités d’aire, avec :

$$\int_1^2 f(x)\,dx = \left[3x - \frac{3x^2}{2}\right]_1^2 + 2\left(4\ln 2 - \frac{7}{4}\right) = -\frac{3}{2} + 8\ln 2 - \frac{7}{2} = 8\ln 2 - 5$$

Une unité d’aire vaut $2 \times 2 = 4$ cm² : l’aire est $4(8\ln 2 - 5) = (32\ln 2 - 20)$ cm², soit environ $2{,}18$ cm².

**6.** $(x + 1)\ln x \geq \frac{3}{2}(x - 1) \iff 2(x + 1)\ln x \geq 3x - 3 \iff f(x) \geq 0$. Graphiquement, $(C)$ est au-dessus de l’axe des abscisses exactement pour $x \geq 1$ (elle le coupe en $I$). L’ensemble des solutions est $[1 ; +\infty[$.
