---
summary: Structures algébriques (une matrice telle que A² = I, un groupe sur ]a, +∞[), arithmétique (le nombre 11…1 et le premier 2011), nombres complexes (symétrie, rotation, points cocycliques), analyse (l’équation eˣ = xⁿ et deux suites) et une fonction définie par une intégrale.
---

## Exercice 1 : structures algébriques (4 points)

### Première partie

**1.** Le bloc $B = \frac{\sqrt{2}}{2}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$ vérifie $B^2 = \frac{1}{2}\begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$, et le dernier coefficient vaut $1^2 = 1$. Donc $A^2 = I$, et $A^{2k} = (A^2)^k = I$ pour tout $k \in \mathbb{N}$.

**2.** $A \times A = I$ : $A$ est inversible et $A^{-1} = A$.

### Deuxième partie

**1. a)** Pour $x, y > a$, $(x - a)(y - a) > 0$, donc $x * y > a$ : la loi est interne dans $I$.

**1. b)** L’expression est symétrique en $x$ et $y$. Et $(x * y) * z = (x - a)(y - a)(z - a) + a$, qui est symétrique en $x$, $y$, $z$ : la loi est associative.

**1. c)** $x * e = x \iff (x - a)(e - a) = x - a \iff e - a = 1$ (car $x \neq a$) : le neutre est $a + 1 \in I$.

**2.** Pour $x \in I$, $x' = a + \frac{1}{x - a} \in I$ vérifie $(x - a)(x' - a) = 1$, donc $x * x' = a + 1$. $(I, *)$ est un groupe commutatif.

**3. a)** $\varphi$ est une bijection de $I$ sur $\mathbb{R}_+^*$ : $\frac{1}{x - a} = y \iff x = a + \frac{1}{y}$. Et $\varphi(x * y) = \frac{1}{(x - a)(y - a)} = \varphi(x)\varphi(y)$ : c’est un isomorphisme.

**3. b)** $x^{(3)} = (x - a)^3 + a$. L’équation s’écrit $(x - a)^3 = a^3$, soit $x - a = a$, donc $x = 2a$. Cette solution est dans $I$ si et seulement si $2a > a$, c’est-à-dire $a > 0$. Si $a > 0$, l’ensemble des solutions est $\{2a\}$ ; si $a \leq 0$, il est vide.

## Exercice 2 : arithmétique (2,5 points)

**1.** $N = \sum_{k=0}^{2009} 10^k$ et $10 \equiv -1 \; [11]$, donc $N \equiv \sum_{k=0}^{2009}(-1)^k = 0 \; [11]$ : les $2010$ termes s’annulent deux à deux. $11$ divise $N$.

**2. a)** $\sqrt{2011} < 45$. $2011$ n’est divisible par aucun nombre premier jusqu’à $43$ : les restes de la division par $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43$ valent $1, 1, 1, 2, 9, 9, 5, 16, 10, 10, 27, 13, 2, 33$. $2011$ est premier. Et $9N = 99\ldots9$ ($2010$ chiffres $9$) $= 10^{2010} - 1$.

**2. b)** $2011$ est premier et ne divise pas $10$ : d’après le petit théorème de Fermat, $10^{2010} \equiv 1 \; [2011]$, donc $2011$ divise $9N$.

**2. c)** $2011$ est premier avec $9$ ; d’après le théorème de Gauss, il divise $N$.

**3.** $22121 = 11 \times 2011$. Les nombres premiers distincts $11$ et $2011$ divisent $N$, donc leur produit $22121$ divise $N$.

## Exercice 3 : nombres complexes (3,5 points)

### Première partie

**1.** Avec $z_1 = 2 - m$ :

$$(2 - m)^2 + \big((1 - i)m - 4\big)(2 - m) - im^2 - 2(1 - i)m + 4 = m^2\big(1 - (1 - i) - i\big) = 0$$

(tous les autres termes s’annulent).

**2. a)** Le produit des racines est $z_1z_2 = -im^2 - 2(1 - i)m + 4$. Donc $z_1z_2 = 1 \iff -im^2 - 2(1 - i)m + 3 = 0 \iff im^2 + 2(1 - i)m - 3 = 0$.

**2. b)** En multipliant par $-i$ : $m^2 - (2 + 2i)m + 3i = 0$. Son discriminant est $(2 + 2i)^2 - 12i = -4i = \left(\sqrt{2} - i\sqrt{2}\right)^2$. Les deux valeurs sont :

