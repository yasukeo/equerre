---
summary: Structures algébriques (un corps de matrices isomorphe à ℂ), arithmétique (le nombre premier 173 et l’équation x³ + y³ = 173(xy + 1)), nombres complexes (cercle circonscrit, médiatrice), analyse (accroissements finis, étude de fonction, suite) et une fonction définie par une intégrale.
---

## Exercice 1 : structures algébriques (3,5 points)

**1.** $E$ est une partie non vide de $\mathcal{M}_3(\mathbb{R})$ (elle contient $M(0, 0)$, la matrice nulle). Les coefficients de $M(x, y)$ dépendent linéairement de $(x, y)$, donc $M(x, y) - M(x', y') = M(x - x', y - y') \in E$. $E$ est un sous-groupe de $(\mathcal{M}_3(\mathbb{R}), +)$.

**2.** On calcule le produit coefficient par coefficient. La deuxième ligne et la deuxième colonne restent nulles, et :

- coefficient $(1, 1)$ : $(x + y)(x' + y') - 2yy' = (xx' - yy') + (xy' + yx')$ ;
- coefficient $(1, 3)$ : $-2(x + y)y' - 2y(x' - y') = -2(xy' + yx')$ ;
- coefficient $(3, 1)$ : $y(x' + y') + (x - y)y' = xy' + yx'$ ;
- coefficient $(3, 3)$ : $-2yy' + (x - y)(x' - y') = (xx' - yy') - (xy' + yx')$.

On reconnaît $M(xx' - yy', xy' + yx')$.

**3. a)** Pour $z = x + iy$ et $z' = x' + iy'$ : $zz' = (xx' - yy') + i(xy' + yx')$, donc d’après 2 :

$$\varphi(zz') = M(xx' - yy', xy' + yx') = M(x, y) \times M(x', y') = \varphi(z) \times \varphi(z')$$

$\varphi$ est un morphisme de $(\mathbb{C}^*, \times)$ vers $(E, \times)$.

**3. b)** $M(x, y)$ est nulle si et seulement si $y = 0$ et $x + y = 0$, c’est-à-dire $x = y = 0$. Donc $\varphi(\mathbb{C}^*) = E^*$. L’image d’un groupe commutatif par un morphisme est un groupe commutatif : $(E^*, \times)$ est un groupe commutatif, d’élément neutre $\varphi(1) = M(1, 0)$.

**4.** $(E, +)$ est un groupe commutatif (question 1). La multiplication est stable sur $E$ (question 2), associative et distributive par rapport à l’addition, comme dans l’anneau $\mathcal{M}_3(\mathbb{R})$. Enfin $(E^*, \times)$ est un groupe commutatif. $(E, +, \times)$ est donc un corps commutatif.

**5. a)** La seule ligne non nulle de $A$ est la deuxième, $(0, 1, 0)$ : elle sélectionne la deuxième ligne de $M(x, y)$, qui est nulle. Donc $A \times M(x, y) = O$, la matrice nulle.

**5. b)** Si $M(x, y)$ avait un inverse $N$ dans $(\mathcal{M}_3(\mathbb{R}), \times)$, on aurait $A = A \times I = A \times M(x, y) \times N = O \times N = O$ : c’est faux. Aucun élément de $E$ n’est inversible dans $\mathcal{M}_3(\mathbb{R})$.

## Exercice 2 : arithmétique (3 points)

### Première partie

**1.** $a^3 \equiv -b^3 \; [173]$, et $171 = 3 \times 57$ avec $57$ impair : $a^{171} = (a^3)^{57} \equiv (-b^3)^{57} = -b^{171} \; [173]$.

**2.** Si $173$ divise $a$, il divise $a^3$, donc $b^3 = (a^3 + b^3) - a^3$ ; $173$ étant premier, il divise $b$. La réciproque se montre de la même façon.

**3.** Si $173$ divise $a$, il divise $b$ (question 2), donc $a + b$.

**4. a)** $173$ ne divise ni $a$ ni $b$, et il est premier : d’après le petit théorème de Fermat, $a^{172} \equiv 1 \equiv b^{172} \; [173]$.

**4. b)** D’après la question 1 : $a^{171}(a + b) = a^{172} + a^{171}b \equiv a^{172} - b^{171}b = a^{172} - b^{172} \equiv 0 \; [173]$.

