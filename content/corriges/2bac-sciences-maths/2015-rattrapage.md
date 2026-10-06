---
summary: Structures algébriques (une loi non associative, un corps de matrices), arithmétique et probabilités (petit théorème de Fermat modulo 13, loi binomiale), nombres complexes (rotation, points cocycliques), une famille de fonctions logistiques et une fonction définie par l’intégrale de cos t / t.
---

## Exercice 1 : structures algébriques (4 points)

### Première partie

La loi est $x * y = x + y - e^{xy} + 1$.

**1. a)** $y * x = y + x - e^{yx} + 1 = x * y$ : la loi est commutative.

**1. b)** $x * 0 = x + 0 - e^0 + 1 = x$ pour tout réel $x$ : avec la commutativité, $0$ est l’élément neutre.

**2.** $x * 2 = x + 2 - e^{2x} + 1 = 3 + x - e^{2x}$. Donc $a * 2 = 0$ et $b * 2 = 0$, avec $a \neq b$. Si la loi était associative, on aurait, avec la commutativité et le neutre $0$ :

$$a = a * 0 = a * (2 * b) = (a * 2) * b = 0 * b = b$$

C’est faux : la loi $*$ n’est pas associative.

### Deuxième partie

**1.** $F$ contient la matrice nulle $M(0, 0)$, et pour tous réels $\alpha$, $\beta$ : $\alpha M(x, y) + \beta M(x', y') = M(\alpha x + \beta x', \alpha y + \beta y') \in F$. $F$ est un sous-espace vectoriel de $\mathcal{M}_2(\mathbb{R})$.

**2.** On calcule :

$$M(x, y) \times M(x', y') = \begin{pmatrix} xx' - yy' & -2(xy' + yx') \\ \frac{xy' + yx'}{2} & xx' - yy' \end{pmatrix} = M(xx' - yy', xy' + yx')$$

$F$ est stable pour la multiplication.

**3. a)** Pour $z = x + iy$ et $z' = x' + iy'$, $zz' = (xx' - yy') + i(xy' + yx')$, donc $\varphi(zz') = \varphi(z) \times \varphi(z')$ d’après la question 2.

**3. b)** $M(x, y)$ est nulle si et seulement si $x = y = 0$. L’image d’un complexe non nul est donc dans $F^*$, et tout élément $M(x, y)$ de $F^*$ est l’image de $x + iy \neq 0$ : $\varphi(\mathbb{C}^*) = F^*$.

**3. c)** $(F^*, \times)$ est l’image du groupe commutatif $(\mathbb{C}^*, \times)$ par un morphisme : c’est un groupe commutatif, de neutre $\varphi(1) = I$.

**4.** $(F, +)$ est un groupe commutatif (sous-espace vectoriel). La multiplication est associative et distributive par rapport à l’addition (anneau $\mathcal{M}_2(\mathbb{R})$), stable sur $F$, et $(F^*, \times)$ est un groupe commutatif. $(F, +, \times)$ est un corps commutatif.

## Exercice 2 : arithmétique et probabilités (3 points)

### Partie I

**1.** $13$ est premier et $a$ est premier avec $13$ : d’après le petit théorème de Fermat, $a^{12} \equiv 1 \; [13]$. Comme $2016 = 12 \times 168$, $a^{2016} = (a^{12})^{168} \equiv 1 \; [13]$.

**2. a)** Si $13$ divisait $x$, on aurait $x^{2015} \equiv 0 \not\equiv 2 \; [13]$. Donc $13$, qui est premier, ne divise pas $x$ : ils sont premiers entre eux.

**2. b)** D’après 1, $x^{2016} \equiv 1 \; [13]$ ; et $x^{2016} = x \cdot x^{2015} \equiv 2x \; [13]$. Donc $2x \equiv 1 \; [13]$. En multipliant par $7$ : $14x \equiv 7$, et comme $14 \equiv 1 \; [13]$, $x \equiv 7 \; [13]$.

**3.** Réciproquement, si $x \equiv 7 \; [13]$, alors $x$ est premier avec $13$, $x^{2016} \equiv 1$ et $2x \equiv 14 \equiv 1 \; [13]$. Donc $x^{2015} \equiv 2x \cdot x^{2015} = 2x^{2016} \equiv 2 \; [13]$. Les solutions de $(E)$ sont les entiers $7 + 13k$, $k \in \mathbb{Z}$.

### Partie II

**1.** Entre $1$ et $50$, les solutions de $(E)$ sont $7$, $20$, $33$ et $46$ : la probabilité est $\frac{4}{50} = \frac{2}{25}$.

**2.** Les trois tirages sont indépendants (avec remise), et à chacun la probabilité de succès est $p = \frac{2}{25}$. Le nombre de succès suit la loi binomiale de paramètres $3$ et $p$ :

$$p(X = 2) = \binom{3}{2}\,p^2(1 - p) = 3 \times \frac{4}{625} \times \frac{23}{25} = \frac{276}{15\,625}$$

## Exercice 3 : nombres complexes (3 points)

