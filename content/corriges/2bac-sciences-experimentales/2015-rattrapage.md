---
summary: Un plan tangent à une sphère et une droite qui la traverse, un triangle rectangle isocèle et un milieu dans le plan complexe, deux boules tirées sans remise avec une espérance, et un problème sur x/(eˣ − 2x) avec un encadrement d’aire, une fonction réciproque et une suite.
---

## Exercice 1 : géométrie dans l’espace (3 points)

**1. a)** $d(\Omega, (P)) = \frac{|1 - 1 - 1 + 4|}{\sqrt{3}} = \frac{3}{\sqrt{3}} = \sqrt{3}$. La distance est égale au rayon : $(P)$ est tangent à $(S)$.

**1. b)** $0 - 2 - 2 + 4 = 0$, donc $H \in (P)$. Et $\overrightarrow{\Omega H}(-1 ; -1 ; -1)$ a pour norme $\sqrt{3}$, donc $H \in (S)$. Le plan tangent n’a qu’un point commun avec la sphère : $H$ est le point de contact.

**2. a)** $\overrightarrow{OA}(2 ; 1 ; 1)$ et $\overrightarrow{OB}(1 ; 0 ; 1)$, donc :

$$\overrightarrow{OA} \wedge \overrightarrow{OB} = (1 \times 1 - 1 \times 0)\,\vec{i} + (1 \times 1 - 2 \times 1)\,\vec{j} + (2 \times 0 - 1 \times 1)\,\vec{k} = \vec{i} - \vec{j} - \vec{k}$$

Ce vecteur non nul est normal à $(OAB)$, qui passe par $O$ : $(OAB) : x - y - z = 0$.

**2. b)** $(\Delta)$ passe par $\Omega(1 ; -1 ; -1)$ et est dirigée par $\vec{i} - \vec{j} - \vec{k}$ : $x = 1 + t$, $y = -1 - t$, $z = -1 - t$, avec $t \in \mathbb{R}$.

**2. c)** L’équation de $(S)$ est $(x - 1)^2 + (y + 1)^2 + (z + 1)^2 = 3$. En remplaçant : $t^2 + t^2 + t^2 = 3$, soit $t = 1$ ou $t = -1$. Les points d’intersection sont $(2 ; -2 ; -2)$ et $(0 ; 0 ; 0)$, c’est-à-dire $O$.

## Exercice 2 : nombres complexes (3 points)

**1.** $\Delta = 100 - 104 = -4 = (2i)^2$ : les solutions sont $-5 + i$ et $-5 - i$.

**2. a)** $b - \omega = -2 + i$ et $a - \omega = 1 + 2i$. Or $i(1 + 2i) = -2 + i$, donc $\frac{b - \omega}{a - \omega} = i$.

**2. b)** Le module vaut $1$, donc $\Omega A = \Omega B$ ; l’argument vaut $\frac{\pi}{2}$, donc $(\overrightarrow{\Omega A}, \overrightarrow{\Omega B}) \equiv \frac{\pi}{2} \; [2\pi]$. Le triangle $\Omega AB$ est rectangle et isocèle en $\Omega$.

**3. a)** $d = c + 6 + 4i = -5 - i + 6 + 4i = 1 + 3i$.

**3. b)** $b - d = -6 - 2i$ et $a - d = -3 - i$, donc $\frac{b - d}{a - d} = 2$. Ainsi $\overrightarrow{DB} = 2\overrightarrow{DA}$ : $A$ est le milieu de $[BD]$. On le vérifie : $\frac{b + d}{2} = \frac{-4 + 4i}{2} = -2 + 2i = a$.

## Exercice 3 : probabilités (3 points)

On tire successivement sans remise $2$ boules parmi $8$ ($3$ rouges, $3$ vertes, $2$ blanches) : il y a $8 \times 7 = 56$ tirages équiprobables.

**1.** L’événement contraire de $A$ est « aucune blanche » : $6 \times 5 = 30$ tirages, donc $p(A) = 1 - \frac{30}{56} = \frac{26}{56} = \frac{13}{28}$. $B$ : deux rouges, deux vertes ou deux blanches, $3 \times 2 + 3 \times 2 + 2 \times 1 = 14$ tirages, donc $p(B) = \frac{14}{56} = \frac{1}{4}$.

**2. a)** $p(X = 2) = \frac{2 \times 1}{56} = \frac{1}{28}$.

**2. b)** $p(X = 0) = \frac{30}{56} = \frac{15}{28}$ et $p(X = 1) = \frac{2 \times 6 + 6 \times 2}{56} = \frac{24}{56} = \frac{12}{28}$. La loi de $X$ est : $p(X = 0) = \frac{15}{28}$, $p(X = 1) = \frac{12}{28}$, $p(X = 2) = \frac{1}{28}$. L’espérance vaut :

$$E(X) = 0 \times \frac{15}{28} + 1 \times \frac{12}{28} + 2 \times \frac{1}{28} = \frac{14}{28} = \frac{1}{2}$$

## Problème (11 points)

### Partie I

**1.** $g'(x) = e^x - 2$, négatif pour $x \leq \ln 2$ et positif pour $x \geq \ln 2$ : $g$ est décroissante sur $]-\infty ; \ln 2]$ et croissante sur $[\ln 2 ; +\infty[$.

**2.** $g(\ln 2) = 2 - 2\ln 2 = 2(1 - \ln 2)$, strictement positif car $\ln 2 < 1$.

