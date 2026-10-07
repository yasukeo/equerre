---
summary: Une équation et une inéquation exponentielles, une suite récurrente et sa forme explicite, des nombres complexes (homothétie, rotation, losange, angle) et un problème sur la fonction 2x ln x − 2x avec une intégrale et une fonction réciproque.
---

## Exercice 1 : fonctions numériques (2 points)

**1. a)** Avec $X = e^x > 0$ : $X^2 - 4X + 3 = (X - 1)(X - 3) = 0$, donc $e^x = 1$ ou $e^x = 3$. Les solutions sont $0$ et $\ln 3$.

**1. b)** $(e^x - 1)(e^x - 3) \leq 0 \iff 1 \leq e^x \leq 3 \iff 0 \leq x \leq \ln 3$. L’ensemble des solutions est $[0 ; \ln 3]$.

**1. c)** Pour $x \neq 0$ :

$$\frac{e^{2x} - 4e^x + 3}{e^{2x} - 1} = \frac{(e^x - 1)(e^x - 3)}{(e^x - 1)(e^x + 1)} = \frac{e^x - 3}{e^x + 1} \xrightarrow[x \to 0]{} \frac{1 - 3}{1 + 1} = -1$$

**2.** $g(x) = e^{2x} + e^x + 4x$ est continue sur $[-1 ; 0]$, avec $g(-1) = e^{-2} + e^{-1} - 4 < 0$ et $g(0) = 2 > 0$. D’après le théorème des valeurs intermédiaires, l’équation $g(x) = 0$ admet une solution dans $[-1 ; 0]$.

## Exercice 2 : suites numériques (4 points)

**1.** $u_1 = \frac{\frac{1}{2}}{3 - 1} = \frac{1}{4}$.

**2.** Par récurrence : $0 < u_0 = \frac{1}{2} \leq \frac{1}{2}$. Si $0 < u_n \leq \frac{1}{2}$, alors $3 - 2u_n \geq 2 > 0$, donc $u_{n+1} > 0$ et $u_{n+1} \leq \frac{u_n}{2} \leq \frac{1}{4} \leq \frac{1}{2}$.

**3. a)** $\frac{u_{n+1}}{u_n} = \frac{1}{3 - 2u_n}$, et $3 - 2u_n \geq 2$, donc $\frac{u_{n+1}}{u_n} \leq \frac{1}{2}$.

**3. b)** Comme $u_n > 0$, $u_{n+1} \leq \frac{1}{2}u_n < u_n$ : la suite est strictement décroissante.

**4. a)** Par récurrence : $u_0 = \frac{1}{2} = \left(\frac{1}{2}\right)^1$, et si $u_n \leq \left(\frac{1}{2}\right)^{n+1}$, alors $u_{n+1} \leq \frac{1}{2}u_n \leq \left(\frac{1}{2}\right)^{n+2}$. Comme $\left(\frac{1}{2}\right)^{n+1} \to 0$, par encadrement $\lim_{n \to +\infty} u_n = 0$.

**4. b)** $3 - 2u_n \to 3$ et $\ln$ est continue en $3$ : $\lim_{n \to +\infty} v_n = \ln 3$.

**5. a)** $\frac{1}{u_{n+1}} - 1 = \frac{3 - 2u_n}{u_n} - 1 = \frac{3}{u_n} - 3 = 3\left(\frac{1}{u_n} - 1\right)$.

**5. b)** La suite $w_n = \frac{1}{u_n} - 1$ est géométrique de raison $3$ et de premier terme $w_0 = 1$ : $w_n = 3^n$. Donc :

$$u_n = \frac{1}{1 + 3^n}$$

## Exercice 3 : nombres complexes (5 points)

**1.** $\Delta = 3 - 4 = -1 = i^2$ : les solutions sont $\frac{\sqrt{3}}{2} + \frac{1}{2}i$ et $\frac{\sqrt{3}}{2} - \frac{1}{2}i$.

**2. a)** $a = \cos\frac{\pi}{6} + i\sin\frac{\pi}{6} = \frac{\sqrt{3}}{2} + \frac{1}{2}i$.

**2. b)** $\bar{a}b = \left(\frac{\sqrt{3}}{2} - \frac{i}{2}\right)\left(\frac{3}{2} + \frac{\sqrt{3}}{2}i\right) = \frac{3\sqrt{3}}{4} + \frac{3}{4}i - \frac{3}{4}i + \frac{\sqrt{3}}{4} = \sqrt{3}$.

**3.** Comme $|a| = 1$, $\frac{1}{\bar{a}} = a$, donc $b = \frac{\sqrt{3}}{\bar{a}} = \sqrt{3}\,a$ : $B$ est l’image de $A$ par l’homothétie de centre $O$ et de rapport $\sqrt{3}$.

**4. a)** $z' - a = i(z - a)$, soit $z' = iz + (1 - i)a$.

**4. b)** $d = i\bar{a} + a - ia = a + i(\bar{a} - a) = a + i \cdot (-i) = a + 1$, car $\bar{a} - a = -2i\,\mathrm{Im}(a) = -i$.

