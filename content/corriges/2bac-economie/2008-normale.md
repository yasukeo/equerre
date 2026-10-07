---
summary: Deux intégrales dont une par parties, la lecture graphique d’une fonction et d’une droite, une suite arithmético-géométrique appliquée à un coût de production, l’étude de x − 1/ln x, et trois tirages avec remise parmi dix boules numérotées.
---

## Exercice 1 : calcul intégral (3 points)

**1. a)** Une primitive de $x \mapsto x^3$ sur $\mathbb{R}$ est $x \mapsto \frac{x^4}{4}$.

**1. b)** $I = \left[\frac{x^4}{4}\right]_1^2 = \frac{16}{4} - \frac{1}{4} = \frac{15}{4}$.

**2.** On intègre par parties avec $u(x) = \ln x$ et $v'(x) = x^3$, donc $u'(x) = \frac{1}{x}$ et $v(x) = \frac{x^4}{4}$ :

$$J = \left[\frac{x^4}{4}\ln x\right]_1^2 - \int_1^2 \frac{x^3}{4}\,dx = 4\ln 2 - \frac{1}{4}I = 4\ln 2 - \frac{15}{16}$$

## Exercice 2 : lecture graphique (2,5 points)

Les réponses se lisent sur le graphique : $(C)$ touche l’axe des abscisses en $-1$, le coupe en $2$, passe par $(0 ; -2)$ et a un creux en $(1 ; -4)$.

**1.** $g(x) \leq 0$ sur $\left[-\frac{5}{2} ; 2\right]$, avec $g(-1) = g(2) = 0$, et $g(x) > 0$ sur $\left]2 ; \frac{5}{2}\right]$.

**2.** $g$ admet un maximum relatif égal à $0$, atteint en $-1$, et un minimum relatif égal à $-4$, atteint en $1$.

**3.** $(C)$ et $(\Delta)$ se coupent en trois points : $(-2 ; -4)$, $(0 ; -2)$ et $(2 ; 0)$.

**4.** $g(x) \geq x - 2$ lorsque $(C)$ est au-dessus de $(\Delta)$ ou la rencontre. L’ensemble des solutions est $[-2 ; 0] \cup \left[2 ; \frac{5}{2}\right]$.

## Exercice 3 : suites numériques (4 points)

**1. a)** $v_{n+1} = u_{n+1} - 25 = \frac{1}{5}u_n + 20 - 25 = \frac{1}{5}(u_n - 25) = \frac{1}{5}v_n$. La suite $(v_n)$ est géométrique de raison $q = \frac{1}{5}$ et de premier terme $v_0 = 30 - 25 = 5$.

**1. b)** $v_n = 5\left(\frac{1}{5}\right)^n$, donc $u_n = v_n + 25 = 25 + 5\left(\frac{1}{5}\right)^n$.

**1. c)** Comme $0 < \frac{1}{5} < 1$, $\left(\frac{1}{5}\right)^n \to 0$ et $\lim_{n \to +\infty} u_n = 25$.

**2.** $u_n < 25{,}0016 \iff 5\left(\frac{1}{5}\right)^n < 0{,}0016 \iff \left(\frac{1}{5}\right)^n < 0{,}00032 \iff 5^n > 3125$. Or $3125 = 5^5$ : il faut $n \geq 6$. Pour $n = 5$, $u_5 = 25{,}0016$ exactement, ce qui n’est pas strictement inférieur. Le coût sera strictement inférieur à $25{,}0016$ millions de dirhams à partir de l’année $2007 + 6 = 2013$.

## Exercice 4 : étude d’une fonction (6,5 points)

**1.** Quand $x \to 0^+$, $\ln x \to -\infty$, donc $\frac{1}{\ln x} \to 0$ et $\lim_{x \to 0^+} f(x) = 0$.

**2.** Quand $x \to 1^+$, $\ln x \to 0^+$, donc $\frac{1}{\ln x} \to +\infty$ et $\lim_{x \to 1^+} f(x) = -\infty$. Quand $x \to 1^-$, $\ln x \to 0^-$, donc $\lim_{x \to 1^-} f(x) = +\infty$. La droite $x = 1$ est asymptote verticale à $(C)$.

**3.** Quand $x \to +\infty$, $\frac{1}{\ln x} \to 0$, donc $\lim_{x \to +\infty} f(x) = +\infty$ et $\lim_{x \to +\infty}\big(f(x) - x\big) = \lim_{x \to +\infty}\left(-\frac{1}{\ln x}\right) = 0$. La droite $y = x$ est asymptote oblique à $(C)$ au voisinage de $+\infty$.

**4. a)** La dérivée de $\frac{1}{\ln x}$ est $-\frac{\frac{1}{x}}{(\ln x)^2}$, donc $f'(x) = 1 + \frac{1}{x(\ln x)^2}$.

**4. b)** Pour $x \in D$, $x(\ln x)^2 > 0$, donc $f'(x) > 0$ : $f$ est strictement croissante sur $]0 ; 1[$ et sur $]1 ; +\infty[$.

**5.** $f$ est continue et strictement croissante sur $\left[\frac{3}{2} ; 2\right]$, inclus dans $]1 ; +\infty[$. $f\left(\frac{3}{2}\right) = \frac{3}{2} - \frac{1}{\ln 1{,}5} \approx -0{,}97 < 0$ et $f(2) = 2 - \frac{1}{\ln 2} \approx 0{,}56 > 0$. D’après le théorème des valeurs intermédiaires, il existe un unique $\alpha \in \left]\frac{3}{2} ; 2\right[$ tel que $f(\alpha) = 0$ ($\alpha \approx 1{,}76$).

## Exercice 5 : probabilités (4 points)

**1.** Chaque tirage offre $10$ possibilités et l’on remet la boule : il y a $10^3 = 1000$ tirages possibles, tous équiprobables.

**2.** Il y a $5$ numéros pairs : $5^3 = 125$ tirages ne donnent que des numéros pairs. La probabilité est $\frac{125}{1000} = \frac{1}{8}$.

**3.** « Au moins un numéro impair » est l’événement contraire : sa probabilité est $1 - \frac{1}{8} = \frac{7}{8}$.

**4.** On se place parmi les $125$ tirages dont les trois numéros sont pairs (dans $\{2, 4, 6, 8, 10\}$). Les sommes égales à $24$ s’obtiennent avec $\{10, 10, 4\}$ ($3$ ordres), $\{10, 8, 6\}$ ($6$ ordres) et $\{8, 8, 8\}$ ($1$ ordre), soit $10$ tirages. La probabilité cherchée est $\frac{10}{125} = \frac{2}{25}$.
