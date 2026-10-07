---
summary: Structures algébriques (inverse d’une matrice, un groupe sur ]1, +∞[), nombres complexes (projeté orthogonal), arithmétique (143x − 195y = 52 et chiffre des unités), analyse (la famille x + e^(−x)/n) et une fonction définie par une intégrale, dérivable en 0.
---

## Exercice 1 : structures algébriques (3,5 points)

### Partie I

**1.** Posons $\alpha = \frac{\sqrt{5} - 1}{2}$ ; alors $\alpha^2 = \frac{6 - 2\sqrt{5}}{4} = \frac{3 - \sqrt{5}}{2} = 1 - \alpha$. Le bloc $B = \begin{pmatrix} -2 & -1 \\ 1 & 1 \end{pmatrix}$ vérifie $B^2 = \begin{pmatrix} 3 & 1 \\ -1 & 0 \end{pmatrix}$. Donc :

$$I - A = \begin{pmatrix} \frac{3 - \sqrt{5}}{2} & 0 & 0 \\ 0 & 3 & 1 \\ 0 & -1 & 0 \end{pmatrix} = A^2$$

**2.** $A^2 = I - A$ s’écrit $A(A + I) = (A + I)A = I$ : $A$ est inversible et :

$$A^{-1} = A + I = \begin{pmatrix} \frac{\sqrt{5} + 1}{2} & 0 & 0 \\ 0 & -1 & -1 \\ 0 & 1 & 2 \end{pmatrix}$$

### Partie II

**1.** $(x^2 - 1)(y^2 - 1) + 1 = x^2y^2 - x^2 - y^2 + 2$.

**2.** Pour $a, b > 1$, $(a^2 - 1)(b^2 - 1) > 0$, donc $a^2b^2 - a^2 - b^2 + 2 > 1$ et $a * b > 1$ : la loi $*$ est interne dans $I$.

**3. a)** $\varphi$ est une bijection de $\mathbb{R}_+^*$ sur $I$ : pour $y > 1$, $\sqrt{x + 1} = y \iff x = y^2 - 1 > 0$. Et $\varphi(x) * \varphi(y) = \sqrt{xy + 1} = \varphi(xy)$, d’après la question 1. $\varphi$ est un isomorphisme de $(\mathbb{R}_+^*, \times)$ sur $(I, *)$.

**3. b)** $(I, *)$ est un groupe commutatif, de neutre $\varphi(1) = \sqrt{2}$. Le symétrique de $a$ est $\varphi\left(\frac{1}{a^2 - 1}\right) = \frac{a}{\sqrt{a^2 - 1}}$.

**3. c)** $H = \{2^m \mid m \in \mathbb{Z}\}$ est un sous-groupe de $(\mathbb{R}_+^*, \times)$ : il contient $1$, et $2^m \times (2^n)^{-1} = 2^{m - n} \in H$. Son image par l’isomorphisme $\varphi$ est $\Gamma$, qui est donc un sous-groupe de $(I, *)$.

## Exercice 2 : nombres complexes (3,5 points)

### Partie I

**1.** $\Delta = (2 - i)^2a^2 + 4i(1 + i)a^2 = (3 - 4i - 4 + 4i)a^2 = -a^2 = (ia)^2$. Donc :

$$z_1 = \frac{-(2 - i)a + ia}{2i} = \frac{(-1 + i)a}{i} = (1 + i)a \qquad z_2 = \frac{-(2 - i)a - ia}{2i} = \frac{-a}{i} = ia$$

**2. a)** $z_1z_2 = (1 + i)i\,a^2 = (i - 1)a^2$.

**2. b)** $i - 1 = \sqrt{2}\,e^{i\frac{3\pi}{4}}$, donc $z_1z_2$ est réel si et seulement si $\frac{3\pi}{4} + 2\arg a \equiv 0 \; [\pi]$, c’est-à-dire $\arg a \equiv -\frac{3\pi}{8} \; \left[\frac{\pi}{2}\right]$.

