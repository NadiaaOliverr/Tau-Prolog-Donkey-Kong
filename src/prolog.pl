member(E, [E|_]).
member(E, [_|T]):- member(E, T).

insere(E, [], [E]):- !.
insere(E, List, [E|List]):- !.

inverte([],[]).
inverte([E|C], Linv):-
	inverte(C,C_Inv),
	append(C_Inv,[E], Linv).

append([],L,L).
append([H|T],L2,[H|T2]) :- append(T,L2,T2).

barrisConsecutivoDireita([X,Y],Barris):- 
	Yone is Y + 1, 
	Ytwo is Y + 2, 
	member([X,Yone],Barris),
	member([X,Ytwo],Barris).

barrisConsecutivoEsquerda([X,Y],Barris):- 
	Yone is Y - 1, 
	Ytwo is Y - 2, 
	member([X,Yone],Barris),
	member([X,Ytwo],Barris).

%Direita
sucessao([X,Y], _, Barris, [X,Yout]):- 
	Y<9, 
	\+(barrisConsecutivoDireita([X,Y],Barris)),
	Yout is Y + 1. 
%Esquerda
sucessao([X,Y], _, Barris, [X,Yout]):- 
	Y>0, 
	\+(barrisConsecutivoEsquerda([X,Y],Barris)),
	Yout is Y - 1. 

sucessao([X,Y], Escadas, _, [Xout,Y]):- member( [X,Y], Escadas), X>0, Xout is X - 1. 
sucessao([X,Y], Escadas, _, [Xout,Y]):- member( [X,Y], Escadas), X<4, Xout is X + 1. 

solucao_bl(Inicial, Escadas, Barris, Meta, Solucao) :- bl([[Inicial]], Escadas, Barris, Meta, Solucao). 		

bl([[Estado|Caminho]|_], _, _, Meta, [Estado|Caminho]) :- Meta==Estado. 

bl([Primeiro|Outros], Escadas, Barris, Meta, Solucao) :- 
	estende(Primeiro, Sucessores, Escadas, Barris), append(Outros, Sucessores, NovaFronteira), 
	bl(NovaFronteira, Escadas, Barris, Meta, Solucao).

estende( [Estado|Caminho], ListaSucessores, Escadas, Barris) :- 
	bagof(  [Sucessor, Estado|Caminho], 
			( sucessao(Estado, Escadas, Barris, Sucessor), 
			\+( member(Sucessor,[Estado|Caminho]) )), 
			ListaSucessores ), !. estende( _ ,[], _,_).

main(EstadoInicial, Escadas, Barris, Martelo, Meta, Solucao) :- 
	solucao_bl(EstadoInicial, Escadas, Barris, Martelo, CaminhoMartelo),
	solucao_bl(Martelo, Escadas, Barris, Meta, CaminhoMeta),
	append( CaminhoMeta, CaminhoMartelo, Solucao).