---
title: Devoir surveillé : limites et continuité
kind: devoir
summary: Un devoir d’une heure sur 20 points, comme en classe, avec le barème et le corrigé de chaque question.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice non autorisée. Le barème est indiqué pour chaque exercice.

:::exercice Exercice 1 (6 points) : limites
Calculer les limites suivantes.

1. $\displaystyle \lim_{x \to +\infty} \frac{2x^3 - x + 1}{x^3 + 4}$ (1 pt)
2. $\displaystyle \lim_{x \to 3} \frac{\sqrt{x + 1} - 2}{x - 3}$ (1,5 pt)
3. $\displaystyle \lim_{x \to 0} \frac{\sqrt{x + 4} - 2}{x}$ (1,5 pt)
4. $\displaystyle \lim_{x \to -\infty} \left(\sqrt{x^2 + x} + x\right)$ (2 pts)

:::corrige
1. Quotient des termes de plus haut degré : $\frac{2x^3}{x^3} = 2$. La limite vaut $2$.
2. Pour $x \geq -1$, $x \neq 3$ : $\frac{\sqrt{x + 1} - 2}{x - 3} = \frac{(x + 1) - 4}{(x - 3)\left(\sqrt{x + 1} + 2\right)} = \frac{1}{\sqrt{x + 1} + 2}$. La limite vaut $\frac{1}{4}$.
3. Pour $x \neq 0$, $\frac{\sqrt{x + 4} - 2}{x} = \frac{(x + 4) - 4}{x\left(\sqrt{x + 4} + 2\right)} = \frac{1}{\sqrt{x + 4} + 2}$ : la limite vaut $\frac{1}{4}$.
4. Forme « $\infty - \infty$ ». Pour $x < -1$ : $\sqrt{x^2 + x} + x = \frac{(x^2 + x) - x^2}{\sqrt{x^2 + x} - x} = \frac{x}{\sqrt{x^2 + x} - x}$. Comme $x < 0$, $\sqrt{x^2 + x} = |x|\sqrt{1 + \frac{1}{x}} = -x\sqrt{1 + \frac{1}{x}}$, donc l’expression vaut $\frac{x}{-x\left(\sqrt{1 + \frac{1}{x}} + 1\right)} = \frac{-1}{\sqrt{1 + \frac{1}{x}} + 1}$, qui tend vers $-\frac{1}{2}$.
:::
:::

:::exercice Exercice 2 (6 points) : continuité
Soit $f$ la fonction définie sur $\mathbb{R}$ par

$$
f(x) = \frac{x^2 + x - 2}{x - 1} \text{ si } x < 1 \qquad \text{et} \qquad f(x) = \sqrt{x + 8} \text{ si } x \geq 1
$$

1. Factoriser $x^2 + x - 2$. (1 pt)
2. Montrer que $f$ est continue en $1$. (2 pts)
3. Montrer que $f$ est continue sur $\mathbb{R}$. (1,5 pt)
4. Calculer $\lim_{x \to -\infty} f(x)$ et $\lim_{x \to +\infty} f(x)$. (1,5 pt)

:::corrige
1. $1$ est racine : $x^2 + x - 2 = (x - 1)(x + 2)$.
2. Pour $x < 1$, $f(x) = x + 2$, donc $\lim_{x \to 1^-} f(x) = 3$. Et $f(1) = \sqrt{9} = 3 = \lim_{x \to 1^+} f(x)$, car $x \mapsto \sqrt{x + 8}$ est continue en $1$. Les limites à gauche et à droite sont égales à $f(1)$ : $f$ est continue en $1$.
3. Sur $]-\infty ; 1[$, $f(x) = x + 2$ est un polynôme, continu. Sur $]1 ; +\infty[$, $x + 8 > 0$ et $f = \sqrt{x + 8}$ est continue. Avec la question 2, $f$ est continue sur $\mathbb{R}$.
4. $\lim_{x \to -\infty} f(x) = \lim_{x \to -\infty} (x + 2) = -\infty$ et $\lim_{x \to +\infty} f(x) = \lim_{x \to +\infty} \sqrt{x + 8} = +\infty$.
:::
:::

:::exercice Exercice 3 (8 points) : valeurs intermédiaires et réciproque
Soit $g$ la fonction définie sur $\mathbb{R}$ par $g(x) = 2x^3 + x - 1$.

1. Montrer que $g$ est strictement croissante sur $\mathbb{R}$ et calculer ses limites en $-\infty$ et $+\infty$. (2 pts)
2. Montrer que l’équation $g(x) = 0$ admet une unique solution $\alpha$ dans $]0{,}5 ; 0{,}75[$. (2 pts)
3. En déduire le signe de $g(x)$ selon les valeurs de $x$. (1 pt)
4. Montrer que $g$ admet une fonction réciproque définie sur $\mathbb{R}$, puis calculer $g^{-1}(-1)$ et $g^{-1}(2)$. (2 pts)
5. Résoudre l’inéquation $g^{-1}(x) \leq 1$. (1 pt)

:::corrige
1. $x \mapsto 2x^3$ et $x \mapsto x - 1$ sont strictement croissantes, donc $g$ l’est. En $\pm\infty$, $g$ a la limite de $2x^3$ : $-\infty$ en $-\infty$ et $+\infty$ en $+\infty$.
2. $g$ est continue et strictement croissante sur $[0{,}5 ; 0{,}75]$, $g(0{,}5) = 0{,}25 + 0{,}5 - 1 = -0{,}25 < 0$ et $g(0{,}75) = 0{,}84375 + 0{,}75 - 1 = 0{,}59375 > 0$. D’après le théorème des valeurs intermédiaires, l’équation a une unique solution $\alpha$ dans $]0{,}5 ; 0{,}75[$ ; et, $g$ étant strictement croissante sur $\mathbb{R}$, c’est sa seule solution réelle.
3. $g(x) < 0$ pour $x < \alpha$, $g(\alpha) = 0$ et $g(x) > 0$ pour $x > \alpha$.
4. $g$ est continue et strictement croissante sur $\mathbb{R}$, et $g(\mathbb{R}) = \mathbb{R}$ d’après les limites : $g$ est une bijection de $\mathbb{R}$ sur $\mathbb{R}$. $g(0) = -1$ et $g(1) = 2$, donc $g^{-1}(-1) = 0$ et $g^{-1}(2) = 1$.
5. $g^{-1}$ est strictement croissante comme $g$, donc $g^{-1}(x) \leq 1 \iff x \leq g(1) = 2$. L’ensemble des solutions est $]-\infty ; 2]$.
:::
:::
