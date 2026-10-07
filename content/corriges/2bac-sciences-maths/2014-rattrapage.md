---
summary: Probabilités (trois urnes), arithmétique (2·10ⁿ ± 1), un corps sur ]−1, 1[, nombres complexes (cos π/8, points cocycliques), analyse (−ln x / √x, une suite, une somme de Riemann) et une fonction définie par l’intégrale de e^(−t²).
---

## Exercice 1 : probabilités (2 points)

**1.** Le tirage se fait dans $U$ lorsque la boule tirée de $W$ est blanche : $p = \frac{2}{3}$.

**2.** Si la boule de $W$ est blanche, $U$ contient $3$ blanches et $2$ noires, et la probabilité de tirer deux blanches est $\frac{\binom{3}{2}}{\binom{5}{2}} = \frac{3}{10}$. Si elle est noire, $V$ contient $2$ blanches et $3$ noires, et cette probabilité est $\frac{\binom{2}{2}}{\binom{5}{2}} = \frac{1}{10}$. D’après la formule des probabilités totales :

$$p(\text{deux blanches}) = \frac{2}{3} \times \frac{3}{10} + \frac{1}{3} \times \frac{1}{10} = \frac{7}{30}$$

**3.** $X$ prend les valeurs $0$, $1$ et $2$, et $p(X = 2) = \frac{7}{30}$.

- $p(X = 0) = \frac{2}{3} \times \frac{\binom{2}{2}}{10} + \frac{1}{3} \times \frac{\binom{3}{2}}{10} = \frac{2}{30} + \frac{3}{30} = \frac{1}{6}$.
- $p(X = 1) = \frac{2}{3} \times \frac{3 \times 2}{10} + \frac{1}{3} \times \frac{2 \times 3}{10} = \frac{18}{30} = \frac{3}{5}$.

Vérification : $\frac{5}{30} + \frac{18}{30} + \frac{7}{30} = 1$.

## Exercice 2 : arithmétique (1 point)

**1.** $b_n = c_n + 2$, donc $b_n \wedge c_n = c_n \wedge (b_n - c_n) = c_n \wedge 2$. Comme $c_n$ est impair, $c_n \wedge 2 = 1$ : $b_n$ et $c_n$ sont premiers entre eux.

**2.** $c_n = 2 \cdot 10^n - 1$ et $2 = b_n - c_n$, donc $1 = 10^n(b_n - c_n) - c_n = 10^n\,b_n - (10^n + 1)\,c_n$. Le couple $(x_n, y_n) = \left(10^n, -(10^n + 1)\right)$ convient.

## Exercice 3 : structures algébriques (3,75 points)

### Partie I

**1.** Pour $a, b \in J$, $|ab| < 1$, donc $1 + ab > 0$. De plus $1 + ab - (a + b) = (1 - a)(1 - b) > 0$ et $1 + ab + (a + b) = (1 + a)(1 + b) > 0$, donc $-1 < \frac{a + b}{1 + ab} < 1$ : $*$ est une loi de composition interne dans $J$.

**2. a)** L’expression est symétrique en $a$ et $b$ : la loi est commutative. Et :

$$(a * b) * c = \frac{\frac{a + b}{1 + ab} + c}{1 + \frac{(a + b)c}{1 + ab}} = \frac{a + b + c + abc}{1 + ab + bc + ca}$$

Cette expression est symétrique en $a$, $b$, $c$ : elle vaut aussi $a * (b * c)$. La loi est associative.

**2. b)** $a * 0 = \frac{a}{1} = a$ : $0$ est l’élément neutre.

**2. c)** Pour $a \in J$, $-a \in J$ et $a * (-a) = \frac{0}{1 - a^2} = 0$. $(J, *)$ est un groupe commutatif.

### Partie II

**1.** $f'(x) = \frac{e^x(e^x + 1) - (e^x - 1)e^x}{(e^x + 1)^2} = \frac{2e^x}{(e^x + 1)^2} > 0$ : $f$ est continue et strictement croissante sur $\mathbb{R}$, avec $\lim_{x \to -\infty} f(x) = -1$ et $\lim_{x \to +\infty} f(x) = 1$. C’est une bijection de $\mathbb{R}$ sur $]-1 ; 1[ = J$.