**1. a)** $\Delta = (1 + i)^2 - 4(2 + 2i) = 2i - 8 - 8i = -8 - 6i$, et $(1 - 3i)^2 = 1 - 6i - 9 = -8 - 6i$.

**1. b)** Les solutions sont $\frac{(1 + i) \pm (1 - 3i)}{2}$, soit $1 - i$ et $2i$. Avec $z_1$ imaginaire pur : $z_1 = 2i$ et $z_2 = 1 - i$.

**1. c)** $\frac{z_1}{z_2} = \frac{2i(1 + i)}{(1 - i)(1 + i)} = \frac{2i - 2}{2} = -1 + i = \sqrt{2}\,e^{i\frac{3\pi}{4}}$.

**2. a)** $e = \frac{z_1 + z_2}{2} = \frac{1 + i}{2}$.

**2. b)** La rotation de centre $A$ et d’angle $-\frac{\pi}{2}$ donne $c - z_1 = -i(e - z_1)$, avec $e - z_1 = \frac{1}{2} - \frac{3}{2}i$. Donc $c = 2i - \frac{i}{2} - \frac{3}{2} = -\frac{3}{2} + \frac{3}{2}i$.

**2. c)** $z_2 - d = -\frac{5}{2}i$ et $c - d = -\frac{5}{2}$, donc $\frac{z_2 - d}{c - d} = i$. Puis $c - z_1 = -\frac{3 + i}{2}$ et $z_2 - z_1 = 1 - 3i$ ; comme $\frac{3 + i}{1 - 3i} = \frac{(3 + i)(1 + 3i)}{10} = i$, on obtient $\frac{c - z_1}{z_2 - z_1} = -\frac{i}{2}$. Le produit vaut :

$$\frac{z_2 - d}{c - d} \times \frac{c - z_1}{z_2 - z_1} = i \times \left(-\frac{i}{2}\right) = \frac{1}{2}$$

C’est un réel. Interprétation : ce nombre est le quotient $\frac{z_2 - d}{c - d} \div \frac{z_2 - z_1}{c - z_1}$. Il est réel et les points $B$, $C$, $D$ ne sont pas alignés ($B$ et $D$ ont la même abscisse, pas $C$), donc $A$, $B$, $C$ et $D$ sont cocycliques. Plus précisément, $\frac{z_2 - d}{c - d} = i$ et $\frac{z_2 - z_1}{c - z_1} = 2i$ sont imaginaires purs : $(DB) \perp (DC)$ et $(AB) \perp (AC)$. Les points $A$ et $D$ sont sur le cercle de diamètre $[BC]$.

## Exercice 4 : analyse (6 points)

Ici $f_n(x) = \frac{1}{1 + e^{-\frac{3}{2}(x - n)}}$.

**1. a)** En $+\infty$, $e^{-\frac{3}{2}(x - n)} \to 0$, donc $\lim_{x \to +\infty} f_n(x) = 1$ ; en $-\infty$, $e^{-\frac{3}{2}(x - n)} \to +\infty$, donc $\lim_{x \to -\infty} f_n(x) = 0$. Les droites $y = 1$ (en $+\infty$) et $y = 0$ (en $-\infty$) sont asymptotes horizontales à $(C_n)$.

**1. b)** $f_n$ est dérivable sur $\mathbb{R}$ (inverse d’une fonction dérivable qui ne s’annule pas), et :

$$f_n'(x) = \frac{\frac{3}{2}\,e^{-\frac{3}{2}(x - n)}}{\left(1 + e^{-\frac{3}{2}(x - n)}\right)^2}$$

**1. c)** $f_n'(x) > 0$ : $f_n$ est strictement croissante sur $\mathbb{R}$.

**2. a)** Posons $u = e^{-\frac{3}{2}(x - n)} > 0$. L’exposant de $f_n(2n - x)$ est $-\frac{3}{2}(n - x) = \frac{3}{2}(x - n)$, donc $f_n(2n - x) = \frac{1}{1 + \frac{1}{u}} = \frac{u}{1 + u}$. Ainsi :

$$f_n(2n - x) + f_n(x) = \frac{u}{1 + u} + \frac{1}{1 + u} = 1 = 2 \times \frac{1}{2}$$

Le point $I_n\left(n ; \frac{1}{2}\right)$ est centre de symétrie de $(C_n)$.

**2. b)** Éléments pour tracer $(C_1)$ : courbe croissante en forme de S, entre les asymptotes $y = 0$ et $y = 1$, symétrique par rapport à $I_1\left(1 ; \frac{1}{2}\right)$, où la tangente a pour coefficient directeur $f_1'(1) = \frac{3}{8}$ ; $f_1(0) = \frac{1}{1 + e^{\frac{3}{2}}} \approx 0{,}18$.

**2. c)** $f_1 > 0$ et $f_1(x) = \frac{e^{\frac{3}{2}(x - 1)}}{1 + e^{\frac{3}{2}(x - 1)}}$, dont une primitive est $\frac{2}{3}\ln\left(1 + e^{\frac{3}{2}(x - 1)}\right)$. L’aire vaut, en unités d’aire :

