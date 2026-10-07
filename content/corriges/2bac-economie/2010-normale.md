---
summary: Une suite récurrente rendue arithmétique, l’étude de −1 + x + 2x ln x puis de 1 − x + x² ln x avec une intégration par parties et une aire, et le choix de trois ingénieurs dans un bureau d’études avec une espérance.
---

## Exercice 1 : suites numériques (5 points)

**1.** $u_{n+1} - 1 = 1 - \frac{1}{u_n} = \frac{u_n - 1}{u_n}$. Par récurrence : $u_0 = 2 > 1$ ; si $u_n > 1$, alors $u_n - 1 > 0$ et $u_n > 0$, donc $u_{n+1} > 1$.

**2. a)** $u_{n+1} - u_n = 2 - \frac{1}{u_n} - u_n = \frac{2u_n - 1 - u_n^2}{u_n} = -\frac{(u_n - 1)^2}{u_n}$. Ce nombre est négatif ($u_n > 0$) : la suite est décroissante.

**2. b)** Elle est décroissante et minorée par $1$, donc elle converge.

**3. a)** $v_0 = \frac{2 - 2}{2 - 1} = 0$. On a $u_{n+1} - 2 = -\frac{1}{u_n}$ et $u_{n+1} - 1 = \frac{u_n - 1}{u_n}$, donc $v_{n+1} = -\frac{1}{u_n - 1}$ et :

$$v_{n+1} - v_n = \frac{-1 - (u_n - 2)}{u_n - 1} = \frac{1 - u_n}{u_n - 1} = -1$$

**3. b)** $(v_n)$ est arithmétique de raison $-1$ et de premier terme $v_0 = 0$ : $v_n = -n$.

**3. c)** $v_n(u_n - 1) = u_n - 2$ donne $u_n(v_n - 1) = v_n - 2$. Comme $v_n - 1 = -n - 1 \neq 0$, $u_n = \frac{v_n - 2}{v_n - 1} = \frac{-n - 2}{-n - 1} = \frac{n + 2}{n + 1}$.

**3. d)** $u_n = \frac{1 + \frac{2}{n}}{1 + \frac{1}{n}}$ pour $n \geq 1$, donc $\lim_{n \to +\infty} u_n = 1$.

## Exercice 2 : étude de fonctions et calcul intégral (11 points)

### Partie I

**1.** Quand $x \to 0^+$, $x\ln x \to 0$, donc $\lim_{x \to 0^+} g(x) = -1$. Quand $x \to +\infty$, $x + 2x\ln x \to +\infty$, donc $\lim_{x \to +\infty} g(x) = +\infty$.

**2. a)** $g'(x) = 1 + 2\ln x + 2x \times \frac{1}{x} = 3 + 2\ln x$.

**2. b)** $g'(x) = 0 \iff \ln x = -\frac{3}{2} \iff x = e^{-\frac{3}{2}}$. $g'$ est négative sur $\left]0 ; e^{-\frac{3}{2}}\right[$ et positive après. $g$ décroît de $-1$ (en $0^+$) à $g\left(e^{-\frac{3}{2}}\right) = -1 - 2e^{-\frac{3}{2}} \approx -1{,}45$, puis croît jusqu’à $+\infty$.

**2. c)** $g(1) = -1 + 1 + 0 = 0$. Sur $\left]0 ; e^{-\frac{3}{2}}\right]$, $g$ décroît à partir de $-1$, donc $g(x) < 0$ ; sur $\left[e^{-\frac{3}{2}} ; 1\right]$, $g$ croît jusqu’à $g(1) = 0$, donc $g(x) \leq 0$. Ainsi $g(x) \leq 0$ sur $]0 ; 1]$. Sur $[1 ; +\infty[$, $g$ croît à partir de $0$ : $g(x) \geq 0$.

### Partie II

**1. a)** $x^2\ln x \to 0$ quand $x \to 0^+$, donc $\lim_{x \to 0^+} f(x) = 1$.

**1. b)** $f(x) = x^2\left(\frac{1}{x^2} - \frac{1}{x} + \ln x\right) \to +\infty$ quand $x \to +\infty$. Et $\frac{f(x)}{x} = \frac{1}{x} - 1 + x\ln x \to +\infty$ : $(C_f)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**2. a)** $f'(x) = -1 + 2x\ln x + x^2 \times \frac{1}{x} = -1 + x + 2x\ln x = g(x)$.

**2. b)** D’après I. 2. c), $f$ est décroissante sur $]0 ; 1]$ et croissante sur $[1 ; +\infty[$. Elle décroît de $1$ (en $0^+$) à $f(1) = 0$, puis croît jusqu’à $+\infty$.

**3. a)** On intègre par parties avec $u(x) = \ln x$ et $v'(x) = x^2$, donc $u'(x) = \frac{1}{x}$ et $v(x) = \frac{x^3}{3}$ :

$$\int_1^3 x^2\ln x\,dx = \left[\frac{x^3}{3}\ln x\right]_1^3 - \int_1^3 \frac{x^2}{3}\,dx = 9\ln 3 - \frac{27 - 1}{9} = 9\ln 3 - \frac{26}{9}$$

**3. b)** Le domaine hachuré est limité par $(C_f)$, l’axe des abscisses et les droites $x = 1$ et $x = 3$. Comme $f \geq 0$ (son minimum vaut $0$), l’aire vaut :

$$\int_1^3 (1 - x)\,dx + \int_1^3 x^2\ln x\,dx = \left[x - \frac{x^2}{2}\right]_1^3 + 9\ln 3 - \frac{26}{9} = -2 + 9\ln 3 - \frac{26}{9} = 9\ln 3 - \frac{44}{9}$$

en unités d’aire, soit environ $5{,}00$.

## Exercice 3 : probabilités (4 points)

Le bureau compte $20$ personnes : en informatique $5$ hommes et $3$ femmes, en génie civil $8$ hommes et $4$ femmes. On en choisit $3$ simultanément : $\binom{20}{3} = 1140$ choix équiprobables.

**1. a)** Il y a $7$ femmes : $p(A) = \frac{\binom{7}{3}}{1140} = \frac{35}{1140} = \frac{7}{228}$.

**1. b)** Parmi les $35$ choix de trois femmes, ceux de la même spécialité sont : trois informaticiennes, $\binom{3}{3} = 1$, ou trois ingénieures en génie civil, $\binom{4}{3} = 4$. La probabilité cherchée est $\frac{5}{35} = \frac{1}{7}$.

**2. a)** $X$ prend les valeurs $1$ et $2$. $X = 1$ si les trois personnes sont de la même spécialité : $\binom{8}{3} + \binom{12}{3} = 56 + 220 = 276$ choix, donc $p(X = 1) = \frac{276}{1140} = \frac{69}{285}$. Par suite $p(X = 2) = 1 - \frac{69}{285} = \frac{216}{285}$.

**2. b)** $E(X) = 1 \times \frac{69}{285} + 2 \times \frac{216}{285} = \frac{501}{285} = \frac{167}{95} \approx 1{,}76$.
