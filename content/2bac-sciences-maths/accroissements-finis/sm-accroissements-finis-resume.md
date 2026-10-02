---
title: Accroissements finis : l’essentiel
kind: resume
summary: Les théorèmes de Rolle et des accroissements finis, l’inégalité et ses deux grands usages, sur une page.
position: 10
visibility: public
---

## Les théorèmes

Hypothèses communes : $f$ **continue sur $[a ; b]$** et **dérivable sur $]a ; b[$**.

:::theoreme
- **Rolle** : si de plus $f(a) = f(b)$, il existe $c \in ]a ; b[$ tel que $f'(c) = 0$.
- **Accroissements finis** : il existe $c \in ]a ; b[$ tel que $f(b) - f(a) = f'(c)(b - a)$.
- **Inégalité** : si $m \leq f' \leq M$ sur $]a ; b[$, alors $m(b - a) \leq f(b) - f(a) \leq M(b - a)$ ; si $|f'| \leq k$, alors $|f(b) - f(a)| \leq k(b - a)$.
:::

## Usages

- **Encadrer** : $\frac{b - a}{b} \leq \ln b - \ln a \leq \frac{b - a}{a}$ ; $\sin x \leq x$ ; $\frac{x}{1 + x^2} \leq \arctan x \leq x$ pour $x \geq 0$.
- **Compter des solutions** : si $f'$ ne s’annule pas, $f(x) = 0$ a au plus une solution (Rolle).
- **Suites** $u_{n + 1} = f(u_n)$ : sur $I$ stable, avec $|f'| \leq k < 1$ et $f(\ell) = \ell$, $|u_n - \ell| \leq k^n|u_0 - \ell|$, donc $u_n \to \ell$.

:::attention
Le réel $c$ existe, mais on ne le connaît en général pas : on ne s’en sert qu’à travers un encadrement de $f'(c)$.
:::