**4. c)** $173$ est premier et ne divise pas $a^{171}$ (il ne divise pas $a$) : d’après le théorème de Gauss, il divise $a + b$.

### Deuxième partie

**1.** D’après la première partie, $173$ divise $x + y$, d’où $x + y = 173k$ avec $k \geq 1$. Comme $x^3 + y^3 = (x + y)(x^2 - xy + y^2)$, l’équation devient $k(x^2 - xy + y^2) = xy + 1$, soit $k\left((x - y)^2 + xy\right) = xy + 1$, d’où :

$$k(x - y)^2 + (k - 1)xy = 1$$

**2.** Les deux termes sont des entiers positifs ou nuls. Si $k \geq 2$, alors $(k - 1)xy \geq 1$, donc $(k - 1)xy = 1$ et $x - y = 0$ : $k = 2$ et $x = y = 1$, mais alors $x + y = 2$ n’est pas un multiple de $173$. Donc $k = 1$, puis $(x - y)^2 = 1$ et $x + y = 173$ : $(x, y) = (87, 86)$ ou $(86, 87)$. Réciproquement, ces couples vérifient $x^3 + y^3 = 173\left((x - y)^2 + xy\right) = 173(xy + 1)$. Les solutions sont $(86, 87)$ et $(87, 86)$.

## Exercice 3 : nombres complexes (3,5 points)

$O$, $M_1$ et $M_2$ ne sont pas alignés, donc $z_1 + z_2 \neq 0$ et $z$ est bien défini.

**1. a)** $z_1 - z = \frac{z_1(z_1 + z_2) - 2z_1 z_2}{z_1 + z_2} = \frac{z_1(z_1 - z_2)}{z_1 + z_2}$ et de même $z_2 - z = \frac{z_2(z_2 - z_1)}{z_1 + z_2}$, qui n’est pas nul. Donc :

$$\frac{z_1 - z}{z_2 - z} \times \frac{z_2}{z_1} = \frac{z_1(z_1 - z_2)}{z_2(z_2 - z_1)} \times \frac{z_2}{z_1} = -1$$

**1. b)** Le nombre $\frac{z_1 - z}{z_2 - z} \div \frac{z_1 - 0}{z_2 - 0}$ vaut $-1$, il est réel : les points $M$, $O$, $M_1$ et $M_2$ sont cocycliques ou alignés. Comme $O$, $M_1$ et $M_2$ ne sont pas alignés, $M$ appartient au cercle circonscrit au triangle $OM_1M_2$.

**2.** Si $z_2 = \bar{z}_1$, alors $z = \frac{2z_1\bar{z}_1}{z_1 + \bar{z}_1} = \frac{2|z_1|^2}{2\,\mathrm{Re}(z_1)} = \frac{|z_1|^2}{\mathrm{Re}(z_1)}$, qui est réel : $M$ appartient à l’axe des réels.

**3. a)** $z_2 = e^{i\alpha} z_1$.

**3. b)** Avec $1 + e^{i\alpha} = 2\cos\frac{\alpha}{2}\,e^{i\frac{\alpha}{2}}$ et $\cos\frac{\alpha}{2} > 0$ :

$$z = \frac{2e^{i\alpha}z_1^2}{z_1(1 + e^{i\alpha})} = \frac{1}{\cos\frac{\alpha}{2}}\,e^{i\frac{\alpha}{2}}\,z_1$$

Ainsi $M$ est sur la demi-droite issue de $O$ qui fait l’angle $\frac{\alpha}{2}$ avec $[OM_1)$ : la bissectrice de l’angle $\widehat{M_1OM_2}$. Comme $OM_1 = OM_2$, le triangle $OM_1M_2$ est isocèle en $O$, et cette bissectrice est la médiatrice de $[M_1M_2]$. $M$ appartient donc à la médiatrice de $[M_1M_2]$.

**4. a)** D’après les relations entre coefficients et racines : $z_1 + z_2 = \frac{e^{i\theta} + 1}{6}$ et $z_1 z_2 = \frac{e^{i\theta} - 1}{6}$. Donc :

$$z = \frac{2z_1z_2}{z_1 + z_2} = 2\,\frac{e^{i\theta} - 1}{e^{i\theta} + 1}$$

