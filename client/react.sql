use db_pessoal;
select * from games;
delete from games;

INSERT INTO db_pessoal.games (name,cost,category) values ('Far Cry 5','120','Ação');
DELETE FROM db_pessoal.games WHERE idgames=1;

SELECT * FROM db_pessoal.TB_TIPO_INSTITUICAO;
INSERT INTO db_pessoal.TB_TIPO_INSTITUICAO (Natureza) VALUES ('Instituição Financeira Bancária');
CREATE TABLE TB_TIPO_INSTITUICAO (	  
	idTipoIntituicao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Natureza VARCHAR(50)
);

SELECT * FROM db_pessoal.TB_INSTITUICAO;
DROP TABLE db_pessoal.TB_INSTITUICAO;
INSERT INTO db_pessoal.TB_INSTITUICAO (nome,tipoInstituicao) values ('Bradesco',1);
CREATE TABLE db_pessoal.TB_INSTITUICAO (	  
 idInstituicao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
 nome VARCHAR(120) NOT NULL,   
 tipoInstituicao int 
);
ALTER TABLE db_pessoal.TB_INSTITUICAO ADD INDEX (tipoInstituicao);
ALTER TABLE db_pessoal.TB_INSTITUICAO ADD FOREIGN KEY (tipoInstituicao) REFERENCES db_pessoal.TB_TIPO_INSTITUICAO(idTipoIntituicao);

SELECT * FROM db_pessoal.TB_TIPO_CONTA;
INSERT INTO db_pessoal.TB_TIPO_CONTA (descricao) values ('Conta Corrente');
INSERT INTO db_pessoal.TB_TIPO_CONTA (descricao) values ('Poupança');
CREATE TABLE db_pessoal.TB_TIPO_CONTA (	  
	idTipoConta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	descricao VARCHAR(30)
);

SELECT * FROM db_pessoal.TB_CONTA;
INSERT INTO db_pessoal.TB_CONTA (nome,codigo,tipoConta,idInstituicao) VALUES ('Bradesco SA Conta Corrente','237',1,1);
INSERT INTO db_pessoal.TB_CONTA (nome,codigo,tipoConta,idInstituicao) VALUES ('Bradesco SA Conta Poupança','237',2,1);
CREATE TABLE db_pessoal.TB_CONTA (	  
	idConta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome VARCHAR(120) NOT NULL,   
	codigo VARCHAR(30),
	numero VARCHAR(30),
	agencia VARCHAR(30),
	tipoConta int,
	idInstituicao int 
);
ALTER TABLE db_pessoal.TB_CONTA ADD INDEX (tipoConta);
ALTER TABLE db_pessoal.TB_CONTA ADD INDEX (idInstituicao);
ALTER TABLE db_pessoal.TB_CONTA ADD FOREIGN KEY (tipoConta) REFERENCES db_pessoal.TB_TIPO_CONTA(idTipoConta);
ALTER TABLE db_pessoal.TB_CONTA ADD FOREIGN KEY (idInstituicao) REFERENCES db_pessoal.TB_INSTITUICAO(idInstituicao);

SELECT * FROM db_pessoal.TB_USUARIO;
INSERT INTO db_pessoal.TB_USUARIO (nomeCompleto,login) VALUES ('Ricardo Germanos','gercop');
CREATE TABLE db_pessoal.TB_USUARIO (	  
	idUsuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nomeCompleto VARCHAR(60) NOT NULL,   
	login VARCHAR(50),
	senha VARCHAR(50)	
);

SELECT * FROM db_pessoal.TB_TIPO_LANCAMENTO;
INSERT INTO db_pessoal.TB_TIPO_LANCAMENTO (descricao) VALUES ('Receita');
INSERT INTO db_pessoal.TB_TIPO_LANCAMENTO (descricao) VALUES ('Despesa');
INSERT INTO db_pessoal.TB_TIPO_LANCAMENTO (descricao) VALUES ('Receita Adicional');
INSERT INTO db_pessoal.TB_TIPO_LANCAMENTO (descricao) VALUES ('Despesa Isenta');
INSERT INTO db_pessoal.TB_TIPO_LANCAMENTO (descricao) VALUES ('Depósito');
INSERT INTO db_pessoal.TB_TIPO_LANCAMENTO (descricao) VALUES ('Saque');
INSERT INTO db_pessoal.TB_TIPO_LANCAMENTO (descricao) VALUES ('Transferência');
INSERT INTO db_pessoal.TB_TIPO_LANCAMENTO (descricao) VALUES ('Montante Inicial');
INSERT INTO db_pessoal.TB_TIPO_LANCAMENTO (descricao) VALUES ('Renda Passiva');

DROP TABLE db_pessoal.TB_TIPO_LANCAMENTO;
CREATE TABLE db_pessoal.TB_TIPO_LANCAMENTO (
    idTipoLancamento INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(60) NOT NULL
);

