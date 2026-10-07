---
summary: Une droite tangente à une sphère (distance d’un point à une droite), une suite homographique rendue arithmétique, deux cartes tirées sans remise, une rotation et quatre points cocycliques, et l’étude de (x eˣ − 1)eˣ avec une intégration par parties et une aire.
---

## Exercice 1 : géométrie dans l’espace (3 points)

**1. a)** $(\Delta)$ passe par $A(0 ; 0 ; 1)$ et est dirigée par le vecteur normal de $(P)$, $\vec{u} = 2\vec{i} + \vec{j} - 2\vec{k}$ : $x = 2t$, $y = t$, $z = 1 - 2t$, avec $t \in \mathbb{R}$.

**1. b)** Pour $t = 1$ on obtient $H(2 ; 1 ; -1)$, donc $H \in (\Delta)$ ; et $2 \times 2 + 1 - 2 \times (-1) - 7 = 0$, donc $H \in (P)$. $H$ est le point d’intersection de $(P)$ et $(\Delta)$.

**2. a)** $\overrightarrow{\Omega A}(0 ; -3 ; 3)$ et $\vec{u}(2 ; 1 ; -2)$, donc :

$$\overrightarrow{\Omega A} \wedge \vec{u} = ((-3) \times (-2) - 3 \times 1)\,\vec{i} + (3 \times 2 - 0 \times (-2))\,\vec{j} + (0 \times 1 - (-3) \times 2)\,\vec{k} = 3\vec{i} + 6\vec{j} + 6\vec{k} = 3(\vec{i} + 2\vec{j} + 2\vec{k})$$

**2. b)** $d(\Omega, (\Delta)) = \frac{\|\overrightarrow{\Omega A} \wedge \vec{u}\|}{\|\vec{u}\|} = \frac{3\sqrt{1 + 4 + 4}}{\sqrt{4 + 1 + 4}} = \frac{9}{3} = 3$.

**2. c)** La distance de $\Omega$ à $(\Delta)$ est égale au rayon : $(\Delta)$ est tangente à $(S)$. De plus $\overrightarrow{\Omega H}(2 ; -2 ; 1)$ a pour norme $\sqrt{4 + 4 + 1} = 3$, donc $H \in (S)$ ; comme $H \in (\Delta)$, c’est le point de contact.

## Exercice 2 : suites numériques (3 points)

**1.** $u_{n+1} - 2 = \frac{5u_n - 4 - 2 - 2u_n}{1 + u_n} = \frac{3(u_n - 2)}{1 + u_n}$. Par récurrence : $u_1 = 5 > 2$ ; si $u_n > 2$, alors $u_n - 2 > 0$ et $1 + u_n > 0$, donc $u_{n+1} > 2$.

**2. a)** D’après le calcul précédent, $v_{n+1} = \frac{3}{u_{n+1} - 2} = \frac{3(1 + u_n)}{3(u_n - 2)} = \frac{1 + u_n}{u_n - 2}$. Donc $v_{n+1} - v_n = \frac{1 + u_n - 3}{u_n - 2} = 1$ : $(v_n)$ est arithmétique de raison $1$.

**2. b)** $v_1 = \frac{3}{5 - 2} = 1$, donc $v_n = 1 + (n - 1) = n$. Alors $u_n - 2 = \frac{3}{v_n} = \frac{3}{n}$, soit $u_n = 2 + \frac{3}{n}$.

**2. c)** $\lim_{n \to +\infty} u_n = 2$.

## Exercice 3 : probabilités (3 points)

On tire successivement sans remise $2$ cartes parmi $10$ ($8$ de mathématiques, $2$ de français) : il y a $10 \times 9 = 90$ tirages équiprobables.

**1.** $A$ : $2 \times 1 = 2$ tirages, donc $p(A) = \frac{2}{90} = \frac{1}{45}$. $B$ : mathématiques puis français, ou français puis mathématiques, $8 \times 2 + 2 \times 8 = 32$ tirages, donc $p(B) = \frac{32}{90} = \frac{16}{45}$.

**2. a)** On tire $2$ cartes et il y a $2$ cartes de français : $X$ prend les valeurs $0$, $1$ et $2$.

**2. b)** $p(X = 0) = \frac{8 \times 7}{90} = \frac{56}{90} = \frac{28}{45}$. De plus $p(X = 1) = p(B) = \frac{16}{45}$ et $p(X = 2) = p(A) = \frac{1}{45}$. On vérifie : $28 + 16 + 1 = 45$.

## Exercice 4 : nombres complexes (3 points)

**1.** $\Delta = 16 - 20 = -4 = (2i)^2$ : les solutions sont $2 + i$ et $2 - i$.

**2. a)** $\frac{a - \omega}{b - \omega} = \frac{1 + i}{1 - i} = \frac{(1 + i)^2}{2} = \frac{2i}{2} = i$.

**2. b)** Le module vaut $1$, donc $\Omega A = \Omega B$ ; l’argument vaut $\frac{\pi}{2}$, donc $(\overrightarrow{\Omega B}, \overrightarrow{\Omega A}) \equiv \frac{\pi}{2} \; [2\pi]$. Le triangle $\Omega AB$ est rectangle et isocèle en $\Omega$.

