---
summary: Une intégrale d’une fraction rationnelle, une suite arithmético-géométrique croissante, l’étude de −1 + 1/x − 2 ln x avec sa convexité et une tangente, et le nombre de couleurs obtenues en tirant trois boules.
---

## Exercice 1 : calcul intégral (2 points)

**1.** Pour $x \neq -2$ :

$$x^2 - 2x + 7 - \frac{10}{x + 2} = \frac{(x^2 - 2x + 7)(x + 2) - 10}{x + 2} = \frac{x^3 + 3x + 14 - 10}{x + 2} = \frac{x^3 + 3x + 4}{x + 2}$$

**2.** Sur $[0 ; 1]$, $x + 2 > 0$, donc :

$$I = \int_0^1 \left(x^2 - 2x + 7\right)dx - 10\int_0^1 \frac{dx}{x + 2} = \left[\frac{x^3}{3} - x^2 + 7x\right]_0^1 - 10\Big[\ln(x + 2)\Big]_0^1 = \frac{19}{3} - 10\ln\frac{3}{2}$$

## Exercice 2 : suites numériques (4,5 points)

**1.** $u_1 = \frac{3}{4}$ et $u_2 = \frac{1}{4} \times \frac{3}{4} + \frac{3}{4} = \frac{15}{16}$.

**2. a)** Par récurrence : $0 \leq u_0 = 0 < 1$. Si $0 \leq u_n < 1$, alors $u_{n+1} = \frac{u_n + 3}{4}$ vérifie $\frac{3}{4} \leq u_{n+1} < 1$, donc $0 \leq u_{n+1} < 1$.

**2. b)** $u_{n+1} - u_n = \frac{1}{4}u_n + \frac{3}{4} - u_n = \frac{3}{4}(1 - u_n)$.

**2. c)** Comme $u_n < 1$, $u_{n+1} - u_n > 0$ : la suite est croissante. Elle est majorée par $1$, donc elle converge.

**3. a)** $v_{n+1} = u_{n+1} - 1 = \frac{1}{4}u_n - \frac{1}{4} = \frac{1}{4}v_n$ : $(v_n)$ est géométrique de raison $q = \frac{1}{4}$, de premier terme $v_0 = 0 - 1 = -1$.

**3. b)** $v_n = -\left(\frac{1}{4}\right)^n$, donc $u_n = 1 + v_n = 1 - \left(\frac{1}{4}\right)^n$.

**3. c)** Comme $\left(\frac{1}{4}\right)^n \to 0$, $\lim_{n \to +\infty} u_n = 1$.

## Exercice 3 : étude d’une fonction (9,5 points)

**1. a)** Quand $x \to 0^+$, $\frac{1}{x} \to +\infty$ et $-2\ln x \to +\infty$ : $\lim_{x \to 0^+} f(x) = +\infty$.

**1. b)** L’axe des ordonnées est asymptote verticale à $(C)$.

**2. a)** Quand $x \to +\infty$, $\frac{1}{x} \to 0$ et $-2\ln x \to -\infty$ : $\lim_{x \to +\infty} f(x) = -\infty$. Et $\frac{f(x)}{x} = -\frac{1}{x} + \frac{1}{x^2} - 2\,\frac{\ln x}{x} \to 0$.

**2. b)** $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des abscisses.

**3. a)** $f'(x) = -\frac{1}{x^2} - \frac{2}{x} = -\left(\frac{1}{x^2} + \frac{2}{x}\right)$.

**3. b)** Pour $x > 0$, $f'(x) < 0$ : $f$ est strictement décroissante sur $]0 ; +\infty[$, de $+\infty$ à $-\infty$.

**4. a)** $f''(x) = \frac{2}{x^3} + \frac{2}{x^2} = 2\left(\frac{1}{x^3} + \frac{1}{x^2}\right) > 0$ : $(C)$ est convexe sur $]0 ; +\infty[$.

**4. b)** $f\left(\frac{1}{2}\right) = -1 + 2 + 2\ln 2 = 1 + 2\ln 2 \approx 2{,}4$, $f(1) = -1 + 1 - 0 = 0$ et $f(e) = -1 + \frac{1}{e} - 2 = \frac{1}{e} - 3 \approx -2{,}6$.

**4. c)** $f(1) = 0$ et $f'(1) = -(1 + 2) = -3$ : la tangente en $A(1 ; 0)$ a pour équation $y = -3(x - 1) = -3x + 3$.

**5.** Éléments pour le tracé : on place les points $\left(\frac{1}{2} ; 2{,}4\right)$, $A(1 ; 0)$ et $(e ; -2{,}6)$, et la tangente en $A$, qui passe par $(0 ; 3)$. $(C)$ descend depuis l’asymptote verticale $x = 0$, reste au-dessus de sa tangente (elle est convexe) et descend lentement vers $-\infty$.

## Exercice 4 : probabilités (4 points)

Le sac contient $3$ boules blanches, $4$ vertes et $1$ rouge. On en tire $3$ simultanément : $\binom{8}{3} = 56$ tirages équiprobables.

**1.** Il y a trois couleurs et l’on tire trois boules : $X$ prend les valeurs $1$, $2$ et $3$.

**2.** $X = 1$ : trois blanches ou trois vertes, $\binom{3}{3} + \binom{4}{3} = 5$ tirages. Donc $p(X = 1) = \frac{5}{56}$.

**3.** $X = 3$ : une boule de chaque couleur, $3 \times 4 \times 1 = 12$ tirages, donc $p(X = 3) = \frac{12}{56} = \frac{3}{14}$. Par suite $p(X = 2) = 1 - \frac{5}{56} - \frac{12}{56} = \frac{39}{56}$.

**4.** $E(X) = 1 \times \frac{5}{56} + 2 \times \frac{39}{56} + 3 \times \frac{12}{56} = \frac{119}{56} = \frac{17}{8}$.