**2.** $f(x) = 0$ si et seulement si $x = 0$, donc $f$ envoie $\mathbb{R}^*$ sur $J^*$. Pour $x, y \in \mathbb{R}^*$, comme $g \circ f$ est l’identité :

$$f(x) \perp f(y) = f\big(g(f(x)) \times g(f(y))\big) = f(xy)$$

$f$ est un morphisme de $(\mathbb{R}^*, \times)$ vers $(J^*, \perp)$.

**3.** $(J, *)$ est un groupe commutatif de neutre $0$. $(J^*, \perp)$ est l’image du groupe commutatif $(\mathbb{R}^*, \times)$ par la bijection $f$, qui est un morphisme : c’est un groupe commutatif, de neutre $f(1)$. Enfin $x \perp 0 = f(0) = 0$, et $\perp$ est distributive par rapport à $*$. $(J, *, \perp)$ est un corps commutatif.

## Exercice 4 : nombres complexes (3,25 points)

### Partie I

**1.** $z^2 = -i = e^{-i\frac{\pi}{2}}$ a pour solutions $\pm e^{-i\frac{\pi}{4}}$. Celle de partie réelle positive est $a = e^{-i\frac{\pi}{4}} = \frac{\sqrt{2}}{2}(1 - i)$.

**2. a)** $1 + a = e^{-i\frac{\pi}{8}}\left(e^{i\frac{\pi}{8}} + e^{-i\frac{\pi}{8}}\right) = 2\cos\frac{\pi}{8}\,e^{-i\frac{\pi}{8}}$, avec $\cos\frac{\pi}{8} > 0$ : le module est $2\cos\frac{\pi}{8}$ et un argument est $-\frac{\pi}{8}$.

**2. b)** $|1 + a|^2 = \left(1 + \frac{\sqrt{2}}{2}\right)^2 + \frac{1}{2} = 2 + \sqrt{2}$, donc $4\cos^2\frac{\pi}{8} = 2 + \sqrt{2}$, et comme $\cos\frac{\pi}{8} > 0$ :

$$\cos\frac{\pi}{8} = \frac{\sqrt{2 + \sqrt{2}}}{2}$$

**2. c)** $(1 + a)(1 - a) = 1 - a^2 = 1 + i$. Donc $1 - a = \frac{1 + i}{1 + a} = \frac{\sqrt{2}\,e^{i\frac{\pi}{4}}}{2\cos\frac{\pi}{8}\,e^{-i\frac{\pi}{8}}}$. Comme $|1 - a|^2 = \left(1 - \frac{\sqrt{2}}{2}\right)^2 + \frac{1}{2} = 2 - \sqrt{2}$ :

$$1 - a = \sqrt{2 - \sqrt{2}}\left(\cos\frac{3\pi}{8} + i\sin\frac{3\pi}{8}\right)$$

### Partie II

Ici $z' = -\frac{i}{z}$.

**1.** $\frac{z' - 0}{\bar{z} - 0} = \frac{-i}{z\bar{z}} = \frac{-i}{|z|^2}$ est imaginaire pur : $(ON) \perp (OM')$.

**2. a)** Comme $a^2 = -i$, on a $\frac{i}{a} = -a$. Donc $i\,\frac{z - a}{az} = \frac{i}{a} - \frac{i}{z} = -a + z'$.

**2. b)** De même, $i\,\frac{z + a}{az} = -a - z'$, soit $z' + a = -i\,\frac{z + a}{az}$. Si $z \neq -a$, alors $z' \neq -a$. Avec $b = -a$ :

$$\frac{z' - a}{z' - b} = \frac{i\,\frac{z - a}{az}}{-i\,\frac{z + a}{az}} = -\frac{z - a}{z - b}$$