$$m_1 = 1 + \frac{\sqrt{2}}{2} + i\left(1 - \frac{\sqrt{2}}{2}\right) \qquad m_2 = 1 - \frac{\sqrt{2}}{2} + i\left(1 + \frac{\sqrt{2}}{2}\right)$$

(on vérifie que $m_1 + m_2 = 2 + 2i$ et $m_1m_2 = 3i$).

### Deuxième partie

**1. a)** $z' - 1 = -(z - 1)$ : le point d’affixe $1$ est le milieu de $[MM']$. $S$ est la symétrie centrale de centre ce point.

**1. b)** $z'' - (1 + i) = i\big(z - (1 + i)\big)$, donc $z'' = iz - i + 1 + 1 + i = iz + 2$.

**2. a)** $z' - 2 = -z$ et $z'' - 2 = iz$, donc $\frac{z'' - 2}{z' - 2} = -i$ (avec $z \neq 0$). Ainsi $AM'' = AM'$ et $(\overrightarrow{AM'}, \overrightarrow{AM''}) \equiv -\frac{\pi}{2} \; [2\pi]$ : le triangle $AM'M''$ est rectangle et isocèle en $A$.

**2. b)** Avec $\omega = 1 + i$ : $z'' - \omega = i\big(z - (1 + i)\big)$ et $z' - \omega = -\big(z - (1 - i)\big)$. Supposons $M \neq \Omega$ et $z \neq 1 - i$, pour que les points soient distincts. Les quatre points sont cocycliques ou alignés si et seulement si $\frac{z'' - 2}{z' - 2} \div \frac{z'' - \omega}{z' - \omega}$ est réel. Comme $\frac{z'' - 2}{z' - 2} = -i$, il faut que $\frac{z'' - \omega}{z' - \omega} = -i\,\frac{z - (1 + i)}{z - (1 - i)}$ soit imaginaire pur, c’est-à-dire que $\frac{z - (1 + i)}{z - (1 - i)}$ soit réel. Cela signifie que $M$ est sur la droite passant par les points d’affixes $1 + i$ et $1 - i$, la droite d’équation $x = 1$. Sur cette droite, les quatre points ne sont jamais alignés (on le vérifie avec la droite $(A\Omega)$ d’équation $x + y = 2$). L’ensemble cherché est la droite d’équation $x = 1$, privée des points d’affixes $1 + i$ et $1 - i$.

## Exercice 4 : analyse (6,5 points)

### Première partie

**1.** Pour $x \in ]0 ; 1[ \cup ]1 ; +\infty[$ : $e^x = x^n \iff x = n\ln x \iff n = \frac{x}{\ln x} = f(x)$, puisque $\ln x \neq 0$.

**2.** $\frac{f(x) - f(0)}{x} = \frac{1}{\ln x} \to 0$ quand $x \to 0^+$ : $f$ est dérivable à droite en $0$ et $f'_d(0) = 0$.

**3.** $\lim_{x \to 1^-} f(x) = -\infty$ ($\ln x \to 0^-$) et $\lim_{x \to 1^+} f(x) = +\infty$ : la droite $x = 1$ est asymptote verticale. $\lim_{x \to +\infty} f(x) = +\infty$ et $\frac{f(x)}{x} = \frac{1}{\ln x} \to 0$ : branche parabolique de direction l’axe des abscisses.

**4.** $f'(x) = \frac{\ln x - 1}{\ln^2 x}$. Sur $[0 ; 1[$, $f' < 0$ : $f$ décroît de $0$ à $-\infty$. Sur $]1 ; e]$, $f' \leq 0$ : $f$ décroît de $+\infty$ à $f(e) = e$ ; sur $[e ; +\infty[$, $f' \geq 0$ : elle croît de $e$ à $+\infty$.

**5.** $f'(x) = \frac{1}{\ln x} - \frac{1}{\ln^2 x}$, donc $f''(x) = -\frac{1}{x\ln^2 x} + \frac{2}{x\ln^3 x} = \frac{2 - \ln x}{x\ln^3 x}$. Sur $]1 ; +\infty[$, $f''$ change de signe en $e^2$ (positive avant, négative après) : le point $\left(e^2 ; \frac{e^2}{2}\right)$ est un point d’inflexion.

**6.** Éléments pour le tracé : $(C)$ part de $O$ avec une tangente horizontale et descend vers $-\infty$ près de $x = 1$. Après l’asymptote, elle descend de $+\infty$ au minimum $(e ; e)$, puis remonte, convexe jusqu’à $\left(e^2 ; \frac{e^2}{2}\right)$ et concave ensuite, avec une branche parabolique horizontale.

