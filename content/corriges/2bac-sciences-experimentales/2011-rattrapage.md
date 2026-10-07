---
summary: Une équation et une inéquation exponentielles, un carré construit par une translation dans le plan complexe, une suite récurrente avec une suite géométrique de raison 1/6, et l’étude de ((x − 1)/x) ln x avec deux primitives et une aire.
---

## Exercice 1 : équations et inéquations exponentielles (2,5 points)

**1. a)** $x^2 - 2x - 3 = (x - 3)(x + 1)$ : les solutions sont $3$ et $-1$.

**1. b)** En multipliant par $e^x > 0$ : $e^{2x} - 2e^x - 3 = 0$. Avec $X = e^x$, on obtient $X^2 - 2X - 3 = 0$, donc $X = 3$ ou $X = -1$ d’après 1. a). Comme $e^x > 0$, seul $e^x = 3$ convient : l’unique solution est $\ln 3$.

**2.** $e^{x+1} - e^{-x} \geq 0 \iff e^{x+1} \geq e^{-x} \iff x + 1 \geq -x \iff x \geq -\frac{1}{2}$, car $\exp$ est strictement croissante. L’ensemble des solutions est $\left[-\frac{1}{2} ; +\infty\right[$.

## Exercice 2 : nombres complexes (4 points)

**1.** $\Delta = 36 - 72 = -36 = (6i)^2$ : les solutions sont $3 + 3i$ et $3 - 3i$.

**2. a)** $|a| = |b| = \sqrt{9 + 9} = 3\sqrt{2}$, donc $a = 3\sqrt{2}\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right)$ et $b = 3\sqrt{2}\left(\cos\left(-\frac{\pi}{4}\right) + i\sin\left(-\frac{\pi}{4}\right)\right)$.

**2. b)** La translation de vecteur $\overrightarrow{OA}$ s’écrit $z' = z + a$, donc $b' = b + a = 3 - 3i + 3 + 3i = 6$.

**2. c)** $b - b' = -3 - 3i$ et $a - b' = -3 + 3i$, donc :

$$\frac{b - b'}{a - b'} = \frac{1 + i}{1 - i} = \frac{(1 + i)^2}{2} = \frac{2i}{2} = i$$

Le module vaut $1$, donc $B'B = B'A$ ; l’argument vaut $\frac{\pi}{2}$, donc $(\overrightarrow{B'A}, \overrightarrow{B'B}) \equiv \frac{\pi}{2} \; [2\pi]$. Le triangle $AB'B$ est isocèle et rectangle en $B'$.

**2. d)** $b' - b = a$, soit $\overrightarrow{BB'} = \overrightarrow{OA}$ : $OAB'B$ est un parallélogramme. D’après 2. c), il a un angle droit en $B'$ et deux côtés consécutifs égaux, $B'A = B'B$ : c’est un carré.

## Exercice 3 : suites numériques (3,5 points)

**1. a)** $u_{n+1} - \frac{1}{3} = \frac{18u_n - (1 + 15u_n)}{3(1 + 15u_n)} = \frac{3u_n - 1}{3(15u_n + 1)} = \frac{u_n - \frac{1}{3}}{15u_n + 1}$.

**1. b)** Par récurrence : $u_0 = 1 > \frac{1}{3}$ ; si $u_n > \frac{1}{3}$, alors $u_n - \frac{1}{3} > 0$ et $15u_n + 1 > 0$, donc $u_{n+1} - \frac{1}{3} > 0$.

**2.** $v_n = \frac{3u_n - 1}{3u_n}$ et $\frac{1}{3u_{n+1}} = \frac{1 + 15u_n}{18u_n}$, donc :

$$v_{n+1} = \frac{18u_n - 1 - 15u_n}{18u_n} = \frac{3u_n - 1}{18u_n} = \frac{1}{6} \times \frac{3u_n - 1}{3u_n} = \frac{1}{6}v_n$$

$(v_n)$ est géométrique de raison $\frac{1}{6}$ et de premier terme $v_0 = 1 - \frac{1}{3} = \frac{2}{3}$ : $v_n = \frac{2}{3}\left(\frac{1}{6}\right)^n$.

