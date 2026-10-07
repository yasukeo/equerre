---
summary: Arithmétique (les nombres 33…31 et le nombre premier 31), structures algébriques (un corps pour une loi produit modifiée), nombres complexes (médiatrice, rotation, translation), analyse (la fonction −x ln x / (1 + x²), sa primitive, une suite) et une somme de Riemann.
---

## Exercice 1 : arithmétique (3 points)

**1.** $a_1 = 31$ est premier. $a_2 = 331$ : $\sqrt{331} < 19$, et $331$ n’est divisible ni par $2$, $3$, $5$, $7$ ($7 \times 47 = 329$), $11$ ($11 \times 30 = 330$), $13$ ($13 \times 25 = 325$) ni $17$ ($17 \times 19 = 323$). $a_2$ est premier.

**2.** $a_n = 3(10^n + \cdots + 10) + 1 = 3 \times \frac{10(10^n - 1)}{9} + 1 = \frac{10^{n+1} - 10}{3} + 1$. Donc $3a_n = 10^{n+1} - 10 + 3$, soit $3a_n + 7 = 10^{n+1}$.

**3.** $31$ est premier et ne divise pas $10$ : d’après le petit théorème de Fermat, $10^{30} \equiv 1 \; [31]$. Donc $10^{30k + 2} = (10^{30})^k \times 100 \equiv 100 = 3 \times 31 + 7 \equiv 7 \; [31]$.

**4.** D’après 2 et 3 : $3a_{30k+1} = 10^{30k+2} - 7 \equiv 0 \; [31]$. Comme $31$ est premier avec $3$, le théorème de Gauss donne : $31$ divise $a_{30k+1}$.

**5.** Si $n \equiv 1 \; [30]$, alors $n = 30k + 1$ avec $k \in \mathbb{N}$, et $31$ divise $a_n$ (question 4). Si $(x, y)$ était solution, $31$ diviserait $a_n x + 31y = 1$ : c’est impossible. L’équation n’a pas de solution dans $\mathbb{Z}^2$.

## Exercice 2 : structures algébriques (3,5 points)

**1.** $E$ contient $O = M(0, 0)$, et $M(a, b) - M(c, d) = M(a - c, b - d) \in E$ : $E$ est un sous-groupe de $(\mathcal{M}_2(\mathbb{R}), +)$.

**2.** $J = M(1, 0) \in E$ et $J^2 = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}$. Si $J^2 = M(a, b)$, le coefficient en bas à gauche donne $b = 0$, celui en haut à gauche $a = 1$, et alors $a - b = 1 \neq 2$. Donc $J^2 \notin E$ : $E$ n’est pas stable pour la multiplication.

**3. a)** On calcule d’abord $M(a, b) \times N = \begin{pmatrix} a & -b \\ b & a \end{pmatrix}$, puis :

$$M(a, b) * M(c, d) = \begin{pmatrix} a & -b \\ b & a \end{pmatrix}\begin{pmatrix} c & c - d \\ d & c + d \end{pmatrix} = \begin{pmatrix} ac - bd & (ac - bd) - (ad + bc) \\ ad + bc & (ac - bd) + (ad + bc) \end{pmatrix}$$

C’est $M(ac - bd, ad + bc)$. Comme $(a + ib)(c + id) = (ac - bd) + i(ad + bc)$, on a $\varphi(zz') = \varphi(z) * \varphi(z')$ : $\varphi$ est un morphisme de $(\mathbb{C}^*, \times)$ vers $(\mathcal{M}_2(\mathbb{R}), *)$.

**3. b)** $M(a, b) = O$ si et seulement si $a = b = 0$. Donc $\varphi(\mathbb{C}^*) = E^*$.

**3. c)** $(E^*, *)$ est l’image du groupe commutatif $(\mathbb{C}^*, \times)$ par un morphisme : c’est un groupe commutatif, de neutre $\varphi(1) = M(1, 0) = J$.

**4.** $A * (B + C) = A \times N \times (B + C) = A \times N \times B + A \times N \times C = A * B + A * C$, par distributivité dans l’anneau $\mathcal{M}_2(\mathbb{R})$.

**5.** $(E, +)$ est un groupe commutatif. La loi $*$ est stable sur $E$ (le produit par $O$ donne $O$, les autres sont dans $E^*$), associative ($A * (B * C) = ANBNC = (A * B) * C$), commutative sur $E$ (question 3), et distributive par rapport à $+$ (question 4, et commutativité). Enfin $(E^*, *)$ est un groupe commutatif. $(E, +, *)$ est un corps commutatif.

## Exercice 3 : nombres complexes (3,5 points)

