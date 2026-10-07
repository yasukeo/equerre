---
summary: Une suite homographique rendue arithmétique de raison 1/2, un tirage de trois boules parmi onze avec une espérance, et l’étude de e^(2x) − 4eˣ + 3 avec un point d’inflexion à l’origine et l’aire entre la courbe et la droite y = 3.
---

## Exercice 1 : suites numériques (4,5 points)

**1.** $u_1 = \frac{0 - 1}{0 + 3} = -\frac{1}{3}$ et $u_2 = \frac{-\frac{1}{3} - 1}{-\frac{1}{3} + 3} = \frac{-\frac{4}{3}}{\frac{8}{3}} = -\frac{1}{2}$.

**2. a)** $u_{n+1} + 1 = \frac{u_n - 1 + u_n + 3}{u_n + 3} = \frac{2(u_n + 1)}{u_n + 3}$.

**2. b)** Par récurrence : $u_0 = 0 > -1$. Si $u_n > -1$, alors $u_n + 1 > 0$ et $u_n + 3 > 2 > 0$, donc $u_{n+1} + 1 > 0$.

**2. c)** $u_{n+1} - u_n = \frac{u_n - 1 - u_n^2 - 3u_n}{u_n + 3} = \frac{-u_n^2 - 2u_n - 1}{u_n + 3} = -\frac{(u_n + 1)^2}{u_n + 3}$.

**2. d)** Ce nombre est négatif ($u_n + 3 > 0$) : la suite est décroissante. Elle est minorée par $-1$, donc elle converge.

**3. a)** $v_0 = \frac{0 + 2}{0 + 1} = 2$.

**3. b)** $u_{n+1} + 2 = \frac{u_n - 1 + 2u_n + 6}{u_n + 3} = \frac{3u_n + 5}{u_n + 3}$ et, d’après 2. a), $u_{n+1} + 1 = \frac{2(u_n + 1)}{u_n + 3}$. Donc $v_{n+1} = \frac{3u_n + 5}{2(u_n + 1)}$.

**3. c)** $v_{n+1} - v_n = \frac{3u_n + 5 - 2(u_n + 2)}{2(u_n + 1)} = \frac{u_n + 1}{2(u_n + 1)} = \frac{1}{2}$ : $(v_n)$ est arithmétique de raison $\frac{1}{2}$.

**3. d)** $v_n = 2 + \frac{n}{2} = \frac{n + 4}{2}$.

**4. a)** $v_n(u_n + 1) = u_n + 2$ donne $u_n(v_n - 1) = 2 - v_n$. Comme $v_n \geq 2$, $v_n - 1 \neq 0$ et $u_n = \frac{-v_n + 2}{v_n - 1}$.

**4. b)** $u_n = \frac{-\frac{n + 4}{2} + 2}{\frac{n + 4}{2} - 1} = \frac{-\frac{n}{2}}{\frac{n + 2}{2}} = \frac{-n}{n + 2}$.

**4. c)** $u_n = \frac{-1}{1 + \frac{2}{n}}$ pour $n \geq 1$, donc $\lim_{n \to +\infty} u_n = -1$.

## Exercice 2 : probabilités (4,5 points)

Le sac contient $3$ boules blanches, $4$ vertes et $4$ rouges. On en tire $3$ simultanément : $\binom{11}{3} = 165$ tirages équiprobables.

**1. a)** $A$ : trois boules de la même couleur, $\binom{3}{3} + \binom{4}{3} + \binom{4}{3} = 1 + 4 + 4 = 9$ tirages. $p(A) = \frac{9}{165} = \frac{3}{55}$.

**1. b)** $B$ : une boule de chaque couleur, $3 \times 4 \times 4 = 48$ tirages. $p(B) = \frac{48}{165} = \frac{16}{55}$.

