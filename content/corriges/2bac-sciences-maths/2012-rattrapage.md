---
summary: Structures algébriques (une loi sur [1, +∞[, un groupe de matrices), nombres complexes (rotation, rectangle), arithmétique (503 premier et 2012 divise 1 + 7 + … + 7²⁰⁰⁷), analyse (la fonction eˣ ln(1 + e⁻ˣ), une suite) et une intégrale avec arctan.
---

## Exercice 1 : structures algébriques (3,5 points)

### Partie I

**1.** Pour $a, b \geq 1$ : $\sqrt{a} \geq 1$ et $\sqrt{b} \geq 1$, donc $\sqrt{a} + \sqrt{b} - 1 \geq 1$ et $a \perp b \geq 1$ : la loi est interne dans $I$.

**2.** L’expression est symétrique en $a$ et $b$ : la loi est commutative. Comme $\sqrt{a \perp b} = \sqrt{a} + \sqrt{b} - 1$ (nombre positif) :

$$(a \perp b) \perp c = \left(\sqrt{a} + \sqrt{b} - 1 + \sqrt{c} - 1\right)^2 = \left(\sqrt{a} + \sqrt{b} + \sqrt{c} - 2\right)^2$$

Cette expression est symétrique en $a$, $b$, $c$ : elle vaut aussi $a \perp (b \perp c)$. La loi est associative.

**3.** $a \perp 1 = (\sqrt{a} + 1 - 1)^2 = a$ : $1$ est l’élément neutre.

### Partie II

**1.** $M(x) \times M(y) = \begin{pmatrix} xy & 2x(y - 1) + 2(x - 1) \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} xy & 2(xy - 1) \\ 0 & 1 \end{pmatrix} = M(xy)$, avec $xy \neq 0$ : $E$ est stable pour la multiplication.

**2. a)** $\varphi$ est surjective par définition de $E$, et injective ($M(x) = M(y)$ donne $x = y$). D’après 1, $\varphi(xy) = \varphi(x) \times \varphi(y)$ : $\varphi$ est un isomorphisme de $(\mathbb{R}^*, \times)$ sur $(E, \times)$.

**2. b)** $(E, \times)$ est un groupe commutatif, de neutre $M(1) = I$ ; l’inverse de $M(x)$ est $M\left(\frac{1}{x}\right)$.

**2. c)** $2^{n+1} - 2 = 2(2^n - 1)$, donc $H = \{M(2^n) \mid n \in \mathbb{Z}\}$. C’est l’image par $\varphi$ du sous-groupe $\{2^n \mid n \in \mathbb{Z}\}$ de $(\mathbb{R}^*, \times)$ : c’est un sous-groupe de $(E, \times)$.

## Exercice 2 : nombres complexes (3,5 points)

### Partie I

**1. a)** $z_1^2 = 1 + \frac{4}{3}i - \frac{4}{9} = \frac{5}{9} + \frac{4}{3}i$. Comme $4\left(1 + \frac{2}{3}i\right) = 4z_1$, le premier membre vaut $z_1^2 - 4z_1^2 + \frac{5}{3} + 4i = -3\left(\frac{5}{9} + \frac{4}{3}i\right) + \frac{5}{3} + 4i = 0$.

**1. b)** La somme des racines vaut $4z_1$, donc $z_2 = 4z_1 - z_1 = 3z_1$.

**2.** Le produit des racines vaut $\frac{5}{3} + 4i = z_1z_2 = 3z_1^2$. Avec $|z_1| = \frac{\sqrt{13}}{3}$ et $\arg z_1 = \theta$ :

$$\frac{5}{3} + 4i = \frac{13}{3}\left(\cos 2\theta + i\sin 2\theta\right)$$

### Partie II

**1. a)** $P = r(A)$ : $p - \omega = e^{i\frac{\pi}{3}}(a - \omega)$. $B = r(Q)$ : $b - \omega = e^{i\frac{\pi}{3}}(q - \omega)$, donc $q = \omega + e^{-i\frac{\pi}{3}}(b - \omega)$.

**1. b)** $1 - e^{i\frac{\pi}{3}} = -2i\sin\frac{\pi}{6}\,e^{i\frac{\pi}{6}}$ et $1 - e^{-i\frac{\pi}{3}} = 2i\sin\frac{\pi}{6}\,e^{-i\frac{\pi}{6}}$, donc leur quotient vaut $-e^{i\frac{\pi}{3}} = e^{i\frac{4\pi}{3}}$.

**1. c)** $p - a = (\omega - a)\left(1 - e^{i\frac{\pi}{3}}\right)$ et $q - b = (\omega - b)\left(1 - e^{-i\frac{\pi}{3}}\right)$, avec $\omega \neq b$. D’après 1. b) :