**1. a)** $\Delta = 2e^{2i\theta} - 4e^{2i\theta} = -2e^{2i\theta} = \left(\sqrt{2}\,ie^{i\theta}\right)^2$.

**1. b)** Les racines sont $\frac{\sqrt{2}\,e^{i\theta}(1 \pm i)}{2} = e^{\pm i\frac{\pi}{4}}e^{i\theta}$ :

$$z_1 = \cos\left(\theta + \frac{\pi}{4}\right) + i\sin\left(\theta + \frac{\pi}{4}\right) \qquad z_2 = \cos\left(\theta - \frac{\pi}{4}\right) + i\sin\left(\theta - \frac{\pi}{4}\right)$$

**2. a)** $t_1 - t_2 = e^{i\theta}\left(e^{i\frac{\pi}{4}} - e^{-i\frac{\pi}{4}}\right) = 2i\sin\frac{\pi}{4}\,e^{i\theta} = i\sqrt{2}\,e^{i\theta}$. Donc $\frac{t_1 - t_2}{a - 0} = i$ est imaginaire pur : $(OA) \perp (T_1T_2)$.

**2. b)** $k = \frac{t_1 + t_2}{2} = e^{i\theta} \cos\frac{\pi}{4} = \frac{\sqrt{2}}{2}\,e^{i\theta} = \frac{a}{2}$ : $K$ est le milieu de $[OA]$, donc $O$, $K$ et $A$ sont alignés.

**2. c)** La droite $(OA)$ passe par le milieu $K$ de $[T_1T_2]$ et lui est perpendiculaire : c’est la médiatrice de $[T_1T_2]$.

**3. a)** $r$ s’écrit $z' = i(z - t_1) + t_1$.

**3. b)** $b = i(1 - t_1) + t_1 = i + (1 - i)t_1$, et $(1 - i)t_1 = \sqrt{2}\,e^{-i\frac{\pi}{4}}\,e^{i\left(\theta + \frac{\pi}{4}\right)} = \sqrt{2}\,e^{i\theta}$. Donc $b = \sqrt{2}\,e^{i\theta} + i$.

**3. c)** $b - a = i$ et $-1 - 1 = -2$ : $\frac{b - a}{-1 - 1} = -\frac{i}{2}$ est imaginaire pur, donc $(AB) \perp (IJ)$.

**4.** $c = a - i = \sqrt{2}\,e^{i\theta} - i$.

**5.** $\frac{b + c}{2} = \frac{2\sqrt{2}\,e^{i\theta}}{2} = a$ : $A$ est le milieu de $[BC]$.

## Exercice 4 : analyse (8 points)

### Partie I

Ici $f(x) = \frac{-x\ln x}{1 + x^2}$ pour $x > 0$, et $f(0) = 0$.

**1. a)** $f$ est continue sur $]0 ; +\infty[$ (quotient de fonctions continues). Comme $\lim_{x \to 0^+} x\ln x = 0$, $\lim_{x \to 0^+} f(x) = 0 = f(0)$ : $f$ est continue sur $[0 ; +\infty[$.

**1. b)** $f(x)$ a le signe de $-\ln x$ : $f > 0$ sur $]0 ; 1[$, $f < 0$ sur $]1 ; +\infty[$, et $f(0) = f(1) = 0$.

**2. a)** $f\left(\frac{1}{x}\right) = \frac{-\frac{1}{x}\ln\frac{1}{x}}{1 + \frac{1}{x^2}} = \frac{\frac{\ln x}{x}}{\frac{x^2 + 1}{x^2}} = \frac{x\ln x}{x^2 + 1} = -f(x)$.

**2. b)** Sur $]0 ; +\infty[$, $f$ est un quotient de fonctions dérivables dont le dénominateur ne s’annule pas : elle est dérivable.

**2. c)** $f$ est continue sur $[0 ; 1]$, dérivable sur $]0 ; 1[$, et $f(0) = f(1) = 0$. D’après le théorème de Rolle, il existe $\alpha \in ]0 ; 1[$ tel que $f'(\alpha) = 0$.

**2. d)** En dérivant $f\left(\frac{1}{x}\right) = -f(x)$ : $-\frac{1}{x^2} f'\left(\frac{1}{x}\right) = -f'(x)$, soit $f'\left(\frac{1}{x}\right) = x^2 f'(x)$. En $x = \alpha$ : $f'\left(\frac{1}{\alpha}\right) = \alpha^2 f'(\alpha) = 0$.

### Partie II

**1. a)** Pour $t \geq 1$ : $\frac{t^2}{1 + t^2} \leq 1$, et $\frac{t^2}{1 + t^2} \geq \frac{1}{2} \iff t^2 \geq 1$.

