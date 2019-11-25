%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%[ Funções de Lista ]%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

insertEnd(X,[],[X]).
insertEnd(X,[Y|L], [Y|W]):-	insertEnd(X, L, W).

reverse([], []).
reverse([X], [X]).
reverse([X|R], L):-	reverse(R, W), insertEnd(X, W, L).

removeFirst([_|T], T).

member(E, [E|_]).
member(E, [_|T]) :-
    member(E, T).

append([], L, L).
append([H|T], L2, [H|T2]) :-
    append(T, L2, T2).

archive(Solution):-
    open("Solution.txt",write, Stream),
    ( writeln(Stream, Solution), fail ; true),
    close(Stream).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%[ Condições p/ Busca ]%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

consecutiveObstaclesRight([X, Y], Ladder, Obstacles, Donkey) :-
	Yone is Y+1,
	member([X, Y], Obstacles),
	(member([X, Yone], Obstacles);member([X, Yone], Ladder);[X,Yone]==Donkey).

consecutiveObstaclesLeft([X, Y], Ladder, Obstacles, Donkey) :-
	Yone is Y-1,
	member([X, Y], Obstacles),
	(member([X, Yone], Obstacles);member([X, Yone], Ladder);[X,Yone]==Donkey).
	
canGoLeft([X, Y], Ladder, Obstacles, Wall, Donkey, HasHamer) :-
	Y>=0,
	\+consecutiveObstaclesLeft([X, Y], Ladder, Obstacles, Donkey),
	\+(member([X, Y], Wall)),
	\+ ([X,Y]==Donkey,HasHamer==0).

canGoright([X, Y], Ladder, Obstacles, Wall, Donkey, HasHamer) :-
	Y=<9,
	\+consecutiveObstaclesRight([X, Y], Ladder, Obstacles, Donkey),
	\+(member([X, Y], Wall)),
	\+ ([X,Y]==Donkey,HasHamer==0).

canGoDown([X, Y], Ladder, Obstacles, _, Donkey) :-
	X>=0,
	Xup is X+1,
	member([X, Y], Ladder),
	\+member([Xup, Y], Obstacles),
	\+([Xup, Y]==Donkey).

canGoUp([X, Y], Ladder, Obstacles, Wall, Donkey) :-	
	X=<4,
	Xdown is X-1,
	member([Xdown, Y], Ladder),
	\+member([X, Y], Wall),
	\+member([X, Y], Obstacles),
	\+([X, Y]==Donkey).

	
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%[ Movimenta o agente pelo cenário ]%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	% Para direita
next([X, Y], Ladder, Obstacles, Wall, Donkey, HasHamer, [X, Yout]) :-
	Yout is Y+1,
	canGoright([X, Yout], Ladder, Obstacles, Wall, Donkey, HasHamer).
	
	% Para esquerda
next([X, Y], Ladder, Obstacles, Wall, Donkey, HasHamer, [X, Yout]) :-
	Yout is Y-1,
	canGoLeft([X, Yout], Ladder, Obstacles, Wall, Donkey, HasHamer).
	
	
	% Para Baixo
next([X, Y], Ladder, Obstacles, Wall, Donkey, _, [Xout, Y]) :-
	Xout is X-1,
	canGoDown([Xout, Y], Ladder, Obstacles, Wall, Donkey).
	
	% Para Cima
next([X, Y], Ladder, Obstacles, Wall, Donkey, _, [Xout, Y]) :-	
	Xout is X+1,
	canGoUp([Xout, Y], Ladder, Obstacles, Wall, Donkey).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%[ Funções de Busca em Largura ]%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

solution_bl(Initial, Ladder, Obstacles, Wall, Donkey, HasHamer, Goal, Solution) :-
bl([[Initial]], Ladder, Obstacles, Wall, Donkey, HasHamer, Goal, Solution). 		

bl([[State|Path]|_], _, _, _, _, _, Goal, [State|Path]) :-
Goal==State. 

bl([First|Others], Ladder, Obstacles, Wall, Donkey, HasHamer, Goal, Solution) :-
extend(First, Successors, Ladder, Obstacles, Wall, Donkey, HasHamer),
append(Others, Successors, NewFrontier),
bl(NewFrontier, Ladder, Obstacles, Wall, Donkey, HasHamer, Goal, Solution).

extend([State|Path], ListSuccessors, Ladder, Obstacles, Wall, Donkey, HasHamer) :-
bagof([Sucessor, State|Path],
	(next(State, Ladder, Obstacles, Wall, Donkey, HasHamer, Sucessor), \+member(Sucessor, [State|Path])),
	ListSuccessors),
!. 
extend( _ ,[], _,_,_,_,_).

main(InitialState, Ladder, Obstacles, Wall, Donkey, Hammer, Goal, Solution) :- 
	set_prolog_flag(answer_write_options,[max_depth(0)]),
	solution_bl(InitialState, Ladder, Obstacles, Wall, Donkey, 0, Hammer, PathHammer),
	solution_bl(Hammer, Ladder, Obstacles, Wall, Donkey, 1, Goal, PathGoal),
	removeFirst(PathHammer, PathHammerCut),
	append( PathGoal, PathHammerCut, SolutionTemp),
	reverse(SolutionTemp,Solution),
	archive(Solution),!.
