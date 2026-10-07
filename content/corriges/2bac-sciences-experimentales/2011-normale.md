---
summary: Une équation et une inéquation logarithmiques, une suite récurrente rendue géométrique, un triangle rectangle isocèle et une rotation dans le plan complexe, et l’étude de (2 − x)eˣ − x avec une asymptote oblique, un point d’inflexion et une aire.
---

## Exercice 1 : équations et inéquations logarithmiques (2,5 points)

**1. a)** $x^2 + 4x - 5 = (x - 1)(x + 5)$ : les solutions sont $1$ et $-5$.

**1. b)** Sur $]0 ; +\infty[$, $x + 2 > 0$ et $2x > 0$, et l’équation s’écrit $\ln(x^2 + 5) = \ln\big(2x(x + 2)\big)$. Comme $\ln$ est injective : $x^2 + 5 = 2x^2 + 4x$, soit $x^2 + 4x - 5 = 0$. D’après 1. a), $x = 1$ ($-5$ n’est pas dans l’intervalle). L’ensemble des solutions est $\{1\}$.

**2.** Sur $]0 ; +\infty[$, l’inéquation s’écrit $\ln(x^2 + x) \geq \ln(x^2 + 1)$. Comme $\ln$ est strictement croissante : $x^2 + x \geq x^2 + 1$, soit $x \geq 1$. L’ensemble des solutions est $[1 ; +\infty[$.

## Exercice 2 : suites numériques (3 points)

**1.** Par récurrence : $u_0 = 1 > 0$ ; si $u_n > 0$, alors $5 + 8u_n > 0$ et $u_{n+1} = \frac{u_n}{5 + 8u_n} > 0$.

**2. a)** $\frac{1}{u_{n+1}} = \frac{5 + 8u_n}{u_n} = \frac{5}{u_n} + 8$, donc :

$$v_{n+1} = \frac{5}{u_n} + 8 + 2 = 5\left(\frac{1}{u_n} + 2\right) = 5v_n$$

$(v_n)$ est géométrique de raison $5$ et de premier terme $v_0 = \frac{1}{1} + 2 = 3$ : $v_n = 3 \times 5^n$.

**2. b)** $\frac{1}{u_n} = v_n - 2 = 3 \times 5^n - 2$, donc $u_n = \frac{1}{3 \times 5^n - 2}$. Comme $5^n \to +\infty$, $\lim_{n \to +\infty} u_n = 0$.

## Exercice 3 : nombres complexes (5 points)

**1.** $\Delta = 324 - 328 = -4 = (2i)^2$ : les solutions sont $9 + i$ et $9 - i$.

**2. a)** $c - b = 2$ et $a - b = 2i$, donc $\frac{c - b}{a - b} = \frac{2}{2i} = \frac{1}{i} = -i$. Ce quotient a pour module $1$, donc $BC = BA$, et pour argument $-\frac{\pi}{2}$, donc $(\overrightarrow{BA}, \overrightarrow{BC}) \equiv -\frac{\pi}{2} \; [2\pi]$. Le triangle $ABC$ est rectangle et isocèle en $B$.

**2. b)** $|4(1 - i)| = 4\sqrt{2}$ et $4(1 - i) = 4\sqrt{2}\left(\frac{\sqrt{2}}{2} - i\frac{\sqrt{2}}{2}\right) = 4\sqrt{2}\left(\cos\left(-\frac{\pi}{4}\right) + i\sin\left(-\frac{\pi}{4}\right)\right)$.

**2. c)** $c - a = 2 - 2i$, donc $(c - a)(c - b) = (2 - 2i) \times 2 = 4(1 - i)$. En passant aux modules : $AC \times BC = |c - a| \times |c - b| = |4(1 - i)| = 4\sqrt{2}$.

**2. d)** $z' - b = e^{i\frac{3\pi}{2}}(z - b) = -i(z - b)$, donc $z' = -iz + (1 + i)b = -iz + (1 + i)(9 - i) = -iz + 9 - i + 9i + 1 = -iz + 10 + 8i$. Pour $C$ : $c' = -i(11 - i) + 10 + 8i = -11i - 1 + 10 + 8i = 9 - 3i$.

## Exercice 4 : étude d’une fonction et calcul intégral (9,5 points)

### Partie I

**1. a)** $g'(x) = -e^x + (1 - x)e^x = -xe^x$.

**1. b)** $g'(x)$ a le signe de $-x$ : $g$ est croissante sur $]-\infty ; 0]$ et décroissante sur $[0 ; +\infty[$. Et $g(0) = 1 \times 1 - 1 = 0$.

