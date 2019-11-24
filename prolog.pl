member(E, [E|_]).
member(E, [_|T]) :-
    member(E, T).

append([], L, L).
append([H|T], L2, [H|T2]) :-
    append(T, L2, T2).

consecutiveObstaclesRight([X, Y], Ladder, Obstacles, Donkey) :-
	Yone is Y+1,
	member([X, Y], Obstacles),
	(member([X, Yone], Obstacles);member([X, Yone], Ladder);[X,Yone]==Donkey).

consecutiveObstaclesLeft([X, Y], Ladder, Obstacles, Donkey) :-
	Yone is Y-1,
	member([X, Y], Obstacles),
	(member([X, Yone], Obstacles);member([X, Yone], Ladder);[X,Yone]==Donkey).
	
canGoLeft([X, Y], Ladder, Obstacles, Wall, Donkey) :-
	Y>0,
	\+consecutiveObstaclesLeft([X, Y], Ladder, Obstacles, Donkey),
	Yone is Y-1,
	\+(member([X, Yone], Wall)).

canGoright([X, Y], Ladder, Obstacles, Wall, Donkey) :-
	Y<9,
	\+consecutiveObstaclesRight([X, Y], Ladder, Obstacles, Donkey),
	Yone is Y+1,
	\+(member([X, Yone], Wall)).

canGoDown([X, Y], Ladder, Obstacles, Wall, Donkey) :-
	X>0,
	Xone is X-1,
	member([Xone, Y], Ladder),
	\+member([X, Y], Wall),
	\+member([X, Y], Obstacles),
	\+([X, Y]==Donkey).

canGoUp([X, Y], Ladder, Obstacles, Wall, Donkey) :-
	member([X, Y], Ladder),
	X<4,
	Xone is X+1,
	\+member([Xone, Y], Wall),
	\+member([Xone, Y], Obstacles),
	\+([Xone, Y]==Donkey).
	
	% Para direita
next([X, Y], Ladder, Obstacles, Wall, Donkey, [X, Yout]) :-
	canGoright([X, Y], Ladder, Obstacles, Wall, Donkey),
	Yout is Y+1. 
	
	% Para esquerda
next([X, Y], Ladder, Obstacles, Wall, Donkey, [X, Yout]) :-
	canGoLeft([X, Y], Ladder, Obstacles, Wall, Donkey),
	Yout is Y-1. 
	
	% Para Baixo
next([X, Y], Ladder, Obstacles, Wall, Donkey, [Xout, Y]) :-
	canGoDown([X, Y], Ladder, Obstacles, Wall, Donkey),
	Xout is X-1. 
	
	% Para Cima
next([X, Y], Ladder, Obstacles, Wall, Donkey, [Xout, Y]) :-
	canGoUp([X, Y], Ladder, Obstacles, Wall, Donkey),
	Xout is X+1. 		

solution_bl(Initial, Ladder, Obstacles, Wall, Donkey, Goal, Solution) :-
bl([[Initial]], Ladder, Obstacles, Wall, Donkey, Goal, Solution). 		

bl([[State|Path]|_], _, _, _, _, Goal, [State|Path]) :-
Goal==State. 

bl([First|Others], Ladder, Obstacles, Wall, Donkey, Goal, Solution) :-
extend(First, Successors, Ladder, Obstacles, Wall, Donkey),
append(Others, Successors, NewFrontier),
bl(NewFrontier, Ladder, Obstacles, Wall, Donkey, Goal, Solution).

extend([State|Path], ListSuccessors, Ladder, Obstacles, Wall, Donkey) :-
bagof([Sucessor, State|Path],
	(next(State, Ladder, Obstacles, Wall, Donkey, Sucessor), \+member(Sucessor, [State|Path])),
	ListSuccessors),
!. 
extend( _ ,[], _,_,_,_).

main(InitialState, Ladder, Obstacles, Wall, Donkey,Hammer, Goal, Solution) :- 
	solution_bl(InitialState, Ladder, Obstacles, Wall, Donkey, Hammer, PathHammer),
	solution_bl(Hammer, Ladder, Obstacles, Wall, Donkey, Goal, PathGoal),
	append( PathGoal, PathHammer, Solution).