SELECT * FROM db_pessoal.TB_LANCAMENTO;	 
DROP TABLE db_pessoal.TB_LANCAMENTO;
CREATE TABLE db_pessoal.TB_LANCAMENTO (	  
	idLancamento INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	descricao VARCHAR(60) NOT NULL,
    dtLancamento DATE NOT NULL,
    idtipoLancamento int,
    idConta int,
    idUsuario int,
    valor double not null,
    juros double default 0.0
);
ALTER TABLE db_pessoal.TB_LANCAMENTO ADD INDEX (idTipoLancamento);
ALTER TABLE db_pessoal.TB_LANCAMENTO ADD INDEX (idConta);
ALTER TABLE db_pessoal.TB_LANCAMENTO ADD INDEX (idUsuario);
ALTER TABLE db_pessoal.TB_LANCAMENTO ADD FOREIGN KEY (idTipoLancamento) REFERENCES db_pessoal.TB_TIPO_LANCAMENTO(idTipoLancamento);
ALTER TABLE db_pessoal.TB_LANCAMENTO ADD FOREIGN KEY (idConta) REFERENCES db_pessoal.TB_CONTA(idConta);
ALTER TABLE db_pessoal.TB_LANCAMENTO ADD FOREIGN KEY (idUsuario) REFERENCES db_pessoal.TB_USUARIO(idUsuario);

INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Montante Inicial','2021-12-31',1,1,1,142164.8);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Crédito no celular.','2022-01-05',2,1,1,-20.0);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Salário Data A.','2022-01-06',1,1,1,4237.1);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Auxílio Mãe','2022-01-04',3,1,1,2000.0);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Cartão de Crédito','2022-01-10',2,1,1,-454.62);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('IPVA 2022','2022-01-10',2,1,1,-1147.83);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Licenciamento','2022-01-10',2,1,1,-144.86);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Auxílio Mãe','2022-01-10',3,1,1,1400.0);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Plano de Saúde Unimed','2022-01-21',2,1,1,-867.26);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Venda do Título do Regatas','2022-01-31',3,1,1,150.0);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor,juros) VALUES ('Renda Passiva','2022-01-01',9,1,1,681.89,0.47);

INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Salário Data A.','2022-02-07',1,1,1,4248.8);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Auxílio Mãe','2022-02-03',3,1,1,2000.0);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Banho da Lobinha','2022-02-01',2,1,1,-40);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Plano de Saúde Unimed','2022-02-05',2,1,1,-439.27);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Cartão de Crédito','2022-02-10',2,1,1,-377.02);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor,juros) VALUES ('Renda Passiva','2022-02-01',9,1,1,786.41,0.57);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Combustível Vectra','2022-02-05',2,1,1,-60.0);

INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Salário Data A.','2022-03-06',1,1,1,4248.8);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Auxílio Mãe','2022-03-03',3,1,1,2900.0);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Auxílio Mãe','2022-03-21',3,1,1,900.0);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Banho da Lobinha','2022-03-01',2,1,1,-40);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Banho da Lobinha','2022-03-01',3,1,1,40);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Plano de Saúde Unimed','2022-03-02',2,1,1,-439.27);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Crédito Celular','2022-03-05',2,1,1,-20);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Cartão de Crédito','2022-03-10',2,1,1,-265.60);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor,juros) VALUES ('Renda Passiva','2022-03-01',9,1,1,769.83,0.5);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Transferência - Retirada da Conta Corrente','2022-03-11',7,1,1,-160000.0);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor) VALUES ('Transferência - Depósito Poupança','2022-03-11',7,2,1,160000.0);
INSERT INTO db_pessoal.TB_LANCAMENTO (descricao,dtLancamento,idTipoLancamento,idConta,idUsuario,valor,juros) VALUES ('Renda Passiva','2022-03-25',9,1,1,0.25,0.5);

-- LANÇAMENTO TOTAL LÍQUIDO:
SELECT round(sum(valor),2) as 'VALOR LÍQUIDO DO LANÇAMENTO'    
FROM db_pessoal.TB_LANCAMENTO 
where 1=1
	-- and month(dtLancamento) in (12,1,2,3)
    -- and idTipoLancamento=3
    -- and idConta in (2)
order by dtLancamento;	 

-- LANÇAMENTO LÍQUIDO POR MÊS:
SELECT case when month(dtLancamento)=1  then 'Janeiro' 
            when month(dtLancamento)=2  then 'Fevereiro' 
            when month(dtLancamento)=3  then 'Março'
            when month(dtLancamento)=4  then 'Abril' 
            when month(dtLancamento)=5  then 'Maio' 
            when month(dtLancamento)=6  then 'Junho' 
            when month(dtLancamento)=7  then 'Julho' 
            when month(dtLancamento)=8  then 'Agosto' 
            when month(dtLancamento)=9  then 'Setembro' 
            when month(dtLancamento)=10 then 'Outubro' 
            when month(dtLancamento)=11 then 'Novembro'
            when month(dtLancamento)=12 then 'Dezembro'	end as 'MESES'        	
    ,round(sum(valor),2) as 'VALOR LÍQUIDO DO LANÇAMENTO'    