**2.** $g$ admet en $0$ un maximum égal à $0$ : $g(x) \leq 0$ pour tout $x \in \mathbb{R}$.

### Partie II

**1. a)** Quand $x \to +\infty$, $2 - x \to -\infty$ et $e^x \to +\infty$, donc $(2 - x)e^x \to -\infty$ ; et $-x \to -\infty$. Ainsi $\lim_{x \to +\infty} f(x) = -\infty$.

**1. b)** $\frac{f(x)}{x} = \left(\frac{2}{x} - 1\right)e^x - 1 \to -\infty$ quand $x \to +\infty$ : $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**2. a)** $(2 - x)e^x = 2e^x - xe^x \to 0$ quand $x \to -\infty$, et $-x \to +\infty$ : $\lim_{x \to -\infty} f(x) = +\infty$. De plus $\lim_{x \to -\infty}\big(f(x) + x\big) = \lim_{x \to -\infty}(2 - x)e^x = 0$.

**2. b)** Par conséquent, la droite $(D) : y = -x$ est asymptote oblique à $(C)$ au voisinage de $-\infty$.

**3. a)** $f'(x) = -e^x + (2 - x)e^x - 1 = (1 - x)e^x - 1 = g(x)$.

**3. b)** $f'(0) = g(0) = 0$ : $(C)$ admet une tangente horizontale au point d’abscisse $0$, c’est-à-dire au point $(0 ; 2)$.

**3. c)** $f'(x) = g(x) \leq 0$ et ne s’annule qu’en $0$ : $f$ est strictement décroissante sur $\mathbb{R}$, de $+\infty$ à $-\infty$, avec $f(0) = 2$.

**4.** $f$ est continue et strictement décroissante de $\mathbb{R}$ sur $\mathbb{R}$, qui contient $0$ : l’équation $f(x) = 0$ a une unique solution $\alpha$. De plus $f\left(\frac{3}{2}\right) = \frac{1}{2}e^{\frac{3}{2}} - \frac{3}{2} = \frac{e^{\frac{3}{2}} - 3}{2} > 0$ (car $e^{\frac{3}{2}} > 3$) et $f(2) = -2 < 0$. Donc $\frac{3}{2} < \alpha < 2$.

**5. a)** $f(x) + x = 0 \iff (2 - x)e^x = 0 \iff x = 2$. Comme $f(2) = -2$, $(C)$ et $(D)$ se coupent au point $A(2 ; -2)$.

**5. b)** $f(x) + x = (2 - x)e^x$ a le signe de $2 - x$ : positif sur $]-\infty ; 2[$ et négatif sur $]2 ; +\infty[$.

**5. c)** Donc $(C)$ est au-dessus de $(D)$ sur $]-\infty ; 2[$ et au-dessous sur $]2 ; +\infty[$.

**6. a)** $f''(x) = g'(x) = -xe^x$ s’annule seulement en $0$, en changeant de signe : $(C)$ a un unique point d’inflexion, $(0 ; f(0)) = (0 ; 2)$, où la tangente est horizontale.

**6. b)** Éléments pour le tracé (unité $1$ cm) : $(D)$ est la seconde bissectrice. $(C)$ est décroissante, au-dessus de $(D)$ et proche d’elle en $-\infty$, passe par $(0 ; 2)$ avec une tangente horizontale, coupe l’axe des abscisses en $\alpha \approx 1{,}69$, rencontre $(D)$ en $A(2 ; -2)$ puis plonge vers $-\infty$. Quelques valeurs : $f(-2) \approx 2{,}54$, $f(-1) \approx 2{,}10$, $f(1) = e - 1 \approx 1{,}72$.

**7. a)** On intègre par parties avec $u(x) = 2 - x$ et $v'(x) = e^x$ :

$$\int_{-1}^0 (2 - x)e^x\,dx = \Big[(2 - x)e^x\Big]_{-1}^0 + \int_{-1}^0 e^x\,dx = \left(2 - \frac{3}{e}\right) + \left(1 - \frac{1}{e}\right) = 3 - \frac{4}{e}$$

**7. b)** Sur $[-1 ; 0]$, $(C)$ est au-dessus de $(D)$ et $f(x) - (-x) = (2 - x)e^x$. L’aire vaut $\left(3 - \frac{4}{e}\right)$ unités d’aire, soit $\left(3 - \frac{4}{e}\right)$ cm² (environ $1{,}53$ cm²).