### Partie II

**1. a)** $A \neq D$, car $ic$ n’est pas réel. $A$, $D$, $M$ sont alignés si et seulement si $\frac{z - 1}{ic - 1}$ est réel, c’est-à-dire égal à son conjugué $\frac{\bar{z} - 1}{-ic - 1}$ ($c$ est réel). Cela s’écrit $(z - 1)(-ic - 1) = (\bar{z} - 1)(ic - 1)$, soit, après développement, $(ic + 1)z + (ic - 1)\bar{z} = 2ic$.

**1. b)** $(AD) \perp (OM)$ si et seulement si $\frac{z}{ic - 1}$ est imaginaire pur, c’est-à-dire $\frac{z}{ic - 1} + \frac{\bar{z}}{-ic - 1} = 0$, soit $(ic + 1)z - (ic - 1)\bar{z} = 0$.

**2. a)** $H$ vérifie les deux relations précédentes. En les additionnant : $2(ic + 1)h = 2ic$, donc $h = \frac{ic}{ic + 1} = \frac{c}{c - i}$. Alors $h\left(1 - \frac{i}{c}\right) = h \cdot \frac{c - i}{c} = 1$, soit $h - 1 = \frac{i}{c}h$, et en retranchant $i$ de chaque membre :

$$h - (1 + i) = \frac{i}{c}h - i = \frac{i}{c}(h - c)$$

**2. b)** $H$ est distinct de $B$ et de $C$, et $\frac{h - b}{h - c} = \frac{i}{c}$ est imaginaire pur ($c$ est un réel non nul) : $(CH) \perp (BH)$.

## Exercice 3 : arithmétique (3 points)

**1. a)** Par l’algorithme d’Euclide : $195 = 143 + 52$, $143 = 2 \times 52 + 39$, $52 = 39 + 13$, $39 = 3 \times 13$. Donc $143 \wedge 195 = 13$, qui divise $52$ : l’équation $(E)$ admet des solutions.

**1. b)** $143 \times (-1) - 195 \times (-1) = 52$. Si $(x, y)$ est solution, en soustrayant : $143(x + 1) = 195(y + 1)$, puis en divisant par $13$ : $11(x + 1) = 15(y + 1)$. Comme $11$ et $15$ sont premiers entre eux, le théorème de Gauss donne $x + 1 = 15k$, puis $y + 1 = 11k$, avec $k \in \mathbb{Z}$. Réciproquement, ces couples conviennent :

$$S = \{(-1 + 15k, -1 + 11k) \mid k \in \mathbb{Z}\}$$

**2.** $5$ est premier et ne divise pas $n$ : d’après le petit théorème de Fermat, $n^4 \equiv 1 \; [5]$, donc $n^{4k} \equiv 1 \; [5]$.

**3. a)** Supposons $x \geq y$, donc $x = y + 4k$ avec $k \in \mathbb{N}$. Si $5$ divise $n$, alors $n^x \equiv 0 \equiv n^y \; [5]$ (car $x, y \geq 1$). Sinon, $n^x = n^y \cdot n^{4k} \equiv n^y \; [5]$ d’après 2.

**3. b)** $n^x$ et $n^y$ ont la parité de $n$ (car $x, y \geq 1$), donc $2$ divise $n^x - n^y$, et $5$ aussi d’après 3. a). Comme $2$ et $5$ sont premiers entre eux, $10$ divise $n^x - n^y$.

**4.** $(x, y) = (15k - 1, 11k - 1)$ avec $x, y \geq 0$ impose $k \geq 1$, donc $x, y \geq 1$, et $x - y = 4k \equiv 0 \; [4]$. D’après 3. b), $n^x \equiv n^y \; [10]$ : $n^x$ et $n^y$ ont le même chiffre des unités.

## Exercice 4 : analyse (5,5 points)