**3.** $A$, $B$, $M$ ne sont pas alignés, donc $z \neq \pm a$, et $z' \neq a$ d’après 2. a). Le quotient $\frac{z' - a}{z' - b} \div \frac{z - a}{z - b} = -1$ est réel : $A$, $B$, $M$, $M'$ sont cocycliques ou alignés. Comme $A$, $B$, $M$ ne sont pas alignés, $M'$ appartient au cercle circonscrit au triangle $ABM$.

## Exercice 5 : analyse (7,5 points)

### Partie I

Ici $f(x) = \frac{-\ln x}{\sqrt{x}}$.

**1.** En $0^+$ : $-\ln x \to +\infty$ et $\frac{1}{\sqrt{x}} \to +\infty$, donc $\lim_{x \to 0^+} f(x) = +\infty$ : l’axe des ordonnées est asymptote verticale. En $+\infty$ : $\frac{\ln x}{\sqrt{x}} \to 0$, donc $\lim_{x \to +\infty} f(x) = 0$ : l’axe des abscisses est asymptote horizontale.

**2.** $f'(x) = \frac{-\frac{1}{x}\sqrt{x} + \frac{\ln x}{2\sqrt{x}}}{x} = \frac{\ln x - 2}{2x\sqrt{x}}$. $f$ est décroissante sur $]0 ; e^2]$ et croissante sur $[e^2 ; +\infty[$, avec le minimum $f(e^2) = -\frac{2}{e}$.

**3. a)** Sur $]0 ; 1[ \subset ]0 ; e^2]$, $f$ est strictement décroissante et $x \mapsto x^n$ strictement croissante : $g_n$ est strictement décroissante.

**3. b)** $g_n$ est continue sur $]0 ; 1[$, $\lim_{x \to 0^+} g_n(x) = +\infty$ et $\lim_{x \to 1^-} g_n(x) = f(1) - 1 = -1$. $g_n$ est une bijection de $]0 ; 1[$ sur $]-1 ; +\infty[$, qui contient $0$ : il existe un unique $\alpha_n \in ]0 ; 1[$ tel que $f(\alpha_n) = \alpha_n^n$.

**3. c)** $g_n(\alpha_{n+1}) = f(\alpha_{n+1}) - \alpha_{n+1}^n = \alpha_{n+1}^{n+1} - \alpha_{n+1}^n = \alpha_{n+1}^n(\alpha_{n+1} - 1) < 0$.

**3. d)** $g_n(\alpha_{n+1}) < 0 = g_n(\alpha_n)$ et $g_n$ est strictement décroissante, donc $\alpha_{n+1} > \alpha_n$. La suite est strictement croissante et majorée par $1$ : elle converge.

**4. a)** La suite est croissante et majorée par $1$, donc $0 < \alpha_1 \leq l \leq 1$.

**4. b)** $f(\alpha_n) = \alpha_n^n$ s’écrit $\frac{-\ln \alpha_n}{\sqrt{\alpha_n}} = \alpha_n^n$, avec deux membres strictement positifs. En prenant le logarithme : $\ln(-\ln \alpha_n) - \frac{1}{2}\ln \alpha_n = n\ln \alpha_n$. En divisant par $\ln \alpha_n \neq 0$ :

$$n = -\frac{1}{2} + \frac{\ln(-\ln \alpha_n)}{\ln \alpha_n} = h(\alpha_n)$$

**4. c)** Si $l < 1$, alors $l \in ]0 ; 1[$, $h$ est continue en $l$, et $h(\alpha_n) \to h(l)$, un réel : c’est impossible puisque $h(\alpha_n) = n \to +\infty$. Donc $l = 1$.

**4. d)** $\alpha_n^n = f(\alpha_n)$ et $f$ est continue en $1$, donc $\lim_{n \to +\infty} \alpha_n^n = f(1) = 0$.

### Partie II

**1. a)** $f \geq 0$ sur $]0 ; 1]$ et $f \leq 0$ sur $[1 ; +\infty[$. Pour $0 < x \leq 1$, $\int_x^1 f(t)\,dt \geq 0$ ; pour $x \geq 1$, $\int_x^1 f(t)\,dt = \int_1^x \left(-f(t)\right)dt \geq 0$. L’intégrale est donc positive pour tout $x > 0$ (nulle en $1$).

**1. b)** On intègre par parties avec $u(t) = -\ln t$ et $v'(t) = \frac{1}{\sqrt{t}}$, donc $u'(t) = -\frac{1}{t}$ et $v(t) = 2\sqrt{t}$ :

$$\int_x^1 f(t)\,dt = \Big[-2\sqrt{t}\,\ln t\Big]_x^1 + \int_x^1 \frac{2}{\sqrt{t}}\,dt = 2\sqrt{x}\ln x + \Big[4\sqrt{t}\Big]_x^1 = 4 - 4\sqrt{x} + 2\sqrt{x}\ln x$$

**1. c)** Sur $[1 ; e^2]$, $f \leq 0$, donc l’aire vaut $\int_{e^2}^1 f(t)\,dt = 4 - 4e + 2e \times 2 = 4$, soit $4 \text{ cm}^2$.

