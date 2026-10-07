---
summary: Structures algébriques (une loi sur ]1, 2[, une matrice nilpotente), probabilités (loi binomiale, probabilités conditionnelles), nombres complexes (rotations, hauteur d’un triangle), analyse (la fonction 1/√(1 + x² ln²x) et sa primitive) et une limite avec arctan.
---

## Exercice 1 : structures algébriques (3,5 points)

### Partie I

**1.** Pour $x, y \in ]1 ; 2[$, posons $P = (x - 1)(y - 1) > 0$ et $Q = (x - 2)(y - 2) > 0$ (produit de deux négatifs). Alors $x * y = \frac{2P + Q}{P + Q} = 1 + \frac{P}{P + Q}$, avec $0 < \frac{P}{P + Q} < 1$ : $x * y \in ]1 ; 2[$. La loi $*$ est interne dans $G$.

**2. a)** $f(x) = 1 + \frac{1}{x + 1}$. Pour $x > 0$, $\frac{1}{x + 1} \in ]0 ; 1[$, donc $f(x) \in G$. Pour $y \in G$, $f(x) = y \iff x = \frac{1}{y - 1} - 1 = \frac{2 - y}{y - 1}$, qui est strictement positif : $f$ est une bijection de $\mathbb{R}_+^*$ sur $G$. Avec $X = f(x)$ et $Y = f(y)$ : $X - 1 = \frac{1}{x + 1}$ et $X - 2 = \frac{-x}{x + 1}$, donc $P = \frac{1}{(x + 1)(y + 1)}$ et $Q = \frac{xy}{(x + 1)(y + 1)}$. D’où :

$$f(x) * f(y) = 1 + \frac{P}{P + Q} = 1 + \frac{1}{1 + xy} = f(xy)$$

$f$ est un isomorphisme de $(\mathbb{R}_+^*, \times)$ sur $(G, *)$.

**2. b)** L’image d’un groupe commutatif par un isomorphisme est un groupe commutatif : $(G, *)$ en est un, de neutre $f(1) = \frac{3}{2}$.

### Partie II

**1. a)** $A^2 = \begin{pmatrix} 0 & 0 & 3 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix}$ et $A^3 = A^2 \times A = O$, car la seule ligne non nulle de $A^2$ multiplie la troisième ligne de $A$, qui est nulle. Comme $A \neq O$, $A^2 \neq O$ et $A \times A^2 = O$, $A$ est un diviseur de zéro.

**1. b)** $(A^2 - A + I)(A + I) = A^3 + A^2 - A^2 - A + A + I = A^3 + I = I$, et de même dans l’autre ordre, puisque ces polynômes en $A$ commutent. $A + I$ est inversible et :

$$(A + I)^{-1} = A^2 - A + I = \begin{pmatrix} 1 & -3 & 1 \\ 0 & 1 & -1 \\ 0 & 0 & 1 \end{pmatrix}$$

**2.** $E$ est l’ensemble des combinaisons linéaires de $I$ et $A$ : c’est un sous-espace vectoriel de $\mathcal{M}_3(\mathbb{R})$, donc un espace vectoriel réel. La famille $(I, A)$ est libre : si $aI + bA = O$, les coefficients diagonaux donnent $a = 0$, puis $bA = O$ donne $b = 0$. $(I, A)$ est une base de $E$, qui est de dimension $2$.

## Exercice 2 : probabilités (3 points)

### Partie I

**1.** Les $4$ tirages sont indépendants, et la probabilité de tirer une boule noire est $\frac{4}{7}$ : $X$ suit la loi binomiale de paramètres $4$ et $\frac{4}{7}$, $p(X = k) = \binom{4}{k}\left(\frac{4}{7}\right)^k\left(\frac{3}{7}\right)^{4-k}$. Avec $7^4 = 2401$ :

