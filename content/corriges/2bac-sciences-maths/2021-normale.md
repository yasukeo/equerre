---
summary: Analyse (une famille de fonctions avec exponentielle, une suite récurrente, la suite des zéros), nombres complexes (rotations, triangle rectangle isocèle, points cocycliques) et arithmétique (équation de Bézout, petit théorème de Fermat).
---

## Exercice 1 : analyse (12 points)

Pour tout entier naturel $n$, $f_n(x) = \frac{-2e^x}{1 + e^x} + nx$ sur $\mathbb{R}$.

### Partie I

**1. a)** Pour tout réel $x$ :

$$f_n(x) - nx + 2 = \frac{-2e^x + 2 + 2e^x}{1 + e^x} = \frac{2}{1 + e^x}$$

Comme $\lim_{x \to +\infty} e^x = +\infty$, on obtient $\lim_{x \to +\infty} \left(f_n(x) - nx + 2\right) = 0$.

Interprétation : la droite $(D_n)$ d’équation $y = nx - 2$ est asymptote à $(C_n)$ au voisinage de $+\infty$ (horizontale pour $n = 0$).

**1. b)** Comme $\lim_{x \to -\infty} e^x = 0$, on a $\lim_{x \to -\infty} \left(f_n(x) - nx\right) = \lim_{x \to -\infty} \frac{-2e^x}{1 + e^x} = 0$. La droite $(\Delta_n)$ d’équation $y = nx$ est donc asymptote à $(C_n)$ au voisinage de $-\infty$.

**2. a)** $x \mapsto e^x$ et $x \mapsto 1 + e^x$ sont dérivables sur $\mathbb{R}$, et $1 + e^x \neq 0$ : $f_n$ est dérivable sur $\mathbb{R}$. Avec $\left(\frac{e^x}{1 + e^x}\right)' = \frac{e^x(1 + e^x) - e^x e^x}{(1 + e^x)^2} = \frac{e^x}{(1 + e^x)^2}$, on obtient :

$$f_n'(x) = \frac{-2e^x}{(1 + e^x)^2} + n$$

**2. b)** Pour tout réel $x$, $(1 + e^x)^2 - 4e^x = 1 - 2e^x + e^{2x} = (1 - e^x)^2 \geq 0$. Donc $4e^x \leq (1 + e^x)^2$, et en divisant par $(1 + e^x)^2 > 0$ : $\frac{4e^x}{(1 + e^x)^2} \leq 1$.

**2. c)** D’après 2. b), $\frac{2e^x}{(1 + e^x)^2} \leq \frac{1}{2}$, donc $f_n'(x) \geq n - \frac{1}{2}$.

- Si $n = 0$ : $f_0'(x) = \frac{-2e^x}{(1 + e^x)^2} < 0$, donc $f_0$ est strictement décroissante sur $\mathbb{R}$.
- Si $n \geq 1$ : $f_n'(x) \geq n - \frac{1}{2} \geq \frac{1}{2} > 0$, donc $f_n$ est strictement croissante sur $\mathbb{R}$.

**3. a)** $f_n(0) = \frac{-2}{2} = -1$ et $f_n'(0) = \frac{-2}{4} + n = n - \frac{1}{2}$. La tangente en $I(0 ; -1)$ a pour équation :

$$y = \left(n - \frac{1}{2}\right)x - 1$$

**3. b)** En dérivant $\frac{e^x}{(1 + e^x)^2}$, on trouve $\frac{e^x(1 + e^x) - 2e^{2x}}{(1 + e^x)^3} = \frac{e^x(1 - e^x)}{(1 + e^x)^3}$, d’où :

$$f_n''(x) = \frac{2e^x(e^x - 1)}{(1 + e^x)^3}$$

Son signe est celui de $e^x - 1$ : $f_n''$ est négative sur $]-\infty ; 0[$, positive sur $]0 ; +\infty[$, et ne s’annule qu’en $0$. Elle change de signe en $0$ et seulement en $0$ : $I(0 ; -1)$ est le seul point d’inflexion de $(C_n)$.

**4.** Éléments pour le tracé :

- $(C_0)$ : $f_0$ décroît de $0$ (asymptote $y = 0$ en $-\infty$) à $-2$ (asymptote $y = -2$ en $+\infty$) ; elle passe par $I(0 ; -1)$ avec la tangente $y = -\frac{1}{2}x - 1$.
- $(C_2)$ : $f_2$ est croissante, avec les asymptotes $y = 2x$ en $-\infty$ et $y = 2x - 2$ en $+\infty$ ; elle passe par $I$ avec la tangente $y = \frac{3}{2}x - 1$.
- $f_n(x) - (nx - 2) = \frac{2}{1 + e^x} > 0$ et $f_n(x) - nx = \frac{-2e^x}{1 + e^x} < 0$ : $(C_n)$ est entre ses deux asymptotes, au-dessus de $(D_n)$ et au-dessous de $(\Delta_n)$.
- $f_2(x) - f_0(x) = 2x$ : $(C_2)$ est au-dessus de $(C_0)$ pour $x > 0$ et au-dessous pour $x < 0$ ; les deux courbes se coupent en $I$.

**5. a)** D’après 1. a), $f_n(x) - (nx - 2) = \frac{2}{1 + e^x} > 0$ : la courbe est au-dessus de la droite. L’unité d’aire valant $1 \text{ cm}^2$ :

