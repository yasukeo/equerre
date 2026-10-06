---
summary: Probabilités (deux urnes et probabilités conditionnelles), structures algébriques (un corps de matrices), nombres complexes (équation du second degré, bissectrice), analyse (la famille ln x − n/x, valeur moyenne) et une fonction définie par l’intégrale de 1/ln t.
---

## Exercice 1 : probabilités (3 points)

**1.** La boîte $U$ contient $4$ boules rouges sur $8$ : $p(R_U) = \frac{4}{8} = \frac{1}{2}$ et $p(B_U) = \frac{1}{2}$.

**2. a)** Si la boule tirée de $U$ est rouge, elle est remise dans $V$, qui contient alors $3$ rouges et $4$ bleues : $p(B_V \mid R_U) = \frac{4}{7}$.

**2. b)** Si elle est bleue, $V$ est inchangée, avec $2$ rouges et $4$ bleues : $p(B_V \mid B_U) = \frac{4}{6} = \frac{2}{3}$.

**3.** $R_U$ et $B_U$ forment un système complet d’événements. D’après la formule des probabilités totales :

$$p(B_V) = p(R_U)\,p(B_V \mid R_U) + p(B_U)\,p(B_V \mid B_U) = \frac{1}{2} \cdot \frac{4}{7} + \frac{1}{2} \cdot \frac{2}{3} = \frac{6}{21} + \frac{7}{21} = \frac{13}{21}$$

**4.** $R_V$ est l’événement contraire de $B_V$ : $p(R_V) = 1 - \frac{13}{21} = \frac{8}{21}$.

## Exercice 2 : structures algébriques (3,5 points)

**1.** $M(0)$ est la matrice dont seul le coefficient central vaut $1$. En additionnant coefficient par coefficient, $M(z) + M(z') - M(0)$ a pour coefficients $(x + x') + 2(y + y')$, $5(y + y')$, $-(y + y')$, $(x + x') - 2(y + y')$ et, au centre, $1 + 1 - 1 = 1$ : c’est $M(z + z')$. Donc $M(z) * M(z') = M(z + z')$.

L’application $\psi : z \mapsto M(z)$ est une bijection de $\mathbb{C}$ sur $E$ : si $M(z) = M(z')$, les coefficients $5y$ et $x + 2y$ donnent $y = y'$ puis $x = x'$. C’est un morphisme de $(\mathbb{C}, +)$ dans $(E, *)$. L’image d’un groupe commutatif par un morphisme est un groupe commutatif : $(E, *)$ est un groupe commutatif, de neutre $M(0)$, et le symétrique de $M(z)$ est $M(-z)$.

**2. a)** Pour $z = x + iy$ et $z' = x' + iy'$, posons $X = xx' - yy'$ et $Y = xy' + yx'$, de sorte que $zz' = X + iY$. Le produit $M(z) \times M(z')$ garde une ligne et une colonne centrales avec $1$ au centre, et :

- coefficient $(1, 1)$ : $(x + 2y)(x' + 2y') - 5yy' = X + 2Y$ ;
- coefficient $(1, 3)$ : $5y'(x + 2y) + 5y(x' - 2y') = 5Y$ ;
- coefficient $(3, 1)$ : $-y(x' + 2y') - y'(x - 2y) = -Y$ ;
- coefficient $(3, 3)$ : $-5yy' + (x - 2y)(x' - 2y') = X - 2Y$.

C’est $M(zz')$ : $\varphi(zz') = \varphi(z) \times \varphi(z')$, et $\varphi$ est un morphisme de $(\mathbb{C}^*, \times)$ dans $(E, \times)$. Le calcul vaut d’ailleurs pour tous $z, z' \in \mathbb{C}$.

**2. b)** $\psi$ étant bijective, $M(z) = M(0)$ si et seulement si $z = 0$ : $\varphi(\mathbb{C}^*) = E - \{M(0)\}$. Image du groupe commutatif $(\mathbb{C}^*, \times)$ par un morphisme, $(E - \{M(0)\}, \times)$ est un groupe commutatif, de neutre $M(1) = I$.

**3.** $(E, *)$ est un groupe commutatif de neutre $M(0)$, et $(E - \{M(0)\}, \times)$ est un groupe commutatif. La multiplication est distributive par rapport à $*$ : pour tous $z, z', z''$,

$$M(z) \times \big(M(z') * M(z'')\big) = M\big(z(z' + z'')\big) = M(zz') * M(zz'') = \big(M(z) \times M(z')\big) * \big(M(z) \times M(z'')\big)$$

et de même à droite, par commutativité. $(E, *, \times)$ est donc un corps commutatif.

## Exercice 3 : nombres complexes (3,5 points)

**1. a)** Avec $(1 + i)^2 = 2i$ et $(1 + \sqrt{3})^2 = 4 + 2\sqrt{3}$ :

$$\Delta = (4 + 2\sqrt{3}) \cdot 2i - 16i = (4\sqrt{3} - 8)i$$

