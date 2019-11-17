		pertence(E, [E|_]).
		pertence(E, [_|T]):- pertence(E, T).

		insere(E, [], [E]):- !.
		insere(E, List, [E|List]):- !.

		inverte([],[]).
		inverte([E|C], Linv):-
			inverte(C,C_Inv),
			concatena(C_Inv,[E], Linv).

		concatena([],L,L).
		concatena([H|T],L2,[H|T2]) :- concatena(T,L2,T2).

		sucessao([X,Y], Escadas, [X,Yout]):- Y<9, Yout is Y + 1.
		sucessao([X,Y], Escadas, [X,Yout]):- Y>0, Yout is Y - 1.
		sucessao([X,Y], Escadas, [Xout,Y]):- X>0, Xout is X - 1.
		sucessao([X,Y], Escadas, [Xout,Y]):- pertence( [X,Y], Escadas), X<4, Xout is X + 1.

		solucao_bl(Inicial, Escadas, Meta, Solucao) :- bl([[Inicial]], Escadas, Meta, Solucao).

		bl([[Estado|Caminho]|_], Escadas, Meta, [Estado|Caminho]) :- Meta == Estado.

		bl([Primeiro|Outros], Escadas, Meta, Solucao) :- estende(Primeiro, Sucessores, Escadas),
			concatena(Outros, Sucessores, NovaFronteira),
			bl(NovaFronteira, Escadas, Meta, Solucao). 

		estende( [Estado|Caminho], ListaSucessores, Escadas) :- 
			bagof( 
				[Sucessor, Estado|Caminho], 
				( sucessao(Estado, Escadas, Sucessor), \+( pertence(Sucessor,[Estado|Caminho]) )),
				ListaSucessores
				), !.
		estende( _ ,[], Escadas). 

		main(EstadoInicial, Escadas, Meta, Solucao) :- solucao_bl(EstadoInicial, Escadas, Meta, Solucao).