$$A(t) = \int_0^t \frac{2}{1 + e^x}\,dx = \int_0^t \frac{2e^{-x}}{e^{-x} + 1}\,dx = \left[-2\ln\left(1 + e^{-x}\right)\right]_0^t$$

Donc $A(t) = 2\ln 2 - 2\ln\left(1 + e^{-t}\right) = 2\ln\left(\frac{2}{1 + e^{-t}}\right) \text{ cm}^2$.

**5. b)** Comme $\lim_{t \to +\infty} e^{-t} = 0$, on obtient $\lim_{t \to +\infty} A(t) = 2\ln 2 \text{ cm}^2$.

### Partie II

On a $u_0 = 0$ et $u_{n+1} = f_0(u_n)$.

**1. a)** Soit $\varphi(x) = f_0(x) - x$. Elle est dérivable et $\varphi'(x) = f_0'(x) - 1 < 0$ : $\varphi$ est continue et strictement décroissante sur $\mathbb{R}$. De plus $\lim_{x \to -\infty} \varphi(x) = +\infty$ et $\lim_{x \to +\infty} \varphi(x) = -\infty$, car $f_0$ est bornée (entre $-2$ et $0$). $\varphi$ est donc une bijection de $\mathbb{R}$ sur $\mathbb{R}$, et l’équation $\varphi(x) = 0$, c’est-à-dire $f_0(x) = x$, admet une unique solution $\alpha$.

**1. b)** $|f_0'(x)| = \frac{2e^x}{(1 + e^x)^2} = \frac{1}{2} \cdot \frac{4e^x}{(1 + e^x)^2} \leq \frac{1}{2}$, d’après la partie I, 2. b).

**2. a)** $f_0$ est dérivable sur $\mathbb{R}$ et $|f_0'| \leq \frac{1}{2}$. D’après l’inégalité des accroissements finis, appliquée entre $u_n$ et $\alpha$ :

$$|f_0(u_n) - f_0(\alpha)| \leq \frac{1}{2}|u_n - \alpha|$$

Comme $f_0(u_n) = u_{n+1}$ et $f_0(\alpha) = \alpha$, on obtient $|u_{n+1} - \alpha| \leq \frac{1}{2}|u_n - \alpha|$.

**2. b)** Par récurrence. Pour $n = 0$ : $|u_0 - \alpha| = |\alpha| = \left(\frac{1}{2}\right)^0 |\alpha|$. Si $|u_n - \alpha| \leq \left(\frac{1}{2}\right)^n |\alpha|$, alors d’après 2. a), $|u_{n+1} - \alpha| \leq \frac{1}{2} \left(\frac{1}{2}\right)^n |\alpha| = \left(\frac{1}{2}\right)^{n+1} |\alpha|$.

**2. c)** Comme $0 < \frac{1}{2} < 1$, $\lim_{n \to +\infty} \left(\frac{1}{2}\right)^n |\alpha| = 0$. Par encadrement, $\lim_{n \to +\infty} |u_n - \alpha| = 0$ : la suite $(u_n)$ converge vers $\alpha$.

### Partie III

Ici $n \geq 2$.

**1. a)** $f_n$ est continue et strictement croissante sur $\mathbb{R}$ (partie I, 2. c). Comme $\frac{-2e^x}{1 + e^x}$ est bornée, $\lim_{x \to -\infty} f_n(x) = -\infty$ et $\lim_{x \to +\infty} f_n(x) = +\infty$. $f_n$ est une bijection de $\mathbb{R}$ sur $\mathbb{R}$ : l’équation $f_n(x) = 0$ admet une unique solution $x_n$.

**1. b)** $f_n(0) = -1 < 0$ et $f_n(1) = n - \frac{2e}{1 + e} > 2 - 1{,}47 > 0$. Par le théorème des valeurs intermédiaires et la stricte croissance de $f_n$, $0 < x_n < 1$.