- $p(X = 0) = \frac{81}{2401}$ et $p(X = 1) = \frac{432}{2401}$ ;
- $p(X = 2) = \frac{864}{2401}$ et $p(X = 3) = \frac{768}{2401}$ ;
- $p(X = 4) = \frac{256}{2401}$.

La somme vaut bien $1$.

**2.** $E(X) = 4 \times \frac{4}{7} = \frac{16}{7}$.

### Partie II

**1.** Si la boule de l’étape 1 est noire, l’urne contient $3$ rouges et $9$ noires : $p(E \mid N) = \frac{\binom{9}{3}}{\binom{12}{3}} = \frac{84}{220} = \frac{21}{55}$. Donc $p(E \cap N) = \frac{4}{7} \times \frac{21}{55} = \frac{12}{55}$.

**2.** Si elle est rouge, l’urne contient $8$ rouges et $4$ noires : $p(E \mid R) = \frac{\binom{4}{3}}{220} = \frac{1}{55}$, et $p(E \cap R) = \frac{3}{7} \times \frac{1}{55} = \frac{3}{385}$. D’après la formule des probabilités totales :

$$p(E) = \frac{12}{55} + \frac{3}{385} = \frac{84 + 3}{385} = \frac{87}{385}$$

**3.** $p(R \mid E) = \frac{p(E \cap R)}{p(E)} = \frac{3}{87} = \frac{1}{29}$.

## Exercice 3 : nombres complexes (3,5 points)

### Partie I

**1.** $\Delta = 4(a - 1)^2 - 8(a - 1)^2 = -4(a - 1)^2 = \left(2i(a - 1)\right)^2$. Les solutions sont $\frac{2(a - 1) \pm 2i(a - 1)}{4} = \frac{a - 1}{2}(1 \pm i)$ : ce sont $z_1$ et $z_2$.

**2. a)** $a - 1 = e^{i\frac{\theta}{2}}\left(e^{i\frac{\theta}{2}} - e^{-i\frac{\theta}{2}}\right) = 2i\sin\frac{\theta}{2}\,e^{i\frac{\theta}{2}} = 2\sin\frac{\theta}{2}\,e^{i\frac{\theta + \pi}{2}}$.

**2. b)** Avec $1 + i = \sqrt{2}\,e^{i\frac{\pi}{4}}$, $1 - i = \sqrt{2}\,e^{-i\frac{\pi}{4}}$ et $\sin\frac{\theta}{2} > 0$ :

$$z_1 = \sqrt{2}\sin\frac{\theta}{2}\left(\cos\left(\frac{\theta}{2} + \frac{3\pi}{4}\right) + i\sin\left(\frac{\theta}{2} + \frac{3\pi}{4}\right)\right)$$

$$z_2 = \sqrt{2}\sin\frac{\theta}{2}\left(\cos\left(\frac{\theta}{2} + \frac{\pi}{4}\right) + i\sin\left(\frac{\theta}{2} + \frac{\pi}{4}\right)\right)$$

### Partie II

**1.** $j = \frac{a + i}{2}$ et $k = \frac{a - i}{2}$.

**2.** $c' = j + i(c - j) = (1 - i)j - 1 = \frac{(a + 1) + i(1 - a)}{2} - 1 = \frac{a - 1}{2}(1 - i) = z_2$. De même $a' = k + i(a - k) = (1 - i)k + ia = \frac{(a - 1) - i(a + 1)}{2} + ia = \frac{a - 1}{2}(1 + i) = z_1$.

**3.** $\frac{a' - c'}{a - 1} = \frac{z_1 - z_2}{a - 1} = \frac{\frac{a - 1}{2} \cdot 2i}{a - 1} = i$. Ce nombre est imaginaire pur, donc $(AB') \perp (A'C')$ ($\overrightarrow{B'A}$ a pour affixe $a - 1 \neq 0$). La droite $(AB')$ passe par le sommet $B'$ et est perpendiculaire au côté opposé $(A'C')$ : c’est la hauteur issue de $B'$ du triangle $A'B'C'$.

## Exercice 4 : analyse (8,25 points)

**1. a)** $x^2\ln^2 x = (x\ln x)^2 \to 0$ quand $x \to 0^+$, donc $f(x) \to 1 = f(0)$ : $f$ est continue à droite en $0$. En $+\infty$, $x^2\ln^2 x \to +\infty$, donc $\lim_{x \to +\infty} f(x) = 0$.

