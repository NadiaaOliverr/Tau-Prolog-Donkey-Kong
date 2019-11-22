member(E, [E|_]).
member(E, [_|T]) :-
    member(E, T).

append([], L, L).
append([H|T], L2, [H|T2]) :-
    append(T, L2, T2).

	consecutiveObstaclesRight([X, Y], Obstacles) :-
		Yone is Y+1,
		member([X, Y], Obstacles),
		member([X, Yone], Obstacles).

	consecutiveObstaclesLeft([X, Y], Obstacles) :-
		Yone is Y-1,
		member([X, Y], Obstacles),
		member([X, Yone], Obstacles).
		
	canGoLeft([X, Y], _, Obstacles, Wall) :-
		Y>0,
		\+ consecutiveObstaclesLeft([X, Y], Obstacles),
		Yone is Y-1,
		\+(member([X, Yone], Wall)).

	canGoright([X, Y], _, Obstacles, Wall) :-
		Y<9,
		\+ consecutiveObstaclesRight([X, Y], Obstacles),
		Yone is Y+1,
		\+(member([X, Yone], Wall)).

	canGoDown([X, Y], Ladder, _, _) :-
		Xone is X-1,
		member([Xone, Y], Ladder),
		X>0.

	canGoUp([X, Y], Ladder, _, Wall) :-
		member([X, Y], Ladder),
		X<4,
		Xone is X+1,
		\+(member([Xone, Y], Wall)).
		
		% Para direita
	next([X, Y], _, Obstacles, Wall, [X, Yout]) :-
		canGoright([X, Y], _, Obstacles, Wall),
		Yout is Y+1. 
		
		% Para esquerda
	next([X, Y], _, Obstacles, Wall, [X, Yout]) :-
		canGoLeft([X, Y], _, Obstacles, Wall),
		Yout is Y-1. 
		
		% Para Baixo
	next([X, Y], Ladder, _, Wall, [Xout, Y]) :-
		canGoDown([X, Y], Ladder, _, Wall),
		Xout is X-1. 
		
		% Para Cima
	next([X, Y], Ladder, _, Wall, [Xout, Y]) :-
		canGoUp([X, Y], Ladder, _, Wall),
		Xout is X+1. 
	
	
	
	solution_bl(Initial, Ladder, Obstacles, Wall, Goal, Solution) :-
    bl([[Initial]], Ladder, Obstacles, Wall, Goal, Solution). 		
	
	bl([[State|Path]|_], _, _, _, Goal, [State|Path]) :-
    Goal==State. 
	
	bl([First|Others], Ladder, Obstacles, Wall, Goal, Solution) :-
    extend(First, Successors, Ladder, Obstacles, Wall),
    append(Others, Successors, NewFrontier),
    bl(NewFrontier, Ladder, Obstacles, Wall, Goal, Solution).
	
	extend([State|Path], ListSuccessors, Ladder, Obstacles, Wall) :-
    bagof([Sucessor, State|Path],
          (next(State, Ladder, Obstacles, Wall, Sucessor), \+member(Sucessor, [State|Path])),
          ListSuccessors),
	!. 
	extend( _ ,[], _,_,_).
	
	main(InitialState, Ladder, Obstacles, Wall, Hammer, Goal, Solution) :- 
		solution_bl(InitialState, Ladder, Obstacles, Wall, Hammer, PathHammer),
		solution_bl(Hammer, Ladder, Obstacles, Wall, Goal, PathGoal),
		append( PathGoal, PathHammer, Solution).