**4. c)** $d - a = 1 = 1 - 0$ : $\overrightarrow{AD} = \overrightarrow{OI}$, donc $ADIO$ est un parallélogramme. De plus $OA = |a| = 1 = OI$ : deux côtés consécutifs sont égaux, c’est un losange.

**5. a)** $d - b = a + 1 - b = \frac{\sqrt{3} - 1}{2} + i\,\frac{1 - \sqrt{3}}{2} = \frac{\sqrt{3} - 1}{2}(1 - i)$. Comme $\frac{\sqrt{3} - 1}{2} > 0$ et $\arg(1 - i) \equiv -\frac{\pi}{4}$, un argument de $d - b$ est $-\frac{\pi}{4}$.

**5. b)** $1 - b = -\frac{1}{2} - \frac{\sqrt{3}}{2}i = \cos\left(-\frac{2\pi}{3}\right) + i\sin\left(-\frac{2\pi}{3}\right)$.

**5. c)** $(\overrightarrow{BI}, \overrightarrow{BD}) \equiv \arg\left(\frac{d - b}{1 - b}\right) \equiv -\frac{\pi}{4} + \frac{2\pi}{3} = \frac{5\pi}{12} \; [2\pi]$.

## Problème (9 points)

**1.** $\lim_{x \to 0^+} x\ln x = 0$, donc $\lim_{x \to 0^+} f(x) = 0 = f(0)$ : $f$ est continue à droite en $0$.

**2. a)** $f(x) = 2x(\ln x - 1) \to +\infty$ quand $x \to +\infty$.

**2. b)** $\frac{f(x)}{x} = 2\ln x - 2 \to +\infty$ : $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**3. a)** $\frac{f(x)}{x} = 2\ln x - 2 \to -\infty$ quand $x \to 0^+$ : $f$ n’est pas dérivable à droite en $0$, et $(C)$ admet en $O$ une demi-tangente verticale.

**3. b)** $f'(x) = 2\ln x + 2x \cdot \frac{1}{x} - 2 = 2\ln x$.

**3. c)** $f' < 0$ sur $]0 ; 1[$ et $f' > 0$ sur $]1 ; +\infty[$ : $f$ décroît sur $[0 ; 1]$ de $0$ à $f(1) = -2$, puis croît sur $[1 ; +\infty[$ jusqu’à $+\infty$.

**4. a)** $f(x) = 0 \iff 2x(\ln x - 1) = 0 \iff x = e$ (pour $x > 0$). $f(x) = x \iff 2\ln x - 2 = 1 \iff x = e^{\frac{3}{2}}$.

**4. b)** Éléments pour le tracé : $(C)$ part de $O$ avec une demi-tangente verticale, descend jusqu’au minimum $(1 ; -2)$, recoupe l’axe des abscisses en $e \approx 2{,}7$, coupe la droite $y = x$ au point d’abscisse $e^{\frac{3}{2}} \approx 4{,}5$, puis monte avec une branche parabolique verticale.

**5. a)** On intègre par parties avec $u(x) = \ln x$ et $v'(x) = x$ :

$$\int_1^e x\ln x\,dx = \left[\frac{x^2}{2}\ln x\right]_1^e - \int_1^e \frac{x}{2}\,dx = \frac{e^2}{2} - \frac{e^2 - 1}{4} = \frac{1 + e^2}{4}$$

**5. b)** $\int_1^e f(x)\,dx = 2 \times \frac{1 + e^2}{4} - \Big[x^2\Big]_1^e = \frac{1 + e^2}{2} - (e^2 - 1) = \frac{3 - e^2}{2}$.

**6. a)** D’après les variations, le minimum de $f$ sur $]0 ; +\infty[$ est $f(1) = -2$.

**6. b)** Pour $x > 0$ : $2x\ln x - 2x \geq -2$, soit $x\ln x \geq x - 1$, et en divisant par $x > 0$ : $\ln x \geq \frac{x - 1}{x}$.

**7. a)** $g$ est continue et strictement croissante sur $[1 ; +\infty[$ : elle admet une réciproque $g^{-1}$ définie sur $J = g([1 ; +\infty[) = [-2 ; +\infty[$.

**7. b)** La courbe de $g^{-1}$ est la symétrique de la partie de $(C)$ située sur $[1 ; +\infty[$ par rapport à la droite $y = x$. Elle part du point $(-2 ; 1)$ avec une tangente verticale (car $g'(1) = 0$), passe par $(0 ; e)$ et coupe la droite $y = x$ au point d’abscisse $e^{\frac{3}{2}}$.

**8. a)** $\lim_{x \to 0^-} h(x) = 0 = h(0)$ et $\lim_{x \to 0^+} h(x) = \lim_{x \to 0^+} f(x) = 0$ : $h$ est continue en $0$.

**8. b)** Pour $x < 0$, $\frac{h(x) - h(0)}{x} = x^2 + 3 \to 3$ : $h$ est dérivable à gauche en $0$ et $h'_g(0) = 3$. La courbe de $h$ admet à gauche de $O$ une demi-tangente d’équation $y = 3x$.

**8. c)** À droite, $\frac{h(x) - h(0)}{x} = \frac{f(x)}{x} \to -\infty$ : $h$ n’est pas dérivable à droite en $0$, donc pas dérivable en $0$.
