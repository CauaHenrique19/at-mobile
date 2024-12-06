import axios from "axios";

const BASE_URL =
  "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata";

const CurrencyAPI = {
  /**
   * Obtém a lista de moedas estrangeiras monitoradas pela API do Banco Central.
   * @returns {Promise<Array>} Lista de moedas com suas respectivas informações.
   */
  async getMoedas() {
    try {
      const response = await axios.get(`${BASE_URL}/Moedas?$format=json`);
      return response.data.value; // Retorna a lista de moedas.
    } catch (error) {
      console.error("Erro ao obter a lista de moedas:", error.message);
      throw error;
    }
  },

  /**
   * Obtém a cotação de uma moeda específica em uma data fornecida.
   * @param {string} moeda - Código da moeda (ex.: "EUR").
   * @param {string} dataCotacao - Data da cotação no formato "MM-DD-AAAA".
   * @returns {Promise<Object>} Dados da cotação da moeda.
   */
  async getCotacao(moeda, dataCotacao) {
    try {
      const url = `${BASE_URL}/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${moeda}'&@dataCotacao='${dataCotacao}'&$top=1&$format=json`;
      const response = await axios.get(url);
      return response.data.value[0]; // Retorna a primeira cotação encontrada.
    } catch (error) {
      console.error(
        `Erro ao obter a cotação da moeda ${moeda} na data ${dataCotacao}:`,
        error.message
      );
      throw error;
    }
  },
};

export default CurrencyAPI;
