---
summary: Un plan tangent à une sphère et son point de contact, un nombre complexe dont la puissance sixième est réelle et un triangle équilatéral, une suite arithmético-géométrique avec un seuil, des jetons et une répétition d’épreuves, et l’étude de (1 + ln x)² + 1/x².
---

## Exercice 1 : géométrie dans l’espace (3 points)

**1. a)** $\overrightarrow{AB}(-1 ; 0 ; -1)$ et $\overrightarrow{AC}(0 ; 2 ; -1)$, donc :

$$\overrightarrow{AB} \wedge \overrightarrow{AC} = (0 \times (-1) - (-1) \times 2)\,\vec{i} + ((-1) \times 0 - (-1) \times (-1))\,\vec{j} + ((-1) \times 2 - 0 \times 0)\,\vec{k} = 2\vec{i} - \vec{j} - 2\vec{k}$$

Ce vecteur n’est pas nul : $\overrightarrow{AB}$ et $\overrightarrow{AC}$ ne sont pas colinéaires, donc $A$, $B$ et $C$ ne sont pas alignés.

**1. b)** Le vecteur $2\vec{i} - \vec{j} - 2\vec{k}$ est normal à $(ABC)$, qui a une équation $2x - y - 2z + d = 0$. Avec $A(0 ; 3 ; 1)$ : $-3 - 2 + d = 0$, d’où $d = 5$ et $(ABC) : 2x - y - 2z + 5 = 0$.

**2. a)** $x^2 - 4x + y^2 + z^2 = 5$ s’écrit $(x - 2)^2 + y^2 + z^2 = 9$ : centre $\Omega(2 ; 0 ; 0)$ et rayon $3$.

**2. b)** $d(\Omega, (ABC)) = \frac{|4 - 0 - 0 + 5|}{\sqrt{4 + 1 + 4}} = \frac{9}{3} = 3$ : la distance est égale au rayon, le plan est tangent à la sphère.

**2. c)** $H$ est le projeté orthogonal de $\Omega$ sur le plan. La droite passant par $\Omega$ et dirigée par $2\vec{i} - \vec{j} - 2\vec{k}$ s’écrit $x = 2 + 2t$, $y = -t$, $z = -2t$. Dans l’équation du plan : $2(2 + 2t) + t + 4t + 5 = 9 + 9t = 0$, soit $t = -1$. Donc $H(0 ; 1 ; 2)$.

## Exercice 2 : nombres complexes (3 points)

**1.** $\Delta = 2 - 8 = -6 = (i\sqrt{6})^2$ : les solutions sont $\frac{\sqrt{2}}{2} + i\frac{\sqrt{6}}{2}$ et $\frac{\sqrt{2}}{2} - i\frac{\sqrt{6}}{2}$.

**2. a)** $|u| = \sqrt{\frac{2}{4} + \frac{6}{4}} = \sqrt{2}$ et $u = \sqrt{2}\left(\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) = \sqrt{2}\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right)$, donc $\arg u \equiv \frac{\pi}{3} \; [2\pi]$.

**2. b)** D’après la formule de Moivre, $u^6 = (\sqrt{2})^6\left(\cos 2\pi + i\sin 2\pi\right) = 8$ : c’est un nombre réel.

**3. a)** $z' = e^{i\frac{\pi}{3}}z = \left(\frac{1}{2} + i\frac{\sqrt{3}}{2}\right)z$.

**3. b)** $\left(\frac{1}{2} + i\frac{\sqrt{3}}{2}\right)(4 - 4i\sqrt{3}) = 2 - 2i\sqrt{3} + 2i\sqrt{3} + 6 = 8 = b$ : $B$ est l’image de $A$ par $R$. Donc $OA = OB$ et $(\overrightarrow{OA}, \overrightarrow{OB}) \equiv \frac{\pi}{3} \; [2\pi]$ : le triangle $OAB$, isocèle en $O$ avec un angle au sommet de $\frac{\pi}{3}$, est équilatéral.

## Exercice 3 : suites numériques (3 points)

**1.** $14 - u_{n+1} = 7 - \frac{1}{2}u_n = \frac{1}{2}(14 - u_n)$. Par récurrence : $u_0 = 13 < 14$ ; si $u_n < 14$, alors $14 - u_{n+1} = \frac{1}{2}(14 - u_n) > 0$.

**2. a)** D’après le calcul précédent, $v_{n+1} = \frac{1}{2}v_n$ : $(v_n)$ est géométrique de raison $\frac{1}{2}$ et de premier terme $v_0 = 14 - 13 = 1$, donc $v_n = \left(\frac{1}{2}\right)^n$.

**2. b)** $u_n = 14 - v_n = 14 - \left(\frac{1}{2}\right)^n$. Comme $\left(\frac{1}{2}\right)^n \to 0$, $\lim_{n \to +\infty} u_n = 14$.

