---
summary: Une suite arithmético-géométrique de limite 5/4, l’étude de x + 2/x + ln x avec une branche parabolique de direction y = x, un point d’inflexion et une aire, et un tirage de deux boules avec une espérance.
---

## Exercice 1 : suites numériques (4,5 points)

**1.** $u_1 = \frac{1}{5} + 1 = \frac{6}{5}$ et $u_2 = \frac{6}{25} + 1 = \frac{31}{25}$.

**2.** $u_{n+1} - \frac{5}{4} = \frac{1}{5}u_n - \frac{1}{4} = \frac{1}{5}\left(u_n - \frac{5}{4}\right)$. Par récurrence : $u_0 = 1 < \frac{5}{4}$ ; si $u_n < \frac{5}{4}$, alors $u_{n+1} - \frac{5}{4} < 0$.

**3. a)** $u_{n+1} - u_n = -\frac{4}{5}u_n + 1 = -\frac{4}{5}\left(u_n - \frac{5}{4}\right)$.

**3. b)** Comme $u_n < \frac{5}{4}$, $u_{n+1} - u_n > 0$ : la suite est croissante. Elle est majorée par $\frac{5}{4}$, donc elle converge.

**4. a)** $v_0 = 1 - \frac{5}{4} = -\frac{1}{4}$.

**4. b)** D’après 2., $v_{n+1} = \frac{1}{5}v_n$ : $(v_n)$ est géométrique de raison $\frac{1}{5}$.

**4. c)** $v_n = -\frac{1}{4}\left(\frac{1}{5}\right)^n$, donc $u_n = \frac{5}{4} + v_n = \frac{1}{4}\left(5 - \left(\frac{1}{5}\right)^n\right)$.

**4. d)** $\left(\frac{1}{5}\right)^n \to 0$, donc $\lim_{n \to +\infty} u_n = \frac{5}{4}$.

## Exercice 2 : étude d’une fonction (11 points)

**1. a)** Quand $x \to +\infty$, $x \to +\infty$, $\frac{2}{x} \to 0$ et $\ln x \to +\infty$ : $\lim_{x \to +\infty} f(x) = +\infty$.

**1. b)** $\frac{f(x)}{x} = 1 + \frac{2}{x^2} + \frac{\ln x}{x} \to 1$ et $f(x) - x = \frac{2}{x} + \ln x \to +\infty$. $(C)$ admet en $+\infty$ une branche parabolique de direction la droite $y = x$.

**2. a)** $x + \frac{2 + x\ln x}{x} = x + \frac{2}{x} + \ln x = f(x)$.

**2. b)** Quand $x \to 0^+$, $x\ln x \to 0$, donc $\frac{2 + x\ln x}{x} \to +\infty$ (numérateur vers $2$, dénominateur vers $0^+$) : $\lim_{x \to 0^+} f(x) = +\infty$. L’axe des ordonnées est asymptote verticale à $(C)$.

**3. a)** $f'(x) = 1 - \frac{2}{x^2} + \frac{1}{x}$.

**3. b)** $f'(x) = \frac{x^2 + x - 2}{x^2} = \frac{(x - 1)(x + 2)}{x^2}$. Pour $x > 0$, $x + 2 > 0$ : $(x - 1)(x + 2) \leq 0$ sur $]0 ; 1]$ et $\geq 0$ sur $[1 ; +\infty[$.

**3. c)** $f'$ a le signe de $(x - 1)(x + 2)$ : $f$ est décroissante sur $]0 ; 1]$ et croissante sur $[1 ; +\infty[$.

**3. d)** $f(1) = 1 + 2 + 0 = 3$ : $f$ décroît de $+\infty$ à $3$, puis croît jusqu’à $+\infty$.

**4. a)** $f''(x) = \frac{4}{x^3} - \frac{1}{x^2} = \frac{4 - x}{x^3}$.

**4. b)** $f''(x)$ a le signe de $4 - x$ : positif sur $]0 ; 4[$, négatif sur $]4 ; +\infty[$. $f''$ change de signe en $4$ : $(C)$ admet le point d’inflexion $I(4 ; f(4))$, avec $f(4) = 4 + \frac{1}{2} + \ln 4 = \frac{9}{2} + 2\ln 2$.

**5. a)** On intègre par parties avec $u(x) = \ln x$ et $v'(x) = 1$, donc $v(x) = x$ :

$$\int_1^e \ln x\,dx = \Big[x\ln x\Big]_1^e - \int_1^e 1\,dx = e - (e - 1) = 1$$

**5. b)** Le domaine hachuré est compris entre $(C)$ et la droite $y = x$, pour $x$ entre $1$ et $e$. Sur cet intervalle, $f(x) - x = \frac{2}{x} + \ln x > 0$. L’aire vaut :

$$\int_1^e \left(\frac{2}{x} + \ln x\right)dx = 2\Big[\ln x\Big]_1^e + 1 = 2 + 1 = 3$$

unités d’aire.

## Exercice 3 : probabilités (4,5 points)

Le sac contient $3$ boules vertes et $5$ rouges.

**1.** On tire $2$ boules simultanément parmi $8$ : $\binom{8}{2} = 28$ tirages possibles.

**2. a)** $A$ : deux vertes ou deux rouges, $\binom{3}{2} + \binom{5}{2} = 3 + 10 = 13$ tirages. $p(A) = \frac{13}{28}$.

**2. b)** $B$ est l’événement contraire de $A$ : $p(B) = 1 - \frac{13}{28} = \frac{15}{28}$.

**3. a)** $X = 0$ : deux rouges, $\binom{5}{2} = 10$ tirages. $p(X = 0) = \frac{10}{28}$.

**3. b)** $X = 1$ : une verte et une rouge, $3 \times 5 = 15$ tirages, donc $p(X = 1) = \frac{15}{28}$. $X = 2$ : $\binom{3}{2} = 3$ tirages, donc $p(X = 2) = \frac{3}{28}$.

**3. c)** $E(X) = 0 \times \frac{10}{28} + 1 \times \frac{15}{28} + 2 \times \frac{3}{28} = \frac{21}{28} = \frac{3}{4}$.
