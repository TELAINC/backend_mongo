% Hechos de sexo
hombre(carlos).
hombre(eduardo).
hombre(alejandro).
hombre(dhylan).

mujer(maria).
mujer(sandra).

% Relaciones de paternidad y maternidad
% Carlos y María son los padres de Eduardo, Alejandro y Sandra.
padre(carlos, eduardo).
padre(carlos, alejandro).
padre(carlos, sandra).

madre(maria, eduardo).
madre(maria, alejandro).
madre(maria, sandra).

% Sandra es la madre de Dhylan.
madre(sandra, dhylan).

% Definición de progenitor (padre o madre)
progenitor(X, Y) :- padre(X, Y).
progenitor(X, Y) :- madre(X, Y).

% Definición de hermanos: dos personas son hermanos si comparten al menos un progenitor
hermanos(X, Y) :- 
    progenitor(P, X), 
    progenitor(P, Y),
    X \= Y.

% Definición de sobrino: N es sobrino de T si el progenitor de N es hermano de T.
sobrino(N, T) :- 
    progenitor(P, N), 
    hermanos(P, T).

% Definición de nieto: N es nieto de A si A es progenitor del progenitor de N y N es hombre.
nieto(N, A) :-
    progenitor(P, N),
    progenitor(A, P),
    hombre(N).
