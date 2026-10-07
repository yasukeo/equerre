---
summary: Structures algébriques (la loi e^(ln a · ln b), un corps, une matrice nilpotente), nombres complexes (rotation, translation, triangles rectangles isocèles), arithmétique (n² + 1 et les premiers de la forme 4k + 3), analyse (la famille 4xⁿe^(−x²)) et une fonction définie par une intégrale.
---

## Exercice 1 : structures algébriques (3,5 points)

### Partie I

**1.** $\ln(a * b) = \ln a \cdot \ln b$ : la loi est commutative, et $\ln\big((a * b) * c\big) = \ln a\,\ln b\,\ln c = \ln\big(a * (b * c)\big)$, donc elle est associative ($\ln$ est injective).

**2.** $a * \varepsilon = a$ pour tout $a$ équivaut à $\ln a \cdot \ln \varepsilon = \ln a$, donc $\ln \varepsilon = 1$ : $\varepsilon = e$.

**3. a)** Si $a \neq 1$ et $b \neq 1$, alors $\ln(a * b) = \ln a\,\ln b \neq 0$, donc $a * b \neq 1$ : $I \setminus \{1\}$ est stable. Il contient $e$, et tout $a \neq 1$ a pour symétrique $e^{\frac{1}{\ln a}} \neq 1$. $(I \setminus \{1\}, *)$ est un groupe commutatif ; $\ln$ en est d’ailleurs un isomorphisme vers $(\mathbb{R}^*, \times)$.

**3. b)** $]1 ; +\infty[$ correspond aux $a$ tels que $\ln a > 0$ : il est stable (produit de deux positifs), contient $e$, et le symétrique $e^{\frac{1}{\ln a}}$ de $a > 1$ est aussi $> 1$. C’est un sous-groupe.

**4. a)** $a * (b \times c) = e^{\ln a(\ln b + \ln c)} = e^{\ln a\,\ln b}\,e^{\ln a\,\ln c} = (a * b) \times (a * c)$, et de même à droite par commutativité.

**4. b)** $(I, \times)$ est un groupe commutatif, de neutre $1$. $(I \setminus \{1\}, *)$ est un groupe commutatif, et $a * 1 = e^0 = 1$. La loi $*$ est associative et distributive par rapport à $\times$. $(I, \times, *)$ est un corps commutatif, dont le « zéro » est $1$ et l’« unité » est $e$.

### Partie II

**1.** On calcule :

$$A^2 = \begin{pmatrix} 4 & 4 & 0 \\ -4 & -4 & 0 \\ 0 & 0 & 0 \end{pmatrix} \qquad A^3 = A^2 \times A = O$$

**2.** Si $A$ avait un inverse, on aurait $A^2 = A^3 \times A^{-1} = O$ : c’est faux. $A$ n’est pas inversible.

## Exercice 2 : nombres complexes (3,5 points)

**1. a)** $(x + iy)^2 = 3 + 4i$ donne $x^2 - y^2 = 3$, $x^2 + y^2 = 5$ et $xy > 0$ : les racines carrées sont $2 + i$ et $-2 - i$.

**1. b)** $\Delta = (10i)^2 + 16(7 + i) = 12 + 16i = 4(3 + 4i) = (4 + 2i)^2$. Les solutions sont $\frac{10i \pm (4 + 2i)}{8}$, soit $\frac{1}{2} + \frac{3}{2}i$ et $-\frac{1}{2} + i$.

**2. a)** $a = -\frac{1}{2} + i$ et $b = \frac{1}{2} + \frac{3}{2}i$, donc $\frac{b}{a} = \frac{1 + 3i}{-1 + 2i} = \frac{(1 + 3i)(-1 - 2i)}{5} = \frac{5 - 5i}{5} = 1 - i$.

**2. b)** $\frac{b - a}{0 - a} = 1 - \frac{b}{a} = i$ : $AB = AO$ et $(\overrightarrow{AO}, \overrightarrow{AB}) \equiv \frac{\pi}{2} \; [2\pi]$. Le triangle $AOB$ est rectangle et isocèle en $A$.

**3. a)** $d = c + i(b - c) = (1 - i)c + ib = (1 - i)c - \frac{3}{2} + \frac{i}{2}$.

**3. b)** $\ell = d + (0 - a) = (1 - i)c - \frac{3}{2} + \frac{i}{2} + \frac{1}{2} - i = (1 - i)c - 1 - \frac{i}{2}$.

**3. c)** $\ell - c = -ic - 1 - \frac{i}{2}$, et $ia = -1 - \frac{i}{2}$, donc $\ell - c = i(a - c)$ et :

