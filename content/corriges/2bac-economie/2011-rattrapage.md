---
summary: Une intégrale par décomposition en éléments simples, une suite homographique rendue géométrique de raison 7/2, l’étude de eˣ/(eˣ + 1) − ln(1 + eˣ) puis de ln(eˣ + 1)/eˣ, et deux urnes avec une probabilité conditionnelle.
---

## Exercice 1 : calcul intégral (2 points)

**1.** Pour $x \in I$ :

$$\frac{2}{x - 1} - \frac{2x - 1}{x^2 - x + 1} = \frac{2(x^2 - x + 1) - (2x - 1)(x - 1)}{(x - 1)(x^2 - x + 1)} = \frac{2x^2 - 2x + 2 - 2x^2 + 3x - 1}{(x - 1)(x^2 - x + 1)} = \frac{x + 1}{(x - 1)(x^2 - x + 1)} = h(x)$$

**2.** Sur $[2 ; 3]$, $x - 1 > 0$ et $x^2 - x + 1 > 0$, et $2x - 1$ est la dérivée de $x^2 - x + 1$. Donc :

$$\int_2^3 h(x)\,dx = \Big[2\ln(x - 1) - \ln(x^2 - x + 1)\Big]_2^3 = (2\ln 2 - \ln 7) - (0 - \ln 3) = \ln\frac{12}{7}$$

## Exercice 2 : suites numériques (5 points)

**1.** $u_1 = \frac{6 + 4}{2 + 6} = \frac{5}{4}$ et $u_2 = \frac{\frac{15}{4} + 4}{\frac{5}{4} + 6} = \frac{31}{29}$.

**2. a)** $u_{n+1} - 1 = \frac{3u_n + 4 - u_n - 6}{u_n + 6} = \frac{2(u_n - 1)}{u_n + 6}$. Par récurrence : $u_0 = 2 > 1$ ; si $u_n > 1$, le numérateur et le dénominateur sont positifs, donc $u_{n+1} > 1$.

**2. b)** $u_{n+1} - u_n = \frac{3u_n + 4 - u_n^2 - 6u_n}{u_n + 6} = -\frac{u_n^2 + 3u_n - 4}{u_n + 6} = -\frac{(u_n - 1)(u_n + 4)}{u_n + 6} < 0$ : la suite est décroissante. Elle est minorée par $1$, donc elle converge.

**3. a)** $v_n - 1 = \frac{u_n + 4 - (u_n - 1)}{u_n - 1} = \frac{5}{u_n - 1}$. Comme $u_n > 1$, ce nombre est positif : $v_n > 1$.

**3. b)** $v_n(u_n - 1) = u_n + 4$ donne $u_n(v_n - 1) = v_n + 4$, et $v_n - 1 \neq 0$ : $u_n = \frac{v_n + 4}{v_n - 1}$.

**3. c)** $u_{n+1} + 4 = \frac{7u_n + 28}{u_n + 6} = \frac{7(u_n + 4)}{u_n + 6}$ et $u_{n+1} - 1 = \frac{2(u_n - 1)}{u_n + 6}$, donc :

$$v_{n+1} = \frac{7(u_n + 4)}{2(u_n - 1)} = \frac{7}{2}v_n$$

$(v_n)$ est géométrique de raison $q = \frac{7}{2}$ et de premier terme $v_0 = \frac{6}{1} = 6$ : $v_n = 6\left(\frac{7}{2}\right)^n$.

**3. d)** D’après 3. b), $u_n = \frac{6\left(\frac{7}{2}\right)^n + 4}{6\left(\frac{7}{2}\right)^n - 1}$.

**3. e)** En divisant par $6\left(\frac{7}{2}\right)^n$, qui tend vers $+\infty$ : $u_n = \frac{1 + \frac{4}{6}\left(\frac{2}{7}\right)^n}{1 - \frac{1}{6}\left(\frac{2}{7}\right)^n} \to 1$.