**3. a)** $z' - \omega = i(z - \omega)$, donc $z' = iz + (1 - i)\omega = iz + 1 - i$.

**3. b)** $i(2 + i) + 1 - i = 2i - 1 + 1 - i = i = c$, donc $R(A) = C$. Et $i(-i) + 1 - i = 2 - i = b$, donc $R(D) = B$.

**3. c)** Une rotation de centre $\Omega$ conserve la distance à $\Omega$ : $\Omega C = \Omega A$ et $\Omega B = \Omega D$. Avec $\Omega A = \Omega B$, les quatre points sont à la même distance $|a - \omega| = |1 + i| = \sqrt{2}$ de $\Omega$. Ils appartiennent au cercle de centre $\Omega$ et de rayon $\sqrt{2}$.

## Exercice 5 : étude d’une fonction et calcul intégral (8 points)

**1.** Quand $x \to -\infty$, $xe^x \to 0$, donc $xe^x - 1 \to -1$, et $e^x \to 0$ : $\lim_{x \to -\infty} f(x) = 0$. L’axe des abscisses est asymptote horizontale à $(C)$ au voisinage de $-\infty$.

**2. a)** Quand $x \to +\infty$, $xe^x - 1 \to +\infty$ et $e^x \to +\infty$ : $\lim_{x \to +\infty} f(x) = +\infty$. Et $\frac{f(x)}{x} = \left(e^x - \frac{1}{x}\right)e^x \to +\infty$.

**2. b)** $(C)$ admet donc en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**3. a)** $f'(x) = (e^x + xe^x)e^x + (xe^x - 1)e^x = e^x\left(e^x - 1 + 2xe^x\right)$. Et $f'(0) = 1 \times (1 - 1 + 0) = 0$.

**3. b)** $\exp$ est croissante et $e^0 = 1$ : $e^x - 1 \geq 0$ pour $x \geq 0$ et $e^x - 1 \leq 0$ pour $x \leq 0$.

**3. c)** Sur $[0 ; +\infty[$, $e^x - 1 \geq 0$ et $2xe^x \geq 0$, donc $f'(x) \geq 0$ ; sur $]-\infty ; 0]$, les deux termes sont négatifs, donc $f'(x) \leq 0$. Ainsi $f$ est décroissante sur $]-\infty ; 0]$, de $0$ (en $-\infty$) à $f(0) = -1$, puis croissante sur $[0 ; +\infty[$ jusqu’à $+\infty$.

**4. a)** Sur $[0 ; +\infty[$, $f$ est continue et strictement croissante de $-1$ à $+\infty$ : l’équation $f(x) = 0$ a une unique solution $\alpha$ dans cet intervalle. $f\left(\frac{1}{2}\right) = \left(\frac{1}{2}e^{\frac{1}{2}} - 1\right)e^{\frac{1}{2}} < 0$ car $\frac{1}{2}e^{\frac{1}{2}} < 1$, et $f(1) = (e - 1)e > 0$. Donc $\frac{1}{2} < \alpha < 1$.

**4. b)** Éléments pour le tracé (unité $2$ cm) : $(C)$ est au-dessous de l’axe des abscisses sur $]-\infty ; \alpha[$, proche de lui en $-\infty$, descend jusqu’au minimum $(0 ; -1)$ où la tangente est horizontale, coupe l’axe des abscisses en $\alpha \approx 0{,}57$, puis monte avec une branche parabolique verticale. Quelques valeurs : $f(-2) \approx -0{,}17$, $f(-1) \approx -0{,}50$, $f(0{,}5) \approx -0{,}29$, $f(1) = e^2 - e \approx 4{,}67$.

**5.** On intègre par parties avec $u(x) = x$ et $v'(x) = e^{2x}$, donc $v(x) = \frac{1}{2}e^{2x}$ :

$$\int_0^{\frac{1}{2}} xe^{2x}\,dx = \left[\frac{xe^{2x}}{2}\right]_0^{\frac{1}{2}} - \frac{1}{2}\int_0^{\frac{1}{2}} e^{2x}\,dx = \frac{e}{4} - \left[\frac{e^{2x}}{4}\right]_0^{\frac{1}{2}} = \frac{e}{4} - \frac{e}{4} + \frac{1}{4} = \frac{1}{4}$$

**6.** Sur $\left[0 ; \frac{1}{2}\right]$, $x < \alpha$, donc $f(x) < 0$. Comme $f(x) = xe^{2x} - e^x$, l’aire vaut :

$$-\int_0^{\frac{1}{2}} f(x)\,dx = -\frac{1}{4} + \int_0^{\frac{1}{2}} e^x\,dx = -\frac{1}{4} + \sqrt{e} - 1 = \sqrt{e} - \frac{5}{4}$$

en unités d’aire. Une unité d’aire vaut $2 \times 2 = 4$ cm² : l’aire est $\left(4\sqrt{e} - 5\right)$ cm², soit environ $1{,}59$ cm².