**1. b)** Avec $u = x^2\ln^2 x$ : $f(x) - 1 = \frac{1 - \sqrt{1 + u}}{\sqrt{1 + u}} = \frac{-u}{\left(1 + \sqrt{1 + u}\right)\sqrt{1 + u}}$, donc :

$$\frac{f(x) - 1}{x} = \frac{-x\ln^2 x}{\left(1 + \sqrt{1 + u}\right)\sqrt{1 + u}} \to \frac{0}{2} = 0$$

$f$ est dérivable à droite en $0$ et $f'_d(0) = 0$ : demi-tangente horizontale.

**1. c)** $f(x) = (1 + x^2\ln^2 x)^{-\frac{1}{2}}$ et $(x^2\ln^2 x)' = 2x\ln^2 x + 2x\ln x = 2x\ln x(1 + \ln x)$, d’où :

$$f'(x) = -\frac{1}{2}(1 + x^2\ln^2 x)^{-\frac{3}{2}} \cdot 2x\ln x(1 + \ln x) = \frac{-x\ln x(1 + \ln x)}{(1 + x^2\ln^2 x)^{\frac{3}{2}}}$$

**1. d)** $\ln x(1 + \ln x)$ s’annule en $\frac{1}{e}$ et en $1$ ; il est positif sur $\left]0 ; \frac{1}{e}\right[$ et sur $]1 ; +\infty[$, négatif entre. Donc $f$ est décroissante sur $\left[0 ; \frac{1}{e}\right]$ (de $1$ à $f\left(\frac{1}{e}\right) = \frac{1}{\sqrt{1 + e^{-2}}}$), croissante sur $\left[\frac{1}{e} ; 1\right]$ (jusqu’à $f(1) = 1$), puis décroissante sur $[1 ; +\infty[$, vers $0$.

**2. a)** Sur $[e ; +\infty[$, une primitive de $\frac{1}{x\ln x}$ est $\ln(\ln x)$.

**2. b)** Pour $t \geq e$, $t\ln t \geq e > 1$, donc $1 \leq t^2\ln^2 t$. Ainsi $t^2\ln^2 t \leq 1 + t^2\ln^2 t \leq 2t^2\ln^2 t$, et en prenant les racines : $t\ln t \leq \sqrt{1 + t^2\ln^2 t} \leq \sqrt{2}\,t\ln t$.

**2. c)** D’après 2. b), $\frac{1}{\sqrt{2}\,t\ln t} \leq f(t) \leq \frac{1}{t\ln t}$ pour $t \geq e$. En intégrant de $e$ à $x$, avec $\ln(\ln e) = 0$ : $\frac{1}{\sqrt{2}}\ln(\ln x) \leq \int_e^x f(t)\,dt \leq \ln(\ln x)$.

**2. d)** $F(x) = F(e) + \int_e^x f(t)\,dt \geq F(e) + \frac{1}{\sqrt{2}}\ln(\ln x) \to +\infty$. Et $0 < \frac{F(x)}{x} \leq \frac{F(e) + \ln(\ln x)}{x} \to 0$ : $\lim_{x \to +\infty} \frac{F(x)}{x} = 0$.

**2. e)** $F'' = f'$, qui s’annule en changeant de signe en $\frac{1}{e}$ et en $1$ : $(C_F)$ a deux points d’inflexion, d’abscisses $\frac{1}{e}$ et $1$.