Ici $f_n(x) = x + \frac{e^{-x}}{n}$.

**1.** En $-\infty$ : $f_n(x) = e^{-x}\left(xe^x + \frac{1}{n}\right)$, avec $xe^x \to 0$ et $e^{-x} \to +\infty$, donc $\lim_{x \to -\infty} f_n(x) = +\infty$. En $+\infty$ : $\lim_{x \to +\infty} f_n(x) = +\infty$.

**2. a)** $\frac{f_n(x)}{x} = 1 + \frac{e^{-x}}{nx} \to -\infty$ en $-\infty$ : $(C_n)$ admet une branche parabolique de direction l’axe des ordonnées.

**2. b)** $f_n(x) - x = \frac{e^{-x}}{n} \to 0$ en $+\infty$ : la droite $(D)$ d’équation $y = x$ est asymptote oblique. Et $f_n(x) - x > 0$ : $(C_n)$ est au-dessus de $(D)$.

**3.** $f_n'(x) = 1 - \frac{e^{-x}}{n}$ s’annule en $x = -\ln n$, est négative avant et positive après. $f_n$ décroît sur $]-\infty ; -\ln n]$ de $+\infty$ à $f_n(-\ln n) = 1 - \ln n$, puis croît sur $[-\ln n ; +\infty[$ jusqu’à $+\infty$.

**4.** Éléments pour tracer $(C_3)$ : minimum au point d’abscisse $-\ln 3 \approx -1{,}1$, d’ordonnée $1 - \ln 3 \approx -0{,}1$ ; la courbe coupe l’axe des abscisses vers $-1{,}5$ et vers $-0{,}6$ ; $f_3(0) = \frac{1}{3}$ ; asymptote $y = x$ en $+\infty$ (courbe au-dessus) et branche parabolique verticale en $-\infty$.

**5. a)** Pour $n \geq 3$ : $\frac{e}{n} \leq \frac{e}{3} < 1 < \ln 3 \leq \ln n$.

**5. b)** Le minimum $1 - \ln n$ est strictement négatif. Sur $]-\infty ; -\ln n]$, $f_n$ est continue et strictement décroissante, de $+\infty$ à $1 - \ln n < 0$ : elle s’annule une seule fois, en $x_n \leq -\ln n$. Sur $[-\ln n ; +\infty[$, elle est strictement croissante de $1 - \ln n$ à $+\infty$ : elle s’annule une seule fois, en $y_n$. Or $-\frac{e}{n} \geq -\ln n$ (question 5. a), $f_n\left(-\frac{e}{n}\right) = \frac{e^{\frac{e}{n}} - e}{n} < 0$ (car $\frac{e}{n} < 1$) et $f_n(0) = \frac{1}{n} > 0$, donc $-\frac{e}{n} \leq y_n \leq 0$.

**5. c)** $x_n \leq -\ln n$, donc $\lim_{n \to +\infty} x_n = -\infty$ ; par encadrement, $\lim_{n \to +\infty} y_n = 0$.

**6. a)** $\lim_{x \to 0^+} x\ln x = 0$, donc $\lim_{x \to 0^+} g(x) = -1 = g(0)$.

**6. b)** $f_n(x_n) = 0$ s’écrit $e^{-x_n} = -nx_n$ (avec $x_n < 0$), donc $-x_n = \ln n + \ln(-x_n)$. Alors :

$$g\left(\frac{-1}{x_n}\right) = -1 + \frac{1}{x_n}\ln\left(\frac{-1}{x_n}\right) = -1 - \frac{\ln(-x_n)}{x_n} = -1 - \frac{-x_n - \ln n}{x_n} = \frac{\ln n}{x_n}$$

**6. c)** $x_n \to -\infty$, donc $\frac{-1}{x_n} \to 0^+$, et par continuité de $g$ en $0$ : $\lim_{n \to +\infty} \frac{\ln n}{x_n} = g(0) = -1$.

