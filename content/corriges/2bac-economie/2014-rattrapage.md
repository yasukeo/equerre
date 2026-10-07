---
summary: Une suite homographique rendue arithmétique, l’étude de 2eˣ − x² avec une fonction auxiliaire, un point d’inflexion et une aire, et un tirage simultané de trois boules parmi huit.
---

## Exercice 1 : suites numériques (4,5 points)

**1.** $u_1 = \frac{1 - 4}{1 - 3} = \frac{3}{2}$ et $u_2 = \frac{\frac{3}{2} - 4}{\frac{3}{2} - 3} = \frac{-\frac{5}{2}}{-\frac{3}{2}} = \frac{5}{3}$.

**2. a)** $u_{n+1} - 2 = \frac{u_n - 4 - 2u_n + 6}{u_n - 3} = \frac{2 - u_n}{u_n - 3} = \frac{u_n - 2}{3 - u_n}$.

**2. b)** Par récurrence : $u_0 = 1 < 2$. Si $u_n < 2$, alors $u_n - 2 < 0$ et $3 - u_n > 0$, donc $u_{n+1} - 2 < 0$.

**3. a)** $u_{n+1} - u_n = \frac{u_n - 4 - u_n(u_n - 3)}{u_n - 3} = \frac{-u_n^2 + 4u_n - 4}{u_n - 3} = \frac{(u_n - 2)^2}{3 - u_n}$.

**3. b)** Ce nombre est positif ($3 - u_n > 0$) : la suite est croissante. Elle est majorée par $2$, donc elle converge.

**4. a)** D’après 2. a), $2 - u_{n+1} = \frac{2 - u_n}{3 - u_n}$, donc :

$$v_{n+1} = \frac{3 - u_n}{2 - u_n} = \frac{(2 - u_n) + 1}{2 - u_n} = 1 + v_n$$

Ainsi $v_{n+1} - v_n = 1$ : $(v_n)$ est arithmétique de raison $1$.

**4. b)** $v_0 = \frac{1}{2 - 1} = 1$, donc $v_n = n + 1$.

**4. c)** $2 - u_n = \frac{1}{v_n}$, donc $u_n = 2 - \frac{1}{v_n} = 2 - \frac{1}{n + 1} = \frac{2n + 1}{n + 1}$.

**4. d)** $\lim_{n \to +\infty} u_n = 2$.

## Exercice 2 : étude de fonctions (11 points)

### Partie I

**1.** $g'(x) = e^x - 1$ : négatif sur $]-\infty ; 0[$, positif sur $]0 ; +\infty[$, nul en $0$.

**2. a)** $g(0) = 1$. $g$ est décroissante sur $]-\infty ; 0]$ et croissante sur $[0 ; +\infty[$, avec un minimum égal à $1$.

**2. b)** Donc $g(x) \geq 1 > 0$ pour tout $x \in \mathbb{R}$.

### Partie II

**1.** Quand $x \to -\infty$, $2e^x \to 0$ et $-x^2 \to -\infty$ : $\lim_{x \to -\infty} f(x) = -\infty$. Et $\frac{f(x)}{x} = \frac{2e^x}{x} - x \to +\infty$ : $(C)$ admet en $-\infty$ une branche parabolique de direction l’axe des ordonnées.

**2. a)** Pour $x \neq 0$, $2x^2\left(\frac{e^x}{x^2} - \frac{1}{2}\right) = 2e^x - x^2 = f(x)$.

**2. b)** Quand $x \to +\infty$, $\frac{e^x}{x^2} \to +\infty$, donc $\lim_{x \to +\infty} f(x) = +\infty$ et $\frac{f(x)}{x} = 2x\left(\frac{e^x}{x^2} - \frac{1}{2}\right) \to +\infty$. $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**3. a)** $f'(x) = 2e^x - 2x = 2g(x)$.

**3. b)** $f'(x) = 2g(x) > 0$ : $f$ est strictement croissante sur $\mathbb{R}$, de $-\infty$ à $+\infty$.

**4.** $f''(x) = 2e^x - 2 = 2(e^x - 1)$, négatif sur $]-\infty ; 0[$ et positif sur $]0 ; +\infty[$. $f''$ change de signe en $0$ : le point $I(0 ; f(0)) = I(0 ; 2)$ est un point d’inflexion de $(C)$.

**5.** Le domaine hachuré est limité par $(C)$, l’axe des abscisses et les droites $x = 0$ et $x = 1$. Sur $[0 ; 1]$, $f(x) \geq f(0) = 2 > 0$, donc l’aire vaut :

$$\int_0^1 \left(2e^x - x^2\right)dx = \left[2e^x - \frac{x^3}{3}\right]_0^1 = 2e - \frac{1}{3} - 2 = 2e - \frac{7}{3}$$

en unités d’aire, soit environ $3{,}10$.

## Exercice 3 : probabilités (4,5 points)

Le sac contient $3$ boules rouges, $3$ vertes et $2$ blanches.

**1.** On tire simultanément $3$ boules parmi $8$ : $\binom{8}{3} = 56$ tirages possibles.

**2. a)** $A$ : trois boules parmi les $5$ non vertes, $\binom{5}{3} = 10$ tirages, donc $p(A) = \frac{10}{56} = \frac{5}{28}$.

**2. b)** $B$ : une verte parmi $3$ et les deux blanches, $3 \times 1 = 3$ tirages, donc $p(B) = \frac{3}{56}$. $C$ : une verte et deux rouges parmi $3$, $3 \times 3 = 9$ tirages, donc $p(C) = \frac{9}{56}$. $D$ : une boule de chaque couleur, $3 \times 3 \times 2 = 18$ tirages, donc $p(D) = \frac{18}{56} = \frac{9}{28}$.

**3. a)** $X = 1$ : une verte parmi $3$ et deux boules parmi les $5$ autres, $3 \times \binom{5}{2} = 30$ tirages. $p(X = 1) = \frac{30}{56} = \frac{15}{28}$.

**3. b)** $p(X = 0) = p(A) = \frac{5}{28}$, $p(X = 2) = \frac{\binom{3}{2} \times 5}{56} = \frac{15}{56}$ et $p(X = 3) = \frac{1}{56}$. On vérifie : $10 + 30 + 15 + 1 = 56$.
