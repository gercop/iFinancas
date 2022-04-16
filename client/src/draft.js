<div className="register-container">        
          <h1 className="register-title"> Lançamentos do Controle Financeiro </h1>        
          <input type="text" name="descricao"    placeholder="Descrição do Lançamento" className="register-input" onChange={handleChangeValues} />
          <input type="text" name="dtLancamento" placeholder="Data Lançamento"         className="register-input" onChange={handleChangeValues} />

          <select name="idTipoLancamento" className="register-input" defaultValue={'1'} onChange={handleChangeValues} >            
            <option value='1'>Receita</option>
            <option value='2'>Despesa</option>
            <option value='3'>Receita Adicional</option>
            <option value='4'>Despesa Isenta</option>
            <option value='5'>Depósito</option>
            <option value='6'>Saque</option>
            <option value='7'>Transferência</option>
            <option value='8'>Montante Inicial</option>
            <option value='9'>Renda Passiva</option>          
          </select>

          <select name="idConta" className="register-input" defaultValue={'1'} onChange={handleChangeValues} >            
            <option value='1'>Conta Corrente</option>
            <option value='2'>Conta Poupança</option>
          </select>

          <select name="idUsuario" className="register-input" defaultValue={'1'} onChange={handleChangeValues} >         
            <option value='1'>Ricardo</option>         
          </select>        
        
          <input type="text" name="valor" placeholder="Valor" className="register-input-real" onChange={handleChangeValues} />
          <input type="text" name="juros" placeholder="Juros" className="register-input-real" onChange={handleChangeValues} />
          <button className="register-button" onClick={() => handleClickButton()}>
            Incluir Lançamento
          </button>        
        </div>                         