Et $\left((\sqrt{3} - 1)(1 - i)\right)^2 = (4 - 2\sqrt{3})(-2i) = (4\sqrt{3} - 8)i$ : c’est bien $\Delta$.

**1. b)** Avec la racine carrée $(\sqrt{3} - 1)(1 - i)$ de $\Delta$ :

$$z_1 = \frac{(1 + \sqrt{3})(1 + i) + (\sqrt{3} - 1)(1 - i)}{2} = \frac{2\sqrt{3} + 2i}{2} = \sqrt{3} + i$$

$$z_2 = \frac{(1 + \sqrt{3})(1 + i) - (\sqrt{3} - 1)(1 - i)}{2} = \frac{2 + 2\sqrt{3}\,i}{2} = 1 + i\sqrt{3}$$

Sous forme trigonométrique : $z_1 = 2\left(\cos\frac{\pi}{6} + i\sin\frac{\pi}{6}\right)$ et $z_2 = 2\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right)$. On vérifie que $z_1 z_2 = 4i$.

**2. a)** Pour $z = x + iy$ : $a\bar{z} = (1 + i\sqrt{3})(x - iy) = (x + \sqrt{3}y) + i(\sqrt{3}x - y)$. L’égalité $z = \frac{1}{2}a\bar{z}$ équivaut à $2x = x + \sqrt{3}y$ et $2y = \sqrt{3}x - y$, c’est-à-dire, dans les deux cas, $x = \sqrt{3}y$. $(D)$ est la droite d’équation $x - \sqrt{3}y = 0$ ; elle passe par $B(\sqrt{3} ; 1)$, puisque $\sqrt{3} - \sqrt{3} \times 1 = 0$.

**2. b)** On remarque que $a\bar{b} = (1 + i\sqrt{3})(\sqrt{3} - i) = 2\sqrt{3} + 2i = 2b$ et que $b^2 = 2 + 2\sqrt{3}\,i = 2a$. Alors :

$$z' - b = a\bar{z} - 2b = a\bar{z} - a\bar{b} = a\,\overline{(z - b)}$$

donc $(z' - b)(z - b) = a\,|z - b|^2$, et :

$$\frac{b^2}{(z' - b)(z - b)} = \frac{2a}{a\,|z - b|^2} = \frac{2}{|z - b|^2}$$

**2. c)** Ce nombre est un réel strictement positif. Avec $z \neq b$ et $z' - b = a\,\overline{(z - b)} \neq 0$, les arguments donnent :

$$(\vec{u}, \overrightarrow{BM}) + (\vec{u}, \overrightarrow{BM'}) \equiv 2(\vec{u}, \overrightarrow{OB}) \; [2\pi]$$

soit $(\overrightarrow{BM}, \overrightarrow{OB}) \equiv (\overrightarrow{OB}, \overrightarrow{BM'}) \; [2\pi]$. La droite passant par $B$ et dirigée par $\overrightarrow{OB}$, c’est-à-dire $(D)$, fait des angles égaux avec $\overrightarrow{BM}$ et $\overrightarrow{BM'}$ : c’est une bissectrice de l’angle $(\overrightarrow{BM}, \overrightarrow{BM'})$.

## Exercice 4 : analyse (6,5 points)

Ici $f_n(x) = \ln x - \frac{n}{x}$ sur $]0 ; +\infty[$.

**1. a)** En $0^+$ : $\ln x \to -\infty$ et $-\frac{n}{x} \to -\infty$, donc $f_n(x) \to -\infty$ : l’axe des ordonnées est asymptote verticale. En $+\infty$ : $f_n(x) \to +\infty$ et $\frac{f_n(x)}{x} = \frac{\ln x}{x} - \frac{n}{x^2} \to 0$ : branche parabolique de direction l’axe des abscisses.

**1. b)** $f_n'(x) = \frac{1}{x} + \frac{n}{x^2} > 0$ : $f_n$ est strictement croissante sur $]0 ; +\infty[$, de $-\infty$ à $+\infty$.

**1. c)** Éléments pour tracer $(C_2)$ : $f_2(1) = -2$, $f_2(2) = \ln 2 - 1 \approx -0{,}31$, $f_2(e) = 1 - \frac{2}{e} \approx 0{,}26$, donc la courbe coupe l’axe des abscisses entre $2$ et $e$. Comme $f_2''(x) = -\frac{1}{x^2} - \frac{4}{x^3} < 0$, la courbe est concave ; elle a l’asymptote verticale $x = 0$ et une branche parabolique horizontale en $+\infty$.

**2.** $f_n$ est continue et strictement croissante sur $]0 ; +\infty[$, avec les limites $-\infty$ et $+\infty$ : c’est une bijection de $]0 ; +\infty[$ sur $\mathbb{R}$.

**3. a)** $0$ a donc un unique antécédent $\alpha_n$ par $f_n$.

**3. b)** $f_{n+1}(x) - f_n(x) = -\frac{1}{x} < 0$ : $f_{n+1}(x) < f_n(x)$ pour tout $x > 0$.

**3. c)** $f_{n+1}(\alpha_n) < f_n(\alpha_n) = 0 = f_{n+1}(\alpha_{n+1})$, et $f_{n+1}$ est strictement croissante : $\alpha_n < \alpha_{n+1}$. La suite $(\alpha_n)$ est strictement croissante.

**4. a)** Soit $h(x) = x - \ln x$ : $h'(x) = 1 - \frac{1}{x}$, donc $h$ décroît sur $]0 ; 1]$ et croît sur $[1 ; +\infty[$ ; son minimum est $h(1) = 1 > 0$. Ainsi $\ln x < x$ pour tout $x > 0$.