**1. c)** Trois boules tirées présentent une, deux ou trois couleurs : $A$, $C$ et $B$ sont incompatibles et leur réunion est certaine. Donc $p(C) = 1 - \frac{3}{55} - \frac{16}{55} = \frac{36}{55}$.

**2. a)** $p(X = k) = \frac{\binom{3}{k}\binom{8}{3 - k}}{165}$, d’où :

$p(X = 0) = \frac{56}{165}$, $p(X = 1) = \frac{3 \times 28}{165} = \frac{84}{165}$, $p(X = 2) = \frac{3 \times 8}{165} = \frac{24}{165}$, $p(X = 3) = \frac{1}{165}$. On vérifie : $56 + 84 + 24 + 1 = 165$.

**2. b)** $E(X) = \frac{0 \times 56 + 1 \times 84 + 2 \times 24 + 3 \times 1}{165} = \frac{135}{165} = \frac{9}{11}$.

## Exercice 3 : étude d’une fonction (11 points)

**1.** $e^x(e^x - 4) + 3 = e^{2x} - 4e^x + 3 = f(x)$.

**2. a)** Quand $x \to -\infty$, $e^x \to 0$, donc $\lim_{x \to -\infty} f(x) = 3$. La droite $y = 3$ est asymptote horizontale à $(C)$ au voisinage de $-\infty$.

**2. b)** Quand $x \to +\infty$, $e^x(e^x - 4) \to +\infty$ : $\lim_{x \to +\infty} f(x) = +\infty$. Et $\frac{f(x)}{x} = \frac{e^x}{x}(e^x - 4) + \frac{3}{x} \to +\infty$ : $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**3. a)** $f'(x) = 2e^{2x} - 4e^x = 2e^x(e^x - 2)$.

**3. b)** $f'(x)$ a le signe de $e^x - 2$, qui s’annule en $\ln 2$ : $f$ est décroissante sur $]-\infty ; \ln 2]$ et croissante sur $[\ln 2 ; +\infty[$. $f(\ln 2) = 4 - 8 + 3 = -1$. $f$ décroît de $3$ (en $-\infty$) à $-1$, puis croît jusqu’à $+\infty$.

**4.** $(e^x - 1)(e^x - 3) = e^{2x} - 3e^x - e^x + 3 = f(x)$. Donc $f(x) = 0 \iff e^x = 1$ ou $e^x = 3 \iff x = 0$ ou $x = \ln 3$. $(C)$ coupe l’axe des abscisses en $O(0 ; 0)$ et en $(\ln 3 ; 0)$.

**5. a)** $f''(x) = 4e^{2x} - 4e^x = 4e^x(e^x - 1)$.

**5. b)** $f''(x)$ a le signe de $e^x - 1$ : négatif sur $]-\infty ; 0[$, positif sur $]0 ; +\infty[$. $f''$ change de signe en $0$ : $O(0 ; 0)$ est un point d’inflexion de $(C)$.

**6.** $f(0) = 0$ et $f'(0) = 2 \times (1 - 2) = -2$ : $(T) : y = -2x$.

**7. a)** $f(x) = 3 \iff e^x(e^x - 4) = 0 \iff e^x = 4 \iff x = \ln 4$. $(C)$ et $(D)$ se coupent au point $(\ln 4 ; 3)$.

**7. b)** Le domaine hachuré est compris entre $(D)$ et $(C)$, pour $x$ entre $0$ et $\ln 4$. Sur cet intervalle, $e^x \leq 4$, donc $f(x) - 3 = e^x(e^x - 4) \leq 0$ : $(C)$ est au-dessous de $(D)$. L’aire vaut :

$$\int_0^{\ln 4} \big(3 - f(x)\big)\,dx = \int_0^{\ln 4} \left(4e^x - e^{2x}\right)dx = \left[4e^x - \frac{e^{2x}}{2}\right]_0^{\ln 4} = (16 - 8) - \left(4 - \frac{1}{2}\right) = \frac{9}{2}$$

unités d’aire.