$$\frac{p - a}{q - b} = \frac{\omega - a}{\omega - b}\,e^{i\frac{4\pi}{3}}$$

**2. a)** Avec l’hypothèse, $\frac{p - a}{q - b} = e^{i\frac{2\pi}{3}}e^{i\frac{4\pi}{3}} = 1$ : $\overrightarrow{AP} = \overrightarrow{BQ}$, donc $APQB$ est un parallélogramme.

**2. b)** L’hypothèse donne $\omega - a = e^{i\frac{2\pi}{3}}(\omega - b)$, d’où $b - a = (\omega - b)\left(e^{i\frac{2\pi}{3}} - 1\right)$ et $p - a = e^{i\frac{2\pi}{3}}(\omega - b)\left(1 - e^{i\frac{\pi}{3}}\right)$. Avec $e^{i\frac{2\pi}{3}} - 1 = i\sqrt{3}\,e^{i\frac{\pi}{3}}$ et $1 - e^{i\frac{\pi}{3}} = -i\,e^{i\frac{\pi}{6}}$ :

$$\frac{b - a}{p - a} = \frac{i\sqrt{3}\,e^{i\frac{\pi}{3}}}{-i\,e^{i\frac{5\pi}{6}}} = -\sqrt{3}\,e^{-i\frac{\pi}{2}} = \sqrt{3}\,e^{i\frac{\pi}{2}}$$

Donc $\arg\left(\frac{b - a}{p - a}\right) \equiv \frac{\pi}{2} \; [2\pi]$ : $(AB) \perp (AP)$. Le parallélogramme $APQB$ a un angle droit en $A$ : c’est un rectangle.

## Exercice 3 : arithmétique (3 points)

**1. a)** $\sqrt{503} < 23$, et $503$ n’est divisible ni par $2$, $3$, $5$, ni par $7$ ($7 \times 71 = 497$), $11$ ($11 \times 45 = 495$), $13$ ($13 \times 38 = 494$), $17$ ($17 \times 29 = 493$) ou $19$ ($19 \times 26 = 494$). $503$ est premier.

**1. b)** $503$ est premier et ne divise pas $7$ : d’après le petit théorème de Fermat, $7^{502} \equiv 1 \; [503]$. Comme $2008 = 4 \times 502$, $7^{2008} \equiv 1 \; [503]$.

**2.** $49 - 6 \times 8 = 1$. Si $(x, y)$ est solution, $49(x - 1) = 6(y - 8)$ ; $49$ et $6$ sont premiers entre eux, donc d’après le théorème de Gauss $x - 1 = 6k$, puis $y - 8 = 49k$. Réciproquement ces couples conviennent : $S = \{(1 + 6k, 8 + 49k) \mid k \in \mathbb{Z}\}$.

**3. a)** $N = \frac{7^{2008} - 1}{6}$, donc $49 \times 7^{2006} - 6N = 7^{2008} - (7^{2008} - 1) = 1$.

**3. b)** $7 \equiv -1 \; [4]$, donc $N \equiv 1 - 1 + 1 - \cdots - 1 \; [4]$ : les $2008$ termes s’annulent deux à deux, et $N \equiv 0 \; [4]$. Par ailleurs $6N = 7^{2008} - 1 \equiv 0 \; [503]$, et $503$ est premier avec $6$ : d’après Gauss, $N \equiv 0 \; [503]$.

**3. c)** $4$ et $503$ sont premiers entre eux et divisent $N$, donc $4 \times 503 = 2012$ divise $N$.

## Exercice 4 : analyse (7,5 points)

### Partie I

**1.** $g'(x) = \frac{1}{1 + x} - \frac{1}{(1 + x)^2} = \frac{x}{(1 + x)^2} \geq 0$ : $g$ est croissante sur $[0 ; +\infty[$ (strictement), et $g(0) = 0$.

