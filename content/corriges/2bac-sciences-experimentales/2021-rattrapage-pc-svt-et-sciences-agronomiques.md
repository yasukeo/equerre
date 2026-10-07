---
summary: Une suite récurrente et une suite arithmétique associée, des nombres complexes (rotation, homothétie, trapèze isocèle), la fonction x + ln x et un problème sur 2 − x e^(−x+1) avec une intégrale et une fonction réciproque.
---

## Exercice 1 : suites numériques (4 points)

**1.** Par récurrence : $0 < u_0 = \frac{1}{3} < 1$. Si $0 < u_n < 1$, alors $1 + u_n > 0$ et $3 - u_n > 0$, donc $u_{n+1} > 0$ ; et $u_{n+1} < 1 \iff 1 + u_n < 3 - u_n \iff u_n < 1$, ce qui est vrai.

**2. a)** $u_{n+1} - u_n = \frac{1 + u_n - u_n(3 - u_n)}{3 - u_n} = \frac{u_n^2 - 2u_n + 1}{3 - u_n} = \frac{(u_n - 1)^2}{3 - u_n}$.

**2. b)** Ce nombre est positif : la suite est croissante. Elle est majorée par $1$, donc elle converge.

**3. a)** $1 - u_{n+1} = \frac{3 - u_n - 1 - u_n}{3 - u_n} = \frac{2(1 - u_n)}{3 - u_n}$, donc :

$$v_{n+1} = \frac{3 - u_n}{2(1 - u_n)} = \frac{2 + (1 - u_n)}{2(1 - u_n)} = \frac{1}{1 - u_n} + \frac{1}{2} = v_n + \frac{1}{2}$$

$(v_n)$ est arithmétique de raison $\frac{1}{2}$ et de premier terme $v_0 = \frac{1}{1 - \frac{1}{3}} = \frac{3}{2}$.

**3. b)** $v_n = \frac{3}{2} + \frac{n}{2} = \frac{n + 3}{2}$, donc $u_n = 1 - \frac{1}{v_n} = 1 - \frac{2}{n + 3} = \frac{n + 1}{n + 3}$.

**3. c)** $\lim_{n \to +\infty} u_n = 1$.

**4.** $u_n \geq \frac{1011}{1012} \iff 1 - \frac{2}{n + 3} \geq 1 - \frac{1}{1012} \iff \frac{2}{n + 3} \leq \frac{1}{1012} \iff n + 3 \geq 2024 \iff n \geq 2021$.

## Exercice 2 : nombres complexes (5 points)

**1.** $\Delta = 36 - 52 = -16 = (4i)^2$ : les solutions sont $3 + 2i$ et $3 - 2i$.

**2. a)** $\frac{c - b}{a - b} = \frac{-4}{4i} = i = \cos\frac{\pi}{2} + i\sin\frac{\pi}{2}$.

**2. b)** $BC = BA$ et $(\overrightarrow{BA}, \overrightarrow{BC}) \equiv \frac{\pi}{2} \; [2\pi]$ : le triangle $ABC$ est rectangle et isocèle en $B$.

**3. a)** $z' - b = i(z - b)$, donc $z' = iz + (3 - 2i)(1 - i) = iz + 1 - 5i$.

**3. b)** $i(3 + 2i) + 1 - 5i = 3i - 2 + 1 - 5i = -1 - 2i = c$ : $C$ est l’image de $A$ par $R$.

**4. a)** $\frac{d - c}{a - c} = \frac{-2 - 2i}{4 + 4i} = -\frac{1}{2}$ est réel : $A$, $C$ et $D$ sont alignés.

**4. b)** $d - c = -\frac{1}{2}(a - c)$ : le rapport de l’homothétie est $-\frac{1}{2}$.

**4. c)** $BCDE$ est un parallélogramme si et seulement si $\overrightarrow{BC} = \overrightarrow{ED}$, soit $c - b = d - m$. Donc $m = d - c + b = -2 - 2i + 3 - 2i = 1 - 4i$.

**5. a)** $\frac{d - a}{m - b} = \frac{-6 - 6i}{-2 - 2i} = 3$ est réel.

**5. b)** D’après 5. a), $(AD) \parallel (BE)$ et $AD = 3BE$ : $ABED$ est un trapèze de bases $[AD]$ et $[BE]$, qui n’est pas un parallélogramme. Ses côtés non parallèles ont la même longueur : $AB = |b - a| = |-4i| = 4$ et $DE = |m - d| = |4| = 4$. C’est un trapèze isocèle.

## Exercice 3 : fonctions numériques (3 points)

**1.** $h'(x) = 1 + \frac{1}{x} > 0$ : $h$ est strictement croissante sur $]0 ; +\infty[$.

