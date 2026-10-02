---
title: Série 2 : problèmes de synthèse
kind: serie
summary: Deux problèmes complets : toutes les limites et asymptotes d’une fonction paire, puis le coût moyen d’une production et son interprétation, avec les corrigés.
position: 30
visibility: enrolled
---

:::exercice Problème 1 : une fonction et ses asymptotes
Soit $f(x) = \dfrac{2x^2 - 3}{x^2 - 1}$.

1. Déterminer l’ensemble de définition de $f$ et montrer que $f$ est paire.
2. Calculer les limites de $f$ en $+\infty$ et en $-\infty$. Interpréter.
3. Calculer les limites de $f$ à droite et à gauche en $1$. Interpréter.
4. En utilisant la parité, donner les limites à droite et à gauche en $-1$.

:::corrige
1. $x^2 - 1 = 0 \iff x = 1$ ou $x = -1$ : $D_f = \mathbb{R} \setminus \{-1 ; 1\}$, symétrique par rapport à $0$. $f(-x) = \frac{2x^2 - 3}{x^2 - 1} = f(x)$ : $f$ est paire.
2. Comme $\frac{2x^2}{x^2} = 2$ : la limite vaut $2$ en $\pm\infty$. La droite $y = 2$ est asymptote horizontale.
3. Le numérateur tend vers $-1$. Pour $x > 1$, $x^2 - 1 > 0$ : le dénominateur tend vers $0^+$ et $f(x) \to -\infty$. Pour $x$ entre $0$ et $1$, $x^2 - 1 < 0$ : $f(x) \to +\infty$. La droite $x = 1$ est asymptote verticale.
4. Par symétrie par rapport à l’axe des ordonnées : $\lim_{x \to -1^-} f(x) = -\infty$ et $\lim_{x \to -1^+} f(x) = +\infty$. La droite $x = -1$ est aussi asymptote verticale.
:::
:::

:::exercice Problème 2 : un coût moyen
Un artisan fabrique $x$ objets ($x > 0$). Le coût total est $C(x) = 3x + 120$ dirhams : $120$ dirhams de frais fixes et $3$ dirhams par objet. Le coût moyen d’un objet est $M(x) = \dfrac{C(x)}{x}$.

1. Montrer que $M(x) = 3 + \dfrac{120}{x}$, puis calculer $M(10)$, $M(100)$ et $M(1\,000)$.
2. Calculer $\lim_{x \to +\infty} M(x)$ et interpréter.
3. Calculer $\lim_{x \to 0^+} M(x)$ et interpréter.
4. À partir de combien d’objets le coût moyen est-il inférieur ou égal à $3{,}50$ dirhams ?

:::corrige
1. $M(x) = \frac{3x + 120}{x} = 3 + \frac{120}{x}$. $M(10) = 15$, $M(100) = 4{,}2$, $M(1\,000) = 3{,}12$.
2. $\frac{120}{x} \to 0$, donc $M(x) \to 3$ : quand on fabrique beaucoup d’objets, les frais fixes se répartissent, et le coût moyen se rapproche de $3$ dirhams. La droite $y = 3$ est asymptote horizontale.
3. $\frac{120}{x} \to +\infty$ : fabriquer très peu d’objets coûte très cher par objet.
4. $3 + \frac{120}{x} \leq 3{,}5 \iff \frac{120}{x} \leq 0{,}5 \iff x \geq 240$ : à partir de $240$ objets.
:::
:::
