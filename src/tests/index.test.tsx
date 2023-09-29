import * as actions from '../redux/actions';

describe('reqCurrSuccess action', () => {
  it('Teste para a action de adicionar moedas', () => {
    const currencies = ['USD', 'EUR', 'GBP'];
    const expectedAction = {
      type: actions.REQ_CURR_SUCCESS,
      payload: currencies,
    };
    expect(actions.reqCurrSuccess(currencies)).toEqual(expectedAction);
  });
});

describe('dlt action', () => {
  it('Teste para a action de excluir despesas', () => {
    const id = 1;
    const expectedAction = {
      type: actions.DLT,
      payload: id,
    };
    expect(actions.dlt(id)).toEqual(expectedAction);
  });
});

describe('edit action', () => {
  it('Teste para a action de iniciar a edição de uma despesa', () => {
    const id = 1;
    const expectedAction = {
      type: actions.EDIT,
      payload: id,
    };
    expect(actions.edit(id)).toEqual(expectedAction);
  });
});