**4. b)** $e^{i\theta} - 1 = 2i\sin\frac{\theta}{2}\,e^{i\frac{\theta}{2}}$ et $e^{i\theta} + 1 = 2\cos\frac{\theta}{2}\,e^{i\frac{\theta}{2}}$, donc $z = 2i\tan\frac{\theta}{2}$. Comme $0 < \frac{\theta}{2} < \frac{\pi}{2}$, $\tan\frac{\theta}{2} > 0$ :

$$z = 2\tan\frac{\theta}{2}\left(\cos\frac{\pi}{2} + i\sin\frac{\pi}{2}\right)$$

## Exercice 4 : analyse (7 points)

### Première partie

**1.** $t \mapsto e^{-t}$ est continue sur $[0 ; x]$ et dérivable sur $]0 ; x[$. D’après le théorème des accroissements finis, il existe $\theta \in ]0 ; x[$ tel que $e^{-x} - 1 = -e^{-\theta}x$, d’où $e^{-\theta} = \frac{1 - e^{-x}}{x}$ et, comme $1 - e^{-x} > 0$ :

$$e^{\theta} = \frac{x}{1 - e^{-x}}$$

**2. a)** $\theta > 0$, donc $e^{\theta} > 1$ : $x > 1 - e^{-x}$, soit $1 - x < e^{-x}$.

**2. b)** $\theta < x$, donc $e^{\theta} < e^{x}$ : $x < e^x(1 - e^{-x}) = e^x - 1$, soit $x + 1 < e^x$.

**2. c)** $\frac{xe^x}{e^x - 1} = \frac{x}{1 - e^{-x}} = e^{\theta}$, donc $\ln\left(\frac{xe^x}{e^x - 1}\right) = \theta$, et $0 < \theta < x$.

### Deuxième partie

**1. a)** $\lim_{x \to 0^+} \frac{e^x - 1}{x} = 1$, donc $f(x) = e^x \cdot \frac{x}{e^x - 1} \to 1 = f(0)$ : $f$ est continue à droite en $0$.

**1. b)** $f(x) - x = x\left(\frac{e^x}{e^x - 1} - 1\right) = \frac{x}{e^x - 1} = \frac{xe^{-x}}{1 - e^{-x}}$, qui tend vers $0$ en $+\infty$. La droite d’équation $y = x$ est asymptote oblique à $(C)$ en $+\infty$, et $(C)$ est au-dessus d’elle.

**2. a)** D’après la première partie, 2. a), $1 - t \leq e^{-t}$ pour $t \geq 0$ (avec égalité en $0$). En intégrant de $0$ à $x \geq 0$ : $x - \frac{x^2}{2} \leq 1 - e^{-x}$.

**2. b)** L’inégalité de droite est 2. a) réécrite : $e^{-x} + x - 1 \leq \frac{x^2}{2}$. Pour celle de gauche, on intègre 2. a) de $0$ à $x$ : $\int_0^x \left(t - \frac{t^2}{2}\right)dt \leq \int_0^x \left(1 - e^{-t}\right)dt$, soit $\frac{x^2}{2} - \frac{x^3}{6} \leq x + e^{-x} - 1$.

**3. a)** Pour $x > 0$ :

$$\frac{e^{-x} + x - 1}{x^2}\,f(x) = \frac{(e^{-x} + x - 1)e^x}{x(e^x - 1)} = \frac{xe^x - e^x + 1}{x(e^x - 1)} = \frac{f(x) - 1}{x}$$

**3. b)** En divisant 2. b) par $x^2 > 0$ : $\frac{1}{2} - \frac{x}{6} \leq \frac{e^{-x} + x - 1}{x^2} \leq \frac{1}{2}$, donc ce quotient tend vers $\frac{1}{2}$ en $0^+$. Avec $\lim_{x \to 0^+} f(x) = 1$ : $\lim_{x \to 0^+} \frac{f(x) - 1}{x} = \frac{1}{2}$. $f$ est dérivable à droite en $0$ et $f'_d(0) = \frac{1}{2}$ : $(C)$ admet au point $(0 ; 1)$ une demi-tangente de coefficient directeur $\frac{1}{2}$.

**4. a)** Sur $]0 ; +\infty[$, $f$ est un quotient de fonctions dérivables dont le dénominateur ne s’annule pas. Et :

$$f'(x) = \frac{(1 + x)e^x(e^x - 1) - xe^x e^x}{(e^x - 1)^2} = \frac{e^x\left(e^x - 1 - x\right)}{(e^x - 1)^2}$$

**4. b)** D’après la première partie, 2. b), $e^x - 1 - x > 0$ pour $x > 0$, donc $f'(x) > 0$ sur $]0 ; +\infty[$. Comme $f$ est continue en $0$, elle est strictement croissante sur $[0 ; +\infty[$.