**2. a)** $f_{n+1}(x_n) = \frac{-2e^{x_n}}{1 + e^{x_n}} + (n + 1)x_n = f_n(x_n) + x_n = x_n > 0$.

**2. b)** $f_{n+1}(x_{n+1}) = 0 < f_{n+1}(x_n)$ et $f_{n+1}$ est strictement croissante, donc $x_{n+1} < x_n$ : la suite $(x_n)_{n \geq 2}$ est strictement décroissante.

**2. c)** Elle est décroissante et minorée par $0$ : elle converge.

**3. a)** $f_n(x_n) = 0$ s’écrit $x_n = \frac{1}{n} g(x_n)$, avec $g(t) = \frac{2e^t}{1 + e^t} = 2 - \frac{2}{1 + e^t}$, strictement croissante sur $\mathbb{R}$. Comme $0 < x_n < 1$, on a $g(0) < g(x_n) < g(1)$, c’est-à-dire $1 < g(x_n) < \frac{2e}{1 + e}$. En divisant par $n > 0$ :

$$\frac{1}{n} < x_n < \frac{1}{n}\left(\frac{2e}{1 + e}\right)$$

**3. b)** Les deux bornes tendent vers $0$ : par encadrement, $\lim_{n \to +\infty} x_n = 0$. Puis $n x_n = g(x_n)$, et $g$ est continue en $0$, donc $\lim_{n \to +\infty} n x_n = g(0) = 1$.

**4. a)** La suite $(x_n)_{n \geq 2}$ est décroissante, donc $x_n \leq x_2$ pour tout $n \geq 2$.

**4. b)** $0 < x_n \leq x_2 < 1$, donc $0 < (x_n)^n \leq (x_2)^n$. Comme $0 < x_2 < 1$, $\lim_{n \to +\infty} (x_2)^n = 0$, et par encadrement $\lim_{n \to +\infty} (x_n)^n = 0$.

## Exercice 2 : nombres complexes (4 points)

**1. a)** On remarque que $(z - c)(z - (a + b)) = z^2 - (a + b + c)z + c(a + b)$. Les solutions de $(E)$ sont donc $c$ et $a + b$, distinctes puisque $a + b \neq c$.

**1. b)** Avec $a = i = e^{i\frac{\pi}{2}}$ et $b = e^{i\frac{\pi}{3}}$, on factorise par l’angle moitié $e^{i\frac{5\pi}{12}}$ :

$$a + b = e^{i\frac{5\pi}{12}}\left(e^{i\frac{\pi}{12}} + e^{-i\frac{\pi}{12}}\right) = 2\cos\frac{\pi}{12}\, e^{i\frac{5\pi}{12}}$$

$$c = a - b = e^{i\frac{5\pi}{12}}\left(e^{i\frac{\pi}{12}} - e^{-i\frac{\pi}{12}}\right) = 2i\sin\frac{\pi}{12}\, e^{i\frac{5\pi}{12}} = 2\sin\frac{\pi}{12}\, e^{i\frac{11\pi}{12}}$$

Comme $\cos\frac{\pi}{12} > 0$ et $\sin\frac{\pi}{12} > 0$, ce sont bien des formes exponentielles, avec $2\cos\frac{\pi}{12} = \frac{\sqrt{6} + \sqrt{2}}{2}$ et $2\sin\frac{\pi}{12} = \frac{\sqrt{6} - \sqrt{2}}{2}$.

**2. a)** La rotation de centre $P$ et d’angle $\frac{\pi}{2}$ transforme $B$ en $A$ : $a - p = i(b - p)$, soit $a - ib = p(1 - i)$. En multipliant par $1 + i$ :

$$2p = (a - ib)(1 + i) = a + ia - ib + b = b + a + (a - b)i$$

De même, la rotation de centre $Q$ et d’angle $-\frac{\pi}{2}$ transforme $C$ en $A$ : $a - q = -i(c - q)$, soit $a + ic = q(1 + i)$, et en multipliant par $1 - i$ :

$$2q = (a + ic)(1 - i) = a - ia + ic + c = c + a + (c - a)i$$

**2. b)** Avec $d = \frac{b + c}{2}$, posons $u = a - b$ et $v = a - c$. Alors :

$$2(p - d) = v + iu \qquad 2(q - d) = u - iv$$

Or $i(u - iv) = iu + v$. Donc $p - d = i(q - d)$, et (pour $q \neq d$, ce que l’énoncé suppose) :

$$\frac{p - d}{q - d} = i$$

