---
summary: Une équation et une inéquation en ln x, la suite u(n+1) = u(n) − ln u(n) et sa limite, l’étude de −x + (ln x)/x avec une asymptote oblique, et deux tirages dont le second dépend du premier, avec une question d’indépendance.
---

## Exercice 1 : équations et inéquations (2,5 points)

**1.** $t^2 - 3t + 2 = (t - 1)(t - 2)$ : les solutions sont $1$ et $2$.

**2. a)** Avec $t = \ln x$, l’équation devient $t^2 - 3t + 2 = 0$, donc $\ln x = 1$ ou $\ln x = 2$. Les solutions sont $e$ et $e^2$.

**2. b)** $(\ln x - 1)(\ln x - 2) < 0 \iff 1 < \ln x < 2 \iff e < x < e^2$. L’ensemble des solutions est $]e ; e^2[$.

## Exercice 2 : fonction et suite (5 points)

**1. a)** $h'(x) = 1 - \frac{1}{x} = \frac{x - 1}{x}$, positif sur $[1 ; e]$ et nul seulement en $1$ : $h$ est strictement croissante sur cet intervalle.

**1. b)** $h$ croît de $h(1) = 1$ à $h(e) = e - 1$. Donc $h([1 ; e]) = [1 ; e - 1]$, et comme $e - 1 < e$, $h([1 ; e]) \subset [1 ; e]$.

**2. a)** Par récurrence : $u_0 = e \in [1 ; e]$. Si $1 \leq u_n \leq e$, alors $u_{n+1} = h(u_n) \in h([1 ; e]) \subset [1 ; e]$.

**2. b)** $u_{n+1} - u_n = -\ln u_n \leq 0$, car $u_n \geq 1$ : la suite est décroissante.

**2. c)** Elle est décroissante et minorée par $1$, donc elle converge.

**2. d)** Sa limite $\ell$ appartient à $[1 ; e]$. Comme $h$ est continue sur $[1 ; e]$, $\ell = h(\ell) = \ell - \ln \ell$, donc $\ln \ell = 0$ et $\ell = 1$ : $\lim_{n \to +\infty} u_n = 1$.

## Exercice 3 : étude de fonctions (9,5 points)

### Partie I

**1.** $g'(x) = -2x - \frac{1}{x} = -\left(2x + \frac{1}{x}\right)$. Pour $x > 0$, $2x + \frac{1}{x} > 0$, donc $g'(x) < 0$.

**2. a)** $g(1) = -1 + 1 - 0 = 0$. $g$ est strictement décroissante sur $]0 ; +\infty[$.

**2. b)** Comme $g$ décroît et s’annule en $1$ : $g(x) \geq 0$ sur $]0 ; 1]$ et $g(x) < 0$ sur $]1 ; +\infty[$.

**3.** $f'(x) = -1 + \frac{\frac{1}{x} \times x - \ln x}{x^2} = -1 + \frac{1 - \ln x}{x^2} = \frac{-x^2 + 1 - \ln x}{x^2} = \frac{g(x)}{x^2}$.

### Partie II

**1. a)** Quand $x \to 0^+$, $\ln x \to -\infty$ et $\frac{1}{x} \to +\infty$, donc $\frac{\ln x}{x} \to -\infty$ et $\lim_{x \to 0^+} f(x) = -\infty$. L’axe des ordonnées est asymptote verticale à $(C)$.

**1. b)** Quand $x \to +\infty$, $\frac{\ln x}{x} \to 0$, donc $\lim_{x \to +\infty} f(x) = -\infty$. Et $f(x) - (-x) = \frac{\ln x}{x} \to 0$ : la droite $(\Delta) : y = -x$ est asymptote oblique à $(C)$ au voisinage de $+\infty$.

**1. c)** $f(x) - (-x) = \frac{\ln x}{x}$ a le signe de $\ln x$ : $(C)$ est au-dessous de $(\Delta)$ sur $]0 ; 1[$, au-dessus sur $]1 ; +\infty[$, et la coupe au point $(1 ; -1)$.

**2.** $f(1) = -1$. D’après I. 2. b) et I. 3., $f$ est croissante sur $]0 ; 1]$ et décroissante sur $[1 ; +\infty[$ : elle croît de $-\infty$ à $-1$, puis décroît vers $-\infty$.

**3.** Éléments pour le tracé : asymptote verticale $x = 0$, maximum $(1 ; -1)$ avec une tangente horizontale, situé sur $(\Delta)$, inflexion au point d’abscisse $e^{\frac{3}{2}} \approx 4{,}5$ et d’ordonnée environ $-4$, puis la courbe se rapproche de $(\Delta)$ par-dessus. Quelques valeurs : $f(0{,}3) \approx -4{,}31$, $f(0{,}5) \approx -1{,}89$, $f(2) \approx -1{,}65$, $f(e) = -e + \frac{1}{e} \approx -2{,}35$.

## Exercice 4 : probabilités (3 points)

La boîte contient $4$ boules rouges et $3$ vertes. Si la première boule est rouge, on la remet : la seconde est tirée parmi $4$ rouges et $3$ vertes. Si elle est verte, on ne la remet pas : la seconde est tirée parmi $4$ rouges et $2$ vertes.

**1.** Avec l’arbre des possibilités :

$$p(A) = \frac{4}{7} \times \frac{4}{7} + \frac{3}{7} \times \frac{2}{6} = \frac{16}{49} + \frac{1}{7} = \frac{23}{49}$$

$$p(B) = \frac{4}{7} \times \frac{4}{7} + \frac{3}{7} \times \frac{4}{6} = \frac{16}{49} + \frac{2}{7} = \frac{30}{49}$$

**2.** $A \cap B$ est l’événement « deux boules rouges » : $p(A \cap B) = \frac{16}{49}$. Or $p(A) \times p(B) = \frac{23 \times 30}{49^2} = \frac{690}{2401}$, alors que $\frac{16}{49} = \frac{784}{2401}$. Comme $p(A \cap B) \neq p(A) \times p(B)$, les événements $A$ et $B$ ne sont pas indépendants.
