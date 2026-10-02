---
title: Accroissements finis — partie 2 : applications
kind: cours
summary: Encadrements classiques obtenus par les accroissements finis, approximation d’une limite, suites récurrentes u(n+1) = f(u(n)) et vitesse de convergence, choix de l’intervalle et de la constante k.
position: 20
visibility: public
---

## Encadrements classiques

L’inégalité des accroissements finis transforme un encadrement de $f'$ en un encadrement de $f$.

:::exemple
**$\sin x \leq x$ pour $x \geq 0$.** Sur $[0 ; x]$, $\sin' = \cos \leq 1$, donc $\sin x - \sin 0 \leq 1 \times (x - 0)$.
:::

:::exemple
**$\arctan$.** Pour $x > 0$, sur $[0 ; x]$, $\frac{1}{1 + x^2} \leq \frac{1}{1 + t^2} \leq 1$, donc $\frac{x}{1 + x^2} \leq \arctan x \leq x$.
:::

:::exemple
**$e^x$.** Pour $x > 0$, sur $[0 ; x]$, $1 \leq e^t \leq e^x$, donc $x \leq e^x - 1 \leq xe^x$.
:::

## Calculer une limite avec les accroissements finis

:::exemple
$\lim_{n \to +\infty} n\left(\ln(n + 1) - \ln n\right)$. D’après l’encadrement de la partie 1 avec $a = n$ et $b = n + 1$ : $\frac{1}{n + 1} \leq \ln(n + 1) - \ln n \leq \frac{1}{n}$, donc $\frac{n}{n + 1} \leq n\left(\ln(n + 1) - \ln n\right) \leq 1$, et la limite vaut $1$ par les gendarmes.
:::

## Suites récurrentes

On étudie $u_{n + 1} = f(u_n)$, avec $f$ dérivable sur un intervalle $I$ stable ($f(I) \subset I$), $u_0 \in I$, et $\ell \in I$ tel que $f(\ell) = \ell$.

:::theoreme
S’il existe $k \in [0 ; 1[$ tel que $|f'(x)| \leq k$ pour tout $x \in I$, alors pour tout $n$ :

$$
|u_{n + 1} - \ell| \leq k|u_n - \ell| \qquad \text{et} \qquad |u_n - \ell| \leq k^n |u_0 - \ell|
$$

Donc $(u_n)$ converge vers $\ell$.
:::

La première inégalité vient des accroissements finis appliqués entre $u_n$ et $\ell$ : $|f(u_n) - f(\ell)| \leq k|u_n - \ell|$. La seconde s’obtient par récurrence, et $k^n \to 0$ car $0 \leq k < 1$.

:::exemple
$u_0 = 1$, $u_{n + 1} = \frac{1}{2}\cos u_n + 1$, avec $f(x) = \frac{1}{2}\cos x + 1$ sur $I = \left[\frac{1}{2} ; \frac{3}{2}\right]$.

- $f(I) \subset \left[\frac{1}{2} ; \frac{3}{2}\right]$, car $\cos x \in [-1 ; 1]$.
- $g(x) = f(x) - x$ est strictement décroissante sur $I$ ($g' = -\frac{1}{2}\sin x - 1 < 0$), avec $g\left(\frac{1}{2}\right) > 0$ et $g\left(\frac{3}{2}\right) < 0$ : l’équation $f(x) = x$ a une unique solution $\ell \in I$.
- $|f'(x)| = \frac{1}{2}|\sin x| \leq \frac{1}{2}$ : donc $|u_n - \ell| \leq \left(\frac{1}{2}\right)^n |u_0 - \ell| \leq \left(\frac{1}{2}\right)^n$, et $(u_n)$ converge vers $\ell$.
:::

### Méthode

1. Trouver un intervalle $I$ stable par $f$ qui contient $u_0$.
2. Montrer que $f(x) = x$ a une solution $\ell$ dans $I$ (valeurs intermédiaires).
3. Majorer $|f'|$ par une constante $k < 1$ sur $I$.
4. Conclure : $|u_n - \ell| \leq k^n|u_0 - \ell| \to 0$ ; on peut même trouver un rang à partir duquel l’écart est inférieur à une précision donnée.

:::attention
La constante $k$ doit être strictement inférieure à $1$, et l’inégalité doit valoir sur tout l’intervalle où se trouvent les termes de la suite : c’est pourquoi on vérifie d’abord que $I$ est stable.
:::