**3.** $g(\ln 2)$ est le minimum de $g$ et il est strictement positif : $g(x) > 0$ pour tout $x \in \mathbb{R}$. En particulier $f$ est définie sur $\mathbb{R}$.

### Partie II

**1. a)** Pour $x \neq 0$, $f(x) = \frac{x}{x\left(\frac{e^x}{x} - 2\right)} = \frac{1}{\frac{e^x}{x} - 2}$. Quand $x \to +\infty$, $\frac{e^x}{x} \to +\infty$, donc $\lim_{x \to +\infty} f(x) = 0$. Quand $x \to -\infty$, $\frac{e^x}{x} \to 0$, donc $\lim_{x \to -\infty} f(x) = -\frac{1}{2}$.

**1. b)** L’axe des abscisses est asymptote horizontale à $(C)$ au voisinage de $+\infty$, et la droite $y = -\frac{1}{2}$ est asymptote horizontale au voisinage de $-\infty$.

**2. a)** $f'(x) = \frac{(e^x - 2x) - x(e^x - 2)}{(e^x - 2x)^2} = \frac{e^x - xe^x}{(e^x - 2x)^2} = \frac{(1 - x)e^x}{(e^x - 2x)^2}$.

**2. b)** $f'(x)$ a le signe de $1 - x$ : $f$ est croissante sur $]-\infty ; 1]$, de $-\frac{1}{2}$ à $f(1) = \frac{1}{e - 2}$, puis décroissante sur $[1 ; +\infty[$, vers $0$.

**2. c)** $f(0) = 0$ et $f'(0) = \frac{1 \times 1}{1} = 1$ : la tangente en $O$ a pour équation $y = x$.

**3.** Éléments pour le tracé (unité $1$ cm) : asymptotes $y = -\frac{1}{2}$ en $-\infty$ et $y = 0$ en $+\infty$, passage par $O$ avec la tangente $y = x$, maximum $\left(1 ; \frac{1}{e - 2}\right) \approx (1 ; 1{,}4)$. Quelques valeurs : $f(-3) \approx -0{,}50$, $f(-1) \approx -0{,}42$, $f(0{,}5) \approx 0{,}77$, $f(2) \approx 0{,}59$, $f(3) \approx 0{,}21$.

**4. a)** Pour $x \geq 0$ : $0 < e^x - 2x \leq e^x$, donc $\frac{x}{e^x} \leq \frac{x}{e^x - 2x}$, soit $xe^{-x} \leq f(x)$. Et $f(x) \leq f(1) = \frac{1}{e - 2}$, car $f(1)$ est le maximum de $f$.

**4. b)** On intègre par parties avec $u(x) = x$ et $v'(x) = e^{-x}$, donc $v(x) = -e^{-x}$ :

$$\int_0^1 xe^{-x}\,dx = \Big[-xe^{-x}\Big]_0^1 + \int_0^1 e^{-x}\,dx = -\frac{1}{e} + 1 - \frac{1}{e} = 1 - \frac{2}{e}$$

**4. c)** Sur $[0 ; 1]$, $f \geq 0$ et, avec une unité de $1$ cm, $A(E) = \int_0^1 f(x)\,dx$ cm². En intégrant l’encadrement de 4. a) sur $[0 ; 1]$ :

$$1 - \frac{2}{e} \leq A(E) \leq \frac{1}{e - 2}$$

### Partie III

**1.** $h$ est continue et strictement croissante sur $]-\infty ; 0]$ (inclus dans $]-\infty ; 1]$) : c’est une bijection de $]-\infty ; 0]$ sur $J = \left]-\frac{1}{2} ; 0\right]$, car $\lim_{x \to -\infty} h(x) = -\frac{1}{2}$ et $h(0) = 0$. Elle admet une fonction réciproque $h^{-1}$ définie sur $J$.

**2.** $(C_{h^{-1}})$ est la symétrique de la partie de $(C)$ située sur $]-\infty ; 0]$ par rapport à la droite $y = x$. Elle se termine en $O$, où sa tangente est encore $y = x$ (car $h'(0) = 1$), et admet la droite $x = -\frac{1}{2}$ pour asymptote verticale.

### Partie IV

**1.** Par récurrence : $u_0 = -2 \leq 0$ ; si $u_n \leq 0$, alors $u_{n+1} = h(u_n) \in \left]-\frac{1}{2} ; 0\right]$, donc $u_{n+1} \leq 0$.

**2.** Pour $x \leq 0$ :

$$h(x) - x = \frac{x(1 + 2x - e^x)}{e^x - 2x}$$

Posons $k(x) = 1 + 2x - e^x$ : $k'(x) = 2 - e^x > 0$ sur $]-\infty ; 0]$ et $k(0) = 0$, donc $k(x) \leq 0$. Comme $x \leq 0$ et $e^x - 2x > 0$, $h(x) - x \geq 0$. Avec $x = u_n$ : $u_{n+1} \geq u_n$, la suite est croissante.

**3.** La suite est croissante et majorée par $0$ : elle converge vers un réel $\ell \in [-2 ; 0]$. $h$ est continue, donc $h(\ell) = \ell$, soit $\ell \times k(\ell) = 0$. Or $k$ est strictement croissante sur $]-\infty ; 0]$ et ne s’annule qu’en $0$. Donc $\ell = 0$ : $\lim_{n \to +\infty} u_n = 0$.