$$\frac{\ell - c}{a - c} = i$$

Ainsi $CL = CA$ et $(\overrightarrow{CA}, \overrightarrow{CL}) \equiv \frac{\pi}{2} \; [2\pi]$ : le triangle $ACL$ est rectangle et isocèle en $C$.

## Exercice 3 : arithmétique (3 points)

**1.** Modulo $5$ : pour $m \equiv 0, 1, 2, 3, 4$, $m^2 + 1 \equiv 1, 2, 0, 0, 2$. Les solutions sont les entiers $m \equiv 2$ ou $m \equiv 3 \; [5]$.

**2. a)** $n^2 \equiv -1 \; [p]$, donc $(n^2)^{1 + 2k} \equiv (-1)^{1 + 2k} = -1 \; [p]$.

**2. b)** Si $p$ divisait $n$, on aurait $n^2 + 1 \equiv 1 \not\equiv 0 \; [p]$. Donc $p$, qui est premier, ne divise pas $n$ : ils sont premiers entre eux.

**2. c)** D’après le petit théorème de Fermat, $n^{p - 1} \equiv 1 \; [p]$, et $p - 1 = 2 + 4k = 2(1 + 2k)$, donc $(n^2)^{1 + 2k} = n^{p-1} \equiv 1 \; [p]$.

**2. d)** Avec 2. a) et 2. c) : $-1 \equiv 1 \; [p]$, donc $p$ divise $2$. C’est impossible, car $p = 3 + 4k \geq 3$. Aucun entier naturel $n$ ne vérifie $n^2 + 1 \equiv 0 \; [p]$.

## Exercice 4 : analyse (6,25 points)

### Partie I

**1.** $f(x) = \frac{4x}{e^{x^2}}$ et, pour $x \geq 1$, $e^{x^2} \geq e^x$ ; donc $0 \leq f(x) \leq 4xe^{-x} \to 0$ : $\lim_{x \to +\infty} f(x) = 0$.

**2.** $f'(x) = 4e^{-x^2}(1 - 2x^2)$ s’annule en $\frac{1}{\sqrt{2}}$. $f$ croît sur $\left[0 ; \frac{1}{\sqrt{2}}\right]$ de $0$ à $f\left(\frac{1}{\sqrt{2}}\right) = 2\sqrt{\frac{2}{e}}$, puis décroît vers $0$.

**3.** $f'(0) = 4$ : la demi-tangente à l’origine a pour équation $y = 4x$ ($x \geq 0$). Éléments pour le tracé : maximum $\left(\frac{1}{\sqrt{2}} ; 2\sqrt{\frac{2}{e}}\right) \approx (0{,}71 ; 1{,}72)$, inflexion en $x = \sqrt{\frac{3}{2}} \approx 1{,}22$, asymptote $y = 0$ en $+\infty$.

**4.** $a = \int_0^1 4xe^{-x^2}\,dx = \left[-2e^{-x^2}\right]_0^1 = 2 - \frac{2}{e}$. L’unité d’aire vaut $2 \times 2 = 4 \text{ cm}^2$ et $f \geq 0$, donc l’aire est $4a = 8 - \frac{8}{e} \text{ cm}^2$.

### Partie II

**1. a)** Pour $x > 1$, $x^2 > x$, donc $e^{-x^2} < e^{-x}$.

**1. b)** $0 < f_n(x) < 4x^ne^{-x}$ pour $x > 1$, et $x^ne^{-x} \to 0$ : $\lim_{x \to +\infty} f_n(x) = 0$.

**2.** $f_n'(x) = 4x^{n-1}e^{-x^2}(n - 2x^2)$. $f_n$ croît sur $\left[0 ; \sqrt{\frac{n}{2}}\right]$ de $0$ à $4\left(\frac{n}{2}\right)^{\frac{n}{2}}e^{-\frac{n}{2}}$, puis décroît vers $0$.

**3.** Pour $n \geq 2$, $\sqrt{\frac{n}{2}} \geq 1$ : $f_n$ est continue et strictement croissante sur $[0 ; 1]$, avec $f_n(0) = 0$ et $f_n(1) = \frac{4}{e} > 1$. Il existe un unique $u_n \in ]0 ; 1[$ tel que $f_n(u_n) = 1$.

**4. a)** $f_{n+1}(u_n) = 4u_n^{n+1}e^{-u_n^2} = u_n\,f_n(u_n) = u_n$.

