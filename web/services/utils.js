import axios from 'axios';

export default {
  async getCep(cep) {
    if(cep && cep !== ''){
      cep = (cep.replace(/\D/g, ''));

      if (cep.length === 8) {
        try {
          const query = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  
          const { erro } = query.data;
          if (erro) return null;
          else return query.data;
  
        } catch (error) {
          console.warn(error);
        }
      }
    }

    return null;
  },
  maskValue(value) {
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  },
  maskDate(date) {
    return Intl.DateTimeFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(date);
  },
}