### Troisième partie

**a)** Par récurrence : $u_0 > 0$, et si $u_n > 0$, la première partie, 2. c), donne $0 < \ln\left(f(u_n)\right) < u_n$, donc $u_{n+1} > 0$.

**b)** La même inégalité donne $u_{n+1} < u_n$ : la suite est strictement décroissante. Elle est minorée par $0$, donc elle converge.

**c)** $\ln\left(f(0)\right) = \ln 1 = 0$ : $0$ est solution. Pour $x > 0$, $\ln\left(f(x)\right) < x$ : il n’y a pas d’autre solution. Soit $\ell \geq 0$ la limite de $(u_n)$ ; la fonction $x \mapsto \ln\left(f(x)\right)$ est continue sur $[0 ; +\infty[$ (car $f \geq 1$), donc $\ell = \ln\left(f(\ell)\right)$, et $\ell = 0$ : $\lim_{n \to +\infty} u_n = 0$.

## Exercice 5 : analyse (3 points)

Ici $F(x) = \int_{\ln 2}^x \frac{dt}{\sqrt{e^t - 1}}$ sur $I = ]0 ; +\infty[$.

**1. a)** La fonction intégrée est continue et strictement positive sur $I$. Si $x > \ln 2$, $F(x) > 0$ ; si $0 < x < \ln 2$, $F(x) = -\int_x^{\ln 2} \frac{dt}{\sqrt{e^t - 1}} < 0$ ; et $F(\ln 2) = 0$. $F(x)$ a le signe de $x - \ln 2$.

**1. b)** $t \mapsto \frac{1}{\sqrt{e^t - 1}}$ est continue sur $I$ et $\ln 2 \in I$ : $F$ est sa primitive qui s’annule en $\ln 2$. Elle est dérivable sur $I$ et $F'(x) = \frac{1}{\sqrt{e^x - 1}}$.

**1. c)** $F'(x) > 0$ sur $I$ : $F$ est strictement croissante sur $I$.

**2. a)** Avec $u = \sqrt{e^t - 1}$ : $t = \ln(1 + u^2)$ et $dt = \frac{2u}{1 + u^2}\,du$ ; $t = \ln 2$ donne $u = 1$ et $t = x$ donne $u = \sqrt{e^x - 1}$. Donc :

$$F(x) = \int_1^{\sqrt{e^x - 1}} \frac{1}{u} \cdot \frac{2u}{1 + u^2}\,du = \Big[2\arctan u\Big]_1^{\sqrt{e^x - 1}} = 2\arctan\sqrt{e^x - 1} - \frac{\pi}{2}$$

**2. b)** Quand $x \to 0^+$, $\sqrt{e^x - 1} \to 0$, donc $\lim_{x \to 0^+} F(x) = -\frac{\pi}{2}$. Quand $x \to +\infty$, $\sqrt{e^x - 1} \to +\infty$ et $\arctan \to \frac{\pi}{2}$, donc $\lim_{x \to +\infty} F(x) = \frac{\pi}{2}$.

**3. a)** $F$ est continue et strictement croissante sur $I$ : c’est une bijection de $I$ sur $J = \left]-\frac{\pi}{2} ; \frac{\pi}{2}\right[$.

**3. b)** Pour $y \in J$ : $F(x) = y \iff \arctan\sqrt{e^x - 1} = \frac{y}{2} + \frac{\pi}{4}$. Comme $\frac{y}{2} + \frac{\pi}{4} \in \left]0 ; \frac{\pi}{2}\right[$, cela équivaut à $e^x - 1 = \tan^2\left(\frac{y}{2} + \frac{\pi}{4}\right)$, puis $e^x = \frac{1}{\cos^2\left(\frac{y}{2} + \frac{\pi}{4}\right)}$. Or $\cos^2\left(\frac{y}{2} + \frac{\pi}{4}\right) = \frac{1 + \cos\left(y + \frac{\pi}{2}\right)}{2} = \frac{1 - \sin y}{2}$. Donc :

$$F^{-1}(y) = \ln\left(\frac{2}{1 - \sin y}\right)$$

Vérification : $F^{-1}(0) = \ln 2$, et en effet $F(\ln 2) = 0$.
