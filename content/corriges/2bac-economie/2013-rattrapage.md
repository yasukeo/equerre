---
summary: Une suite homographique rendue géométrique, deux intégrales et l’aire sous une courbe donnée, l’étude du signe de (x ln x)² + 3x² − 3 par sa dérivée, et un tirage de deux boules numérotées avec une question d’indépendance.
---

## Exercice 1 : suites numériques (5 points)

**1.** $u_1 = \frac{-8}{3 - 6} = \frac{8}{3}$ et $u_2 = \frac{-8}{\frac{8}{3} - 6} = \frac{-8}{-\frac{10}{3}} = \frac{12}{5}$.

**2. a)** $v_0 = \frac{3 - 2}{3 - 4} = -1$. On calcule :

$$u_{n+1} - 2 = \frac{-8 - 2u_n + 12}{u_n - 6} = \frac{-2(u_n - 2)}{u_n - 6} \qquad u_{n+1} - 4 = \frac{-8 - 4u_n + 24}{u_n - 6} = \frac{-4(u_n - 4)}{u_n - 6}$$

Donc $v_{n+1} = \frac{-2(u_n - 2)}{-4(u_n - 4)} = \frac{1}{2}v_n$ : $(v_n)$ est géométrique de raison $q = \frac{1}{2}$.

**2. b)** $v_n = -\left(\frac{1}{2}\right)^n$.

**2. c)** $v_n(u_n - 4) = u_n - 2$ donne $u_n(v_n - 1) = 4v_n - 2$. Comme $v_n < 0$, $v_n - 1 \neq 0$ et $u_n = \frac{4v_n - 2}{v_n - 1}$.

**2. d)** En remplaçant $v_n$ puis en multipliant numérateur et dénominateur par $-1$ :

$$u_n = \frac{-4\left(\frac{1}{2}\right)^n - 2}{-\left(\frac{1}{2}\right)^n - 1} = \frac{4\left(\frac{1}{2}\right)^n + 2}{\left(\frac{1}{2}\right)^n + 1}$$

**2. e)** $\left(\frac{1}{2}\right)^n \to 0$, donc $\lim_{n \to +\infty} u_n = \frac{2}{1} = 2$.

## Exercice 2 : calcul intégral (3 points)

**1. a)** $3 - \frac{1}{x} = \frac{3x - 1}{x}$. Donc :

$$I = \int_1^e \left(3 - \frac{1}{x}\right)dx = \Big[3x - \ln x\Big]_1^e = (3e - 1) - 3 = 3e - 4$$

**1. b)** On intègre par parties avec $u(x) = \ln x$ et $v'(x) = 1$, donc $v(x) = x$ :

$$J = \Big[x\ln x\Big]_1^e - \int_1^e 1\,dx = e - (e - 1) = 1$$

**2.** Le domaine hachuré est limité par $(C_g)$, l’axe des abscisses et les droites $x = 1$ et $x = e$, où $(C_g)$ est au-dessus de l’axe. Son aire vaut :

$$\int_1^e g(x)\,dx = I - J = 3e - 5$$

en unités d’aire, soit environ $3{,}15$.

## Exercice 3 : étude d’une fonction (8 points)

**1. a)** Quand $x \to +\infty$, $(x\ln x)^2 \to +\infty$ et $3x^2 \to +\infty$ : $\lim_{x \to +\infty} f(x) = +\infty$.

**1. b)** Quand $x \to 0^+$, $x\ln x \to 0$ et $3x^2 \to 0$ : $\lim_{x \to 0^+} f(x) = -3$.

**2. a)** La dérivée de $x\ln x$ est $\ln x + 1$, donc :

$$f'(x) = 2x\ln x(\ln x + 1) + 6x = 2x\left((\ln x)^2 + \ln x + 3\right)$$

Or $\left(\frac{1}{2} + \ln x\right)^2 + \frac{11}{4} = (\ln x)^2 + \ln x + \frac{1}{4} + \frac{11}{4} = (\ln x)^2 + \ln x + 3$. Donc $f'(x) = 2x\left(\left(\frac{1}{2} + \ln x\right)^2 + \frac{11}{4}\right)$.

**2. b)** Pour $x > 0$, $2x > 0$ et la parenthèse est au moins $\frac{11}{4}$ : $f'(x) > 0$.

**2. c)** $f$ est strictement croissante sur $]0 ; +\infty[$, de $-3$ (en $0^+$) à $+\infty$.

**2. d)** $f(1) = 0 + 3 - 3 = 0$. Comme $f$ est strictement croissante : $f(x) < 0$ sur $]0 ; 1[$, $f(1) = 0$ et $f(x) > 0$ sur $]1 ; +\infty[$.

## Exercice 4 : probabilités (4 points)

Le sac contient trois boules « 5 », deux « 4 » et deux « 3 ».

**1. a)** On tire $2$ boules simultanément parmi $7$ : $\binom{7}{2} = 21$ tirages possibles.

**1. b)** Les boules impaires sont les trois « 5 » et les deux « 3 », soit $5$ boules : $P(A) = \frac{\binom{5}{2}}{21} = \frac{10}{21}$.

**2.** La somme vaut au moins $9$ pour $5 + 5 = 10$ ($\binom{3}{2} = 3$ tirages) et $5 + 4 = 9$ ($3 \times 2 = 6$ tirages). Les autres sommes ($8$, $7$ ou $6$) sont trop petites. $P(B) = \frac{9}{21} = \frac{3}{7}$.

**3.** $A \cap B$ : deux boules « 5 », $3$ tirages. $P_B(A) = \frac{P(A \cap B)}{P(B)} = \frac{3}{9} = \frac{1}{3}$.

**4.** $P_B(A) = \frac{1}{3}$ alors que $P(A) = \frac{10}{21}$ : la réalisation de $B$ change la probabilité de $A$. Les événements $A$ et $B$ ne sont pas indépendants.
