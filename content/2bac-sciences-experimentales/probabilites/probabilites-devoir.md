---
title: Devoir surveillé : dénombrement et probabilités
kind: devoir
summary: Un devoir d’une heure sur 20 points : tirage simultané, probabilités conditionnelles et loi binomiale, avec le barème et le corrigé.
position: 10
visibility: enrolled
---

Durée : une heure. Calculatrice non autorisée.

:::exercice Exercice 1 (7 points) : tirage simultané
Un sac contient $5$ jetons numérotés de $1$ à $5$. On tire simultanément $2$ jetons.

1. Combien y a-t-il de tirages ? (1 pt)
2. Calculer la probabilité de $A$ : « la somme des deux numéros est paire ». (3 pts)
3. Calculer la probabilité de $B$ : « le produit des deux numéros est pair ». (3 pts)

:::corrige
1. $C_5^2 = 10$.
2. La somme est paire si les deux numéros sont impairs ($C_3^2 = 3$ tirages parmi $1$, $3$, $5$) ou pairs ($C_2^2 = 1$) : $p(A) = \frac{4}{10} = \frac{2}{5}$.
3. Le produit est impair seulement si les deux sont impairs : $p(B) = 1 - \frac{3}{10} = \frac{7}{10}$.
:::
:::

:::exercice Exercice 2 (6 points) : probabilités conditionnelles
Dans une classe, $40\,\%$ des élèves sont des garçons. $30\,\%$ des garçons et $60\,\%$ des filles préfèrent les mathématiques. On choisit un élève au hasard.

1. Calculer la probabilité qu’il préfère les mathématiques. (3 pts)
2. L’élève préfère les mathématiques : quelle est la probabilité que ce soit une fille ? (3 pts)

:::corrige
Avec $G$ : « garçon », $F = \bar{G}$ et $M$ : « préfère les mathématiques » :

1. $p(M) = 0{,}4 \times 0{,}3 + 0{,}6 \times 0{,}6 = 0{,}12 + 0{,}36 = 0{,}48$.
2. $p_M(F) = \frac{0{,}36}{0{,}48} = 0{,}75$.
:::
:::

:::exercice Exercice 3 (7 points) : loi binomiale
Un QCM a $4$ questions ; chacune a $3$ réponses dont une seule est juste. Un élève répond au hasard à chaque question. $X$ est le nombre de bonnes réponses.

1. Justifier que $X$ suit une loi binomiale dont on donnera les paramètres. (2 pts)
2. Calculer $p(X = 2)$ et $p(X \geq 1)$. (3 pts)
3. Calculer $E(X)$ et $V(X)$. (2 pts)

:::corrige
1. On répète $4$ fois, de façon indépendante, une épreuve dont le succès (« réponse juste ») a la probabilité $\frac{1}{3}$ : $X$ suit la loi binomiale de paramètres $n = 4$ et $p = \frac{1}{3}$.
2. $p(X = 2) = C_4^2\left(\frac{1}{3}\right)^2\left(\frac{2}{3}\right)^2 = 6 \times \frac{4}{81} = \frac{8}{27}$. $p(X \geq 1) = 1 - \left(\frac{2}{3}\right)^4 = \frac{65}{81}$.
3. $E(X) = \frac{4}{3}$ et $V(X) = 4 \times \frac{1}{3} \times \frac{2}{3} = \frac{8}{9}$.
:::
:::