**3.** $\frac{1}{3u_n} = 1 - v_n$, donc $u_n = \frac{1}{3 - 3v_n} = \frac{1}{3 - 2\left(\frac{1}{6}\right)^n}$. Comme $\left(\frac{1}{6}\right)^n \to 0$, $\lim_{n \to +\infty} u_n = \frac{1}{3}$.

## Exercice 4 : étude d’une fonction et calcul intégral (10 points)

### Partie I

**1. a)** $g'(x) = 1 + \frac{1}{x} = \frac{x + 1}{x}$.

**1. b)** Pour $x > 0$, $g'(x) > 0$ : $g$ est croissante sur $I$.

**2.** $g(1) = 0$ et $g$ est croissante : $g(x) \geq 0$ sur $[1 ; +\infty[$ et $g(x) \leq 0$ sur $]0 ; 1]$.

### Partie II

**1. a)** Quand $x \to 0^+$, $\frac{x - 1}{x} \to -\infty$ (le numérateur tend vers $-1$, le dénominateur vers $0^+$) et $\ln x \to -\infty$ : $\lim_{x \to 0^+} f(x) = +\infty$. L’axe des ordonnées est asymptote verticale à $(C)$.

**1. b)** Quand $x \to +\infty$, $\frac{x - 1}{x} \to 1$ et $\ln x \to +\infty$, donc $\lim_{x \to +\infty} f(x) = +\infty$. Et $\frac{f(x)}{x} = \frac{x - 1}{x} \times \frac{\ln x}{x} \to 1 \times 0 = 0$.

**1. c)** $(C)$ admet donc en $+\infty$ une branche parabolique de direction l’axe des abscisses.

**2. a)** $f(x) = \left(1 - \frac{1}{x}\right)\ln x$, donc :

$$f'(x) = \frac{1}{x^2}\ln x + \left(1 - \frac{1}{x}\right) \times \frac{1}{x} = \frac{\ln x + x - 1}{x^2} = \frac{g(x)}{x^2}$$

**2. b)** $f'$ a le signe de $g$ : $f$ est décroissante sur $]0 ; 1]$ et croissante sur $[1 ; +\infty[$.

**2. c)** $f$ décroît de $+\infty$ (en $0^+$) à $f(1) = 0$, puis croît jusqu’à $+\infty$.

**3.** Éléments pour le tracé (unité $1$ cm) : asymptote verticale $x = 0$, minimum $(1 ; 0)$ avec une tangente horizontale (la courbe reste au-dessus de l’axe des abscisses), inflexion entre $1{,}5$ et $2$, branche parabolique horizontale en $+\infty$. Quelques valeurs : $f(0{,}25) \approx 4{,}16$, $f(0{,}5) \approx 0{,}69$, $f(2) \approx 0{,}35$, $f(e) = 1 - \frac{1}{e} \approx 0{,}63$, $f(4) \approx 1{,}04$.

**4. a)** $H'(x) = \frac{1}{2} \times 2\ln x \times \frac{1}{x} = \frac{\ln x}{x} = h(x)$ : $H$ est une primitive de $h$ sur $I$.

**4. b)** $\int_1^e \frac{\ln x}{x}\,dx = H(e) - H(1) = \frac{1}{2} - 0 = \frac{1}{2}$.

**4. c)** On intègre par parties avec $u(x) = \ln x$ et $v'(x) = 1$, donc $v(x) = x$ :

$$\int_1^e \ln x\,dx = \Big[x\ln x\Big]_1^e - \int_1^e x \times \frac{1}{x}\,dx = e - (e - 1) = 1$$

**5. a)** $f(x) = \frac{x - 1}{x}\ln x = \ln x - \frac{\ln x}{x}$.

**5. b)** $f \geq 0$ sur $[1 ; e]$. L’aire vaut $\int_1^e f(x)\,dx = \int_1^e \ln x\,dx - \int_1^e \frac{\ln x}{x}\,dx = 1 - \frac{1}{2} = \frac{1}{2}$ unité d’aire. Avec une unité de $1$ cm, c’est $0{,}5$ cm².