**2. f)** Éléments pour le tracé : $(C_F)$ part de $O$ avec la tangente $y = x$ (car $F'(0) = f(0) = 1$). Elle est croissante ($F' = f > 0$) : concave sur $\left[0 ; \frac{1}{e}\right]$, convexe sur $\left[\frac{1}{e} ; 1\right]$, concave sur $[1 ; +\infty[$. Ses points d’inflexion sont $\left(\frac{1}{e} ; 0{,}4\right)$ et $(1 ; 0{,}5)$, et elle admet en $+\infty$ une branche parabolique de direction l’axe des abscisses.

**3. a)** $\varphi(x) = x\left(1 - \frac{F(x)}{x}\right) \to +\infty$. $\varphi'(x) = 1 - f(x) \geq 0$, car $f(x) \leq 1$, avec égalité seulement en $0$ et en $1$ : $\varphi$ est strictement croissante sur $[0 ; +\infty[$, avec $\varphi(0) = 0$.

**3. b)** $\varphi$ est continue et strictement croissante, de $0$ à $+\infty$ : c’est une bijection de $[0 ; +\infty[$ sur lui-même, et pour tout $n \in \mathbb{N}$ l’équation $\varphi(x) = n$ a une unique solution $\alpha_n$.

**3. c)** $F \geq 0$, donc $\varphi(x) \leq x$ et $n = \varphi(\alpha_n) \leq \alpha_n$. Ainsi $\lim_{n \to +\infty} \alpha_n = +\infty$.

**4. a)** Pour $n \geq 1$, $\alpha_n \geq n$. Si $\alpha_n > n$, le théorème des accroissements finis donne $c \in ]n ; \alpha_n[$ avec $F(\alpha_n) - F(n) = f(c)(\alpha_n - n)$, et $f(c) \leq f(n)$, car $f$ est décroissante sur $[1 ; +\infty[$ (c’est aussi vrai si $\alpha_n = n$). Alors :

$$0 \leq \frac{F(\alpha_n)}{\alpha_n} \leq \frac{F(n)}{\alpha_n} + f(n)\left(1 - \frac{n}{\alpha_n}\right) \leq \frac{F(n)}{n} + f(n)$$

**4. b)** $\frac{F(n)}{n} \to 0$ et $f(n) \to 0$, donc $\frac{F(\alpha_n)}{\alpha_n} \to 0$. Or $\varphi(\alpha_n) = n$ s’écrit $\frac{n}{\alpha_n} = 1 - \frac{F(\alpha_n)}{\alpha_n}$, donc $\lim_{n \to +\infty} \frac{\alpha_n}{n} = 1$.

## Exercice 5 : analyse (1,75 point)

**1.** Pour $n \geq 1$, $\arctan n > 0$ et $v_n = n^2\left(\ln(\arctan n) - \ln(\arctan(n + 1))\right)$.

**2.** $\psi(x) = \ln(\arctan x)$ est dérivable sur $[n ; n + 1]$, avec $\psi'(x) = \frac{1}{(1 + x^2)\arctan x}$. D’après le théorème des accroissements finis, il existe $c \in ]n ; n + 1[$ tel que $\psi(n + 1) - \psi(n) = \psi'(c)$, donc $v_n = \frac{-n^2}{(1 + c^2)\arctan c}$.

**3.** $x \mapsto (1 + x^2)\arctan x$ est strictement croissante et positive sur $[1 ; +\infty[$ (produit de fonctions positives croissantes). Comme $n < c < n + 1$, on obtient l’encadrement demandé en passant aux inverses, puis en multipliant par $-n^2 < 0$.

**4.** $\frac{n^2}{1 + n^2} \to 1$, $\frac{n^2}{1 + (n + 1)^2} \to 1$ et $\arctan n \to \frac{\pi}{2}$ : les deux bornes tendent vers $-\frac{2}{\pi}$. Donc $v_n \to -\frac{2}{\pi}$ et $\lim_{n \to +\infty} u_n = e^{-\frac{2}{\pi}}$.
