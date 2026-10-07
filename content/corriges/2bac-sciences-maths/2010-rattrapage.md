---
summary: Structures algébriques (un groupe de matrices isomorphe à (ℝ, +)), nombres complexes (cercle de diamètre [AB]), probabilités (tirages sans remise, espérance et variance) et un problème d’analyse (la fonction 1/(1 − ln(1 − x)), des intégrales et une série).
---

## Exercice 1 : structures algébriques (3 points)

**1.** On calcule $M(x) \times M(y)$ : la première ligne reste $(1, 0, 0)$, la deuxième vaut $(x + y, 1, 0)$ et la troisième $\left(x^2 + 2xy + y^2, 2x + 2y, 1\right)$. Donc $M(x) \times M(y) = M(x + y)$ : $E$ est stable pour la multiplication.

**2. a)** $\varphi(x + y) = \varphi(x) \times \varphi(y)$, et $\varphi$ est bijective (surjective par définition de $E$, injective grâce au coefficient $x$). C’est un isomorphisme de $(\mathbb{R}, +)$ sur $(E, \times)$.

**2. b)** $(E, \times)$ est l’image du groupe commutatif $(\mathbb{R}, +)$ par un isomorphisme : c’est un groupe commutatif, de neutre $M(0) = I$.

**2. c)** $M(x) \times M(-x) = M(0) = I$, donc $M(x)^{-1} = M(-x)$.

**2. d)** $A^5 = M(10)$. Pour $X = M(t)$, l’équation devient $M(10 + t) = M(12)$, soit $t = 2$. L’unique solution est $X = M(2) = A$.

**3.** $x \mapsto \ln x$ est une bijection de $\mathbb{R}_+^*$ sur $\mathbb{R}$ : $F = \{M(t) \mid t \in \mathbb{R}\} = E$. C’est donc un sous-groupe de $(E, \times)$, et même $E$ tout entier.

## Exercice 2 : nombres complexes (4 points)

**1. a)** $a^2 = 1 - (2 - \sqrt{3})^2 + 2i(2 - \sqrt{3}) = -6 + 4\sqrt{3} + i(4 - 2\sqrt{3})$ et $-4ia = 8 - 4\sqrt{3} - 4i$. Donc $a^2 - 4ia - 2 + 2i\sqrt{3} = 0$.

**1. b)** La somme des racines vaut $4i$ : $b = 4i - a = -1 + i(2 + \sqrt{3})$.

**2. a)** $4(2 - \sqrt{3})\,e^{i\frac{\pi}{6}} = 2(2 - \sqrt{3})(\sqrt{3} + i) = 4\sqrt{3} - 6 + i(4 - 2\sqrt{3}) = a^2$.

**2. b)** $|a|^2 = 4(2 - \sqrt{3})$, donc $|a| = 2\sqrt{2 - \sqrt{3}} = \sqrt{6} - \sqrt{2}$, puisque $(\sqrt{6} - \sqrt{2})^2 = 8 - 4\sqrt{3}$. Et $2\arg a \equiv \frac{\pi}{6} \; [2\pi]$ ; comme $a$ a ses parties réelle et imaginaire positives, $\arg a = \frac{\pi}{12}$. Donc :

$$a = (\sqrt{6} - \sqrt{2})\left(\cos\frac{\pi}{12} + i\sin\frac{\pi}{12}\right)$$

**3. a)** $\omega = \frac{a + b}{2} = 2i$.

**3. b)** Le rayon vaut $|a - \omega| = |1 - i\sqrt{3}| = 2$. Or $|0 - \omega| = 2$ et $|c - \omega| = \left|2e^{i\frac{\pi}{7}}\right| = 2$ : $O$ et $C$ appartiennent à $(\Gamma)$.

**3. c)** Posons $u = e^{i\frac{\pi}{7}}$ et $v = e^{-i\frac{\pi}{3}}$ : $a - \omega = 2v$ et $b - \omega = -2v$, donc $c - a = 2(u - v)$ et $c - b = 2(u + v)$, non nuls. Comme $|u| = |v| = 1$ :

$$\overline{\left(\frac{u - v}{u + v}\right)} = \frac{\frac{1}{u} - \frac{1}{v}}{\frac{1}{u} + \frac{1}{v}} = \frac{v - u}{v + u} = -\frac{u - v}{u + v}$$

Le nombre $\frac{c - a}{c - b} = \frac{u - v}{u + v}$ est égal à l’opposé de son conjugué : il est imaginaire pur. Le point $C$ voit $[AB]$ sous un angle droit.

## Exercice 3 : probabilités (3 points)

**1. a)** Il n’y a que $2$ boules rouges : on obtient une blanche au plus tard au troisième tirage. $X$ prend les valeurs $1$, $2$ et $3$.

**1. b)** $p(X = 1) = \frac{10}{12} = \frac{5}{6}$.

**1. c)** $p(X = 2) = \frac{2}{12} \times \frac{10}{11} = \frac{5}{33}$.

**1. d)** $p(X = 3) = \frac{2}{12} \times \frac{1}{11} \times \frac{10}{10} = \frac{1}{66}$. On vérifie : $\frac{55}{66} + \frac{10}{66} + \frac{1}{66} = 1$.

**2. a)** $E(X) = 1 \times \frac{55}{66} + 2 \times \frac{10}{66} + 3 \times \frac{1}{66} = \frac{78}{66} = \frac{13}{11}$.

**2. b)** $E(X^2) = \frac{55 + 40 + 9}{66} = \frac{52}{33}$, et :

$$V(X) = E(X^2) - E(X)^2 = \frac{52}{33} - \frac{169}{121} = \frac{572 - 507}{363} = \frac{65}{363}$$

## Problème : analyse (10 points)