**2. c)** $u_n > 13{,}99 \iff \left(\frac{1}{2}\right)^n < 0{,}01 \iff 2^n > 100$. Comme $2^6 = 64$ et $2^7 = 128$, la plus petite valeur est $n = 7$.

## Exercice 4 : probabilités (3 points)

Le sac contient cinq jetons « 0 » et quatre jetons « 1 ». Un tirage simultané de deux jetons offre $\binom{9}{2} = 36$ résultats équiprobables.

**1.** La somme vaut $1$ quand on tire un « 0 » et un « 1 » : $5 \times 4 = 20$ tirages, donc $p(A) = \frac{20}{36} = \frac{5}{9}$.

**2. a)** Saïd gagne s’il tire deux « 1 » : $\binom{4}{2} = 6$ tirages, donc la probabilité de gagner est $\frac{6}{36} = \frac{1}{6}$.

**2. b)** Les trois parties sont identiques et indépendantes. Le nombre de victoires suit la loi binomiale de paramètres $3$ et $\frac{1}{6}$ :

$$p(\text{deux victoires exactement}) = \binom{3}{2}\left(\frac{1}{6}\right)^2 \times \frac{5}{6} = \frac{15}{216} = \frac{5}{72}$$

## Problème (8 points)

### Partie I

**1.** $g'(x) = \frac{2}{x^3} + \frac{1}{x} > 0$ pour $x > 0$ : $g$ est croissante sur $]0 ; +\infty[$.

**2.** $g(1) = 1 - 1 + 0 = 0$. Comme $g$ est croissante, $g(x) \leq 0$ sur $]0 ; 1]$ et $g(x) \geq 0$ sur $[1 ; +\infty[$.

### Partie II

**1.** Quand $x \to 0^+$, $\frac{1}{x^2} \to +\infty$ et $(1 + \ln x)^2 \to +\infty$ : $\lim_{x \to 0^+} f(x) = +\infty$. L’axe des ordonnées est asymptote verticale à $(C)$.

**2. a)** Quand $x \to +\infty$, $(1 + \ln x)^2 \to +\infty$ et $\frac{1}{x^2} \to 0$ : $\lim_{x \to +\infty} f(x) = +\infty$.

**2. b)** Avec $t = \sqrt{x}$, $\ln x = 2\ln t$ et :

$$\frac{(1 + \ln x)^2}{x} = \left(\frac{1 + 2\ln t}{t}\right)^2 = \left(\frac{1}{t} + 2\,\frac{\ln t}{t}\right)^2 \to 0$$

quand $t \to +\infty$. Donc $\frac{f(x)}{x} = \frac{(1 + \ln x)^2}{x} + \frac{1}{x^3} \to 0$.

**2. c)** $(C)$ admet en $+\infty$ une branche parabolique de direction l’axe des abscisses.

**3. a)** $f'(x) = 2(1 + \ln x) \times \frac{1}{x} - \frac{2}{x^3} = \frac{2}{x}\left(1 + \ln x - \frac{1}{x^2}\right) = \frac{2g(x)}{x}$. $f'$ a le signe de $g$ : $f$ est décroissante sur $]0 ; 1]$ et croissante sur $[1 ; +\infty[$.

**3. b)** $f$ décroît de $+\infty$ à $f(1) = 1 + 1 = 2$, puis croît jusqu’à $+\infty$. Le minimum de $f$ est $2$ : $f(x) \geq 2$ pour tout $x > 0$.

**4.** Éléments pour le tracé (unité $1$ cm) : asymptote verticale $x = 0$, minimum $(1 ; 2)$ avec une tangente horizontale, branche parabolique horizontale en $+\infty$. Quelques valeurs : $f(0{,}25) \approx 16{,}15$, $f(0{,}5) \approx 4{,}09$, $f\left(\frac{1}{e}\right) = e^2 \approx 7{,}39$, $f(2) \approx 3{,}12$, $f(e) = 4 + \frac{1}{e^2} \approx 4{,}14$.

**5. a)** $H'(x) = \ln x + x \times \frac{1}{x} = 1 + \ln x = h(x)$. Donc $I = H(e) - H(1) = e - 0 = e$.

**5. b)** On intègre par parties avec $u(x) = (1 + \ln x)^2$, $u'(x) = \frac{2(1 + \ln x)}{x}$, et $v'(x) = 1$, $v(x) = x$ :

$$J = \Big[x(1 + \ln x)^2\Big]_1^e - 2\int_1^e (1 + \ln x)\,dx = (4e - 1) - 2I = 4e - 1 - 2e = 2e - 1$$

**5. c)** $f > 0$, donc l’aire vaut :

$$\int_1^e f(x)\,dx = J + \int_1^e \frac{dx}{x^2} = 2e - 1 + \left[-\frac{1}{x}\right]_1^e = 2e - 1 + 1 - \frac{1}{e} = 2e - \frac{1}{e}$$

Avec une unité de $1$ cm, l’aire est $\left(2e - \frac{1}{e}\right)$ cm², soit environ $5{,}07$ cm².