**2. c)** $\left|\frac{p - d}{q - d}\right| = 1$ donne $DP = DQ$, et $\arg\left(\frac{p - d}{q - d}\right) \equiv \frac{\pi}{2} \; [2\pi]$ donne $(\overrightarrow{DQ}, \overrightarrow{DP}) \equiv \frac{\pi}{2} \; [2\pi]$. Le triangle $PDQ$ est rectangle et isocèle en $D$.

**3. a)** $E$ est le symétrique de $B$ par rapport à $P$ : $e = 2p - b = a + (a - b)i$. De même $f = 2q - c = a + (c - a)i$. Donc :

$$k = \frac{e + f}{2} = \frac{2a + (c - b)i}{2} = a + \frac{i}{2}(c - b)$$

**3. b)** Avec les mêmes notations, $c - b = u - v$, donc $2(k - d) = 2a - b - c + i(u - v) = u + v + iu - iv$. Or $2(p - d) + 2(q - d) = v + iu + u - iv$ : c’est la même chose. Donc :

$$k - d = (p - d) + (q - d)$$

c’est-à-dire $\overrightarrow{DK} = \overrightarrow{DP} + \overrightarrow{DQ}$ : $DPKQ$ est un parallélogramme. Il a un angle droit en $D$ et deux côtés consécutifs égaux ($DP = DQ$) : c’est un carré. Les sommets d’un carré sont sur le cercle de centre son centre : les points $K$, $P$, $Q$ et $D$ sont cocycliques.

## Exercice 3 : arithmétique (4 points)

### Partie I

**1.** $47 \times 11 - 43 \times 12 = 517 - 516 = 1$ : le couple $(11, 12)$ est solution de $(E)$.

**2.** Si $(x, y)$ est solution, en soustrayant : $47(x - 11) = 43(y - 12)$. Or $47$ et $43$ sont premiers entre eux (ce sont deux nombres premiers distincts) ; d’après le théorème de Gauss, $43$ divise $x - 11$ : $x = 11 + 43k$ avec $k \in \mathbb{Z}$, puis $y = 12 + 47k$. Réciproquement, ces couples vérifient $(E)$. L’ensemble des solutions est :

$$\{(11 + 43k, 12 + 47k) \mid k \in \mathbb{Z}\}$$

### Partie II

**1. a)** Si $43$ divisait $x$, on aurait $x^{41} \equiv 0 \; [43]$, donc $4 \equiv 0 \; [43]$ : c’est faux. Comme $43$ est premier et ne divise pas $x$, $x$ et $43$ sont premiers entre eux, et le petit théorème de Fermat donne $x^{42} \equiv 1 \; [43]$.

**1. b)** $x^{42} = x \cdot x^{41} \equiv 4x \; [43]$, donc $4x \equiv 1 \; [43]$. En multipliant par $11$ : $44x \equiv 11 \; [43]$, et comme $44 \equiv 1 \; [43]$, $x \equiv 11 \; [43]$.

**2.** Réciproquement, si $x \equiv 11 \; [43]$, alors $x$ et $43$ sont premiers entre eux, $x^{42} \equiv 1 \; [43]$ et $4x \equiv 44 \equiv 1 \; [43]$. Donc $x^{41} \equiv 4x \cdot x^{41} = 4x^{42} \equiv 4 \; [43]$. L’ensemble des solutions de $(F)$ est $\{11 + 43k \mid k \in \mathbb{Z}\}$.

### Partie III

**1. a)** D’après la partie II, $x \equiv 11 \; [43]$. Comme $47$ est premier, le petit théorème de Fermat donne $x^{47} \equiv x \; [47]$ pour tout entier $x$, donc $x \equiv 10 \; [47]$.

**1. b)** Écrivons $x = 11 + 43k = 10 + 47m$ avec $k, m \in \mathbb{Z}$. Alors $47m - 43k = 1$ : le couple $(m, k)$ est solution de $(E)$, donc $k = 12 + 47t$ avec $t \in \mathbb{Z}$. D’où $x = 11 + 43(12 + 47t) = 527 + 2021t$, puisque $43 \times 47 = 2021$. Ainsi $x \equiv 527 \; [2021]$.

**2.** Réciproquement, si $x \equiv 527 \; [2021]$, alors $x \equiv 527 \equiv 11 \; [43]$ (car $527 = 11 + 43 \times 12$) et $x \equiv 527 \equiv 10 \; [47]$ (car $527 = 10 + 47 \times 11$). D’après la partie II, $x^{41} \equiv 4 \; [43]$, et d’après Fermat, $x^{47} \equiv x \equiv 10 \; [47]$. L’ensemble des solutions de $(S)$ est :

$$\{527 + 2021k \mid k \in \mathbb{Z}\}$$
