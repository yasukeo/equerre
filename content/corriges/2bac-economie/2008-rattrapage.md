---
summary: La lecture d’un tableau de variations, une suite homographique rendue géométrique, l’étude de x² − 2x eˣ + 2eˣ avec une intégration par parties et une aire, et un tirage simultané de trois boules numérotées.
---

## Exercice 1 : lecture d’un tableau de variations (2,5 points)

D’après le tableau : sur $]-\infty ; 0[$, $f$ décroît de $+\infty$ à $f(-3) = 2$ puis croît vers $+\infty$ ; sur $]0 ; +\infty[$, elle décroît de $+\infty$ à $f(2) = -2$ en s’annulant en $1$, puis croît vers $+\infty$ en s’annulant en $3$.

**1.** Sur $]-\infty ; 0[$, $f(x) \geq 2$ : pas de solution. Sur $]0 ; +\infty[$, $f$ s’annule en $1$ et en $3$. L’ensemble des solutions est $\{1 ; 3\}$.

**2.** Sur $]-\infty ; 0[$, $f(x) \geq 2 > 0$. Sur $]0 ; +\infty[$, $f(x) \leq 0$ exactement entre les deux zéros. L’ensemble des solutions est $[1 ; 3]$.

**3.** $f$ est continue et strictement décroissante sur $]0 ; 2]$, de $+\infty$ (en $0^+$) à $f(2) = -2$ : $f(]0 ; 2]) = [-2 ; +\infty[$.

## Exercice 2 : suites numériques (4 points)

Par récurrence, $u_n \geq 0$ pour tout $n$ (car $5u_n + 4 > 0$ et $u_n + 2 > 0$), donc $u_n + 1 \neq 0$ et $v_n$ est bien défini.

**1. a)** $u_{n+1} - 4 = \frac{5u_n + 4 - 4u_n - 8}{u_n + 2} = \frac{u_n - 4}{u_n + 2}$ et $u_{n+1} + 1 = \frac{6u_n + 6}{u_n + 2} = \frac{6(u_n + 1)}{u_n + 2}$. Donc :

$$v_{n+1} = \frac{u_n - 4}{6(u_n + 1)} = \frac{1}{6}v_n$$

$(v_n)$ est géométrique de raison $q = \frac{1}{6}$ et de premier terme $v_0 = \frac{0 - 4}{0 + 1} = -4$.

**1. b)** $v_n = -4\left(\frac{1}{6}\right)^n$.

**2. a)** $v_n(u_n + 1) = u_n - 4$ donne $u_n(1 - v_n) = 4 + v_n$. Comme $v_n < 0$, $1 - v_n \neq 0$ et $u_n = \frac{4 + v_n}{1 - v_n}$.

**2. b)** En remplaçant $v_n$ :

$$u_n = \frac{4 - 4\left(\frac{1}{6}\right)^n}{1 + 4\left(\frac{1}{6}\right)^n} = \frac{4\left(1 - \left(\frac{1}{6}\right)^n\right)}{1 + 4\left(\frac{1}{6}\right)^n}$$

**2. c)** $\left(\frac{1}{6}\right)^n \to 0$, donc $\lim_{n \to +\infty} u_n = \frac{4 \times 1}{1} = 4$.

## Exercice 3 : étude d’une fonction (9,5 points)

**1. a)** Quand $x \to -\infty$, $xe^x \to 0$, $e^x \to 0$ et $x^2 \to +\infty$ : $\lim_{x \to -\infty} f(x) = +\infty$.

**1. b)** Pour $x \neq 0$ : $x^2\left(1 + 2(1 - x)\frac{e^x}{x^2}\right) = x^2 + 2(1 - x)e^x = x^2 - 2xe^x + 2e^x = f(x)$.

**1. c)** Quand $x \to +\infty$, $\frac{e^x}{x^2} \to +\infty$ et $1 - x \to -\infty$, donc le facteur entre parenthèses tend vers $-\infty$ et $\lim_{x \to +\infty} f(x) = -\infty$. De même $\frac{f(x)}{x} = x\left(1 + 2(1 - x)\frac{e^x}{x^2}\right) \to -\infty$ : $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**2. a)** $f'(x) = 2x - 2e^x - 2xe^x + 2e^x = 2x - 2xe^x = -2x(e^x - 1)$.

**2. b)** $x$ et $e^x - 1$ ont le même signe (tous deux négatifs pour $x < 0$, positifs pour $x > 0$) : $x(e^x - 1) \geq 0$, et ne s’annule qu’en $0$. Donc $f'(x) \leq 0$, avec égalité seulement en $0$ : $f$ est strictement décroissante sur $\mathbb{R}$.

**3. a)** On intègre par parties avec $u(x) = x$ et $v'(x) = e^x$ :

$$\int_0^1 xe^x\,dx = \Big[xe^x\Big]_0^1 - \int_0^1 e^x\,dx = e - (e - 1) = 1$$

**3. b)** Le domaine hachuré est limité par $(C)$, l’axe des abscisses et les droites $x = 0$ et $x = 1$. Sur $[0 ; 1]$, $f$ décroît de $f(0) = 2$ à $f(1) = 1$, donc $f > 0$. L’aire vaut :

$$A = \int_0^1 x^2\,dx - 2\int_0^1 xe^x\,dx + 2\int_0^1 e^x\,dx = \frac{1}{3} - 2 + 2(e - 1) = 2e - \frac{11}{3}$$

en unités d’aire, soit environ $1{,}77$.

## Exercice 4 : probabilités (4 points)

Le sac contient trois boules « 1 », trois « 2 », trois « 3 » et une « 4 ». On tire simultanément $3$ boules : $\binom{10}{3} = 120$ tirages équiprobables.

**1. a)** Il y a $3$ boules « 1 » et $7$ autres : $X$ prend les valeurs $0$, $1$, $2$ et $3$.

**1. b)** $p(X = k) = \frac{\binom{3}{k}\binom{7}{3 - k}}{120}$, d’où :

$p(X = 0) = \frac{35}{120} = \frac{7}{24}$, $p(X = 1) = \frac{3 \times 21}{120} = \frac{21}{40}$, $p(X = 2) = \frac{3 \times 7}{120} = \frac{7}{40}$, $p(X = 3) = \frac{1}{120}$. On vérifie : $35 + 63 + 21 + 1 = 120$.

**2.** Les boules portant un nombre pair sont les trois « 2 » et la « 4 », soit $4$ boules. On choisit une boule « 1 » parmi $3$ et deux boules paires parmi $4$ : $3 \times \binom{4}{2} = 18$ tirages. La probabilité est $\frac{18}{120} = \frac{3}{20}$.