**2.** Donc $g(x) \geq 0$ sur $[0 ; +\infty[$, et $g(x) > 0$ pour $x > 0$.

### Partie II

**1.** En $+\infty$, avec $u = e^{-x} \to 0^+$ : $f(x) = \frac{\ln(1 + u)}{u} \to 1$. En $-\infty$ : $1 + e^{-x} = e^{-x}(1 + e^x)$, donc $f(x) = -xe^x + e^x\ln(1 + e^x) \to 0 + 0 = 0$.

**2.** $f'(x) = e^x\ln(1 + e^{-x}) + e^x \cdot \frac{-e^{-x}}{1 + e^{-x}} = e^x\left(\ln(1 + e^{-x}) - \frac{e^{-x}}{1 + e^{-x}}\right) = e^x g(e^{-x})$.

**3.** $e^{-x} > 0$, donc $g(e^{-x}) > 0$ et $f'(x) > 0$ : $f$ est strictement croissante sur $\mathbb{R}$, de $0$ (en $-\infty$) à $1$ (en $+\infty$), avec $f(0) = \ln 2$.

**4.** Éléments pour le tracé : $(C)$ monte de l’asymptote $y = 0$ (en $-\infty$) vers l’asymptote $y = 1$ (en $+\infty$), passe par $(0 ; \ln 2)$ et change de concavité vers $x = -0{,}7$. $(C')$ est la symétrique de $(C)$ par rapport à l’axe des abscisses : elle descend de $0$ à $-1$.

**5.** Pour $x \in [-1 ; 0]$, $e^{-x} \in [1 ; e]$, et $g$ est croissante et positive : $0 < g(e^{-x}) \leq g(e)$. Comme $0 < e^x \leq 1$ : $0 < f'(x) \leq g(e)$.

**6.** $h(x) = f(x) + x$ est continue et strictement croissante sur $\mathbb{R}$, avec $h(-1) = f(-1) - 1 < 0$ (car $f < 1$) et $h(0) = \ln 2 > 0$. Elle tend vers $-\infty$ et $+\infty$ aux bornes : l’équation $h(x) = 0$ a une unique solution $\alpha$, et $-1 < \alpha < 0$.

**7. a)** Par récurrence : $u_0 = 0 \in [-1 ; 0]$. Si $u_n \in [-1 ; 0]$, alors $0 < f(u_n) < 1$, donc $u_{n+1} = -f(u_n) \in [-1 ; 0]$.

**7. b)** $\alpha = -f(\alpha)$, donc $|u_{n+1} - \alpha| = |f(u_n) - f(\alpha)|$. Comme $u_n$ et $\alpha$ sont dans $[-1 ; 0]$, où $0 < f' \leq g(e)$, l’inégalité des accroissements finis donne $|u_{n+1} - \alpha| \leq g(e)\,|u_n - \alpha|$.

**7. c)** Par récurrence, $|u_n - \alpha| \leq (g(e))^n|u_0 - \alpha| = (g(e))^n|\alpha| \leq (g(e))^n$, car $|\alpha| < 1$.

**7. d)** $0 < g(e) < 0{,}6 < 1$, donc $(g(e))^n \to 0$ et $\lim_{n \to +\infty} u_n = \alpha$.

## Exercice 5 : analyse (2,5 points)

**1.** $F(1) = \int_1^1 \frac{\ln t}{1 + t^2}\,dt = 0$.

**2. a)** Soit $G$ une primitive sur $]0 ; +\infty[$ de la fonction continue $t \mapsto \frac{\ln t}{1 + t^2}$. Alors $F(x) = G(x) - G\left(\frac{1}{x}\right)$ est dérivable et :

$$F'(x) = \frac{\ln x}{1 + x^2} + \frac{1}{x^2} \cdot \frac{\ln\frac{1}{x}}{1 + \frac{1}{x^2}} = \frac{\ln x}{1 + x^2} - \frac{\ln x}{x^2 + 1} = 0$$

**2. b)** $F' = 0$ sur l’intervalle $]0 ; +\infty[$ : $F$ est constante, égale à $F(1) = 0$.

**3.** On intègre par parties avec $u(t) = \ln t$ et $v'(t) = \frac{1}{1 + t^2}$, donc $u'(t) = \frac{1}{t}$ et $v(t) = \arctan t$ :

$$F(x) = \Big[\ln t \cdot \arctan t\Big]_{\frac{1}{x}}^{x} - \int_{\frac{1}{x}}^{x} \frac{\arctan t}{t}\,dt = \left(\arctan x + \arctan\frac{1}{x}\right)\ln x - \int_{\frac{1}{x}}^{x} \frac{\arctan t}{t}\,dt$$

**4.** $\psi(x) = \arctan x + \arctan\frac{1}{x}$ a pour dérivée $\frac{1}{1 + x^2} - \frac{1}{x^2} \cdot \frac{1}{1 + \frac{1}{x^2}} = 0$ sur $]0 ; +\infty[$ : elle est constante, égale à $\psi(1) = \frac{\pi}{2}$.

**5.** Avec 2. b), 3 et 4 : $0 = \frac{\pi}{2}\ln x - \int_{\frac{1}{x}}^{x} \frac{\arctan t}{t}\,dt$, donc $\ln x = \frac{2}{\pi}\int_{\frac{1}{x}}^{x} \frac{\arctan t}{t}\,dt$.