$$\int_0^1 f_1(x)\,dx = \frac{2}{3}\left(\ln 2 - \ln\left(1 + e^{-\frac{3}{2}}\right)\right) = \frac{2}{3}\ln\left(\frac{2}{1 + e^{-\frac{3}{2}}}\right)$$

**3. a)** Soit $g_n(x) = f_n(x) - x$. Comme $(1 + u)^2 \geq 4u$, on a $f_n'(x) \leq \frac{3}{2} \cdot \frac{1}{4} = \frac{3}{8} < 1$, donc $g_n' < 0$ : $g_n$ est continue et strictement décroissante sur $\mathbb{R}$. De plus $g_n(0) = \frac{1}{1 + e^{\frac{3n}{2}}} > 0$ et $g_n(n) = \frac{1}{2} - n < 0$. L’équation $f_n(x) = x$ admet donc une unique solution $u_n$, qui est dans $]0 ; n[$.

**3. b)** L’exposant de $f_{n+1}(x)$ est $-\frac{3}{2}(x - n) + \frac{3}{2}$, plus grand que celui de $f_n(x)$ : le dénominateur est plus grand, donc $f_{n+1}(x) < f_n(x)$.

**3. c)** $g_{n+1}(u_n) = f_{n+1}(u_n) - u_n < f_n(u_n) - u_n = 0 = g_{n+1}(u_{n+1})$, et $g_{n+1}$ est strictement décroissante, donc $u_{n+1} < u_n$. La suite est strictement décroissante et minorée par $0$ : elle converge.

**3. d)** Pour tout $n$, $0 < u_n \leq u_1$, et $f_n$ est croissante, donc $u_n = f_n(u_n) \leq f_n(u_1) = \frac{1}{1 + e^{-\frac{3}{2}(u_1 - n)}}$. Quand $n \to +\infty$, $-\frac{3}{2}(u_1 - n) \to +\infty$, donc ce majorant tend vers $0$. Par encadrement, $\lim_{n \to +\infty} u_n = 0$.

## Exercice 5 : analyse (4 points)

Ici $g(x) = \int_x^{3x} \frac{\cos t}{t}\,dt$ pour $x \neq 0$.

**1.** Le domaine $\mathbb{R}^*$ est symétrique par rapport à $0$. Avec le changement de variable $t = -s$ :

$$g(-x) = \int_{-x}^{-3x} \frac{\cos t}{t}\,dt = \int_x^{3x} \frac{\cos(-s)}{-s}\,(-ds) = \int_x^{3x} \frac{\cos s}{s}\,ds = g(x)$$

$g$ est paire.

**2.** Soit $G$ une primitive sur $]0 ; +\infty[$ de la fonction continue $t \mapsto \frac{\cos t}{t}$. Alors $g(x) = G(3x) - G(x)$ est dérivable, et $g'(x) = 3\,\frac{\cos 3x}{3x} - \frac{\cos x}{x} = \frac{\cos 3x - \cos x}{x}$.

**3. a)** On intègre par parties avec $u(t) = \frac{1}{t}$ et $v'(t) = \cos t$ :

$$\int_x^{3x} \frac{\cos t}{t}\,dt = \left[\frac{\sin t}{t}\right]_x^{3x} + \int_x^{3x} \frac{\sin t}{t^2}\,dt = \frac{\sin 3x - 3\sin x}{3x} + \int_x^{3x} \frac{\sin t}{t^2}\,dt$$

**3. b)** Pour $x > 0$ : $\left|\frac{\sin 3x - 3\sin x}{3x}\right| \leq \frac{1 + 3}{3x} = \frac{4}{3x}$ et $\left|\int_x^{3x} \frac{\sin t}{t^2}\,dt\right| \leq \int_x^{3x} \frac{dt}{t^2} = \frac{1}{x} - \frac{1}{3x} = \frac{2}{3x}$. Donc $|g(x)| \leq \frac{2}{x}$, et $\lim_{x \to +\infty} g(x) = 0$.

**4. a)** Pour $t \geq 0$, $\psi(t) = t - 1 + \cos t$ vérifie $\psi'(t) = 1 - \sin t \geq 0$ et $\psi(0) = 0$ : $0 \leq 1 - \cos t \leq t$. Donc $0 \leq \frac{1 - \cos t}{t} \leq 1$ pour $t > 0$, et en intégrant sur $[x ; 3x]$, de longueur $2x$ :

$$0 \leq \int_x^{3x} \frac{1 - \cos t}{t}\,dt \leq 2x$$

**4. b)** $\int_x^{3x} \frac{dt}{t} = \ln 3x - \ln x = \ln 3$, donc $g(x) - \ln 3 = \int_x^{3x} \frac{\cos t - 1}{t}\,dt$.

**4. c)** D’après 4. a) et 4. b), $-2x \leq g(x) - \ln 3 \leq 0$ pour $x > 0$. Par encadrement, $\lim_{x \to 0^+} g(x) = \ln 3$.
