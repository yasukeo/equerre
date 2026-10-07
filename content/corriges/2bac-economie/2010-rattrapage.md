---
summary: Deux intégrales dont une par parties, une suite arithmético-géométrique, l’étude de x² + 2x − 2eˣ avec une fonction auxiliaire et un point d’inflexion à tangente horizontale, et deux lancers d’un dé aux faces 1, 1, 1, 2, 2, 3.
---

## Exercice 1 : calcul intégral (2,5 points)

**1. a)** $\frac{(x + 1)^2}{x^2 + 1} = \frac{x^2 + 1 + 2x}{x^2 + 1} = 1 + \frac{2x}{x^2 + 1}$.

**1. b)** $\frac{2x}{x^2 + 1}$ est de la forme $\frac{u'}{u}$ avec $u(x) = x^2 + 1 > 0$. Donc :

$$\int_0^1 \frac{(x + 1)^2}{x^2 + 1}\,dx = \Big[x + \ln(x^2 + 1)\Big]_0^1 = 1 + \ln 2$$

**2. a)** On intègre par parties avec $u(x) = x$ et $v'(x) = e^x$ :

$$\int_0^1 xe^x\,dx = \Big[xe^x\Big]_0^1 - \int_0^1 e^x\,dx = e - (e - 1) = 1$$

**2. b)** $(x - e^{-2x})e^x = xe^x - e^{-x}$, donc :

$$\int_0^1 (x - e^{-2x})e^x\,dx = 1 - \Big[-e^{-x}\Big]_0^1 = 1 - \left(1 - \frac{1}{e}\right) = \frac{1}{e}$$

## Exercice 2 : suites numériques (4 points)

**1.** $u_{n+1} - 1 = \frac{5}{6}u_n + \frac{1}{6} - 1 = \frac{5}{6}(u_n - 1)$. Par récurrence : $u_0 = 2 > 1$ ; si $u_n > 1$, alors $u_{n+1} - 1 = \frac{5}{6}(u_n - 1) > 0$.

**2.** $u_{n+1} - u_n = -\frac{1}{6}u_n + \frac{1}{6} = -\frac{1}{6}(u_n - 1) < 0$ : la suite est décroissante. Elle est minorée par $1$, donc elle converge.

**3. a)** $v_{n+1} = u_{n+1} - 1 = \frac{5}{6}(u_n - 1) = \frac{5}{6}v_n$ : $(v_n)$ est géométrique de raison $\frac{5}{6}$ et de premier terme $v_0 = 2 - 1 = 1$.

**3. b)** Donc $v_n = 1 \times \left(\frac{5}{6}\right)^n = \left(\frac{5}{6}\right)^n$.

**4. a)** $u_n = v_n + 1 = 1 + \left(\frac{5}{6}\right)^n$.

**4. b)** Comme $0 < \frac{5}{6} < 1$, $\left(\frac{5}{6}\right)^n \to 0$ et $\lim_{n \to +\infty} u_n = 1$.

## Exercice 3 : étude de fonctions (9,5 points)

### Partie I

**1.** $h'(x) = 1 - e^x$ : positive sur $]-\infty ; 0[$, négative sur $]0 ; +\infty[$. $h$ est croissante sur $]-\infty ; 0]$ et décroissante sur $[0 ; +\infty[$, avec un maximum $h(0) = 0 + 1 - 1 = 0$.

**2.** Le maximum de $h$ vaut $0$ : $h(x) \leq 0$ pour tout $x \in \mathbb{R}$.

### Partie II

**1. a)** Quand $x \to -\infty$, $x^2 + 2x \to +\infty$ et $e^x \to 0$ : $\lim_{x \to -\infty} f(x) = +\infty$. Et $\frac{f(x)}{x} = x + 2 - \frac{2e^x}{x} \to -\infty$. $(C_f)$ admet en $-\infty$ une branche parabolique de direction l’axe des ordonnées.

**1. b)** Pour $x > 0$, $f(x) = e^x\left(\frac{x^2}{e^x} + \frac{2x}{e^x} - 2\right)$, et la parenthèse tend vers $-2$ : $\lim_{x \to +\infty} f(x) = -\infty$. De plus $\frac{f(x)}{x} = x\left(1 + \frac{2}{x} - \frac{2e^x}{x^2}\right) \to -\infty$, car $\frac{e^x}{x^2} \to +\infty$. $(C_f)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**2.** $f'(x) = 2x + 2 - 2e^x = 2h(x)$. Comme $h \leq 0$ et ne s’annule qu’en $0$, $f$ est strictement décroissante sur $\mathbb{R}$, de $+\infty$ à $-\infty$, avec $f(0) = -2$.

**3. a)** $f$ est continue et strictement décroissante de $\mathbb{R}$ sur $\mathbb{R}$ : l’équation $f(x) = 0$ a une unique solution $\alpha$. $f(-2{,}2) = 0{,}44 - 2e^{-2{,}2} \approx 0{,}22 > 0$ et $f(-2) = -2e^{-2} \approx -0{,}27 < 0$, donc $\alpha \in ]-2{,}2 ; -2[$.

**3. b)** $f''(x) = 2h'(x) = 2(1 - e^x)$ s’annule en $0$ en changeant de signe : $(C_f)$ admet un point d’inflexion $I$ d’abscisse $0$, soit $I(0 ; -2)$.

**3. c)** $f'(0) = 2h(0) = 0$ : la tangente $(T)$ en $I$ est horizontale, d’équation $y = -2$.

**3. d)** Éléments pour le tracé : $(C_f)$ descend de $+\infty$, coupe l’axe des abscisses en $\alpha \approx -2{,}11$, traverse sa tangente horizontale $y = -2$ en $I(0 ; -2)$, puis plonge vers $-\infty$. Quelques valeurs : $f(-4) \approx 7{,}96$, $f(-3) \approx 2{,}90$, $f(-1) \approx -1{,}74$, $f(1) = 3 - 2e \approx -2{,}44$, $f(2) \approx -6{,}78$.

## Exercice 4 : probabilités (4 points)

Le dé est équilibré : chaque face a la probabilité $\frac{1}{6}$, donc $p(1) = \frac{1}{2}$, $p(2) = \frac{1}{3}$ et $p(3) = \frac{1}{6}$. Les deux lancers sont indépendants.

**1. a)** $p(A) = \frac{1}{6} \times \frac{1}{6} = \frac{1}{36}$.

**1. b)** Le plus grand produit possible est $3 \times 3 = 9$, et le suivant est $3 \times 2 = 6$. Le produit dépasse donc $6$ seulement si l’on obtient deux fois $3$ : $B$ est l’événement contraire de $A$, et $p(B) = 1 - \frac{1}{36} = \frac{35}{36}$.

**2. a)** $X$ prend les valeurs $0$, $1$ et $2$.

**2. b)** $X$ suit la loi binomiale de paramètres $2$ et $\frac{1}{6}$ :

$p(X = 0) = \left(\frac{5}{6}\right)^2 = \frac{25}{36}$, $p(X = 1) = 2 \times \frac{1}{6} \times \frac{5}{6} = \frac{10}{36}$, $p(X = 2) = \frac{1}{36}$.

**2. c)** $E(X) = 0 \times \frac{25}{36} + 1 \times \frac{10}{36} + 2 \times \frac{1}{36} = \frac{12}{36} = \frac{1}{3}$.
