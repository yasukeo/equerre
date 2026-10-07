---
summary: Une suite arithmético-géométrique de limite 1/2, l’étude de (x − 1)²eˣ avec une primitive donnée, une aire et une équation résolue graphiquement, et deux tirages successifs sans remise avec une loi de probabilité.
---

## Exercice 1 : suites numériques (5 points)

**1.** $u_1 = \frac{1}{2} + \frac{1}{4} = \frac{3}{4}$ et $u_2 = \frac{3}{8} + \frac{1}{4} = \frac{5}{8}$.

**2.** $u_{n+1} - \frac{1}{2} = \frac{1}{2}u_n - \frac{1}{4} = \frac{1}{2}\left(u_n - \frac{1}{2}\right)$. Par récurrence : $u_0 = 1 > \frac{1}{2}$ ; si $u_n > \frac{1}{2}$, alors $u_{n+1} - \frac{1}{2} > 0$.

**3. a)** $u_{n+1} - u_n = -\frac{1}{2}u_n + \frac{1}{4} = -\frac{1}{2}\left(u_n - \frac{1}{2}\right)$.

**3. b)** Comme $u_n > \frac{1}{2}$, $u_{n+1} - u_n < 0$ : la suite est décroissante. Elle est minorée par $\frac{1}{2}$, donc elle converge.

**4. a)** $v_0 = 1 - \frac{1}{2} = \frac{1}{2}$.

**4. b)** D’après 2., $v_{n+1} = \frac{1}{2}v_n$ : $(v_n)$ est géométrique de raison $q = \frac{1}{2}$.

**4. c)** $v_n = \frac{1}{2}\left(\frac{1}{2}\right)^n$, donc $u_n = \frac{1}{2} + v_n = \frac{1}{2}\left(1 + \left(\frac{1}{2}\right)^n\right)$.

**4. d)** $\left(\frac{1}{2}\right)^n \to 0$, donc $\lim_{n \to +\infty} u_n = \frac{1}{2}$.

## Exercice 2 : étude d’une fonction (10,5 points)

**1. a)** Quand $x \to +\infty$, $(x - 1)^2 \to +\infty$ et $e^x \to +\infty$ : $\lim_{x \to +\infty} f(x) = +\infty$.

**1. b)** $\frac{f(x)}{x} = \frac{(x - 1)^2}{x}\,e^x$, et $\frac{(x - 1)^2}{x} = x - 2 + \frac{1}{x} \to +\infty$ : $\lim_{x \to +\infty} \frac{f(x)}{x} = +\infty$. $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**1. c)** Pour $x \neq 0$, $\left(\frac{x - 1}{x}\right)^2 x^2e^x = (x - 1)^2e^x = f(x)$.

**1. d)** Quand $x \to -\infty$, $\left(\frac{x - 1}{x}\right)^2 \to 1$ et $x^2e^x \to 0$ : $\lim_{x \to -\infty} f(x) = 0$. L’axe des abscisses est asymptote horizontale à $(C)$ au voisinage de $-\infty$.

**2. a)** $f'(x) = 2(x - 1)e^x + (x - 1)^2e^x = (x - 1)(2 + x - 1)e^x = (x - 1)(x + 1)e^x = (x^2 - 1)e^x$.

**2. b)** $f'(x)$ a le signe de $x^2 - 1$ : positif sur $]-\infty ; -1[$ et sur $]1 ; +\infty[$, négatif sur $]-1 ; 1[$. $f(-1) = 4e^{-1} = \frac{4}{e}$ et $f(1) = 0$. $f$ croît de $0$ (en $-\infty$) à $\frac{4}{e}$, décroît jusqu’à $0$, puis croît jusqu’à $+\infty$.

**3.** $F'(x) = (2x - 4)e^x + (x^2 - 4x + 5)e^x = (x^2 - 2x + 1)e^x = (x - 1)^2e^x = f(x)$ : $F$ est une primitive de $f$ sur $\mathbb{R}$.

**4. a)** Le domaine hachuré est limité par $(C)$, l’axe des abscisses et les droites $x = -1$ et $x = 1$. Comme $f \geq 0$, son aire vaut :

$$\int_{-1}^1 f(x)\,dx = F(1) - F(-1) = 2e - 10e^{-1} = 2e - \frac{10}{e}$$

en unités d’aire, soit environ $1{,}76$.

**4. b)** Le maximum local $\frac{4}{e} \approx 1{,}47$ est supérieur à $1$. La droite $y = 1$ coupe donc $(C)$ une fois sur $]-\infty ; -1[$, une fois sur $]-1 ; 1[$ (en $0$, car $f(0) = 1$) et une fois sur $]1 ; +\infty[$. L’équation $f(x) = 1$ a trois solutions.

## Exercice 3 : probabilités (4,5 points)

Le sac contient $3$ boules rouges, $4$ vertes et $2$ blanches. On tire successivement sans remise deux boules.

**1.** Il y a $9$ choix pour la première boule et $8$ pour la seconde : $9 \times 8 = 72$ tirages possibles.

**2. a)** $A$ : $2$ choix de boule blanche, puis $8$ choix : $p(A) = \frac{2 \times 8}{72} = \frac{2}{9}$.

**2. b)** $B$ : deux rouges, deux vertes ou deux blanches, $3 \times 2 + 4 \times 3 + 2 \times 1 = 20$ tirages, donc $p(B) = \frac{20}{72} = \frac{5}{18}$ et $p(\overline{B}) = 1 - \frac{5}{18} = \frac{13}{18}$.

**3.** Si la première boule est blanche, il reste $8$ boules dont $1$ blanche : les deux boules sont de couleurs différentes si la seconde n’est pas blanche. La probabilité est $\frac{7}{8}$.

**4.** $p(X = 0) = \frac{7 \times 6}{72} = \frac{7}{12}$ ; $p(X = 1) = \frac{2 \times 7 + 7 \times 2}{72} = \frac{7}{18}$ (blanche puis autre, ou autre puis blanche) ; $p(X = 2) = \frac{2 \times 1}{72} = \frac{1}{36}$. On vérifie : $42 + 28 + 2 = 72$.
