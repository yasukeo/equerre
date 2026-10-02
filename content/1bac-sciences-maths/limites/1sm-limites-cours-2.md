---
title: Limites — partie 2 : lever les indéterminations
kind: cours
summary: Formes 0/0 en un point par factorisation, quantité conjuguée pour les racines, limites trigonométriques, limites et ordre, théorème des gendarmes.
position: 20
visibility: public
---

## Forme 0/0 en un point : factoriser

:::exemple
$\lim_{x \to 1} \frac{x^2 - 3x + 2}{x - 1}$ : forme $\frac{0}{0}$. On factorise : $x^2 - 3x + 2 = (x - 1)(x - 2)$, donc pour $x \neq 1$ la fraction vaut $x - 2$, et la limite est $-1$.
:::

:::propriete
Si un polynôme $P$ s’annule en $a$, il se factorise par $x - a$ : $P(x) = (x - a)Q(x)$. C’est ce qui permet de simplifier une forme $\frac{0}{0}$.
:::

## Racines : la quantité conjuguée

:::exemple
$\lim_{x \to 4} \frac{\sqrt{x} - 2}{x - 4}$ : on multiplie par $\sqrt{x} + 2$ : $\frac{(\sqrt{x} - 2)(\sqrt{x} + 2)}{(x - 4)(\sqrt{x} + 2)} = \frac{x - 4}{(x - 4)(\sqrt{x} + 2)} = \frac{1}{\sqrt{x} + 2}$, et la limite vaut $\frac{1}{4}$.
:::

:::exemple
$\lim_{x \to +\infty} \left(\sqrt{x^2 + 3} - x\right)$ : forme $+\infty - \infty$. $\sqrt{x^2 + 3} - x = \frac{3}{\sqrt{x^2 + 3} + x}$, et la limite vaut $0$.
:::

:::exemple
$\lim_{x \to +\infty} \frac{\sqrt{x^2 + 1}}{x}$ : pour $x > 0$, $\sqrt{x^2 + 1} = x\sqrt{1 + \frac{1}{x^2}}$, donc la fraction vaut $\sqrt{1 + \frac{1}{x^2}}$, qui tend vers $1$.
:::

## Limites trigonométriques

:::propriete
$$
\lim_{x \to 0} \frac{\sin x}{x} = 1 \qquad \lim_{x \to 0} \frac{\tan x}{x} = 1 \qquad \lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}
$$
:::

:::exemple
$\lim_{x \to 0} \frac{\sin 4x}{x} = \lim_{x \to 0} 4 \times \frac{\sin 4x}{4x} = 4$, et $\lim_{x \to 0} \frac{1 - \cos x}{x} = \lim_{x \to 0} x \times \frac{1 - \cos x}{x^2} = 0$.
:::

## Limites et ordre

:::theoreme
Soit $f$, $g$, $h$ définies au voisinage de $a$ ($a$ réel ou $\pm\infty$) et $\ell$ un réel.

- Si $f \leq g$ et $\lim_a f = +\infty$, alors $\lim_a g = +\infty$.
- Si $f \leq g$ et $\lim_a g = -\infty$, alors $\lim_a f = -\infty$.
- **Gendarmes** : si $g \leq f \leq h$ et $\lim_a g = \lim_a h = \ell$, alors $\lim_a f = \ell$.
- Si $|f(x) - \ell| \leq g(x)$ et $\lim_a g = 0$, alors $\lim_a f = \ell$.
:::

:::exemple
$\lim_{x \to +\infty} \frac{\sin x}{x}$ : $\left|\frac{\sin x}{x}\right| \leq \frac{1}{x}$ pour $x > 0$, et $\frac{1}{x} \to 0$ : la limite vaut $0$.
:::

:::attention
On ne peut pas écrire « $\frac{0}{0} = 1$ » ni « $\infty - \infty = 0$ » : une forme indéterminée se lève toujours en transformant l’expression.
:::