FROM db_pessoal.TB_LANCAMENTO 
where 1=1
	-- and month(dtLancamento) in (12,1,2,3)
    -- and idTipoLancamento=3
    -- and idConta in (2)
group by month(dtLancamento)    
order by dtLancamento;	 

-- RESUMO RECEITAS, DESPESAS, DESPESAS ISENTAS RECEITAS ADICIONAIS:
SELECT case when month(dtLancamento)=1  then 'Janeiro' 
            when month(dtLancamento)=2  then 'Fevereiro' 
            when month(dtLancamento)=3  then 'Março'
            when month(dtLancamento)=4  then 'Abril' 
            when month(dtLancamento)=5  then 'Maio' 
            when month(dtLancamento)=6  then 'Junho' 
            when month(dtLancamento)=7  then 'Julho' 
            when month(dtLancamento)=8  then 'Agosto' 
            when month(dtLancamento)=9  then 'Setembro' 
            when month(dtLancamento)=10 then 'Outubro' 
            when month(dtLancamento)=11 then 'Novembro'
            when month(dtLancamento)=12 then 'Dezembro'	end as 'MESES',        	
	   dtLancamento as 'DATA DE LANÇAMENTOS',        
       sum(receitas) as 'RECEITAS', 
       sum(despesas) as 'DESPESAS', 
       sum(despesas_isentas) as 'DESPESAS ISENTA', 
       sum(receitas_adicionais) as 'RECEITAS ADICIONAIS', 
       sum(liquido) as 'VALOR DE LANÇAMENTO LÍQUIDO' 
from (
	SELECT dtLancamento,month(dtLancamento) as meses, round(sum(valor),2) as receitas, 0 as despesas, 0 as despesas_isentas, 0 as receitas_adicionais, round(sum(valor),2) as liquido
	FROM db_pessoal.TB_LANCAMENTO where idTipoLancamento in (1) GROUP BY month(dtLancamento)
	UNION ALL
	SELECT dtLancamento,month(dtLancamento) as meses, 0 as receitas, round(abs(sum(valor)),2) as despesas, 0 as despesas_isentas, 0 as receitas_adicionais, round(sum(valor),2) as liquido
	FROM db_pessoal.TB_LANCAMENTO where idTipoLancamento in (2) GROUP BY month(dtLancamento)
	UNION ALL
	SELECT dtLancamento,month(dtLancamento) as meses, 0 as receitas, 0 as despesas, round(sum(valor),2) as despesas_isentas, 0 as receitas_adicionais, round(sum(valor),2) as liquido
	FROM db_pessoal.TB_LANCAMENTO where idTipoLancamento in (4) GROUP BY month(dtLancamento) 
	UNION ALL
	SELECT dtLancamento,month(dtLancamento) as meses, 0 as receitas, 0 as despesas, 0 as despesas_isentas, round(sum(valor),2) as receitas_adicionais, round(sum(valor),2) as liquido
	FROM db_pessoal.TB_LANCAMENTO where idTipoLancamento in (3,9) GROUP BY month(dtLancamento)
) todas
WHERE year(dtLancamento)>2021
GROUP BY meses
ORDER BY dtLancamento;
  
-- LISTAGEM COMPLETA DE LANÇAMENTOS:
SELECT 	 l.idLancamento 		as 'ID LANÇAMENTO'
		,l.descricao    		as 'DESCRIÇÃO DO LANÇAMENTO'
		,l.dtLancamento 		as 'DATA DE LANÇAMENTO' 
        ,tl.idTipoLancamento 	as 'ID TIPO DE LANÇAMENTO'
		,tl.descricao   		as 'TIPO DE LANÇAMENTO'
        ,c.idConta         		as 'ID CONTA'
		,c.nome         		as 'DESCRICAO CONTA'
        ,u.idUsuario   			as 'ID USUÁRIO'
		,u.nomeCompleto 		as 'NOME COMPLETO'
		,round(valor,2) 		as 'VALOR'
		,round(juros,2) 		as 'JUROS'
FROM db_pessoal.TB_LANCAMENTO l
INNER JOIN db_pessoal.TB_TIPO_LANCAMENTO tl ON l.idTipoLancamento=tl.idTipoLancamento
INNER JOIN db_pessoal.TB_CONTA c ON l.idConta=c.idConta
INNER JOIN db_pessoal.TB_USUARIO u ON l.idUsuario=u.idUsuario
where 1=1
	-- and month(dtLancamento)=3
    -- and idTipoLancamento=2    
order by dtLancamento;	 

