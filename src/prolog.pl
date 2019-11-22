member(E, [E|_]).
member(E, [_|T]) :-
    member(E, T).

append([], L, L).
append([H|T], L2, [H|T2]) :-
    append(T, L2, T2).

consecutiveObstaclesRight([X,Y],Obstacles):- 
	Yone is Y + 1, 
	member([X,Y],Obstacles),
	member([X,Yone],Obstacles).

consecutiveObstaclesLeft([X,Y],Obstacles):- 
	Yone is Y - 1, 
	member([X,Y],Obstacles),
	member([X,Yone],Obstacles).

canGoLeft([X,Y], _, Obstacles) :- Y>0, \+(consecutiveObstaclesLeft([X,Y],Obstacles)).
canGoright([X,Y], _, Obstacles):- Y<9, \+(consecutiveObstaclesRight([X,Y],Obstacles)).
canGoDown([X,Y], Ladder, _) :- member( [X-1,Y], Ladder), X>0.
canGoUp([X,Y], Ladder, _)   :- member( [X,Y], Ladder), X<4.

% Para direita
next([X,Y], _, Obstacles, [X,Yout]):- canGoright([X,Y], _, Obstacles), Yout is Y + 1. 

% Para esquerda
next([X,Y], _, Obstacles, [X,Yout]):- canGoLeft([X,Y], _, Obstacles), Yout is Y - 1. 

% Para Baixo
next([X,Y], Ladder, _, [Xout,Y]):- canGoDown([X,Y], Ladder, _), Xout is X - 1. 

% Para Cima
next([X,Y], Ladder, _, [Xout,Y]):- canGoUp([X,Y], Ladder, _), Xout is X + 1. 



solution_bl(Initial, Ladder, Obstacles, Goal, Solution) :- bl([[Initial]], Ladder, Obstacles, Goal, Solution). 		

bl([[State|Path]|_], _, _, Goal, [State|Path]) :- Goal==State. 

bl([First|Others], Ladder, Obstacles, Goal, Solution) :- 
	extend(First, Successors, Ladder, Obstacles), append(Others, Successors, NewFrontier), 
	bl(NewFrontier, Ladder, Obstacles, Goal, Solution).

extend( [State|Path], ListSuccessors, Ladder, Obstacles) :- 
	bagof(  [Sucessor, State|Path], 
			( next(State, Ladder, Obstacles, Sucessor), 
			\+( member(Sucessor,[State|Path]) )), 
			ListSuccessors ), !. extend( _ ,[], _,_).

main(InitialState, Ladder, Obstacles, Hammer, Goal, Solution) :- 
	solution_bl(InitialState, Ladder, Obstacles, Hammer, PathHammer),
	solution_bl(Hammer, Ladder, Obstacles, Goal, PathGoal),
	append( PathGoal, PathHammer, Solution).