**2.** $h$ est continue, $\lim_{x \to 0^+} h(x) = -\infty$ et $\lim_{x \to +\infty} h(x) = +\infty$ : $h(]0 ; +\infty[) = \mathbb{R}$.

**3. a)** $h$ est une bijection de $]0 ; +\infty[$ sur $\mathbb{R}$, qui contient $0$ : l’équation $h(x) = 0$ a une unique solution $\alpha$.

**3. b)** $h(\alpha) = 0 < 1 = h(1)$ et $h$ est croissante, donc $\alpha < 1$ ; et $\alpha > 0$. Ainsi $0 < \alpha < 1$.

**4. a)** $h(\alpha) = 0$ donne $\ln \alpha = -\alpha$. Donc $h\left(\frac{1}{\alpha}\right) = \frac{1}{\alpha} - \ln \alpha = \frac{1}{\alpha} + \alpha$.

**4. b)** $\alpha + \frac{1}{\alpha} - 2 = \frac{(\alpha - 1)^2}{\alpha} > 0$, car $\alpha \neq 1$ : $h\left(\frac{1}{\alpha}\right) > 2$.

## Problème (8 points)

**1.** $xe^{-x+1} = e \cdot xe^{-x} \to 0$ quand $x \to +\infty$, donc $\lim_{x \to +\infty} f(x) = 2$ : la droite $y = 2$ est asymptote horizontale en $+\infty$.

**2. a)** Quand $x \to -\infty$, $-x \to +\infty$ et $e^{-x+1} \to +\infty$, donc $\lim_{x \to -\infty} f(x) = +\infty$.

**2. b)** $\frac{f(x)}{x} = \frac{2}{x} - e^{-x+1} \to -\infty$ : $(C)$ admet en $-\infty$ une branche parabolique de direction l’axe des ordonnées.

**3. a)** $f'(x) = -\left(e^{-x+1} - xe^{-x+1}\right) = (x - 1)e^{-x+1}$.

**3. b)** $f$ est décroissante sur $]-\infty ; 1]$, de $+\infty$ à $f(1) = 1$, puis croissante sur $[1 ; +\infty[$, vers $2$.

**4. a)** $f''(x) = e^{-x+1} - (x - 1)e^{-x+1} = (2 - x)e^{-x+1}$.

**4. b)** $f''$ s’annule en changeant de signe en $2$ : le point $(2 ; f(2))$, avec $f(2) = 2 - 2e^{-1} \approx 1{,}25$, est un point d’inflexion.

**5.** Éléments pour le tracé : minimum $(1 ; 1)$ avec une tangente horizontale, inflexion $(2 ; 1{,}25)$, $f(0) = 2$ ; asymptote $y = 2$ en $+\infty$ (la courbe est au-dessous pour $x > 0$) et branche parabolique verticale en $-\infty$.

**6.** La valeur minimale de $f$ est $f(1) = 1$. Donc $2 - xe^{1-x} \geq 1$, soit $xe^{1-x} \leq 1$, et en multipliant par $e^{x-1} > 0$ : $x \leq e^{x-1}$.

**7. a)** On intègre par parties avec $u(x) = x$ et $v'(x) = e^{-x}$ :

$$\int_0^2 xe^{-x}\,dx = \Big[-xe^{-x}\Big]_0^2 + \int_0^2 e^{-x}\,dx = -2e^{-2} + 1 - e^{-2} = 1 - 3e^{-2}$$

**7. b)** $\int_0^2 f(x)\,dx = \int_0^2 2\,dx - e\int_0^2 xe^{-x}\,dx = 4 - e(1 - 3e^{-2}) = 4 - e + 3e^{-1}$.

**8. a)** $g$ est continue et strictement décroissante sur $]-\infty ; 1]$ : elle admet une réciproque $g^{-1}$ définie sur $J = g(]-\infty ; 1]) = [1 ; +\infty[$.

**8. b)** La courbe de $g^{-1}$ est la symétrique de la partie de $(C)$ située sur $]-\infty ; 1]$ par rapport à la droite $y = x$. Elle part du point $(1 ; 1)$ avec une tangente verticale (car $g'(1) = 0$), passe par $(2 ; 0)$ (car $g(0) = 2$), et descend vers $-\infty$.

**8. c)** La branche parabolique de direction $(Oy)$ de $(C)$ en $-\infty$ devient, par symétrie, une branche parabolique de direction $(Ox)$ pour $g^{-1}$ en $+\infty$. Donc $\lim_{x \to +\infty} \frac{g^{-1}(x)}{x} = 0$. On le retrouve en posant $y = g^{-1}(x) \to -\infty$ : $\frac{g^{-1}(x)}{x} = \frac{y}{g(y)} \to 0$, car $\frac{g(y)}{y} \to -\infty$.