## Exercice 3 : étude de fonctions (9,5 points)

### Partie I

**1.** La dérivée de $\frac{e^x}{e^x + 1}$ est $\frac{e^x(e^x + 1) - e^x \times e^x}{(e^x + 1)^2} = \frac{e^x}{(e^x + 1)^2}$, et celle de $\ln(1 + e^x)$ est $\frac{e^x}{1 + e^x}$. Donc :

$$g'(x) = \frac{e^x - e^x(e^x + 1)}{(e^x + 1)^2} = \frac{-e^{2x}}{(e^x + 1)^2}$$

**2. a)** Quand $x \to -\infty$, $e^x \to 0$, donc $\lim_{x \to -\infty} g(x) = 0 - \ln 1 = 0$. Et $g(0) = \frac{1}{2} - \ln 2 \approx -0{,}19$.

**2. b)** $g'(x) < 0$ : $g$ est strictement décroissante sur $I$, de $0$ (en $-\infty$) à $\frac{1}{2} - \ln 2$.

**3.** Pour $x \leq 0$, $g(x) < g(x - 1)$ car $g$ est strictement décroissante, et $g(x - 1) \leq 0$ car $g$ décroît depuis sa limite $0$. Donc $g(x) < 0$.

**4. a)** Posons $u = e^x$ : $g'(x) = -\frac{u^2}{(u + 1)^2}$. La dérivée par rapport à $u$ de $-\frac{u^2}{(u + 1)^2}$ est $-\frac{2u(u + 1) - 2u^2}{(u + 1)^3} = -\frac{2u}{(u + 1)^3}$, et $u' = e^x = u$. Donc :

$$g''(x) = -\frac{2e^{2x}}{(e^x + 1)^3} < 0$$

$(C)$ est concave sur $I$.

**4. b)** $g'(0) = -\frac{1}{4}$. Éléments pour le tracé (unité $4$ cm) : l’axe des abscisses est asymptote en $-\infty$, $(C)$ est au-dessous, concave et décroissante, et se termine au point $\left(0 ; \frac{1}{2} - \ln 2\right) \approx (0 ; -0{,}19)$ avec une tangente de pente $-\frac{1}{4}$. Quelques valeurs : $g(-2) \approx -0{,}008$, $g(-1) \approx -0{,}04$.

### Partie II

**1.** Avec $t = e^x$, $t \to 0^+$ quand $x \to -\infty$, et $f(x) = \frac{\ln(1 + t)}{t} \to 1$ (limite usuelle). Donc $\lim_{x \to -\infty} f(x) = 1$.

**2. a)** $f'(x) = \frac{\frac{e^x}{e^x + 1} \times e^x - \ln(e^x + 1) \times e^x}{e^{2x}} = \frac{\frac{e^x}{e^x + 1} - \ln(e^x + 1)}{e^x} = \frac{g(x)}{e^x}$.

**2. b)** $f(0) = \ln 2$. D’après I. 3., $f'(x) < 0$ : $f$ est strictement décroissante sur $I$, de $1$ (en $-\infty$) à $\ln 2$. Donc, pour tout $x \leq 0$, $\ln 2 \leq f(x) \leq 1$.

## Exercice 4 : probabilités (3,5 points)

$U_1$ contient $2$ boules rouges et $3$ blanches, $U_2$ contient $2$ blanches et $3$ rouges. Les deux tirages sont indépendants.

**1.** $p(B) = \frac{2}{5}$. Les deux boules sont de même couleur si elles sont toutes deux rouges ou toutes deux blanches :

$$p(A) = \frac{2}{5} \times \frac{3}{5} + \frac{3}{5} \times \frac{2}{5} = \frac{6}{25} + \frac{6}{25} = \frac{12}{25}$$

**2.** $p_B(A) = \frac{p(A \cap B)}{p(B)} = \frac{\frac{6}{25}}{\frac{2}{5}} = \frac{3}{5}$. C’est la probabilité de tirer une boule rouge dans $U_2$.
