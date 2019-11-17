%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%[ Funções de Lista ]%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% verificar se elemento pertence a uma lista
pertence(E, [E|_]).
pertence(E, [_|T]):- pertence(E, T).

% Insere no inicio
insere(E, [], [E]):- !.
insere(E, List, [E|List]):- !.

% inverter lista
inverte([],[]).
inverte([E|C], Linv):-
	inverte(C,C_Inv),
	concatena(C_Inv,[E], Linv).

% Concatena duas listas (junta duas listas)
concatena([],L,L).
concatena([H|T],L2,[H|T2]) :- concatena(T,L2,T2).

%////////////////////////////////////////////////////////////////
%////////////////////////////////////////////////////////////////


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%[ Movimenta o agente pelo cenário ]%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%Regras de sucessao de estados (movimentacao)
%direita
sucessao([X,Y], [X,Yout]):- Y<4, Yout is Y + 1.
%esquerda
sucessao([X,Y], [X,Yout]):- Y>0, Yout is Y - 1.
%cima
sucessao([X,Y], [Xout,Y]):- X>0, Xout is X - 1.
%baixo
sucessao([X,Y], [Xout,Y]):- X<4, Xout is X + 1.

%////////////////////////////////////////////////////////////////
%////////////////////////////////////////////////////////////////

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%[ Busca em Largura ]%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%solucao por busca em largura (bl)
solucao_bl(Inicial, Solucao, Meta) :- bl([[Inicial]], Solucao, Meta).

%Se o primeiro estado de F for meta, então o retorna com o caminho
bl([[Estado|Caminho]|_], [Estado|Caminho], Meta) :- Meta == Estado.

%falha ao encontrar a meta, então estende o primeiro estado até seus
%sucessores e os coloca no final da lista de fronteira
bl([Primeiro|Outros], Solucao, Meta) :- estende(Primeiro, Sucessores),
    concatena(Outros, Sucessores, NovaFronteira),
    bl(NovaFronteira, Solucao, Meta). 

%metodo que faz a extensao do caminho até os nós filhos do estado
estende([Estado|Caminho],ListaSucessores):- 
    bagof( [Sucessor,Estado|Caminho], (sucessao(Estado,Sucessor),
    not( pertence(Sucessor,[Estado|Caminho]) ) ),
    ListaSucessores),!.
%se o estado não tiver sucessor, falha e não procura mais (corte)   
estende( _ ,[]). 

%////////////////////////////////////////////////////////////////
%////////////////////////////////////////////////////////////////

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%[ Main ]%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

main(EstadoInicial, Meta, Solucao):-solucao_bl(EstadoInicial, Solucao, Meta).