### Partie I

Notons $D(x) = 1 - \ln(1 - x)$ pour $x \in [0 ; 1[$ : $D(x) \geq 1$ et $D'(x) = \frac{1}{1 - x}$.

**1.** Quand $x \to 1^-$, $\ln(1 - x) \to -\infty$, donc $D(x) \to +\infty$ et $f(x) \to 0 = f(1)$ : $f$ est continue à gauche en $1$.

**2.** Avec $h = 1 - x \to 0^+$ : $\frac{f(x) - f(1)}{x - 1} = \frac{1}{-h(1 - \ln h)} = \frac{1}{-h + h\ln h}$. Le dénominateur tend vers $0^-$, donc le quotient tend vers $-\infty$ : $f$ n’est pas dérivable à gauche en $1$, et $(C)$ y admet une demi-tangente verticale.

**3.** $f'(x) = -\frac{D'(x)}{D(x)^2} = \frac{-1}{(1 - x)D(x)^2} < 0$ : $f$ est strictement décroissante sur $[0 ; 1]$, de $f(0) = 1$ à $f(1) = 0$.

**4. a)** $f'(x) = -\frac{1}{g(x)}$ avec $g(x) = (1 - x)D(x)^2$, et $g'(x) = -D^2 + 2(1 - x)DD' = D(2 - D)$. Donc $f''(x) = \frac{g'(x)}{g(x)^2} = \frac{2 - D(x)}{(1 - x)^2D(x)^3}$, du signe de $2 - D(x) = 1 + \ln(1 - x)$. Il est positif pour $x < 1 - \frac{1}{e}$ et négatif après : $(C)$ a un unique point d’inflexion, d’abscisse $\frac{e - 1}{e}$ et d’ordonnée $f\left(\frac{e - 1}{e}\right) = \frac{1}{2}$.

**4. b)** $f'(0) = -1$ : la demi-tangente au point $(0 ; 1)$ a pour équation $y = 1 - x$. Éléments pour le tracé : $(C)$ descend de $(0 ; 1)$ à $(1 ; 0)$, convexe puis concave, avec l’inflexion $\left(\frac{e - 1}{e} ; \frac{1}{2}\right) \approx (0{,}63 ; 0{,}5)$ et une demi-tangente verticale en $(1 ; 0)$.

**5.** $x \mapsto f(x) - x$ est continue et strictement décroissante sur $[0 ; 1]$, vaut $1$ en $0$ et $-1$ en $1$ : elle s’annule une seule fois, en $\alpha$.

**6. a)** $f$ est continue et strictement décroissante sur $[0 ; 1]$ : c’est une bijection de $I$ sur $[f(1) ; f(0)] = [0 ; 1] = I$.

**6. b)** Pour $y \in ]0 ; 1]$ : $f(x) = y \iff 1 - \ln(1 - x) = \frac{1}{y} \iff x = 1 - e^{1 - \frac{1}{y}}$. Donc $f^{-1}(x) = 1 - e^{1 - \frac{1}{x}}$ pour $x \in ]0 ; 1]$, et $f^{-1}(0) = 1$.

### Partie II

**1.** $I_{n+1} - I_n = \int_0^1 t^n(t - 1)f(t)\,dt \leq 0$, car $t^n(t - 1) \leq 0$ et $f \geq 0$ sur $[0 ; 1]$. La suite est décroissante et minorée par $0$ : elle converge.

**2.** $0 \leq f \leq 1$, donc $0 \leq t^nf(t) \leq t^n$ et $0 \leq I_n \leq \frac{1}{n + 1}$. Par encadrement, $\lim_{n \to +\infty} I_n = 0$.

### Partie III

**1.** $S_n(x) = \int_0^x (1 + t + \cdots + t^n)f(t)\,dt = \int_0^x \frac{1 - t^{n+1}}{1 - t}f(t)\,dt$, donc $F(x) - S_n(x) = \int_0^x \frac{t^{n+1}f(t)}{1 - t}\,dt$.

**2. a)** $\psi(x) = (1 - x)D(x)$ a pour dérivée $-D(x) + (1 - x)D'(x) = -D(x) + 1 = \ln(1 - x)$, strictement négative sur $]0 ; 1[$ : $\psi$ est strictement décroissante sur $J$.

**2. b)** $\frac{f(t)}{1 - t} = \frac{1}{\psi(t)}$, et $\psi$ est strictement positive et strictement décroissante : $t \mapsto \frac{f(t)}{1 - t}$ est strictement croissante sur $[0 ; x]$.

**3. a)** Pour $t \in [0 ; x]$ : $0 \leq \frac{f(t)}{1 - t} \leq \frac{f(x)}{1 - x} \leq \frac{1}{1 - x}$, car $f \leq 1$. Donc :

$$0 \leq F(x) - S_n(x) \leq \frac{1}{1 - x}\int_0^x t^{n+1}\,dt = \frac{x^{n+2}}{(n + 2)(1 - x)} \leq \frac{1}{n + 2}\left(\frac{1}{1 - x}\right)$$

**3. b)** Pour $x$ fixé, le majorant tend vers $0$ : $\lim_{n \to +\infty} S_n(x) = F(x)$.

**4. a)** Avec $u = 1 - \ln(1 - t)$, $du = \frac{dt}{1 - t}$, et $u$ va de $1$ à $D(x)$ :

$$F(x) = \int_0^x \frac{dt}{(1 - t)\big(1 - \ln(1 - t)\big)} = \int_1^{D(x)} \frac{du}{u} = \ln\big(1 - \ln(1 - x)\big)$$

**4. b)** $D(x) \to +\infty$ quand $x \to 1^-$, donc $\lim_{x \to 1^-} F(x) = +\infty$.