**7.** Pour $n \geq 3 > e$ : sur $]0 ; 1[$, $f < 0$, donc pas de solution ; $x = 0$ n’est pas solution. Sur $]1 ; e]$, $f$ décroît strictement de $+\infty$ à $e < n$ : une seule solution $a_n \in ]1 ; e[$. Sur $[e ; +\infty[$, $f$ croît strictement de $e$ à $+\infty$ : une seule solution $b_n > e$. Ainsi $1 < a_n < e < b_n$.

### Deuxième partie

**1.** Pour $n \geq 3$, $\ln n > 1$, donc $f(n) = \frac{n}{\ln n} < n = f(b_n)$. Comme $n \geq e$ et $f$ est croissante sur $[e ; +\infty[$, $n < b_n$. Donc $\lim_{n \to +\infty} b_n = +\infty$.

**2. a)** $f(a_{n+1}) = n + 1 > n = f(a_n)$ et $f$ est décroissante sur $]1 ; e]$, donc $a_{n+1} < a_n$. La suite est décroissante et minorée par $1$ : elle converge.

**2. b)** $f(a_n) = n$ s’écrit $\ln a_n = \frac{a_n}{n}$, et $1 < a_n < e$ donne $\frac{1}{n} < \ln a_n < \frac{e}{n}$. Donc $\ln a_n \to 0$ et $\lim_{n \to +\infty} a_n = 1$.

**2. c)** $a_n^n = e^{n\ln a_n} = e^{a_n} \to e^1 = e$.

## Exercice 5 : analyse (3,5 points)

Notons $\Phi(x) = \int_0^x e^{-t^2}\,dt$, de sorte que $F(x) = e^{-x^2}\Phi(x)$.

**1. a)** Pour $t \in [0 ; x]$, $0 < e^{-t^2} \leq 1$, donc $0 \leq \Phi(x) \leq x$ et $0 \leq F(x) \leq xe^{-x^2}$.

**1. b)** Pour $x \geq 1$, $x^2 \geq x$, donc $e^{-x^2} \leq e^{-x}$. Alors $0 \leq F(x) \leq xe^{-x} \to 0$ : $\lim_{x \to +\infty} F(x) = 0$.

**2.** $\Phi$ est dérivable (primitive d’une fonction continue) et $\Phi'(x) = e^{-x^2}$. Donc $F$ est dérivable et $F'(x) = -2xe^{-x^2}\Phi(x) + e^{-x^2}e^{-x^2} = e^{-2x^2} - 2xF(x)$.

**3. a)** Quand $x \to \frac{\pi}{2}^-$, $\tan x \to +\infty$, donc $G(x) = F(\tan x) \to 0 = G\left(\frac{\pi}{2}\right)$.

**3. b)** $G$ est continue sur $\left[0 ; \frac{\pi}{2}\right]$, dérivable sur $\left]0 ; \frac{\pi}{2}\right[$ avec $G'(x) = (1 + \tan^2 x)F'(\tan x)$, et $G(0) = F(0) = 0 = G\left(\frac{\pi}{2}\right)$. D’après le théorème de Rolle, il existe $x_0 \in \left]0 ; \frac{\pi}{2}\right[$ tel que $G'(x_0) = 0$, donc $F'(c) = 0$ avec $c = \tan x_0 > 0$. La question 2 donne alors $e^{-2c^2} = 2cF(c)$, soit $F(c) = \frac{e^{-2c^2}}{2c}$.

**4. a)** $H(x) = \frac{e^{x^2}}{2x}\left(e^{-2x^2} - 2xe^{-x^2}\Phi(x)\right) = \frac{e^{-x^2}}{2x} - \Phi(x)$. Donc :

$$H'(x) = \frac{-4x^2e^{-x^2} - 2e^{-x^2}}{4x^2} - e^{-x^2} = -e^{-x^2}\left(\frac{2x^2 + 1}{2x^2} + 1\right) < 0$$

$H$ est strictement décroissante sur $]0 ; +\infty[$.

**4. b)** Pour $x > 0$, $F'(x) = 0 \iff H(x) = 0$, et $H$, strictement décroissante, s’annule au plus une fois : $c$ est unique. $H > 0$ avant $c$ et $H < 0$ après, donc $F' > 0$ sur $[0 ; c[$ (avec $F'(0) = 1$) et $F' < 0$ sur $]c ; +\infty[$. $F$ croît de $F(0) = 0$ jusqu’à $F(c) = \frac{e^{-2c^2}}{2c}$, puis décroît vers $0$.