**2. a)** Pour $1 \leq k \leq n - 1$, $\left[\frac{k}{n} ; \frac{k+1}{n}\right] \subset ]0 ; 1]$, où $f$ est décroissante : $f\left(\frac{k+1}{n}\right) \leq f(t) \leq f\left(\frac{k}{n}\right)$. En intégrant sur cet intervalle de longueur $\frac{1}{n}$, on obtient l’encadrement.

**2. b)** On somme de $k = 1$ à $n - 1$. À droite : $\int_{\frac{1}{n}}^1 f(t)\,dt \leq \frac{1}{n}\sum_{k=1}^{n-1} f\left(\frac{k}{n}\right) = u_n$, car $f(1) = 0$. À gauche : $\frac{1}{n}\sum_{k=2}^{n} f\left(\frac{k}{n}\right) = u_n - \frac{1}{n} f\left(\frac{1}{n}\right) \leq \int_{\frac{1}{n}}^1 f(t)\,dt$. D’où l’encadrement (qui se réduit à $0 \leq 0 \leq 0$ pour $n = 1$).

**2. c)** D’après 1. b), $\int_{\frac{1}{n}}^1 f(t)\,dt = 4 - \frac{4}{\sqrt{n}} - \frac{2\ln n}{\sqrt{n}} \to 4$, et $\frac{1}{n} f\left(\frac{1}{n}\right) = \frac{\ln n}{\sqrt{n}} \to 0$. Par encadrement, $\lim_{n \to +\infty} u_n = 4$.

## Exercice 6 : analyse (2,5 points)

**1. a)** $g(x) = \int_{\sqrt{x}}^1 e^{-t^2}\,dt = -\int_1^{\sqrt{x}} e^{-t^2}\,dt = -k(\sqrt{x})$.

**1. b)** $k$ est la primitive de la fonction continue $t \mapsto e^{-t^2}$ qui s’annule en $1$ : elle est dérivable sur $\mathbb{R}$. $x \mapsto \sqrt{x}$ est continue sur $[0 ; +\infty[$ et dérivable sur $]0 ; +\infty[$. Par composition, $g$ est continue sur $[0 ; +\infty[$ et dérivable sur $]0 ; +\infty[$.

**1. c)** $g'(x) = -k'(\sqrt{x}) \cdot \frac{1}{2\sqrt{x}} = -\frac{e^{-x}}{2\sqrt{x}} < 0$ : $g$ est strictement décroissante sur $]0 ; +\infty[$, donc sur $[0 ; +\infty[$ par continuité en $0$.

**2. a)** Pour $x > 0$, $g$ est continue sur $[0 ; x]$ et dérivable sur $]0 ; x[$. D’après le théorème des accroissements finis, il existe $c \in ]0 ; x[$ tel que $\frac{g(x) - g(0)}{x} = g'(c) = -\frac{e^{-c}}{2\sqrt{c}}$. Comme $c < x$, $e^{-c} > e^{-x}$ et $\frac{1}{\sqrt{c}} > \frac{1}{\sqrt{x}}$, donc :

$$\frac{g(x) - g(0)}{x} < -\frac{e^{-x}}{2\sqrt{x}}$$

**2. b)** $\lim_{x \to 0^+} -\frac{e^{-x}}{2\sqrt{x}} = -\infty$, donc $\lim_{x \to 0^+} \frac{g(x) - g(0)}{x} = -\infty$ : $g$ n’est pas dérivable à droite en $0$. Sa courbe admet au point d’abscisse $0$ une demi-tangente verticale, dirigée vers le bas.
