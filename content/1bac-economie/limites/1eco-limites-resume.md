---
title: Limites d’une fonction : l’essentiel
kind: resume
summary: Limites usuelles, opérations, formes indéterminées, méthodes pour les lever, théorèmes de comparaison, sur une page.
position: 10
visibility: public
---

## Limites usuelles

$\lim_{+\infty} x^n = +\infty$ ; $\lim_{\pm\infty} \frac{1}{x^n} = 0$ ; $\lim_{0^+} \frac{1}{x} = +\infty$, $\lim_{0^-} \frac{1}{x} = -\infty$ ; $\lim_{+\infty} \sqrt{x} = +\infty$.

## Formes indéterminées et méthodes

:::propriete
$+\infty - \infty$, $0 \times \infty$, $\frac{\infty}{\infty}$, $\frac{0}{0}$.

- À l’infini : polynôme $\to$ terme de plus haut degré ; fraction $\to$ quotient des termes de plus haut degré.
- $\frac{0}{0}$ en $a$ : factoriser par $x - a$ et simplifier.
- Racines : quantité conjuguée, ou factoriser sous la racine.
:::

## Comparaison

Si $f \leq g$ et $f \to +\infty$, alors $g \to +\infty$. Gendarmes : $g \leq f \leq h$, $g$ et $h \to \ell$, donc $f \to \ell$.

:::attention
Pour $\frac{\ell}{0}$, regardez le signe du dénominateur : $0^+$ ou $0^-$ donnent des infinis de signes différents.
:::
