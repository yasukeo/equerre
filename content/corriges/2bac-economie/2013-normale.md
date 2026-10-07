---
summary: Une équation exponentielle du second degré, une suite arithmético-géométrique de limite 8/3, l’étude de 1/x + ln x avec un point d’inflexion et une aire, et un tirage de quatre boules avec une probabilité conditionnelle.
---

## Exercice 1 : équation exponentielle (1,5 point)

**1.** $(X - 4)(X - 2) = X^2 - 2X - 4X + 8 = X^2 - 6X + 8$.

**2.** Avec $X = e^x$, l’équation devient $(e^x - 4)(e^x - 2) = 0$, donc $e^x = 4$ ou $e^x = 2$. Les solutions sont $\ln 2$ et $\ln 4 = 2\ln 2$.

## Exercice 2 : suites numériques (4 points)

**1.** $u_1 = 0 + 2 = 2$ et $u_2 = \frac{2}{4} + 2 = \frac{5}{2}$.

**2. a)** $v_0 = 0 - \frac{8}{3} = -\frac{8}{3}$.

**2. b)** $v_{n+1} = \frac{1}{4}u_n + 2 - \frac{8}{3} = \frac{1}{4}u_n - \frac{2}{3} = \frac{1}{4}\left(u_n - \frac{8}{3}\right) = \frac{1}{4}v_n$ : $(v_n)$ est géométrique de raison $q = \frac{1}{4}$.

**2. c)** $v_n = -\frac{8}{3}\left(\frac{1}{4}\right)^n$, donc $u_n = v_n + \frac{8}{3} = \frac{8}{3}\left(1 - \left(\frac{1}{4}\right)^n\right)$.

**2. d)** Comme $\left(\frac{1}{4}\right)^n \to 0$, $\lim_{n \to +\infty} u_n = \frac{8}{3}$.

## Exercice 3 : étude d’une fonction (10 points)

**1.** Quand $x \to +\infty$, $\frac{1}{x} \to 0$ et $\ln x \to +\infty$ : $\lim_{x \to +\infty} f(x) = +\infty$. Et $\frac{f(x)}{x} = \frac{1}{x^2} + \frac{\ln x}{x} \to 0$ : $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des abscisses.

**2.** $\frac{1 + x\ln x}{x} = \frac{1}{x} + \ln x = f(x)$. Quand $x \to 0^+$, $x\ln x \to 0$, donc le numérateur tend vers $1$ et le dénominateur vers $0^+$ : $\lim_{x \to 0^+} f(x) = +\infty$. L’axe des ordonnées est asymptote verticale à $(C)$.

**3. a)** $f'(x) = -\frac{1}{x^2} + \frac{1}{x} = \frac{x - 1}{x^2}$.

**3. b)** $f'(x)$ a le signe de $x - 1$ : $f$ décroît sur $]0 ; 1]$ de $+\infty$ à $f(1) = 1$, puis croît sur $[1 ; +\infty[$ jusqu’à $+\infty$.

**4.** $f''(x) = \frac{2}{x^3} - \frac{1}{x^2} = \frac{2 - x}{x^3}$. $f''$ s’annule en $2$ en changeant de signe (positive avant, négative après) : le point $I\left(2 ; \frac{1}{2} + \ln 2\right)$ est un point d’inflexion de $(C)$.

**5. a)** On intègre par parties avec $u(x) = \ln x$ et $v'(x) = 1$, donc $v(x) = x$ :

$$\int_1^3 \ln x\,dx = \Big[x\ln x\Big]_1^3 - \int_1^3 1\,dx = 3\ln 3 - 2$$

**5. b)** La partie hachurée est limitée par $(C)$, l’axe des abscisses et les droites $x = 1$ et $x = 3$. Comme $f \geq 1 > 0$, son aire vaut :

$$\int_1^3 \left(\frac{1}{x} + \ln x\right)dx = \ln 3 + 3\ln 3 - 2 = 4\ln 3 - 2$$

en unités d’aire, soit environ $2{,}39$.

## Exercice 4 : probabilités (4,5 points)

Le sac contient $4$ boules rouges, $3$ vertes et $3$ blanches. On en tire $4$ simultanément : $\binom{10}{4} = 210$ tirages équiprobables.

**1. a)** Seules les rouges sont au nombre de $4$ : un seul tirage donne quatre boules de même couleur. $P(A) = \frac{1}{210}$.

**1. b)** $B$ : une blanche parmi $3$ et trois boules parmi les $7$ autres, $3 \times \binom{7}{3} = 105$ tirages. $P(B) = \frac{105}{210} = \frac{1}{2}$.

**1. c)** Trois rouges et une autre : $\binom{4}{3} \times 6 = 24$ ; trois vertes et une autre : $1 \times 7 = 7$ ; trois blanches et une autre : $1 \times 7 = 7$. Au total $38$ tirages, donc $P(C) = \frac{38}{210} = \frac{19}{105}$.

**2.** $B \cap C$ : trois rouges et une blanche ($4 \times 3 = 12$ tirages) ou trois vertes et une blanche ($1 \times 3 = 3$ tirages), soit $15$ tirages. Donc :

$$P_C(B) = \frac{P(B \cap C)}{P(C)} = \frac{15}{38}$$
