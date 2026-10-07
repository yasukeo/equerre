---
summary: Une suite arithmético-géométrique de limite 5/3, un tirage de deux boules avec une question d’indépendance et une espérance, et l’étude de 1/x + x ln x avec une fonction auxiliaire, une primitive donnée et l’aire entre la courbe et une droite.
---

## Exercice 1 : suites numériques (4,5 points)

**1.** $u_1 = 0 + 1 = 1$ et $u_2 = \frac{2}{5} + 1 = \frac{7}{5}$.

**2.** $u_{n+1} - \frac{5}{3} = \frac{2}{5}u_n - \frac{2}{3} = \frac{2}{5}\left(u_n - \frac{5}{3}\right)$. Par récurrence : $u_0 = 0 < \frac{5}{3}$ ; si $u_n < \frac{5}{3}$, alors $u_{n+1} - \frac{5}{3} < 0$.

**3. a)** $u_{n+1} - u_n = -\frac{3}{5}u_n + 1 = -\frac{3}{5}\left(u_n - \frac{5}{3}\right)$.

**3. b)** Comme $u_n < \frac{5}{3}$, $u_{n+1} - u_n > 0$ : la suite est croissante. Elle est majorée par $\frac{5}{3}$, donc elle converge.

**4. a)** $v_0 = 0 - \frac{5}{3} = -\frac{5}{3}$.

**4. b)** D’après 2., $v_{n+1} = \frac{2}{5}v_n$ : $(v_n)$ est géométrique de raison $\frac{2}{5}$.

**4. c)** $v_n = -\frac{5}{3}\left(\frac{2}{5}\right)^n$, donc $u_n = v_n + \frac{5}{3} = -\frac{5}{3}\left(\frac{2}{5}\right)^n + \frac{5}{3}$.

**4. d)** $\left(\frac{2}{5}\right)^n \to 0$, donc $\lim_{n \to +\infty} u_n = \frac{5}{3}$.

## Exercice 2 : probabilités (4,5 points)

Le sac contient $2$ boules blanches, $3$ rouges et $2$ vertes. On en tire $2$ simultanément : $\binom{7}{2} = 21$ tirages équiprobables.

**1. a)** $A$ : deux blanches, deux rouges ou deux vertes, $1 + 3 + 1 = 5$ tirages. $p(A) = \frac{5}{21}$.

**1. b)** L’événement contraire de $B$ est « aucune rouge » : $\binom{4}{2} = 6$ tirages. $p(B) = 1 - \frac{6}{21} = \frac{15}{21} = \frac{5}{7}$.

**1. c)** $A \cap B$ : deux boules rouges, $\binom{3}{2} = 3$ tirages. $p(A \cap B) = \frac{3}{21} = \frac{1}{7}$.

**1. d)** $p(A) \times p(B) = \frac{5}{21} \times \frac{5}{7} = \frac{25}{147}$, alors que $p(A \cap B) = \frac{1}{7} = \frac{21}{147}$. Ces nombres sont différents : $A$ et $B$ ne sont pas indépendants.

**2. a)** $p(X = 0) = \frac{6}{21} = \frac{2}{7}$ ; $p(X = 1) = \frac{3 \times 4}{21} = \frac{4}{7}$ (une rouge et une non rouge) ; $p(X = 2) = \frac{3}{21} = \frac{1}{7}$.

**2. b)** $E(X) = 0 \times \frac{2}{7} + 1 \times \frac{4}{7} + 2 \times \frac{1}{7} = \frac{6}{7}$.

## Exercice 3 : étude de fonctions (11 points)

### Partie I

**1. a)** Quand $x \to 0^+$, $-\frac{1}{x^2} \to -\infty$ et $\ln x \to -\infty$ : $\lim_{x \to 0^+} g(x) = -\infty$.

**1. b)** Quand $x \to +\infty$, $\frac{1}{x^2} \to 0$ et $\ln x \to +\infty$ : $\lim_{x \to +\infty} g(x) = +\infty$.

**2. a)** $g'(x) = \frac{2}{x^3} + \frac{1}{x}$.

**2. b)** Pour $x > 0$, $g'(x) > 0$.

**2. c)** $g(1) = 1 - 1 + 0 = 0$. $g$ est strictement croissante sur $]0 ; +\infty[$, de $-\infty$ à $+\infty$.

**2. d)** $g$ est croissante et s’annule en $1$ : $g(x) \leq 0$ sur $]0 ; 1]$ et $g(x) \geq 0$ sur $[1 ; +\infty[$.

### Partie II

**1. a)** Quand $x \to 0^+$, $\frac{1}{x} \to +\infty$ et $x\ln x \to 0$ : $\lim_{x \to 0^+} f(x) = +\infty$. L’axe des ordonnées est asymptote verticale à $(C)$.

**1. b)** Quand $x \to +\infty$, $\lim_{x \to +\infty} f(x) = +\infty$ et $\frac{f(x)}{x} = \frac{1}{x^2} + \ln x \to +\infty$ : $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des ordonnées.

**2. a)** $f'(x) = -\frac{1}{x^2} + \ln x + x \times \frac{1}{x} = 1 - \frac{1}{x^2} + \ln x = g(x)$.

**2. b)** $f(1) = 1 + 0 = 1$. D’après I. 2. d), $f$ est décroissante sur $]0 ; 1]$, de $+\infty$ à $1$, puis croissante sur $[1 ; +\infty[$ jusqu’à $+\infty$.

**3.** $F'(x) = -\frac{x}{2} + x\ln x + \left(\frac{x^2}{2} + 1\right)\frac{1}{x} = -\frac{x}{2} + x\ln x + \frac{x}{2} + \frac{1}{x} = f(x)$ : $F$ est une primitive de $f$ sur $]0 ; +\infty[$.

**4.** Le domaine hachuré est compris entre $(C)$ et $(\Delta) : y = \frac{x}{2}$, pour $x$ entre $1$ et $e$, et $(C)$ y est au-dessus de $(\Delta)$. Avec $F(e) = -\frac{e^2}{4} + \frac{e^2}{2} + 1 = \frac{e^2}{4} + 1$ et $F(1) = -\frac{1}{4}$ :

$$\int_1^e \left(f(x) - \frac{x}{2}\right)dx = F(e) - F(1) - \left[\frac{x^2}{4}\right]_1^e = \frac{e^2}{4} + \frac{5}{4} - \frac{e^2 - 1}{4} = \frac{3}{2}$$

L’aire vaut $\frac{3}{2}$ unité d’aire.