**4. b)** $f_{n+1}(u_n) = u_n < 1 = f_{n+1}(u_{n+1})$ et $f_{n+1}$ est strictement croissante sur $[0 ; 1]$ : $u_n < u_{n+1}$. La suite est strictement croissante et majorée par $1$ : elle converge.

**5. a)** $0 < u_2 \leq \ell \leq 1$.

**5. b)** $f_n(u_n) = 1$ s’écrit $\ln 4 + n\ln u_n - u_n^2 = 0$, soit $\ln u_n = \frac{u_n^2 - \ln 4}{n}$. Comme $0 < u_n^2 < 1$ : $-\frac{\ln 4}{n} < \ln u_n < \frac{1}{n} - \frac{\ln 4}{n}$.

**5. c)** Les deux bornes tendent vers $0$, donc $\ln u_n \to 0$ et $\ell = 1$.

## Exercice 5 : analyse (3,75 points)

**1.** Pour $x \neq 0$, l’intervalle d’intégration ne contient pas $0$. Avec $t = -s$ : $F(-x) = \int_{-x}^{-2x} \frac{dt}{\ln(1 + t^2)} = -\int_x^{2x} \frac{ds}{\ln(1 + s^2)} = -F(x)$. $F$ est impaire.

**2. a)** D’après la relation de Chasles, $F(x) = \int_1^{2x} - \int_1^x = \varphi(2x) - \varphi(x)$.

**2. b)** $\varphi$ est la primitive sur $]0 ; +\infty[$ de la fonction continue $t \mapsto \frac{1}{\ln(1 + t^2)}$ qui s’annule en $1$. Donc $F$ est dérivable et :

$$F'(x) = \frac{2}{\ln(1 + 4x^2)} - \frac{1}{\ln(1 + x^2)} = \frac{\ln\left(\frac{(1 + x^2)^2}{1 + 4x^2}\right)}{\ln(1 + 4x^2)\ln(1 + x^2)}$$

**2. c)** $(1 + x^2)^2 - (1 + 4x^2) = x^2(x^2 - 2)$. Le numérateur est négatif pour $0 < x < \sqrt{2}$ et positif pour $x > \sqrt{2}$ : $F$ est décroissante sur $]0 ; \sqrt{2}]$ et croissante sur $[\sqrt{2} ; +\infty[$.

**3. a)** D’après le théorème des accroissements finis appliqué à $\varphi$ sur $[x ; 2x]$, il existe $c \in ]x ; 2x[$ tel que $F(x) = \varphi(2x) - \varphi(x) = x\,\varphi'(c) = \frac{x}{\ln(1 + c^2)}$.

**3. b)** $x < c < 2x$ donne $\ln(1 + x^2) < \ln(1 + c^2) < \ln(1 + 4x^2)$, d’où $\frac{x}{\ln(1 + 4x^2)} < F(x) < \frac{x}{\ln(1 + x^2)}$.

**3. c)** En $0^+$ : $\frac{x}{\ln(1 + 4x^2)} = \frac{1}{4x} \cdot \frac{4x^2}{\ln(1 + 4x^2)} \to +\infty$, donc $\lim_{x \to 0^+} F(x) = +\infty$. En $+\infty$ : $\frac{x}{\ln(1 + 4x^2)} \to +\infty$, donc $\lim_{x \to +\infty} F(x) = +\infty$. Et $\frac{1}{\ln(1 + 4x^2)} < \frac{F(x)}{x} < \frac{1}{\ln(1 + x^2)}$, donc $\lim_{x \to +\infty} \frac{F(x)}{x} = 0$.

**3. d)** Avec 3. b) : $F(\sqrt{e - 1}) < \frac{\sqrt{e - 1}}{\ln e} = \sqrt{e - 1}$ et $F\left(\frac{\sqrt{e - 1}}{2}\right) > \frac{\frac{\sqrt{e - 1}}{2}}{\ln e} = \frac{\sqrt{e - 1}}{2}$.

Soit $G(x) = F(x) - x$. Pour $x \geq \sqrt{e - 1}$, $\ln(1 + x^2) \geq 1$, donc $F(x) < x$ : pas de solution. Sur $]0 ; \sqrt{e - 1}] \subset ]0 ; \sqrt{2}]$, $F$ est décroissante, donc $G$ est continue et strictement décroissante ; avec $G\left(\frac{\sqrt{e - 1}}{2}\right) > 0 > G(\sqrt{e - 1})$, elle s’annule une seule fois. L’équation $F(x) = x$ admet une unique solution dans $]0 ; +\infty[$.
