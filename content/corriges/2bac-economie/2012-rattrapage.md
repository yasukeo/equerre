---
summary: Une primitive de ln x et une intégrale de (ln x)² par parties, une suite homographique rendue arithmétique, l’étude de 3e^(2x) − 4eˣ + 1 avec un point d’inflexion et des tangentes, et un tirage de trois boules parmi douze.
---

## Exercice 1 : calcul intégral (2,5 points)

**1.** $F'(x) = \ln x + x \times \frac{1}{x} - 1 = \ln x = f(x)$ : $F$ est une primitive de $f$ sur $]0 ; +\infty[$.

**2.** $\int_1^e \ln x\,dx = F(e) - F(1) = (e - e) - (0 - 1) = 1$.

**3.** On intègre par parties avec $u(x) = (\ln x)^2$, $u'(x) = \frac{2\ln x}{x}$, et $v'(x) = 1$, $v(x) = x$ :

$$\int_1^e (\ln x)^2\,dx = \Big[x(\ln x)^2\Big]_1^e - \int_1^e 2\ln x\,dx = e - 2 \times 1 = e - 2$$

## Exercice 2 : suites numériques (4,5 points)

**1.** Par récurrence : $u_0 = 0 < 1$. Si $u_n < 1$, alors $2 - u_n > 1$, donc $0 < u_{n+1} = \frac{1}{2 - u_n} < 1$.

**2. a)** $u_{n+1} - u_n = \frac{1 - u_n(2 - u_n)}{2 - u_n} = \frac{u_n^2 - 2u_n + 1}{2 - u_n} = \frac{(u_n - 1)^2}{2 - u_n}$.

**2. b)** Ce nombre est positif ($2 - u_n > 0$) : la suite est croissante. Elle est majorée par $1$, donc elle converge.

**3. a)** $u_{n+1} - 2 = \frac{2u_n - 3}{2 - u_n}$ et $u_{n+1} - 1 = \frac{u_n - 1}{2 - u_n}$, donc $v_{n+1} = \frac{2u_n - 3}{u_n - 1}$ et :

$$v_{n+1} - v_n = \frac{2u_n - 3 - u_n + 2}{u_n - 1} = \frac{u_n - 1}{u_n - 1} = 1$$

$(v_n)$ est arithmétique de raison $r = 1$.

**3. b)** $v_n(u_n - 1) = u_n - 2$ donne $u_n(v_n - 1) = v_n - 2$. Comme $v_n - 1 = \frac{-1}{u_n - 1} \neq 0$, $u_n = \frac{v_n - 2}{v_n - 1}$.

**3. c)** $v_0 = \frac{0 - 2}{0 - 1} = 2$, donc $v_n = n + 2$ et $u_n = \frac{n + 2 - 2}{n + 2 - 1} = \frac{n}{n + 1}$.

**3. d)** $\lim_{n \to +\infty} u_n = \lim_{n \to +\infty} \frac{1}{1 + \frac{1}{n}} = 1$.

## Exercice 3 : étude d’une fonction (9 points)

**1.** Quand $x \to -\infty$, $e^{2x} \to 0$ et $e^x \to 0$ : $\lim_{x \to -\infty} f(x) = 1$. La droite $y = 1$ est asymptote horizontale à $(C)$ au voisinage de $-\infty$.

**2.** $e^x\left(3e^x - 4 + \frac{1}{e^x}\right) = 3e^{2x} - 4e^x + 1 = f(x)$. Quand $x \to +\infty$, $e^x \to +\infty$ et la parenthèse tend vers $+\infty$ : $\lim_{x \to +\infty} f(x) = +\infty$. De plus $\frac{f(x)}{x} = \frac{e^x}{x}\left(3e^x - 4 + e^{-x}\right) \to +\infty$ : $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**3. a)** $f'(x) = 6e^{2x} - 4e^x = 2e^x(3e^x - 2)$.

**3. b)** $f'(x)$ a le signe de $3e^x - 2$, qui s’annule pour $x = \ln\frac{2}{3}$ : $f$ est décroissante sur $\left]-\infty ; \ln\frac{2}{3}\right]$ et croissante sur $\left[\ln\frac{2}{3} ; +\infty\right[$. Et :

$$f\left(\ln\frac{2}{3}\right) = 3 \times \frac{4}{9} - 4 \times \frac{2}{3} + 1 = \frac{4}{3} - \frac{8}{3} + 1 = -\frac{1}{3}$$

$f$ décroît de $1$ (en $-\infty$) à $-\frac{1}{3}$, puis croît jusqu’à $+\infty$.

**4. a)** $(3e^x - 1)(e^x - 1) = 3e^{2x} - 3e^x - e^x + 1 = f(x)$.

**4. b)** $f(x) = 0 \iff e^x = \frac{1}{3}$ ou $e^x = 1 \iff x = -\ln 3$ ou $x = 0$. $(C)$ coupe l’axe des abscisses en $O$ et en $I(-\ln 3 ; 0)$.

**4. c)** $f''(x) = 12e^{2x} - 4e^x = 4e^x(3e^x - 1)$, du signe de $3e^x - 1$ : négatif pour $x < -\ln 3$, positif pour $x > -\ln 3$. $f''$ change de signe en $-\ln 3$ : $I$ est un point d’inflexion de $(C)$.

**4. d)** $f'(0) = 2 \times (3 - 2) = 2$ et $f'(-\ln 3) = 2 \times \frac{1}{3} \times (1 - 2) = -\frac{2}{3}$. Les tangentes sont : en $O$, $y = 2x$ ; en $I$, $y = -\frac{2}{3}(x + \ln 3)$ ; en $B\left(\ln\frac{2}{3} ; -\frac{1}{3}\right)$, la tangente horizontale $y = -\frac{1}{3}$. Éléments pour le tracé (unité $2$ cm) : $-\ln 3 \approx -1{,}1$ et $\ln\frac{2}{3} \approx -0{,}4$ ; $(C)$ part de l’asymptote $y = 1$, coupe l’axe des abscisses en $I$, descend jusqu’à $B$, remonte en passant par $O$, puis monte rapidement ($f(0{,}5) \approx 2{,}56$).

## Exercice 4 : probabilités (4 points)

Le sac contient $5$ boules rouges, $4$ blanches et $3$ vertes. On en tire $3$ simultanément : $\binom{12}{3} = 220$ tirages équiprobables.

**1. a)** $A$ : trois rouges, trois blanches ou trois vertes, $\binom{5}{3} + \binom{4}{3} + \binom{3}{3} = 10 + 4 + 1 = 15$ tirages, donc $p(A) = \frac{15}{220} = \frac{3}{44}$.

**1. b)** $\overline{B}$ : aucune boule verte, $\binom{9}{3} = 84$ tirages, donc $p(\overline{B}) = \frac{84}{220} = \frac{21}{55}$ et $p(B) = 1 - \frac{21}{55} = \frac{34}{55}$.

**2. a)** Il y a $3$ boules vertes et $9$ autres : $X$ prend les valeurs $0$, $1$, $2$ et $3$.

**2. b)** $p(X = k) = \frac{\binom{3}{k}\binom{9}{3 - k}}{220}$, d’où :

$p(X = 0) = \frac{84}{220} = \frac{21}{55}$, $p(X = 1) = \frac{3 \times 36}{220} = \frac{27}{55}$, $p(X = 2) = \frac{3 \times 9}{220} = \frac{27}{220}$, $p(X = 3) = \frac{1}{220}$. On vérifie : $84 + 108 + 27 + 1 = 220$.
