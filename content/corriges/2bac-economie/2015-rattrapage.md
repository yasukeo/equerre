---
summary: Une suite arithmético-géométrique décroissante de limite 4, l’étude de x² − 1 − 2x ln x avec la fonction auxiliaire x − 1 − ln x, un point d’inflexion et une aire, et un tirage de trois boules parmi dix.
---

## Exercice 1 : suites numériques (4,5 points)

**1.** $u_1 = \frac{8}{4} + 3 = 5$ et $u_2 = \frac{5}{4} + 3 = \frac{17}{4}$.

**2.** $u_{n+1} - 4 = \frac{1}{4}u_n - 1 = \frac{1}{4}(u_n - 4)$. Par récurrence : $u_0 = 8 > 4$ ; si $u_n > 4$, alors $u_{n+1} - 4 > 0$.

**3. a)** $u_{n+1} - u_n = -\frac{3}{4}u_n + 3 = -\frac{3}{4}(u_n - 4)$.

**3. b)** Comme $u_n > 4$, $u_{n+1} - u_n < 0$ : la suite est décroissante. Elle est minorée par $4$, donc elle converge.

**4. a)** $v_0 = 8 - 4 = 4$.

**4. b)** D’après 2., $v_{n+1} = \frac{1}{4}v_n$ : $(v_n)$ est géométrique de raison $\frac{1}{4}$.

**4. c)** $v_n = 4\left(\frac{1}{4}\right)^n$, donc $u_n = v_n + 4 = 4\left(\frac{1}{4}\right)^n + 4$.

**4. d)** $\left(\frac{1}{4}\right)^n \to 0$, donc $\lim_{n \to +\infty} u_n = 4$.

## Exercice 2 : étude de fonctions (11 points)

### Partie I

**1.** $g'(x) = 1 - \frac{1}{x} = \frac{x - 1}{x}$.

**2.** Pour $x > 0$, $g'(x)$ a le signe de $x - 1$ : négatif sur $]0 ; 1[$, positif sur $]1 ; +\infty[$.

**3.** $g(1) = 1 - 1 - 0 = 0$. $g$ est décroissante sur $]0 ; 1]$ et croissante sur $[1 ; +\infty[$.

**4.** $g$ admet en $1$ un minimum égal à $0$ : $g(x) \geq 0$ pour tout $x > 0$.

### Partie II

**1.** Quand $x \to 0^+$, $x^2 \to 0$ et $x\ln x \to 0$ : $\lim_{x \to 0^+} f(x) = -1$.

**2. a)** $x^2\left(1 - \frac{1}{x^2} - \frac{2\ln x}{x}\right) = x^2 - 1 - 2x\ln x = f(x)$.

**2. b)** Quand $x \to +\infty$, $\frac{\ln x}{x} \to 0$, donc le facteur entre parenthèses tend vers $1$ et $\lim_{x \to +\infty} f(x) = +\infty$. De même $\frac{f(x)}{x} = x\left(1 - \frac{1}{x^2} - \frac{2\ln x}{x}\right) \to +\infty$ : $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**3. a)** $f'(x) = 2x - 2\ln x - 2x \times \frac{1}{x} = 2(x - 1 - \ln x) = 2g(x)$.

**3. b)** $f'(x) = 2g(x) \geq 0$, nul seulement en $1$ : $f$ est strictement croissante sur $]0 ; +\infty[$, de $-1$ (en $0^+$) à $+\infty$, avec $f(1) = 0$.

**4.** $f''(x) = 2g'(x) = \frac{2(x - 1)}{x}$ change de signe en $1$ : $(C)$ admet le point d’inflexion $I(1 ; f(1)) = I(1 ; 0)$.

**5. a)** On intègre par parties avec $u(x) = \ln x$ et $v'(x) = 2x$, donc $u'(x) = \frac{1}{x}$ et $v(x) = x^2$ :

$$\int_2^4 2x\ln x\,dx = \Big[x^2\ln x\Big]_2^4 - \int_2^4 x\,dx = 16\ln 4 - 4\ln 2 - 6 = 28\ln 2 - 6$$

**5. b)** Le domaine coloré est limité par $(C)$, l’axe des abscisses et les droites $x = 2$ et $x = 4$. Sur $[2 ; 4]$, $f(x) \geq f(1) = 0$. L’aire vaut :

$$\int_2^4 (x^2 - 1)\,dx - \int_2^4 2x\ln x\,dx = \left[\frac{x^3}{3} - x\right]_2^4 - 28\ln 2 + 6 = \frac{50}{3} - 28\ln 2 + 6 = \frac{68}{3} - 28\ln 2$$

en unités d’aire, soit environ $3{,}26$.

## Exercice 3 : probabilités (4,5 points)

Le sac contient $5$ boules blanches, $3$ rouges et $2$ vertes.

**1.** On tire simultanément $3$ boules parmi $10$ : $\binom{10}{3} = 120$ tirages possibles.

**2. a)** $A$ : trois blanches ou trois rouges (il n’y a que deux vertes), $\binom{5}{3} + \binom{3}{3} = 10 + 1 = 11$ tirages. $p(A) = \frac{11}{120}$.

**2. b)** $B$ : exactement deux rouges, $\binom{3}{2} \times 7 = 21$ tirages, ou trois rouges, $1$ tirage. $p(B) = \frac{22}{120} = \frac{11}{60}$.

**3.** $p(X = 0) = \frac{\binom{8}{3}}{120} = \frac{56}{120} = \frac{7}{15}$ ; $p(X = 1) = \frac{2 \times \binom{8}{2}}{120} = \frac{56}{120} = \frac{7}{15}$ ; $p(X = 2) = \frac{1 \times 8}{120} = \frac{1}{15}$. On vérifie : $56 + 56 + 8 = 120$.