**1. b)** Pour $x \geq 1$ : $F(x) = F(1) + \int_1^x f(t)\,dt = F(1) - \int_1^x \frac{t^2}{1 + t^2} \cdot \frac{\ln t}{t}\,dt$. Pour $t \geq 1$, $\frac{\ln t}{t} \geq 0$, donc d’après 1. a) :

$$\frac{1}{2} \cdot \frac{\ln t}{t} \leq \frac{t^2}{1 + t^2} \cdot \frac{\ln t}{t} \leq \frac{\ln t}{t}$$

Avec $\int_1^x \frac{\ln t}{t}\,dt = \frac{(\ln x)^2}{2}$, on obtient $F(1) - \frac{1}{2}(\ln x)^2 \leq F(x) \leq F(1) - \frac{1}{4}(\ln x)^2$.

**1. c)** Le majorant tend vers $-\infty$ : $\lim_{x \to +\infty} F(x) = -\infty$. En divisant l’encadrement par $x$, les deux bornes tendent vers $0$ car $\frac{(\ln x)^2}{x} \to 0$ : $\lim_{x \to +\infty} \frac{F(x)}{x} = 0$. La courbe $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des abscisses.

**2. a)** $f$ est continue sur $[0 ; +\infty[$, et $F$ est sa primitive qui s’annule en $0$ : $F$ est dérivable sur $[0 ; +\infty[$ et $F'(x) = f(x)$.

**2. b)** D’après le signe de $f$ : $F$ est croissante sur $[0 ; 1]$ et décroissante sur $[1 ; +\infty[$.

### Partie III

**1. a)** Soit $\psi(t) = -t\ln t$ sur $]0 ; +\infty[$ : $\psi'(t) = -\ln t - 1$ s’annule en $\frac{1}{e}$, et $\psi$ y atteint son maximum $\psi\left(\frac{1}{e}\right) = \frac{1}{e}$. Donc $-t\ln t \leq \frac{1}{e}$.

**1. b)** Si $f(t) \leq 0$, l’inégalité $f(t) \leq \frac{1}{e}$ est claire. Sinon, $f(t) \leq -t\ln t \leq \frac{1}{e}$, car $1 + t^2 \geq 1$. Et $f(0) = 0 \leq \frac{1}{e}$.

**1. c)** Pour $x > 0$ : $F(x) = \int_0^x f(t)\,dt \leq \frac{x}{e} < x$.

**2. a)** Par récurrence : $u_0 \in ]0 ; 1[$. Si $u_n \in ]0 ; 1[$, alors $u_{n+1} = F(u_n) > F(0) = 0$ ($F$ est strictement croissante sur $[0 ; 1]$, car $f > 0$ sur $]0 ; 1[$), et $u_{n+1} = F(u_n) < u_n < 1$ d’après 1. c).

**2. b)** $u_{n+1} = F(u_n) < u_n$ : la suite est strictement décroissante, et minorée par $0$, donc convergente.

**2. c)** Sa limite $l$ est dans $[0 ; 1[$ et, $F$ étant continue, $F(l) = l$. Si $l > 0$, la question 1. c) donne $F(l) < l$ : c’est impossible. Donc $\lim_{n \to +\infty} u_n = 0$.

## Exercice 5 : analyse (2 points)

**1.** $g$ est continue sur $]0 ; +\infty[$. En posant $u = \frac{1}{x} \to +\infty$, $g(x) = u^2 e^{-u} \to 0 = g(0)$ : $g$ est continue sur $[0 ; +\infty[$.

**2. a)** $g$ est continue sur $[0 ; +\infty[$ ; si $G$ en est une primitive, $L(x) = G(1) - G(x)$ est dérivable, donc continue, sur $[0 ; +\infty[$.

**2. b)** La dérivée de $t \mapsto e^{-\frac{1}{t}}$ est $\frac{1}{t^2}e^{-\frac{1}{t}}$, donc pour $x > 0$ : $L(x) = \left[e^{-\frac{1}{t}}\right]_x^1 = e^{-1} - e^{-\frac{1}{x}}$.

**2. c)** $\lim_{x \to 0^+} e^{-\frac{1}{x}} = 0$, donc $\lim_{x \to 0^+} L(x) = \frac{1}{e}$, et par continuité $L(0) = \frac{1}{e}$.

**3.** $s_n$ est une somme de Riemann de la fonction $g$, continue sur $[0 ; 1]$. Elle converge vers $\int_0^1 g(t)\,dt = L(0) = \frac{1}{e}$.