**4. b)** $f_n(\alpha_n) = 0$ s’écrit $\alpha_n \ln \alpha_n = n \geq 1$, donc $\ln \alpha_n > 0$. Avec 4. a) : $n = \alpha_n \ln \alpha_n < \alpha_n^2$, d’où $\alpha_n > \sqrt{n}$, et $\lim_{n \to +\infty} \alpha_n = +\infty$.

**5. a)** $f_n$ est continue sur $[\alpha_n ; \alpha_{n+1}]$. D’après le théorème de la moyenne, il existe $c_n \in [\alpha_n ; \alpha_{n+1}]$ tel que $\int_{\alpha_n}^{\alpha_{n+1}} f_n(x)\,dx = (\alpha_{n+1} - \alpha_n) f_n(c_n)$, c’est-à-dire $I_n = f_n(c_n)$.

**5. b)** $f_n$ est croissante, donc $f_n(\alpha_n) \leq f_n(c_n) \leq f_n(\alpha_{n+1})$. Or $f_n(\alpha_n) = 0$ et $f_n(\alpha_{n+1}) = f_{n+1}(\alpha_{n+1}) + \frac{1}{\alpha_{n+1}} = \frac{1}{\alpha_{n+1}}$. Donc $0 \leq I_n \leq \frac{1}{\alpha_{n+1}}$.

**5. c)** $\lim_{n \to +\infty} \alpha_{n+1} = +\infty$, donc par encadrement $\lim_{n \to +\infty} I_n = 0$.

## Exercice 5 : analyse (3,5 points)

Ici $g_n(x) = \int_n^x \frac{dt}{\ln t}$ sur $[n ; +\infty[$, avec $n \geq 2$.

**1. a)** Sur $[n ; +\infty[$, $\ln t \geq \ln 2 > 0$ : $t \mapsto \frac{1}{\ln t}$ est continue, et $g_n$ est sa primitive qui s’annule en $n$. Donc $g_n$ est dérivable et $g_n'(x) = \frac{1}{\ln x}$.

**1. b)** $g_n'(x) > 0$ : $g_n$ est strictement croissante sur $[n ; +\infty[$.

**2. a)** Pour $t \geq n$, avec $u = t - 1 \geq 0$ : $\ln t = \ln(1 + u) \leq u = t - 1$, donc $\frac{1}{\ln t} \geq \frac{1}{t - 1}$. En intégrant de $n$ à $x \geq n$ :

$$g_n(x) \geq \int_n^x \frac{dt}{t - 1} = \ln(x - 1) - \ln(n - 1) = \ln\left(\frac{x - 1}{n - 1}\right)$$

**2. b)** $\ln\left(\frac{x - 1}{n - 1}\right) \to +\infty$ quand $x \to +\infty$ : par comparaison, $\lim_{x \to +\infty} g_n(x) = +\infty$.

**3. a)** $g_n$ est continue et strictement croissante sur $[n ; +\infty[$, avec $g_n(n) = 0$ et $\lim_{x \to +\infty} g_n(x) = +\infty$ : c’est une bijection de $[n ; +\infty[$ sur $[0 ; +\infty[$.

**3. b)** $1 \in [0 ; +\infty[$ a un unique antécédent $u_n \geq n$ : $\int_n^{u_n} \frac{dt}{\ln t} = 1$.

**4. a)** D’après la relation de Chasles :

$$\int_n^{u_n} \frac{dt}{\ln t} = \int_n^{n+1} \frac{dt}{\ln t} + \int_{n+1}^{u_n} \frac{dt}{\ln t} \qquad \int_{n+1}^{u_{n+1}} \frac{dt}{\ln t} = \int_{n+1}^{u_n} \frac{dt}{\ln t} + \int_{u_n}^{u_{n+1}} \frac{dt}{\ln t}$$

Les deux membres de gauche valent $1$. En les égalant : $\int_{u_n}^{u_{n+1}} \frac{dt}{\ln t} = \int_n^{n+1} \frac{dt}{\ln t}$.

**4. b)** $\int_n^{n+1} \frac{dt}{\ln t} > 0$, car on intègre une fonction strictement positive de $n$ à $n + 1$. Donc $\int_{u_n}^{u_{n+1}} \frac{dt}{\ln t} > 0$, ce qui impose $u_{n+1} > u_n$ (sinon cette intégrale serait négative ou nulle). La suite $(u_n)$ est strictement croissante.

**4. c)** $u_n \geq n$, donc $\lim_{n \to +\infty} u_n = +\infty$.