## Exercice 5 : analyse (4,5 points)

**1.** Pour $0 \leq t \leq x$ : $1 \leq 1 + 2t \leq 1 + 2x$, donc $\frac{1}{1 + 2x} \leq \frac{1}{1 + 2t} \leq 1$.

**2. a)** $\frac{t}{1 + 2t} = \frac{1}{2} - \frac{1}{2(1 + 2t)}$, donc $\int_0^x \frac{t}{1 + 2t}\,dt = \frac{x}{2} - \frac{\ln(1 + 2x)}{4}$, et $\frac{2}{x^2}\int_0^x \frac{t}{1 + 2t}\,dt = \frac{1}{x} - \frac{\ln(1 + 2x)}{2x^2} = F(x)$.

**2. b)** D’après 1, $\frac{t}{1 + 2x} \leq \frac{t}{1 + 2t} \leq t$ pour $t \in [0 ; x]$. En intégrant : $\frac{x^2}{2(1 + 2x)} \leq \int_0^x \frac{t}{1 + 2t}\,dt \leq \frac{x^2}{2}$, puis en multipliant par $\frac{2}{x^2}$ : $\frac{1}{1 + 2x} \leq F(x) \leq 1$. Par encadrement, $\lim_{x \to 0^+} F(x) = 1 = F(0)$ : $F$ est continue à droite en $0$.

**3.** On intègre par parties avec $u(t) = \frac{1}{1 + 2t}$ et $v'(t) = 2t$, donc $u'(t) = \frac{-2}{(1 + 2t)^2}$ et $v(t) = t^2$ :

$$\int_0^x \frac{2t}{1 + 2t}\,dt = \left[\frac{t^2}{1 + 2t}\right]_0^x + 2\int_0^x \frac{t^2}{(1 + 2t)^2}\,dt = \frac{x^2}{1 + 2x} + 2\int_0^x \left(\frac{t}{1 + 2t}\right)^2dt$$

**4. a)** Notons $K(x) = \int_0^x \frac{t}{1 + 2t}\,dt$ et $J(x) = \int_0^x \left(\frac{t}{1 + 2t}\right)^2dt$ ; d’après 3, $K(x) = \frac{x^2}{2(1 + 2x)} + J(x)$. Comme $F(x) = \frac{2}{x^2}K(x)$ :

$$F'(x) = -\frac{4}{x^3}K(x) + \frac{2}{x^2} \cdot \frac{x}{1 + 2x} = -\frac{2}{x(1 + 2x)} - \frac{4}{x^3}J(x) + \frac{2}{x(1 + 2x)} = -\frac{4}{x^3}J(x)$$

**4. b)** D’après 1, $\frac{t^2}{(1 + 2x)^2} \leq \left(\frac{t}{1 + 2t}\right)^2 \leq t^2$. En intégrant : $\frac{x^3}{3(1 + 2x)^2} \leq J(x) \leq \frac{x^3}{3}$. En multipliant par $-\frac{4}{x^3} < 0$ : $-\frac{4}{3} \leq F'(x) \leq \frac{-4}{3(1 + 2x)^2}$.

**4. c)** $F$ est continue sur $[0 ; x]$ et dérivable sur $]0 ; x[$ : il existe $c \in ]0 ; x[$ tel que $\frac{F(x) - F(0)}{x} = F'(c)$. D’après 4. b) en $c$, et comme $c < x$ donne $\frac{-4}{3(1 + 2c)^2} \leq \frac{-4}{3(1 + 2x)^2}$ :

$$-\frac{4}{3} \leq \frac{F(x) - F(0)}{x} \leq \frac{-4}{3(1 + 2x)^2}$$

**4. d)** Les deux bornes tendent vers $-\frac{4}{3}$ quand $x \to 0^+$ : $F$ est dérivable à droite en $0$ et $F'_d(0) = -\frac{4}{3}$.
